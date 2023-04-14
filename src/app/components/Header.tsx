import Image from "next/image";

function Header() {
  return (
     <header className="flex items-center h-[60px] bg-[#2c2c38] border-2 border-[#31313d]">
      <div className="h-[100px] w-[370px] flex items-center justify-center border-2 border-[#31313d]">
        <h1 className="flex">
          <Image src="/align-justify-svgrepo-com.svg" alt="Kanban" width={20} height={20} />
          Kanban
        </h1>
      </div>
      <div className="flex justify-center items-center h-[100px] w-full gap-80"> 
       <h1 className="m-4">
        Projeto 1
      </h1>
      </div> 
    </header>
  )
}

export default Header
