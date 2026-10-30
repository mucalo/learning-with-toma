import { ActivityCategory, ActivityKey } from '../activities';
import { LanguageKey } from './languages';

/**
 * Every piece of user-facing text in the app.
 * Each language must provide the full shape, so a missing translation is a compile error.
 */
export interface Translations {
  header: {
    appTitle: string;
    /** The logo's two lines, e.g. "Learning" / "with Toma". */
    logoLines: [string, string];
    languageLabel: string;
    /** Header button that leads to the "Want to help?" section. */
    support: string;
    /** Header button on activity pages, back to the activity cards on the home page. */
    allActivities: string;
  };
  footer: {
    /** Short description under the logo. */
    description: string;
    explore: string;
    getInTouch: string;
    keepFree: { title: string; text: string; button: string };
    /** Bottom line on the home page; `{year}` becomes the current year. */
    copyright: string;
    /** Bottom line on activity pages; `{year}` becomes the current year. */
    activityCopyright: string;
    backHome: string;
  };
  donate: string;
  /** The activity cards on the home page, with a filter by category. */
  activitiesSection: {
    eyebrow: string;
    title: string;
    filterLabel: string;
    /** First filter chip; `{count}` becomes the number of activities. */
    all: string;
    categories: Record<ActivityCategory, string>;
  };
  /** First section of the home page. */
  hero: {
    badges: string[];
    /** The heading, split around the highlighted words. */
    title: { before: string; highlight: string; after: string };
    intro: string;
    chooseActivity: string;
    howItWorks: string;
    madeFor: string;
    audiences: string[];
    /** Round sticker on the worksheet illustration, one entry per line. */
    sticker: [string, string];
  };
  /** The three numbered steps below the hero; the section's heading is `hero.howItWorks`. */
  howItWorks: Array<{ title: string; text: string }>;
  /** Dark band below the activities; its buttons switch the site's language. */
  languagesBand: {
    title: string;
    text: string;
  };
  /** Header menu; each item scrolls to a section of the home page (see `home/home-sections.ts`). */
  menu: {
    label: string;
    /** Accessible label of the ☰ button that opens the menu on small screens. */
    openMenu: string;
    items: {
      activities: string;
      testimonials: string;
      about: string;
      help: string;
    };
  };
  /** About section of the home page. Text may mark key phrases in bold with `**…**`. */
  about: {
    eyebrow: string;
    heading: string;
    /** Short summary of the project below the heading. */
    lead: string;
    stats: Array<{ value: string; label: string }>;
    /** Paragraphs before the list of reasons why drawing problems by hand didn't work out. */
    story: string[];
    drawingReasons: string[];
    afterReasons: string[];
    /** Box about neurodivergent children, ending with a note to ask their teacher or speech therapist first. */
    learner: { title: string; text: string; tags: string[]; disclaimer: { label: string; text: string } };
    closing: string[];
    /** Closing line, shown in handwriting. */
    handwritten: string;
    signature: string;
    /** Note after the story that leads to the "Want to help?" section. */
    supportNote: { text: string; button: string };
    /** One entry per photo (`aboutPhotos` in the home component), in the same order. */
    photos: Array<{ alt: string; caption: string }>;
  };
  /** "Want to help?" section of the home page. Text may mark key phrases in bold with `**…**`. */
  help: {
    eyebrow: string;
    heading: string;
    intro: string;
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
      /** What kind of message helps, each with an example shown below it. */
      items: Array<{ text: string; example: string }>;
      button: string;
      emailSubject: string;
    };
    photos: {
      title: string;
      text: string;
      /** The example photo is the second About photo. */
      exampleAlt: string;
      exampleCaption: string;
      /** Kinds of photos that keep children unrecognisable. */
      kinds: string[];
      note: string;
      button: string;
      emailSubject: string;
    };
  };
  /** Testimonials on the home page. */
  testimonials: {
    eyebrow: string;
    title: string;
    /** Accessible labels of the arrow buttons that scroll the row. */
    previous: string;
    next: string;
    items: Array<{
      quote: string;
      /** Who said it; names are not translated. */
      name: string;
      /** Who they are, e.g. "Mother of Kylie (5)". */
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
  /** Everything around the worksheet on an activity page. */
  activityPage: {
    /** Heading of the settings panel. */
    makeWorksheet: string;
    language: string;
    generate: string;
    print: string;
    preview: string;
    /** Shown in the preview before the first worksheet is generated. */
    emptyPreview: string;
    /** Support note below the buttons: a bold first sentence, then the rest and a link. */
    supportBold: string;
    supportText: string;
    supportLink: string;
    tips: string;
    tryNext: string;
    /** `{count}` becomes the number of activities. */
    seeAll: string;
    /** Accessible name of the activity switcher. */
    switcher: string;
    /** Number of pages above the preview, by plural form; `{count}` becomes the number. */
    pageCount: { one: string; few: string; other: string };
  };
  worksheet: {
    /** Accessible name of each page; `{page}` and `{count}` become numbers. */
    pageLabel: string;
  };
  /** Per activity: why it helps (after its description) and three tips for grown-ups. */
  activityInfo: Record<ActivityKey, { benefit: string; tips: Array<{ title: string; text: string }> }>;
  common: {
    numberOfProblems: string;
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
    logoLines: ['Learning', 'with Toma'],
    languageLabel: 'Language',
    support: 'Support',
    allActivities: 'All activities'
  },
  footer: {
    description: 'Free printable worksheets for children aged 4–7, in English, Croatian, Serbian and Polish. Made for parents, preschool educators and school teachers.',
    explore: 'Explore',
    getInTouch: 'Get in touch',
    keepFree: {
      title: 'Keep it free',
      text: 'Every worksheet is free for every family, thanks to parents who chip in.',
      button: 'Donate'
    },
    copyright: '© {year} Learning with Toma · Made by a dad of three',
    activityCopyright: '© {year} Learning with Toma · Free printable worksheets for ages 4–7',
    backHome: 'Back to home'
  },
  donate: 'Donate to help children learn',
  activitiesSection: {
    eyebrow: 'Activities',
    title: 'What shall we practise today?',
    filterLabel: 'Filter activities',
    all: 'All {count}',
    categories: { letters: 'Letters & words', numbers: 'Numbers & size', motor: 'Fine motor', thinking: 'Thinking' }
  },
  hero: {
    badges: ['100% free', 'Ages 4–7', '4 languages'],
    title: { before: 'Printable worksheets for ', highlight: 'little learners', after: ', ready in seconds.' },
    intro: 'Pick one of 12 activities, choose your language, adjust a few settings and print. A fresh worksheet every time — no cost, no fuss.',
    chooseActivity: 'Choose an activity',
    howItWorks: 'How it works',
    madeFor: 'Made for',
    audiences: ['parents', 'teachers', 'kindergartens'],
    sticker: ['Free', 'to print']
  },
  howItWorks: [
    { title: 'Pick an activity', text: 'Letters, numbers, fine motor or thinking games — 12 to choose from.' },
    { title: 'Make it yours', text: 'Choose the language, difficulty and number of problems, then generate a fresh worksheet.' },
    { title: 'Print and play', text: 'Print straight away or save it as a PDF for later.' }
  ],
  languagesBand: {
    title: 'Every worksheet, in your language',
    text: 'Instructions, words and pictures change with the language — great for bilingual families and language therapy.'
  },
  menu: {
    label: 'Main menu',
    openMenu: 'Menu',
    items: {
      activities: 'Activities',
      testimonials: 'Testimonials',
      about: 'About',
      help: 'Want to help?'
    }
  },
  about: {
    eyebrow: 'About',
    heading: 'A dad who couldn’t draw fast enough',
    lead: 'Learning with Toma is a free website that creates printable learning worksheets for children in seconds — spelling, counting, mazes, letter tracing and more. It’s made for parents, preschool educators and school teachers.',
    stats: [
      { value: '12', label: 'activities' },
      { value: '4–7', label: 'years old' },
      { value: '4', label: 'languages' },
      { value: '0 €', label: 'always free' }
    ],
    story: [
      'All three of my kids **loved solving little puzzles, tasks and problems on paper** when they were small. Simple things like “draw a circle”, “complete the word” or “find the biggest item”. It made them genuinely happy, right up until they were about six or seven. (These days they’d answer that in an extremely annoying voice: “Six seveeeen!”)',
      'We used to buy them activity workbooks, but they’d always find my wife and me having coffee at 9 on a Sunday morning and ask, **“Hey, Dad, can you give us some problems to solve?”** And at 9 on a Sunday morning you can’t exactly pop out for a new workbook.',
      'So I started **drawing the problems by hand**. Two small issues:'
    ],
    drawingReasons: [
      'it got repetitive really fast, because **I really can’t draw**, and',
      '**I couldn’t draw as fast as they could solve.**'
    ],
    afterReasons: [
      'Being a software developer, I started looking for **a way to automate it** — and maybe make it a bit easier for other parents to keep their kids busy while they try to have a normal, uninterrupted conversation over coffee. My advice, though: **keep the conversation short**. It won’t stay uninterrupted for long! :)'
    ],
    learner: {
      title: 'Made with every kind of learner in mind',
      text: 'My son is **neurodivergent**, and he really dislikes drawing and anything to do with pencils. But developing **graphomotor and fine motor skills** early is so important, and **practising with a pencil in your fingers is vital**. Then, out of nowhere, he became interested in letters and writing — and these little exercises **held his focus longer than anything else** we tried.',
      tags: ['Autism', 'ADHD', 'Dyslexia', 'Dyspraxia'],
      disclaimer: {
        label: 'Important:',
        text: 'every child is different. Before using these worksheets with a neurodivergent child, please talk to their preschool educator, teacher or speech and language therapist. The wrong activity can sometimes do more harm than good.'
      }
    },
    closing: [
      'So, not to ramble on for too long: **I built this website for myself**, so I can quickly make little problems for my youngest daughter (the other two have outgrown them, for now ;)). But I hope there are **other parents out there who will find it useful too**.'
    ],
    handwritten: 'And I hope some kids out there will have fun with these!',
    signature: '— Mario, dad of three',
    supportNote: {
      text: 'If these little worksheets have brought a smile to your table, you can help keep them coming.',
      button: 'Support the project'
    },
    photos: [
      {
        alt: 'A hand-drawn worksheet: small pencil drawings of a bee, sun, cloud, sheep, bell, piano and cat, each followed by dashes for the letters of its name',
        caption: 'Where it all started'
      },
      {
        alt: 'A child at a wooden table, pencil in hand, working on a printed worksheet',
        caption: 'Sunday morning practice'
      }
    ]
  },
  help: {
    eyebrow: 'Get involved',
    heading: 'Want to help?',
    intro: 'Learning with Toma is free for everyone. If your little ones enjoy it, here are four ways to help keep it going.',
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
        'Share Learning with Toma on your social networks, in your WhatsApp, Viber or other groups (especially the ones with parents of little kids), with schools, kindergartens… I’d love for **as many people as possible** to have the chance to play with their kids using these worksheets, and to know they helped improve the **graphomotor, focus and logic skills** of as many children as possible!'
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
        {
          text: '**Any constructive feedback** — it helps me improve the activities for other kids down the road.',
          example: 'e.g. “My kid (age 6) loved Find the Intruder, but Copy the Pattern didn’t go as well, because she couldn’t recognise the patterns.”'
        },
        {
          text: '**Any testimonials** I can put on the website — the more I get, the more assured I am that the project is on the right track.',
          example: 'e.g. “My son (6) and I spent three afternoons this week playing with these.” — Irene, mom of John (6)'
        }
      ],
      button: 'Send feedback or a testimonial',
      emailSubject: 'Learning with Toma – feedback'
    },
    photos: {
      title: 'Share photos or videos',
      text: 'Real moments tell the true story better than anything I could write. Obviously, none of us want to send photos of our kids or have companies post them online — so I’ll only ever use photos and videos where **no child can be recognised**.',
      exampleAlt: 'Example: a child writing on a worksheet, seen from behind, no face visible',
      exampleCaption: 'Like this one',
      kinds: ['Faces blurred', 'Backs of heads', 'Just the hands', 'Finished worksheets'],
      note: 'Anything real is awesome — a few seconds of video is plenty.',
      button: 'Send photos or videos',
      emailSubject: 'Learning with Toma – photos and videos'
    }
  },
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'What parents are saying',
    previous: 'Previous testimonials',
    next: 'Next testimonials',
    items: [
      { quote: 'The letters and the lines are still bumpy :) but Mary Jane is doing it with a smile on her face, which helps me a lot!', name: 'Peter', relation: 'Father of Mary Jane (7)' },
      { quote: 'Mak was playing with this for an unusually long time and loved the activities, especially “Find the Intruder”!', name: 'Nela', relation: 'Mother of Mak (5)' },
      { quote: 'This is bringing my kid and me hours of playtime weekly. She just loves it!', name: 'Mary', relation: 'Mother of Kylie (5)' },
      { quote: 'This is awesome, I’m running out of printing paper! My kids just adore it!', name: 'Ivana', relation: 'Mother of Petar (6) and Maja (4)' }
    ]
  },
  activities: {
    spelling: { title: 'Spelling', description: 'Practise spelling with picture prompts.' },
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
  activityPage: {
    makeWorksheet: 'Make your worksheet',
    language: 'Language',
    generate: 'Generate worksheet',
    print: 'Print worksheet',
    preview: 'Preview',
    emptyPreview: 'Choose your settings and press “Generate worksheet”. Your worksheet will appear here, just as it will print.',
    supportBold: 'These worksheets will always be free.',
    supportText: 'A coffee’s worth helps keep it that way for every family.',
    supportLink: 'Support the project',
    tips: 'Tips for grown-ups',
    tryNext: 'Try next',
    seeAll: 'See all {count} activities',
    switcher: 'All activities',
    pageCount: { one: '{count} page · A4', few: '{count} pages · A4', other: '{count} pages · A4' }
  },
  worksheet: {
    pageLabel: 'Page {page} of {count}'
  },
  activityInfo: {
    spelling: {
      benefit: 'Links pictures to words and builds early spelling.',
      tips: [
        { title: 'Say it slowly', text: 'Stretch the word out loud together (“c-a-t”) before writing, so each sound gets its own line.' },
        { title: 'Start short', text: 'Begin with three- or four-letter words and raise the maximum only when it feels easy.' },
        { title: 'Check the grip', text: 'Chunky crayons or short pencils help small hands find a comfortable hold.' }
      ]
    },
    counting: {
      benefit: 'Practises counting one by one and writing numbers.',
      tips: [
        { title: 'Touch and count', text: 'Let your child touch each picture while counting aloud, so every item is counted once.' },
        { title: 'Tick them off', text: 'A small tick on each counted picture helps when the pictures are scattered.' },
        { title: 'Start small', text: 'Keep the maximum at five or ten until counting feels confident, then go higher.' }
      ]
    },
    biggestSmallest: {
      benefit: 'Trains visual comparison and the words for size.',
      tips: [
        { title: 'Talk about size', text: 'Use words like big, bigger and biggest while pointing — they learn the words as well as the idea.' },
        { title: 'Fewer is easier', text: 'With fewer items the difference is clearer; add more items to make it harder.' },
        { title: 'Two colours, two jobs', text: 'Have a green and a blue crayon ready before you start, so the instruction is easy to follow.' }
      ]
    },
    sequence: {
      benefit: 'Builds pattern spotting, the basis of early maths and logic.',
      tips: [
        { title: 'Say the pattern', text: 'Read it aloud like a rhythm (“triangle, circle, triangle, circle…”) — hearing it makes it easier to see.' },
        { title: 'Start with two', text: 'Patterns of two items are the best start; move to longer ones step by step.' },
        { title: 'Ask, then draw', text: 'Ask what comes next before drawing, so your child explains the rule in their own words.' }
      ]
    },
    intruder: {
      benefit: 'Practises grouping, vocabulary and explaining choices.',
      tips: [
        { title: 'Ask “why?”', text: 'When your child circles a picture, ask why it doesn’t belong — explaining is half the learning.' },
        { title: 'Name the theme', text: 'First say what the pictures have in common (“these are all fruit”), then look for the odd one out.' },
        { title: 'More pictures, more challenge', text: 'Add theme pictures and intruders gradually as your child gets quicker.' }
      ]
    },
    line: {
      benefit: 'Strengthens pencil control for the shapes used in handwriting.',
      tips: [
        { title: 'Trace first', text: 'Go over the dashed part slowly before continuing alone — speed comes later.' },
        { title: 'Big before small', text: 'Large patterns are easier for small hands; move to smaller ones as control improves.' },
        { title: 'Check the grip', text: 'Chunky crayons or short pencils help small hands find a comfortable hold.' }
      ]
    },
    shadow: {
      benefit: 'Trains visual discrimination and attention to shape.',
      tips: [
        { title: 'Name the shape', text: 'Talk about what makes each shadow different — a tail, a handle, a pointy roof.' },
        { title: 'Easy first', text: 'Start with the easy level, where the shapes are very different, before trying a single group.' },
        { title: 'No ruler needed', text: 'Straight lines aren’t the goal; any line that connects the right pair counts.' }
      ]
    },
    maze: {
      benefit: 'Builds planning, focus and pencil control.',
      tips: [
        { title: 'Finger first', text: 'Let your child find the way with a finger first, then with the pencil.' },
        { title: 'Small mazes first', text: 'Start with 5 × 5 or 6 × 6 and go bigger as patience grows.' },
        { title: 'Mistakes are fine', text: 'If the pencil ends up in a dead end, go back and try again — that’s part of the fun.' }
      ]
    },
    where: {
      benefit: 'Teaches position words like on, under, next to and above.',
      tips: [
        { title: 'Act it out', text: 'First put a toy on, under or next to a real table — then the pictures make sense.' },
        { title: 'Read together', text: 'Read the sentence aloud and let your child point before circling.' },
        { title: 'Two words to start', text: 'Begin with two position words and add more once they feel secure.' }
      ]
    },
    copyPattern: {
      benefit: 'Develops visual-spatial skills and careful pencil movements.',
      tips: [
        { title: 'Count the dots', text: 'Find where a line starts together by counting dots from a corner.' },
        { title: 'Small grid first', text: 'A 3 × 3 or 4 × 4 grid is the best start; go bigger as copying gets easier.' },
        { title: 'Straight lines first', text: 'Leave diagonal lines off until straight lines feel easy.' }
      ]
    },
    trace: {
      benefit: 'Builds pencil control and letter recognition.',
      tips: [
        { title: 'Say it out loud', text: 'Name the letter and its sound together while tracing — it links shape, sound and movement.' },
        { title: 'Short and often', text: 'One row a day beats a full page once a week. Stop while it’s still fun.' },
        { title: 'Check the grip', text: 'Chunky crayons or short pencils help small hands find a comfortable hold.' }
      ]
    },
    dotToDot: {
      benefit: 'Practises number order and steady hand movements.',
      tips: [
        { title: 'Say each number', text: 'Count out loud from dot to dot — it practises number order along the way.' },
        { title: 'Guess the picture', text: 'Before you start, guess together what the picture will be.' },
        { title: 'Fewer dots to start', text: 'Begin with 10–15 dots; more dots make a longer, trickier path.' }
      ]
    }
  },
  common: {
    numberOfProblems: 'Number of problems',
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
    logoLines: ['Učimo', 's Tomom'],
    languageLabel: 'Jezik',
    support: 'Podrška',
    allActivities: 'Sve aktivnosti'
  },
  footer: {
    description: 'Besplatni radni listovi za ispis za djecu od 4 do 7 godina, na engleskom, hrvatskom, srpskom i poljskom. Za roditelje, odgojitelje i učitelje.',
    explore: 'Istražite',
    getInTouch: 'Javite se',
    keepFree: {
      title: 'Neka ostane besplatno',
      text: 'Svaki radni list besplatan je za svaku obitelj, zahvaljujući roditeljima koji pomognu.',
      button: 'Donirajte'
    },
    copyright: '© {year} Učimo s Tomom · Napravio tata troje djece',
    activityCopyright: '© {year} Učimo s Tomom · Besplatni radni listovi za djecu od 4 do 7 godina',
    backHome: 'Natrag na početnu'
  },
  donate: 'Donirajte i pomozite djeci učiti',
  activitiesSection: {
    eyebrow: 'Aktivnosti',
    title: 'Što ćemo danas vježbati?',
    filterLabel: 'Filtriraj aktivnosti',
    all: 'Svih {count}',
    categories: { letters: 'Slova i riječi', numbers: 'Brojevi i veličine', motor: 'Fina motorika', thinking: 'Razmišljanje' }
  },
  hero: {
    badges: ['100% besplatno', 'Dob 4–7', '4 jezika'],
    title: { before: 'Radni listovi za ', highlight: 'male učenike', after: ', spremni za ispis u par sekundi.' },
    intro: 'Odaberite jednu od 12 aktivnosti, jezik i nekoliko postavki pa ispišite. Svaki put novi radni list — bez troškova i bez muke.',
    chooseActivity: 'Odaberite aktivnost',
    howItWorks: 'Kako funkcionira',
    madeFor: 'Namijenjeno za',
    audiences: ['roditelje', 'učitelje', 'vrtiće'],
    sticker: ['Besplatno', 'za ispis']
  },
  howItWorks: [
    { title: 'Odaberite aktivnost', text: 'Slova, brojevi, fina motorika ili igre razmišljanja — 12 aktivnosti na izbor.' },
    { title: 'Prilagodite je', text: 'Odaberite jezik, težinu i broj zadataka pa izradite novi radni list.' },
    { title: 'Ispišite i igrajte se', text: 'Ispišite ga odmah ili ga spremite kao PDF za kasnije.' }
  ],
  languagesBand: {
    title: 'Svaki radni list na vašem jeziku',
    text: 'Upute, riječi i slike mijenjaju se s jezikom — idealno za dvojezične obitelji i logopedsku terapiju.'
  },
  menu: {
    label: 'Glavni izbornik',
    openMenu: 'Izbornik',
    items: {
      activities: 'Aktivnosti',
      testimonials: 'Dojmovi',
      about: 'O projektu',
      help: 'Želite pomoći?'
    }
  },
  about: {
    eyebrow: 'O projektu',
    heading: 'Tata koji nije mogao crtati dovoljno brzo',
    lead: 'Učimo s Tomom besplatna je stranica koja u nekoliko sekundi izrađuje radne listove za ispis za djecu — pisanje riječi, brojanje, labirinte, praćenje slova i još mnogo toga. Namijenjena je roditeljima, odgojiteljima i učiteljima.',
    stats: [
      { value: '12', label: 'aktivnosti' },
      { value: '4–7', label: 'godina' },
      { value: '4', label: 'jezika' },
      { value: '0 €', label: 'uvijek besplatno' }
    ],
    story: [
      'Svo troje moje djece **obožavalo je rješavati male zagonetke, zadatke i probleme na papiru** dok su bili mali. Jednostavne stvari poput „nacrtaj krug”, „dopuni riječ” ili „pronađi najveći predmet”. To ih je iskreno veselilo, sve dok nisu imali šest-sedam godina. (Danas bi na to odgovorili užasno iritantnim glasom: „Six seveeeen!”)',
      'Kupovali smo im radne bilježnice, ali uvijek bi nas pronašli dok supruga i ja pijemo kavu u nedjelju u 9 ujutro i pitali: **„Tata, možeš nam dati neke zadatke?”** A u nedjelju u 9 ujutro baš i ne možeš skoknuti po novu radnu bilježnicu.',
      'Zato sam im počeo **crtati zadatke rukom**. Dva mala problema:'
    ],
    drawingReasons: [
      'to je jako brzo postalo jednolično, jer **stvarno ne znam crtati**, i',
      '**nisam mogao crtati brže nego što su oni rješavali.**'
    ],
    afterReasons: [
      'Kako sam i sam programer, počeo sam tražiti **način da to automatiziram** — i da možda drugim roditeljima malo olakšam da zaposle djecu dok pokušavaju normalno, bez prekidanja, porazgovarati uz kavu. Ali moj savjet: **neka razgovor bude kratak**. Neće dugo ostati neprekinut! :)'
    ],
    learner: {
      title: 'Napravljeno s mislima na svako dijete',
      text: 'Moj sin je **neurodivergentan** i jako ne voli crtanje i sve što ima veze s olovkom. A razvoj **grafomotorike i fine motorike** u ranoj dobi jako je važan, i **vježbanje s olovkom u prstima je ključno**. A onda se, niotkuda, zainteresirao za slova i pisanje — i ovi mali zadaci **zadržali su mu pažnju dulje od bilo čega drugog** što smo pokušali.',
      tags: ['Autizam', 'ADHD', 'Disleksija', 'Dispraksija'],
      disclaimer: {
        label: 'Važno:',
        text: 'svako je dijete drukčije. Prije nego što ove radne listove date neurodivergentnom djetetu, posavjetujte se s njegovim odgojiteljem, učiteljem ili logopedom. Pogrešno odabrana aktivnost ponekad može više naštetiti nego pomoći.'
      }
    },
    closing: [
      'Da ne duljim previše: **ovu sam stranicu napravio za sebe**, da mogu brzo napraviti male zadatke za svoju najmlađu kćer (starije dvoje ih je zasad preraslo ;)). Ali nadam se da postoje i **drugi roditelji kojima će biti korisna**.'
    ],
    handwritten: 'I nadam se da će se neka djeca uz ovo dobro zabaviti!',
    signature: '— Mario, tata troje djece',
    supportNote: {
      text: 'Ako su vam ovi mali radni listovi izmamili osmijeh za stolom, možete pomoći da ih bude još.',
      button: 'Podržite projekt'
    },
    photos: [
      {
        alt: 'Rukom nacrtan radni list: mali crteži pčele, sunca, oblaka, ovce, zvona, klavira i mačke, a uz svaki crtice za slova njegova imena',
        caption: 'Ovdje je sve počelo'
      },
      {
        alt: 'Dijete za drvenim stolom, s olovkom u ruci, rješava ispisani radni list',
        caption: 'Nedjeljno jutarnje vježbanje'
      }
    ]
  },
  help: {
    eyebrow: 'Uključite se',
    heading: 'Želite pomoći?',
    intro: 'Učimo s Tomom besplatno je za sve. Ako se vaši mališani zabavljaju uz njega, evo četiri načina da pomognete da tako i ostane.',
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
        {
          text: '**Svaka konstruktivna povratna informacija** — pomaže mi poboljšati aktivnosti za drugu djecu.',
          example: 'npr. „Moje dijete (6 godina) obožavalo je Pronađi uljeza, ali Precrtaj uzorak nije prošao tako dobro jer nije prepoznavala uzorke.”'
        },
        {
          text: '**Svako iskustvo** koje mogu objaviti na stranici — što ih više dobijem, to sam sigurniji da je projekt na dobrom putu.',
          example: 'npr. „Moj sin (6) i ja proveli smo tri popodneva ovaj tjedan igrajući se s ovim.” — Ana, mama Luke (6)'
        }
      ],
      button: 'Pošaljite povratnu informaciju ili iskustvo',
      emailSubject: 'Učimo s Tomom – povratna informacija'
    },
    photos: {
      title: 'Podijelite fotografije ili videozapise',
      text: 'Stvarni trenuci pričaju pravu priču bolje od bilo čega što bih ja mogao napisati. Naravno, nitko od nas ne želi slati fotografije svoje djece niti da ih tvrtke objavljuju na internetu — zato ću koristiti samo fotografije i videozapise na kojima **nijedno dijete nije prepoznatljivo**.',
      exampleAlt: 'Primjer: dijete piše po radnom listu, snimljeno s leđa, lice se ne vidi',
      exampleCaption: 'Poput ove',
      kinds: ['Zamućena lica', 'Samo potiljak', 'Samo ruke', 'Gotovi radni listovi'],
      note: 'Sve što je stvarno je super — dovoljno je i nekoliko sekundi videa.',
      button: 'Pošaljite fotografije ili videozapise',
      emailSubject: 'Učimo s Tomom – fotografije i videozapisi'
    }
  },
  testimonials: {
    eyebrow: 'Dojmovi',
    title: 'Što kažu roditelji',
    previous: 'Prethodni dojmovi',
    next: 'Sljedeći dojmovi',
    items: [
      { quote: 'Slova i crte još uvijek malo vijugaju :) ali Mary Jane to radi s osmijehom na licu, što mi jako puno pomaže!', name: 'Peter', relation: 'Tata Mary Jane (7)' },
      { quote: 'Mak se ovime igrao neobično dugo i aktivnosti su mu se jako svidjele, a najviše „Pronađi uljeza“!', name: 'Nela', relation: 'Mama Maka (5)' },
      { quote: 'Uz ovo moje dijete i ja svaki tjedan provedemo sate u igri. Ona to jednostavno obožava!', name: 'Mary', relation: 'Mama Kylie (5)' },
      { quote: 'Ovo je fantastično, ponestaje mi papira za ispis! Moja djeca to jednostavno obožavaju!', name: 'Ivana', relation: 'Mama Petra (6) i Maje (4)' }
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
  activityPage: {
    makeWorksheet: 'Vaš radni list',
    language: 'Jezik',
    generate: 'Izradite radni list',
    print: 'Ispišite radni list',
    preview: 'Pregled',
    emptyPreview: 'Odaberite postavke i pritisnite „Izradite radni list”. Radni list pojavit će se ovdje, točno onakav kakav će biti ispisan.',
    supportBold: 'Ovi radni listovi uvijek će biti besplatni.',
    supportText: 'Vrijednost jedne kave pomaže da tako i ostane za svaku obitelj.',
    supportLink: 'Podržite projekt',
    tips: 'Savjeti za odrasle',
    tryNext: 'Probajte i ovo',
    seeAll: 'Pogledajte svih {count} aktivnosti',
    switcher: 'Sve aktivnosti',
    pageCount: { one: '{count} stranica · A4', few: '{count} stranice · A4', other: '{count} stranica · A4' }
  },
  worksheet: {
    pageLabel: 'Stranica {page} od {count}'
  },
  activityInfo: {
    spelling: {
      benefit: 'Povezuje slike s riječima i razvija rano pisanje.',
      tips: [
        { title: 'Izgovarajte polako', text: 'Prije pisanja zajedno naglas razvucite riječ („m-a-č-k-a”), tako da svaki glas dobije svoju crtu.' },
        { title: 'Počnite s kratkim riječima', text: 'Krenite s riječima od tri ili četiri slova, a najveći broj slova povećajte tek kad postane lako.' },
        { title: 'Provjerite hvat', text: 'Debele bojice ili kratke olovke pomažu malim rukama da ih udobno drže.' }
      ]
    },
    counting: {
      benefit: 'Vježba brojanje jedan po jedan i pisanje brojeva.',
      tips: [
        { title: 'Dodirni i broji', text: 'Neka dijete dodirne svaku sličicu dok broji naglas, kako bi svaki predmet prebrojilo jednom.' },
        { title: 'Označite prebrojeno', text: 'Mala kvačica na svakoj prebrojenoj sličici pomaže kad su sličice razbacane.' },
        { title: 'Počnite s malim brojevima', text: 'Neka najveći broj bude pet ili deset dok brojanje ne postane sigurno, a onda idite više.' }
      ]
    },
    biggestSmallest: {
      benefit: 'Vježba vizualno uspoređivanje i riječi za veličinu.',
      tips: [
        { title: 'Pričajte o veličini', text: 'Dok pokazujete, koristite riječi veliko, veće i najveće — tako dijete uči i riječi i pojam.' },
        { title: 'Manje je lakše', text: 'S manje predmeta razlika je jasnija; dodajte predmete kad želite da bude teže.' },
        { title: 'Dvije boje, dva zadatka', text: 'Prije početka pripremite zelenu i plavu bojicu, tako je uputu lako slijediti.' }
      ]
    },
    sequence: {
      benefit: 'Razvija prepoznavanje uzoraka, temelj rane matematike i logike.',
      tips: [
        { title: 'Izgovorite uzorak', text: 'Pročitajte ga naglas kao ritam („trokut, krug, trokut, krug…”) — kad se čuje, lakše se vidi.' },
        { title: 'Počnite s dva', text: 'Uzorci od dva elementa najbolji su početak; na dulje prelazite korak po korak.' },
        { title: 'Prvo pitajte, onda crtajte', text: 'Prije crtanja pitajte što slijedi, kako bi dijete svojim riječima objasnilo pravilo.' }
      ]
    },
    intruder: {
      benefit: 'Vježba razvrstavanje, rječnik i objašnjavanje izbora.',
      tips: [
        { title: 'Pitajte „zašto?”', text: 'Kad dijete zaokruži sličicu, pitajte zašto ne pripada — objašnjavanje je pola učenja.' },
        { title: 'Imenujte temu', text: 'Najprije recite što je sličicama zajedničko („ovo je sve voće”), a onda tražite uljeza.' },
        { title: 'Više sličica, veći izazov', text: 'Postupno dodajte sličice i uljeze kako dijete postaje brže.' }
      ]
    },
    line: {
      benefit: 'Jača kontrolu olovke za oblike koji se koriste u pisanju.',
      tips: [
        { title: 'Prvo prijeđite', text: 'Polako prijeđite preko isprekidanog dijela prije nego što nastavite samostalno — brzina dolazi kasnije.' },
        { title: 'Prvo veliko, onda malo', text: 'Veliki uzorci lakši su malim rukama; na manje prijeđite kad kontrola postane bolja.' },
        { title: 'Provjerite hvat', text: 'Debele bojice ili kratke olovke pomažu malim rukama da ih udobno drže.' }
      ]
    },
    shadow: {
      benefit: 'Vježba vizualno razlikovanje i pažnju na oblik.',
      tips: [
        { title: 'Imenujte oblik', text: 'Razgovarajte o tome po čemu se svaka sjena razlikuje — rep, ručka, šiljasti krov.' },
        { title: 'Prvo lakše', text: 'Počnite s lakom razinom, na kojoj su oblici vrlo različiti, a tek onda probajte jednu skupinu.' },
        { title: 'Ravnalo nije potrebno', text: 'Ravne crte nisu cilj; vrijedi svaka crta koja spaja pravi par.' }
      ]
    },
    maze: {
      benefit: 'Razvija planiranje, koncentraciju i kontrolu olovke.',
      tips: [
        { title: 'Prvo prstom', text: 'Neka dijete najprije prstom pronađe put, a onda olovkom.' },
        { title: 'Prvo mali labirinti', text: 'Počnite s 5 × 5 ili 6 × 6, a veće uzmite kako strpljenje raste.' },
        { title: 'Pogreške su u redu', text: 'Ako olovka završi u slijepoj ulici, vratite se i pokušajte ponovno — i to je dio zabave.' }
      ]
    },
    where: {
      benefit: 'Uči riječi za položaj: na, ispod, pokraj i iznad.',
      tips: [
        { title: 'Odglumite', text: 'Najprije stavite igračku na pravi stol, ispod njega ili pokraj njega — tada slike imaju smisla.' },
        { title: 'Čitajte zajedno', text: 'Pročitajte rečenicu naglas i pustite dijete da pokaže prije nego što zaokruži.' },
        { title: 'Počnite s dvije riječi', text: 'Krenite s dvije riječi za položaj, a nove dodajte kad ih dijete sigurno zna.' }
      ]
    },
    copyPattern: {
      benefit: 'Razvija vizualno-prostorne vještine i pažljive pokrete olovkom.',
      tips: [
        { title: 'Brojite točkice', text: 'Zajedno pronađite gdje crta počinje brojeći točkice od kuta.' },
        { title: 'Prvo mala mreža', text: 'Mreža 3 × 3 ili 4 × 4 najbolji je početak; veću uzmite kad precrtavanje postane lakše.' },
        { title: 'Prvo ravne crte', text: 'Isključite kose crte dok ravne ne postanu lake.' }
      ]
    },
    trace: {
      benefit: 'Razvija kontrolu olovke i prepoznavanje slova.',
      tips: [
        { title: 'Izgovorite naglas', text: 'Dok prati slovo, neka ga dijete imenuje i izgovori njegov glas — tako povezuje oblik, glas i pokret.' },
        { title: 'Kratko i često', text: 'Jedan red dnevno vrijedi više od cijele stranice jednom tjedno. Stanite dok je još zabavno.' },
        { title: 'Provjerite hvat', text: 'Debele bojice ili kratke olovke pomažu malim rukama da ih udobno drže.' }
      ]
    },
    dotToDot: {
      benefit: 'Vježba redoslijed brojeva i mirne pokrete ruke.',
      tips: [
        { title: 'Izgovorite svaki broj', text: 'Brojite naglas od točkice do točkice — usput se vježba i redoslijed brojeva.' },
        { title: 'Pogodite sliku', text: 'Prije početka zajedno pogađajte što će se pojaviti na slici.' },
        { title: 'Za početak manje točkica', text: 'Počnite s 10–15 točkica; više točkica znači dulji i zahtjevniji put.' }
      ]
    }
  },
  common: {
    numberOfProblems: 'Broj zadataka',
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
    logoLines: ['Učimo', 's Tomom'],
    languageLabel: 'Jezik',
    support: 'Podrška',
    allActivities: 'Sve aktivnosti'
  },
  footer: {
    description: 'Besplatni radni listovi za štampu za decu od 4 do 7 godina, na engleskom, hrvatskom, srpskom i poljskom. Za roditelje, vaspitače i učitelje.',
    explore: 'Istražite',
    getInTouch: 'Javite se',
    keepFree: {
      title: 'Neka ostane besplatno',
      text: 'Svaki radni list je besplatan za svaku porodicu, zahvaljujući roditeljima koji pomognu.',
      button: 'Donirajte'
    },
    copyright: '© {year} Učimo s Tomom · Napravio tata troje dece',
    activityCopyright: '© {year} Učimo s Tomom · Besplatni radni listovi za decu od 4 do 7 godina',
    backHome: 'Nazad na početnu'
  },
  donate: 'Donirajte i pomozite deci da uče',
  activitiesSection: {
    eyebrow: 'Aktivnosti',
    title: 'Šta ćemo danas da vežbamo?',
    filterLabel: 'Filtriraj aktivnosti',
    all: 'Svih {count}',
    categories: { letters: 'Slova i reči', numbers: 'Brojevi i veličine', motor: 'Fina motorika', thinking: 'Razmišljanje' }
  },
  hero: {
    badges: ['100% besplatno', 'Uzrast 4–7', '4 jezika'],
    title: { before: 'Radni listovi za ', highlight: 'male učenike', after: ', spremni za štampu za par sekundi.' },
    intro: 'Izaberite jednu od 12 aktivnosti, jezik i nekoliko podešavanja i odštampajte. Svaki put nov radni list — bez troškova i bez muke.',
    chooseActivity: 'Izaberite aktivnost',
    howItWorks: 'Kako funkcioniše',
    madeFor: 'Namenjeno za',
    audiences: ['roditelje', 'učitelje', 'vrtiće'],
    sticker: ['Besplatno', 'za štampu']
  },
  howItWorks: [
    { title: 'Izaberite aktivnost', text: 'Slova, brojevi, fina motorika ili igre razmišljanja — 12 aktivnosti na izbor.' },
    { title: 'Prilagodite je', text: 'Izaberite jezik, težinu i broj zadataka i napravite nov radni list.' },
    { title: 'Odštampajte i igrajte se', text: 'Odštampajte ga odmah ili ga sačuvajte kao PDF za kasnije.' }
  ],
  languagesBand: {
    title: 'Svaki radni list na vašem jeziku',
    text: 'Uputstva, reči i slike menjaju se sa jezikom — idealno za dvojezične porodice i logopedsku terapiju.'
  },
  menu: {
    label: 'Glavni meni',
    openMenu: 'Meni',
    items: {
      activities: 'Aktivnosti',
      testimonials: 'Utisci',
      about: 'O projektu',
      help: 'Želite da pomognete?'
    }
  },
  about: {
    eyebrow: 'O projektu',
    heading: 'Tata koji nije mogao da crta dovoljno brzo',
    lead: 'Učimo s Tomom je besplatan sajt koji za nekoliko sekundi pravi radne listove za štampanje za decu — pisanje reči, brojanje, lavirinte, praćenje slova i još mnogo toga. Namenjen je roditeljima, vaspitačima i učiteljima.',
    stats: [
      { value: '12', label: 'aktivnosti' },
      { value: '4–7', label: 'godina' },
      { value: '4', label: 'jezika' },
      { value: '0 €', label: 'uvek besplatno' }
    ],
    story: [
      'Svo troje moje dece **obožavalo je da rešava male zagonetke, zadatke i probleme na papiru** dok su bili mali. Jednostavne stvari poput „nacrtaj krug”, „dopuni reč” ili „pronađi najveći predmet”. To ih je iskreno radovalo, sve dok nisu napunili šest-sedam godina. (Danas bi na to odgovorili užasno iritantnim glasom: „Six seveeeen!”)',
      'Kupovali smo im radne sveske, ali uvek bi nas pronašli dok supruga i ja pijemo kafu u nedelju u 9 ujutru i pitali: **„Tata, možeš li da nam daš neke zadatke?”** A u nedelju u 9 ujutru baš i ne možeš da skokneš po novu radnu svesku.',
      'Zato sam počeo da im **crtam zadatke rukom**. Dva mala problema:'
    ],
    drawingReasons: [
      'to je vrlo brzo postalo jednolično, jer **stvarno ne znam da crtam**, i',
      '**nisam mogao da crtam brže nego što su oni rešavali.**'
    ],
    afterReasons: [
      'Pošto sam i sam programer, počeo sam da tražim **način da to automatizujem** — i da možda drugim roditeljima malo olakšam da zaposle decu dok pokušavaju da normalno, bez prekidanja, porazgovaraju uz kafu. Ali moj savet: **neka razgovor bude kratak**. Neće dugo ostati neprekinut! :)'
    ],
    learner: {
      title: 'Napravljeno sa mislima na svako dete',
      text: 'Moj sin je **neurodivergentan** i baš ne voli crtanje i sve što ima veze sa olovkom. A razvoj **grafomotorike i fine motorike** u ranom uzrastu veoma je važan, i **vežbanje sa olovkom u prstima je ključno**. A onda se, niotkuda, zainteresovao za slova i pisanje — i ovi mali zadaci **zadržali su mu pažnju duže od bilo čega drugog** što smo pokušali.',
      tags: ['Autizam', 'ADHD', 'Disleksija', 'Dispraksija'],
      disclaimer: {
        label: 'Važno:',
        text: 'svako dete je drugačije. Pre nego što ove radne listove date neurodivergentnom detetu, posavetujte se sa njegovim vaspitačem, učiteljem ili logopedom. Pogrešno izabrana aktivnost ponekad može više da odmogne nego da pomogne.'
      }
    },
    closing: [
      'Da ne dužim previše: **ovaj sajt sam napravio za sebe**, da mogu brzo da napravim male zadatke za svoju najmlađu ćerku (starije dvoje ih je za sada preraslo ;)). Ali nadam se da postoje i **drugi roditelji kojima će biti koristan**.'
    ],
    handwritten: 'I nadam se da će se neka deca uz ovo lepo zabaviti!',
    signature: '— Mario, tata troje dece',
    supportNote: {
      text: 'Ako su vam ovi mali radni listovi izmamili osmeh za stolom, možete da pomognete da ih bude još.',
      button: 'Podržite projekat'
    },
    photos: [
      {
        alt: 'Rukom nacrtan radni list: mali crteži pčele, sunca, oblaka, ovce, zvona, klavira i mačke, a uz svaki crtice za slova njegovog imena',
        caption: 'Ovde je sve počelo'
      },
      {
        alt: 'Dete za drvenim stolom, sa olovkom u ruci, rešava odštampani radni list',
        caption: 'Nedeljno jutarnje vežbanje'
      }
    ]
  },
  help: {
    eyebrow: 'Uključite se',
    heading: 'Želite da pomognete?',
    intro: 'Učimo s Tomom je besplatno za sve. Ako se vaši mališani zabavljaju uz njega, evo četiri načina da pomognete da tako i ostane.',
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
        {
          text: '**Svaki konstruktivan komentar** — pomaže mi da poboljšam aktivnosti za drugu decu.',
          example: 'npr. „Moje dete (6 godina) obožavalo je Pronađi uljeza, ali Precrtaj obrazac nije prošao tako dobro jer nije prepoznavala obrasce.”'
        },
        {
          text: '**Svako iskustvo** koje mogu da objavim na sajtu — što ih više dobijem, to sam sigurniji da je projekat na dobrom putu.',
          example: 'npr. „Moj sin (6) i ja proveli smo tri popodneva ove nedelje igrajući se sa ovim.” — Jelena, mama Marka (6)'
        }
      ],
      button: 'Pošaljite utiske ili iskustvo',
      emailSubject: 'Učimo s Tomom – utisci'
    },
    photos: {
      title: 'Podelite fotografije ili snimke',
      text: 'Stvarni trenuci pričaju pravu priču bolje od bilo čega što bih ja mogao da napišem. Naravno, niko od nas ne želi da šalje fotografije svoje dece niti da ih kompanije objavljuju na internetu — zato ću koristiti samo fotografije i snimke na kojima **nijedno dete ne može da se prepozna**.',
      exampleAlt: 'Primer: dete piše po radnom listu, snimljeno s leđa, lice se ne vidi',
      exampleCaption: 'Poput ove',
      kinds: ['Zamućena lica', 'Samo potiljak', 'Samo ruke', 'Gotovi radni listovi'],
      note: 'Sve što je stvarno je super — dovoljno je i nekoliko sekundi snimka.',
      button: 'Pošaljite fotografije ili snimke',
      emailSubject: 'Učimo s Tomom – fotografije i snimci'
    }
  },
  testimonials: {
    eyebrow: 'Utisci',
    title: 'Šta kažu roditelji',
    previous: 'Prethodni utisci',
    next: 'Sledeći utisci',
    items: [
      { quote: 'Slova i linije još uvek malo vijugaju :) ali Mary Jane to radi sa osmehom na licu, što mi mnogo pomaže!', name: 'Peter', relation: 'Tata Mary Jane (7)' },
      { quote: 'Mak se ovim igrao neobično dugo i aktivnosti su mu se baš svidele, a najviše „Pronađi uljeza“!', name: 'Nela', relation: 'Mama Maka (5)' },
      { quote: 'Uz ovo moje dete i ja svake nedelje provedemo sate u igri. Ona to prosto obožava!', name: 'Mary', relation: 'Mama Kylie (5)' },
      { quote: 'Ovo je fantastično, nestaje mi papira za štampanje! Moja deca to prosto obožavaju!', name: 'Ivana', relation: 'Mama Petra (6) i Maje (4)' }
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
  activityPage: {
    makeWorksheet: 'Vaš radni list',
    language: 'Jezik',
    generate: 'Napravite radni list',
    print: 'Odštampajte radni list',
    preview: 'Pregled',
    emptyPreview: 'Izaberite podešavanja i pritisnite „Napravite radni list”. Radni list će se pojaviti ovde, tačno onakav kakav će biti odštampan.',
    supportBold: 'Ovi radni listovi će uvek biti besplatni.',
    supportText: 'Vrednost jedne kafe pomaže da tako i ostane za svaku porodicu.',
    supportLink: 'Podržite projekat',
    tips: 'Saveti za odrasle',
    tryNext: 'Probajte i ovo',
    seeAll: 'Pogledajte svih {count} aktivnosti',
    switcher: 'Sve aktivnosti',
    pageCount: { one: '{count} strana · A4', few: '{count} strane · A4', other: '{count} strana · A4' }
  },
  worksheet: {
    pageLabel: 'Strana {page} od {count}'
  },
  activityInfo: {
    spelling: {
      benefit: 'Povezuje slike sa rečima i razvija rano pisanje.',
      tips: [
        { title: 'Izgovarajte polako', text: 'Pre pisanja zajedno naglas razvucite reč („m-a-č-k-a”), tako da svaki glas dobije svoju crtu.' },
        { title: 'Počnite sa kratkim rečima', text: 'Krenite sa rečima od tri ili četiri slova, a najveći broj slova povećajte tek kad postane lako.' },
        { title: 'Proverite hvat', text: 'Debele bojice ili kratke olovke pomažu malim rukama da ih udobno drže.' }
      ]
    },
    counting: {
      benefit: 'Vežba brojanje jedan po jedan i pisanje brojeva.',
      tips: [
        { title: 'Dodirni i broji', text: 'Neka dete dodirne svaku sličicu dok broji naglas, kako bi svaki predmet prebrojalo jednom.' },
        { title: 'Označite prebrojano', text: 'Mala kvačica na svakoj prebrojanoj sličici pomaže kad su sličice razbacane.' },
        { title: 'Počnite sa malim brojevima', text: 'Neka najveći broj bude pet ili deset dok brojanje ne postane sigurno, pa onda idite više.' }
      ]
    },
    biggestSmallest: {
      benefit: 'Vežba vizuelno upoređivanje i reči za veličinu.',
      tips: [
        { title: 'Pričajte o veličini', text: 'Dok pokazujete, koristite reči veliko, veće i najveće — tako dete uči i reči i pojam.' },
        { title: 'Manje je lakše', text: 'Sa manje predmeta razlika je jasnija; dodajte predmete kad želite da bude teže.' },
        { title: 'Dve boje, dva zadatka', text: 'Pre početka pripremite zelenu i plavu bojicu, tako je uputstvo lako pratiti.' }
      ]
    },
    sequence: {
      benefit: 'Razvija prepoznavanje obrazaca, osnovu rane matematike i logike.',
      tips: [
        { title: 'Izgovorite obrazac', text: 'Pročitajte ga naglas kao ritam („trougao, krug, trougao, krug…”) — kad se čuje, lakše se vidi.' },
        { title: 'Počnite sa dva', text: 'Obrasci od dva elementa su najbolji početak; na duže prelazite korak po korak.' },
        { title: 'Prvo pitajte, pa crtajte', text: 'Pre crtanja pitajte šta sledi, kako bi dete svojim rečima objasnilo pravilo.' }
      ]
    },
    intruder: {
      benefit: 'Vežba razvrstavanje, rečnik i objašnjavanje izbora.',
      tips: [
        { title: 'Pitajte „zašto?”', text: 'Kad dete zaokruži sličicu, pitajte zašto ne pripada — objašnjavanje je pola učenja.' },
        { title: 'Imenujte temu', text: 'Najpre recite šta je sličicama zajedničko („ovo je sve voće”), pa onda tražite uljeza.' },
        { title: 'Više sličica, veći izazov', text: 'Postepeno dodajte sličice i uljeze kako dete postaje brže.' }
      ]
    },
    line: {
      benefit: 'Jača kontrolu olovke za oblike koji se koriste u pisanju.',
      tips: [
        { title: 'Prvo pređite', text: 'Polako pređite preko isprekidanog dela pre nego što nastavite samostalno — brzina dolazi kasnije.' },
        { title: 'Prvo veliko, pa malo', text: 'Veliki obrasci su lakši malim rukama; na manje pređite kad kontrola postane bolja.' },
        { title: 'Proverite hvat', text: 'Debele bojice ili kratke olovke pomažu malim rukama da ih udobno drže.' }
      ]
    },
    shadow: {
      benefit: 'Vežba vizuelno razlikovanje i pažnju na oblik.',
      tips: [
        { title: 'Imenujte oblik', text: 'Razgovarajte o tome po čemu se svaka senka razlikuje — rep, drška, šiljati krov.' },
        { title: 'Prvo lakše', text: 'Počnite sa lakim nivoom, na kom su oblici veoma različiti, a tek onda probajte jednu grupu.' },
        { title: 'Lenjir nije potreban', text: 'Prave linije nisu cilj; važi svaka linija koja spaja pravi par.' }
      ]
    },
    maze: {
      benefit: 'Razvija planiranje, koncentraciju i kontrolu olovke.',
      tips: [
        { title: 'Prvo prstom', text: 'Neka dete najpre prstom pronađe put, a onda olovkom.' },
        { title: 'Prvo mali lavirinti', text: 'Počnite sa 5 × 5 ili 6 × 6, a veće uzmite kako strpljenje raste.' },
        { title: 'Greške su u redu', text: 'Ako olovka završi u ćorsokaku, vratite se i pokušajte ponovo — i to je deo zabave.' }
      ]
    },
    where: {
      benefit: 'Uči reči za položaj: na, ispod, pored i iznad.',
      tips: [
        { title: 'Odglumite', text: 'Najpre stavite igračku na pravi sto, ispod njega ili pored njega — tada slike imaju smisla.' },
        { title: 'Čitajte zajedno', text: 'Pročitajte rečenicu naglas i pustite dete da pokaže pre nego što zaokruži.' },
        { title: 'Počnite sa dve reči', text: 'Krenite sa dve reči za položaj, a nove dodajte kad ih dete sigurno zna.' }
      ]
    },
    copyPattern: {
      benefit: 'Razvija vizuelno-prostorne veštine i pažljive pokrete olovkom.',
      tips: [
        { title: 'Brojite tačkice', text: 'Zajedno pronađite gde linija počinje brojeći tačkice od ugla.' },
        { title: 'Prvo mala mreža', text: 'Mreža 3 × 3 ili 4 × 4 je najbolji početak; veću uzmite kad precrtavanje postane lakše.' },
        { title: 'Prvo prave linije', text: 'Isključite kose linije dok prave ne postanu lake.' }
      ]
    },
    trace: {
      benefit: 'Razvija kontrolu olovke i prepoznavanje slova.',
      tips: [
        { title: 'Izgovorite naglas', text: 'Dok prati slovo, neka ga dete imenuje i izgovori njegov glas — tako povezuje oblik, glas i pokret.' },
        { title: 'Kratko i često', text: 'Jedan red dnevno vredi više od cele strane jednom nedeljno. Stanite dok je još zabavno.' },
        { title: 'Proverite hvat', text: 'Debele bojice ili kratke olovke pomažu malim rukama da ih udobno drže.' }
      ]
    },
    dotToDot: {
      benefit: 'Vežba redosled brojeva i mirne pokrete ruke.',
      tips: [
        { title: 'Izgovorite svaki broj', text: 'Brojite naglas od tačkice do tačkice — usput se vežba i redosled brojeva.' },
        { title: 'Pogodite sliku', text: 'Pre početka zajedno pogađajte šta će se pojaviti na slici.' },
        { title: 'Za početak manje tačkica', text: 'Počnite sa 10–15 tačkica; više tačkica znači duži i zahtevniji put.' }
      ]
    }
  },
  common: {
    numberOfProblems: 'Broj zadataka',
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

const polish: Translations = {
  header: {
    appTitle: 'Uczymy się z Tomą',
    logoLines: ['Uczymy się', 'z Tomą'],
    languageLabel: 'Język',
    support: 'Wesprzyj',
    allActivities: 'Wszystkie ćwiczenia'
  },
  footer: {
    description: 'Darmowe karty pracy do druku dla dzieci w wieku 4–7 lat, po angielsku, chorwacku, serbsku i polsku. Dla rodziców oraz nauczycieli w przedszkolach i szkołach.',
    explore: 'Odkrywaj',
    getInTouch: 'Odezwij się',
    keepFree: {
      title: 'Niech zostanie za darmo',
      text: 'Każda karta pracy jest darmowa dla każdej rodziny – dzięki rodzicom, którzy się dokładają.',
      button: 'Wesprzyj'
    },
    copyright: '© {year} Uczymy się z Tomą · Stworzone przez tatę trójki dzieci',
    activityCopyright: '© {year} Uczymy się z Tomą · Darmowe karty pracy do druku dla dzieci w wieku 4–7 lat',
    backHome: 'Wróć na stronę główną'
  },
  donate: 'Wesprzyj projekt i pomóż dzieciom w nauce',
  activitiesSection: {
    eyebrow: 'Ćwiczenia',
    title: 'Co dziś poćwiczymy?',
    filterLabel: 'Filtruj ćwiczenia',
    all: 'Wszystkie ({count})',
    categories: { letters: 'Litery i wyrazy', numbers: 'Liczby i wielkość', motor: 'Motoryka mała', thinking: 'Myślenie' }
  },
  hero: {
    badges: ['100% za darmo', 'Wiek 4–7 lat', '4 języki'],
    title: { before: 'Karty pracy do druku dla ', highlight: 'najmłodszych', after: ', gotowe w kilka sekund.' },
    intro: 'Wybierz jedno z 12 ćwiczeń, język i kilka ustawień, a potem wydrukuj. Za każdym razem nowa karta pracy — bez kosztów i bez zachodu.',
    chooseActivity: 'Wybierz ćwiczenie',
    howItWorks: 'Jak to działa',
    madeFor: 'Dla',
    audiences: ['rodziców', 'nauczycieli', 'przedszkoli'],
    sticker: ['Za darmo', 'do druku']
  },
  howItWorks: [
    { title: 'Wybierz ćwiczenie', text: 'Litery, liczby, motoryka mała albo zagadki logiczne — 12 do wyboru.' },
    { title: 'Dopasuj je do siebie', text: 'Wybierz język, poziom trudności i liczbę zadań, a potem utwórz nową kartę pracy.' },
    { title: 'Wydrukuj i baw się', text: 'Wydrukuj od razu albo zapisz jako PDF na później.' }
  ],
  languagesBand: {
    title: 'Każda karta pracy w twoim języku',
    text: 'Polecenia, słowa i obrazki zmieniają się razem z językiem — świetne dla rodzin dwujęzycznych i w terapii logopedycznej.'
  },
  menu: {
    label: 'Menu główne',
    openMenu: 'Menu',
    items: {
      activities: 'Ćwiczenia',
      testimonials: 'Opinie',
      about: 'O projekcie',
      help: 'Chcesz pomóc?'
    }
  },
  about: {
    eyebrow: 'O projekcie',
    heading: 'Tata, który nie nadążał z rysowaniem',
    lead: 'Uczymy się z Tomą to darmowa strona, która w kilka sekund tworzy karty pracy do druku dla dzieci — pisanie wyrazów, liczenie, labirynty, pisanie liter po śladzie i wiele więcej. Jest dla rodziców oraz nauczycieli w przedszkolach i szkołach.',
    stats: [
      { value: '12', label: 'ćwiczeń' },
      { value: '4–7', label: 'lat' },
      { value: '4', label: 'języki' },
      { value: '0 zł', label: 'zawsze za darmo' }
    ],
    story: [
      'Cała moja trójka **uwielbiała rozwiązywać na papierze małe zagadki, zadania i łamigłówki**, kiedy byli mali. Proste rzeczy, takie jak „narysuj koło”, „dokończ wyraz” czy „znajdź największy przedmiot”. Naprawdę ich to cieszyło, mniej więcej do szóstego, siódmego roku życia. (Dziś odpowiedzieliby na to strasznie irytującym głosem: „Six seveeeen!”)',
      'Kupowaliśmy im zeszyty ćwiczeń, ale i tak zawsze przychodzili do nas, kiedy z żoną piliśmy kawę w niedzielę o 9 rano, i pytali: **„Tato, dasz nam jakieś zadania?”** A w niedzielę o 9 rano raczej nie skoczysz po nowy zeszyt ćwiczeń.',
      'Zacząłem więc **rysować im zadania ręcznie**. Były tylko dwa małe problemy:'
    ],
    drawingReasons: [
      'bardzo szybko zrobiło się to monotonne, bo **naprawdę nie umiem rysować**, i',
      '**nie potrafiłem rysować tak szybko, jak oni rozwiązywali.**'
    ],
    afterReasons: [
      'Jako programista zacząłem szukać **sposobu, żeby to zautomatyzować** — i może trochę ułatwić innym rodzicom zajęcie czymś dzieci, kiedy sami próbują normalnie, bez przerywania, porozmawiać przy kawie. Ale moja rada: **niech ta rozmowa będzie krótka**. I tak ktoś wam zaraz przerwie! :)'
    ],
    learner: {
      title: 'Z myślą o każdym dziecku',
      text: 'Mój syn jest **neuroatypowy** i bardzo nie lubi rysowania ani niczego, co ma związek z ołówkiem. Tymczasem wczesny rozwój **grafomotoryki i motoryki małej** jest bardzo ważny, a **ćwiczenia z ołówkiem w palcach są kluczowe**. I nagle, nie wiadomo skąd, zainteresował się literami i pisaniem — a te małe zadania **przyciągnęły jego uwagę na dłużej niż cokolwiek innego**, czego próbowaliśmy.',
      tags: ['Autyzm', 'ADHD', 'Dysleksja', 'Dyspraksja'],
      disclaimer: {
        label: 'Ważne:',
        text: 'każde dziecko jest inne. Zanim dasz te karty pracy dziecku neuroatypowemu, porozmawiaj z jego nauczycielem w przedszkolu lub szkole albo z logopedą. Źle dobrane ćwiczenie może czasem bardziej zaszkodzić, niż pomóc.'
      }
    },
    closing: [
      'Żeby się za bardzo nie rozpisywać: **zrobiłem tę stronę dla siebie**, żeby szybko przygotowywać małe zadania dla najmłodszej córki (starsza dwójka już z nich wyrosła, przynajmniej na razie ;)). Ale mam nadzieję, że są też **inni rodzice, którym się przyda**.'
    ],
    handwritten: 'Mam też nadzieję, że niejedno dziecko będzie się przy nich świetnie bawić!',
    signature: '— Mario, tata trójki dzieci',
    supportNote: {
      text: 'Jeśli te małe karty pracy wywołały uśmiech przy twoim stole, możesz pomóc, żeby powstawały kolejne.',
      button: 'Wesprzyj projekt'
    },
    photos: [
      {
        alt: 'Ręcznie narysowana karta pracy: małe rysunki ołówkiem – pszczoła, słońce, chmura, owca, dzwonek, pianino i kot, a przy każdym kreski na litery jego nazwy',
        caption: 'Tu wszystko się zaczęło'
      },
      {
        alt: 'Dziecko przy drewnianym stole, z ołówkiem w ręce, rozwiązuje wydrukowaną kartę pracy',
        caption: 'Niedzielne poranne ćwiczenia'
      }
    ]
  },
  help: {
    eyebrow: 'Dołącz',
    heading: 'Chcesz pomóc?',
    intro: 'Uczymy się z Tomą jest za darmo dla wszystkich. Jeśli twoje maluchy dobrze się przy tym bawią, oto cztery sposoby, żeby tak zostało.',
    donate: {
      title: 'Przekaż darowiznę',
      paragraphs: [
        'Wpłać niewielką kwotę (albo, jeszcze lepiej, **niewielką kwotę co miesiąc** :)), żeby pomóc w utrzymaniu projektu. Tokeny kosztują (tak, sporo z tego powstało z pomocą sztucznej inteligencji :)), podobnie jak serwery, domeny… No i piję mnóstwo kawy, kiedy nad tym pracuję, więc to też :)',
        'A tak na poważnie: jeśli twoje dziecko (lub dzieci) dobrze się bawiło przy tych kartach pracy, **pomóż, żeby ta strona mogła dalej działać**.'
      ]
    },
    share: {
      title: 'Przekaż dalej',
      paragraphs: [
        'Udostępnij Uczymy się z Tomą w mediach społecznościowych, w grupach na WhatsAppie, Viberze i innych (zwłaszcza tych z rodzicami małych dzieci), w szkołach, przedszkolach… Bardzo bym chciał, żeby **jak najwięcej osób** mogło bawić się ze swoimi dziećmi przy tych kartach pracy i żeby pomogły one rozwinąć **grafomotorykę, koncentrację i logiczne myślenie** jak największej liczby dzieci!'
      ],
      shareOn: 'Udostępnij przez {network}',
      email: 'Wyślij e-mailem',
      copyLink: 'Kopiuj link',
      linkCopied: 'Link skopiowany!',
      more: 'Więcej…',
      message: 'Darmowe karty pracy do druku dla dzieci – Uczymy się z Tomą'
    },
    feedback: {
      title: 'Podziel się uwagami',
      intro: 'Napisz do mnie śmiało na {email} i daj znać, co myślisz. Szczególnie ucieszy mnie:',
      items: [
        {
          text: '**Każda konstruktywna uwaga** — pomaga mi ulepszać ćwiczenia dla kolejnych dzieci.',
          example: 'np. „Moja córka (6 lat) pokochała »Znajdź intruza«, ale z »Przerysuj wzór« poszło jej gorzej, bo nie rozpoznawała wzorów.”'
        },
        {
          text: '**Każda opinia**, którą mogę opublikować na stronie — im więcej ich dostanę, tym bardziej jestem pewien, że projekt idzie w dobrą stronę.',
          example: 'np. „Razem z synem (6 lat) spędziliśmy przy tym w tym tygodniu trzy popołudnia.” — Kasia, mama Kuby (6)'
        }
      ],
      button: 'Wyślij uwagi lub opinię',
      emailSubject: 'Uczymy się z Tomą – uwagi'
    },
    photos: {
      title: 'Podziel się zdjęciami lub filmikami',
      text: 'Prawdziwe chwile opowiadają tę historię lepiej niż cokolwiek, co sam mógłbym napisać. Oczywiście nikt z nas nie chce wysyłać zdjęć swoich dzieci ani tego, żeby firmy publikowały je w internecie — dlatego wykorzystam tylko takie zdjęcia i filmiki, na których **nie da się rozpoznać żadnego dziecka**.',
      exampleAlt: 'Przykład: dziecko pisze na karcie pracy, widziane od tyłu, twarzy nie widać',
      exampleCaption: 'Na przykład takie',
      kinds: ['Rozmazane twarze', 'Widok od tyłu', 'Same dłonie', 'Gotowe karty pracy'],
      note: 'Wszystko, co prawdziwe, jest super — wystarczy kilka sekund filmiku.',
      button: 'Wyślij zdjęcia lub filmiki',
      emailSubject: 'Uczymy się z Tomą – zdjęcia i filmiki'
    }
  },
  testimonials: {
    eyebrow: 'Opinie',
    title: 'Co mówią rodzice',
    previous: 'Poprzednie opinie',
    next: 'Następne opinie',
    items: [
      { quote: 'Litery i kreski wciąż są trochę krzywe :) ale Mary Jane robi to z uśmiechem na twarzy, co bardzo mi pomaga!', name: 'Peter', relation: 'Tata Mary Jane (7)' },
      { quote: 'Mak bawił się tym wyjątkowo długo i bardzo spodobały mu się ćwiczenia, a najbardziej „Znajdź intruza”!', name: 'Nela', relation: 'Mama Maka (5)' },
      { quote: 'Dzięki temu co tydzień spędzamy z córką całe godziny na zabawie. Ona to po prostu uwielbia!', name: 'Mary', relation: 'Mama Kylie (5)' },
      { quote: 'To jest super, kończy mi się papier do drukarki! Moje dzieci po prostu to uwielbiają!', name: 'Ivana', relation: 'Mama Petara (6) i Mai (4)' }
    ]
  },
  activities: {
    spelling: { title: 'Pisanie wyrazów', description: 'Ćwicz pisanie wyrazów z pomocą obrazków.' },
    counting: { title: 'Liczenie', description: 'Policz przedmioty i wpisz liczbę.' },
    biggestSmallest: { title: 'Największe i najmniejsze', description: 'Zakreśl największy i najmniejszy przedmiot.' },
    sequence: { title: 'Dokończ rytm', description: 'Zobacz, co się powtarza, i rysuj dalej.' },
    intruder: { title: 'Znajdź intruza', description: 'Znajdź obrazki, które nie pasują do tematu.' },
    line: { title: 'Dokończ szlaczek', description: 'Rysuj szlaczek po śladzie i dalej, aż do brzegu kartki.' },
    shadow: { title: 'Dopasuj cień', description: 'Połącz każdy obrazek z jego cieniem.' },
    maze: { title: 'Labirynt', description: 'Znajdź drogę przez labirynt.' },
    where: { title: 'Gdzie to jest?', description: 'Znajdź obrazek, który pasuje do zdania.' },
    copyPattern: { title: 'Przerysuj wzór', description: 'Przerysuj rysunek na siatkę kropek.' },
    trace: { title: 'Pisz po śladzie', description: 'Pisz litery i cyfry po śladzie, a potem samodzielnie.' },
    dotToDot: { title: 'Połącz kropki', description: 'Połącz kropki po kolei i odkryj obrazek.' }
  },
  activityPage: {
    makeWorksheet: 'Twoja karta pracy',
    language: 'Język',
    generate: 'Utwórz kartę pracy',
    print: 'Drukuj kartę pracy',
    preview: 'Podgląd',
    emptyPreview: 'Wybierz ustawienia i kliknij „Utwórz kartę pracy”. Karta pojawi się tutaj — dokładnie taka, jak zostanie wydrukowana.',
    supportBold: 'Te karty pracy zawsze będą za darmo.',
    supportText: 'Równowartość jednej kawy pomaga, żeby tak zostało dla każdej rodziny.',
    supportLink: 'Wesprzyj projekt',
    tips: 'Wskazówki dla dorosłych',
    tryNext: 'Spróbuj też',
    seeAll: 'Zobacz wszystkie ćwiczenia ({count})',
    switcher: 'Wszystkie ćwiczenia',
    pageCount: { one: '{count} strona · A4', few: '{count} strony · A4', other: '{count} stron · A4' }
  },
  worksheet: {
    pageLabel: 'Strona {page} z {count}'
  },
  activityInfo: {
    spelling: {
      benefit: 'Łączy obrazki ze słowami i uczy pierwszego pisania wyrazów.',
      tips: [
        { title: 'Mówcie powoli', text: 'Zanim dziecko zacznie pisać, powiedzcie razem słowo na głos, przeciągając głoski („k-o-t”), tak żeby każda głoska dostała swoją kreskę.' },
        { title: 'Zacznij od krótkich', text: 'Zacznij od wyrazów z trzech lub czterech liter, a maksymalną liczbę liter zwiększaj dopiero wtedy, gdy pójdzie łatwo.' },
        { title: 'Sprawdź chwyt', text: 'Grube kredki lub krótkie ołówki pomagają małym rączkom wygodnie je trzymać.' }
      ]
    },
    counting: {
      benefit: 'Ćwiczy liczenie po kolei i zapisywanie liczb.',
      tips: [
        { title: 'Dotknij i policz', text: 'Niech dziecko dotyka każdego obrazka, licząc na głos — wtedy każdy przedmiot policzy tylko raz.' },
        { title: 'Zaznaczajcie policzone', text: 'Mały ptaszek przy każdym policzonym obrazku pomaga, gdy obrazki są rozrzucone.' },
        { title: 'Zacznij od małych liczb', text: 'Ustaw maksimum na pięć albo dziesięć, dopóki liczenie nie pójdzie pewnie, a potem idźcie wyżej.' }
      ]
    },
    biggestSmallest: {
      benefit: 'Ćwiczy porównywanie wzrokowe i słowa opisujące wielkość.',
      tips: [
        { title: 'Rozmawiajcie o wielkości', text: 'Pokazując, używaj słów duży, większy i największy — dziecko poznaje i słowa, i samo pojęcie.' },
        { title: 'Mniej znaczy łatwiej', text: 'Przy mniejszej liczbie przedmiotów różnica jest wyraźniejsza; dodaj przedmioty, żeby było trudniej.' },
        { title: 'Dwa kolory, dwa zadania', text: 'Przed rozpoczęciem przygotuj zieloną i niebieską kredkę, żeby łatwo było wykonać polecenie.' }
      ]
    },
    sequence: {
      benefit: 'Uczy dostrzegania wzorów — podstawy wczesnej matematyki i logiki.',
      tips: [
        { title: 'Powiedzcie rytm na głos', text: 'Czytajcie go na głos jak wyliczankę („trójkąt, koło, trójkąt, koło…”) — gdy się go słyszy, łatwiej go zobaczyć.' },
        { title: 'Zacznij od dwóch', text: 'Wzory z dwóch elementów to najlepszy początek; do dłuższych przechodźcie krok po kroku.' },
        { title: 'Najpierw pytanie, potem rysunek', text: 'Zanim dziecko zacznie rysować, zapytaj, co będzie dalej — niech własnymi słowami wyjaśni regułę.' }
      ]
    },
    intruder: {
      benefit: 'Ćwiczy grupowanie, słownictwo i uzasadnianie wyborów.',
      tips: [
        { title: 'Zapytaj „dlaczego?”', text: 'Kiedy dziecko zakreśli obrazek, zapytaj, dlaczego nie pasuje — tłumaczenie to połowa nauki.' },
        { title: 'Nazwijcie temat', text: 'Najpierw powiedzcie, co łączy obrazki („to wszystko owoce”), a potem szukajcie intruza.' },
        { title: 'Więcej obrazków, większe wyzwanie', text: 'Dodawaj obrazki i intruzów stopniowo, w miarę jak dziecko radzi sobie coraz szybciej.' }
      ]
    },
    line: {
      benefit: 'Wzmacnia kontrolę nad ołówkiem przy kształtach potrzebnych do pisania.',
      tips: [
        { title: 'Najpierw po śladzie', text: 'Powoli poprowadźcie ołówek po przerywanej części, zanim dziecko zacznie rysować samo — na szybkość przyjdzie czas.' },
        { title: 'Najpierw duże, potem małe', text: 'Duże wzory są łatwiejsze dla małych rączek; do mniejszych przejdźcie, gdy ręka będzie pewniejsza.' },
        { title: 'Sprawdź chwyt', text: 'Grube kredki lub krótkie ołówki pomagają małym rączkom wygodnie je trzymać.' }
      ]
    },
    shadow: {
      benefit: 'Ćwiczy spostrzegawczość i zwracanie uwagi na kształt.',
      tips: [
        { title: 'Nazwijcie kształt', text: 'Porozmawiajcie o tym, czym wyróżnia się każdy cień — ogonem, uchwytem, spiczastym dachem.' },
        { title: 'Najpierw łatwiej', text: 'Zacznij od łatwego poziomu, na którym kształty bardzo się różnią, a dopiero potem spróbujcie trudnego, z podobnymi kształtami.' },
        { title: 'Linijka niepotrzebna', text: 'Proste linie nie są celem; liczy się każda linia, która łączy właściwą parę.' }
      ]
    },
    maze: {
      benefit: 'Rozwija planowanie, koncentrację i kontrolę nad ołówkiem.',
      tips: [
        { title: 'Najpierw palcem', text: 'Niech dziecko najpierw znajdzie drogę palcem, a dopiero potem ołówkiem.' },
        { title: 'Najpierw małe labirynty', text: 'Zacznij od 5 × 5 albo 6 × 6, a większe wybieraj, gdy cierpliwości przybędzie.' },
        { title: 'Błędy są w porządku', text: 'Jeśli ołówek trafi w ślepy zaułek, wróćcie i spróbujcie jeszcze raz — to też część zabawy.' }
      ]
    },
    where: {
      benefit: 'Uczy słów określających położenie: na, pod, obok i nad.',
      tips: [
        { title: 'Odegrajcie to', text: 'Najpierw połóżcie zabawkę na prawdziwym stole, pod nim albo obok niego — wtedy obrazki nabiorą sensu.' },
        { title: 'Czytajcie razem', text: 'Przeczytaj zdanie na głos i pozwól dziecku pokazać obrazek, zanim go zakreśli.' },
        { title: 'Na początek dwa słowa', text: 'Zacznij od dwóch słów określających położenie, a kolejne dodawaj, gdy dziecko będzie ich pewne.' }
      ]
    },
    copyPattern: {
      benefit: 'Rozwija orientację wzrokowo-przestrzenną i staranne ruchy ołówkiem.',
      tips: [
        { title: 'Liczcie kropki', text: 'Razem znajdźcie, gdzie zaczyna się linia, licząc kropki od rogu.' },
        { title: 'Najpierw mała siatka', text: 'Siatka 3 × 3 albo 4 × 4 to najlepszy początek; większą wybierz, gdy przerysowywanie pójdzie łatwiej.' },
        { title: 'Najpierw poziome i pionowe', text: 'Wyłącz linie ukośne, dopóki poziome i pionowe nie pójdą łatwo.' }
      ]
    },
    trace: {
      benefit: 'Rozwija kontrolę nad ołówkiem i rozpoznawanie liter.',
      tips: [
        { title: 'Mówcie na głos', text: 'Pisząc po śladzie, niech dziecko nazywa literę i wymawia jej głoskę — tak łączy kształt, dźwięk i ruch.' },
        { title: 'Krótko i często', text: 'Jeden rządek dziennie da więcej niż cała strona raz w tygodniu. Kończcie, póki to jeszcze zabawa.' },
        { title: 'Sprawdź chwyt', text: 'Grube kredki lub krótkie ołówki pomagają małym rączkom wygodnie je trzymać.' }
      ]
    },
    dotToDot: {
      benefit: 'Ćwiczy kolejność liczb i spokojne ruchy ręki.',
      tips: [
        { title: 'Liczcie na głos', text: 'Liczcie na głos od kropki do kropki — przy okazji ćwiczy się kolejność liczb.' },
        { title: 'Zgadnijcie, co to', text: 'Zanim zaczniecie, zgadujcie razem, co pojawi się na obrazku.' },
        { title: 'Na początek mniej kropek', text: 'Zacznij od 10–15 kropek; więcej kropek to dłuższa i trudniejsza droga.' }
      ]
    }
  },
  common: {
    numberOfProblems: 'Liczba zadań',
    removeRow: 'Usuń ten wiersz'
  },
  spelling: {
    instruction: 'Napisz, co jest na obrazku.',
    maxLetters: 'Maksymalna liczba liter w wyrazie',
    picture: 'Obrazek do ćwiczenia',
    showWord: 'Pokaż wyraz'
  },
  counting: {
    instruction: 'Policz, ile jest przedmiotów.',
    maxItems: 'Maksymalna liczba przedmiotów w zadaniu',
    itemsToCount: 'Przedmioty do policzenia',
    showAnswer: 'Pokaż odpowiedź'
  },
  biggestSmallest: {
    instruction: 'Zakreśl największy przedmiot na zielono, a najmniejszy na niebiesko.',
    maxItems: 'Maksymalna liczba przedmiotów w zadaniu',
    itemsToCompare: 'Przedmioty do porównania',
    minItemsError: 'Maksymalna liczba przedmiotów w zadaniu musi wynosić co najmniej 3.'
  },
  sequence: {
    instruction: 'Zobacz, co się powtarza, i dokończ rytm.',
    elementType: 'Elementy',
    shapes: 'Kształty',
    numbers: 'Liczby',
    letters: 'Litery',
    patternLength: 'Elementy we wzorze',
    lengthMode: 'Długość wzoru',
    exactly: 'Dokładnie',
    upTo: 'Najwyżej',
    sequenceLabel: 'Rytm do dokończenia',
    blank: 'Puste miejsce',
    showAnswer: 'Pokaż odpowiedź',
    triangle: 'Trójkąt',
    circle: 'Koło',
    square: 'Kwadrat'
  },
  intruder: {
    instruction: 'Zakreśl to, co nie pasuje.',
    themeCount: 'Obrazki z tematu',
    intruderCount: 'Intruzi',
    picturesLabel: 'Obrazki',
    intruderLabel: 'Intruz',
    showAnswer: 'Pokaż odpowiedź',
    themeLabel: 'Temat',
    themes: {
      summer: 'Lato',
      winter: 'Zima',
      farm: 'Zwierzęta na wsi',
      fruit: 'Owoce',
      school: 'Szkoła',
      transport: 'Pojazdy',
      sea: 'Zwierzęta morskie',
      clothes: 'Ubrania',
      sports: 'Sport'
    }
  },
  line: {
    instruction: 'Poprowadź ołówek po przerywanej linii, a potem rysuj szlaczek dalej, aż do brzegu kartki.',
    guidesInstruction: 'Rysuj między dwiema liniami.',
    showGuides: 'Linie pomocnicze (u góry i na dole)',
    lineLabel: 'Szlaczek do rysowania po śladzie i dokończenia',
    shape: 'Kształt',
    size: 'Wielkość',
    mixed: 'Mieszane',
    small: 'Mały',
    medium: 'Średni',
    large: 'Duży',
    patterns: {
      zigzag: 'Zygzak',
      wave: 'Fale',
      arches: 'Łuki',
      cups: 'Miseczki',
      castle: 'Zamek',
      sawtooth: 'Ząbki',
      loops: 'Pętelki'
    }
  },
  shadow: {
    instruction: 'Połącz każdy obrazek z jego cieniem.',
    pairCount: 'Liczba par w zadaniu',
    difficulty: 'Poziom trudności',
    easy: 'Łatwy – różne kształty',
    hard: 'Trudny – podobne kształty',
    picturesLabel: 'Obrazki',
    shadowsLabel: 'Cienie',
    showAnswer: 'Pokaż odpowiedź'
  },
  maze: {
    instruction: 'Pomóż zwierzątku znaleźć drogę do jedzenia.',
    size: 'Wielkość labiryntu',
    sizes: {
      tiny: 'Bardzo mały',
      small: 'Mały',
      medium: 'Średni',
      large: 'Duży',
      huge: 'Bardzo duży'
    },
    mazeLabel: 'Labirynt',
    showAnswer: 'Pokaż drogę'
  },
  where: {
    instruction: 'Zakreśl obrazek, który pasuje do zdania.',
    sceneCount: 'Liczba obrazków w zadaniu',
    positionsLabel: 'Słowa określające położenie',
    positions: {
      on: 'na',
      under: 'pod',
      nextTo: 'obok',
      above: 'nad'
    },
    sceneLabel: 'Obrazek',
    showAnswer: 'Pokaż odpowiedź'
  },
  copyPattern: {
    instruction: 'Przerysuj rysunek na puste kropki.',
    gridSize: 'Wielkość siatki',
    lineCount: 'Liczba linii',
    diagonals: 'Linie ukośne',
    modelLabel: 'Rysunek do przerysowania',
    copyLabel: 'Pusta siatka',
    drawingType: 'Rysunki',
    drawingTypes: {
      random: 'Losowe kształty',
      pictures: 'Obrazki (domek, łódka…)',
      mixed: 'Mieszane'
    }
  },
  trace: {
    instructionLetters: 'Pisz litery po śladzie, zaczynając od kolorowej kropki. Potem napisz literę samodzielnie.',
    instructionNumbers: 'Pisz cyfry po śladzie, zaczynając od kolorowej kropki. Potem napisz cyfrę samodzielnie.',
    type: 'Co ćwiczymy',
    types: {
      uppercase: 'Wielkie litery',
      lowercase: 'Małe litery',
      numbers: 'Cyfry'
    },
    order: 'Kolejność',
    orders: {
      alphabet: 'Po kolei',
      random: 'Losowo'
    },
    size: 'Wielkość',
    sizes: {
      small: 'Małe',
      medium: 'Średnie',
      large: 'Duże'
    },
    onlyTheseLetters: 'Tylko te litery (opcjonalnie)',
    onlyTheseLettersExample: 'np. b d p',
    onlyTheseNumbers: 'Tylko te cyfry (opcjonalnie)',
    rowLabel: 'Pisz po śladzie: {character}'
  },
  dotToDot: {
    instructionNumbers: 'Połącz kropki po kolei, zaczynając od 1. Co kryje się na obrazku?',
    instructionLetters: 'Połącz kropki w kolejności alfabetycznej, zaczynając od A. Co kryje się na obrazku?',
    labelType: 'Kropki oznaczone',
    labelTypes: {
      numbers: 'Liczbami (1, 2, 3…)',
      letters: 'Literami (A, B, C…)'
    },
    dotCount: 'Liczba kropek',
    pictureLabel: 'Kropki do połączenia',
    showAnswer: 'Pokaż obrazek',
    figures: {
      house: 'Domek',
      car: 'Samochód',
      boat: 'Żaglówka',
      star: 'Gwiazda',
      mushroom: 'Grzyb',
      fish: 'Ryba',
      rocket: 'Rakieta',
      cat: 'Kot',
      heart: 'Serce',
      tree: 'Choinka',
      apple: 'Jabłko',
      butterfly: 'Motyl'
    }
  }
};

export const TRANSLATIONS: Record<LanguageKey, Translations> = {
  english,
  croatian,
  serbian,
  polish
};
