import { LanguageKey } from './languages';

/**
 * Every piece of user-facing text in the app.
 * Each language must provide the full shape, so a missing translation is a compile error.
 */
export interface Translations {
  header: {
    subtitle: string;
    languageLabel: string;
  };
  footer: {
    message: string;
  };
  donate: string;
  home: {
    heading: string;
    intro: string;
    activitiesLabel: string;
  };
  activities: {
    spelling: { title: string; description: string };
    counting: { title: string; description: string };
    biggestSmallest: { title: string; description: string };
    sequence: { title: string; description: string };
  };
  common: {
    backToMenu: string;
    numberOfProblems: string;
    generate: string;
    print: string;
    removeRow: string;
  };
  spelling: {
    instruction: string;
    maxLetters: string;
    picture: string;
    showWord: string;
  };
  counting: {
    instruction: string;
    maxItems: string;
    itemsToCount: string;
    showAnswer: string;
  };
  biggestSmallest: {
    instruction: string;
    maxItems: string;
    itemsToCompare: string;
    minItemsError: string;
  };
  sequence: {
    instruction: string;
    elementType: string;
    shapes: string;
    numbers: string;
    letters: string;
    patternLength: string;
    lengthMode: string;
    exactly: string;
    upTo: string;
    sequenceLabel: string;
    blank: string;
    showAnswer: string;
    triangle: string;
    circle: string;
    square: string;
  };
}

const english: Translations = {
  header: {
    subtitle: 'Helping children learn with warmth and care',
    languageLabel: 'Language'
  },
  footer: {
    message: 'If this work helps a child, a parent, or a professional feel supported, a small donation can help keep it going with compassion and care.'
  },
  donate: 'Donate to help children learn',
  home: {
    heading: 'Choose an activity',
    intro: 'Select a learning activity to get started.',
    activitiesLabel: 'Learning activities'
  },
  activities: {
    spelling: { title: 'Spelling', description: 'Practice spelling with picture prompts.' },
    counting: { title: 'Counting', description: 'Count objects and write the number.' },
    biggestSmallest: { title: 'Biggest and Smallest', description: 'Circle the biggest and smallest objects.' },
    sequence: { title: 'Continue the Sequence', description: 'Spot the pattern and continue it.' }
  },
  common: {
    backToMenu: '← Back to menu',
    numberOfProblems: 'Number of problems',
    generate: 'Generate',
    print: 'Print',
    removeRow: 'Remove this row'
  },
  spelling: {
    instruction: 'Write what is in the image.',
    maxLetters: 'Max letters per word',
    picture: 'Practice picture',
    showWord: 'Show the word'
  },
  counting: {
    instruction: 'Count the number of items.',
    maxItems: 'Max items per problem',
    itemsToCount: 'Items to count',
    showAnswer: 'Show the answer'
  },
  biggestSmallest: {
    instruction: 'Circle the biggest object with green colour and the smallest with blue colour.',
    maxItems: 'Max items per problem',
    itemsToCompare: 'Items to compare sizes',
    minItemsError: 'Maximum items per problem must be at least 3.'
  },
  sequence: {
    instruction: 'Look at the pattern and continue the sequence.',
    elementType: 'Elements',
    shapes: 'Shapes',
    numbers: 'Numbers',
    letters: 'Letters',
    patternLength: 'Items in the pattern',
    lengthMode: 'Pattern length',
    exactly: 'Exactly',
    upTo: 'Up to',
    sequenceLabel: 'Sequence to continue',
    blank: 'Empty space',
    showAnswer: 'Show the answer',
    triangle: 'Triangle',
    circle: 'Circle',
    square: 'Square'
  }
};

