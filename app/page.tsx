"use client";
import { useState, useRef, useEffect, HTMLAttributes } from "react";
import TextToSpeech from "@/components/TextToSpeech/TextToSpeech";
import { aboutSite } from "@/static/SpeechContent";
import { Pencil, Save } from "lucide-react";

// Controlled Editable Component with TypeScript types
interface ControlledEditableProps extends HTMLAttributes<HTMLParagraphElement> {
  isEditable: boolean;
  content: string;
  onContentChange?: (content: string) => void;
  className?: string;
}

function ControlledEditable({ 
  isEditable, 
  content, 
  onContentChange, 
  className = "", 
  ...props 
}: ControlledEditableProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  
  // Reset content when isEditable changes to false or content prop changes
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = content;
    }
  }, [content]);
  
  const handleBlur = () => {
    if (isEditable && ref.current) {
      const newContent = ref.current.innerHTML;
      if (onContentChange) {
        onContentChange(newContent);
      }
    }
  };
  
  return (
    <p
      ref={ref}
      contentEditable={isEditable}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      className={className}
      {...props}
    />
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState<number>(1);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  
  // State for all editable content sections
  const [page1Content, setPage1Content] = useState<string>(
    "At Fatima, Heaven did not come to negotiate peace, but to warn of " +
    "impending loss. The vision of Hell, showing souls falling into Hell, " +
    "seemingly in real time, is a clear sign of the urgency of the " +
    "message. God wishes to save souls from Hell by Repentance, " +
    "Reparation, and Obedience. This site exists to restore that order."
  );

  const [page2Contents, setPage2Contents] = useState<string[]>([
    "Fatima begins where it must: with the vision of eternity in Hell. " +
    "The children were shown Hell to show them what is at stake in as " +
    "striking a manner as possible. Little Jacinta spent the rest of her " +
    "life doing little sacrifices to save sinners from that fate. " +
    "Everything at Fatima is ordered—that souls might be saved.",
    
    "I believe that at Fatima the greatest danger revealed was not the " +
    "persecution from without, but the deception from within. The gravest " +
    "possibility raised by the message is that souls may be lost, not " +
    "through rebellion against God, but through misplaced trust, when " +
    "authority is followed with blind trust, and obedience is detached " +
    "from truth.",
    
    "Lucia understood that the most terrible suffering is not physical " +
    "destruction, but eternal loss; not martyrdom, but being led away " +
    "from the path of salvation while believing oneself to be secure.",
    
    "This is the message of Fatima first addressed to those entrusted " +
    "with guidance, and only then to those dependent on that guidance.",
    
    "Where clarity is absent, and silence replaces truth, where error is " +
    "allowed to masquerade as reassurance, the danger is not just " +
    "confusion.."
  ]);

  const [page3Contents, setPage3Contents] = useState<string[]>([
    "At Fatima Jesus did not present His Mother's Immaculate Heart as a " +
    "devotion, but as a devotion equal to our devotion to His Own Sacred " +
    "Heart. Lucia repeatedly affirmed that Jesus wished to establish " +
    "devotion to Her Immaculate Heart, as a means by which souls would be " +
    "saved.",
    
    "Not to diminish Him in any way, but to obey Him, because salvation " +
    "only comes from Jesus, but by His Will through Her Immaculate Heart.",
    
    "Lucia's story leads us to that final interview in 1957 with Father " +
    "Fuentes, in which she describes Our Lady's final words for us. The " +
    "final battle She is having with Satan, where we must actively choose " +
    "Her side to be saved, or be lost to his by default.",
    
    "Our Lady bemoans the lack of help available to us. She stresses that " +
    "our only help is daily Rosary and devotion to Her Immaculate Heart.",
    
    "These are not guarantees of peace, but co-operation with grace, and"
  ]);

  const [page4Content, setPage4Content] = useState<string[]>([
    "My soul is not saved because I know that confusion exists.",
    "My soul is not saved because clarity is hard to find.",
    "Salvation is personal.",
    "My job is not to solve the crises.",
    "My job is to be faithful because of them."
  ]);

  const [page5Contents, setPage5Contents] = useState<string[]>([
    "Lucia's credibility was firmly established in July 1917 when she " +
    "told people who had asked for the Lady to prove She was from " +
    "Heaven.",
    
    "Lucia clearly stated that the Lady would do so at noon, at the " +
    "Cova, on 13th of October. This is the ONLY exact future " +
    "prediction in history. The Press saw this, when others did not, " +
    "and they gave us every word from Lucia afterwards, directly.",
    
    "The requests mentioned in the Fatima story were seemingly meant " +
    "for the authorities, they were not. They were for us to discern " +
    "what happened to them.",
    
    "Jesus does not, and will not, punish me. Bad things can happen " +
    "to me because I am not 'with Him'. His love is always with me, " +
    "but sometimes my love is not with Him, that is when I am at " +
    "risk. He does not falter, I do.",
    
    "Lucia said that Our Lady was always sad, and never smiled. This " +
    "brought home to her the seriousness of the message.",
    
    "Fatima does not promise safety in history. Fatima does promise " +
    "that no soul need be lost for lack of grace. Everything Heaven " +
    "asked for was given so that, even in a time of confusion, a " +
    "soul willing to obey could still find its way.",
    
    "Our Lady at Fatima leaves no middle ground, either the remedy " +
    "is taken seriously, or the consequences will follow."
  ]);

  const navigationItems = [
    { id: 1, label: "ABOUT THIS SITE" },
    { id: 2, label: "ABOUT THE DANGER" },
    { id: 3, label: "ABOUT THE REMEDY" },
    { id: 4, label: "ABOUT THE RESPONSIBILITY" },
    { id: 5, label: "OBSERVATIONS TO PONDER" },
    { id: 6, label: "BOOKS" },
    { id: 7, label: "CONTACT DETAILS" },
  ];

  const Books = [
    {
      title: "The True Story of Fatima",
      author: "Father John de Marchi, I.M.C,",
      description:
        "A detailed account of the apparitions at Fatima, based on extensive interviews and original documents.",
      link: "https://www.ewtn.com/catholicism/library/true-story-of-fatima-5915",
    },
    {
      title: "Lucias Final Interview in 1957",
      author: "Fr. Augustin Fuentes, S.V.D.",
      description:
        "An interview with Lucia of Fatima in 1957, where she discusses the messages and visions.",
      link: "/pages/LuciasFinalInterview",
    }
  ];

  // Helper function to update page2 content
  const updatePage2Content = (index: number, content: string) => {
    const newContents = [...page2Contents];
    newContents[index] = content;
    setPage2Contents(newContents);
  };

  // Helper function to update page3 content
  const updatePage3Content = (index: number, content: string) => {
    const newContents = [...page3Contents];
    newContents[index] = content;
    setPage3Contents(newContents);
  };

  // Helper function to update page4 content
  const updatePage4Content = (index: number, content: string) => {
    const newContents = [...page4Content];
    newContents[index] = content;
    setPage4Content(newContents);
  };

  // Helper function to update page5 content
  const updatePage5Content = (index: number, content: string) => {
    const newContents = [...page5Contents];
    newContents[index] = content;
    setPage5Contents(newContents);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-serif">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-2">
            FATIMA: A Call To Salvation
          </h1>
          <p className="text-lg text-center text-gray-600 italic">
            FATIMA: Not A Promise Of Peace, But A Remedy For Souls
          </p>
        </div>

        <div className="fixed bottom-10 right-15 z-50">
            <TextToSpeech textContent={aboutSite}/>
        </div>

        <div 
          className="fixed bottom-10 left-15 z-50 cursor-pointer" 
          title="Toggle Edit Mode" 
          onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? (
            <Save className="w-8 h-8 text-blue-600 hover:text-blue-800" />
          ) : (
            <Pencil className="w-8 h-8 text-gray-400 hover:text-gray-600" />
          )}
        </div>
        
        <nav className="border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 py-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activePage === item.id
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* PAGE 1: ABOUT THIS SITE */}
        <section
          className={`${activePage === 1 ? "block" : "hidden"} space-y-6`}
        >
          <ControlledEditable
            isEditable={isEditable}
            content={page1Content}
            onContentChange={setPage1Content}
            className="text-lg leading-relaxed"
          />
        </section>

        {/* PAGE 2: ABOUT THE DANGER */}
        <section
          className={`${activePage === 2 ? "block" : "hidden"} space-y-6`}
        >
          {page2Contents.map((content, index) => (
            <ControlledEditable
              key={index}
              isEditable={isEditable}
              content={content}
              onContentChange={(newContent) => updatePage2Content(index, newContent)}
              className="text-lg leading-relaxed"
            />
          ))}

          <div className="pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-center">
              IT IS THE LOSS OF SOULS.
            </h2>
            <h3 className="text-xl font-bold text-center italic">
              IT IS &quot;TOO AWFUL FOR MANKIND&quot;
            </h3>
          </div>
        </section>

        {/* PAGE 3: ABOUT THE REMEDY */}
        <section
          className={`${activePage === 3 ? "block" : "hidden"} space-y-6`}
        >
          {page3Contents.slice(0, 4).map((content, index) => (
            <ControlledEditable
              key={index}
              isEditable={isEditable}
              content={content}
              onContentChange={(newContent) => updatePage3Content(index, newContent)}
              className="text-lg leading-relaxed"
            />
          ))}

          <div className="pt-6">
            <ControlledEditable
              isEditable={isEditable}
              content={page3Contents[4]}
              onContentChange={(newContent) => updatePage3Content(4, newContent)}
              className="text-lg leading-relaxed"
            />
            <h2 className="text-2xl font-bold mt-2">
              GRACE IS WHAT SAVES SOULS.
            </h2>
          </div>
        </section>

        {/* PAGE 4: ABOUT THE RESPONSIBILITY */}
        <section
          className={`${activePage === 4 ? "block" : "hidden"} space-y-6`}
        >
          <div className="text-center space-y-4 italic">
            {page4Content.map((content, index) => (
              <ControlledEditable
                key={index}
                isEditable={isEditable}
                content={content}
                onContentChange={(newContent) => updatePage4Content(index, newContent)}
                className="text-lg leading-relaxed text-center italic"
              />
            ))}
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-bold mb-4">
              I am responsible for that.
            </h3>

            <ul className="space-y-3 pl-4">
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>I am responsible for my daily rosary.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>
                  I am responsible to consecrate myself to the Immaculate Heart.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>
                  I am responsible to make reparation for insults to Her.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* PAGE 5: OBSERVATIONS TO PONDER */}
        <section
          className={`${activePage === 5 ? "block" : "hidden"} space-y-8`}
        >
          <ul className="space-y-8">
            {page5Contents.slice(0, 5).map((content, index) => (
              <li key={index} className="pb-6 border-b border-gray-100">
                <ControlledEditable
                  isEditable={isEditable}
                  content={content}
                  onContentChange={(newContent) => updatePage5Content(index, newContent)}
                  className="text-lg leading-relaxed"
                />
              </li>
            ))}
            
            <li>
              <div className="space-y-4">
                <ControlledEditable
                  isEditable={isEditable}
                  content={page5Contents[5]}
                  onContentChange={(newContent) => updatePage5Content(5, newContent)}
                  className="text-lg leading-relaxed"
                />
                <ControlledEditable
                  isEditable={isEditable}
                  content={page5Contents[6]}
                  onContentChange={(newContent) => updatePage5Content(6, newContent)}
                  className="text-lg leading-relaxed font-semibold"
                />
              </div>
            </li>
          </ul>
        </section>
        
        {/* PAGE 6: BOOKS */}
        <section
          className={`${activePage === 6 ? "block" : "hidden"} space-y-6`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Books.map((book, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-md italic mb-2">by {book.author}</p>
                <p className="text-gray-700 mb-4">{book.description}</p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* PAGE 7: CONTACT DETAILS */}
        <section
          className={`${activePage === 7 ? "block" : "hidden"} space-y-6`}
        >
          <p className="text-lg leading-relaxed">
            This work is shared freely in the hope that it may be read with
            sincerity, and passed on with care.
          </p>

          <div className="pt-6">
            <p className="text-lg leading-relaxed mb-4">
              Those who wish to discuss, publish, or reference this material,
              may make contact with me...
            </p>

            <div className="text-center">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=mailto:mickken@hotmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-900 hover:underline"
              >
                mickken@hotmail.com
              </a>
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-gray-100 text-center italic">
            <p className="text-gray-600">
              In the Twin Equal Hearts of Jesus and Mary...
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              © 2025 FATIMA: A Call To Salvation. All content presented
              faithfully without alteration.
            </p>
            <p className="mt-2 italic">
              Not A Promise Of Peace, But A Remedy For Souls
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}