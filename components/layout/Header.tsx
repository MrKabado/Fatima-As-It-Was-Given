"use client";

type HeaderProps = {
  activePage: number;
  onNavigate: (pageNumber: number) => void;
};

const baseBtnClass = "py-2 px-3 md:px-4 cursor-pointer hover:bg-gray-50 text-sm md:text-md text-[#2C3E50] transition-colors duration-200 font-serif border-b-2 border-transparent";

export default function Header({ activePage, onNavigate }: HeaderProps) {
  const pages = [
    { id: 1, title: "The Message of Fatima" },
    { id: 2, title: '"Too Awful for Mankind"' },
    { id: 3, title: "The Immaculate Heart: The Remedy" },
    { id: 4, title: "What Obedience Requires of Us Now" },
    { id: 5, title: "The True Story of Fatima" },
    { id: 6, title: "Lucia's Memoirs" },
    { id: 7, title: "Contact" },
  ];

  const getBorderColor = (pageId: number) => {
    const colors = {
      1: "#8B7355",
      2: "#A52A2A",
      3: "#228B22",
      4: "#1E90FF",
      5: "#2C3E50",
      6: "#2C3E50",
      7: "#8B7355",
    };
    return colors[pageId as keyof typeof colors] || "#2C3E50";
  };

  return (
    <header className="text-center flex flex-col gap-4 md:gap-8 bg-white shadow-sm">
      <div className="px-4 py-6 md:px-5 md:py-10 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-serif font-bold">
          FATIMA
        </h1>
        <p className="text-sm md:text-md mt-3 md:mt-5 text-gray-600 font-serif">
          The original testimony, faithfully preserved
        </p>
      </div>

      <nav className="border-t border-b border-gray-200">
        <div className="flex flex-wrap justify-center gap-1 md:gap-2 py-3 md:py-4 px-2 max-w-6xl mx-auto">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className={`${baseBtnClass} ${activePage === page.id ? "font-bold border-b-2" : ""}`}
              style={{
                borderBottomColor: activePage === page.id ? getBorderColor(page.id) : "transparent"
              }}
            >
              {page.title}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}