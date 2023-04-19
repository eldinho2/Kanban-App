import Aside from "./components/Aside";
import Header from "./components/Header";
import BoardSectionList from "./components/KanbanBoard/BoardSectionList";

export default function Home() {
  return (
    <>
    <div>
      <Header />
      <main className="flex">
        <Aside />
        <BoardSectionList />
      </main>
    </div>
    </>
  );
}
