export interface ToDoState {
  missions: Mission[];
}

export interface ToDo {
  missionId: string;
  id: string;
  description: string;
  createdAt: Date;
  modifiedAt: Date;
  order: number;
  complete: boolean;
  inProgress: boolean;
}

export interface Mission {
  id: string;
  description: string;
  createdAt: Date;
  modifiedAt: Date;
  order: number;
  complete: boolean;
  inProgress: boolean;
  toDos: ToDo[];
}
