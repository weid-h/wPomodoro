import {
  Button,
  Card,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Contexts/ApplicationContext";
import useTimer from "./useTimer";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Howl } from "howler";
import { Helmet } from "react-helmet";

const useStyles = makeStyles({
  Center: {
    textAlign: "center",
  },
  customProgress: {
    height: "1rem",
    marginBottom: "0.5rem",
    marginRight: "1rem",
    marginLeft: "1rem",
    backgroundColor: "red",
    borderRadius: "20px",
  },
});

const formatTimeString = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  return `${minutes < 1 ? "00" : minutes < 10 ? `0${minutes}` : `${minutes}`}:${
    seconds < 1 ? "00" : seconds < 10 ? `0${seconds}` : `${seconds}`
  }`;
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

type TimerProps = {
  howl: Howl;
  GoToSetup: () => void;
};

const Timer = (props: TimerProps) => {
  const classes = useStyles();
  const context = useContext(AppContext);

  const {
    phase,
    timeLeft,
    pomodoros,
    currentRep,
    isRunning,
    toggleIsRunning,
    restartPhase,
    nextPhase,
  } = useTimer(
    context.pomodoroSettings.workingMinutes,
    context.pomodoroSettings.workRepsBetweenRests,
    context.pomodoroSettings.shortRestMinutes,
    context.pomodoroSettings.longRestMinutes,
    () => {
      console.log("phasechangecallback called");
      props.howl.play();
    }
  );

  const timeString = useMemo(() => formatTimeString(timeLeft), [timeLeft]);

  return (
    <Grid container spacing={2}>
      <Helmet>
        <title>{timeString}</title>
      </Helmet>
      <Grid item xs={12} className={classes.Center}>
        <Card variant="elevation">
          <Typography variant="h3">{isRunning ? phase : "PAUSED"}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="elevation" className={classes.Center}>
          <Typography variant="h1">{timeString}</Typography>
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
              props.howl.play();
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
          <Button
            color="secondary"
            variant="contained"
            onClick={() => props.GoToSetup()}
          >
            <ExitToAppIcon />
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default Timer;
