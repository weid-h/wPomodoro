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
    return <></>;
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

const ToDo = () => {
  const dispatch = useDispatch();
  const [selectedMissionID, setSelectedMissionID] = useState("");
  const [missionInputValue, setMissionInputValue] = useState("");
  const missions = useSelector(selectMissions);
  const inputRef = useRef(null);

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
                ref={inputRef}
                inputProps={{
                  onKeyPress: handleMissionEnter,
                }}
                value={missionInputValue}
                onChange={(e) => {
                  setMissionInputValue(e.target.value);
                }}
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
                </ListItem>
              </List>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ToDo;
