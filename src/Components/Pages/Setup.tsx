import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Contexts/ApplicationContext";
import ValuePicker from "../Features/ValuePicker";

const useStyles = makeStyles({
  Center: {
    textAlign: "center",
  },
});

const Setup = (props: any) => {
  const classes = useStyles();
  const context = useContext(AppContext);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">wPomodoro setup</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Work period length:</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValuePicker
          label="minutes"
          values={minuteValues()}
          value={context.pomodoroSettings.workingMinutes}
          setValue={(value: number) =>
            context.setPomodoroSettings({
              ...context.pomodoroSettings,
              workingMinutes: value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          Amount of repetitions between long rests:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ValuePicker
          label="repetitions"
          values={["1", "2", "3", "4", "5", "6"]}
          value={context.pomodoroSettings.workRepsBetweenRests}
          setValue={(value: number) =>
            context.setPomodoroSettings({
              ...context.pomodoroSettings,
              workRepsBetweenRests: value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Short rest length:</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValuePicker
          label="minutes"
          values={minuteValues()}
          value={context.pomodoroSettings.shortRestMinutes}
          setValue={(value: number) =>
            context.setPomodoroSettings({
              ...context.pomodoroSettings,
              shortRestMinutes: value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Long rest length:</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValuePicker
          label="minutes"
          values={minuteValues()}
          value={context.pomodoroSettings.longRestMinutes}
          setValue={(value: number) =>
            context.setPomodoroSettings({
              ...context.pomodoroSettings,
              longRestMinutes: value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} className={classes.Center}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/timer"
        >
          <AlarmOnIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

const minuteValues = () => {
  let values = [];
  for (let i = 1; i < 61; i++) {
    values[i - 1] = `${i}`;
  }
  return values;
};

export default Setup;
