import Aside from "./components/Aside";
import Header from "./components/Header";
import Board from "./components/KanbanBoard/Board";

export default function Home() {
  return (
    <>
    <div>
      <Header />
      <main className="flex">
        <Aside />
        <Board />
      </main>
    </div>
    </>
  );
}
