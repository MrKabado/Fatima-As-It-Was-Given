"use client";
import { useState, useRef, useEffect, HTMLAttributes, useMemo } from "react";
import TextToSpeech from "@/components/TextToSpeech/TextToSpeech";
import { Pencil, Save } from "lucide-react";
import { htmlContainerStore } from "@/stores/htmlContainerStore";
import { authStore } from "@/stores/authStore";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "sonner";

interface ControlledEditableProps extends HTMLAttributes<HTMLDivElement> {
  isEditable: boolean;
  content: string;
  identifier: string;
  onContentChange?: (content: string) => void;
  className?: string;
  as?: "div" | "span";
}

function ControlledEditable({
  isEditable,
  content,
  identifier,
  onContentChange,
  className = "",
  as = "div",
  ...props
}: ControlledEditableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { updateContainer, setContainerContent } = htmlContainerStore();
  const { isAutheticated } = authStore();

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = content;
    }
  }, [content]);

  const handleBlur = async () => {
    if (!isAutheticated) {
      if (ref.current) {
        ref.current.innerHTML = content;
      }
      return;
    }

    if (!isEditable || !ref.current) return;

    const newContent = ref.current.innerHTML;
    if (newContent === content) return;

    setContainerContent(identifier, newContent);

    if (onContentChange) {
      onContentChange(newContent);
      return;
    }

    try {
      const success = await updateContainer(identifier, newContent);
      if (!success) {
        console.error("Failed to save content:", identifier);
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const Component = as === "span" ? "span" : "div";

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      contentEditable={isEditable && isAutheticated}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      className={className}
      {...props}
    />
  );
}

const goldenThreadDefaultContent = {
  "page4-page-title": "THE GOLDEN THREAD",
  "page4-heading-0": "JESUS CHRIST",
  "page4-content-0":
    "Every journey begins somewhere.\n\nI believe every genuine search for TRUTH must begin with Jesus Christ.\n\nNot the Church\nNot the Pope\nNot an apparition\nNot even Our Lady.\nOnly with Jesus.\n\nHe is the One who entered human history, revealed the Father, called mankind to repentance, died for our salvation, rose from the dead, and continues to call us to Himself.\n\nHis teaching was clear. Love God with your whole heart. Love your neighbour. Turn away from sin. Believe the Gospel. Forgive. Pray. Be faithful. Take up your cross and follow Him.\n\nThese are not suggestions.\nThey are the Way.\n\nI have come to believe that over the centuries mankind has gradually drifted away from that Way. We have often preferred comfort to conversion, opinion to obedience, and compromise to truth.\n\nThe question that began to occupy my mind was:\nIf Jesus came to show us the Way to salvation, why are we moving away from Him?\n\nThis question led me to look again at the events in Paris, Lourdes and Fatima. I began to ask whether Heaven was simply repeating the Gospel in a language suited to our own times, or whether there was something in those messages we had failed to understand.\n\nThis website is my attempt to explore those questions.\n\nI invite you to make the journey with me.\nNot to accept my conclusions without question, but to examine the evidence, reflect on it in good conscience, and ask yourself one question:\nAm I moving towards Jesus?\n\nIf that question remains at the center of our journey, then every page that follows will have served its purpose.",
  "page4-heading-1": "HIS CALL TO SALVATION",
  "page4-content-1":
    "If Jesus Christ is the center of our journey, then we must ask why He came.\n\nHe came because God loves mankind.\n\nHe came to call sinners to repentance, to reconcile us with the Father, and to open the way to eternal life.\n\nSalvation is not merely about living a good life. It is about responding to God's invitation to become the people He created us to be.\n\nJesus spoke often about salvation, but He also spoke of the choices that lead towards it, or lead away from it.\n\nHe called us to repent.\nHe called us to believe.\nHe called us to pray.\nHe called us to forgive.\nHe called us to love God above all things, and love our neighbour as ourselves.\n\nHe spoke of Heaven as our true home.\n\nHe spoke of Hell, not to frighten us, but to urge us to choose life.\n\nAs I reflected on the Gospels, one thought kept returning to me...\nIf salvation was so central to Jesus's mission, why does so much of modern Christianity seem to speak more about earthly happiness than eternal destiny?\n\nThat question became the beginning of my search...\nIs there something wrong in our Church, and if so, can we help?\n\nIt eventually led me to ask whether Heaven continues to remind us of Jesus's message through the apparitions at Paris, Lourdes and, most especially, Fatima.\n\nThe pages that follow explain why I believe that question deserves very careful consideration.\n\nMy invitation is simple.\nWalk the journey with me.\nAsk the questions.\nExamine the evidence.\n\nAbove all, keep asking yourself:\nAM I RESPONDING TO JESUS'S CALL TO SALVATION?",
  "page4-heading-2": "MANKIND'S DRIFT",
  "page4-content-2":
    "Jesus showed us the Way.\nHe called us to repentance, obedience, prayer and faithfulness.\n\nIf His Way leads to salvation, then another question follows:\nWhy has mankind continued to drift away from it?\n\nHistory is a story of great achievements, but also of repeated failures.\n\nEvery generation has known war, injustice, pride, greed, violence and a rejection of God's will.\n\nWe have become skilled at changing the world around us, yet often very reluctant to change ourselves.\n\nThe drift is rarely sudden.\nIt begins with small compromises.\n\nSin becomes acceptable.\nTruth becomes negotiable.\nGod becomes less central in our lives.\n\nEventually we no longer ask the most important question of all:\nWHAT DOES GOD ASK OF ME?\n\nAnd then I thought:\nIF JESUS KNEW WE WOULD CONTINUE TO DRIFT FROM HIM, WOULD HE LEAVE US TO OURSELVES?\n\nOr:\nBECAUSE OF HIS LOVE FOR US, WOULD HE CONTINUE TO CALL US BACK TO HIM?\n\nThis led me to look beyond history and ask whether Heaven itself had continued to guide mankind with a renewed urgency.\n\nThe next stage of that journey begins, not with mankind's response, but with Heaven's.",
  "page4-heading-3": "HEAVEN'S RESPONSE",
  "page4-content-3":
    "If mankind had drifted from the path shown by Jesus Christ, what would we expect from a loving God?\n\nWould He abandon His children?\nOr:\nWould He continue to call them back?\n\nGod has never ceased calling us back:\nHe sent His prophets.\nHe sent His Son.\n\nAnd when we continued to drift, I believe He sent His Mother with a message echoing His own:\nReturn to God.\nRepent.\nPray.\nMake reparation.\nChoose the path that leads to salvation.\n\nI believe this is the thread that unites the great Marian apparitions.\n\nParis is not an isolated event.\nLourdes is not an isolated event.\nFatima is not an isolated event.\n\nI believe they form a continuous appeal from Heaven, each one building on the last, each one repeating the same loving invitation in a world moving even further from Jesus.\n\nThe messenger is different from the sender.\nThe voice is a mother's voice.\nThe invitation remains Her Son's.\n\nThat understanding changed the way I began to read the messages.\nInstead of asking what happened at Paris, Lourdes, or Fatima?\nI began to ask what is Heaven trying to tell me?",
  "page4-heading-4": "MARY'S ROLE",
  "page4-content-4":
    "I believe Jesus sent His Mother to help us.\n\nShe did not choose this role.\nGod chose Her for it.\nShe accepted it with humility.\n\nAs She did long ago:\nLET IT BE DONE TO ME ACCORDING TO THY WORD.\n\nShe never pointed to Herself. She always pointed to Her Son.\n\nHer message has never changed. Do whatever He asks.\n\nI looked at Paris, Lourdes, and Fatima.\nThe messenger is always the Mother.\nThe purpose is always the Son.\nThe appeal is always the salvation of souls.\n\nHer role is not to replace Jesus, but to lead us back to Him.\nEvery request She makes has that goal.\n\nPrayer.\nRepentance.\nReparation.\nConversion.\nFaithfulness.\n\nThese are not new teachings, but rather the Gospel spoken with a mother's voice.\n\nBut why at this time in history?\nThat answer I believe lies in the message of Fatima.",
  "page4-heading-5": "FATIMA'S URGENCY",
  "page4-content-5":
    "As I reflected on the events of 1917, again, after many times, it struck me.\n\nBefore peace.\nBefore Russia.\nBefore Rosary.\nBefore Consecration.\nShe showed the children Hell.\n\nShe was telling me Her concern.\nIt was not politics.\nIt was not nations.\nIt was not war.\nIT WAS THE WELFARE OF SOULS.\n\nWhether we reflect on that vision literally, symbolically, or devotionally, the message is unmistakably urgent...\nSALVATION MATTERS.\n\nEverything that followed, calls to prayer, repentance, reparation, consecration, sacrifice, devotion and conversion, all flow from that vision.\nA CALL TO RESCUE MANKIND.\n\nUnderstanding that changed everything about Fatima.\nThose requests weren't isolated devotions.\n\nThey were Heaven's response to our drift from Jesus.\n\nBut what did Heaven want of us?\nAnd so urgently.",
  "page4-heading-6": "HEAVEN'S REQUESTS",
  "page4-content-6":
    "So, if Fatima is, above all, a call to the salvation of souls, then:\nWhat did Heaven actually ask of us?\n\nWe were not asked for some complicated theology.\nWe were not asked for extraordinary achievements.\nWe were not asked for extraordinary faithfulness.\n\nWe were asked to:\nPray the Rosary.\nOffer little sacrifices in reparation for sin.\nSeek a personal conversion.\nWear the Brown Scapular.\nPractice the Five First Saturdays of Reparation.\nAccept suffering with trust in God.\nLive lives of obedience to God.\n\nThese were the early requests.\n\nALL POINTING AWAY FROM SELF AND LEADING TO JESUS.\n\nWith some reluctance I stood before the mirror.\nThe mirror is my best friend or my worst enemy.\n\nI asked.\nHOW AM I DOING?",
  "page4-heading-7": "HOW AM I DOING?",
  "page4-content-7":
    "My salvation does not depend on...\nHow the world is doing.\nHow the church is doing.\nHow others are doing.\n\nMy salvation depends on...\nAm I moving closer to Jesus?\nAm I responding to His call?\nAm I praying?\nAm I making reparation?\nAm I placing my trust in Him?\n\nGiven that Heaven's requests are so clear...\nHAVE I RESPONDED AS HEAVEN REQUESTED?\n\nMirror aside, I do not like my mark out of 100.\n\nBut the question, and my miserable grades, prompted another question, and perhaps created another problem.\n\nI looked at history, the church, apparitions, and testimonies of those involved.\nWhat I discovered surprised me.\n\nWalk with me...",
  "page4-heading-8": "HAVE I READ FATIMA CORRECTLY?",
  "page4-content-8":
    "Until this point, my journey had been one of discovery.\n\nI had come to see Jesus as the center of salvation.\nI had come to understand Fatima as an urgent call to return to Him.\nI had reflected on Heaven's requests to me and asked...\nHow am I doing?\n\nBut one question I could not shake off...\nHAVE I UNDERSTOOD FATIMA AS HEAVEN INTENDED?\n\nBecause if it was just behave and turn back to Jesus, then Her job was done by 1925, as far as my salvation was concerned.\n\nBut She introduced more requests.\nAnd not to me, but to the Church.\n\nBut then I had the mysterious third part of the secret.\nI had the promise to return to ask for the consecration of Russia.\nI had the various communications with Heaven until 1957.\n\nI was a bit more than confused.\n\nI was looking at Fatima, as I was reading it, as it happened, just as everyone did.\n\nI had focused on Fatima because the Church would not tell me the message it was instructed to tell me in 1960.\nBut this is the 2020's.\nI now see those other requests in a different light.\n\nSee below: Our Lady and Our Salvation.\n\nHeaven doesn't give gifts.\nEverything It does is by way of a warning and a remedy.\n\nThe warning being along the lines...\nWe will face consequences if we are not aligned with Jesus.\n\nThe remedy being to repent and turn back to Him.\n\nThe way to get us to pay attention is the attending miracle(s).\nThe miracles are the proof that Heaven is involved.\n\nSo, I followed the miracles.\n\nI only accepted undisputable supernatural events. This led me to Paris 1830, Lourdes 1858, and Fatima 1917 plus the preserved body of Jacinta and Lucia's exact prediction.\n\nThese three stood in a league of their own.",
  "page4-heading-9": "WHERE MY JOURNEY LED",
  "page4-content-9":
    "As I continued to examine the messages of Paris, Lourdes and Fatima, I gradually came to conclusions that differed from those I had accepted for most of my life.\n\nThose conclusions did not appear suddenly. They emerged over many years of reading, reflection, prayer and comparison with the messages themselves.\n\nI realise that some of my interpretations differ significantly from those commonly presented.\n\nFor that reason I have tried throughout this website to distinguish carefully between historical events, the recorded messages, and my conclusions.\n\nRather than interrupt the Golden Thread with detailed discussion, I have brought my principal observations together in a separate work entitled:\nOUR LADY AND OUR SALVATION\n\nIn that booklet I explain, step by step, how I came to my understanding of the relationship between the messages of Paris, Lourdes and Fatima, and why I believe they should be reconsidered.\n\nYou may agree with my conclusions.\nYou may disagree with my conclusions.\n\nMy hope is that you examine the evidence carefully, reflect, and decide for yourself.\n\nA copy of Our Lady and Our Salvation is available on request onsite.",
};

const defaultContent = {
  // Page 1 - ABOUT THIS SITE
  "page1-content":
    "At Fatima, Heaven did not come to negotiate peace, but to warn of " +
    "impending loss. The vision of Hell, showing souls falling into Hell, " +
    "seemingly in real time, is a clear sign of the urgency of the " +
    "message. God wishes to save souls from Hell by Repentance, " +
    "Reparation, and Obedience. This site exists to restore that order.",

  // Page 2 - ABOUT THE DANGER
  "page2-content-0":
    "Fatima begins where it must: with the vision of eternity in Hell. " +
    "The children were shown Hell to show them what is at stake in as " +
    "striking a manner as possible. Little Jacinta spent the rest of her " +
    "life doing little sacrifices to save sinners from that fate. " +
    "Everything at Fatima is ordered—that souls might be saved.",
  "page2-content-1":
    "I believe that at Fatima the greatest danger revealed was not the " +
    "persecution from without, but the deception from within. The gravest " +
    "possibility raised by the message is that souls may be lost, not " +
    "through rebellion against God, but through misplaced trust, when " +
    "authority is followed with blind trust, and obedience is detached " +
    "from truth.",
  "page2-content-2":
    "Lucia understood that the most terrible suffering is not physical " +
    "destruction, but eternal loss; not martyrdom, but being led away " +
    "from the path of salvation while believing oneself to be secure.",
  "page2-content-3":
    "This is the message of Fatima first addressed to those entrusted " +
    "with guidance, and only then to those dependent on that guidance.",
  "page2-content-4":
    "Where clarity is absent, and silence replaces truth, where error is " +
    "allowed to masquerade as reassurance, the danger is not just " +
    "confusion..",

  // Page 3 - ABOUT THE REMEDY
  "page3-content-0":
    "At Fatima Jesus did not present His Mother's Immaculate Heart as a " +
    "devotion, but as a devotion equal to our devotion to His Own Sacred " +
    "Heart. Lucia repeatedly affirmed that Jesus wished to establish " +
    "devotion to Her Immaculate Heart, as a means by which souls would be " +
    "saved.",
  "page3-content-1":
    "Not to diminish Him in any way, but to obey Him, because salvation " +
    "only comes from Jesus, but by His Will through Her Immaculate Heart.",
  "page3-content-2":
    "Lucia's story leads us to that final interview in 1957 with Father " +
    "Fuentes, in which she describes Our Lady's final words for us. The " +
    "final battle She is having with Satan, where we must actively choose " +
    "Her side to be saved, or be lost to his by default.",
  "page3-content-3":
    "Our Lady bemoans the lack of help available to us. She stresses that " +
    "our only help is daily Rosary and devotion to Her Immaculate Heart.",
  "page3-content-4":
    "These are not guarantees of peace, but co-operation with grace, and",

  // Page 4 - ABOUT THE RESPONSIBILITY
  "page5-content-0":
    "My soul is not saved because I know that confusion exists.",
  "page5-content-1": "My soul is not saved because clarity is hard to find.",
  "page5-content-2": "Salvation is personal.",
  "page5-content-3": "My job is not to solve the crises.",
  "page5-content-4": "My job is to be faithful because of them.",

  // Page 5 - THE GOLDEN THREAD
  ...goldenThreadDefaultContent,

  // Page 6 - OBSERVATIONS TO PONDER
  "page6-content-0":
    "Lucia's credibility was firmly established in July 1917 when she " +
    "told people who had asked for the Lady to prove She was from " +
    "Heaven.",
  "page6-content-1":
    "Lucia clearly stated that the Lady would do so at noon, at the " +
    "Cova, on 13th of October. This is the ONLY exact future " +
    "prediction in history. The Press saw this, when others did not, " +
    "and they gave us every word from Lucia afterwards, directly.",
  "page6-content-2":
    "The requests mentioned in the Fatima story were seemingly meant " +
    "for the authorities, they were not. They were for us to discern " +
    "what happened to them.",
  "page6-content-3":
    "Jesus does not, and will not, punish me. Bad things can happen " +
    "to me because I am not 'with Him'. His love is always with me, " +
    "but sometimes my love is not with Him, that is when I am at " +
    "risk. He does not falter, I do.",
  "page6-content-4":
    "Lucia said that Our Lady was always sad, and never smiled. This " +
    "brought home to her the seriousness of the message.",
  "page6-content-5":
    "Fatima does not promise safety in history. Fatima does promise " +
    "that no soul need be lost for lack of grace. Everything Heaven " +
    "asked for was given so that, even in a time of confusion, a " +
    "soul willing to obey could still find its way.",
  "page6-content-6":
    "Our Lady at Fatima leaves no middle ground, either the remedy " +
    "is taken seriously, or the consequences will follow.",
  "header-title": "FATIMA: A Call To Salvation",
  "header-subtitle": "FATIMA: Not A Promise Of Peace, But A Remedy For Souls",

  "page2-heading-1": "IT IS THE LOSS OF SOULS.",
  "page2-heading-2": 'IT IS "TOO AWFUL FOR MANKIND"',

  "page3-heading": "GRACE IS WHAT SAVES SOULS.",

  "page5-heading": "I am responsible for that.",
  "page5-item-1": "I am responsible for my daily rosary.",
  "page5-item-2":
    "I am responsible to consecrate myself to the Immaculate Heart.",
  "page5-item-3": "I am responsible to make reparation for insults to Her.",

  // Page 8 - CONTACT DETAILS
  "page8-text-1":
    "This work is shared freely in the hope that it may be read with sincerity, and passed on with care.",
  "page8-text-2":
    "Those who wish to discuss, publish, or reference this material, may make contact with me...",
  "page8-email": "mickken@hotmail.com",
  "page8-footer-text": "In the Twin Equal Hearts of Jesus and Mary...",
  "footer-copyright":
    "© 2025 FATIMA: A Call To Salvation. All content presented faithfully without alteration.",
  "footer-tagline": "Not A Promise Of Peace, But A Remedy For Souls",
};

const pageLabelsByOrder = [
  { id: 1, label: "ABOUT THIS SITE" },
  { id: 2, label: "ABOUT THE DANGER" },
  { id: 3, label: "ABOUT THE REMEDY" },
  { id: 4, label: "ABOUT THE RESPONSIBILITY" },
  { id: 5, label: "THE GOLDEN THREAD" },
  { id: 6, label: "OBSERVATIONS TO PONDER" },
  { id: 7, label: "BOOKS" },
  { id: 8, label: "CONTACT DETAILS" },
];

const navigationItems = pageLabelsByOrder.map(({ id, label }) => ({ id, label }));

const books = [
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
  },
];

