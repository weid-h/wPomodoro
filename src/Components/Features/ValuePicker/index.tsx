import {
  Card,
  Chip,
  Link,
  makeStyles,
  Popover,
  Typography,
} from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import React from "react";

const useStyles = makeStyles({
  popoverSizing: {
    height: "10rem",
    width: "5rem",
    overflowY: "scroll",
  },
  Center: {
    textAlign: "center",
  },
  UnstyledLink: {
    textDecoration: "none",
    color: "black",
  },
});

type ValuePickerProps = {
  label: string;
  values: Array<string>;
  value: number;
  setValue: Function;
};

const ValuePicker = (props: ValuePickerProps) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  return (
    <>
      <Chip
        avatar={<AccessAlarmIcon />}
        label={`${props.value} ${props.label}`}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Card className={`${classes.popoverSizing}`}>
          {props.values.map((value) => (
            <Link
              key={value}
              className={classes.UnstyledLink}
              onClick={() => {
                props.setValue(parseInt(value));
                handleClose();
              }}
            >
              <Typography variant="h6" className={`${classes.Center}`}>
                {value}
              </Typography>
            </Link>
          ))}
        </Card>
      </Popover>
    </>
  );
};

export default ValuePicker;
