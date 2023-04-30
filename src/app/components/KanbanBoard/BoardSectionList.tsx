'use client'

import { useState } from "react";
import {
   DndContext,
   DragStartEvent,
   DragOverEvent,
   DragEndEvent,
   useSensors,
   useSensor,
   PointerSensor,
   KeyboardSensor,
   TouchSensor,
   closestCorners,
   DragOverlay,
   DropAnimation,
   defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import TaskItem from './TaskItem';
import BoardSection from "./BoardSection";
import {initializeBoard, findBoardSectionContainer}  from './utils/board';
import AddColumn from "./AddColumn";
import { restrictToWindowEdges } from "./utils/restrictToWindowEdges";

function BoardSectionList() {
  const [boardSectionsNoTreatment, setboardSectionsNoTreatment] = useState([
    {
    id: uuidv4(),
    title: 'Construir UI da pagina de Gerenciamento de Tarefas',
    img: `https://randomuser.me/api/portraits/men/61.jpg`,
    isInBoard: 'todo',
    },
    {
    id: uuidv4(),
    title: 'Adicionar funcionalidade de adicionar novo Board',
    img: `https://randomuser.me/api/portraits/women/26.jpg`,
    isInBoard: 'todo',
    },
    {
    id: uuidv4(),
    title: 'Desenvolvendo input de email e senha',
    img: `https://randomuser.me/api/portraits/men/58.jpg`,
    isInBoard: 'in-progress',
    },
    {
    id: uuidv4(),
    title: 'Escrever testes para a barra de pesquisa',
    img: `https://randomuser.me/api/portraits/men/65.jpg`,
    isInBoard: 'completed',
    },
  ]);

  const initialBoard = initializeBoard(boardSectionsNoTreatment);

  const [board, setBoard] = useState(initialBoard);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({active}: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  }
  
  const handleDragOver = ({active, over}:DragOverEvent) => {    
    const activeContainer = findBoardSectionContainer(board, active.id as string);

    const overContainer = findBoardSectionContainer(board, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }
  
    setBoard((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];      
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);
  
      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          board[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  }

  const hanldeDragEnd = ({active, over}: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(board, active.id as string);

    const overContainer = findBoardSectionContainer(board, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }
    
    const activeIndex = board[activeContainer].findIndex((task) => task.id === active.id);    
    const overIndex = board[overContainer].findIndex((task) => task.id === over?.id);

    if (activeIndex !== overIndex) {
      setBoard((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
    document.body.style.setProperty('cursor', 'default');
  }

  const getTaskById = (board: any, id: string) => {
    const boardSections = Object.keys(board);
    for (let i = 0; i < boardSections.length; i++) {
      const boardSection = boardSections[i];
      const task = board[boardSection].find((task: any) => task.id === id);
      if (task) {
        return task;
      }
    }
    return null;
  }

  const task = activeTaskId ? getTaskById(board, activeTaskId) : null;

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return (
      <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={hanldeDragEnd}
      modifiers={[restrictToWindowEdges]}
      >
        <div className="flex justify-center items-center border-b-2 border-[#31313d] text-white text-3xl font-bold bg-[#21212d] h-16">
        Nova Plataforma
        </div>
        <div className="bg-[#21212d]">
          <div className="flex h-[668px] w-[1300px] overflow-auto">
          {Object.keys(board).map((taskKey) => (
            <div className="min-w-[330px]" key={taskKey}>
              <BoardSection set={setBoard} id={taskKey} title={taskKey} board={board} tasks={board[taskKey]} />
            </div>
          ))}
          <AddColumn setBoard={setBoard} acState={board} />
          <DragOverlay
            dropAnimation={dropAnimation}
            >
            {activeTaskId ? <TaskItem id={activeTaskId} item={task} set={setBoard} board={board} columnTitle={'title'} /> : null}
          </DragOverlay>
          </div>
        </div>
      </DndContext>
  )
}

export default BoardSectionList;