export default function Home() {
  const [activePage, setActivePage] = useState<number>(1);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const {
    containers,
    getAllContainers,
    getContainerContent,
    createContainer,
    updateContainer,
  } = htmlContainerStore();

  const { isAutheticated, checkAuthentication, logoutAccess } = authStore();

  // Check auth on mount, then poll every 30s
  useEffect(() => {
    const checkAuth = () =>
      checkAuthentication().catch((error) =>
        console.error("Error checking authentication:", error),
      );

    checkAuth();
    const intervalId = setInterval(checkAuth, 30000);
    return () => clearInterval(intervalId);
  }, [checkAuthentication]);

  // Load containers, seeding defaults for authenticated users
  useEffect(() => {
    const initializeContainers = async () => {
      try {
        await getAllContainers(!isAutheticated);

        if (isAutheticated) {
          for (const [identifier, content] of Object.entries(defaultContent)) {
            if (!getContainerContent(identifier)) {
              try {
                await createContainer(identifier, content);
              } catch {
                console.log("Container might already exist: ", identifier);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error initializing containers:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeContainers();
  }, [isAutheticated, getAllContainers, getContainerContent, createContainer]);

  const getContent = (identifier: string): string =>
    getContainerContent(identifier) ||
    defaultContent[identifier as keyof typeof defaultContent] ||
    "";

  const stripHtmlTags = (html: string): string => {
    if (!html) return "";
    if (typeof document === "undefined") {
      return html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();
    }
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const speechContent = useMemo(() => {
    if (!isInitialized) return "";

    return `${getContent("header-title")}
                ${getContent("header-subtitle")}

                ABOUT THIS SITE
                ${stripHtmlTags(getContent("page1-content"))}

                About the danger
                ${stripHtmlTags(getContent("page2-content-0"))}

                ${stripHtmlTags(getContent("page2-content-1"))}

                ${stripHtmlTags(getContent("page2-content-2"))}

                ${stripHtmlTags(getContent("page2-content-3"))}

                ${stripHtmlTags(getContent("page2-content-4"))}

                ${getContent("page2-heading-1")}
                ${getContent("page2-heading-2")}


                ABOUT THE REMEDY
                ${stripHtmlTags(getContent("page3-content-0"))}

                ${stripHtmlTags(getContent("page3-content-1"))}

                ${stripHtmlTags(getContent("page3-content-2"))}

                ${stripHtmlTags(getContent("page3-content-3"))}

                ${stripHtmlTags(getContent("page3-content-4"))}

                ${getContent("page3-heading")}


                ${getContent("page4-page-title")}
                ${Array.from({ length: 10 }, (_, index) => index)
                  .map(
                    (index) =>
                      `${getContent(`page4-heading-${index}`)}\n${stripHtmlTags(getContent(`page4-content-${index}`))}`,
                  )
                  .join("\n\n")}


                ABOUT THE RESPONSIBILITY
                ${stripHtmlTags(getContent("page5-content-0"))}

                ${stripHtmlTags(getContent("page5-content-1"))}

                ${stripHtmlTags(getContent("page5-content-2"))}

                ${stripHtmlTags(getContent("page5-content-3"))}

                ${stripHtmlTags(getContent("page5-content-4"))}


                ...


                ${getContent("page5-heading")}
                •
                ${getContent("page5-item-1")}
                •
                ${getContent("page5-item-2")}
                •
                ${getContent("page5-item-3")}


                OBSERVATIONS TO PONDER
                ${stripHtmlTags(getContent("page6-content-0"))}

                ${stripHtmlTags(getContent("page6-content-1"))}

                ${stripHtmlTags(getContent("page6-content-2"))}

                ${stripHtmlTags(getContent("page6-content-3"))}

                ${stripHtmlTags(getContent("page6-content-4"))}

                ${stripHtmlTags(getContent("page6-content-5"))}

                ${stripHtmlTags(getContent("page6-content-6"))}

                BOOKS
                The books listed on this site are those which I have found most helpful in understanding Fatima as it was given.

                ${stripHtmlTags(getContent("page8-text-1"))}

                ${stripHtmlTags(getContent("page8-text-2"))}

                ${getContent("page8-email")}
                ${getContent("page8-footer-text")}
                `;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, containers]);

  const handleContentChange = async (identifier: string, content: string) => {
    if (!isAutheticated) {
      console.warn(
        "Unauthorized: Cannot update content without authentication",
      );
      return;
    }
    try {
      const success = await updateContainer(identifier, content);
      if (!success) {
        console.error("Failed to save content:", identifier);
        toast.error("Failed to save content. Please try again.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Error saving content. Please try again.");
    }
  };

  // Single helper replaces the four near-identical updatePageXContent functions
  const updatePageContent = (page: number, index: number, content: string) =>
    handleContentChange(`page${page}-content-${index}`, content);

  const handleToggleEdit = () => {
    if (!isAutheticated) {
      toast.success("Please login with access code to enable edit mode.");
      return;
    }
    setIsEditable(!isEditable);
  };

  const handleLogout = async () => {
    setIsEditable(false);
    await logoutAccess();
    await checkAuthentication();
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-serif">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-2">
            <ControlledEditable
              isEditable={isEditable}
              content={getContent("header-title")}
              identifier="header-title"
              onContentChange={(content) =>
                handleContentChange("header-title", content)
              }
              className="text-3xl md:text-4xl text-center font-bold text-gray-900"
            />
          </h1>
          <p className="text-lg text-center text-gray-600 italic">
            <ControlledEditable
              isEditable={isEditable}
              content={getContent("header-subtitle")}
              identifier="header-subtitle"
              onContentChange={(content) =>
                handleContentChange("header-subtitle", content)
              }
              className="text-lg text-center text-gray-600 italic"
              as="span"
            />
          </p>
        </div>

        <div className="fixed bottom-10 right-15 z-50">
          <TextToSpeech textContent={speechContent} />
        </div>

        {isAutheticated && (
          <div
            className="fixed bottom-30 right-16 shadow-sm border bg-white border-gray-300 rounded-full p-3 z-50 cursor-pointer"
            title={isEditable ? "Save and Exit Edit Mode" : "Enter Edit Mode"}
            onClick={handleToggleEdit}
          >
            {isEditable ? (
              <Save className="w-8 h-8 text-black-600 hover:text-black-800" />
            ) : (
              <Pencil className="w-8 h-8 text-black hover:text-gray-600" />
            )}
          </div>
        )}

        {isAutheticated && (
          <button
            onClick={handleLogout}
            className="fixed right-16 bottom-50 shadow-sm border bg-white border-gray-300 rounded-full p-3 z-50 cursor-pointer"
          >
            <IoIosLogOut className="text-black w-8 h-8 bold" />
          </button>
        )}

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

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page 1 - ABOUT THIS SITE */}
        <section
          className={`${activePage === 1 ? "block" : "hidden"} space-y-6`}
        >
          <ControlledEditable
            isEditable={isEditable}
            content={getContent("page1-content")}
            identifier="page1-content"
            onContentChange={(content) =>
              handleContentChange("page1-content", content)
            }
            className="text-lg leading-relaxed"
          />
        </section>

        {/* Page 2 - ABOUT THE DANGER */}
        <section
          className={`${activePage === 2 ? "block" : "hidden"} space-y-6`}
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <ControlledEditable
              key={index}
              isEditable={isEditable}
              content={getContent(`page2-content-${index}`)}
              identifier={`page2-content-${index}`}
              onContentChange={(content) =>
                updatePageContent(2, index, content)
              }
              className="text-lg leading-relaxed"
            />
          ))}

          <div className="pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-center">
              <ControlledEditable
                isEditable={isEditable}
                content={getContent("page2-heading-1")}
                identifier="page2-heading-1"
                onContentChange={(content) =>
                  handleContentChange("page2-heading-1", content)
                }
                className="text-2xl font-bold text-center"
              />
            </h2>
            <h3 className="text-xl font-bold text-center italic">
              <ControlledEditable
                isEditable={isEditable}
                content={getContent("page2-heading-2")}
                identifier="page2-heading-2"
                onContentChange={(content) =>
                  handleContentChange("page2-heading-2", content)
                }
                className="text-xl font-bold text-center italic"
              />
            </h3>
          </div>
        </section>

        {/* Page 3 - ABOUT THE REMEDY */}
        <section
          className={`${activePage === 3 ? "block" : "hidden"} space-y-6`}
        >
          {[0, 1, 2, 3].map((index) => (
            <ControlledEditable
              key={index}
              isEditable={isEditable}
              content={getContent(`page3-content-${index}`)}
              identifier={`page3-content-${index}`}
              onContentChange={(content) =>
                updatePageContent(3, index, content)
              }
              className="text-lg leading-relaxed"
            />
          ))}

          <div className="pt-6">
            <ControlledEditable
              isEditable={isEditable}
              content={getContent("page3-content-4")}
              identifier="page3-content-4"
              onContentChange={(content) => updatePageContent(3, 4, content)}
              className="text-lg leading-relaxed"
            />
            <h2 className="text-2xl font-bold mt-2">
              <ControlledEditable
                isEditable={isEditable}
                content={getContent("page3-heading")}
                identifier="page3-heading"
                onContentChange={(content) =>
                  handleContentChange("page3-heading", content)
                }
                className="text-2xl font-bold"
              />
            </h2>
          </div>
        </section>

        {/* Page 4 - ABOUT THE RESPONSIBILITY */}
        <section
          className={`${activePage === 4 ? "block" : "hidden"} space-y-6`}
        >
          <div className="text-center space-y-4 italic">
            {[0, 1, 2, 3, 4].map((index) => (
              <ControlledEditable
                key={index}
                isEditable={isEditable}
                content={getContent(`page5-content-${index}`)}
                identifier={`page5-content-${index}`}
                onContentChange={(content) =>
                  updatePageContent(5, index, content)
                }
                className="text-lg leading-relaxed text-center italic"
              />
            ))}
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-bold mb-4">
              <ControlledEditable
                isEditable={isEditable}
                content={getContent("page5-heading")}
                identifier="page5-heading"
                onContentChange={(content) =>
                  handleContentChange("page5-heading", content)
                }
                className="text-xl font-bold"
              />
            </h3>

            <ul className="space-y-3 pl-4">
              {[1, 2, 3].map((n) => (
                <li key={n} className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <ControlledEditable
                      isEditable={isEditable}
                      content={getContent(`page5-item-${n}`)}
                      identifier={`page5-item-${n}`}
                      onContentChange={(content) =>
                        handleContentChange(`page5-item-${n}`, content)
                      }
                      className=""
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Page 5 - THE GOLDEN THREAD */}
        <section
          className={`${activePage === 5 ? "block" : "hidden"} space-y-10`}
        >
          <h2 className="text-3xl font-bold uppercase tracking-[0.2em] text-center mb-6">
            <ControlledEditable
              isEditable={isEditable}
              content={getContent("page4-page-title")}
              identifier="page4-page-title"
              onContentChange={(content) =>
                handleContentChange("page4-page-title", content)
              }
              className="text-3xl font-bold uppercase tracking-[0.2em] text-center"
            />
          </h2>

          {Array.from({ length: 10 }, (_, index) => index).map((index) => (
            <div key={index} className="space-y-3 mb-40">
              <h3 className="text-xl font-semibold uppercase tracking-[0.15em] text-center mb-10">
                <ControlledEditable
                  isEditable={isEditable}
                  content={getContent(`page4-heading-${index}`)}
                  identifier={`page4-heading-${index}`}
                  onContentChange={(content) =>
                    handleContentChange(`page4-heading-${index}`, content)
                  }
                  className="text-xl font-semibold uppercase tracking-[0.15em] text-center"
                />
              </h3>

              <ControlledEditable
                isEditable={isEditable}
                content={getContent(`page4-content-${index}`)}
                identifier={`page4-content-${index}`}
                onContentChange={(content) =>
                  updatePageContent(4, index, content)
                }
                className="text-lg leading-8 text-left whitespace-pre-line"
              />
            </div>
          ))}
        </section>

        {/* Page 6 - OBSERVATIONS TO PONDER */}
        <section
          className={`${activePage === 6 ? "block" : "hidden"} space-y-8`}
        >
          <ul className="space-y-8">
            {[0, 1, 2, 3, 4].map((index) => (
              <li key={index} className="pb-6 border-b border-gray-100">
                <ControlledEditable
                  isEditable={isEditable}
                  content={getContent(`page6-content-${index}`)}
                  identifier={`page6-content-${index}`}
                  onContentChange={(content) =>
                    updatePageContent(6, index, content)
                  }
                  className="text-lg leading-relaxed"
                />
              </li>
            ))}

            <li>
              <div className="space-y-4">
                <ControlledEditable
                  isEditable={isEditable}
                  content={getContent("page6-content-5")}
                  identifier="page6-content-5"
                  onContentChange={(content) =>
                    updatePageContent(6, 5, content)
                  }
                  className="text-lg leading-relaxed"
                />
                <ControlledEditable
                  isEditable={isEditable}
                  content={getContent("page6-content-6")}
                  identifier="page6-content-6"
                  onContentChange={(content) =>
                    updatePageContent(6, 6, content)
                  }
                  className="text-lg leading-relaxed font-semibold"
                />
              </div>
            </li>
          </ul>
        </section>

        {/* Page 7 - BOOKS */}
        <section
          className={`${activePage === 7 ? "block" : "hidden"} space-y-6`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {books.map((book, index) => (
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

        {/* Page 8 - CONTACT DETAILS */}
        <section
          className={`${activePage === 8 ? "block" : "hidden"} space-y-6`}
        >
          <p className="text-lg leading-relaxed">
            <ControlledEditable
              isEditable={isEditable}
              content={getContent("page8-text-1")}
              identifier="page8-text-1"
              onContentChange={(content) =>
                handleContentChange("page8-text-1", content)
              }
              className="text-lg leading-relaxed"
              as="span"
            />
          </p>

          <div className="pt-6">
            <p className="text-lg leading-relaxed mb-4">
              <ControlledEditable
                isEditable={isEditable}
                content={getContent("page8-text-2")}
                identifier="page8-text-2"
                onContentChange={(content) =>
                  handleContentChange("page8-text-2", content)
                }
                className="text-lg leading-relaxed"
                as="span"
              />
            </p>

            <div className="text-center">
              <a
                href={`mailto:${getContent("page8-email")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-900 hover:underline"
              >
                <ControlledEditable
                  isEditable={isEditable}
                  content={getContent("page8-email")}
                  identifier="page8-email"
                  onContentChange={(content) =>
                    handleContentChange("page8-email", content)
                  }
                  className="text-lg text-gray-900"
                />
              </a>
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-gray-100 text-center italic">
            <p className="text-gray-600">
              <ControlledEditable
                isEditable={isEditable}
                content={getContent("page8-footer-text")}
                identifier="page8-footer-text"
                onContentChange={(content) =>
                  handleContentChange("page8-footer-text", content)
                }
                className="text-gray-600"
                as="span"
              />
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              <ControlledEditable
                isEditable={isEditable}
                content={getContent("footer-copyright")}
                identifier="footer-copyright"
                onContentChange={(content) =>
                  handleContentChange("footer-copyright", content)
                }
                className="text-sm text-gray-500"
                as="span"
              />
            </p>
            <p className="mt-2 italic">
              <ControlledEditable
                isEditable={isEditable}
                content={getContent("footer-tagline")}
                identifier="footer-tagline"
                onContentChange={(content) =>
                  handleContentChange("footer-tagline", content)
                }
                className="text-sm text-gray-500 italic"
                as="span"
              />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
