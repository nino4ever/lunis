import { VerbConjugation, VerbGroup, GrammarLevel, TranslationLanguage } from '../types';

export const ALL_SWEDISH_VERBS: VerbConjugation[] = [
  // ==========================================
  // NIVÅ A - GRUNDLÄGGANDE VARDAGSVERB (CEFR A1)
  // ==========================================
  {
    id: 'va-vara',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt/Oregelbundet)',
    infinitiv: 'att vara',
    presens: 'är',
    preteritum: 'var',
    supinum: 'har varit',
    imperativ: 'var!',
    meaningSv: 'Att existera eller befinna sig i ett visst tillstånd/plats',
    translations: {
      ar: 'يكون / يوجد',
      fr: 'être',
      it: "essere",
      en: 'to be'
    },
    exampleSentence: 'Jag är student på sfi och jag var i skolan igår.',
    isIrregular: true
  },
  {
    id: 'va-ha',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt/Oregelbundet)',
    infinitiv: 'att ha',
    presens: 'har',
    preteritum: 'hade',
    supinum: 'har haft',
    imperativ: 'ha!',
    meaningSv: 'Att äga eller besitta något',
    translations: {
      ar: 'يملك / لديه',
      fr: 'avoir',
      it: "avere",
      en: 'to have'
    },
    exampleSentence: 'Familjen har en fin lägenhet i centrum.',
    isIrregular: true
  },
  {
    id: 'va-heta',
    level: 'A',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-er, -te)',
    infinitiv: 'att heta',
    presens: 'heter',
    preteritum: 'hette',
    supinum: 'har hetat',
    imperativ: 'het!',
    meaningSv: 'Att ha ett visst namn',
    translations: {
      ar: 'يُدعى / يُسمى',
      fr: "s'appeler",
      it: "chiamarsi",
      en: 'to be called / named'
    },
    exampleSentence: 'Vad heter du i efternamn?'
  },
  {
    id: 'va-bo',
    level: 'A',
    verbGroup: 'grupp-3',
    groupName: 'Grupp 3 (-r, -dde, -tt)',
    infinitiv: 'att bo',
    presens: 'bor',
    preteritum: 'bodde',
    supinum: 'har bott',
    imperativ: 'bo!',
    meaningSv: 'Att ha sin bostad eller sitt hem på en viss plats',
    translations: {
      ar: 'يسكن / يعيش',
      fr: 'habiter / vivre',
      it: "abitare / vivere",
      en: 'to live / reside'
    },
    exampleSentence: 'Sara bor i Göteborg sedan två år tillbaka.'
  },
  {
    id: 'va-komma',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: o → a)',
    infinitiv: 'att komma',
    presens: 'kommer',
    preteritum: 'kom',
    supinum: 'har kommit',
    imperativ: 'kom!',
    meaningSv: 'Att förflytta sig till talarens plats eller anlända',
    translations: {
      ar: 'يأتي / يصل',
      fr: 'venir / arriver',
      it: "venire / arrivare",
      en: 'to come / arrive'
    },
    exampleSentence: 'Bussen kommer klockan åtta varje morgon.',
    isIrregular: true
  },
  {
    id: 'va-ata',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: ä → åt)',
    infinitiv: 'att äta',
    presens: 'äter',
    preteritum: 'åt',
    supinum: 'har ätit',
    imperativ: 'ät!',
    meaningSv: 'Att inta fast föda',
    translations: {
      ar: 'يأكل',
      fr: 'manger',
      it: "mangiare",
      en: 'to eat'
    },
    exampleSentence: 'Vi äter middag klockan sex på kvällen.',
    isIrregular: true
  },
  {
    id: 'va-dricka',
    level: 'A',
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
    exampleSentence: 'I Sverige dricker man mycket kaffe under fikapausen.',
    isIrregular: true
  },
  {
    id: 'va-tala',
    level: 'A',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att tala',
    presens: 'talar',
    preteritum: 'talade',
    supinum: 'har talat',
    imperativ: 'tala!',
    meaningSv: 'Att yttra ord och kommunicera med rösten',
    translations: {
      ar: 'يتحدث / يتكلم',
      fr: 'parler',
      it: "parlare",
      en: 'to speak / talk'
    },
    exampleSentence: 'Han talar tre språk flytande.'
  },
  {
    id: 'va-arbeta',
    level: 'A',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att arbeta',
    presens: 'arbetar',
    preteritum: 'arbetade',
    supinum: 'har arbetat',
    imperativ: 'arbeta!',
    meaningSv: 'Att utföra ett jobb eller syssla',
    translations: {
      ar: 'يعمل / يشتغل',
      fr: 'travailler',
      it: "lavorare",
      en: 'to work'
    },
    exampleSentence: 'Maria arbetar som undersköterska på sjukhuset.'
  },
  {
    id: 'va-sova',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: o → o/e)',
    infinitiv: 'att sova',
    presens: 'sover',
    preteritum: 'sov',
    supinum: 'har sovit',
    imperativ: 'sov!',
    meaningSv: 'Att vila kroppen i sömn',
    translations: {
      ar: 'ينام',
      fr: 'dormir',
      it: "dormire",
      en: 'to sleep'
    },
    exampleSentence: 'Barnen sover åtta timmar varje natt.',
    isIrregular: true
  },
  {
    id: 'va-ga',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: å → i)',
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
    exampleSentence: 'Hon går till skolan varje måndag.',
    isIrregular: true
  },
  {
    id: 'va-se',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: e → å)',
    infinitiv: 'att se',
    presens: 'ser',
    preteritum: 'såg',
    supinum: 'har sett',
    imperativ: 'se!',
    meaningSv: 'Att uppfatta med synen',
    translations: {
      ar: 'يرى / يشاهد',
      fr: 'voir / regarder',
      it: "vedere / guardare",
      en: 'to see / look'
    },
    exampleSentence: 'Jag såg en mycket bra svensk film igår.',
    isIrregular: true
  },
  {
    id: 'va-skriva',
    level: 'A',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: i → e)',
    infinitiv: 'att skriva',
    presens: 'skriver',
    preteritum: 'skrev',
    supinum: 'har skrivit',
    imperativ: 'skriv!',
    meaningSv: 'Att forma bokstäver och text med penna eller tangentbord',
    translations: {
      ar: 'يكتب',
      fr: 'écrire',
      it: "scrivere",
      en: 'to write'
    },
    exampleSentence: 'Eleverna skriver en uppsats om sitt hemland.',
    isIrregular: true
  },
  {
    id: 'va-lasa',
    level: 'A',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-er, -te)',
    infinitiv: 'att läsa',
    presens: 'läser',
    preteritum: 'läste',
    supinum: 'har läst',
    imperativ: 'läs!',
    meaningSv: 'Att tolka skriven text eller studera',
    translations: {
      ar: 'يقرأ / يدرس',
      fr: 'lire / étudier',
      it: "leggere",
      en: 'to read / study'
    },
    exampleSentence: 'Läraren läser en spännande bok högt för klassen.'
  },
  {
    id: 'va-kopa',
    level: 'A',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-er, -te)',
    infinitiv: 'att köpa',
    presens: 'köper',
    preteritum: 'köpte',
    supinum: 'har köpt',
    imperativ: 'köp!',
    meaningSv: 'Att skaffa sig varor mot betalning',
    translations: {
      ar: 'يشتري',
      fr: 'acheter',
      it: "comprare / acquistare",
      en: 'to buy / purchase'
    },
    exampleSentence: 'Jag köper mjölk, bröd och ägg i affären.'
  },
  {
    id: 'va-lyssna',
    level: 'A',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att lyssna',
    presens: 'lyssnar',
    preteritum: 'lyssnade',
    supinum: 'har lyssnat',
    imperativ: 'lyssna!',
    meaningSv: 'Att aktivt höra och rikta uppmärksamheten mot ljud/tal',
    translations: {
      ar: 'يستمع / يصغي',
      fr: 'écouter',
      it: "ascoltare",
      en: 'to listen'
    },
    exampleSentence: 'Lyssna noga på lärarens instruktioner!'
  },

  // ==========================================
  // NIVÅ B - HUVUDSATSER & VARDAGSAKTIVITETER (CEFR A2)
  // ==========================================
  {
    id: 'vb-ringa',
    level: 'B',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att ringa',
    presens: 'ringer',
    preteritum: 'ringde',
    supinum: 'har ringt',
    imperativ: 'ring!',
    meaningSv: 'Att kontakta någon via telefon eller avge en signal',
    translations: {
      ar: 'يتصل بالهاتف',
      fr: 'appeler / téléphoner',
      it: "chiamare / telefonare",
      en: 'to call / phone'
    },
    exampleSentence: 'Jag ringde vårdcentralen imorse för att boka en tid.'
  },
  {
    id: 'vb-cykla',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att cykla',
    presens: 'cyklar',
    preteritum: 'cyklade',
    supinum: 'har cyklat',
    imperativ: 'cykla!',
    meaningSv: 'Att åka på en cykel',
    translations: {
      ar: 'يركب الدراجة',
      fr: 'faire du vélo / pédaler',
      it: "andare in bicicletta",
      en: 'to ride a bike / cycle'
    },
    exampleSentence: 'I Sverige cyklar många människor till jobbet även på vintern.'
  },
  {
    id: 'vb-resa',
    level: 'B',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-er, -te)',
    infinitiv: 'att resa',
    presens: 'reser',
    preteritum: 'reste',
    supinum: 'har rest',
    imperativ: 'res!',
    meaningSv: 'Att åka till en annan stad eller ett annat land',
    translations: {
      ar: 'يسافر / يرتحل',
      fr: 'voyager / partir',
      it: "viaggiare",
      en: 'to travel / journey'
    },
    exampleSentence: 'Familjen reste till norra Sverige under sportlovet.'
  },
  {
    id: 'vb-traffa',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att träffa',
    presens: 'träffar',
    preteritum: 'träffade',
    supinum: 'har träffat',
    imperativ: 'träffa!',
    meaningSv: 'Att möta en person eller umgås',
    translations: {
      ar: 'يلتقي / يقابل',
      fr: 'rencontrer / voir',
      it: "incontrare",
      en: 'to meet / see someone'
    },
    exampleSentence: 'I helgen träffade jag mina vänner på ett café i stan.'
  },
  {
    id: 'vb-beratta',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att berätta',
    presens: 'berättar',
    preteritum: 'berättade',
    supinum: 'har berättat',
    imperativ: 'berätta!',
    meaningSv: 'Att med ord förmedla en händelse eller historia',
    translations: {
      ar: 'يخبر / يحكي',
      fr: 'raconter / narrer',
      it: "raccontare",
      en: 'to tell / narrate'
    },
    exampleSentence: 'Farfar berättade en rolig historia från sin ungdom.'
  },
  {
    id: 'vb-fraga',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att fråga',
    presens: 'frågar',
    preteritum: 'frågade',
    supinum: 'har frågat',
    imperativ: 'fråga!',
    meaningSv: 'Att ställa en fråga för att få information',
    translations: {
      ar: 'يسأل / يستفسر',
      fr: 'demander / poser une question',
      it: "chiedere / domandare",
      en: 'to ask / inquire'
    },
    exampleSentence: 'Om du inte förstår ordet kan du alltid fråga läraren.'
  },
  {
    id: 'vb-svara',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att svara',
    presens: 'svarar',
    preteritum: 'svarade',
    supinum: 'har svarat',
    imperativ: 'svara!',
    meaningSv: 'Att ge respons på en fråga eller i telefon',
    translations: {
      ar: 'يجيب / يرد',
      fr: 'répondre',
      it: "rispondere",
      en: 'to answer / reply'
    },
    exampleSentence: 'Han svarade snabbt på mitt mejl.'
  },
  {
    id: 'vb-stanga',
    level: 'B',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att stänga',
    presens: 'stänger',
    preteritum: 'stängde',
    supinum: 'har stängt',
    imperativ: 'stäng!',
    meaningSv: 'Att föra ihop dörr/fönster så att det blir tillslutet',
    translations: {
      ar: 'يغلق / يقفل',
      fr: 'fermer',
      it: "chiudere",
      en: 'to close / shut'
    },
    exampleSentence: 'Glöm inte att stänga fönstret innan du går ut.'
  },
  {
    id: 'vb-oppna',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att öppna',
    presens: 'öppnar',
    preteritum: 'öppnade',
    supinum: 'har öppnat',
    imperativ: 'öppna!',
    meaningSv: 'Att göra något tillgängligt eller inte längre stängt',
    translations: {
      ar: 'يفتح',
      fr: 'ouvrir',
      it: "aprire",
      en: 'to open'
    },
    exampleSentence: 'Affären öppnar klockan nio på morgonen.'
  },
  {
    id: 'vb-hjalpa',
    level: 'B',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-er, -te)',
    infinitiv: 'att hjälpa',
    presens: 'hjälper',
    preteritum: 'hjälpte',
    supinum: 'har hjälpt',
    imperativ: 'hjälp!',
    meaningSv: 'Att ge stöd eller bistå någon med en uppgift',
    translations: {
      ar: 'يساعد / يعاون',
      fr: 'aider / secourir',
      it: "aiutare",
      en: 'to help / assist'
    },
    exampleSentence: 'Kan du hjälpa mig att bära de tunga matkassarna?'
  },
  {
    id: 'vb-tycka',
    level: 'B',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-er, -te)',
    infinitiv: 'att tycka',
    presens: 'tycker',
    preteritum: 'tyckte',
    supinum: 'har tyckt',
    imperativ: 'tyck!',
    meaningSv: 'Att ha en personlig åsikt eller smak',
    translations: {
      ar: 'يعتقد / يرى (رأي شخصي)',
      fr: 'penser / estimer (avis personnel)',
      it: "pensare / ritenere",
      en: 'to think / have an opinion'
    },
    exampleSentence: 'Jag tycker att svenska är ett vackert språk.'
  },
  {
    id: 'vb-tanka',
    level: 'B',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-er, -te)',
    infinitiv: 'att tänka',
    presens: 'tänker',
    preteritum: 'tänkte',
    supinum: 'har tänkt',
    imperativ: 'tänk!',
    meaningSv: 'Att använda förståndet, reflektera eller planera att göra något',
    translations: {
      ar: 'يفكر / ينوي',
      fr: 'penser / avoir l’intention de',
      it: "pensare / riflettere",
      en: 'to think / intend to'
    },
    exampleSentence: 'Jag tänker söka ett jobb på äldreboendet till våren.'
  },
  {
    id: 'vb-glomma',
    level: 'B',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att glömma',
    presens: 'glömmer',
    preteritum: 'glömde',
    supinum: 'har glömt',
    imperativ: 'glöm!',
    meaningSv: 'Att inte komma ihåg något',
    translations: {
      ar: 'ينسى',
      fr: 'oublier',
      it: "dimenticare",
      en: 'to forget'
    },
    exampleSentence: 'Han glömde sina nycklar hemma på köksbordet.'
  },
  {
    id: 'vb-baka',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att baka',
    presens: 'bakar',
    preteritum: 'bakade',
    supinum: 'har bakat',
    imperativ: 'baka!',
    meaningSv: 'Att tillaga bröd eller bullar i ugn',
    translations: {
      ar: 'يخبز',
      fr: 'cuire au four / faire de la pâtisserie',
      it: "cuocere al forno / fare dolci",
      en: 'to bake'
    },
    exampleSentence: 'Vi bakade kanelbullar tillsammans i söndags.'
  },
  {
    id: 'vb-sta',
    level: 'B',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: å → o)',
    infinitiv: 'att stå',
    presens: 'står',
    preteritum: 'stod',
    supinum: 'har stått',
    imperativ: 'stå!',
    meaningSv: 'Att befinna sig upprätt på fötterna',
    translations: {
      ar: 'يقف / ينتصب',
      fr: 'être debout / se tenir',
      it: "stare in piedi",
      en: 'to stand'
    },
    exampleSentence: 'Många resenärer stod och väntade på perrongen.',
    isIrregular: true
  },
  {
    id: 'vb-sitta',
    level: 'B',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: i → a → u)',
    infinitiv: 'att sitta',
    presens: 'sitter',
    preteritum: 'satt',
    supinum: 'har suttit',
    imperativ: 'sitt!',
    meaningSv: 'Att vila på en stol eller soffa med böjda ben',
    translations: {
      ar: 'يجلس',
      fr: 'être assis / s’asseoir',
      it: "stare seduto / sedersi",
      en: 'to sit'
    },
    exampleSentence: 'Eleverna sitter i en cirkel och diskuterar nyheterna.',
    isIrregular: true
  },
  {
    id: 'vb-ligga',
    level: 'B',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: i → å → a)',
    infinitiv: 'att ligga',
    presens: 'ligger',
    preteritum: 'låg',
    supinum: 'har legat',
    imperativ: 'ligg!',
    meaningSv: 'Att vila i horisontellt läge eller befinna sig geografiskt',
    translations: {
      ar: 'يستلقي / يقع (جغرافياً)',
      fr: 'être couché / être situé',
      it: "stare sdraiato / trovarsi",
      en: 'to lie down / be situated'
    },
    exampleSentence: 'Stockholm ligger vid Östersjön.',
    isIrregular: true
  },

  // ==========================================
  // NIVÅ C - V2, PERFEKT, PARTIKELVERB & REFLEXIVA (CEFR B1)
  // ==========================================
  {
    id: 'vc-studera',
    level: 'C',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att studera',
    presens: 'studerar',
    preteritum: 'studerade',
    supinum: 'har studerat',
    imperativ: 'studera!',
    meaningSv: 'Att inhämta kunskap systematiskt på skola eller universitet',
    translations: {
      ar: 'يدرس / يتعلّم أكاديمياً',
      fr: 'étudier / faire des études',
      it: "studiare",
      en: 'to study / learn academic subject'
    },
    exampleSentence: 'Igår studerade eleverna grammatik i fyra timmar på biblioteket.'
  },
  {
    id: 'vc-bestamma',
    level: 'C',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att bestämma',
    presens: 'bestämmer',
    preteritum: 'bestämde',
    supinum: 'har bestämt',
    imperativ: 'bestäm!',
    meaningSv: 'Att fatta ett beslut eller fastställa regler',
    translations: {
      ar: 'يقرر / يحدد',
      fr: 'décider / déterminer',
      it: "decidere",
      en: 'to decide / determine'
    },
    exampleSentence: 'Vi bestämde att vi ska åka på semester tillsammans i juli.'
  },
  {
    id: 'vc-forsta',
    level: 'C',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: å → o)',
    infinitiv: 'att förstå',
    presens: 'förstår',
    preteritum: 'förstod',
    supinum: 'har förstått',
    imperativ: 'förstå!',
    meaningSv: 'Att begripa innebörden av något',
    translations: {
      ar: 'يفهم / يستوعب',
      fr: 'comprendre / saisir',
      it: "capire / comprendere",
      en: 'to understand / comprehend'
    },
    exampleSentence: 'Efter lärarens förklaring förstod alla grammatikregeln.',
    isIrregular: true
  },
  {
    id: 'vc-forklara',
    level: 'C',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att förklara',
    presens: 'förklarar',
    preteritum: 'förklarade',
    supinum: 'har förklarat',
    imperativ: 'förklara!',
    meaningSv: 'Att göra något tydligt och begripligt för andra',
    translations: {
      ar: 'يشرح / يوضح',
      fr: 'expliquer / éclaircir',
      it: "spiegare",
      en: 'to explain / clarify'
    },
    exampleSentence: 'Läkaren förklarade provsvaren lugnt och tydligt.'
  },
  {
    id: 'vc-borja',
    level: 'C',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att börja',
    presens: 'börjar',
    preteritum: 'började',
    supinum: 'har börjat',
    imperativ: 'börja!',
    meaningSv: 'Att starta eller sätta igång en aktivitet',
    translations: {
      ar: 'يبدأ / يشرع',
      fr: 'commencer / débuter',
      it: "iniziare / cominciare",
      en: 'to begin / start'
    },
    exampleSentence: 'Lektionen börjar exakt klockan kvart över åtta.'
  },
  {
    id: 'vc-sluta',
    level: 'C',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att sluta',
    presens: 'slutar',
    preteritum: 'slutade',
    supinum: 'har slutat',
    imperativ: 'sluta!',
    meaningSv: 'Att upphöra med något eller avsluta',
    translations: {
      ar: 'ينتهي / يتوقف عن',
      fr: 'finir / arrêter / terminer',
      it: "finire / smettere",
      en: 'to stop / end / finish'
    },
    exampleSentence: 'Han slutade röka för två år sedan för hälsans skull.'
  },
  {
    id: 'vc-fortsatta',
    level: 'C',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: a → a/o)',
    infinitiv: 'att fortsätta',
    presens: 'fortsätter',
    preteritum: 'fortsatte',
    supinum: 'har fortsatt',
    imperativ: 'fortsätt!',
    meaningSv: 'Att inte avbryta utan gå vidare med en handling',
    translations: {
      ar: 'يستمر / يواصل',
      fr: 'continuer / poursuivre',
      it: "continuare",
      en: 'to continue / proceed'
    },
    exampleSentence: 'Trots regnet fortsatte vi vår promenad i skogen.',
    isIrregular: true
  },
  {
    id: 'vc-lara-sig',
    level: 'C',
    verbGroup: 'reflexiva',
    groupName: 'Reflexivt verb (sig)',
    infinitiv: 'att lära sig',
    presens: 'lär sig',
    preteritum: 'lärde sig',
    supinum: 'har lärt sig',
    imperativ: 'lär dig!',
    meaningSv: 'Att tillägna sig nya färdigheter eller kunskaper',
    translations: {
      ar: 'يتعلم',
      fr: 'apprendre',
      it: "imparare",
      en: 'to learn / acquire skill'
    },
    exampleSentence: 'Man lär sig språket snabbare om man pratar varje dag.',
    isReflexive: true
  },
  {
    id: 'vc-skynda-sig',
    level: 'C',
    verbGroup: 'reflexiva',
    groupName: 'Reflexivt verb (sig)',
    infinitiv: 'att skynda sig',
    presens: 'skyndar sig',
    preteritum: 'skyndade sig',
    supinum: 'har skyndat sig',
    imperativ: 'skynda dig!',
    meaningSv: 'Att öka tempot för att inte komma för sent',
    translations: {
      ar: 'يستعجل / يسرع',
      fr: 'se dépêcher / se hâter',
      it: "affrettarsi / sbrigarsi",
      en: 'to hurry up / rush'
    },
    exampleSentence: 'Vi måste skynda oss så att vi inte missar tåget!',
    isReflexive: true
  },
  {
    id: 'vc-kanna-sig',
    level: 'C',
    verbGroup: 'reflexiva',
    groupName: 'Reflexivt verb (sig)',
    infinitiv: 'att känna sig',
    presens: 'känner sig',
    preteritum: 'kände sig',
    supinum: 'har känt sig',
    imperativ: 'känn dig!',
    meaningSv: 'Att uppleva ett visst inre tillstånd (pigg, sjuk, glad)',
    translations: {
      ar: 'يشعر / يحس بنفسه',
      fr: 'se sentir (état)',
      it: "sentirsi",
      en: 'to feel (oneself)'
    },
    exampleSentence: 'Idag känner jag mig mycket piggare än igår.',
    isReflexive: true
  },
  {
    id: 'vc-tycka-om',
    level: 'C',
    verbGroup: 'grupp-2b',
    groupName: 'Partikelverb (Grupp 2b)',
    infinitiv: 'att tycka om',
    presens: 'tycker om',
    preteritum: 'tyckte om',
    supinum: 'har tyckt om',
    imperativ: 'tyck om!',
    meaningSv: 'Att gilla och uppskatta någon eller något',
    translations: {
      ar: 'يحب / يعجبه',
      fr: 'aimer / apprécier',
      it: "piacere / amare",
      en: 'to like / enjoy'
    },
    exampleSentence: 'Jag tycker om att promenera vid havet på sommaren.'
  },
  {
    id: 'vc-halsa-pa',
    level: 'C',
    verbGroup: 'grupp-1',
    groupName: 'Partikelverb (Grupp 1)',
    infinitiv: 'att hälsa på',
    presens: 'hälsar på',
    preteritum: 'hälsade på',
    supinum: 'har hälsat på',
    imperativ: 'hälsa på!',
    meaningSv: 'Att besöka vänner eller släktingar',
    translations: {
      ar: 'يزور شخصاً',
      fr: 'rendre visite à / visiter',
      it: "fare visita / salutare",
      en: 'to visit someone'
    },
    exampleSentence: 'I helgen ska vi hälsa på mina kusiner i Uppsala.'
  },
  {
    id: 'vc-ge-upp',
    level: 'C',
    verbGroup: 'grupp-4',
    groupName: 'Partikelverb (Starkt: ge)',
    infinitiv: 'att ge upp',
    presens: 'ger upp',
    preteritum: 'gav upp',
    supinum: 'har gett upp',
    imperativ: 'ge upp!',
    meaningSv: 'Att kapitulera eller sluta kämpa',
    translations: {
      ar: 'يستسلم / ييأس',
      fr: 'abandonner / capituler',
      it: "arrendersi / rinunciare",
      en: 'to give up / surrender'
    },
    exampleSentence: 'Ge aldrig upp dina drömmar även om det känns svårt!',
    isIrregular: true
  },
  {
    id: 'vc-sakna',
    level: 'C',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att sakna',
    presens: 'saknar',
    preteritum: 'saknade',
    supinum: 'har saknat',
    imperativ: 'sakna!',
    meaningSv: 'Att känna tomhet efter någon som inte är närvarande',
    translations: {
      ar: 'يشتاق إلى / يفتقد',
      fr: 'regretter / manquer de',
      it: "mancare / sentire la mancanza",
      en: 'to miss someone / lack'
    },
    exampleSentence: 'Hon saknar sin familj i hemlandet väldigt mycket.'
  },
  {
    id: 'vc-lova',
    level: 'C',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att lova',
    presens: 'lovar',
    preteritum: 'lovade',
    supinum: 'har lovat',
    imperativ: 'lova!',
    meaningSv: 'Att ge ett bindande löfte',
    translations: {
      ar: 'يعد / يتعهد',
      fr: 'promettre',
      it: "promettere",
      en: 'to promise'
    },
    exampleSentence: 'Han lovade att komma i tid till morgondagens möte.'
  },
  {
    id: 'vc-valja',
    level: 'C',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (Oregelbunden stam: ä → a)',
    infinitiv: 'att välja',
    presens: 'väljer',
    preteritum: 'valde',
    supinum: 'har valt',
    imperativ: 'välj!',
    meaningSv: 'Att utse ett alternativ bland flera möjligheter',
    translations: {
      ar: 'يختار / ينتخب',
      fr: 'choisir / élire',
      it: "scegliere",
      en: 'to choose / select'
    },
    exampleSentence: 'Vilket yrkesprogram ska du välja på gymnasiet?',
    isIrregular: true
  },
  {
    id: 'vc-anvanda',
    level: 'C',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att använda',
    presens: 'använder',
    preteritum: 'använde',
    supinum: 'har använt',
    imperativ: 'använd!',
    meaningSv: 'Att nyttja ett verktyg eller en metod',
    translations: {
      ar: 'يستخدم / يستعمل',
      fr: 'utiliser / employer',
      it: "usare / utilizzare",
      en: 'to use / utilize'
    },
    exampleSentence: 'I dagens lektion använde vi en digital ordbok för att slå upp nya ord.'
  },
  {
    id: 'vc-soka',
    level: 'C',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-er, -te)',
    infinitiv: 'att söka',
    presens: 'söker',
    preteritum: 'sökte',
    supinum: 'har sökt',
    imperativ: 'sök!',
    meaningSv: 'Att leta efter information eller ansöka om jobb/skola',
    translations: {
      ar: 'يبحث عن / يتقدم بطلب عمل',
      fr: 'chercher / postuler',
      it: "cercare / fare domanda",
      en: 'to search / apply for a job'
    },
    exampleSentence: 'Ali sökte fem olika jobb inom lager och logistik förra veckan.'
  },

  // ==========================================
  // NIVÅ D - BISATSER, PASSIV FORM & SAMHÄLLE (CEFR B2)
  // ==========================================
  {
    id: 'vd-diskutera',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att diskutera',
    presens: 'diskuterar',
    preteritum: 'diskuterade',
    supinum: 'har diskuterat',
    imperativ: 'diskutera!',
    meaningSv: 'Att samtala och utbyta olika åsikter om en fråga',
    translations: {
      ar: 'يناقش / يبحث موضوعاً',
      fr: 'discuter / débattre',
      it: "discutere",
      en: 'to discuss / debate'
    },
    exampleSentence: 'I klassrummet diskuterade vi hur miljön bäst kan skyddas i framtiden.'
  },
  {
    id: 'vd-paverka',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att påverka',
    presens: 'påverkar',
    preteritum: 'påverkade',
    supinum: 'har påverkat',
    imperativ: 'påverka!',
    meaningSv: 'Att utöva inflytande och förändra utgången av något',
    translations: {
      ar: 'يؤثر على / يتحكم في مجرى',
      fr: 'influencer / affecter / peser sur',
      it: "influenzare / incidere",
      en: 'to influence / affect'
    },
    exampleSentence: 'Klimatförändringarna påverkar jordbruket i hela världen.'
  },
  {
    id: 'vd-forandra',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att förändra',
    presens: 'förändrar',
    preteritum: 'förändrade',
    supinum: 'har förändrat',
    imperativ: 'förändra!',
    meaningSv: 'Att göra något annorlunda än det var tidigare',
    translations: {
      ar: 'يغير / يُحدث تحولاً',
      fr: 'changer / transformer / modifier',
      it: "cambiare / modificare",
      en: 'to change / transform'
    },
    exampleSentence: 'Ny digital teknik har förändrat sättet vi kommunicerar på.'
  },
  {
    id: 'vd-utveckla',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att utveckla',
    presens: 'utvecklar',
    preteritum: 'utvecklade',
    supinum: 'har utvecklat',
    imperativ: 'utveckla!',
    meaningSv: 'Att föra något framåt till ett högre eller bättre stadium',
    translations: {
      ar: 'يطور / ينمّي',
      fr: 'développer / perfectionner',
      it: "sviluppare",
      en: 'to develop / cultivate'
    },
    exampleSentence: 'Företaget utvecklar moderna och miljövänliga transportlösningar.'
  },
  {
    id: 'vd-undersoka',
    level: 'D',
    verbGroup: 'grupp-2b',
    groupName: 'Grupp 2b (-er, -te)',
    infinitiv: 'att undersöka',
    presens: 'undersöker',
    preteritum: 'undersökte',
    supinum: 'har undersökt',
    imperativ: 'undersök!',
    meaningSv: 'Att noggrant granska en patient eller forska kring ett problem',
    translations: {
      ar: 'يفحص طبياً / يحقق في',
      fr: 'examiner / enquêter / ausculter',
      it: "esaminare / indagare",
      en: 'to examine / investigate'
    },
    exampleSentence: 'Läkaren undersökte patientens hals och lyssnade på lungorna.'
  },
  {
    id: 'vd-jamfora',
    level: 'D',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att jämföra',
    presens: 'jämför',
    preteritum: 'jämförde',
    supinum: 'har jämfört',
    imperativ: 'jämför!',
    meaningSv: 'Att ställa två företeelser mot varandra för att se likheter och skillnader',
    translations: {
      ar: 'يقارن بين',
      fr: 'comparer',
      it: "confrontare / paragonare",
      en: 'to compare'
    },
    exampleSentence: 'Om man jämför hyrorna i Stockholm och Malmö är skillnaden märkbar.'
  },
  {
    id: 'vd-rekommendera',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att rekommendera',
    presens: 'rekommenderar',
    preteritum: 'rekommenderade',
    supinum: 'har rekommenderat',
    imperativ: 'rekommendera!',
    meaningSv: 'Att ge råd om något som anses fördelaktigt',
    translations: {
      ar: 'يوصي بـ / ينصح بـ',
      fr: 'recommander / conseiller',
      it: "raccomandare / consigliare",
      en: 'to recommend / advise'
    },
    exampleSentence: 'Folkhälsomyndigheten rekommenderar regelbunden fysisk aktivitet.'
  },
  {
    id: 'vd-delta',
    level: 'D',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: ta)',
    infinitiv: 'att delta',
    presens: 'deltar',
    preteritum: 'deltog',
    supinum: 'har deltagit',
    imperativ: 'delta!',
    meaningSv: 'Att vara med och medverka i en aktivitet/möte',
    translations: {
      ar: 'يشارك في / يحضر',
      fr: 'participer / assister à',
      it: "partecipare",
      en: 'to participate / take part'
    },
    exampleSentence: 'Alla elever i klassen deltog aktivt i seminariet om arbetsmarknaden.',
    isIrregular: true
  },
  {
    id: 'vd-informera',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att informera',
    presens: 'informerar',
    preteritum: 'informerade',
    supinum: 'har informerat',
    imperativ: 'informera!',
    meaningSv: 'Att delge sakliga fakta och upplysningar',
    translations: {
      ar: 'يُبلغ / يُعلم / يقدّم معلومات',
      fr: 'informer / renseigner',
      it: "informare",
      en: 'to inform / notify'
    },
    exampleSentence: 'Chefen informerade medarbetarna om de nya säkerhetsrutinerna.'
  },
  {
    id: 'vd-orsaka',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att orsaka',
    presens: 'orsakar',
    preteritum: 'orsakade',
    supinum: 'har orsakat',
    imperativ: 'orsaka!',
    meaningSv: 'Att vara den bakomliggande anledningen till en händelse',
    translations: {
      ar: 'يسبب / يؤدي إلى',
      fr: 'causer / provoquer / engendrer',
      it: "causare / provocare",
      en: 'to cause / provoke'
    },
    exampleSentence: 'Snöovädret orsakade stora förseningar i kollektivtrafiken.'
  },
  {
    id: 'vd-bekrafta',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att bekräfta',
    presens: 'bekräftar',
    preteritum: 'bekräftade',
    supinum: 'har bekräftat',
    imperativ: 'bekräfta!',
    meaningSv: 'Att intyga riktigheten eller godkänna ett meddelande',
    translations: {
      ar: 'يؤكد / يثبت صحة',
      fr: 'confirmer / valider / attester',
      it: "confermare",
      en: 'to confirm / verify'
    },
    exampleSentence: 'Skolan bekräftade mottagandet av min ansökan via e-post.'
  },
  {
    id: 'vd-forhandla',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att förhandla',
    presens: 'förhandlar',
    preteritum: 'förhandlade',
    supinum: 'har förhandlat',
    imperativ: 'förhandla!',
    meaningSv: 'Att överlägga och diskutera villkor för att nå en överenskommelse',
    translations: {
      ar: 'يتفاوض / يساوم',
      fr: 'négocier / parlementer',
      it: "negoziare / trattare",
      en: 'to negotiate / bargain'
    },
    exampleSentence: 'Facket och arbetsgivaren förhandlar om nya löneavtal.'
  },

  // ==========================================
  // NIVÅ YRKE & SVA - PROFESSIONELLT & FORMELT (CEFR B2/C1)
  // ==========================================
  {
    id: 'vy-dokumentera',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att dokumentera',
    presens: 'dokumenterar',
    preteritum: 'dokumenterade',
    supinum: 'har dokumenterat',
    imperativ: 'dokumentera!',
    meaningSv: 'Att systematiskt föra skriftliga anteckningar och bevis i yrkesverksamhet',
    translations: {
      ar: 'يوثّق / يدون في سجل رسمي',
      fr: 'documenter / enregistrer dans le dossier',
      it: "documentare",
      en: 'to document / record'
    },
    exampleSentence: 'Undersköterskan dokumenterar patientens blodtryck och puls i journalsystemet.'
  },
  {
    id: 'vy-bedomma',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att bedöma',
    presens: 'bedömer',
    preteritum: 'bedömde',
    supinum: 'har bedömt',
    imperativ: 'bedöm!',
    meaningSv: 'Att göra en sakkunnig och professionell värdering av en situation',
    translations: {
      ar: 'يُقيّم / يُقدّر مهنياً',
      fr: 'évaluer / estimer / juger',
      it: "valutare / giudicare",
      en: 'to assess / evaluate / judge'
    },
    exampleSentence: 'Läkaren bedömde att patienten inte behövde akut sjukhusvård.'
  },
  {
    id: 'vy-samarbeta',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att samarbeta',
    presens: 'samarbetar',
    preteritum: 'samarbetade',
    supinum: 'har samarbetat',
    imperativ: 'samarbeta!',
    meaningSv: 'Att arbeta tillsammans mot ett gemensamt professionellt mål',
    translations: {
      ar: 'يتعاون / يعمل كفريق',
      fr: 'collaborer / travailler en équipe',
      it: "collaborare",
      en: 'to collaborate / cooperate'
    },
    exampleSentence: 'För att ge god vård måste läkare, sjuksköterskor och fysioterapeuter samarbeta.'
  },
  {
    id: 'vy-hantera',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att hantera',
    presens: 'hanterar',
    preteritum: 'hanterade',
    supinum: 'har hanterat',
    imperativ: 'hantera!',
    meaningSv: 'Att sköta om, manövrera verktyg eller bemöta konflikter på arbetsplatsen',
    translations: {
      ar: 'يتعامل مع / يدير وضعاً',
      fr: 'gérer / manier / faire face à',
      it: "gestire / trattare",
      en: 'to handle / manage / operate'
    },
    exampleSentence: 'Personalen är utbildad för att hantera akuta stressituationer på ett säkert sätt.'
  },
  {
    id: 'vy-genomfora',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att genomföra',
    presens: 'genomför',
    preteritum: 'genomförde',
    supinum: 'har genomfört',
    imperativ: 'genomför!',
    meaningSv: 'Att verkställa och fullfölja en planerad aktivitet',
    translations: {
      ar: 'يُنفّذ / يُجري بنجاح',
      fr: 'réaliser / exécuter / accomplir',
      it: "realizzare / attuare",
      en: 'to implement / execute / carry out'
    },
    exampleSentence: 'Teamet genomförde säkerhetskontrollen enligt fastställda kvalitetskrav.'
  },
  {
    id: 'vy-foresla',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-4',
    groupName: 'Grupp 4 (Starkt: å → o)',
    infinitiv: 'att föreslå',
    presens: 'föreslår',
    preteritum: 'föreslog',
    supinum: 'har föreslagit',
    imperativ: 'föreslå!',
    meaningSv: 'Att lägga fram ett förslag eller en rekommendation för gruppen',
    translations: {
      ar: 'يقترح / يطرح فكرة',
      fr: 'proposer / soumettre une idée',
      it: "proporre / suggerire",
      en: 'to suggest / propose'
    },
    exampleSentence: 'Projektledaren föreslog flera förbättringar i arbetsprocessen.',
    isIrregular: true
  },
  {
    id: 'vy-analysera',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att analysera',
    presens: 'analyserar',
    preteritum: 'analyserade',
    supinum: 'har analyserat',
    imperativ: 'analysera!',
    meaningSv: 'Att noggrant undersöka beståndsdelar och dra slutsatser',
    translations: {
      ar: 'يحلل بدقة',
      fr: 'analyser / décortiquer',
      it: "analizzare",
      en: 'to analyze / examine in detail'
    },
    exampleSentence: 'Vi måste analysera resultaten från den senaste undersökningen.'
  },
  {
    id: 'vy-reflektera',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att reflektera',
    presens: 'reflekterar',
    preteritum: 'reflekterade',
    supinum: 'har reflekterat',
    imperativ: 'reflektera!',
    meaningSv: 'Att tänka djupt och eftertänksamt kring egna erfarenheter och arbetssätt',
    translations: {
      ar: 'يتأمل / يراجع نفسه تفكيراً',
      fr: 'réfléchir / méditer',
      it: "riflettere",
      en: 'to reflect on / contemplate'
    },
    exampleSentence: 'Pedagogen reflekterade över hur undervisningen kunde anpassas bättre.'
  },
  {
    id: 'vy-delegera',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att delegera',
    presens: 'delegerar',
    preteritum: 'delegerade',
    supinum: 'har delegerat',
    imperativ: 'delegera!',
    meaningSv: 'Att överlåta arbetsuppgifter och befogenheter till en kollega',
    translations: {
      ar: 'يفوّض / يكلّف بمهمة',
      fr: 'déléguer',
      it: "delegare",
      en: 'to delegate'
    },
    exampleSentence: 'Sjuksköterskan delegerade medicinutdelningen till undersköterskan.'
  },
  {
    id: 'vy-handleda',
    level: 'Yrke-SVA',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att handleda',
    presens: 'handleder',
    preteritum: 'handledde',
    supinum: 'har handlett',
    imperativ: 'handled!',
    meaningSv: 'Att vägleda, instruera och stötta en student eller nyanställd',
    translations: {
      ar: 'يُرشد / يُشرف على تدريب',
      fr: 'tutorer / encadrer / superviser',
      it: "fare da tutor / guidare",
      en: 'to supervise / tutor / guide'
    },
    exampleSentence: 'En erfaren kollega handleder praktikanten under hela introduktionsperioden.'
  },

  // ==========================================
  // MODALA HJÄLPVERB (NIVÅ B & C)
  // ==========================================
  {
    id: 'vm-kunna',
    level: 'B',
    verbGroup: 'hjalpverb',
    groupName: 'Hjälpverb (Modalverb)',
    infinitiv: 'att kunna',
    presens: 'kan',
    preteritum: 'kunde',
    supinum: 'har kunnat',
    imperativ: 'kunna!',
    meaningSv: 'Att ha förmåga eller möjlighet att göra något',
    translations: {
      ar: 'يستطيع / يقدر على',
      fr: 'pouvoir / savoir faire',
      it: "potere / essere capace",
      en: 'can / to be able to'
    },
    exampleSentence: 'Jag kan tala lite svenska och jag vill lära mig mer.'
  },
  {
    id: 'vm-vilja',
    level: 'B',
    verbGroup: 'hjalpverb',
    groupName: 'Hjälpverb (Modalverb)',
    infinitiv: 'att vilja',
    presens: 'vill',
    preteritum: 'ville',
    supinum: 'har velat',
    imperativ: 'vilja!',
    meaningSv: 'Att önska eller ha för avsikt',
    translations: {
      ar: 'يريد / يرغب في',
      fr: 'vouloir',
      it: "volere",
      en: 'to want'
    },
    exampleSentence: 'Vi vill resa till fjällen i norra Sverige under sportlovet.'
  },
  {
    id: 'vm-skola',
    level: 'B',
    verbGroup: 'hjalpverb',
    groupName: 'Hjälpverb (Framtid & Tvång)',
    infinitiv: 'att skola',
    presens: 'ska / skall',
    preteritum: 'skulle',
    supinum: 'har skolat',
    imperativ: 'skola!',
    meaningSv: 'Att uttrycka framtid eller avsikt/uppmaning',
    translations: {
      ar: 'سوف / يجب أن',
      fr: 'devoir / futur (va faire)',
      it: "dovere (futuro) / andare a",
      en: 'shall / will / going to'
    },
    exampleSentence: 'Imorgon ska vi ha prov i skolan på kapitel tre.'
  },
  {
    id: 'vm-maste',
    level: 'B',
    verbGroup: 'hjalpverb',
    groupName: 'Hjälpverb (Nödvändighet)',
    infinitiv: 'att måste',
    presens: 'måste',
    preteritum: 'måste',
    supinum: 'har måst',
    imperativ: 'måste!',
    meaningSv: 'Att vara tvungen och nödsakad att göra något',
    translations: {
      ar: 'يجب / يلزم / مضطر',
      fr: 'devoir / être obligé de',
      it: "dovere (obbligo)",
      en: 'must / have to'
    },
    exampleSentence: 'Du måste passa tiden och komma i tid till jobbet varje dag.'
  },
  {
    id: 'vm-fa',
    level: 'B',
    verbGroup: 'hjalpverb',
    groupName: 'Hjälpverb (Tillåtelse & Erhålla)',
    infinitiv: 'att få',
    presens: 'får',
    preteritum: 'fick',
    supinum: 'har fått',
    imperativ: 'få!',
    meaningSv: 'Att ha tillåtelse att göra något eller att erhålla en sak',
    translations: {
      ar: 'يُسمح له / يحصل على',
      fr: 'avoir la permission / recevoir',
      it: "potere (permesso) / ricevere",
      en: 'may / to be allowed / to receive'
    },
    exampleSentence: 'Får man parkera bilen här utan tillstånd?',
    isIrregular: true
  },
  {
    id: 'vm-bruka',
    level: 'B',
    verbGroup: 'hjalpverb',
    groupName: 'Hjälpverb (Vana)',
    infinitiv: 'att bruka',
    presens: 'brukar',
    preteritum: 'brukade',
    supinum: 'har brukat',
    imperativ: 'bruka!',
    meaningSv: 'Att ha för vana att göra något regelbundet',
    translations: {
      ar: 'يعتاد على / عادةً ما يفعل',
      fr: 'avoir l’habitude de',
      it: "essere soliti / fare di solito",
      en: 'usually do / to be used to'
    },
    exampleSentence: 'Jag brukar ta en promenad efter middagen på kvällen.'
  },
  {
    id: 'vm-behova',
    level: 'B',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att behöva',
    presens: 'behöver',
    preteritum: 'behövde',
    supinum: 'har behövt',
    imperativ: 'behöv!',
    meaningSv: 'Att vara i behov av något eller behöva utföra en handling',
    translations: {
      ar: 'يحتاج إلى / يلزم',
      fr: 'avoir besoin de / nécessiter',
      it: "aver bisogno di / dovere",
      en: 'to need / require'
    },
    exampleSentence: 'Behöver du hjälp med att fylla i blanketten?'
  },

  // ==========================================
  // FLER VIKTIGA VERB (NIVÅ B, C, D)
  // ==========================================
  {
    id: 'vb-stada',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att städa',
    presens: 'städar',
    preteritum: 'städade',
    supinum: 'har städat',
    imperativ: 'städa!',
    meaningSv: 'Att göra rent och ordna i ett rum eller hus',
    translations: {
      ar: 'ينظف / يرتب المكان',
      fr: 'nettoyer / faire le ménage',
      it: "pulire / riordinare",
      en: 'to clean / tidy up'
    },
    exampleSentence: 'Vi städar alltid lägenheten på lördagsförmiddagen.'
  },
  {
    id: 'vb-tvatta',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att tvätta',
    presens: 'tvättar',
    preteritum: 'tvättade',
    supinum: 'har tvättat',
    imperativ: 'tvätta!',
    meaningSv: 'Att rengöra kläder eller kroppen med vatten och tvål',
    translations: {
      ar: 'يغسل الملابس / يغتسل',
      fr: 'laver / faire la lessive',
      it: "lavare",
      en: 'to wash / do laundry'
    },
    exampleSentence: 'Jag har bokat tvättstugan och ska tvätta kläder ikväll.'
  },
  {
    id: 'vb-laga',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att laga',
    presens: 'lagar',
    preteritum: 'lagade',
    supinum: 'har lagat',
    imperativ: 'laga!',
    meaningSv: 'Att tillreda mat eller reparera något trasigt',
    translations: {
      ar: 'يطبخ الطعام / يُصلح',
      fr: 'cuisiner / réparer',
      it: "riparare / cucinare",
      en: 'to cook (food) / repair'
    },
    exampleSentence: 'Ahmad lagar god traditionell mat till hela familjen.'
  },
  {
    id: 'vb-kora',
    level: 'B',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att köra',
    presens: 'kör',
    preteritum: 'körde',
    supinum: 'har kört',
    imperativ: 'kör!',
    meaningSv: 'Att styra och framföra ett fordon (bil, buss)',
    translations: {
      ar: 'يقود السيارة',
      fr: 'conduire / rouler',
      it: "guidare",
      en: 'to drive'
    },
    exampleSentence: 'Hon övningskör med sin körlärare inför uppkörningen.'
  },
  {
    id: 'vb-betala',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att betala',
    presens: 'betalar',
    preteritum: 'betalade',
    supinum: 'har betalat',
    imperativ: 'betala!',
    meaningSv: 'Att erlägga pengar för en vara, tjänst eller räkning',
    translations: {
      ar: 'يدفع المال / يسدد',
      fr: 'payer / régler',
      it: "pagare",
      en: 'to pay'
    },
    exampleSentence: 'I Sverige betalar man ofta med Swish eller betalkort.'
  },
  {
    id: 'vb-kosta',
    level: 'B',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att kosta',
    presens: 'kostar',
    preteritum: 'kostade',
    supinum: 'har kostat',
    imperativ: 'kosta!',
    meaningSv: 'Att ha ett visst pris',
    translations: {
      ar: 'يكلف / سعره',
      fr: 'coûter',
      it: "costare",
      en: 'to cost'
    },
    exampleSentence: 'Hur mycket kostar månadskortet för lokaltrafiken?'
  },
  {
    id: 'vc-bestalla',
    level: 'C',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att beställa',
    presens: 'beställer',
    preteritum: 'beställde',
    supinum: 'har beställt',
    imperativ: 'beställ!',
    meaningSv: 'Att be om att få köpa en vara eller reservera bord/tid',
    translations: {
      ar: 'يطلب / يحجز',
      fr: 'commander / réserver',
      it: "ordinare / prenotare",
      en: 'to order / book'
    },
    exampleSentence: 'Vi beställde mat online som levererades direkt till dörren.'
  },
  {
    id: 'vc-forbereda',
    level: 'C',
    verbGroup: 'grupp-2a',
    groupName: 'Grupp 2a (-er, -de)',
    infinitiv: 'att förbereda',
    presens: 'förbereder',
    preteritum: 'förberedde',
    supinum: 'har förberett',
    imperativ: 'förbered!',
    meaningSv: 'Att göra i ordning allt som behövs inför en händelse',
    translations: {
      ar: 'يُجهّز / يُعدّ مسبقاً',
      fr: 'préparer',
      it: "preparare",
      en: 'to prepare'
    },
    exampleSentence: 'Läraren förberedde lektionsmaterialet noggrant.'
  },
  {
    id: 'vc-lyckas',
    level: 'C',
    verbGroup: 'grupp-1',
    groupName: 'Deponensverb (-s ändelse)',
    infinitiv: 'att lyckas',
    presens: 'lyckas',
    preteritum: 'lyckades',
    supinum: 'har lyckats',
    imperativ: 'lyckas!',
    meaningSv: 'Att nå ett framgångsrikt resultat med en uppgift',
    translations: {
      ar: 'ينجح في / يفلح',
      fr: 'réussir / parvenir à',
      it: "riuscire / avere successo",
      en: 'to succeed / manage to'
    },
    exampleSentence: 'Hon lyckades få godkänt på det nationella provet i sfi Kurs D.'
  },
  {
    id: 'vc-halla-med',
    level: 'C',
    verbGroup: 'grupp-4',
    groupName: 'Partikelverb (Starkt: hålla)',
    infinitiv: 'att hålla med',
    presens: 'håller med',
    preteritum: 'höll med',
    supinum: 'har hållit med',
    imperativ: 'håll med!',
    meaningSv: 'Att dela samma åsikt med någon annan',
    translations: {
      ar: 'يتفق مع / يوافق الرأي',
      fr: 'être d’accord avec',
      it: "essere d'accordo",
      en: 'to agree with someone'
    },
    exampleSentence: 'Jag håller helt med om att språkträning på arbetsplatsen är viktig.',
    isIrregular: true
  },
  {
    id: 'vc-komma-ihog',
    level: 'C',
    verbGroup: 'grupp-4',
    groupName: 'Partikelverb (Starkt: komma)',
    infinitiv: 'att komma ihåg',
    presens: 'kommer ihåg',
    preteritum: 'kom ihåg',
    supinum: 'har kommit ihåg',
    imperativ: 'kom ihåg!',
    meaningSv: 'Att minnas och bevara i minnet',
    translations: {
      ar: 'يتذكر / يستحضر في الذاكرة',
      fr: 'se souvenir de / se rappeler',
      it: "ricordare",
      en: 'to remember / recall'
    },
    exampleSentence: 'Kom ihåg att stänga av spisen innan du lämnar lägenheten!',
    isIrregular: true
  },
  {
    id: 'vc-ta-hand-om',
    level: 'C',
    verbGroup: 'grupp-4',
    groupName: 'Partikelverb (Starkt: ta)',
    infinitiv: 'att ta hand om',
    presens: 'tar hand om',
    preteritum: 'tog hand om',
    supinum: 'har tagit hand om',
    imperativ: 'ta hand om!',
    meaningSv: 'Att vårda, passa eller ansvara för någon/något',
    translations: {
      ar: 'يعتني بـ / يهتم بـ',
      fr: 'prendre soin de / s’occuper de',
      it: "prendersi cura di",
      en: 'to take care of / look after'
    },
    exampleSentence: 'Sjuksköterskan tar hand om de äldre patienterna med stor omsorg.',
    isIrregular: true
  },
  {
    id: 'vc-satta-sig',
    level: 'C',
    verbGroup: 'reflexiva',
    groupName: 'Reflexivt verb (sätta sig)',
    infinitiv: 'att sätta sig',
    presens: 'sätter sig',
    preteritum: 'satte sig',
    supinum: 'har satt sig',
    imperativ: 'sätt dig!',
    meaningSv: 'Att inta sittande ställning',
    translations: {
      ar: 'يجلس / يتخذ وضعية الجلوس',
      fr: 's’asseoir',
      it: "sedersi",
      en: 'to sit down'
    },
    exampleSentence: 'Varsågod och sätt dig i väntrummet så kommer doktorn snart.',
    isReflexive: true,
    isIrregular: true
  },
  {
    id: 'vc-stiga-upp',
    level: 'C',
    verbGroup: 'grupp-4',
    groupName: 'Partikelverb (Starkt: stiga)',
    infinitiv: 'att stiga upp',
    presens: 'stiger upp',
    preteritum: 'steg upp',
    supinum: 'har stigit upp',
    imperativ: 'stig upp!',
    meaningSv: 'Att gå ur sängen på morgonen',
    translations: {
      ar: 'ينهض من الفراش',
      fr: 'se lever (du lit)',
      it: "alzarsi",
      en: 'to get up (from bed)'
    },
    exampleSentence: 'Ahmad stiger upp klockan sex varje vardagsmorgon.',
    isIrregular: true
  },
  {
    id: 'vd-argumentera',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att argumentera',
    presens: 'argumenterar',
    preteritum: 'argumenterade',
    supinum: 'har argumenterat',
    imperativ: 'argumentera!',
    meaningSv: 'Att anföra skäl och bevis för sin ståndpunkt i tal eller skrift',
    translations: {
      ar: 'يقدم حججاً وبراهين / يُجادل بمنطق',
      fr: 'argumenter / plaider',
      it: "argomentare / sostenere",
      en: 'to argue / make points logically'
    },
    exampleSentence: 'I debattartikeln argumenterade författaren för bättre villkor inom vården.'
  },
  {
    id: 'vd-sammanfatta',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att sammanfatta',
    presens: 'sammanfattar',
    preteritum: 'sammanfattade',
    supinum: 'har sammanfattat',
    imperativ: 'sammanfatta!',
    meaningSv: 'Att kortfattat återge huvuddragen i en längre text eller diskussion',
    translations: {
      ar: 'يُلخّص / يوجز',
      fr: 'résumer / synthétiser',
      it: "riassumere",
      en: 'to summarize / synthesize'
    },
    exampleSentence: 'Kan du sammanfatta textens viktigaste poänger med egna ord?'
  },
  {
    id: 'vd-granska',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att granska',
    presens: 'granskar',
    preteritum: 'granskade',
    supinum: 'har granskat',
    imperativ: 'granska!',
    meaningSv: 'Att kritiskt syna och kontrollera källor, dokument eller fakta',
    translations: {
      ar: 'يدقق نقدياً / يفحص بموضوعية',
      fr: 'scruter / examiner d’un œil critique / vérifier',
      it: "esaminare / revisionare",
      en: 'to scrutinize / review critically / audit'
    },
    exampleSentence: 'Det är avgörande att källkritiskt granska information på internet.'
  },
  {
    id: 'vd-prioritera',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att prioritera',
    presens: 'prioriterar',
    preteritum: 'prioriterade',
    supinum: 'har prioriterat',
    imperativ: 'prioritera!',
    meaningSv: 'Att sätta det viktigaste främst och välja vad som ska göras först',
    translations: {
      ar: 'يُعطي الأولوية لـ',
      fr: 'prioriser / donner la priorité',
      it: "dare la priorità / prioritizzare",
      en: 'to prioritize'
    },
    exampleSentence: 'När man har mycket att göra på jobbet måste man kunna prioritera sina uppgifter.'
  },
  {
    id: 'vd-kommunicera',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att kommunicera',
    presens: 'kommunicerar',
    preteritum: 'kommunicerade',
    supinum: 'har kommunicerat',
    imperativ: 'kommunicera!',
    meaningSv: 'Att utbyta information och förståelse mellan människor',
    translations: {
      ar: 'يتواصل / ينقل معلومات',
      fr: 'communiquer',
      it: "comunicare",
      en: 'to communicate'
    },
    exampleSentence: 'Att kunna kommunicera tydligt i tal och skrift öppnar dörrar på arbetsmarknaden.'
  },
  {
    id: 'vd-tillampa',
    level: 'D',
    verbGroup: 'grupp-1',
    groupName: 'Grupp 1 (-ar, -ade, -at)',
    infinitiv: 'att tillämpa',
    presens: 'tillämpar',
    preteritum: 'tillämpade',
    supinum: 'har tillämpat',
    imperativ: 'tillämpa!',
    meaningSv: 'Att omsätta teoretiska regler eller kunskaper i praktisk handling',
    translations: {
      ar: 'يُطبّق عملياً / يُنفذ قاعدة',
      fr: 'appliquer / mettre en pratique',
      it: "applicare / mettere in pratica",
      en: 'to apply / implement rules'
    },
    exampleSentence: 'Eleverna lärde sig regeln och tillämpade den direkt i skrivuppgiften.'
  }
];

