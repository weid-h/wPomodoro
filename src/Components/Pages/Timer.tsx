import {
  Card,
  Grid,
  makeStyles,
  Typography,
  LinearProgress,
  Button,
} from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import { Link } from "react-router-dom";
import { AppContext } from "../../Contexts/ApplicationContext";
import { time } from "console";

const useStyles = makeStyles({
  Center: {
    textAlign: "center",
  },
});

const formatTimeString = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  return `${minutes < 1 ? "00" : minutes < 10 ? `0${minutes}` : `${minutes}`}:${
    seconds < 1 ? "00" : seconds < 10 ? `0${seconds}` : `${seconds}`
  }`;
};

const remainingTime = (startTime: number, phaseTime: number) => {
  return Math.floor(
    (startTime + phaseTime * 60000 - new Date().getTime()) / 1000
  );
};

const getProgress = (remainingTime: number, totalTime: number) => {
  const elapsedTime = totalTime - remainingTime;
  return (elapsedTime / totalTime) * 100;
};

type statProps = {
  workPeriods: number;
  pomodoros: number;
  workTime: number;
  restTime: number;
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
          Completed{" "}
          {props.pomodoros * Math.floor(0.2 / props.workTime) +
            props.workPeriods}{" "}
          work periods
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Worked effectively for{" "}
          {Math.floor(
            (props.pomodoros * Math.floor(0.2 / props.workTime) +
              props.workPeriods) *
              props.workTime
          )}{" "}
          minutes
        </Typography>
      </Grid>
    </Grid>
  );
};

const Timer = (props: any) => {
  const classes = useStyles();
  const context = useContext(AppContext);
  const [phase, setPhase] = useState<"WORK" | "SHORT REST" | "LONG REST">(
    "WORK"
  );
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [workPeriods, setWorkPeriods] = useState(0);
  const [pomodoros, setPomodoros] = useState(0);
  const [timeleft, setTimeLeft] = useState(
    remainingTime(startTime, context.workingMinutes)
  );
  const [progress, setProgress] = useState(0);

  let timeout: any;

  const chime = new Audio("/Chime.wav");

  useEffect(() => {
    let remaining: number;
    switch (phase) {
      case "WORK":
        remaining = remainingTime(startTime, context.workingMinutes);
        if (remaining >= 0) {
          timeout = setTimeout(() => {
            setTimeLeft(remaining);
            setProgress(getProgress(remaining, context.workingMinutes * 60));
          }, 1000);
        } else {
          chime.play();
          setStartTime(new Date().getTime());
          setProgress(0);
          // Whenever you have worked for 60 minutes or over, have a long rest.
          if ((workPeriods + 1) * context.workingMinutes >= 0.2) {
            setPhase("LONG REST");
            setWorkPeriods(workPeriods + 1);
          } else {
            setPhase("SHORT REST");
            setWorkPeriods(workPeriods + 1);
          }
        }
        break;
      case "SHORT REST":
        remaining = remainingTime(startTime, context.restingMinutes);
        if (remaining >= 0) {
          timeout = setTimeout(() => {
            setTimeLeft(remaining);
            setProgress(getProgress(remaining, context.restingMinutes * 60));
          }, 1000);
        } else {
          chime.play();
          setStartTime(new Date().getTime());
          setProgress(0);
          setPhase("WORK");
        }
        break;
      case "LONG REST":
        remaining = remainingTime(startTime, context.restingMinutes * 3);
        if (remaining >= 0) {
          timeout = setTimeout(() => {
            setTimeLeft(remaining);
            setProgress(
              getProgress(remaining, context.restingMinutes * 3 * 60)
            );
          }, 1000);
        } else {
          chime.play();
          setStartTime(new Date().getTime());
          setWorkPeriods(0);
          setPomodoros(pomodoros + 1);
          setProgress(0);
          setPhase("WORK");
        }
        break;
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.Center}>
        <Card variant="elevation">
          <Typography variant="h3">{phase}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="elevation" className={classes.Center}>
          <Typography variant="h1">{formatTimeString(timeleft)}</Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="elevation">
          <Stats
            workPeriods={workPeriods}
            pomodoros={pomodoros}
            workTime={context.workingMinutes}
            restTime={context.restingMinutes}
          />
        </Card>
      </Grid>
      <Grid item xs={12} className={classes.Center}>
        <Button color="secondary" variant="contained" component={Link} to="/">
          <TimerOffIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Timer;
