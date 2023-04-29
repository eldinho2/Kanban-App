import Header from "./components/Header";
import BoardSectionList from "./components/KanbanBoard/BoardSectionList";

export default function Home() {
  return (
    <>
    <div className="flex">
      <Header />
      <main className="min-h-screen">
        <BoardSectionList />
      </main>
    </div>
    </>
  );
}
