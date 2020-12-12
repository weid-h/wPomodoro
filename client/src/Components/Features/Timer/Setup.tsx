import {
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPomodoroSettings } from "../../../State/reducers/PomodoroSettingsReducer/actions";
import { SelectPomodoroSettings } from "../../../State/reducers/PomodoroSettingsReducer/selectors";
import ValuePicker from "../ValuePicker";

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
  <Grid item xs={12} md={3}>
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ padding: 0 }}>
            <Typography variant="h6">{props.header}</Typography>
          </Grid>
          <Grid item xs={12} style={{ padding: 0 }}>
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

interface SetupProps {
  GoToTimer: () => void;
}

const Setup: React.FC<SetupProps> = (props) => {
  const classes = useStyles();
  const settings = useSelector(SelectPomodoroSettings);
  const dispatch = useDispatch();

  return (
    <Grid container spacing={3} className={classes.Center}>
      <SettingContainer
        values={minuteValues()}
        value={settings.workingMinutes}
        setValue={(value: number) =>
          dispatch(
            setPomodoroSettings({
              ...settings,
              workingMinutes: value,
            })
          )
        }
        label="minutes"
        header="Work period length:"
      />

      <SettingContainer
        values={["1", "2", "3", "4", "5", "6"]}
        value={settings.workRepsBetweenRests}
        setValue={(value: number) =>
          dispatch(
            setPomodoroSettings({
              ...settings,
              workRepsBetweenRests: value,
            })
          )
        }
        label="repetitions"
        header="Reps between long rest:"
      />

      <SettingContainer
        values={minuteValues()}
        value={settings.shortRestMinutes}
        setValue={(value: number) =>
          dispatch(
            setPomodoroSettings({
              ...settings,
              shortRestMinutes: value,
            })
          )
        }
        label="minutes"
        header="Short rest length:"
      />

      <SettingContainer
        values={minuteValues()}
        value={settings.longRestMinutes}
        setValue={(value: number) =>
          dispatch(
            setPomodoroSettings({
              ...settings,
              longRestMinutes: value,
            })
          )
        }
        label="minutes"
        header="Long rest length:"
      />

      <Grid item xs={12} className={classes.Center}>
        <Tooltip title="Go!" aria-label="Go!">
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.GoToTimer()}
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
