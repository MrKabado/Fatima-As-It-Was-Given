"use client"
import { ButtonSubmit } from "../button"

type NavItem = {
  label: string
}

export default function Header() {

  const navItems: NavItem[] = [
    {label: "Home"},
    {label: "The Message of Fatima"},
    {label: "The Book"},
    {label: "Lucia's Memoirs"},
    {label: "Witness & Commentary"},
    {label: "About This Site"}
  ]

  return (
    <header className="text-center flex flex-col gap-8">
      <div className="px-5 py-10 border-dotted border-b border-gray-300">
        <h1 className="text-5xl text-[#2C3E50]">Fatima, As It Was Given</h1>
        <p className="italic text-md mt-5 text-gray-500">The original testimony of Fatima, faithfully preserved — and quietly set before our time</p>
      </div>

      <nav className="border border-gray-200 flex justify-center gap-4 py-4">
        {navItems.map((items, i) => (
          <div key={i}>
            <button className="border border-gray-400 py-2 px-4 cursor-pointer hover:bg-gray-100 rounded-md text-sm text-[#2C3E50]">
              {items.label}
            </button>
          </div>
        ))}
      </nav>
    </header>
  )
}