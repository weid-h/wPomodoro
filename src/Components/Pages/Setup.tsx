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
        <Typography variant="h5">
          For how many minutes will you be working?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ValuePicker
          label="minutes"
          values={minuteValues()}
          value={context.workingMinutes}
          setValue={context.setWorkingMinutes}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          For how many minutes will you be resting?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ValuePicker
          label="minutes"
          values={minuteValues()}
          value={context.restingMinutes}
          setValue={context.setRestingMinutes}
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
