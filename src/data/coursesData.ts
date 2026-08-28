import { Course, StudentAssignment, StudentSubmission } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'sfi-a',
    code: 'SFI A',
    title: 'SFI Kurs A - Alfabet, Ljud & Enkla Fraser',
    level: 'Kurs A (Nybörjare)',
    description: 'Börja från grunden med svenska alfabetet, personliga pronomen, presentation och enkla vardagsord.',
    color: '#059669', // Emerald
    targetAudience: 'För nybörjare utan tidigare förkunskaper i svenska språket.',
    totalLessons: 10,
    chapters: [
      {
        id: 'a1',
        number: 1,
        title: 'Bokstäver, siffror och enkla fraser',
        theme: 'Introduktion till svenska',
        iconName: 'Sparkles',
        level: 'A',
        completedCount: 2,
        totalCount: 3,
        lessons: [
          {
            id: 'a1-l1',
            title: 'Hälsa och presentera sig',
            subtitle: 'Att säga hej, fråga vad någon heter och var man bor',
            readingText: {
              title: 'Hej! Vad heter du?',
              paragraphs: [
                'Hej! Jag heter Ahmad. Jag kommer från Syrien. Nu bor jag i Malmö och studerar svenska på sfi.',
                'Ahmad har en vän som heter Fatima. De dricker kaffe och pratar svenska tillsammans varje dag.'
              ],
              audioDurationSec: 30,
              vocabularyIds: ['w1', 'w10']
            },
            grammarFocus: {
              ruleTitle: 'Rak ordföljd i presens: Subjekt + Verb',
              ruleSummary: 'I en enkel påståendesats kommer subjektet (vem som gör något) först och verbet (handlingen) på plats 2.',
              examples: [
                { swedish: 'Jag heter Ahmad.', note: 'Jag (S) + heter (V)' },
                { swedish: 'Fatima dricker kaffe.', note: 'Fatima (S) + dricker (V)' },
                { swedish: 'Vi bor i Sverige.', note: 'Vi (S) + bor (V)' }
              ]
            },
            exercises: [
              {
                id: 'ex-a1-1',
                type: 'multiple_choice',
                prompt: 'Vad gör Ahmad och Fatima varje dag?',
                options: [
                  'De dricker kaffe och pratar svenska.',
                  'De åker till sjukhuset med buss.',
                  'De köper en ny bil.',
                  'De sover hela dagen.'
                ],
                correctIndex: 0,
                explanation: 'I texten står det: "De dricker kaffe och pratar svenska tillsammans varje dag."'
              },
              {
                id: 'ex-a1-2',
                type: 'fill_blank',
                sentenceWithBlank: 'Ahmad ___ (bo) i Malmö.',
                correctAnswers: ['bor'],
                hint: 'Presensform av verbet "bo".',
                explanation: 'Presens av "bo" är "bor" för alla personer: Jag bor, han bor, vi bor.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sfi-c',
    code: 'SFI C',
    title: 'SFI Kurs C - Vardag, Arbete & Samhälle',
    level: 'Kurs C (Studieväg 2 & 3)',
    description: 'Utveckla ditt ordförråd, din hör- och läsförståelse och skrivförmåga för arbetsliv och svenskt vardagsliv.',
    color: '#007079', // Lunis Liber Teal
    targetAudience: 'Studerande som vill fördjupa sina språkkunskaper inför arbete eller vidare studier.',
    totalLessons: 18,
    chapters: [
      {
        id: 'c1',
        number: 1,
        title: 'Arbetsliv och att söka jobb i Sverige',
        theme: 'Arbete & Karriär',
        iconName: 'Briefcase',
        level: 'C',
        completedCount: 3,
        totalCount: 4,
        lessons: [
          {
            id: 'c1-l1',
            title: 'Text: Fatimas väg till drömjobbet',
            subtitle: 'Läsförståelse och ordkunskap kring anställning och CV',
            readingText: {
              title: 'Fatima söker arbete som undersköterska',
              paragraphs: [
                'Fatima flyttade till Sverige för tre år sedan. I sitt hemland arbetade hon på sjukhus, och nu vill hon fortsätta arbeta inom svensk sjukvård. Förra veckan såg hon en ledig tjänst som undersköterska på en vårdcentral i Malmö.',
                'Hon satte sig vid datorn och uppdaterade sitt CV och sitt personliga brev. I brevet berättade hon om sin tidigare erfarenhet, sin språkutveckling i svenska och varför hon trivs med att hjälpa äldre och sjuka människor.',
                'Efter två dagar ringde enhetschefen och bjöd in Fatima till en anställningsintervju. Fatima kände sig lite nervös men också mycket glad och förberedd inför mötet.'
              ],
              audioDurationSec: 65,
              vocabularyIds: ['w1', 'w2', 'w8', 'w10']
            },
            grammarFocus: {
              ruleTitle: 'Ordföljd i huvudsats: V2-regeln (Verbet på andra plats)',
              ruleSummary: 'I en svensk påståendesats står det finita verbet alltid på position 2. Om du börjar meningen med tid eller plats (fundament), kommer verbet ändå direkt efter!',
              examples: [
                { swedish: 'Fatima (S) söker (V) arbete nu.', note: 'Rak ordföljd: Subjekt först, verb på plats 2.' },
                { swedish: 'I går (Tid) sökte (V) Fatima (S) arbete.', note: 'Omvänd ordföljd: Tidsadverbial först, verb fortfarande på plats 2!' },
                { swedish: 'På sjukhuset (Plats) arbetar (V) hon (S).', note: 'Platsadverbial först, verbet på plats 2.' }
              ]
            },
            exercises: [
              {
                id: 'ex-c1-1',
                type: 'multiple_choice',
                prompt: 'Varför ringde enhetschefen till Fatima?',
                options: [
                  'För att berätta att hon måste skriva ett nytt CV.',
                  'För att bjuda in henne till en anställningsintervju.',
                  'För att erbjuda henne en utbildning på universitetet.',
                  'För att fråga om hennes personnummer.'
                ],
                correctIndex: 1,
                explanation: 'I texten står det: "Efter två dagar ringde enhetschefen och bjöd in Fatima till en anställningsintervju."'
              },
              {
                id: 'ex-c1-2',
                type: 'fill_blank',
                sentenceWithBlank: 'I morgon ___ (gå) Fatima på sin anställningsintervju.',
                correctAnswers: ['går'],
                hint: 'Presensform av verbet "gå". Kom ihåg V2-regeln!',
                explanation: 'Eftersom meningen börjar med "I morgon" (tid), ska verbet "går" stå på andra plats.'
              },
              {
                id: 'ex-c1-3',
                type: 'matching',
                prompt: 'Koppla ihop det svenska ordet med rätt förklaring:',
                pairs: [
                  { swedish: 'Anställningsintervju', translation: 'Möte och samtal om ett jobb' },
                  { swedish: 'Vårdcentral', translation: 'Mottagning för sjukvård' },
                  { swedish: 'Personligt brev', translation: 'Brev där du beskriver dig själv' },
                  { swedish: 'Arbetsplats', translation: 'Platsen där du jobbar' }
                ]
              },
              {
                id: 'ex-c1-4',
                type: 'speech_pronunciation',
                prompt: 'Öva ditt uttal! Lyssna på meningen och spela in när du läser upp den klart och tydligt:',
                phraseToSpeak: 'Jag söker en tillsvidareanställning på en trevlig arbetsplats.',
                phoneticHint: '[ja:g sö:ker en tills-vi:dare-an-ställning...]',
                targetTranslation: 'I am applying for a permanent job at a pleasant workplace.'
              }
            ]
          },
          {
            id: 'c1-l2',
            title: 'Hörförståelse: På anställningsintervjun',
            subtitle: 'Lyssna på dialogen mellan arbetsgivaren och den sökande',
            exercises: [
              {
                id: 'ex-c1-l2-1',
                type: 'listening_comprehension',
                prompt: 'Lyssna på dialogen och svara: Vilka arbetstider gäller för den utlysta tjänsten?',
                audioScript: 'Hej och välkommen! Kul att du kunde komma. Tjänsten är på heltid, och du kommer att arbeta måndag till fredag mellan klockan sju och sexton.',
                options: [
                  'Deltid på helger och kvällar.',
                  'Heltid måndag till fredag klockan 07:00–16:00.',
                  'Nattpass tre dagar i veckan.',
                  'Endast extrajobb vid behov.'
                ],
                correctIndex: 1,
                explanation: 'Arbetsgivaren förklarar: "Tjänsten är på heltid, måndag till fredag mellan sju och sexton."'
              },
              {
                id: 'ex-c1-l2-2',
                type: 'fill_blank',
                sentenceWithBlank: 'Hon har ___ (arbeta) som undersköterska i fem år tidigare.',
                correctAnswers: ['arbetat', 'jobbat'],
                hint: 'Supinumform efter "har" (perfekt tempus).',
                explanation: 'Formen "har arbetat" eller "har jobbat" uttrycker supinum / fullbordad handling.'
              },
              {
                id: 'ex-c1-l2-3',
                type: 'writing',
                prompt: 'Skriv ett kort personligt brev där du presenterar dig själv för en arbetsgivare.',
                guidingQuestions: [
                  'Vad heter du och var bor du?',
                  'Vilka erfarenheter och utbildningar har du?',
                  'Varför vill du arbeta på just detta företag?',
                  'Hur är du som kollega och person?'
                ],
                minWords: 35,
                sampleAnswer: 'Hej! Jag heter Alex och söker tjänsten hos er. Jag har tre års erfarenhet av service och tycker om att samarbeta i team. På min fritid studerar jag svenska och lär mig snabbt nya system. Med vänliga hälsningar, Alex.'
              }
            ]
          }
        ]
      },
      {
        id: 'c2',
        number: 2,
        title: 'Svensk sjukvård och hälsa',
        theme: 'Hälsa & Vård',
        iconName: 'HeartPulse',
        level: 'C',
        completedCount: 2,
        totalCount: 3,
        lessons: [
          {
            id: 'c2-l1',
            title: 'Att boka tid och beskriva symtom',
            subtitle: 'Dialoger hos vårdcentralen och 1177 Vårdguiden',
            readingText: {
              title: 'Hassan ringer 1177',
              paragraphs: [
                'Hassan vaknade på morgonen med hög feber och hosta. Han bestämde sig för att ringa 1177 för att få medicinsk rådgivning från en sjuksköterska.',
                'Sjuksköterskan ställde frågor om hur länge febern pågått och om han har svårt att andas. Hon rådde Hassan att vila, dricka mycket vatten och ta febernedsättande medicin.',
                'Om symtomen blir värre rekommenderade hon honom att boka ett akutbesök på vårdcentralen.'
              ],
              audioDurationSec: 50,
              vocabularyIds: ['w3', 'w8']
            },
            exercises: [
              {
                id: 'ex-c2-1',
                type: 'multiple_choice',
                prompt: 'Vilket råd gav sjuksköterskan till Hassan i första hand?',
                options: [
                  'Att åka direkt till akuten med ambulans.',
                  'Att vila, dricka rikligt med vatten och ta febernedsättande.',
                  'Att gå till jobbet som vanligt.',
                  'Att sluta ta mediciner.'
                ],
                correctIndex: 1,
                explanation: 'Sjuksköterskan rådde honom att vila, dricka vatten och ta febernedsättande medicin.'
              }
            ]
          }
        ]
      },
      {
        id: 'c3',
        number: 3,
        title: 'Bostad, ekonomi och vardagsliv',
        theme: 'Vardagsliv',
        iconName: 'Home',
        level: 'C',
        completedCount: 1,
        totalCount: 3,
        lessons: [
          {
            id: 'c3-l1',
            title: 'Hyresrätt, bostadsrätt och hushållsbudget',
            subtitle: 'Att förstå avtal och boenderegler i Sverige',
            exercises: [
              {
                id: 'ex-c3-1',
                type: 'multiple_choice',
                prompt: 'Vad ingår oftast i månadshyran för en hyresrätt?',
                options: [
                  'Endast internet och streamingtjänster.',
                  'Värme och vatten, samt fastighetsskötsel.',
                  'Möbler och personlig mat.',
                  'Bensin och garageplats gratis.'
                ],
                correctIndex: 1,
                explanation: 'I en svensk hyresrätt ingår normalt uppvärmning, varmvatten och fastighetsunderhåll i hyran.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sfi-b',
    code: 'SFI B',
    title: 'SFI Kurs B - Familj, Bostad & Vardag',
    level: 'Kurs B',
    description: 'Bygg grundläggande meningar, lär dig enkla dialoger och ställ frågor om vardagssituationer.',
    color: '#0284c7', // Sky Blue
    targetAudience: 'För dig som har grunderna och vill öva på att prata, läsa och skriva enkel svenska.',
    totalLessons: 12,
    chapters: [
      {
        id: 'b1',
        number: 1,
        title: 'Presentera dig och din familj',
        theme: 'Familj & Personligt',
        iconName: 'Users',
        level: 'B',
        completedCount: 2,
        totalCount: 2,
        lessons: [
          {
            id: 'b1-l1',
            title: 'Min familj och min vardag',
            subtitle: 'Enkla meningar om släktingar, fritid och intressen',
            readingText: {
              title: 'Sara berättar om sin familj',
              paragraphs: [
                'Hej! Jag heter Sara och jag är 28 år gammal. Jag bor i en lägenhet i Göteborg tillsammans med min man Ali och vår son Leo.',
                'På vardagarna studerar jag svenska på sfi och min man arbetar som kock. På helgerna brukar vi promenera i parken och laga god mat tillsammans.'
              ],
              audioDurationSec: 40,
              vocabularyIds: ['w10']
            },
            exercises: [
              {
                id: 'ex-b1-1',
                type: 'multiple_choice',
                prompt: 'Var bor Sara och hennes familj?',
                options: ['I Malmö', 'I Göteborg', 'I Stockholm', 'I Uppsala'],
                correctIndex: 1,
                explanation: 'I texten står det: "Jag bor i en lägenhet i Göteborg..."'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sfi-d',
    code: 'SFI D',
    title: 'SFI Kurs D - Samhälle, Nyheter & Argumentation',
    level: 'Kurs D (Avancerad)',
    description: 'Fördjupa dig i samhällsfrågor, debattartiklar, formellt skriftspråk och komplex grammatik.',
    color: '#8b5cf6', // Violet
    targetAudience: 'Förbereder för Nationella provet i SFI kurs D och fortsättning till SVA grund.',
    totalLessons: 20,
    chapters: [
      {
        id: 'd1',
        number: 1,
        title: 'Demokrati, lagar och rättigheter',
        theme: 'Samhälle & Politik',
        iconName: 'Scale',
        level: 'D',
        completedCount: 1,
        totalCount: 4,
        lessons: [
          {
            id: 'd1-l1',
            title: 'Sveriges statsskick och grundlagar',
            subtitle: 'Yttrandefrihet, tryckfrihet och hur riksdagen fungerar',
            readingText: {
              title: 'De fyra grundlagarna i Sverige',
              paragraphs: [
                'Sverige är en parlamentarisk demokrati med monarki. All offentlig makt utgår från folket genom val till riksdag, regioner och kommuner vart fjärde år.',
                'Landets fyra grundlagar är Regeringsformen, Successionsordningen, Tryckfrihetsförordningen och Yttrandefrihetsgrundlagen. Dessa lagar skyddar medborgarnas friheter och lägger grunden för rättsstaten.'
              ],
              audioDurationSec: 60,
              vocabularyIds: ['w4', 'w6', 'w9']
            },
            grammarFocus: {
              ruleTitle: 'Bisatsordföljd & BIFF-regeln',
              ruleSummary: 'I en bisats (som börjar med subjunktioner som att, eftersom, när, om) kommer satsadverbial som "inte" FÖRE det finita verbet: BIFF = I Bisats kommer Inte Före Finit verb!',
              examples: [
                { swedish: 'Han kom inte i dag. (Huvudsats: Inte efter verbet)', note: 'Huvudsats: Verb + Inte' },
                { swedish: '...eftersom han inte kom i dag. (Bisats: Inte före verbet)', note: 'Bisats: Subjunktion + Subjekt + INTE + Verb' }
              ]
            },
            exercises: [
              {
                id: 'ex-d1-1',
                type: 'multiple_choice',
                prompt: 'Hur ofta hålls allmänna val till Sveriges riksdag, regioner och kommuner?',
                options: ['Vartannat år', 'Vart fjärde år', 'Vart femte år', 'Vart tredje år'],
                correctIndex: 1,
                explanation: 'Allmänna val hålls vart fjärde år i september.'
              },
              {
                id: 'ex-d1-2',
                type: 'fill_blank',
                sentenceWithBlank: 'Hon stannar hemma eftersom hon ___ (inte, må) bra.',
                correctAnswers: ['inte mår'],
                hint: 'Tänk på BIFF-regeln i bisatsen efter "eftersom"!',
                explanation: 'I bisatsen kommer "inte" före verbet "mår": "...eftersom hon inte mår bra."'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'yrkes-sfi',
    code: 'YRKES-SFI',
    title: 'Yrkes-SFI - Vård & Omsorg, Bygg & Restaurang',
    level: 'Yrkesinriktad sfi',
    description: 'Fackspråk, yrkesterminologi och praktiska dialoger anpassade för svensk arbetsmarknad.',
    color: '#059669', // Emerald Green
    targetAudience: 'För studerande som kombinerar språkstudier med yrkesutbildning eller praktik.',
    totalLessons: 15,
    chapters: [
      {
        id: 'y1',
        number: 1,
        title: 'Vårdsvenska & Patientkontakt',
        theme: 'Vård & Omsorg',
        iconName: 'Stethoscope',
        level: 'Yrke',
        completedCount: 2,
        totalCount: 3,
        lessons: [
          {
            id: 'y1-l1',
            title: 'Morgonrapport och dokumentation i journal',
            subtitle: 'Att överlämna patientinformation och använda korrekta medicinska termer',
            readingText: {
              title: 'Överlämning vid skiftbyte',
              paragraphs: [
                'Vid klockan 07:00 samlas vårdpersonalen för morgonrapport. Nattpersonalen går igenom patienternas mående, vitalparametrar såsom blodtryck och puls, samt eventuella förändringar i medicinering.',
                'Noggrann dokumentation i patientjournalen är ett lagkrav och garanterar patientsäkerheten.'
              ],
              audioDurationSec: 55,
              vocabularyIds: ['w1', 'w8']
            },
            exercises: [
              {
                id: 'ex-y1-1',
                type: 'multiple_choice',
                prompt: 'Varför är noggrann dokumentation i patientjournalen så viktig?',
                options: [
                  'Det är ett lagkrav och tryggar patientsäkerheten.',
                  'Det ersätter alla muntliga samtal.',
                  'Det behövs bara för att räkna arbetstimmar.',
                  'Det görs endast en gång per månad.'
                ],
                correctIndex: 0,
                explanation: 'Dokumentation garanterar patientsäkerhet och är reglerat i svensk lag.'
              }
            ]
          }
        ]
      }
    ]
  }
];

export const INITIAL_ASSIGNMENTS: StudentAssignment[] = [
  {
    id: 'ass-1',
    title: 'Text & Grammatik: Fatimas väg till drömjobbet',
    courseTitle: 'SFI Kurs C',
    chapterTitle: 'Kapitel 1: Arbetsliv och att söka jobb',
    lessonId: 'c1-l1',
    dueDate: '2026-08-30',
    status: 'pagaende',
    score: 85,
    assignedBy: 'Karin Lindqvist (Lärare)'
  },
  {
    id: 'ass-2',
    title: 'Hörförståelse & Dialog: På anställningsintervjun',
    courseTitle: 'SFI Kurs C',
    chapterTitle: 'Kapitel 1: Arbetsliv och att söka jobb',
    lessonId: 'c1-l2',
    dueDate: '2026-09-02',
    status: 'ej_paborjad',
    assignedBy: 'Karin Lindqvist (Lärare)'
  },
  {
    id: 'ass-3',
    title: 'Skrivuppgift: Mitt personliga brev',
    courseTitle: 'SFI Kurs C',
    chapterTitle: 'Kapitel 1: Arbetsliv och att söka jobb',
    lessonId: 'c1-l2',
    dueDate: '2026-09-05',
    status: 'ej_paborjad',
    assignedBy: 'Karin Lindqvist (Lärare)'
  },
  {
    id: 'ass-4',
    title: 'Ordföljd & V2-regeln: Grammatikövning',
    courseTitle: 'SFI Kurs C',
    chapterTitle: 'Grammatikbanken',
    lessonId: 'c1-l1',
    dueDate: '2026-08-25',
    status: 'klar',
    score: 100,
    feedback: 'Utmärkt arbete! Du har förstått V2-regeln mycket väl.',
    assignedBy: 'Karin Lindqvist (Lärare)'
  }
];

export const INITIAL_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub-1',
    studentName: 'Fatima Al-Mansoor',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    courseTitle: 'SFI Kurs C',
    assignmentTitle: 'Skrivuppgift: Mitt personliga brev',
    submittedAt: 'I dag, 09:45',
    status: 'behover_rattas',
    studentTextAnswer: 'Hej! Jag heter Fatima och jag söker tjänsten som undersköterska på er vårdcentral. Jag har tidigare arbetat tre år inom sjukvård i Syrien och har nu svenskt certifikat. Jag är ansvarsfull, positiv och lär mig fort. Med vänlig hälsning, Fatima.'
  },
  {
    id: 'sub-2',
    studentName: 'Dmytro Kovalenko',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    courseTitle: 'SFI Kurs C',
    assignmentTitle: 'Uttalsövning & Muntlig inspelning',
    submittedAt: 'I går, 16:20',
    status: 'godkand',
    score: 95,
    teacherNote: 'Mycket bra uttal och betoning på vokalerna!'
  },
  {
    id: 'sub-3',
    studentName: 'Amina Warsame',
    studentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    courseTitle: 'SFI Kurs B',
    assignmentTitle: 'Grammatik: Substantiv i bestämd form',
    submittedAt: '24 aug, 14:10',
    status: 'godkand',
    score: 90,
    teacherNote: 'Snyggt jobbat med en/ett-orden!'
  },
  {
    id: 'sub-4',
    studentName: 'Rami Haddad',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    courseTitle: 'SFI Kurs D',
    assignmentTitle: 'Argumenterande text: Kollektivtrafik',
    submittedAt: '25 aug, 11:30',
    status: 'komplettering',
    studentTextAnswer: 'Jag tycker att buss ska vara gratis för att alla inte har pengar och miljön blir bra.',
    teacherNote: 'Bra argument! Försök att utveckla texten med bisatser (eftersom, därför att) och skriv minst 100 ord.'
  }
];
