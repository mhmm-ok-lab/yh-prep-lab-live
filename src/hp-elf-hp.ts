// HP ELF på provnivå: egna engelska texter (inga UHR-texter). En längre text (4 frågor), en lucktext
// (3 luckor) och en kort text (3 frågor). Nivå: 3 lätt, 4 medel, 3 svår.
// Ligger först i HP_ELF_TEXTS, så de delas ut före de äldre.
import type { HpLasOption, HpLasText } from "./hp-las";

const o = (text: string, why: string): HpLasOption => ({ text, why });

export const HP_ELF_TEXTS_HP: HpLasText[] = [
  {
    id: "elf-hp-attention",
    title: "The Goldfish That Wasn't",
    topic: "psykologi",
    paragraphs: [
      "Few statistics have travelled as far as the claim that the human attention span has shrunk to eight seconds, one second shorter than that of a goldfish. It has been quoted in marketing presentations, newspaper columns and speeches by politicians, usually as evidence that smartphones have rewired our brains. Its appeal is easy to understand. It is short, it is alarming, and it confirms what many people already suspect about the age they live in.",
      "The trouble begins when one tries to trace it. The figure is usually attributed to a report published by a technology company, which in turn cited a website that collects statistics. Researchers who have attempted to follow the trail further have found no study that measured anything of the kind. Nor is it clear what the number would mean if it existed. Attention is not a single quantity that can be read off like body temperature. Psychologists distinguish between the ability to sustain focus on a dull task, the ability to ignore distractions and the ability to switch efficiently between tasks, and each depends heavily on the situation. The same person who abandons a dense article after a minute may spend three hours absorbed in a novel or a game.",
      "The comparison with the goldfish fares no better. Experiments in which goldfish are trained to respond to particular sounds or colours suggest that they can remember such associations for weeks or even months. The fish, it seems, has been as badly served by the statistic as we have.",
      "None of this proves that nothing has changed. There is reasonable evidence that people switch between screens and applications more often than they did twenty years ago, and that frequent interruptions make demanding work slower and more prone to error. But a change in habits is not the same thing as a change in capacity. If we check our phones constantly, it may be because the phones are designed to reward checking, not because our brains have lost the ability to do otherwise. The distinction matters, because the two explanations call for very different remedies.",
      "If the problem lies in capacity, the outlook is bleak: we would be dealing with a damaged faculty that might take generations to repair. If it lies in habits and environments, the outlook is more hopeful, since habits can be altered and environments redesigned. Schools can protect periods of uninterrupted work; employers can stop expecting instant replies to every message; individuals can switch off notifications. Such measures are modest, but they address something that actually exists.",
      "The goldfish statistic, in other words, is not merely inaccurate. It is unhelpful, because it encourages a kind of fatalism. A generation told that its attention has been permanently broken has little reason to try to use it. The more useful message is less dramatic and therefore less likely to be repeated: our attention is shaped by the circumstances we create, and those circumstances are, to a considerable degree, within our control.",
    ],
    questions: [
      {
        id: "elf-hp-attention-1",
        type: "huvudtanke",
        level: "medel",
        prompt: "What is the main argument of the text?",
        options: [
          o("Smartphones have permanently reduced people's capacity to concentrate.", "Det är påståendet texten angriper. Stycke 4: 'a change in habits is not the same thing as a change in capacity'."),
          o("A popular claim about shrinking attention lacks support and distracts from changes we could actually make.", "Rätt. Stycke 2 visar att siffran saknar källa, stycke 5–6 att vanor och miljöer går att ändra och att myten göder fatalism."),
          o("Goldfish have better memories than is commonly assumed.", "Bara en detalj i stycke 3, inte textens huvudpoäng."),
          o("Psychologists have not yet agreed on a definition of attention.", "Förvrängning. Stycke 2 säger att psykologer skiljer mellan olika förmågor, inte att de är oense."),
        ],
        correct: 1,
        paragraph: 3,
      },
      {
        id: "elf-hp-attention-2",
        type: "detalj",
        level: "latt",
        prompt: "What did researchers find when they tried to trace the eight-second figure?",
        options: [
          o("No study that had actually measured it.", "Rätt. Stycke 2: they 'have found no study that measured anything of the kind'."),
          o("That it came from experiments on goldfish.", "Fel. Guldfiskförsöken i stycke 3 handlar om minne och motsäger tvärtom siffran."),
          o("That it was based on a survey of smartphone users.", "Står inte i texten. Ingen enkät nämns."),
          o("That the technology company had measured it with too small a sample.", "Fel. Företaget hade inte mätt något; det 'cited a website that collects statistics' (stycke 2)."),
        ],
        correct: 0,
        paragraph: 1,
      },
      {
        id: "elf-hp-attention-3",
        type: "ordbetydelse",
        level: "medel",
        prompt: "As used in the final paragraph, 'fatalism' refers to",
        options: [
          o("a fear of death.", "Fel betydelse. Ordet liknar 'fatal', men sammanhanget handlar om att ge upp, inte om döden."),
          o("an exaggerated trust in statistics.", "Fel. Statistiken är orsaken till fatalismen, inte vad ordet betyder."),
          o("a belief that nothing can be done to change the situation.", "Rätt. Nästa mening förklarar: den som får höra att uppmärksamheten är 'permanently broken' har 'little reason to try'."),
          o("a tendency to blame technology companies.", "Fel. Att skylla på företag nämns inte; ordet handlar om uppgivenhet."),
        ],
        correct: 2,
        paragraph: 5,
      },
      {
        id: "elf-hp-attention-4",
        type: "slutsats",
        level: "svar",
        prompt: "Which conclusion is best supported by the text?",
        options: [
          o("Since attention is not a single quantity, it is pointless to study how technology affects it.", "Fel. Författaren hänvisar själv till belägg om avbrott och skärmbyten (stycke 4); det är bara åtta-sekunderssiffran som avfärdas."),
          o("People today switch between tasks less efficiently than people did twenty years ago.", "Lockande men fel. Stycke 4 säger att vi byter oftare ('more often'), inte att vi gör det sämre."),
          o("Switching off notifications will restore attention spans that have been damaged.", "Nära, men fel premiss. Åtgärderna i stycke 5 riktar sig mot vanor och miljö; författaren tvivlar på att förmågan har skadats."),
          o("Frequent interruptions harm demanding work, but this does not show that people have lost the ability to concentrate.", "Rätt. Stycke 4 medger att avbrott försämrar krävande arbete men skiljer 'a change in habits' från 'a change in capacity'."),
        ],
        correct: 3,
        paragraph: 3,
      },
    ],
  },
  {
    id: "elf-hp-lucka-nattag",
    title: "Gap-fill: The Return of the Night Train",
    topic: "samhälle",
    paragraphs: [
      "Only a decade ago, night trains in much of Europe seemed (1) ___ for extinction. Operators complained that sleeper carriages were expensive to maintain, and cheap flights had made the slow overnight journey look like a relic. Several long-standing routes were cancelled, and few observers expected them to return.",
      "Since then, the trend has partly reversed. Growing concern about the climate impact of flying has made a night on the rails attractive to travellers who would (2) ___ have boarded a plane, and several governments have offered subsidies to reopen old routes. Yet the revival remains fragile. Tickets are often more expensive than flights, and the trains depend on a patchwork of national rail networks with different rules and fees. (3) ___ these obstacles are removed, the night train is likely to remain a choice for the committed rather than the default for the many.",
    ],
    questions: [
      {
        id: "elf-hp-lucka-nattag-1",
        type: "ordbetydelse",
        level: "latt",
        prompt: "Which alternative best fits gap (1)?",
        options: [
          o("devoted", "Fel. 'Devoted to' betyder hängiven; passar varken med 'for' eller betydelsen."),
          o("destined", "Rätt. 'Destined for extinction' = på väg att dö ut, vilket stämmer med inställda linjer och att få väntade sig en återkomst."),
          o("reluctant", "Fel. 'Reluctant' = motvillig och följs av 'to'; tåg kan inte vara motvilliga till att dö ut."),
          o("accustomed", "Fel. 'Accustomed to' = van vid; ger ingen mening med 'for extinction'."),
        ],
        correct: 1,
        paragraph: 0,
      },
      {
        id: "elf-hp-lucka-nattag-2",
        type: "ordbetydelse",
        level: "medel",
        prompt: "Which alternative best fits gap (2)?",
        options: [
          o("hardly", "Fel. 'Would hardly have boarded a plane' betyder att de knappast hade flugit, men poängen är att nattåget lockar dem som annars hade flugit."),
          o("therefore", "Fel. Inget orsakssamband att markera; resenärerna flyger inte 'därför'."),
          o("otherwise", "Rätt. 'Would otherwise have boarded a plane' = hade annars flugit; klimatoron får dem att välja tåget i stället."),
          o("nevertheless", "Fel. 'Nevertheless' kräver en motsättning till något föregående, och här finns ingen."),
        ],
        correct: 2,
        paragraph: 1,
      },
      {
        id: "elf-hp-lucka-nattag-3",
        type: "ordbetydelse",
        level: "svar",
        prompt: "Which alternative best fits gap (3)?",
        options: [
          o("Once", "Fel. 'Once these obstacles are removed' leder till att tåget blir vanligare, inte att det förblir ett val för de få."),
          o("Although", "Fel. 'Although these obstacles are removed' påstår att hindren redan är borta, men meningarna före säger att de finns kvar."),
          o("Because", "Fel. Att hindren tas bort kan inte vara orsaken till att tåget förblir ett nischval; logiken blir bakvänd."),
          o("Unless", "Rätt. 'Unless' = om inte: så länge hindren (dyra biljetter, olika regler) finns kvar förblir nattåget ett val för de redan övertygade."),
        ],
        correct: 3,
        paragraph: 1,
      },
    ],
  },
  {
    id: "elf-hp-boredom",
    title: "In Defence of Boredom",
    topic: "psykologi",
    paragraphs: [
      "Boredom has a bad reputation. It is treated as a problem to be solved, preferably at once, and modern life offers endless means of solving it: a phone in every pocket ensures that no queue or bus ride need ever be empty. Yet some psychologists have begun to argue that we are too quick to escape it.",
      "Their argument is not that boredom is pleasant, but that it is informative. The discomfort of being bored, they suggest, works rather like hunger: it signals that the current activity is failing to meet our needs and pushes us to look for something more meaningful. In studies where participants first performed a tedious task, many afterwards produced more varied ideas in a creative exercise than those who had not been bored, although the effect has not appeared in every experiment.",
      "If this is right, the habit of reaching for a screen at the first hint of boredom may be counterproductive. It removes the discomfort without answering the question the discomfort was asking. The point is not that we should seek out boredom for its own sake, still less that children should be left without stimulation. It is that a feeling we routinely treat as a malfunction may, on occasion, be doing its job.",
    ],
    questions: [
      {
        id: "elf-hp-boredom-1",
        type: "detalj",
        level: "latt",
        prompt: "According to the text, boredom resembles hunger in that it",
        options: [
          o("can be satisfied by a short break.", "Står inte i texten. Jämförelsen gäller vad känslan signalerar, inte hur den stillas."),
          o("is a pleasant feeling that people seek out.", "Fel. Stycke 2: 'not that boredom is pleasant'."),
          o("signals that something is missing and pushes us to act.", "Rätt. Stycke 2: it 'signals that the current activity is failing to meet our needs and pushes us to look for something more meaningful'."),
          o("becomes stronger the longer it is ignored.", "Låter rimligt om hunger, men texten säger inget om att tristess växer med tiden."),
        ],
        correct: 2,
        paragraph: 1,
      },
      {
        id: "elf-hp-boredom-2",
        type: "syfte",
        level: "medel",
        prompt: "What is the author's main purpose?",
        options: [
          o("To argue that children should be bored more often.", "Fel. Stycke 3 avvisar det uttryckligen: 'still less that children should be left without stimulation'."),
          o("To suggest that boredom may serve a useful purpose and that we escape it too quickly.", "Rätt. Stycke 1 ('too quick to escape it') och stycke 3 ('may, on occasion, be doing its job')."),
          o("To present research proving that boredom makes people creative.", "För starkt. Stycke 2: effekten 'has not appeared in every experiment', så inget är bevisat."),
          o("To warn that smartphones destroy creativity.", "För starkt. Telefonen nämns som ett sätt att fly tristess; texten säger 'may be counterproductive', inte att den förstör något."),
        ],
        correct: 1,
        paragraph: 2,
      },
      {
        id: "elf-hp-boredom-3",
        type: "slutsats",
        level: "svar",
        prompt: "Which statement would the author most likely agree with?",
        options: [
          o("Boredom should be actively sought out because it reliably leads to creativity.", "Lockande men fel. Stycke 3: 'not that we should seek out boredom for its own sake', och effekten är inte pålitlig (stycke 2)."),
          o("Since the research is inconclusive, boredom has no particular function.", "Fel. Trots osäkra resultat håller författaren fast vid att känslan 'may, on occasion, be doing its job'."),
          o("Using a phone in a boring moment is always harmful.", "För starkt. Texten säger 'may be counterproductive', inte 'always harmful'."),
          o("The discomfort of boredom is sometimes worth noticing rather than removing at once.", "Rätt. Stycke 3: att genast ta fram skärmen tar bort obehaget 'without answering the question the discomfort was asking'."),
        ],
        correct: 3,
        paragraph: 2,
      },
    ],
  },
];
