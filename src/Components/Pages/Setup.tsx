import {Button, Card, CardContent, Grid, makeStyles, Tooltip, Typography,} from "@material-ui/core";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AppContext} from "../../Contexts/ApplicationContext";
import ValuePicker from "../Features/ValuePicker";

const useStyles = makeStyles({
  Center: {
    textAlign: "center",
  },
});

const SettingContainer = (props: {
  values: Array<any>;
  value: any;
  setValue: Function;
  header: string;
  label: "minutes" | "repetitions";
}) => (
  <Grid item xs={12} lg={3}>
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">{props.header}</Typography>
          </Grid>
          <Grid item xs={12}>
            <ValuePicker
              label={props.label}
              values={props.values}
              value={props.value}
              setValue={props.setValue}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

const Setup = () => {
  const classes = useStyles();
  const context = useContext(AppContext);

  return (
    <Grid container spacing={3} className={classes.Center}>
      <Grid item xs={12}>
        <Typography variant="h4">wPomodoro setup</Typography>
      </Grid>

      <SettingContainer
        values={minuteValues()}
        value={context.pomodoroSettings.workingMinutes}
        setValue={(value: number) =>
          context.setPomodoroSettings({
            ...context.pomodoroSettings,
            workingMinutes: value,
          })
        }
        label="minutes"
        header="Work period length:"
      />

      <SettingContainer
        values={["1", "2", "3", "4", "5", "6"]}
        value={context.pomodoroSettings.workRepsBetweenRests}
        setValue={(value: number) =>
          context.setPomodoroSettings({
            ...context.pomodoroSettings,
            workRepsBetweenRests: value,
          })
        }
        label="repetitions"
        header="Reps between long rest:"
      />

      <SettingContainer
        values={minuteValues()}
        value={context.pomodoroSettings.shortRestMinutes}
        setValue={(value: number) =>
          context.setPomodoroSettings({
            ...context.pomodoroSettings,
            shortRestMinutes: value,
          })
        }
        label="minutes"
        header="Short rest length:"
      />

      <SettingContainer
        values={minuteValues()}
        value={context.pomodoroSettings.longRestMinutes}
        setValue={(value: number) =>
          context.setPomodoroSettings({
            ...context.pomodoroSettings,
            longRestMinutes: value,
          })
        }
        label="minutes"
        header="Long rest length:"
      />

      <Grid item xs={12} className={classes.Center}>
        <Tooltip title="Go!" aria-label="Go!">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/timer"
          >
            <AlarmOnIcon />
          </Button>
        </Tooltip>
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
