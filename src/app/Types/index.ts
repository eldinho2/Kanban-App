export type Task = {
  id: string;
  title: string;
  isInBoard: string | undefined;
} 

export type BoardSections = {
  [name: string]: Task[];
};


export type Status = 'todo' | 'in-progress' | 'completed';