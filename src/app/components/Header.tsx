const Image = require("next/image");

function Header() {
  return (
    <header className="">
      <div className="h-[100px] w-[246px] flex items-center bg-[#2c2c38] justify-center border-2 border-[#31313d]">
        <h1 className="flex text-white text-3xl font-bold">
          <Image
            className="rotate-90"
            src="/align-justify-svgrepo-com.svg"
            alt="Kanban"
            width={30}
            height={30}
          />
          Kanban
        </h1>
      </div>
      <aside className="w-[246px] bg-[#2c2c38] h-[623px] overflow-hidden">
        <section className="flex flex-col items-center">
          <p className="text-[#7d8493] font-bold mt-10">Todos os quadros (3)</p>
          <div className="flex flex-col gap-6 justify-center mt-8">
            <div className="flex items-center pl-3 cursor-pointer w-48 text-[#7d8493] font-semibold hover:text-white hover:border-2 rounded-e-xl hover:bg-[#645fc6] border-[#645fc6]">
              <i>
                <Image
                  src="/book-shelf-svgrepo-com.svg"
                  alt="Kanban"
                  width={20}
                  height={20}
                />
              </i>
              <h1>Nova Plataforma</h1>
            </div>
            <div className="flex items-center pl-3 cursor-pointer w-48 text-[#7d8493] font-semibold hover:text-white hover:border-2 rounded-e-xl hover:bg-[#645fc6] border-[#645fc6]">
              <i>
                <Image
                  src="/book-shelf-svgrepo-com.svg"
                  alt="Kanban"
                  width={20}
                  height={20}
                />
              </i>
              <h1>Plano de Marketing</h1>
            </div>
            <div className="flex items-center pl-3 cursor-pointer w-48 text-[#7d8493] font-semibold hover:text-white hover:border-2 rounded-e-xl hover:bg-[#645fc6] border-[#645fc6]">
              <i>
                <Image
                  src="/book-shelf-svgrepo-com.svg"
                  alt="Kanban"
                  width={20}
                  height={20}
                  className="t"
                />
              </i>
              <h1>RoadMap</h1>
            </div>
          </div>
        </section>
        <div className="flex justify-center mt-20">darkmode</div>
      </aside>
    </header>
  );
}

export default Header;
