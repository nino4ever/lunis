import { GrammarRule, VerbConjugation, GrammarLevel, VerbGroup, TranslationLanguage } from '../types';

export interface GrammarLevelMeta {
  id: GrammarLevel;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  badgeColor: string;
  accentGradient: string;
  cefr: string; // A1, A2, B1, B2, C1
}

export const GRAMMAR_LEVELS: GrammarLevelMeta[] = [
  {
    id: 'A',
    code: 'Kurs A',
    title: 'SFI Kurs A (Nybörjare)',
    subtitle: 'Ljud, alfabet, ordföljd & enkla verb i nutid',
    description: 'För dig som är ny i det svenska språket. Grundläggande satser, personliga pronomen och vanliga vardagsverb i presens.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentGradient: 'from-emerald-600 to-teal-700',
    cefr: 'CEFR A1.1'
  },
  {
    id: 'B',
    code: 'Kurs B',
    title: 'SFI Kurs B (Grundnivå)',
    subtitle: 'Huvudsats, substantivens böjning & dåtid',
    description: 'Rak och omvänd ordföljd, en- och ett-ord, bestämd form, pluralgrupper och introduktion till preteritum.',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    accentGradient: 'from-sky-600 to-indigo-700',
    cefr: 'CEFR A1-A2'
  },
  {
    id: 'C',
    code: 'Kurs C',
    title: 'SFI Kurs C (Mellannivå)',
    subtitle: 'V2-regeln, perfekt/supinum, adjektiv & reflexiva verb',
    description: 'Det finita verbets position 2, skillnaden mellan dåtid (preteritum och perfekt), adjektivens böjningssystem samt partikelverb.',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    accentGradient: 'from-indigo-600 to-purple-700',
    cefr: 'CEFR A2-B1'
  },
  {
    id: 'D',
    code: 'Kurs D',
    title: 'SFI Kurs D (Avancerad)',
    subtitle: 'Bisatser, BIFF-regeln, passiv form & sambandsord',
    description: 'Komplex meningsbyggnad, subjunktioner, satsadverbialets placering i bisatser, s-passiv och formell textbindning.',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    accentGradient: 'from-purple-600 to-pink-700',
    cefr: 'CEFR B1-B2'
  },
  {
    id: 'Yrke-SVA',
    code: 'Yrke & SVA',
    title: 'Yrkes-SFI & SVA Grund',
    subtitle: 'Nominaliseringar, particip, de/dem & fackspråk',
    description: 'Professionellt och akademiskt skriftspråk, presens- och perfekt particip, modala konstruktioner och korrekt användning av de och dem.',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    accentGradient: 'from-amber-600 to-orange-700',
    cefr: 'CEFR B2-C1'
  }
];

export const VERB_GROUPS_INFO = [
  {
    id: 'grupp-1' as VerbGroup,
    name: 'Grupp 1 (-ar verb)',
    pattern: 'Infinitiv: -a | Presens: -ar | Preteritum: -ade | Supinum: -at | Imperativ: -a',
    ruleDesc: 'Den största och mest regelbundna gruppen i svenskan. Stammen slutar alltid på vokalen -a.',
    example: 'tala → talar → talade → har talat → tala!'
  },
  {
    id: 'grupp-2a' as VerbGroup,
    name: 'Grupp 2a (-er / -de verb)',
    pattern: 'Infinitiv: -a | Presens: -er | Preteritum: -de | Supinum: -t | Imperativ: stam utan -a',
    ruleDesc: 'Stammen slutar på tonande konsonant (b, d, g, l, m, n, r, v). Preteritum får ändelsen -de.',
    example: 'ringa → ringer → ringde → har ringt → ring!'
  },
  {
    id: 'grupp-2b' as VerbGroup,
    name: 'Grupp 2b (-er / -te verb)',
    pattern: 'Infinitiv: -a | Presens: -er | Preteritum: -te | Supinum: -t | Imperativ: stam utan -a',
    ruleDesc: 'Stammen slutar på tonlös konsonant (k, p, s, t, x). Preteritum får ändelsen -te.',
    example: 'läsa → läser → läste → har läst → läs!'
  },
  {
    id: 'grupp-3' as VerbGroup,
    name: 'Grupp 3 (Kortverb / -dde verb)',
    pattern: 'Infinitiv: vokal (ej a) | Presens: -r | Preteritum: -dde | Supinum: -tt | Imperativ: som infinitiv',
    ruleDesc: 'Korta verb vars stam slutar på en betonad vokal (andra än -a, t.ex. o, y, e, å, ä).',
    example: 'bo → bor → bodde → har bott → bo!'
  },
  {
    id: 'grupp-4' as VerbGroup,
    name: 'Grupp 4 (Starka & Oregelbundna verb)',
    pattern: 'Vokalväxling i preteritum (avljud) | Supinum slutar på -it | Ingen ändelse i preteritum',
    ruleDesc: 'Verb som byter vokal i preteritum (t.ex. i → e, a → o) och inte tar -de/-te. Mycket vanliga vardagsverb!',
    example: 'skriva → skriver → skrev → har skrivit → skriv!'
  },
  {
    id: 'hjalpverb' as VerbGroup,
    name: 'Hjälpverb (Modala verb)',
    pattern: 'Hjälpverb + Infinitiv utan "att"',
    ruleDesc: 'Verb som kombineras med ett huvudverb för att uttrycka vilja, tvång, möjlighet eller framtid.',
    example: 'ska studera, vill äta, kan tala, måste sova, brukar promenera'
  },
  {
    id: 'reflexiva' as VerbGroup,
    name: 'Reflexiva verb',
    pattern: 'Verb + reflexivt pronomen (mig / dig / sig / oss / er / sig)',
    ruleDesc: 'Handling som subjektet utför på sig själv. Pronomenet ändras efter subjektets person.',
    example: 'Jag lär mig, Du lär dig, Han lär sig, Vi lär oss'
  }
];

