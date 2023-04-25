import { BoardSections, Task, Status } from '../../../Types'

const boardForm = {
  todo: 'todo',
  'in-progress': 'in-progress',
  completed: 'completed',
}

const getByStatus = (task: Task[], status: Status) => {
  return task.filter((task) => task.isInBoard === status);
};

export const getTaskById = (tasks: Task[], id: string) => {
  return tasks.find((task) => task.id === id);
};


export const initializeBoard = (task: Task[]) => {
  const boardSections: BoardSections = {};

  Object.keys(boardForm).forEach((key) => {
    boardSections[key] = getByStatus(task, key as Status);
  });

  return boardSections;
}

export const findBoardSectionContainer = (
  boardSections: BoardSections,
  id: string
) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );
  return container;
};