"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-15 justify-between">
      {<Header />}

      <main>
        {/* MAIN */}
        <section className="flex flex-col gap-10">
          <div className="p-10 bg-gray-200 border-l-5 border-gray-500 flex flex-col gap-5">
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
                <span className="text-2xl">-</span> The Message in Our Lady's
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
      </main>

      {<Footer />}
    </div>
  );
}