export const GRAMMAR_RULES: GrammarRule[] = [
  // ===================== SFI KURS A =====================
  {
    id: 'gra-a1',
    level: 'A',
    levelTitle: 'SFI Kurs A',
    category: 'ordfoljd',
    categoryLabel: 'Ordföljd',
    title: 'Grundläggande ordföljd: Subjekt + Verb + Komplement',
    summary: 'En svensk mening börjar oftast med vem som gör något (Subjekt), följt direkt av vad personen gör (Verb).',
    formula: 'Subjekt (Vem?) + Verb (Gör vad?) + Objekt/Plats (Var/Vad?)',
    explanation: [
      'I en enkel svensk påståendesats sätter vi oftast personen först i meningen.',
      'Verbet talar om handlingen och står på position 2.',
      'Svenska har alltid ett utskrivet subjekt (till skillnad från t.ex. spanska eller arabiska där subjektet ibland är inbyggt i verbet).'
    ],
    examples: [
      {
        swedish: 'Fatima läser en bok.',
        note: 'Fatima (Subjekt) + läser (Verb) + en bok (Objekt)',
        translation: {
          ar: 'فاطمة تقرأ كتاباً.',
          fr: 'Fatima lit un livre.',
          it: "Fatima legge un libro.",
          en: 'Fatima is reading a book.'
        }
      },
      {
        swedish: 'Ali bor i Malmö.',
        note: 'Ali (Subjekt) + bor (Verb) + i Malmö (Plats)',
        translation: {
          ar: 'علي يعيش في مالمو.',
          fr: 'Ali habite à Malmö.',
          it: "Ali abita a Malmö.",
          en: 'Ali lives in Malmo.'
        }
      }
    ],
    commonMistake: {
      incorrect: 'I Sverige bor.',
      correct: 'Jag bor i Sverige.',
      explanation: 'På svenska måste du alltid ha med vem som bor (Jag).'
    },
    practiceQuestion: {
      prompt: 'Vilken mening har korrekt grundordföljd?',
      options: [
        'Talar svenska Ahmad.',
        'Ahmad talar svenska.',
        'Svenska Ahmad talar.'
      ],
      correctIndex: 1,
      explanation: 'Subjektet "Ahmad" kommer först och verbet "talar" kommer på andra plats!'
    }
  },
  {
    id: 'gra-a2',
    level: 'A',
    levelTitle: 'SFI Kurs A',
    category: 'pronomen',
    categoryLabel: 'Pronomen',
    title: 'Personliga pronomen i subjektsform',
    summary: 'Ord som ersätter namn på personer och ting: jag, du, han, hon, den, det, vi, ni, de.',
    formula: 'Singular: jag, du, han, hon, den, det | Plural: vi, ni, de [uttalas: dom]',
    explanation: [
      'Jag = 1:a person singular (den som talar)',
      'Du = 2:a person singular (den man pratar med)',
      'Han / Hon = 3:e person (man / kvinna)',
      'Den / Det = saker (en-ord / ett-ord: den stolen, det bordet)',
      'Vi / Ni / De = pluralis (flera personer)'
    ],
    examples: [
      {
        swedish: 'Han heter Omar och hon heter Sara.',
        note: 'Han (maskulinum) och hon (femininum)',
        translation: {
          ar: 'هو اسمه عمر وهي اسمها سارة.',
          fr: "Il s'appelle Omar et elle s'appelle Sara.",
          it: "Lui si chiama Omar e lei si chiama Sara.",
          en: 'He is named Omar and she is named Sara.'
        }
      },
      {
        swedish: 'De studerar på sfi.',
        note: 'De uttalas oftast som "dåmm" [dom].',
        translation: {
          ar: 'هم يدرسون في مدرسة sfi.',
          fr: 'Ils étudient au SFI.',
          it: "Loro studiano al SFI.",
          en: 'They study at SFI.'
        }
      }
    ]
  },
  {
    id: 'gra-a3',
    level: 'A',
    levelTitle: 'SFI Kurs A',
    category: 'verb',
    categoryLabel: 'Verb',
    title: 'Presens: Nutid (Vad händer nu?)',
    summary: 'Svenska verb ändras inte efter person! Samma verbform används för jag, du, han, vi, de.',
    formula: 'Jag läser, Du läser, Han läser, Vi läser, De läser (Samma form!)',
    explanation: [
      'I svenskan böjs inte verbet efter person som i många andra språk (engelska: reads/read, franska: lis/lisons).',
      'Presens slutar nästan alltid på -r i svenskan (talar, läser, bor, är, har).',
      'Presens används både för det som händer just nu och för vanor.'
    ],
    examples: [
      {
        swedish: 'Jag dricker kaffe varje morgon.',
        note: 'Vana i presens (-er ändelse)',
        translation: {
          ar: 'أنا أشرب القهوة كل صباح.',
          fr: 'Je bois du café chaque matin.',
          it: "Bevo caffè ogni mattina.",
          en: 'I drink coffee every morning.'
        }
      }
    ]
  },

  // ===================== SFI KURS B =====================
  {
    id: 'gra-b1',
    level: 'B',
    levelTitle: 'SFI Kurs B',
    category: 'ordfoljd',
    categoryLabel: 'Ordföljd',
    title: 'Rak och omvänd ordföljd i huvudsats',
    summary: 'Om du startar meningen med tid eller plats, byter subjekt och verb plats så att verbet alltid står på plats 2!',
    formula: 'Tid/Plats (Fundament) + Finit Verb + Subjekt + Komplement',
    explanation: [
      'Rak ordföljd: Subjektet står först i meningen (Jag studerar i dag).',
      'Omvänd ordföljd (inversion): Tids- eller rumsadverbial står först i meningen (I dag studerar jag).',
      'Kom ihåg: Verbet vägrar att flytta sig från position 2!'
    ],
    examples: [
      {
        swedish: 'I dag studerar jag svenska på biblioteket.',
        note: 'I dag (Tid) + studerar (Verb) + jag (Subjekt)',
        translation: {
          ar: 'اليوم أدرس السويدية في المكتبة.',
          fr: "Aujourd'hui, j'étudie le suédois à la bibliothèque.",
          it: "Oggi studio svedese in biblioteca.",
          en: 'Today I am studying Swedish at the library.'
        }
      },
      {
        swedish: 'På helgen åker vi till Göteborg.',
        note: 'På helgen (Tid) + åker (Verb) + vi (Subjekt)',
        translation: {
          ar: 'في عطلة نهاية الأسبوع نذهب إلى غوتنبرغ.',
          fr: 'Le week-end, nous allons à Göteborg.',
          it: "Nel fine settimana andiamo a Göteborg.",
          en: 'On the weekend we are traveling to Gothenburg.'
        }
      }
    ],
    commonMistake: {
      incorrect: 'I går jag köpte en bil.',
      correct: 'I går köpte jag en bil.',
      explanation: 'Efter tidsordet "I går" måste verbet "köpte" komma före subjektet "jag".'
    },
    practiceQuestion: {
      prompt: 'Vilken mening har korrekt omvänd ordföljd?',
      options: [
        'Nu vi lyssnar på läraren.',
        'Nu lyssnar vi på läraren.',
        'Vi nu lyssnar på läraren.'
      ],
      correctIndex: 1,
      explanation: 'Start med "Nu" kräver att verbet "lyssnar" står direkt efter (på plats 2)!'
    }
  },
  {
    id: 'gra-b2',
    level: 'B',
    levelTitle: 'SFI Kurs B',
    category: 'substantiv',
    categoryLabel: 'Substantiv',
    title: 'Substantiv: Genus (en-ord vs ett-ord) och bestämd form',
    summary: 'Svenska substantiv har två genus: utrum (en-ord ~75%) och neutrum (ett-ord ~25%).',
    formula: 'Obestämd: en bil / ett hus → Bestämd singular: bilen / huset',
    explanation: [
      'Obestämd form (en/ett) används när vi introducerar något nytt.',
      'Bestämd form (-en/-n, -et/-t) används när lyssnaren redan vet vilket objekt vi pratar om.',
      'I svenskan sätts den bestämda artikeln som ett suffix i slutet av ordet (katt → katten).'
    ],
    examples: [
      {
        swedish: 'Jag köpte en dator. Datorn var mycket bra.',
        note: 'en dator (ny/obestämd) → datorn (känd/bestämd)',
        translation: {
          ar: 'اشتريت كمبيوتراً. الكمبيوتر كان جيداً جداً.',
          fr: "J'ai acheté un ordinateur. L'ordinateur était très bon.",
          it: "Ho comprato un computer. Il computer era molto buono.",
          en: 'I bought a computer. The computer was very good.'
        }
      }
    ]
  },
  {
    id: 'gra-b3',
    level: 'B',
    levelTitle: 'SFI Kurs B',
    category: 'verb',
    categoryLabel: 'Verb',
    title: 'Hjälpverb + Huvudverb i Infinitiv',
    summary: 'Efter modala hjälpverb (ska, kan, vill, måste, brukar, får) kommer huvudverbet i infinitiv UTAN "att".',
    formula: 'Hjälpverb + Infinitiv (utan att) [t.ex. kan tala, vill köpa, måste gå]',
    explanation: [
      'Ska = plan eller framtid (Jag ska arbeta i morgon).',
      'Vill = önskan eller vilja (Jag vill lära mig svenska).',
      'Kan = förmåga eller möjlighet (Hon kan simma).',
      'Måste = tvång eller nödvändighet (Vi måste passa bussen).',
      'Brukar = vana (Han brukar dricka te).'
    ],
    examples: [
      {
        swedish: 'Fatima vill arbeta som undersköterska i Sverige.',
        note: 'vill (hjälpverb) + arbeta (infinitiv)',
        translation: {
          ar: 'تريد فاطمة أن تعمل مساعدة ممرضة في السويد.',
          fr: 'Fatima veut travailler comme aide-soignante en Suède.',
          it: "Fatima vuole lavorare come operatrice socio-sanitaria in Svezia.",
          en: 'Fatima wants to work as an assistant nurse in Sweden.'
        }
      }
    ]
  },

  // ===================== SFI KURS C =====================
  {
    id: 'gra-c1',
    level: 'C',
    levelTitle: 'SFI Kurs C',
    category: 'ordfoljd',
    categoryLabel: 'Ordföljd',
    title: 'Satsens schema och V2-regeln i detalj',
    summary: 'Satschemat visar exakt var varje ord ska placeras i en svensk huvudsats. Verbet är alltid hjärtat på position 2.',
    formula: 'Fundament | Finit verb (1) | Subjekt | Satsadverbial | Infinit verb (2) | Objekt/Komplement | Plats/Tid',
    explanation: [
      'Fundament: Det ord du vill betona först (Subjekt, Tid, Plats, Objekt).',
      'Finit verb: Verbet i presens eller preteritum (på plats 2).',
      'Satsadverbial: Småord som "inte", "alltid", "ofta", "aldrig" placeras direkt efter finit verb och subjekt!',
      'Infinit verb: Huvudverb efter hjälpverb eller supinum (har läst, kan skriva).'
    ],
    examples: [
      {
        swedish: 'I går drack Ali inte kaffe på eftermiddagen.',
        note: 'I går (Fundament) + drack (Finit verb) + Ali (Subjekt) + inte (Satsadverbial) + kaffe (Objekt)',
        translation: {
          ar: 'أمس لم يشرب علي القهوة بعد الظهر.',
          fr: "Hier, Ali n'a pas bu de café l'après-midi.",
          it: "Ieri pomeriggio Ali non ha bevuto caffè.",
          en: 'Yesterday Ali did not drink coffee in the afternoon.'
        }
      }
    ],
    commonMistake: {
      incorrect: 'I går Ali drack inte kaffe.',
      correct: 'I går drack Ali inte kaffe.',
      explanation: 'Verbet "drack" måste komma direkt efter tidsordet "I går".'
    }
  },
  {
    id: 'gra-c2',
    level: 'C',
    levelTitle: 'SFI Kurs C',
    category: 'verb',
    categoryLabel: 'Verb & Tempus',
    title: 'Dåtid: Preteritum vs Perfekt (När använder man vad?)',
    summary: 'Preteritum används när tiden är avslutad och specifik. Perfekt används när handlingen har koppling till nuet.',
    formula: 'Preteritum: dåtid + bestämd tid (i går, förra året, 2020) | Perfekt: har + supinum (obestämd tid / erfarenhet)',
    explanation: [
      'Preteritum (köpte, bodde, talade, skrev): Tiden är slut! Frågeord: När? (När flyttade du hit? - Jag flyttade 2021).',
      'Perfekt (har köpt, har bott, har talat, har skrivit): Handlingen har skett någon gång i livet, eller pågår fortfarande (Jag har bott i Malmö i tre år).'
    ],
    examples: [
      {
        swedish: 'Hon har bott i Sverige i fem år. (Hon bor kvar nu)',
        note: 'Perfekt med "har bott" = koppling till nutid',
        translation: {
          ar: 'هي تعيش في السويد منذ خمس سنوات. (وما زالت تعيش هناك)',
          fr: 'Elle vit en Suède depuis cinq ans (et y vit toujours).',
          it: "Vive in Svezia da cinque anni. (Ci vive ancora adesso)",
          en: 'She has lived in Sweden for five years (and still does).'
        }
      },
      {
        swedish: 'Förra veckan sökte Fatima ett nytt jobb.',
        note: 'Preteritum med "sökte" = avslutad tid förra veckan',
        translation: {
          ar: 'الأسبوع الماضي تقدمت فاطمة لوظيفة جديدة.',
          fr: 'La semaine dernière, Fatima a postulé pour un nouvel emploi.',
          it: "La settimana scorsa Fatima ha fatto domanda per un nuovo lavoro.",
          en: 'Last week Fatima applied for a new job.'
        }
      }
    ]
  },
  {
    id: 'gra-c3',
    level: 'C',
    levelTitle: 'SFI Kurs C',
    category: 'adjektiv',
    categoryLabel: 'Adjektiv',
    title: 'Adjektivens böjning: en/ett, plural och bestämd form',
    summary: 'Adjektiv beskriver substantiv och måste anpassa sin form efter genus, antal och bestämdhet.',
    formula: 'en fin bil | ett fint hus | fina bilar | den fina bilen | det fina huset | de fina bilarna',
    explanation: [
      'En-ord singular: grundform (en röd tröja, en snabb buss)',
      'Ett-ord singular: lägg till -t (ett rött äpple, ett snabbt tåg)',
      'Pluralis (en & ett): lägg till -a (röda äpplen, snabba tåg)',
      'Bestämd form: dubbel bestämdhet! Artikel (den/det/de) + adjektiv med -a + substantiv i bestämd form (den nya skolan, det stora bordet, de duktiga eleverna).'
    ],
    examples: [
      {
        swedish: 'De flyttade in i det nya huset.',
        note: 'det (bestämd artikel) + nya (adjektiv -a) + huset (bestämd form)',
        translation: {
          ar: 'انتقلوا للعيش في المنزل الجديد.',
          fr: 'Ils ont emménagé dans la nouvelle maison.',
          it: "Si sono trasferiti nella nuova casa.",
          en: 'They moved into the new house.'
        }
      }
    ]
  },
  {
    id: 'gra-c4',
    level: 'C',
    levelTitle: 'SFI Kurs C',
    category: 'verb',
    categoryLabel: 'Reflexiva verb',
    title: 'Reflexiva verb och pronomen (sig, mig, dig...)',
    summary: 'Verb där subjektet utför handlingen på sig själv kräver ett reflexivt pronomen.',
    formula: 'Jag tvättar mig | Du tvättar dig | Han/Hon tvättar sig | Vi tvättar oss | Ni tvättar er | De tvättar sig',
    explanation: [
      'Vanliga reflexiva verb: lära sig (lär sig), skynda sig, bestämma sig, känna sig, sätta sig, gifta sig.',
      'Reflexivt pronomen för 3:e person (han, hon, den, det, de) är alltid SIG.'
    ],
    examples: [
      {
        swedish: 'Eleverna lär sig mycket svenska varje dag.',
        note: 'De (Eleverna) + lär + sig (reflexivt pronomen)',
        translation: {
          ar: 'يتعلم الطلاب الكثير من اللغة السويدية كل يوم.',
          fr: 'Les élèves apprennent beaucoup de suédois chaque jour.',
          it: "Gli studenti imparano molto svedese ogni giorno.",
          en: 'The students learn a lot of Swedish every day.'
        }
      }
    ]
  },

  // ===================== SFI KURS D =====================
  {
    id: 'gra-d1',
    level: 'D',
    levelTitle: 'SFI Kurs D',
    category: 'satser',
    categoryLabel: 'Bisatser',
    title: 'Bisatsordföljd och BIFF-regeln',
    summary: 'I en bisats kommer satsadverbial som "inte", "alltid" och "aldrig" FÖRE det finita verbet: BIFF!',
    formula: 'BIFF: I Bisats kommer Inte Före Finit verb! [Subjunktion + Subjekt + INTE + Finit verb]',
    explanation: [
      'Huvudsats: Verb + Inte (Han kommer inte till skolan i dag).',
      'Bisats: Subjunktion + Subjekt + Inte + Verb (...eftersom han inte kommer till skolan).',
      'Vanliga subjunktioner: att, eftersom, därför att, när, om, innan, medan, fastän, trots att.'
    ],
    examples: [
      {
        swedish: 'Hassan stannar hemma eftersom han inte mår bra.',
        note: 'eftersom (subjunktion) + han (subjekt) + inte (satsadverbial) + mår (finit verb)',
        translation: {
          ar: 'حسن يبقى في المنزل لأنه لا يشعر بحالة جيدة.',
          fr: "Hassan reste à la maison parce qu'il ne se sent pas bien.",
          it: "Hassan resta a casa perché non si sente bene.",
          en: 'Hassan stays home because he does not feel well.'
        }
      },
      {
        swedish: 'Om du inte förstår ordet, kan du slå upp det i Lunis ordbok.',
        note: 'Om (subjunktion) + du (subjekt) + inte + förstår (verb)',
        translation: {
          ar: 'إذا لم تفهم الكلمة، يمكنك البحث عنها في قاموس لونيس.',
          fr: 'Si vous ne comprenez pas le mot, vous pouvez le chercher dans le dictionnaire Lunis.',
          it: "Se non capisci la parola, puoi cercarla nel dizionario di Lunis.",
          en: 'If you do not understand the word, you can look it up in the Lunis dictionary.'
        }
      }
    ],
    commonMistake: {
      incorrect: 'Jag ringde läkaren eftersom jag mådde inte bra.',
      correct: 'Jag ringde läkaren eftersom jag inte mådde bra.',
      explanation: 'BIFF-regeln gäller i bisatsen: "inte" måste stå före "mådde".'
    },
    practiceQuestion: {
      prompt: 'Vilken bisats är grammatiskt korrekt?',
      options: [
        '...när läraren talar inte.',
        '...när läraren inte talar.',
        '...när inte talar läraren.'
      ],
      correctIndex: 1,
      explanation: 'Subjunktion (när) + Subjekt (läraren) + INTE + Verb (talar).'
    }
  },
  {
    id: 'gra-d2',
    level: 'D',
    levelTitle: 'SFI Kurs D',
    category: 'verb',
    categoryLabel: 'Passiv form',
    title: 'Passiv form med -s (S-passiv)',
    summary: 'Passiv form används när den som gör handlingen är okänd, oviktig eller när fokus ligger på resultatet.',
    formula: 'Aktiv: Författaren skriver boken. → Passiv: Boken skrivs av författaren.',
    explanation: [
      'Presens passiv: lägg till -s på stam/presensform (skrivs, läses, öppnas, säljs).',
      'Preteritum passiv: lägg till -s på preteritumformen (byggdes, lagades, stängdes, såldes).',
      'Perfekt passiv: har + supinum + s (har skrivits, har ändrats).',
      'Om man vill nämna vem som gjorde det används prepositionen "av" (agent).'
    ],
    examples: [
      {
        swedish: 'Dörrarna öppnas klockan åtta varje morgon.',
        note: 'öppnas = passiv presens (någon öppnar dörrarna)',
        translation: {
          ar: 'تُفتح الأبواب في الساعة الثامنة كل صباح.',
          fr: 'Les portes sont ouvertes à huit heures chaque matin.',
          it: "Le porte si aprono alle otto ogni mattina.",
          en: "The doors are opened at eight o'clock every morning."
        }
      }
    ]
  },
  {
    id: 'gra-d3',
    level: 'D',
    levelTitle: 'SFI Kurs D',
    category: 'satser',
    categoryLabel: 'Textbindning',
    title: 'Textbindning och sambandsord för formella texter',
    summary: 'Sambandsord skapar flyt och logik i resonerande och argumenterande texter.',
    formula: 'Orsak, kontrast, tillägg & slutsats i argumentation',
    explanation: [
      'Orsak / Förklaring: därför att, eftersom, på grund av detta, anledningen är.',
      'Motsats / Kontrast: dock, däremot, emellertid, å ena sidan... å andra sidan, trots att.',
      'Tillägg: dessutom, ytterligare en aspekt är, inte bara... utan även.',
      'Slutsats / Sammanfattning: följaktligen, sammanfattningsvis, slutligen.'
    ],
    examples: [
      {
        swedish: 'Kollektivtrafiken är miljövänlig. Dessutom minskar den biltrafiken i städerna.',
        note: 'Dessutom = skapar logiskt tillägg av argument',
        translation: {
          ar: 'وسائل النقل العام صديقة للبيئة. علاوة على ذلك، فهي تقلل من حركة السيارات في المدن.',
          fr: 'Les transports publics sont écologiques. De plus, ils réduisent la circulation automobile dans les villes.',
          it: "I trasporti pubblici sono ecologici. Inoltre riducono il traffico automobilistico nelle città.",
          en: 'Public transport is environmentally friendly. Furthermore, it reduces car traffic in cities.'
        }
      }
    ]
  },

  // ===================== YRKES-SFI & SVA GRUND =====================
  {
    id: 'gra-y1',
    level: 'Yrke-SVA',
    levelTitle: 'Yrkes-SFI & SVA',
    category: 'sva-formellt',
    categoryLabel: 'Formellt språk',
    title: 'De eller Dem? Den gyllene regeln (Vi / Oss)',
    summary: 'De används som subjekt (den som gör något). Dem används som objekt (den som påverkas).',
    formula: 'Testa med Vi/Oss: Kan du säga VI → skriv DE. Kan du säga OSS → skriv DEM.',
    explanation: [
      'De = Subjektsform (motsvarar: jag, du, han, hon, vi). Exempel: De arbetar här (= Vi arbetar här).',
      'Dem = Objektsform (motsvarar: mig, dig, honom, henne, oss). Exempel: Chefen pratade med dem (= Chefen pratade med oss).',
      'Tips: I talspråk säger vi nästan alltid "dom", men i formell skrift måste du skilja på de och dem!'
    ],
    examples: [
      {
        swedish: 'De ringde till sjukhuset för att fråga om dem.',
        note: 'De (Vi ringde) + dem (fråga om oss)',
        translation: {
          ar: 'هم اتصلوا بالمستشفى ليسألوا عنهم.',
          fr: "Ils ont appelé l'hôpital pour demander après eux.",
          it: "Hanno telefonato all'ospedale per chiedere di loro.",
          en: 'They called the hospital to ask about them.'
        }
      }
    ],
    commonMistake: {
      incorrect: 'Dem sa att mötet var inställt.',
      correct: 'De sa att mötet var inställt.',
      explanation: 'Testa med vi: "Vi sa..." alltså ska det vara "De sa...".'
    }
  },
  {
    id: 'gra-y2',
    level: 'Yrke-SVA',
    levelTitle: 'Yrkes-SFI & SVA',
    category: 'sva-formellt',
    categoryLabel: 'Nominalisering',
    title: 'Nominalisering i yrkes- och myndighetsspråk',
    summary: 'Att omvandla verb och adjektiv till substantiv för att göra texter mer kompakta, sakliga och professionella.',
    formula: 'Verb (bedöma) → Substantiv (en bedömning) | Adjektiv (trygg) → Substantiv (trygghet)',
    explanation: [
      'Vardagsspråk: Vi måste undersöka patienten noggrant innan vi bestämmer vad vi ska göra.',
      'Nominaliserat yrkesspråk: En noggrann undersökning av patienten krävs före beslut om åtgärd.',
      'Vanliga suffix vid nominalisering: -ning/-ing (utveckling), -het (patientsäkerhet), -else (händelse), -tion (dokumentation).'
    ],
    examples: [
      {
        swedish: 'Korrekt dokumentation i patientjournalen säkerställer god vårdkvalitet.',
        note: 'dokumentation (från verbet dokumentera) gör språket fackmässigt',
        translation: {
          ar: 'التوثيق الصحيح في سجل المريض يضمن جودة رعاية عالية.',
          fr: 'Une documentation correcte dans le dossier du patient garantit des soins de qualité.',
          it: "Una documentazione corretta nella cartella clinica garantisce una buona qualità delle cure.",
          en: 'Accurate documentation in the patient record ensures good quality of care.'
        }
      }
    ]
  },
  {
    id: 'gra-y3',
    level: 'Yrke-SVA',
    levelTitle: 'Yrkes-SFI & SVA',
    category: 'verb',
    categoryLabel: 'Particip',
    title: 'Presens particip och Perfekt particip',
    summary: 'Verbformer som fungerar som adjektiv för att beskriva tillstånd eller pågående handlingar.',
    formula: 'Presens particip: -ande / -ende (pågående) | Perfekt particip: -d / -t / -da (avslutat tillstånd)',
    explanation: [
      'Presens particip slutar på -ande eller -ende (gående, studerande, leende). Böjs aldrig efter en/ett/plural!',
      'Perfekt particip böjs som ett adjektiv: en stängd dörr, ett stängt fönster, stängda dörrar.'
    ],
    examples: [
      {
        swedish: 'Läkaren tog emot den väntande patienten i det nystädade rummet.',
        note: 'väntande (presens particip: som väntar) + nystädade (perfekt particip: som har städats)',
        translation: {
          ar: 'استقبل الطبيب المريض المنتظر في الغرفة التي نُظفت حديثاً.',
          fr: 'Le médecin a reçu le patient qui attendait dans la chambre fraîchement nettoyée.',
          it: "Il medico ha ricevuto il paziente in attesa nella stanza appena pulita.",
          en: 'The doctor received the waiting patient in the newly cleaned room.'
        }
      }
    ]
  }
];