const croatian: Translations = {
  header: {
    subtitle: 'Pomažemo djeci da uče uz toplinu i brigu',
    languageLabel: 'Jezik'
  },
  footer: {
    message: 'Ako ovaj rad pomaže djetetu, roditelju ili stručnjaku da se osjeća podržano, mala donacija može pomoći da se nastavi s pažnjom i brigom.'
  },
  donate: 'Donirajte i pomozite djeci da uče',
  home: {
    heading: 'Odaberi aktivnost',
    intro: 'Odaberi aktivnost za učenje i započni.',
    activitiesLabel: 'Aktivnosti za učenje'
  },
  activities: {
    spelling: { title: 'Pisanje riječi', description: 'Vježbaj pisanje riječi uz pomoć slika.' },
    counting: { title: 'Brojanje', description: 'Prebroji predmete i napiši broj.' },
    biggestSmallest: { title: 'Najveće i najmanje', description: 'Zaokruži najveći i najmanji predmet.' },
    sequence: { title: 'Nastavi niz', description: 'Prepoznaj uzorak i nastavi niz.' }
  },
  common: {
    backToMenu: '← Natrag na izbornik',
    numberOfProblems: 'Broj zadataka',
    generate: 'Generiraj',
    print: 'Ispiši',
    removeRow: 'Ukloni ovaj redak'
  },
  spelling: {
    instruction: 'Napiši što je na slici.',
    maxLetters: 'Najviše slova u riječi',
    picture: 'Slika za vježbu',
    showWord: 'Prikaži riječ'
  },
  counting: {
    instruction: 'Broji broj predmeta.',
    maxItems: 'Najviše predmeta po zadatku',
    itemsToCount: 'Predmeti za brojanje',
    showAnswer: 'Prikaži odgovor'
  },
  biggestSmallest: {
    instruction: 'Označi kružnicom najveći predmet zelenom bojom, a najmanji plavom bojom.',
    maxItems: 'Najviše predmeta po zadatku',
    itemsToCompare: 'Predmeti za usporedbu veličine',
    minItemsError: 'Najveći broj predmeta po zadatku mora biti barem 3.'
  },
  sequence: {
    instruction: 'Pogledaj uzorak i nastavi niz.',
    elementType: 'Elementi',
    shapes: 'Oblici',
    numbers: 'Brojevi',
    letters: 'Slova',
    patternLength: 'Broj elemenata u uzorku',
    lengthMode: 'Duljina uzorka',
    exactly: 'Točno',
    upTo: 'Najviše',
    sequenceLabel: 'Niz koji treba nastaviti',
    blank: 'Prazno mjesto',
    showAnswer: 'Prikaži odgovor',
    triangle: 'Trokut',
    circle: 'Krug',
    square: 'Kvadrat'
  }
};

const serbian: Translations = {
  header: {
    subtitle: 'Pomažemo deci da uče uz toplinu i brigu',
    languageLabel: 'Jezik'
  },
  footer: {
    message: 'Ako ovaj rad pomaže detetu, roditelju ili stručnjaku da se oseća podržano, mala donacija može pomoći da se nastavi s pažnjom i brigom.'
  },
  donate: 'Donirajte i pomozite deci da uče',
  home: {
    heading: 'Izaberi aktivnost',
    intro: 'Izaberi aktivnost za učenje i započni.',
    activitiesLabel: 'Aktivnosti za učenje'
  },
  activities: {
    spelling: { title: 'Pisanje reči', description: 'Vežbaj pisanje reči uz pomoć slika.' },
    counting: { title: 'Brojanje', description: 'Prebroj predmete i napiši broj.' },
    biggestSmallest: { title: 'Najveće i najmanje', description: 'Zaokruži najveći i najmanji predmet.' },
    sequence: { title: 'Nastavi niz', description: 'Prepoznaj obrazac i nastavi niz.' }
  },
  common: {
    backToMenu: '← Nazad na meni',
    numberOfProblems: 'Broj zadataka',
    generate: 'Generiši',
    print: 'Štampaj',
    removeRow: 'Ukloni ovaj red'
  },
  spelling: {
    instruction: 'Napiši šta je na slici.',
    maxLetters: 'Najviše slova u reči',
    picture: 'Slika za vežbu',
    showWord: 'Prikaži reč'
  },
  counting: {
    instruction: 'Broji broj predmeta.',
    maxItems: 'Najviše predmeta po zadatku',
    itemsToCount: 'Predmeti za brojanje',
    showAnswer: 'Prikaži odgovor'
  },
  biggestSmallest: {
    instruction: 'Označi krugom najveći predmet zelenom bojom, a najmanji plavom bojom.',
    maxItems: 'Najviše predmeta po zadatku',
    itemsToCompare: 'Predmeti za poređenje veličine',
    minItemsError: 'Najveći broj predmeta po zadatku mora biti najmanje 3.'
  },
  sequence: {
    instruction: 'Pogledaj obrazac i nastavi niz.',
    elementType: 'Elementi',
    shapes: 'Oblici',
    numbers: 'Brojevi',
    letters: 'Slova',
    patternLength: 'Broj elemenata u obrascu',
    lengthMode: 'Dužina obrasca',
    exactly: 'Tačno',
    upTo: 'Najviše',
    sequenceLabel: 'Niz koji treba nastaviti',
    blank: 'Prazno mesto',
    showAnswer: 'Prikaži odgovor',
    triangle: 'Trougao',
    circle: 'Krug',
    square: 'Kvadrat'
  }
};

export const TRANSLATIONS: Record<LanguageKey, Translations> = {
  english,
  croatian,
  serbian
};
