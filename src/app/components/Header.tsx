import Image from "next/image";

function Header() {
  return (
     <header className="flex items-center h-[60px] bg-[#2c2c38]">
      <div className="h-[100px] w-[246px] flex items-center justify-center border-2 border-[#31313d]">
        <h1 className="flex text-white text-3xl font-bold">
          <Image className="rotate-90" src="/align-justify-svgrepo-com.svg" alt="Kanban" width={30} height={30} />
          Kanban
        </h1>
      </div>
      <div className="flex justify-center items-center h-[100px] w-full gap-80"> 
       <h1 className="m-4 text-white text-xl font-bold">
        Lancamento da nova Plataforma
      </h1>
      </div> 
    </header>
  )
}

export default Header
