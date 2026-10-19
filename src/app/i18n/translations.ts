import { LanguageKey } from './languages';

/**
 * Every piece of user-facing text in the app.
 * Each language must provide the full shape, so a missing translation is a compile error.
 */
export interface Translations {
  header: {
    appTitle: string;
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
  /** Header menu; each item scrolls to a section of the home page (see `home/home-sections.ts`). */
  menu: {
    label: string;
    /** Accessible label of the ☰ button that opens the menu on small screens. */
    openMenu: string;
    /** Last link in the Activities dropdown, to the activity cards on the home page. */
    allActivities: string;
    items: {
      activities: string;
      about: string;
      help: string;
      contact: string;
    };
  };
  about: {
    heading: string;
    /** Paragraphs before the list of reasons why drawing problems by hand didn't work out. */
    opening: string[];
    drawingReasons: string[];
    closing: string[];
    /** Alt text for each photo beside the text (`aboutPhotos` in the home component). */
    photoAlts: string[];
  };
  /** "How can I help?" section of the home page. Text may mark key phrases in bold with `**…**`. */
  help: {
    heading: string;
    donate: {
      title: string;
      paragraphs: string[];
    };
    share: {
      title: string;
      paragraphs: string[];
      /** Accessible label of each share button; `{network}` becomes e.g. "Facebook". */
      shareOn: string;
      email: string;
      copyLink: string;
      linkCopied: string;
      /** Opens the device's own share sheet. */
      more: string;
      /** Text that goes with the shared link. */
      message: string;
    };
    feedback: {
      title: string;
      /** `{email}` becomes the contact e-mail address, as a link. */
      intro: string;
      items: string[];
      button: string;
      emailSubject: string;
    };
  };
  /** "Contact" section of the home page. */
  contact: {
    heading: string;
    paragraphs: string[];
    /** Shown just before the contact e-mail address. */
    emailLabel: string;
  };
  /** Testimonials shown among the activity cards on the home page (see `home/home-tiles.ts`). */
  testimonials: {
    /** Small label above every testimonial. */
    label: string;
    items: Array<{
      quote: string;
      /** Who said it; names are not translated. */
      name: string;
      /** Who they are, e.g. "mother of Kylie (5)". */
      relation: string;
    }>;
  };
  activities: {
    spelling: { title: string; description: string };
    counting: { title: string; description: string };
    biggestSmallest: { title: string; description: string };
    sequence: { title: string; description: string };
    intruder: { title: string; description: string };
    line: { title: string; description: string };
    shadow: { title: string; description: string };
    maze: { title: string; description: string };
    where: { title: string; description: string };
    copyPattern: { title: string; description: string };
    trace: { title: string; description: string };
    dotToDot: { title: string; description: string };
  };
  /** Links to every activity at the top of each activity page. */
  activityNav: {
    label: string;
    allActivities: string;
  };
  common: {
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
  intruder: {
    instruction: string;
    themeCount: string;
    intruderCount: string;
    picturesLabel: string;
    intruderLabel: string;
    showAnswer: string;
    themeLabel: string;
    themes: {
      summer: string;
      winter: string;
      farm: string;
      fruit: string;
      school: string;
      transport: string;
      sea: string;
      clothes: string;
      sports: string;
    };
  };
  line: {
    instruction: string;
    guidesInstruction: string;
    showGuides: string;
    lineLabel: string;
    shape: string;
    size: string;
    mixed: string;
    small: string;
    medium: string;
    large: string;
    patterns: {
      zigzag: string;
      wave: string;
      arches: string;
      cups: string;
      castle: string;
      sawtooth: string;
      loops: string;
    };
  };
  shadow: {
    instruction: string;
    pairCount: string;
    difficulty: string;
    easy: string;
    hard: string;
    picturesLabel: string;
    shadowsLabel: string;
    showAnswer: string;
  };
  maze: {
    instruction: string;
    size: string;
    sizes: {
      tiny: string;
      small: string;
      medium: string;
      large: string;
      huge: string;
    };
    mazeLabel: string;
    showAnswer: string;
  };
  where: {
    instruction: string;
    sceneCount: string;
    positionsLabel: string;
    positions: {
      on: string;
      under: string;
      nextTo: string;
      above: string;
    };
    sceneLabel: string;
    showAnswer: string;
  };
  copyPattern: {
    instruction: string;
    gridSize: string;
    lineCount: string;
    diagonals: string;
    modelLabel: string;
    copyLabel: string;
    drawingType: string;
    drawingTypes: {
      random: string;
      pictures: string;
      mixed: string;
    };
  };
  trace: {
    instructionLetters: string;
    instructionNumbers: string;
    type: string;
    types: {
      uppercase: string;
      lowercase: string;
      numbers: string;
    };
    order: string;
    orders: {
      alphabet: string;
      random: string;
    };
    size: string;
    sizes: {
      small: string;
      medium: string;
      large: string;
    };
    onlyTheseLetters: string;
    onlyTheseLettersExample: string;
    onlyTheseNumbers: string;
    /** `{character}` becomes the letter or number on the row. */
    rowLabel: string;
  };
  dotToDot: {
    instructionNumbers: string;
    instructionLetters: string;
    labelType: string;
    labelTypes: {
      numbers: string;
      letters: string;
    };
    dotCount: string;
    pictureLabel: string;
    showAnswer: string;
    figures: {
      house: string;
      car: string;
      boat: string;
      star: string;
      mushroom: string;
      fish: string;
      rocket: string;
      cat: string;
      heart: string;
      tree: string;
      apple: string;
      butterfly: string;
    };
  };
}

const english: Translations = {
  header: {
    appTitle: 'Learning with Toma',
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
  menu: {
    label: 'Main menu',
    openMenu: 'Menu',
    allActivities: 'See all activities on the home page',
    items: {
      activities: 'Activities',
      about: 'About',
      help: 'How can I help?',
      contact: 'Contact'
    }
  },
  about: {
    heading: 'About Learning with Toma',
    opening: [
      'All three of my kids **loved solving little puzzles, tasks and problems on paper** when they were small. Simple things like “draw a circle”, “complete the word” or “find the biggest item”. It made them genuinely happy, right up until they were about six or seven. (These days they’re in a phase where they’d answer that in an extremely annoying voice: “Six seveeeen!”)',
      'We used to buy them activity workbooks, but they’d always find my wife and me having coffee at 9 on a Sunday morning and ask, “**Hey, Dad, can you give us some problems to solve?**” And at 9 on a Sunday morning you can’t exactly pop out for a new workbook.',
      'So I started **drawing the problems for them by hand**. However:'
    ],
    drawingReasons: [
      'that got repetitive really fast, because **I really can’t draw**, and',
      '**I couldn’t draw as fast as they could solve.**'
    ],
    closing: [
      'Being a software developer, I started looking for **a way to automate it**, and maybe make it a bit easier for other parents to keep their kids busy while they try to have a normal, uninterrupted conversation over coffee. My advice, though: **keep the conversation short**. It won’t stay uninterrupted for long! :)',
      'One very important thing: my son is **neuroatypical** (I won’t go into details), and he really dislikes drawing and anything to do with pencils. But developing **graphomotor and fine motor skills** at an early age is crucially important, and **practising with a pencil in your fingers is vital!** Luckily, at some point, out of nowhere, he became interested in letters and writing… and these little exercises **held his focus longer than anything else** we tried.',
      'So, not to ramble on for too long: **I built this website for myself**, so I can quickly make little problems for my youngest daughter (the other two have outgrown them, for now ;)). But I hope there are **other parents out there who will find it useful too**.',
      'And I hope some kids out there will **have fun with these**!'
    ],
    photoAlts: [
      'A worksheet I drew by hand for my kids',
      'Another worksheet I drew by hand for my kids'
    ]
  },
  help: {
    heading: 'How can I help?',
    donate: {
      title: 'Donate',
      paragraphs: [
        'Donate a small sum (or, even better, a **small recurring sum** :)) to help run the project. Tokens do cost some money (yes, a lot of this has been built with the help of AI :)), and so do servers, domains… And I do drink a lot of coffee while I work on this, so there’s that as well :)',
        'On a serious note: if your kid(s) enjoyed playing with these worksheets, **please help keep this site running**.'
      ]
    },
    share: {
      title: 'Spread the word',
      paragraphs: [
        'Share Learning with Toma on your social networks, in your WhatsApp, Viber or other groups (especially the ones with parents of little kids), with schools, kindergartens… I’d love for **as many people as possible** to have the chance to play with their kids using these worksheets, and I’d love to know that they helped improve the **graphomotor, focus and logic skills** of as many children as possible!'
      ],
      shareOn: 'Share on {network}',
      email: 'Share by e-mail',
      copyLink: 'Copy link',
      linkCopied: 'Link copied!',
      more: 'More…',
      message: 'Free printable worksheets for kids – Learning with Toma'
    },
    feedback: {
      title: 'Send feedback',
      intro: 'Feel free to reach out at {email} and let me know what you think. I’ll cherish:',
      items: [
        '**any constructive feedback**, e.g. “My kid (age 6) loved Find the Intruder, but Copy the Pattern didn’t go as well, because she couldn’t recognise the patterns.” This helps me improve the activities for other kids down the road.',
        '**any testimonials** I can publicly put on the website, e.g. “My son (6) and I spent three afternoons this week playing with these. The worksheets are an amazing thing to have around the house. – Irene, mom of John (6)”. The more of these I get, the more assured I am that the project is on the right track.',
        '**any photos or videos** I can publicly use for promotion. Obviously, none of us want to send photos of our kids or have companies and projects post them online. But I’ll take any real photos or videos with faces blurred, just the backs of heads, just the hands… Anything real is awesome, because it’s the only thing that tells the true story!'
      ],
      button: 'Send feedback, a testimonial or photos',
      emailSubject: 'Learning with Toma – feedback'
    }
  },
  contact: {
    heading: 'Contact',
    paragraphs: [
      'I’m always happy to hear from you! Whether you have a question, an idea for a new activity, or you’ve noticed something that doesn’t work quite right, feel free to get in touch.',
      'I read every message and I’ll do my best to reply as soon as I can.'
    ],
    emailLabel: 'Write to me at'
  },
  testimonials: {
    label: 'Kind words',
    items: [
      { quote: 'This is bringing my kid and me hours of playtime weekly. She just loves it!', name: 'Mary', relation: 'mother of Kylie (5)' },
      { quote: 'Mak was playing with this for an unusually long time and loved the activities, especially “Find the Intruder”!', name: 'Nela', relation: 'mother of Mak (5)' },
      { quote: 'The letters and the lines are still bumpy :) but Mary Jane is doing it with a smile on her face, which helps me a lot!', name: 'Peter', relation: 'father of Mary Jane (7)' },
      { quote: 'This is awesome, I’m running out of printing paper! My kids just adore it!', name: 'Ivana', relation: 'mother of Petar (6) and Maja (4)' }
    ]
  },
  activities: {
    spelling: { title: 'Spelling', description: 'Practice spelling with picture prompts.' },
    counting: { title: 'Counting', description: 'Count objects and write the number.' },
    biggestSmallest: { title: 'Biggest and Smallest', description: 'Circle the biggest and smallest objects.' },
    sequence: { title: 'Continue the Sequence', description: 'Spot the pattern and continue it.' },
    intruder: { title: 'Find the Intruder', description: 'Spot the pictures that don\'t fit the theme.' },
    line: { title: 'Complete the Line', description: 'Trace the pattern and continue it to the edge.' },
    shadow: { title: 'Match the Shadow', description: 'Connect each picture to its shadow.' },
    maze: { title: 'Maze', description: 'Find the way through the maze.' },
    where: { title: 'Where Is It?', description: 'Find the picture that matches the sentence.' },
    copyPattern: { title: 'Copy the Pattern', description: 'Copy a line drawing onto a dot grid.' },
    trace: { title: 'Trace the Letters', description: 'Trace dotted letters and numbers, then write them alone.' },
    dotToDot: { title: 'Dot to Dot', description: 'Join the dots in order to reveal a picture.' }
  },
  activityNav: {
    label: 'Activities',
    allActivities: '← All activities'
  },
  common: {
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
  },
  intruder: {
    instruction: 'Circle what doesn\'t belong.',
    themeCount: 'Theme pictures',
    intruderCount: 'Intruders',
    picturesLabel: 'Pictures',
    intruderLabel: 'Intruder',
    showAnswer: 'Show the answer',
    themeLabel: 'Theme',
    themes: {
      summer: 'Summer',
      winter: 'Winter',
      farm: 'Farm animals',
      fruit: 'Fruit',
      school: 'School',
      transport: 'Transport',
      sea: 'Sea creatures',
      clothes: 'Clothes',
      sports: 'Sports'
    }
  },
  line: {
    instruction: 'Trace over the dashed line, then continue the pattern to the edge of the page.',
    guidesInstruction: 'Stay between the two lines.',
    showGuides: 'Guide lines (top and bottom)',
    lineLabel: 'Line pattern to trace and continue',
    shape: 'Shape',
    size: 'Size',
    mixed: 'Mixed',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    patterns: {
      zigzag: 'Zig-zag',
      wave: 'Waves',
      arches: 'Arches',
      cups: 'Cups',
      castle: 'Castle',
      sawtooth: 'Sawtooth',
      loops: 'Loops'
    }
  },
  shadow: {
    instruction: 'Draw a line from each picture to its shadow.',
    pairCount: 'Pairs per problem',
    difficulty: 'Difficulty',
    easy: 'Easy – different shapes',
    hard: 'Hard – similar shapes',
    picturesLabel: 'Pictures',
    shadowsLabel: 'Shadows',
    showAnswer: 'Show the answer'
  },
  maze: {
    instruction: 'Help the animal find the way to its food.',
    size: 'Maze size',
    sizes: {
      tiny: 'Very small',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      huge: 'Very large'
    },
    mazeLabel: 'Maze',
    showAnswer: 'Show the way'
  },
  where: {
    instruction: 'Circle the picture that matches the sentence.',
    sceneCount: 'Pictures per problem',
    positionsLabel: 'Position words',
    positions: {
      on: 'on',
      under: 'under',
      nextTo: 'next to',
      above: 'above'
    },
    sceneLabel: 'Picture',
    showAnswer: 'Show the answer'
  },
  copyPattern: {
    instruction: 'Copy the drawing onto the empty dots.',
    gridSize: 'Grid size',
    lineCount: 'Number of lines',
    diagonals: 'Diagonal lines',
    modelLabel: 'Drawing to copy',
    copyLabel: 'Empty grid',
    drawingType: 'Drawings',
    drawingTypes: {
      random: 'Random shapes',
      pictures: 'Pictures (house, boat…)',
      mixed: 'Mixed'
    }
  },
  trace: {
    instructionLetters: 'Trace the dotted letters, starting at the coloured dot. Then write the letter on your own.',
    instructionNumbers: 'Trace the dotted numbers, starting at the coloured dot. Then write the number on your own.',
    type: 'What to practise',
    types: {
      uppercase: 'Capital letters',
      lowercase: 'Small letters',
      numbers: 'Numbers'
    },
    order: 'Order',
    orders: {
      alphabet: 'In order',
      random: 'Random'
    },
    size: 'Size',
    sizes: {
      small: 'Small',
      medium: 'Medium',
      large: 'Large'
    },
    onlyTheseLetters: 'Only these letters (optional)',
    onlyTheseLettersExample: 'e.g. b d p',
    onlyTheseNumbers: 'Only these numbers (optional)',
    rowLabel: 'Trace {character}'
  },
  dotToDot: {
    instructionNumbers: 'Join the dots in order, starting at 1. What picture did you find?',
    instructionLetters: 'Join the dots in alphabetical order, starting at A. What picture did you find?',
    labelType: 'Dots marked with',
    labelTypes: {
      numbers: 'Numbers (1, 2, 3…)',
      letters: 'Letters (A, B, C…)'
    },
    dotCount: 'Number of dots',
    pictureLabel: 'Dots to join',
    showAnswer: 'Show the picture',
    figures: {
      house: 'House',
      car: 'Car',
      boat: 'Sailing boat',
      star: 'Star',
      mushroom: 'Mushroom',
      fish: 'Fish',
      rocket: 'Rocket',
      cat: 'Cat',
      heart: 'Heart',
      tree: 'Fir tree',
      apple: 'Apple',
      butterfly: 'Butterfly'
    }
  }
};

const croatian: Translations = {
  header: {
    appTitle: 'Učimo s Tomom',
    languageLabel: 'Jezik'
  },
  footer: {
    message: 'Ako ovaj rad pomaže djetetu, roditelju ili stručnjaku da se osjeća podržano, mala donacija može pomoći da se nastavi s pažnjom i brigom.'
  },
  donate: 'Donirajte i pomozite djeci učiti',
  home: {
    heading: 'Odaberi aktivnost',
    intro: 'Odaberi aktivnost za učenje i započni.',
    activitiesLabel: 'Aktivnosti za učenje'
  },
  menu: {
    label: 'Glavni izbornik',
    openMenu: 'Izbornik',
    allActivities: 'Pogledaj sve aktivnosti na početnoj stranici',
    items: {
      activities: 'Aktivnosti',
      about: 'O projektu',
      help: 'Kako mogu pomoći?',
      contact: 'Kontakt'
    }
  },
  about: {
    heading: 'O projektu Učimo s Tomom',
    opening: [
      'Svo troje moje djece **obožavalo je rješavati male zagonetke, zadatke i probleme na papiru** dok su bili mali. Jednostavne stvari poput „nacrtaj krug”, „dopuni riječ” ili „pronađi najveći predmet”. To ih je iskreno veselilo, sve dok nisu imali šest-sedam godina. (Sad su u fazi kad bi na to odgovorili užasno iritantnim glasom: „Six seveeeen!”)',
      'Kupovali smo im radne bilježnice, ali uvijek bi nas pronašli dok supruga i ja pijemo kavu u nedjelju u 9 ujutro i pitali: „**Tata, možeš nam dati neke zadatke?**” A u nedjelju u 9 ujutro baš i ne možeš skoknuti po novu radnu bilježnicu.',
      'Zato sam im počeo **crtati zadatke rukom**. Međutim:'
    ],
    drawingReasons: [
      'to je jako brzo postalo jednolično, jer **stvarno ne znam crtati**, i',
      '**nisam mogao crtati brže nego što su oni rješavali.**'
    ],
    closing: [
      'Kako sam i sam programer, počeo sam tražiti **način da to automatiziram**, i da možda drugim roditeljima malo olakšam da zaposle djecu dok pokušavaju normalno, bez prekidanja, porazgovarati uz kavu. Ali moj savjet: **neka razgovor bude kratak**, neće dugo ostati neprekinut! :)',
      'Jedna jako važna napomena: moj sin je **neuroatipičan** (neću ulaziti u detalje) i jako ne voli crtanje i sve što ima veze s olovkom. A razvoj **grafomotorike i fine motorike** u ranoj dobi iznimno je važan, i **vježbanje s olovkom u prstima je ključno!** Srećom, u jednom trenutku, niotkuda, zainteresirao se za slova i pisanje… i ovi mali zadaci **zadržali su mu pažnju dulje od bilo čega drugog** što smo pokušali.',
      'Da ne duljim previše: **ovu sam stranicu napravio za sebe**, da mogu brzo napraviti male zadatke za svoju najmlađu kćer (starije dvoje ih je zasad preraslo ;)). Ali nadam se da postoje i **drugi roditelji kojima će biti korisna**.',
      'I nadam se da će se neka djeca uz ovo **dobro zabaviti**!'
    ],
    photoAlts: [
      'Radni list koji sam rukom nacrtao za svoju djecu',
      'Još jedan radni list koji sam rukom nacrtao za svoju djecu'
    ]
  },
  help: {
    heading: 'Kako mogu pomoći?',
    donate: {
      title: 'Donirajte',
      paragraphs: [
        'Donirajte mali iznos (ili, još bolje, **mali mjesečni iznos** :)) i pomozite da projekt živi. Tokeni koštaju (da, puno toga je napravljeno uz pomoć umjetne inteligencije :)), a koštaju i serveri, domene… I da, popijem jako puno kave dok radim na ovome, pa i to :)',
        'A sad ozbiljno: ako su se vaša djeca zabavila uz ove radne listove, **pomozite da ova stranica nastavi raditi**.'
      ]
    },
    share: {
      title: 'Proširite glas',
      paragraphs: [
        'Podijelite Učimo s Tomom na svojim društvenim mrežama, u WhatsApp, Viber i drugim grupama (posebno onima s roditeljima male djece), sa školama, vrtićima… Volio bih da **što više ljudi** ima priliku igrati se sa svojom djecom uz ove radne listove, i volio bih znati da su pomogli razviti **grafomotoriku, koncentraciju i logičko razmišljanje** kod što više djece!'
      ],
      shareOn: 'Podijeli na {network}',
      email: 'Podijeli e-poštom',
      copyLink: 'Kopiraj poveznicu',
      linkCopied: 'Poveznica kopirana!',
      more: 'Više…',
      message: 'Besplatni radni listovi za djecu za ispis – Učimo s Tomom'
    },
    feedback: {
      title: 'Pošaljite povratnu informaciju',
      intro: 'Slobodno mi se javite na {email} i recite mi što mislite. Posebno će mi značiti:',
      items: [
        '**svaka konstruktivna povratna informacija**, npr. „Moje dijete (6 godina) obožavalo je Pronađi uljeza, ali Precrtaj uzorak nije prošao tako dobro jer nije prepoznavala uzorke.” To mi pomaže poboljšati aktivnosti za drugu djecu.',
        '**svako iskustvo** koje mogu javno objaviti na stranici, npr. „Moj sin (6) i ja proveli smo tri popodneva ovaj tjedan igrajući se s ovim. Radni listovi su divna stvar za imati kod kuće. – Ana, mama Luke (6)”. Što ih više dobijem, to sam sigurniji da je projekt na dobrom putu.',
        '**sve fotografije ili videozapise** koje mogu javno koristiti za promociju. Naravno, nitko od nas ne želi slati fotografije svoje djece niti da ih tvrtke i projekti objavljuju na internetu. Ali rado ću uzeti bilo kakve stvarne fotografije ili videozapise sa zamućenim licima, samo s potiljkom, samo s rukama… Sve što je stvarno je super, jer jedino to priča pravu priču!'
      ],
      button: 'Pošaljite povratnu informaciju, iskustvo ili fotografije',
      emailSubject: 'Učimo s Tomom – povratna informacija'
    }
  },
  contact: {
    heading: 'Kontakt',
    paragraphs: [
      'Uvijek se veselim vašim porukama! Imate li pitanje, ideju za novu aktivnost ili ste primijetili da nešto ne radi baš kako treba, slobodno mi se javite.',
      'Pročitam svaku poruku i potrudit ću se odgovoriti što prije.'
    ],
    emailLabel: 'Pišite mi na'
  },
  testimonials: {
    label: 'Lijepe riječi',
    items: [
      { quote: 'Uz ovo moje dijete i ja svaki tjedan provedemo sate u igri. Ona to jednostavno obožava!', name: 'Mary', relation: 'mama Kylie (5)' },
      { quote: 'Mak se ovime igrao neobično dugo i aktivnosti su mu se jako svidjele, a najviše „Pronađi uljeza“!', name: 'Nela', relation: 'mama Maka (5)' },
      { quote: 'Slova i crte još uvijek malo vijugaju :) ali Mary Jane to radi s osmijehom na licu, što mi jako puno pomaže!', name: 'Peter', relation: 'tata Mary Jane (7)' },
      { quote: 'Ovo je fantastično, ponestaje mi papira za ispis! Moja djeca to jednostavno obožavaju!', name: 'Ivana', relation: 'mama Petra (6) i Maje (4)' }
    ]
  },
  activities: {
    spelling: { title: 'Pisanje riječi', description: 'Vježbaj pisanje riječi uz pomoć slika.' },
    counting: { title: 'Brojanje', description: 'Prebroji predmete i napiši broj.' },
    biggestSmallest: { title: 'Najveće i najmanje', description: 'Zaokruži najveći i najmanji predmet.' },
    sequence: { title: 'Nastavi niz', description: 'Prepoznaj uzorak i nastavi niz.' },
    intruder: { title: 'Pronađi uljeza', description: 'Pronađi sličice koje ne pripadaju temi.' },
    line: { title: 'Dovrši crtu', description: 'Prijeđi preko uzorka i nastavi ga do ruba.' },
    shadow: { title: 'Pronađi sjenu', description: 'Poveži sličice s njihovim sjenama.' },
    maze: { title: 'Labirint', description: 'Pronađi put kroz labirint.' },
    where: { title: 'Gdje je?', description: 'Pronađi sliku koja odgovara rečenici.' },
    copyPattern: { title: 'Precrtaj uzorak', description: 'Precrtaj crtež na mrežu točkica.' },
    trace: { title: 'Prati slova', description: 'Prati slova i brojke po točkicama, a zatim ih napiši samostalno.' },
    dotToDot: { title: 'Spoji točkice', description: 'Spoji točkice redom i otkrij sliku.' }
  },
  activityNav: {
    label: 'Aktivnosti',
    allActivities: '← Sve aktivnosti'
  },
  common: {
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
  },
  intruder: {
    instruction: 'Zaokruži što ne pripada.',
    themeCount: 'Sličice iz teme',
    intruderCount: 'Uljezi',
    picturesLabel: 'Sličice',
    intruderLabel: 'Uljez',
    showAnswer: 'Prikaži odgovor',
    themeLabel: 'Tema',
    themes: {
      summer: 'Ljeto',
      winter: 'Zima',
      farm: 'Domaće životinje',
      fruit: 'Voće',
      school: 'Škola',
      transport: 'Prijevozna sredstva',
      sea: 'Morske životinje',
      clothes: 'Odjeća',
      sports: 'Sport'
    }
  },
  line: {
    instruction: 'Prijeđi olovkom preko isprekidane crte, a zatim nastavi uzorak do ruba papira.',
    guidesInstruction: 'Ostani između dviju crta.',
    showGuides: 'Pomoćne crte (gore i dolje)',
    lineLabel: 'Crta koju treba podebljati i nastaviti',
    shape: 'Oblik',
    size: 'Veličina',
    mixed: 'Mješovito',
    small: 'Mala',
    medium: 'Srednja',
    large: 'Velika',
    patterns: {
      zigzag: 'Cik-cak',
      wave: 'Valovi',
      arches: 'Lukovi',
      cups: 'Zdjelice',
      castle: 'Dvorac',
      sawtooth: 'Pila',
      loops: 'Petlje'
    }
  },
  shadow: {
    instruction: 'Poveži svaku sličicu s njezinom sjenom.',
    pairCount: 'Parova po zadatku',
    difficulty: 'Težina',
    easy: 'Lagano – različiti oblici',
    hard: 'Teško – slični oblici',
    picturesLabel: 'Sličice',
    shadowsLabel: 'Sjene',
    showAnswer: 'Prikaži odgovor'
  },
  maze: {
    instruction: 'Pomozi životinji pronaći put do hrane.',
    size: 'Veličina labirinta',
    sizes: {
      tiny: 'Vrlo mali',
      small: 'Mali',
      medium: 'Srednji',
      large: 'Veliki',
      huge: 'Vrlo veliki'
    },
    mazeLabel: 'Labirint',
    showAnswer: 'Prikaži put'
  },
  where: {
    instruction: 'Zaokruži sliku koja odgovara rečenici.',
    sceneCount: 'Slika po zadatku',
    positionsLabel: 'Prijedlozi',
    positions: {
      on: 'na',
      under: 'ispod',
      nextTo: 'pokraj',
      above: 'iznad'
    },
    sceneLabel: 'Slika',
    showAnswer: 'Prikaži odgovor'
  },
  copyPattern: {
    instruction: 'Precrtaj crtež na prazne točkice.',
    gridSize: 'Veličina mreže',
    lineCount: 'Broj crta',
    diagonals: 'Kose crte',
    modelLabel: 'Crtež za precrtavanje',
    copyLabel: 'Prazna mreža',
    drawingType: 'Crteži',
    drawingTypes: {
      random: 'Nasumični oblici',
      pictures: 'Sličice (kuća, brod…)',
      mixed: 'Mješovito'
    }
  },
  trace: {
    instructionLetters: 'Prati slova po točkicama, počni od obojene točkice. Zatim samostalno napiši slovo.',
    instructionNumbers: 'Prati brojke po točkicama, počni od obojene točkice. Zatim samostalno napiši brojku.',
    type: 'Što vježbamo',
    types: {
      uppercase: 'Velika slova',
      lowercase: 'Mala slova',
      numbers: 'Brojke'
    },
    order: 'Redoslijed',
    orders: {
      alphabet: 'Po redu',
      random: 'Nasumično'
    },
    size: 'Veličina',
    sizes: {
      small: 'Mala',
      medium: 'Srednja',
      large: 'Velika'
    },
    onlyTheseLetters: 'Samo ova slova (neobavezno)',
    onlyTheseLettersExample: 'npr. b d p',
    onlyTheseNumbers: 'Samo ove brojke (neobavezno)',
    rowLabel: 'Prati {character}'
  },
  dotToDot: {
    instructionNumbers: 'Spoji točkice redom, počni od 1. Što se krije na slici?',
    instructionLetters: 'Spoji točkice redom po abecedi, počni od A. Što se krije na slici?',
    labelType: 'Točkice označene',
    labelTypes: {
      numbers: 'Brojevima (1, 2, 3…)',
      letters: 'Slovima (A, B, C…)'
    },
    dotCount: 'Broj točkica',
    pictureLabel: 'Točkice za spajanje',
    showAnswer: 'Prikaži sliku',
    figures: {
      house: 'Kuća',
      car: 'Auto',
      boat: 'Jedrilica',
      star: 'Zvijezda',
      mushroom: 'Gljiva',
      fish: 'Riba',
      rocket: 'Raketa',
      cat: 'Mačka',
      heart: 'Srce',
      tree: 'Bor',
      apple: 'Jabuka',
      butterfly: 'Leptir'
    }
  }
};

const serbian: Translations = {
  header: {
    appTitle: 'Učimo s Tomom',
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
  menu: {
    label: 'Glavni meni',
    openMenu: 'Meni',
    allActivities: 'Pogledaj sve aktivnosti na početnoj strani',
    items: {
      activities: 'Aktivnosti',
      about: 'O projektu',
      help: 'Kako mogu da pomognem?',
      contact: 'Kontakt'
    }
  },
  about: {
    heading: 'O projektu Učimo s Tomom',
    opening: [
      'Svo troje moje dece **obožavalo je da rešava male zagonetke, zadatke i probleme na papiru** dok su bili mali. Jednostavne stvari poput „nacrtaj krug”, „dopuni reč” ili „pronađi najveći predmet”. To ih je iskreno radovalo, sve dok nisu napunili šest-sedam godina. (Sada su u fazi kada bi na to odgovorili užasno iritantnim glasom: „Six seveeeen!”)',
      'Kupovali smo im radne sveske, ali uvek bi nas pronašli dok supruga i ja pijemo kafu u nedelju u 9 ujutru i pitali: „**Tata, možeš li da nam daš neke zadatke?**” A u nedelju u 9 ujutru baš i ne možeš da skokneš po novu radnu svesku.',
      'Zato sam počeo da im **crtam zadatke rukom**. Međutim:'
    ],
    drawingReasons: [
      'to je vrlo brzo postalo jednolično, jer **stvarno ne znam da crtam**, i',
      '**nisam mogao da crtam brže nego što su oni rešavali.**'
    ],
    closing: [
      'Pošto sam i sam programer, počeo sam da tražim **način da to automatizujem**, i da možda drugim roditeljima malo olakšam da zaposle decu dok pokušavaju da normalno, bez prekidanja, porazgovaraju uz kafu. Ali moj savet: **neka razgovor bude kratak**, neće dugo ostati neprekinut! :)',
      'Jedna veoma važna napomena: moj sin je **neuroatipičan** (neću da ulazim u detalje) i baš ne voli crtanje i sve što ima veze sa olovkom. A razvoj **grafomotorike i fine motorike** u ranom uzrastu izuzetno je važan, i **vežbanje sa olovkom u prstima je ključno!** Srećom, u jednom trenutku, niotkuda, zainteresovao se za slova i pisanje… i ovi mali zadaci **zadržali su mu pažnju duže od bilo čega drugog** što smo pokušali.',
      'Da ne dužim previše: **ovaj sajt sam napravio za sebe**, da mogu brzo da napravim male zadatke za svoju najmlađu ćerku (starije dvoje ih je za sada preraslo ;)). Ali nadam se da postoje i **drugi roditelji kojima će biti koristan**.',
      'I nadam se da će se neka deca uz ovo **lepo zabaviti**!'
    ],
    photoAlts: [
      'Radni list koji sam rukom nacrtao za svoju decu',
      'Još jedan radni list koji sam rukom nacrtao za svoju decu'
    ]
  },
  help: {
    heading: 'Kako mogu da pomognem?',
    donate: {
      title: 'Donirajte',
      paragraphs: [
        'Donirajte mali iznos (ili, još bolje, **mali mesečni iznos** :)) i pomozite da projekat živi. Tokeni koštaju (da, mnogo toga je napravljeno uz pomoć veštačke inteligencije :)), a koštaju i serveri, domeni… I da, popijem baš mnogo kafe dok radim na ovome, pa i to :)',
        'A sad ozbiljno: ako su se vaša deca zabavila uz ove radne listove, **pomozite da ovaj sajt nastavi da radi**.'
      ]
    },
    share: {
      title: 'Proširite glas',
      paragraphs: [
        'Podelite Učimo s Tomom na svojim društvenim mrežama, u WhatsApp, Viber i drugim grupama (posebno onim sa roditeljima male dece), sa školama, vrtićima… Voleo bih da **što više ljudi** ima priliku da se igra sa svojom decom uz ove radne listove, i voleo bih da znam da su pomogli da se razviju **grafomotorika, koncentracija i logičko razmišljanje** kod što više dece!'
      ],
      shareOn: 'Podeli na {network}',
      email: 'Podeli imejlom',
      copyLink: 'Kopiraj link',
      linkCopied: 'Link je kopiran!',
      more: 'Više…',
      message: 'Besplatni radni listovi za decu za štampu – Učimo s Tomom'
    },
    feedback: {
      title: 'Pošaljite utiske',
      intro: 'Slobodno mi se javite na {email} i recite mi šta mislite. Posebno će mi značiti:',
      items: [
        '**svaki konstruktivan komentar**, npr. „Moje dete (6 godina) obožavalo je Pronađi uljeza, ali Precrtaj obrazac nije prošao tako dobro jer nije prepoznavala obrasce.” To mi pomaže da poboljšam aktivnosti za drugu decu.',
        '**svako iskustvo** koje mogu javno da objavim na sajtu, npr. „Moj sin (6) i ja proveli smo tri popodneva ove nedelje igrajući se sa ovim. Radni listovi su divna stvar za imati kod kuće. – Jelena, mama Marka (6)”. Što ih više dobijem, to sam sigurniji da je projekat na dobrom putu.',
        '**sve fotografije ili video snimke** koje mogu javno da koristim za promociju. Naravno, niko od nas ne želi da šalje fotografije svoje dece niti da ih kompanije i projekti objavljuju na internetu. Ali rado ću uzeti bilo kakve stvarne fotografije ili snimke sa zamućenim licima, samo sa potiljkom, samo sa rukama… Sve što je stvarno je super, jer jedino to priča pravu priču!'
      ],
      button: 'Pošaljite utiske, iskustvo ili fotografije',
      emailSubject: 'Učimo s Tomom – utisci'
    }
  },
  contact: {
    heading: 'Kontakt',
    paragraphs: [
      'Uvek se radujem vašim porukama! Bilo da imate pitanje, ideju za novu aktivnost ili ste primetili da nešto ne radi baš kako treba, slobodno mi se javite.',
      'Pročitam svaku poruku i potrudiću se da odgovorim što pre.'
    ],
    emailLabel: 'Pišite mi na'
  },
  testimonials: {
    label: 'Lepe reči',
    items: [
      { quote: 'Uz ovo moje dete i ja svake nedelje provedemo sate u igri. Ona to prosto obožava!', name: 'Mary', relation: 'mama Kylie (5)' },
      { quote: 'Mak se ovim igrao neobično dugo i aktivnosti su mu se baš svidele, a najviše „Pronađi uljeza“!', name: 'Nela', relation: 'mama Maka (5)' },
      { quote: 'Slova i linije još uvek malo vijugaju :) ali Mary Jane to radi sa osmehom na licu, što mi mnogo pomaže!', name: 'Peter', relation: 'tata Mary Jane (7)' },
      { quote: 'Ovo je fantastično, nestaje mi papira za štampanje! Moja deca to prosto obožavaju!', name: 'Ivana', relation: 'mama Petra (6) i Maje (4)' }
    ]
  },
  activities: {
    spelling: { title: 'Pisanje reči', description: 'Vežbaj pisanje reči uz pomoć slika.' },
    counting: { title: 'Brojanje', description: 'Prebroj predmete i napiši broj.' },
    biggestSmallest: { title: 'Najveće i najmanje', description: 'Zaokruži najveći i najmanji predmet.' },
    sequence: { title: 'Nastavi niz', description: 'Prepoznaj obrazac i nastavi niz.' },
    intruder: { title: 'Pronađi uljeza', description: 'Pronađi sličice koje ne pripadaju temi.' },
    line: { title: 'Dovrši liniju', description: 'Pređi preko obrasca i nastavi ga do ivice.' },
    shadow: { title: 'Pronađi senku', description: 'Poveži sličice sa njihovim senkama.' },
    maze: { title: 'Lavirint', description: 'Pronađi put kroz lavirint.' },
    where: { title: 'Gde je?', description: 'Pronađi sliku koja odgovara rečenici.' },
    copyPattern: { title: 'Precrtaj obrazac', description: 'Precrtaj crtež na mrežu tačkica.' },
    trace: { title: 'Prati slova', description: 'Prati slova i brojeve po tačkicama, pa ih napiši samostalno.' },
    dotToDot: { title: 'Spoji tačkice', description: 'Spoji tačkice redom i otkrij sliku.' }
  },
  activityNav: {
    label: 'Aktivnosti',
    allActivities: '← Sve aktivnosti'
  },
  common: {
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
  },
  intruder: {
    instruction: 'Zaokruži šta ne pripada.',
    themeCount: 'Sličice iz teme',
    intruderCount: 'Uljezi',
    picturesLabel: 'Sličice',
    intruderLabel: 'Uljez',
    showAnswer: 'Prikaži odgovor',
    themeLabel: 'Tema',
    themes: {
      summer: 'Leto',
      winter: 'Zima',
      farm: 'Domaće životinje',
      fruit: 'Voće',
      school: 'Škola',
      transport: 'Prevozna sredstva',
      sea: 'Morske životinje',
      clothes: 'Odeća',
      sports: 'Sport'
    }
  },
  line: {
    instruction: 'Pređi olovkom preko isprekidane linije, pa nastavi obrazac do ivice papira.',
    guidesInstruction: 'Ostani između dve linije.',
    showGuides: 'Pomoćne linije (gore i dole)',
    lineLabel: 'Linija koju treba precrtati i nastaviti',
    shape: 'Oblik',
    size: 'Veličina',
    mixed: 'Mešovito',
    small: 'Mala',
    medium: 'Srednja',
    large: 'Velika',
    patterns: {
      zigzag: 'Cik-cak',
      wave: 'Talasi',
      arches: 'Lukovi',
      cups: 'Činijice',
      castle: 'Zamak',
      sawtooth: 'Testera',
      loops: 'Petlje'
    }
  },
  shadow: {
    instruction: 'Poveži svaku sličicu sa njenom senkom.',
    pairCount: 'Parova po zadatku',
    difficulty: 'Težina',
    easy: 'Lako – različiti oblici',
    hard: 'Teško – slični oblici',
    picturesLabel: 'Sličice',
    shadowsLabel: 'Senke',
    showAnswer: 'Prikaži odgovor'
  },
  maze: {
    instruction: 'Pomozi životinji da pronađe put do hrane.',
    size: 'Veličina lavirinta',
    sizes: {
      tiny: 'Veoma mali',
      small: 'Mali',
      medium: 'Srednji',
      large: 'Veliki',
      huge: 'Veoma veliki'
    },
    mazeLabel: 'Lavirint',
    showAnswer: 'Prikaži put'
  },
  where: {
    instruction: 'Zaokruži sliku koja odgovara rečenici.',
    sceneCount: 'Slika po zadatku',
    positionsLabel: 'Predlozi',
    positions: {
      on: 'na',
      under: 'ispod',
      nextTo: 'pored',
      above: 'iznad'
    },
    sceneLabel: 'Slika',
    showAnswer: 'Prikaži odgovor'
  },
  copyPattern: {
    instruction: 'Precrtaj crtež na prazne tačkice.',
    gridSize: 'Veličina mreže',
    lineCount: 'Broj linija',
    diagonals: 'Kose linije',
    modelLabel: 'Crtež za precrtavanje',
    copyLabel: 'Prazna mreža',
    drawingType: 'Crteži',
    drawingTypes: {
      random: 'Nasumični oblici',
      pictures: 'Sličice (kuća, brod…)',
      mixed: 'Mešovito'
    }
  },
  trace: {
    instructionLetters: 'Prati slova po tačkicama, počni od obojene tačkice. Zatim samostalno napiši slovo.',
    instructionNumbers: 'Prati brojeve po tačkicama, počni od obojene tačkice. Zatim samostalno napiši broj.',
    type: 'Šta vežbamo',
    types: {
      uppercase: 'Velika slova',
      lowercase: 'Mala slova',
      numbers: 'Brojevi'
    },
    order: 'Redosled',
    orders: {
      alphabet: 'Po redu',
      random: 'Nasumično'
    },
    size: 'Veličina',
    sizes: {
      small: 'Mala',
      medium: 'Srednja',
      large: 'Velika'
    },
    onlyTheseLetters: 'Samo ova slova (opciono)',
    onlyTheseLettersExample: 'npr. b d p',
    onlyTheseNumbers: 'Samo ovi brojevi (opciono)',
    rowLabel: 'Prati {character}'
  },
  dotToDot: {
    instructionNumbers: 'Spoji tačkice redom, počni od 1. Šta se krije na slici?',
    instructionLetters: 'Spoji tačkice redom po abecedi, počni od A. Šta se krije na slici?',
    labelType: 'Tačkice označene',
    labelTypes: {
      numbers: 'Brojevima (1, 2, 3…)',
      letters: 'Slovima (A, B, C…)'
    },
    dotCount: 'Broj tačkica',
    pictureLabel: 'Tačkice za spajanje',
    showAnswer: 'Prikaži sliku',
    figures: {
      house: 'Kuća',
      car: 'Auto',
      boat: 'Jedrilica',
      star: 'Zvezda',
      mushroom: 'Pečurka',
      fish: 'Riba',
      rocket: 'Raketa',
      cat: 'Mačka',
      heart: 'Srce',
      tree: 'Jelka',
      apple: 'Jabuka',
      butterfly: 'Leptir'
    }
  }
};

export const TRANSLATIONS: Record<LanguageKey, Translations> = {
  english,
  croatian,
  serbian
};
