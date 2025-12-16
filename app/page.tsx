"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [showHome, setShowHome] = useState<boolean>(true);
  const [showPage2, setShowPage2] = useState<boolean>(false);
  const [showPage3, setShowPage3] = useState<boolean>(false);
  const [showPage4, setShowPage4] = useState<boolean>(false);
  const [showPage5, setShowPage5] = useState<boolean>(false);
  const [showPage6, setShowPage6] = useState<boolean>(false);
  const [homeActive, setHomeActive] = useState<boolean>(false);
  const [page2Active, setPage2Active] = useState<boolean>(false);
  const [page3Active, setPage3Active] = useState<boolean>(false);
  const [page4Active, setPage4Active] = useState<boolean>(false);
  const [page5Active, setPage5Active] = useState<boolean>(false);
  const [page6Active, setPage6Active] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-15 justify-between">
      {<Header
        isHomeActive={homeActive}
        isPage2Active={page2Active}
        isPage3Active={page3Active}
        isPage4Active={page4Active}
        isPage5Active={page5Active}
        isPage6Active={page6Active}

        onHomeClick={() => {
          setShowHome(true);
          setShowPage2(false);
          setShowPage3(false);
          setShowPage4(false);
          setShowPage5(false);
          setShowPage6(false);

          setHomeActive(true);
          setPage2Active(false);
          setPage3Active(false);
          setPage4Active(false);
          setPage5Active(false);
          setPage6Active(false);
        }}
        onPage2Click={() => {
          setShowHome(false);
          setShowPage2(true);
          setShowPage3(false);
          setShowPage4(false);
          setShowPage5(false);
          setShowPage6(false);
          
          setHomeActive(false);
          setPage2Active(true);
          setPage3Active(false);
          setPage4Active(false);
          setPage5Active(false);
          setPage6Active(false);
        }}
        onPage3Click={() => {
          setShowHome(false);
          setShowPage2(false);
          setShowPage3(true);
          setShowPage4(false);
          setShowPage5(false);
          setShowPage6(false);

          setHomeActive(false);
          setPage2Active(false);
          setPage3Active(true);
          setPage4Active(false);
          setPage5Active(false);
          setPage6Active(false);
        }}
        onPage4Click={() => {
          setShowHome(false);
          setShowPage2(false);
          setShowPage3(false);
          setShowPage4(true);
          setShowPage5(false);
          setShowPage6(false);

          setHomeActive(false);
          setPage2Active(false);
          setPage3Active(false);
          setPage4Active(true);
          setPage5Active(false);
          setPage6Active(false);
        }}
        onPage5Click={() => {
          setShowHome(false);
          setShowPage2(false);
          setShowPage3(false);
          setShowPage4(false);
          setShowPage5(true);
          setShowPage6(false);

          setHomeActive(false);
          setPage2Active(false);
          setPage3Active(false);
          setPage4Active(false);
          setPage5Active(true);
          setPage6Active(false);
        }}
        onPage6Click={() => {
          setShowHome(false);
          setShowPage2(false);
          setShowPage3(false);
          setShowPage4(false);
          setShowPage5(false);
          setShowPage6(true);

          setHomeActive(false);
          setPage2Active(false);
          setPage3Active(false);
          setPage4Active(false);
          setPage5Active(false);
          setPage6Active(true);
        }}
      />}

      <main>
        {/* HOME */}
        <section className={showHome ? "flex flex-col gap-10" : "hidden"}>
          <div className="p-10 bg-gray-200 border-l-5 border-gray-400 flex flex-col gap-5">
            <p>
              Much of what is said today about Fatima is filtered through
              reassurance, summaries, or later interpretation. This site exists
              for a simpler reason: to place the original testimony back in
              view.
            </p>

            <p>
              At its center is{" "}
              <span className="italic">
                The True Story of Fatima by Fr. John de Marchi, S.J.
              </span>
              , reproduced in full and without alteration by written permission,
              together with the{" "}
              <span className="italic">Memoirs of Sister Lucia</span>.
            </p>

            <p>What follows is not interpretation. It is witness.</p>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Key Sections Preview</h2>
            <ul className="text-md">
              <li>
                <span className="text-3xl">-</span> The Message in Our Lady's
                Own Words
              </li>
              <li>
                <span className="text-3xl">-</span> Why Russia Mattered
              </li>
              <li>
                <span className="text-3xl">-</span> The Immaculate Heart as
                Remedy
              </li>
              <li>
                <span className="text-3xl">-</span> Peace as a Promised Fruit
              </li>
              <li>
                <span className="text-3xl">-</span> The Constancy of the Message
                Through Time
              </li>
              <li>
                <span className="text-3xl">-</span> What Lucia Never Withdrew
              </li>
            </ul>
          </div>
        </section>

        {/* THE MESSAGE OF FATIMA */}
        <section className={showPage2 ? "flex flex-col gap-10" : "hidden"}>
          <h2 className="text-3xl">The Message of Fatima</h2>

          <div className="p-10 bg-gray-200 border-l-5 border-gray-400 flex flex-col gap-5">
            <p>
              Fatima does not need reinterpretation. It needs to be read. When
              the original accounts are allowed to speak for themselves, a
              coherent and demanding message emerges — one that centers on
              reparation, obedience, and consecration as a remedy for real
              historical evils.
            </p>
          </div>

          <div>
            <h3 className="text-3xl text-gray-400">
              Sections Grounded in Original Sources
            </h3>
            <ul>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>What Our Lady asked for
                — in her own words
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Why Russia mattered
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>The Immaculate Heart as
                remedy, not metaphor
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Peace as a promised
                fruit, not an abstraction
              </li>
            </ul>
          </div>

          <p>
            <em>All points explicitly grounded in de Marchi and Lucia.</em>
          </p>
        </section>

        {/* THE BOOK */}
        <section className={showPage3 ? "flex flex-col gap-10" : "hidden"}>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl">
              The Book: <em>The True Story of Fatima</em>
            </h2>
            <h3 className="text-gray-400 text-2xl">
              by Fr. John de Marchi, S.J.
            </h3>
          </div>

          <div className="p-10 bg-gray-200 border-l-5 border-gray-400 flex flex-col gap-5">
            <p>
              <strong>Statement of Fidelity:</strong> This work is reproduced
              here in its entirety and without alteration, by written permission
              of the rights holder. No passages have been edited, modernized,
              abridged, or reinterpreted.
            </p>

            <p>
              Fr. de Marchi wrote as a careful historian who interviewed the
              seers, clergy, and witnesses while they were still living. His
              account preserves the simplicity and gravity of what was given at
              Fatima, before later accommodation set in.
            </p>
          </div>
        </section>

        {/* LUCIA'S MEMOIRS */}
        <section className={showPage4 ? "flex flex-col gap-10" : "hidden"}>
          <h2 className="text-3xl">Lucia's Memoirs</h2>

          <div className="p-10 bg-gray-200 border-l-5 border-gray-400 flex flex-col gap-5">
            <p>
              Sister Lucia's Memoirs do not reinterpret Fatima; they confirm it.
              Written under obedience, often with reluctance, they show
              remarkable consistency — and a growing burden of silence.
            </p>
          </div>

          <div>
            <h3 className="text-3xl text-gray-400">Sections</h3>
            <ul>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Lucia's obedience
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>The constancy of the
                message
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Silence and restraint
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>What Lucia never
                withdrew
              </li>
            </ul>
          </div>
        </section>

        {/* WITNESS & COMMENTARY SECTION */}
        <section className={showPage5 ? "flex flex-col gap-10" : "hidden"}>
          <h2 className="text-3xl">Witness & Commentary</h2>

          <div className="p-10 bg-gray-200 border-l-5 border-gray-400 flex flex-col gap-5">
            <p>
              <strong>Tone:</strong> Quiet, restrained, grounded.
            </p>

            <p>
              <strong>Intro:</strong> The reflections offered here do not add to
              Fatima. They arise from living with it over many years, and from
              watching its central requests remain unresolved.
            </p>
          </div>

          <div>
            <h3 className="text-3xl text-gray-400">Content</h3>
            <ul>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Short essays
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Clarifications
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Historical notes
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Personal reflections
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl text-gray-400">
              Why This Approach Works (And Protects You)
            </h3>
            <ul>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>You are not rewriting
                Fatima — you are placing the original testimony back in view.
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Fr. de Marchi + Lucia's
                Memoirs = unimpeachable sources. No speculation, no later
                "interpretations," no smoothing.
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Your role becomes
                transparent: Not author of a new message, not challenger of
                doctrine, but a lay witness pointing to what was already given.
              </li>
            </ul>
          </div>
        </section>

        {/* ABOUT THIS SITE */}
        <section className={showPage6 ? "flex flex-col gap-10" : "hidden"}>
          <h2 className="text-3xl">About This Site</h2>

          <div className="p-10 bg-gray-200 border-l-5 border-gray-400 flex flex-col gap-5">
            <p>
              This website exists to present the original, unaltered testimony of the Fatima apparitions using primary sources that have been faithfully preserved.
            
              <p><strong>Core Principle:</strong> Primary sources speak first. All commentary always points back to them.</p>
            </p>
          </div>

          <div>
            <h3 className="text-3xl text-gray-400">Legal & Moral Safety</h3>
            <p>Every page includes a footer notice to ensure proper attribution and respect for intellectual property rights.</p>
          </div>

          <div>
            <h3 className="text-3xl text-gray-400">Sources Presented</h3>
            <ul>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>The True Story of Fatima by Fr. John de Marchi, S.J. (full reproduction with permission)
              </li>
              <li className="flex items-center">
                <span className="text-3xl mr-2">-</span>Memoirs of Sister Lucia (referenced and presented in context)
              </li>
            </ul>
          </div>
        </section>
      </main>

      {<Footer />}
    </div>
  );
}
