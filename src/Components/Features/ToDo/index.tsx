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
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMissions } from "../../../State/reducers/ToDoReducer/selectors";
import {
  ToDoActionType,
  ActionTypes as ToDoActionTypes,
} from "../../../State/reducers/ToDoReducer/actionTypes";
import { executeToDoAction } from "../../../State/reducers/ToDoReducer/actions";
import { Mission } from "../../../State/reducers/ToDoReducer/types";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

interface MissionRowProps {
  mission?: Mission;
  selectedMissionID: string;
  setSelectedMissionId: (id: string) => void;
}

const MissionRow: React.FC<MissionRowProps> = ({
  mission,
  setSelectedMissionId: setMissionID,
  selectedMissionID: missionID,
}) => {
  const dispatch = useDispatch();
  if (mission === undefined) {
    return <>Error!</>;
  }
  return (
    <ListItem key={mission.id}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={mission.complete}
          tabIndex={-1}
          disableRipple
          onClick={() => {
            dispatch(
              executeToDoAction({
                type: ToDoActionTypes.ToggleMissionComplete,
                missionToUpdateID: mission.id,
              })
            );
          }}
        />
      </ListItemIcon>
      <ListItemText
        onClick={() => {
          dispatch(
            executeToDoAction({
              type: ToDoActionTypes.ToggleMissionProgress,
              missionToUpdateID: mission.id,
            })
          );
          if (missionID === "") {
            setMissionID(mission.id);
          } else {
            setMissionID("");
          }
        }}
      >
        {mission.description}
      </ListItemText>
    </ListItem>
  );
};

interface ToDoViewProps {
  selectedMissionID: string;
}

const ToDoView: React.FC<ToDoViewProps> = (props) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectMissions).find(
    (mission) => mission.id === props.selectedMissionID
  )?.toDos;
  const [taskInputValue, setTaskInputValue] = useState("");

  if (tasks === undefined) {
    return <>Error!</>;
  }

  const handleTaskEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(
        executeToDoAction({
          type: ToDoActionTypes.AddToDo,
          newToDoDescription: taskInputValue,
          missionId: props.selectedMissionID,
        })
      );
      setTaskInputValue("");
    }
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <TextField
          id="standard-basic"
          label="Add new task"
          style={{ width: "100%" }}
          inputProps={{
            onKeyPress: handleTaskEnter,
          }}
          value={taskInputValue}
          onChange={(e) => {
            setTaskInputValue(e.target.value);
          }}
          autoComplete={"off"}
        />
      </Grid>
      <Grid item xs={12}>
        <List style={{ maxHeight: "30vh", overflowY: "scroll" }}>
          {tasks
            .filter((task) => task.complete === false)
            .sort((a, b) => b.order - a.order)
            .map((task) => (
              <ListItem key={task.id}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.complete}
                    tabIndex={-1}
                    disableRipple
                    onClick={() => {
                      dispatch(
                        executeToDoAction({
                          type: ToDoActionTypes.ToggleToDoComplete,
                          parentMissionId: task.missionId,
                          toDoToToggleID: task.id,
                        })
                      );
                    }}
                  />
                </ListItemIcon>
                <ListItemText>{task.description}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(
                        executeToDoAction({
                          type: ToDoActionTypes.RemoveToDo,
                          parentMissionId: task.missionId,
                          toDoToRemoveID: task.id,
                        })
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <List style={{ maxHeight: "30vh", overflowY: "scroll" }}>
          {tasks
            .filter((task) => task.complete === true)
            .sort((a, b) => a.modifiedAt.getTime() - b.modifiedAt.getTime())
            .map((task) => (
              <ListItem key={task.id}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.complete}
                    tabIndex={-1}
                    disableRipple
                    color="primary"
                    onClick={() => {
                      dispatch(
                        executeToDoAction({
                          type: ToDoActionTypes.ToggleToDoComplete,
                          parentMissionId: task.missionId,
                          toDoToToggleID: task.id,
                        })
                      );
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  style={{
                    color: "grey",
                    textDecoration: "line-through",
                  }}
                >
                  {task.description}
                </ListItemText>
              </ListItem>
            ))}
        </List>
      </Grid>
    </Grid>
  );
};

const ToDo = () => {
  const dispatch = useDispatch();
  const [selectedMissionID, setSelectedMissionID] = useState("");
  const [missionInputValue, setMissionInputValue] = useState("");
  const missions = useSelector(selectMissions);

  const handleMissionEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(
        executeToDoAction({
          type: ToDoActionTypes.AddMission,
          newMissionDescription: missionInputValue,
        })
      );
      setMissionInputValue("");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={3}>
        <Grid container spacing={0}>
          {selectedMissionID === "" && (
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Add new mission"
                style={{ width: "100%" }}
                inputProps={{
                  onKeyPress: handleMissionEnter,
                }}
                value={missionInputValue}
                onChange={(e) => {
                  setMissionInputValue(e.target.value);
                }}
                autoComplete={"off"}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <List style={{ maxHeight: "30vh", overflowY: "scroll" }}>
              {selectedMissionID === "" ? (
                missions
                  .sort((a, b) => b.order - a.order)
                  .map((mission) => (
                    <MissionRow
                      key={mission.id}
                      mission={mission}
                      setSelectedMissionId={setSelectedMissionID}
                      selectedMissionID={selectedMissionID}
                    />
                  ))
              ) : (
                <MissionRow
                  setSelectedMissionId={setSelectedMissionID}
                  selectedMissionID={selectedMissionID}
                  mission={missions.find(
                    (mission) => mission.id === selectedMissionID
                  )}
                />
              )}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={9}>
        {selectedMissionID !== "" && (
          <ToDoView selectedMissionID={selectedMissionID} />
        )}
      </Grid>
    </Grid>
  );
};

export default ToDo;