// Helper to filter verbs
export function filterVerbs(
  verbs: VerbConjugation[],
  options: {
    query?: string;
    level?: GrammarLevel | 'all';
    verbGroup?: VerbGroup | 'all';
    firstLetter?: string;
    preferredLang?: TranslationLanguage;
  }
): VerbConjugation[] {
  const { query = '', level = 'all', verbGroup = 'all', firstLetter = '', preferredLang = 'en' } = options;
  const q = query.trim().toLowerCase();

  return verbs.filter((v) => {
    // Level match
    if (level !== 'all' && v.level !== level) {
      return false;
    }

    // Group match
    if (verbGroup !== 'all' && v.verbGroup !== verbGroup) {
      return false;
    }

    // Letter match
    if (firstLetter) {
      const cleanInf = v.infinitiv.replace(/^att\s+/, '').trim().toLowerCase();
      if (!cleanInf.startsWith(firstLetter.toLowerCase())) {
        return false;
      }
    }

    // Text query
    if (q) {
      const matchesInf = v.infinitiv.toLowerCase().includes(q);
      const matchesPres = v.presens.toLowerCase().includes(q);
      const matchesPret = v.preteritum.toLowerCase().includes(q);
      const matchesSup = v.supinum.toLowerCase().includes(q);
      const matchesMeaning = v.meaningSv.toLowerCase().includes(q);
      const matchesTrans = v.translations[preferredLang]?.toLowerCase().includes(q);
      const matchesEn = v.translations.en?.toLowerCase().includes(q);
      const matchesFr = v.translations.fr?.toLowerCase().includes(q);
      const matchesAr = v.translations.ar?.toLowerCase().includes(q);

      return matchesInf || matchesPres || matchesPret || matchesSup || matchesMeaning || matchesTrans || matchesEn || matchesFr || matchesAr;
    }

    return true;
  });
}
