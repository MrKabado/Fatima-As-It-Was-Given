"use client";

export default function Footer() {
  return (
    <footer className="flex flex-col bg-gray-100 text-gray-400 py-5">
      <h1 className="text-gray-400 font-bold flex items-center"><span className="text-2xl">©</span> 2025 Fatima, As It Was Given</h1>
      <div className="px-50 py-5">
        <div className="border-b border-t border-gray-200 flex flex-col gap-5 py-5">
          <p className="text-xs leading-5">
           <span className="font-bold text-xs">Legal Notice:</span>The True Story of Fatima by Fr. John de Marchi, S.J.
            is reproduced by permission and is presented without alteration. All
            rights remain with the original rights holder.
          </p>
          <p className="text-xs">
            This site presents original sources without editing, modernization,
            abridgement, or reinterpretation.
          </p>
        </div>
      </div>
    </footer>
  );
}
