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
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { executeToDoAction } from "../../../State/reducers/ToDoReducer/actions";
import { ActionTypes as ToDoActionTypes } from "../../../State/reducers/ToDoReducer/actionTypes";
import { selectMissions } from "../../../State/reducers/ToDoReducer/selectors";
import {
  Mission,
  ToDo as ToDoType,
} from "../../../State/reducers/ToDoReducer/types";
import EditIcon from "@material-ui/icons/Edit";
import MoveUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MoveDownIcon from "@material-ui/icons/KeyboardArrowDown";
import DoneIcon from "@material-ui/icons/Done";
import BackIcon from "@material-ui/icons/ArrowBack";
interface EditRowDescriptionProps {
  initialDescription: string;
  handleComplete: (newDescription: string) => void;
}
const EditRowDescription: React.FC<EditRowDescriptionProps> = (props) => {
  const [value, setValue] = useState(props.initialDescription);

  const handleTaskEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.handleComplete(value);
    } else if (e.key === "Escape") {
      props.handleComplete(props.initialDescription);
    }
  };

  return (
    <ListItem>
      <ListItemText>
        <TextField
          id="standard-basic"
          label="Press enter to save or escape to cancel"
          style={{ width: "100%" }}
          inputProps={{
            onKeyPress: handleTaskEnter,
          }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          autoComplete={"off"}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            props.handleComplete(value);
          }}
        >
          <DoneIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

interface ActiveMissionRowProps {
  mission?: Mission;
  backFn: () => void;
}

const ActiveMissionrow: React.FC<ActiveMissionRowProps> = ({
  mission,
  backFn,
}) => {
  if (mission === undefined) {
    return <>Error!</>;
  }

  return (
    <ListItem key={mission.id}>
      <ListItemText style={{ textAlign: "center" }}>
        <Typography variant="h5">{mission.description}</Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            backFn();
          }}
        >
          <BackIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

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
  const [editing, setEditing] = useState(false);

  if (mission === undefined) {
    return <>Error!</>;
  }
  return editing ? (
    <EditRowDescription
      initialDescription={mission.description}
      handleComplete={(newDescription) => {
        dispatch(
          executeToDoAction({
            type: ToDoActionTypes.UpdateMissionDescription,
            missionToUpdateID: mission.id,
            newDescription: newDescription,
          })
        );
        setEditing(false);
      }}
    />
  ) : (
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
          color="primary"
        />
      </ListItemIcon>
      <ListItemText
        style={
          mission.complete
            ? { textDecoration: "line-through", color: "grey" }
            : {}
        }
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
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            dispatch(
              executeToDoAction({
                type: ToDoActionTypes.OrderMission,
                missionId: mission.id,
                steps: 1,
              })
            );
          }}
        >
          <MoveUpIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            dispatch(
              executeToDoAction({
                type: ToDoActionTypes.OrderMission,
                missionId: mission.id,
                steps: -1,
              })
            );
          }}
        >
          <MoveDownIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => {
            setEditing(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            dispatch(
              executeToDoAction({
                type: ToDoActionTypes.RemoveMission,
                missionToRemoveID: mission.id,
              })
            );
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

interface ToDoViewRowProps {
  task: ToDoType;
}

const ToDoViewRow: React.FC<ToDoViewRowProps> = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  return editing ? (
    <EditRowDescription
      initialDescription={task.description}
      handleComplete={(newDescription) => {
        dispatch(
          executeToDoAction({
            type: ToDoActionTypes.UpdateToDoDescription,
            newDescription: newDescription,
            parentMissionId: task.missionId,
            toDoToUpdateID: task.id,
          })
        );
        setEditing(false);
      }}
    />
  ) : (
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
          color="primary"
        />
      </ListItemIcon>
      <ListItemText
        style={
          task.complete ? { color: "grey", textDecoration: "line-through" } : {}
        }
      >
        {task.description}
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            dispatch(
              executeToDoAction({
                type: ToDoActionTypes.OrderToDo,
                parentMissionId: task.missionId,
                todoId: task.id,
                steps: 1,
              })
            );
          }}
        >
          <MoveUpIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            dispatch(
              executeToDoAction({
                type: ToDoActionTypes.OrderToDo,
                parentMissionId: task.missionId,
                todoId: task.id,
                steps: -1,
              })
            );
          }}
        >
          <MoveDownIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => {
            setEditing(true);
          }}
        >
          <EditIcon />
        </IconButton>
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
    if (e.key === "Enter" && taskInputValue.length > 0) {
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
              <ToDoViewRow task={task} />
            ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <List style={{ maxHeight: "30vh", overflowY: "scroll" }}>
          {tasks
            .filter((task) => task.complete === true)
            .sort((a, b) => a.modifiedAt.getTime() - b.modifiedAt.getTime())
            .map((task) => (
              <ToDoViewRow task={task} />
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
    if (e.key === "Enter" && missionInputValue.length > 0) {
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
                  .filter((mission) => !mission.complete)
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
                <ActiveMissionrow
                  backFn={() => setSelectedMissionID("")}
                  mission={missions.find(
                    (mission) => mission.id === selectedMissionID
                  )}
                />
              )}
            </List>
          </Grid>
          <Grid item xs={12}>
            <List style={{ maxHeight: "30vh", overflowY: "scroll" }}>
              {selectedMissionID === "" &&
                missions
                  .filter((mission) => mission.complete)
                  .sort((a, b) => b.order - a.order)
                  .map((mission) => (
                    <MissionRow
                      key={mission.id}
                      mission={mission}
                      setSelectedMissionId={setSelectedMissionID}
                      selectedMissionID={selectedMissionID}
                    />
                  ))}
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
