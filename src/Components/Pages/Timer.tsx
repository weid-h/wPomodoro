import {
  Button,
  Card,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
  Tooltip,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Contexts/ApplicationContext";
import usePomodoroTimer from "../Features/Timer";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const useStyles = makeStyles({
  Center: {
    textAlign: "center",
  },
  customProgress:{
      height:"1rem",
      marginBottom:"0.5rem",
      marginRight:"1rem",
      marginLeft:"1rem",
      backgroundColor:"red",
      borderRadius:"20px"
  }
});

const formatTimeString = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  return `${minutes < 1 ? "00" : minutes < 10 ? `0${minutes}` : `${minutes}`}:${
    seconds < 1 ? "00" : seconds < 10 ? `0${seconds}` : `${seconds}`
  }`;
};

const getProgress = (remainingTime: number, totalTime: number) => {
  const elapsedTime = totalTime - remainingTime;
  return (elapsedTime / totalTime) * 100;
};

type statProps = {
  workPeriods: number;
  pomodoros: number;
  workTime: number;
  workReps: number;
};

const Stats = (props: statProps) => {
  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.Center}>
      <Grid item xs={12}>
        <Typography variant="h6">
          Completed {props.pomodoros} pomodoros
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Completed {props.pomodoros * props.workPeriods + props.workPeriods}{" "}
          work periods
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Worked effectively for{" "}
          {props.pomodoros * props.workReps * props.workTime +
            props.workPeriods * props.workTime}{" "}
          minutes
        </Typography>
      </Grid>
    </Grid>
  );
};

const Timer = (props: any) => {
  const classes = useStyles();
  const context = useContext(AppContext);
  const chime = new Audio("/Chime.wav");
  const [progress, setProgress] = useState(0);

  const [
    phase,
    timeLeft,
    pomodoros,
    currentRep,
    isRunning,
    toggleIsRunning,
    restartPhase,
    nextPhase,
  ] = usePomodoroTimer(
    context.pomodoroSettings.workingMinutes,
    context.pomodoroSettings.workRepsBetweenRests,
    context.pomodoroSettings.shortRestMinutes,
    context.pomodoroSettings.longRestMinutes,
    (newPhase: any) => {
      chime.play()
      .catch(() => {
          alert("You need to explicitly allow audio on your browser to hear chimes! :)")
      });
    }
  );

  useEffect(() => {
    switch (phase) {
      case "WORK":
        setProgress(
          getProgress(timeLeft, context.pomodoroSettings.workingMinutes * 60)
        );
        break;
      case "SHORT REST":
        setProgress(
          getProgress(timeLeft, context.pomodoroSettings.shortRestMinutes * 60)
        );
        break;
      case "LONG REST":
        setProgress(
          getProgress(timeLeft, context.pomodoroSettings.longRestMinutes * 60)
        );
        break;
    }
  }, [timeLeft]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.Center}>
        <Card variant="elevation">
          <Typography variant="h3">{isRunning ? phase : "PAUSED"}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="elevation" className={classes.Center}>
          <Typography variant="h1">{formatTimeString(timeLeft)}</Typography>
          <LinearProgress className={classes.customProgress} variant="determinate" value={progress} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="elevation">
          <Stats
            workPeriods={currentRep}
            pomodoros={pomodoros}
            workTime={context.pomodoroSettings.workingMinutes}
            workReps={context.pomodoroSettings.workRepsBetweenRests}
          />
        </Card>
      </Grid>
      <Grid item xs={4} className={classes.Center}>
        <Tooltip title="Restart this phase" aria-label="Restart this phase">
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              restartPhase();
            }}
          >
            <SkipPreviousIcon />
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={4} className={classes.Center}>
        <Tooltip title="Pause" aria-label="Pause">
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              toggleIsRunning();
            }}
          >
            {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={4} className={classes.Center}>
        <Tooltip title="Go to next phase" aria-label="Go to next phase">
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              nextPhase();
            }}
          >
            <SkipNextIcon />
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.Center}>
        <Tooltip title="Back to setup" aria-label="Back to setup">
          <Button color="secondary" variant="contained" component={Link} to="/">
            <ExitToAppIcon />
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default Timer;