export const VERBS_DATABASE: VerbConjugation[] = [
  // ===================== KURS A VERB =====================
  {
    id: 'v-vara',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Oregelbundet)',
    infinitiv: 'att vara',
    presens: 'är',
    preteritum: 'var',
    supinum: 'har varit',
    imperativ: 'var!',
    meaningSv: 'Att existera, befinna sig eller ha en egenskap',
    translations: {
      ar: 'يكون / يوجد',
      fr: 'être',
      it: "essere",
      en: 'to be'
    },
    exampleSentence: 'Jag är glad att vara i Sverige.',
    isIrregular: true
  },
  {
    id: 'v-ha',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Oregelbundet)',
    infinitiv: 'att ha',
    presens: 'har',
    preteritum: 'hade',
    supinum: 'har haft',
    imperativ: 'ha!',
    meaningSv: 'Att äga något eller uppleva ett tillstånd',
    translations: {
      ar: 'يملك / لديه',
      fr: 'avoir',
      it: "avere",
      en: 'to have'
    },
    exampleSentence: 'Sara har en lektion i svenska i dag.',
    isIrregular: true
  },
  {
    id: 'v-heta',
    level: 'A',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-te)',
    infinitiv: 'att heta',
    presens: 'heter',
    preteritum: 'hette',
    supinum: 'har hetat',
    imperativ: 'het!',
    meaningSv: 'Att ha ett visst namn',
    translations: {
      ar: 'يُدعى / اسمه',
      fr: "s'appeler",
      it: "chiamarsi",
      en: 'to be named / called'
    },
    exampleSentence: 'Vad heter du i förnamn?'
  },
  {
    id: 'v-bo',
    level: 'A',
    verbGroup: 'grupp-3',
    groupName: 'Grupp 3 (Kortverb -dde)',
    infinitiv: 'att bo',
    presens: 'bor',
    preteritum: 'bodde',
    supinum: 'har bott',
    imperativ: 'bo!',
    meaningSv: 'Att ha sin bostad och hemvist',
    translations: {
      ar: 'يسكن / يعيش',
      fr: 'habiter / vivre',
      it: "abitare / vivere",
      en: 'to live / reside'
    },
    exampleSentence: 'Vi bor i en fin lägenhet i Malmö.'
  },
  {
    id: 'v-tala',
    level: 'A',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att tala',
    presens: 'talar',
    preteritum: 'talade',
    supinum: 'har talat',
    imperativ: 'tala!',
    meaningSv: 'Att kommunicera med rösten och ord',
    translations: {
      ar: 'يتكلم / يتحدث',
      fr: 'parler',
      it: "parlare",
      en: 'to speak'
    },
    exampleSentence: 'Han talar tre olika språk flytande.'
  },
  {
    id: 'v-komma',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt)',
    infinitiv: 'att komma',
    presens: 'kommer',
    preteritum: 'kom',
    supinum: 'har kommit',
    imperativ: 'kom!',
    meaningSv: 'Att anlända eller förflytta sig hit',
    translations: {
      ar: 'يأتي / يصل',
      fr: 'venir / arriver',
      it: "venire / arrivare",
      en: 'to come / arrive'
    },
    exampleSentence: 'När kommer bussen till hållplatsen?',
    isIrregular: true
  },
  {
    id: 'v-lasa',
    level: 'A',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-te)',
    infinitiv: 'att läsa',
    presens: 'läser',
    preteritum: 'läste',
    supinum: 'har läst',
    imperativ: 'läs!',
    meaningSv: 'Att tyda text och studera',
    translations: {
      ar: 'يقرأ / يدرس',
      fr: 'lire / étudier',
      it: "leggere",
      en: 'to read / study'
    },
    exampleSentence: 'Amina läser en spännande nyhetstext.'
  },
  {
    id: 'v-skriva',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: i → e)',
    infinitiv: 'att skriva',
    presens: 'skriver',
    preteritum: 'skrev',
    supinum: 'har skrivit',
    imperativ: 'skriv!',
    meaningSv: 'Att formulera bokstäver och ord',
    translations: {
      ar: 'يكتب',
      fr: 'écrire',
      it: "scrivere",
      en: 'to write'
    },
    exampleSentence: 'Skriv ditt namn och personnummer på pappret!',
    isIrregular: true
  },

  // ===================== KURS B VERB =====================
  {
    id: 'v-arbeta',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att arbeta',
    presens: 'arbetar',
    preteritum: 'arbetade',
    supinum: 'har arbetat',
    imperativ: 'arbeta!',
    meaningSv: 'Att utföra ett jobb eller yrkesuppgift',
    translations: {
      ar: 'يعمل / يشتغل',
      fr: 'travailler',
      it: "lavorare",
      en: 'to work'
    },
    exampleSentence: 'De arbetar heltid på ett stort företag.'
  },
  {
    id: 'v-kopa',
    level: 'B',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-te)',
    infinitiv: 'att köpa',
    presens: 'köper',
    preteritum: 'köpte',
    supinum: 'har köpt',
    imperativ: 'köp!',
    meaningSv: 'Att skaffa något mot betalning',
    translations: {
      ar: 'يشتري',
      fr: 'acheter',
      it: "comprare / acquistare",
      en: 'to buy / purchase'
    },
    exampleSentence: 'I går köpte vi färska grönsaker på torget.'
  },
  {
    id: 'v-ringa',
    level: 'B',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-de)',
    infinitiv: 'att ringa',
    presens: 'ringer',
    preteritum: 'ringde',
    supinum: 'har ringt',
    imperativ: 'ring!',
    meaningSv: 'Att ringa med telefon eller skapa ringsignal',
    translations: {
      ar: 'يتصل بالهاتف',
      fr: 'appeler / téléphoner',
      it: "chiamare / telefonare",
      en: 'to call / ring'
    },
    exampleSentence: 'Ring mig när du kommer fram!'
  },
  {
    id: 'v-ata',
    level: 'B',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: ä → åt)',
    infinitiv: 'att äta',
    presens: 'äter',
    preteritum: 'åt',
    supinum: 'har ätit',
    imperativ: 'ät!',
    meaningSv: 'Att inta föda och mat',
    translations: {
      ar: 'يأكل',
      fr: 'manger',
      it: "mangiare",
      en: 'to eat'
    },
    exampleSentence: 'Vi åt en god middag tillsammans i går kväll.',
    isIrregular: true
  },
  {
    id: 'v-dricka',
    level: 'B',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: i → a → u)',
    infinitiv: 'att dricka',
    presens: 'dricker',
    preteritum: 'drack',
    supinum: 'har druckit',
    imperativ: 'drick!',
    meaningSv: 'Att inta vätska',
    translations: {
      ar: 'يشرب',
      fr: 'boire',
      it: "bere",
      en: 'to drink'
    },
    exampleSentence: 'Drick mycket vatten när det är varmt ute!',
    isIrregular: true
  },
  {
    id: 'v-ga',
    level: 'B',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Oregelbundet)',
    infinitiv: 'att gå',
    presens: 'går',
    preteritum: 'gick',
    supinum: 'har gått',
    imperativ: 'gå!',
    meaningSv: 'Att förflytta sig till fots eller fungera',
    translations: {
      ar: 'يمشي / يذهب',
      fr: 'marcher / aller',
      it: "camminare / andare a piedi",
      en: 'to walk / go'
    },
    exampleSentence: 'Varje morgon går jag till skolan.',
    isIrregular: true
  },
  {
    id: 'v-aka',
    level: 'B',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-te)',
    infinitiv: 'att åka',
    presens: 'åker',
    preteritum: 'åkte',
    supinum: 'har åkt',
    imperativ: 'åk!',
    meaningSv: 'Att resa med fordon (buss, tåg, bil)',
    translations: {
      ar: 'يركب / يسافر بوسيلة نقل',
      fr: 'aller en véhicule / voyager',
      it: "andare / viaggiare",
      en: 'to travel / ride / go by vehicle'
    },
    exampleSentence: 'Vi åker buss till centrum.'
  },
  {
    id: 'v-kunna',
    level: 'B',
    verbGroup: 'hjalpverb',
    groupName: 'Hjälpverb (Modalt)',
    infinitiv: 'att kunna',
    presens: 'kan',
    preteritum: 'kunde',
    supinum: 'har kunnat',
    imperativ: '-',
    meaningSv: 'Att ha förmåga eller möjlighet',
    translations: {
      ar: 'يستطيع / يمكنه',
      fr: 'pouvoir / savoir',
      it: "potere / essere capace",
      en: 'can / to be able to'
    },
    exampleSentence: 'Kan du hjälpa mig med den här uppgiften?'
  },
  {
    id: 'v-vilja',
    level: 'B',
    verbGroup: 'hjalpverb',
    groupName: 'Hjälpverb (Modalt)',
    infinitiv: 'att vilja',
    presens: 'vill',
    preteritum: 'ville',
    supinum: 'har velat',
    imperativ: '-',
    meaningSv: 'Att ha en önskan eller avsikt',
    translations: {
      ar: 'يريد / يرغب',
      fr: 'vouloir',
      it: "volere",
      en: 'to want'
    },
    exampleSentence: 'Jag vill studera på universitetet i framtiden.'
  },
  {
    id: 'v-masta',
    level: 'B',
    verbGroup: 'hjalpverb',
    groupName: 'Hjälpverb (Modalt)',
    infinitiv: 'att måste',
    presens: 'måste',
    preteritum: 'måste / var tvungen',
    supinum: 'har måst / har varit tvungen',
    imperativ: '-',
    meaningSv: 'Att vara nödsakad eller tvingad till något',
    translations: {
      ar: 'يجب / يلزم',
      fr: 'devoir / falloir',
      it: "dovere (obbligo)",
      en: 'must / have to'
    },
    exampleSentence: 'Du måste visa legitimation vid provet.'
  },

  // ===================== KURS C VERB =====================
  {
    id: 'v-soka',
    level: 'C',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-te)',
    infinitiv: 'att söka',
    presens: 'söker',
    preteritum: 'sökte',
    supinum: 'har sökt',
    imperativ: 'sök!',
    meaningSv: 'Att ansöka om jobb eller leta efter något',
    translations: {
      ar: 'يبحث / يتقدم بطلب وظيفة',
      fr: 'chercher / postuler',
      it: "cercare / fare domanda",
      en: 'to apply for / search'
    },
    exampleSentence: 'Fatima har sökt en ledig tjänst som undersköterska.'
  },
  {
    id: 'v-lara-sig',
    level: 'C',
    verbGroup: 'reflexiva',
    groupName: 'Reflexivt verb (-de)',
    infinitiv: 'att lära sig',
    presens: 'lär sig',
    preteritum: 'lärde sig',
    supinum: 'har lärt sig',
    imperativ: 'lär dig!',
    meaningSv: 'Att inhämta ny kunskap och färdighet',
    translations: {
      ar: 'يتعلم',
      fr: 'apprendre',
      it: "imparare",
      en: 'to learn'
    },
    exampleSentence: 'Vi lär oss nya verb och grammatikregler varje lektion.',
    isReflexive: true
  },
  {
    id: 'v-bestamma-sig',
    level: 'C',
    verbGroup: 'reflexiva',
    groupName: 'Reflexivt verb (-de)',
    infinitiv: 'att bestämma sig',
    presens: 'bestämmer sig',
    preteritum: 'bestämde sig',
    supinum: 'har bestämt sig',
    imperativ: 'bestäm dig!',
    meaningSv: 'Att fatta ett beslut',
    translations: {
      ar: 'يقرر / يعقد العزم',
      fr: 'décider / se décider',
      it: "decidersi",
      en: "to decide / make up one's mind"
    },
    exampleSentence: 'Han bestämde sig för att börja studera till elektriker.',
    isReflexive: true
  },
  {
    id: 'v-skynda-sig',
    level: 'C',
    verbGroup: 'reflexiva',
    groupName: 'Reflexivt verb (-ade)',
    infinitiv: 'att skynda sig',
    presens: 'skyndar sig',
    preteritum: 'skyndade sig',
    supinum: 'har skyndat sig',
    imperativ: 'skynda dig!',
    meaningSv: 'Att agera snabbt på grund av tidsbrist',
    translations: {
      ar: 'يستعجل / يسرع',
      fr: 'se dépêcher',
      it: "affrettarsi / sbrigarsi",
      en: 'to hurry up'
    },
    exampleSentence: 'Skynda dig, tåget avgår om fem minuter!',
    isReflexive: true
  },
  {
    id: 'v-tycka-om',
    level: 'C',
    verbGroup: 'grupp-2b',
    groupName: 'Partikelverb (-te)',
    infinitiv: 'att tycka om',
    presens: 'tycker om',
    preteritum: 'tyckte om',
    supinum: 'har tyckt om',
    imperativ: 'tyck om!',
    meaningSv: 'Att gilla och uppskatta något',
    translations: {
      ar: 'يحب / يعجبه',
      fr: 'aimer / apprécier',
      it: "piacere / amare",
      en: 'to like / enjoy'
    },
    exampleSentence: 'Jag tycker om att läsa böcker på svenska.',
    notes: 'Betona partikeln "OM" vid uttal.'
  },
  {
    id: 'v-kanna',
    level: 'C',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-de)',
    infinitiv: 'att känna',
    presens: 'känner',
    preteritum: 'kände',
    supinum: 'har känt',
    imperativ: 'känn!',
    meaningSv: 'Att uppleva med känsla eller känna en person',
    translations: {
      ar: 'يشعر / يعرف شخصاً',
      fr: 'sentir / connaître',
      it: "sentire / conoscere",
      en: 'to feel / know a person'
    },
    exampleSentence: 'Känner du dig redo inför anställningsintervjun?'
  },
  {
    id: 'v-forsta',
    level: 'C',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: å → o)',
    infinitiv: 'att förstå',
    presens: 'förstår',
    preteritum: 'förstod',
    supinum: 'har förstått',
    imperativ: 'förstå!',
    meaningSv: 'Att begripa och fatta innebörden av något',
    translations: {
      ar: 'يفهم / يستوعب',
      fr: 'comprendre',
      it: "capire / comprendere",
      en: 'to understand'
    },
    exampleSentence: 'Hon förstod instruktionerna på en gång.',
    isIrregular: true
  },
  {
    id: 'v-trana',
    level: 'C',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att träna',
    presens: 'tränar',
    preteritum: 'tränade',
    supinum: 'har tränat',
    imperativ: 'träna!',
    meaningSv: 'Att öva eller motionera regelbundet',
    translations: {
      ar: 'يتدرب / يمارس الرياضة',
      fr: "s'entraîner / pratiquer",
      it: "allenarsi / esercitarsi",
      en: 'to practice / train / work out'
    },
    exampleSentence: 'Vi tränar hörförståelse varje dag i Lunis.'
  },

  // ===================== KURS D VERB =====================
  {
    id: 'v-utveckla',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att utveckla',
    presens: 'utvecklar',
    preteritum: 'utvecklade',
    supinum: 'har utvecklat',
    imperativ: 'utveckla!',
    meaningSv: 'Att förbättra, föra framåt eller bygga ut',
    translations: {
      ar: 'يطور / ينمي',
      fr: 'développer / perfectionner',
      it: "sviluppare",
      en: 'to develop / enhance'
    },
    exampleSentence: 'Genom att läsa tidningar utvecklar du ett rikt ordförråd.'
  },
  {
    id: 'v-paverka',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att påverka',
    presens: 'påverkar',
    preteritum: 'påverkade',
    supinum: 'har påverkat',
    imperativ: 'påverka!',
    meaningSv: 'Att ha inflytande på ett resultat eller beslut',
    translations: {
      ar: 'يؤثر على',
      fr: 'influencer / impacter',
      it: "influenzare / incidere",
      en: 'to influence / affect'
    },
    exampleSentence: 'I en demokrati kan medborgarna påverka politiska beslut.'
  },
  {
    id: 'v-forklara',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att förklara',
    presens: 'förklarar',
    preteritum: 'förklarade',
    supinum: 'har förklarat',
    imperativ: 'förklara!',
    meaningSv: 'Att tydliggöra och redogöra för ett sammanhang',
    translations: {
      ar: 'يشرح / يوضح',
      fr: 'expliquer / éclaircir',
      it: "spiegare",
      en: 'to explain'
    },
    exampleSentence: 'Läraren förklarade varför BIFF-regeln gäller i bisatser.'
  },
  {
    id: 'v-beskriva',
    level: 'D',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: i → e)',
    infinitiv: 'att beskriva',
    presens: 'beskriver',
    preteritum: 'beskrev',
    supinum: 'har beskrivit',
    imperativ: 'beskriv!',
    meaningSv: 'Att skildra och måla upp med ord',
    translations: {
      ar: 'يصف',
      fr: 'décrire',
      it: "descrivere",
      en: 'to describe / depict'
    },
    exampleSentence: 'Beskriv för- och nackdelar med distansarbete i din uppsats.',
    isIrregular: true
  },
  {
    id: 'v-diskutera',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att diskutera',
    presens: 'diskuterar',
    preteritum: 'diskuterade',
    supinum: 'har diskuterat',
    imperativ: 'diskutera!',
    meaningSv: 'Att samtala och utbyta åsikter om en fråga',
    translations: {
      ar: 'يناقش / يتحاور',
      fr: 'discuter / débattre',
      it: "discutere",
      en: 'to discuss / debate'
    },
    exampleSentence: 'I dag diskuterade vi klimatfrågor och miljöpolitik i klassen.'
  },
  {
    id: 'v-valja',
    level: 'D',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (ä → a vokalväxling)',
    infinitiv: 'att välja',
    presens: 'väljer',
    preteritum: 'valde',
    supinum: 'har valt',
    imperativ: 'välj!',
    meaningSv: 'Att utse ett alternativ bland flera',
    translations: {
      ar: 'يختار / ينتخب',
      fr: 'choisir / élire',
      it: "scegliere",
      en: 'to choose / elect'
    },
    exampleSentence: 'Vart fjärde år väljer svenska folket sina representanter.'
  },

  // ===================== YRKES-SFI & SVA VERB =====================
  {
    id: 'v-dokumentera',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att dokumentera',
    presens: 'dokumenterar',
    preteritum: 'dokumenterade',
    supinum: 'har dokumenterat',
    imperativ: 'dokumentera!',
    meaningSv: 'Att föra skriftliga anteckningar och bevis i yrkesverksamhet',
    translations: {
      ar: 'يوثّق / يدون في سجل',
      fr: 'documenter / enregistrer',
      it: "documentare",
      en: 'to document / record'
    },
    exampleSentence: 'Sjuksköterskan dokumenterade patientens vitalparametrar i journalen.'
  },
  {
    id: 'v-bedomma',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-de)',
    infinitiv: 'att bedöma',
    presens: 'bedömer',
    preteritum: 'bedömde',
    supinum: 'har bedömt',
    imperativ: 'bedöm!',
    meaningSv: 'Att göra en professionell värdering eller analys',
    translations: {
      ar: 'يُقيّم / يُقدّر',
      fr: 'évaluer / juger',
      it: "valutare / giudicare",
      en: 'to assess / evaluate / judge'
    },
    exampleSentence: 'Läkaren bedömde att patienten inte behövde sjukhusvård.'
  },
  {
    id: 'v-samarbeta',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att samarbeta',
    presens: 'samarbetar',
    preteritum: 'samarbetade',
    supinum: 'har samarbetat',
    imperativ: 'samarbeta!',
    meaningSv: 'Att arbeta ihop mot ett gemensamt mål i team',
    translations: {
      ar: 'يتعاون / يعمل بشكل مشترك',
      fr: 'collaborer / coopérer',
      it: "collaborare",
      en: 'to collaborate / cooperate'
    },
    exampleSentence: 'För att lyckas i projektet måste vi samarbeta över avdelningsgränserna.'
  },
  {
    id: 'v-hantera',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade)',
    infinitiv: 'att hantera',
    presens: 'hanterar',
    preteritum: 'hanterade',
    supinum: 'har hanterat',
    imperativ: 'hantera!',
    meaningSv: 'Att sköta om, behandla eller lösa en svår situation/utrustning',
    translations: {
      ar: 'يتعامل مع / يدير',
      fr: 'gérer / manier',
      it: "gestire / trattare",
      en: 'to handle / manage / operate'
    },
    exampleSentence: 'Det är viktigt att veta hur man hanterar medicinteknisk utrustning säkert.'
  },
  {
    id: 'v-foresla',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: å → o)',
    infinitiv: 'att föreslå',
    presens: 'föreslår',
    preteritum: 'föreslog',
    supinum: 'har föreslagit',
    imperativ: 'föreslå!',
    meaningSv: 'Att lägga fram en idé eller rekommendation',
    translations: {
      ar: 'يقترح / يوصي',
      fr: 'proposer / suggérer',
      it: "proporre / suggerire",
      en: 'to suggest / propose'
    },
    exampleSentence: 'Arbetsgruppen föreslog flera konkreta åtgärder för att förbättra arbetsmiljön.',
    isIrregular: true
  },
  {
    id: 'v-genomfora',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-de)',
    infinitiv: 'att genomföra',
    presens: 'genomför',
    preteritum: 'genomförde',
    supinum: 'har genomfört',
    imperativ: 'genomför!',
    meaningSv: 'Att verkställa och slutföra en planerad uppgift',
    translations: {
      ar: 'ينفّذ / ينجز',
      fr: 'exécuter / réaliser',
      it: "realizzare / attuare",
      en: 'to implement / execute / carry out'
    },
    exampleSentence: 'Personalen genomförde säkerhetsrutinerna enligt gällande riktlinjer.'
  }
];
