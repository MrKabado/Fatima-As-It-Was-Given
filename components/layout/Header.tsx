"use client";

type HeaderProps = {
  onHomeClick: () => void;
  onPage2Click: () => void;
  onPage3Click: () => void;
  onPage4Click: () => void;
  onPage5Click: () => void;
  onPage6Click: () => void;

  isHomeActive: boolean;
  isPage2Active: boolean;
  isPage3Active: boolean;
  isPage4Active: boolean;
  isPage5Active: boolean;
  isPage6Active: boolean;
};

const baseBtnClass =
  "border border-gray-400 py-2 px-4 cursor-pointer hover:bg-gray-100 rounded-md text-md text-[#2C3E50]";

export default function Header({
  onHomeClick,
  onPage2Click,
  onPage3Click,
  onPage4Click,
  onPage5Click,
  onPage6Click,
  isHomeActive,
  isPage2Active,
  isPage3Active,
  isPage4Active,
  isPage5Active,
  isPage6Active,
}: HeaderProps) {
  return (
    <header className="text-center flex flex-col gap-8">
      <div className="px-5 py-10 border-dotted border-b-2 border-gray-300">
        <h1 className="text-5xl text-[#2C3E50]">Fatima, As It Was Given</h1>
        <p className="italic text-md mt-5 text-gray-500">
          The original testimony of Fatima, faithfully preserved — and quietly
          set before our time
        </p>
      </div>

      <nav className="border-t-2 border-b-2 border-gray-300 flex justify-center gap-4 py-4">
        <button
          onClick={onHomeClick}
          className={`${baseBtnClass} ${
            isHomeActive ? "font-bold bg-gray-100" : ""
          }`}
        >
          Home
        </button>

        <button
          onClick={onPage2Click}
          className={`${baseBtnClass} ${
            isPage2Active ? "font-bold bg-gray-100" : ""
          }`}
        >
          The Message of Fatima
        </button>

        <button
          onClick={onPage3Click}
          className={`${baseBtnClass} ${
            isPage3Active ? "font-bold bg-gray-100" : ""
          }`}
        >
          The Book
        </button>

        <button
          onClick={onPage4Click}
          className={`${baseBtnClass} ${
            isPage4Active ? "font-bold bg-gray-100" : ""
          }`}
        >
          Lucia&apos;s Memoirs
        </button>

        <button
          onClick={onPage5Click}
          className={`${baseBtnClass} ${
            isPage5Active ? "font-bold bg-gray-100" : ""
          }`}
        >
          Witness & Commentary
        </button>

        <button
          onClick={onPage6Click}
          className={`${baseBtnClass} ${
            isPage6Active ? "font-bold bg-gray-100" : ""
          }`}
        >
          About This Site
        </button>
      </nav>
    </header>
  );
}
