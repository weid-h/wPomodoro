import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

const ToDo = () => {
  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12}>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          wToDo
        </Typography>
      </Grid> */}

      <Grid item xs={12} lg={3}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Add new mission"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <List style={{ maxHeight: "30vh", overflowY: "scroll" }}>
              <ListItem button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText>Askel 1 valmis</ListItemText>
              </ListItem>{" "}
              <ListItem button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText>Askel 1 valmis</ListItemText>
              </ListItem>{" "}
              <ListItem button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText>Askel 1 valmis</ListItemText>
              </ListItem>{" "}
              <ListItem button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText>Askel 1 valmis</ListItemText>
              </ListItem>{" "}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Add new task"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <List style={{ maxHeight: "30vh", overflowY: "scroll" }}>
              <ListItem button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText>Askel 1 valmis</ListItemText>
              </ListItem>{" "}
              <ListItem button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText>Askel 1 valmis</ListItemText>
              </ListItem>{" "}
              <ListItem button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText>Askel 1 valmis</ListItemText>
              </ListItem>{" "}
              <ListItem button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText>Askel 1 valmis</ListItemText>
              </ListItem>{" "}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ToDo;
