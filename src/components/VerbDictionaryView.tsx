import React, { useState, useMemo } from 'react';
import { TranslationLanguage, GrammarLevel, VerbGroup, VerbConjugation } from '../types';
import { ALL_SWEDISH_VERBS, filterVerbs } from '../data/allVerbsData';
import { speakSwedish } from '../utils/audio';
import { 
  Search, 
  Volume2, 
  Sparkles, 
  Layers, 
  BookOpen, 
  Filter, 
  Copy, 
  Check, 
  GraduationCap, 
  Table, 
  LayoutGrid, 
  ArrowRight,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Printer,
  ChevronDown,
  Info
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/dictionaryData';

interface VerbDictionaryViewProps {
  preferredLang: TranslationLanguage;
  setPreferredLang: (lang: TranslationLanguage) => void;
  audioRate: number;
  initialLevel?: GrammarLevel | 'all';
  onOpenGrammarGuide?: () => void;
}

export const VerbDictionaryView: React.FC<VerbDictionaryViewProps> = ({
  preferredLang,
  setPreferredLang,
  audioRate,
  initialLevel = 'all',
  onOpenGrammarGuide
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<GrammarLevel | 'all'>(initialLevel);
  const [selectedGroup, setSelectedGroup] = useState<VerbGroup | 'all'>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'trainer'>('table');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedVerbId, setExpandedVerbId] = useState<string | null>(null);

  // Trainer state
  const [trainerIndex, setTrainerIndex] = useState(0);
  const [trainerInput, setTrainerInput] = useState('');
  const [trainerTargetTense, setTrainerTargetTense] = useState<'presens' | 'preteritum' | 'supinum' | 'imperativ'>('preteritum');
  const [trainerFeedback, setTrainerFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [trainerScore, setTrainerScore] = useState(0);
  const [trainerStreak, setTrainerStreak] = useState(0);

  // Available Alphabetical Letters
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'Å', 'Ä', 'Ö'];

  // Filtered Verbs List
  const filteredVerbs = useMemo(() => {
    return filterVerbs(ALL_SWEDISH_VERBS, {
      query: searchTerm,
      level: selectedLevel,
      verbGroup: selectedGroup,
      firstLetter: selectedLetter,
      preferredLang
    });
  }, [searchTerm, selectedLevel, selectedGroup, selectedLetter, preferredLang]);

  // Verb Counts by Level
  const stats = useMemo(() => {
    return {
      total: ALL_SWEDISH_VERBS.length,
      levelA: ALL_SWEDISH_VERBS.filter(v => v.level === 'A').length,
      levelB: ALL_SWEDISH_VERBS.filter(v => v.level === 'B').length,
      levelC: ALL_SWEDISH_VERBS.filter(v => v.level === 'C').length,
      levelD: ALL_SWEDISH_VERBS.filter(v => v.level === 'D').length,
      levelYrke: ALL_SWEDISH_VERBS.filter(v => v.level === 'Yrke-SVA').length,
    };
  }, []);

  const handleCopyConjugation = (verb: VerbConjugation) => {
    const text = `${verb.infinitiv} | ${verb.presens} | ${verb.preteritum} | ${verb.supinum} | ${verb.imperativ} - ${verb.meaningSv} (${verb.translations[preferredLang] || verb.translations.en})`;
    navigator.clipboard.writeText(text);
    setCopiedId(verb.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTrainerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filteredVerbs.length) return;
    const currentVerb = filteredVerbs[trainerIndex % filteredVerbs.length];
    const correctValue = currentVerb[trainerTargetTense].toLowerCase().trim().replace('!', '');
    const userVal = trainerInput.toLowerCase().trim().replace('!', '');

    if (userVal === correctValue || (trainerTargetTense === 'supinum' && userVal === currentVerb.supinum.replace('har ', '').trim())) {
      setTrainerFeedback('correct');
      setTrainerScore(s => s + 10);
      setTrainerStreak(st => st + 1);
      speakSwedish(currentVerb[trainerTargetTense], audioRate);
    } else {
      setTrainerFeedback('incorrect');
      setTrainerStreak(0);
    }
  };

  const handleNextTrainerWord = () => {
    setTrainerFeedback(null);
    setTrainerInput('');
    const tenses: Array<'presens' | 'preteritum' | 'supinum' | 'imperativ'> = ['presens', 'preteritum', 'supinum', 'imperativ'];
    setTrainerTargetTense(tenses[Math.floor(Math.random() * tenses.length)]);
    setTrainerIndex(prev => (prev + 1) % filteredVerbs.length);
  };

  const getLevelBadge = (lvl: GrammarLevel) => {
    switch (lvl) {
      case 'A':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-black text-[10px] px-2 py-0.5 rounded-md">SFI A</span>;
      case 'B':
        return <span className="bg-sky-100 text-sky-800 border border-sky-300 font-black text-[10px] px-2 py-0.5 rounded-md">SFI B</span>;
      case 'C':
        return <span className="bg-indigo-100 text-indigo-800 border border-indigo-300 font-black text-[10px] px-2 py-0.5 rounded-md">SFI C</span>;
      case 'D':
        return <span className="bg-purple-100 text-purple-800 border border-purple-300 font-black text-[10px] px-2 py-0.5 rounded-md">SFI D</span>;
      case 'Yrke-SVA':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 font-black text-[10px] px-2 py-0.5 rounded-md">Yrke / SVA</span>;
    }
  };

  const currentTrainerVerb = filteredVerbs.length > 0 ? filteredVerbs[trainerIndex % filteredVerbs.length] : null;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="bg-[#e60064] text-white font-black text-[10px] px-2 py-0.5 rounded-md tracking-wider uppercase">
              LEXIKON & BÖJNING
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Komplett Svenskt Verblexikon
            </span>
          </div>

          {/* Right Mode Switchers */}
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tabell</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kort</span>
            </button>
            <button
              onClick={() => {
                setViewMode('trainer');
                setTrainerFeedback(null);
                setTrainerInput('');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'trainer' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Verbtränare</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Svenskt Verblexikon & Böjningsguide
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
              Slå upp alla svenska verb uppdelade efter SFI-nivå (A, B, C, D och Yrke). Se böjningar i infinitiv, presens, preteritum, supinum och imperativ med uttal och översättningar.
            </p>
          </div>

          {onOpenGrammarGuide && (
            <button
              onClick={onOpenGrammarGuide}
              className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200/80 transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Öppna Grammatikguiden</span>
            </button>
          )}
        </div>

        {/* Level Stats Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-6 gap-2">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
              selectedLevel === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-700'
            }`}
          >
            <div className="text-[10px] font-bold uppercase opacity-80">Alla Verb</div>
            <div className="text-base font-black mt-0.5">{stats.total} st</div>
          </button>

          <button
            onClick={() => setSelectedLevel('A')}
            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
              selectedLevel === 'A'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-emerald-50/60 hover:bg-emerald-100/60 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className="text-[10px] font-bold uppercase opacity-80">Nivå A</div>
            <div className="text-base font-black mt-0.5">{stats.levelA} st</div>
          </button>

          <button
            onClick={() => setSelectedLevel('B')}
            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
              selectedLevel === 'B'
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-sky-50/60 hover:bg-sky-100/60 border-sky-200 text-sky-900'
            }`}
          >
            <div className="text-[10px] font-bold uppercase opacity-80">Nivå B</div>
            <div className="text-base font-black mt-0.5">{stats.levelB} st</div>
          </button>

          <button
            onClick={() => setSelectedLevel('C')}
            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
              selectedLevel === 'C'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-indigo-50/60 hover:bg-indigo-100/60 border-indigo-200 text-indigo-900'
            }`}
          >
            <div className="text-[10px] font-bold uppercase opacity-80">Nivå C</div>
            <div className="text-base font-black mt-0.5">{stats.levelC} st</div>
          </button>

          <button
            onClick={() => setSelectedLevel('D')}
            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
              selectedLevel === 'D'
                ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                : 'bg-purple-50/60 hover:bg-purple-100/60 border-purple-200 text-purple-900'
            }`}
          >
            <div className="text-[10px] font-bold uppercase opacity-80">Nivå D</div>
            <div className="text-base font-black mt-0.5">{stats.levelD} st</div>
          </button>

          <button
            onClick={() => setSelectedLevel('Yrke-SVA')}
            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
              selectedLevel === 'Yrke-SVA'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-amber-50/60 hover:bg-amber-100/60 border-amber-200 text-amber-900'
            }`}
          >
            <div className="text-[10px] font-bold uppercase opacity-80">Yrke & SVA</div>
            <div className="text-base font-black mt-0.5">{stats.levelYrke} st</div>
          </button>
        </div>

        {/* Translation Language Selector */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Översättning:
          </span>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setPreferredLang(lang.code)}
              className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 flex items-center space-x-1.5 transition-all cursor-pointer ${
                preferredLang === lang.code
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH AND FILTERS BAR */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sök verb (t.ex. skriva, skrev, att bo, ringa, äta, chercher, help...)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded bg-slate-200 cursor-pointer"
              >
                Rensa
              </button>
            )}
          </div>

          {/* Verb Group Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">Alla verbgrupper</option>
              <option value="grupp-1">Grupp 1 (-ar, -ade, -at)</option>
              <option value="grupp-2a">Grupp 2a (-er, -de, -t)</option>
              <option value="grupp-2b">Grupp 2b (-er, -te, -t)</option>
              <option value="grupp-3">Grupp 3 (-r, -dde, -tt)</option>
              <option value="grupp-4">Grupp 4 (Starka & Oregelbundna)</option>
              <option value="hjalpverb">Hjälpverb (Modalverb)</option>
              <option value="reflexiva">Reflexiva verb (sig)</option>
            </select>
          </div>
        </div>

        {/* Alphabetical Quick Jump Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1.5 shrink-0">
            A-Ö:
          </span>
          <button
            onClick={() => setSelectedLetter('')}
            className={`px-2 py-1 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${
              selectedLetter === ''
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ALLA
          </button>
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
              className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                selectedLetter === letter
                  ? 'bg-indigo-600 text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: VERB TRAINER QUIZ */}
      {viewMode === 'trainer' && currentTrainerVerb && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                INTERAKTIV TRÄNARE
              </span>
              <span className="text-xs font-bold text-slate-500">
                Poäng: <strong className="text-indigo-600">{trainerScore}</strong> | Streak: <strong className="text-amber-600">🔥 {trainerStreak}</strong>
              </span>
            </div>

            <button
              onClick={() => setViewMode('table')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Avsluta tränare
            </button>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              {getLevelBadge(currentTrainerVerb.level)}
              <span className="text-xs font-semibold text-slate-500">{currentTrainerVerb.groupName}</span>
            </div>

            <h2 className="text-3xl font-black text-slate-900">
              {currentTrainerVerb.infinitiv}
            </h2>

            <p className="text-sm text-slate-600">
              {currentTrainerVerb.meaningSv}
            </p>

            <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full inline-block">
              {currentTrainerVerb.translations[preferredLang] || currentTrainerVerb.translations.en}
            </div>
          </div>

          <form onSubmit={handleTrainerSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Skriv verbet i <span className="text-indigo-600 underline font-black">{trainerTargetTense.toUpperCase()}</span>:
              </label>
              <input
                type="text"
                value={trainerInput}
                onChange={(e) => setTrainerInput(e.target.value)}
                placeholder={`Skriv ${trainerTargetTense}-form här...`}
                disabled={trainerFeedback !== null}
                className="w-full px-4 py-3 bg-white border-2 border-indigo-200 rounded-xl text-base font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-all"
                autoFocus
              />
            </div>

            {trainerFeedback === null ? (
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Kontrollera svar
              </button>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl flex items-start space-x-3 ${
                  trainerFeedback === 'correct' ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-rose-50 border border-rose-200 text-rose-900'
                }`}>
                  {trainerFeedback === 'correct' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-sm font-black">
                      {trainerFeedback === 'correct' ? 'Helt rätt! Bra jobbat!' : 'Inte riktigt rätt.'}
                    </div>
                    <div className="text-xs mt-1">
                      Rätt form i {trainerTargetTense}: <strong className="underline text-slate-900">{currentTrainerVerb[trainerTargetTense]}</strong>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 italic">
                      Exempel: "{currentTrainerVerb.exampleSentence}"
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextTrainerWord}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Nästa verb</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>

          {/* Full conjugation preview in trainer */}
          <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-2 border border-slate-100">
            <div className="font-bold text-slate-700">Alla former för {currentTrainerVerb.infinitiv}:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600">
              <div>Presens: <strong className="text-slate-900">{currentTrainerVerb.presens}</strong></div>
              <div>Preteritum: <strong className="text-slate-900">{currentTrainerVerb.preteritum}</strong></div>
              <div>Supinum: <strong className="text-slate-900">{currentTrainerVerb.supinum}</strong></div>
              <div>Imperativ: <strong className="text-slate-900">{currentTrainerVerb.imperativ}</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50/70 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Visar {filteredVerbs.length} verb</span>
            <div className="flex items-center space-x-3">
              <span className="text-[11px] text-slate-400">💡 Klicka på högtalaren 🔊 för att lyssna på formen</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-[11px] font-black uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <th className="py-3 px-4">Nivå</th>
                  <th className="py-3 px-4">Infinitiv (att...)</th>
                  <th className="py-3 px-4">Presens (nutid)</th>
                  <th className="py-3 px-4">Preteritum (dåtid)</th>
                  <th className="py-3 px-4">Supinum (har/hade...)</th>
                  <th className="py-3 px-4">Imperativ (uppmaning)</th>
                  <th className="py-3 px-4">Betydelse & Översättning</th>
                  <th className="py-3 px-4 text-right">Åtgärd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredVerbs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                      Inga verb hittades som matchar dina filter. Prova att ändra sökord eller nivå.
                    </td>
                  </tr>
                ) : (
                  filteredVerbs.map((verb) => (
                    <tr key={verb.id} className="hover:bg-indigo-50/40 transition-colors group">
                      {/* Level */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getLevelBadge(verb.level)}
                      </td>

                      {/* Infinitiv */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-extrabold text-slate-900">{verb.infinitiv}</span>
                          <button
                            onClick={() => speakSwedish(verb.infinitiv, audioRate)}
                            className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Lyssna på infinitiv"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-400">{verb.groupName}</div>
                      </td>

                      {/* Presens */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-indigo-700">{verb.presens}</span>
                          <button
                            onClick={() => speakSwedish(verb.presens, audioRate)}
                            className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Lyssna på presens"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Preteritum */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-amber-800">{verb.preteritum}</span>
                          <button
                            onClick={() => speakSwedish(verb.preteritum, audioRate)}
                            className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Lyssna på preteritum"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Supinum */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-purple-700">{verb.supinum}</span>
                          <button
                            onClick={() => speakSwedish(verb.supinum, audioRate)}
                            className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Lyssna på supinum"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Imperativ */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-semibold text-rose-700">{verb.imperativ}</span>
                          <button
                            onClick={() => speakSwedish(verb.imperativ, audioRate)}
                            className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Lyssna på imperativ"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Meaning & Translation */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800 line-clamp-1">{verb.meaningSv}</div>
                        <div className="text-[11px] font-bold text-indigo-600">
                          {verb.translations[preferredLang] || verb.translations.en}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => handleCopyConjugation(verb)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Kopiera böjning"
                          >
                            {copiedId === verb.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => setExpandedVerbId(expandedVerbId === verb.id ? null : verb.id)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
                            title="Visa exempelmening"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: DETAILED CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVerbs.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">
              Inga verb hittades. Justera dina sökfilter.
            </div>
          ) : (
            filteredVerbs.map((verb) => (
              <div
                key={verb.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {getLevelBadge(verb.level)}
                    <span className="text-[10px] font-bold text-slate-400">{verb.groupName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">
                      {verb.infinitiv}
                    </h3>
                    <button
                      onClick={() => speakSwedish(verb.infinitiv, audioRate)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-1">
                    {verb.meaningSv}
                  </p>

                  <div className="mt-2 text-xs font-bold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg inline-block">
                    {verb.translations[preferredLang] || verb.translations.en}
                  </div>

                  {/* Conjugation Grid */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Presens</div>
                      <div className="font-black text-indigo-800 flex items-center justify-between mt-0.5">
                        <span>{verb.presens}</span>
                        <button onClick={() => speakSwedish(verb.presens, audioRate)} className="cursor-pointer">
                          <Volume2 className="w-3 h-3 text-slate-400 hover:text-indigo-600" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Preteritum</div>
                      <div className="font-black text-amber-800 flex items-center justify-between mt-0.5">
                        <span>{verb.preteritum}</span>
                        <button onClick={() => speakSwedish(verb.preteritum, audioRate)} className="cursor-pointer">
                          <Volume2 className="w-3 h-3 text-slate-400 hover:text-indigo-600" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Supinum</div>
                      <div className="font-black text-purple-800 flex items-center justify-between mt-0.5">
                        <span>{verb.supinum}</span>
                        <button onClick={() => speakSwedish(verb.supinum, audioRate)} className="cursor-pointer">
                          <Volume2 className="w-3 h-3 text-slate-400 hover:text-indigo-600" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Imperativ</div>
                      <div className="font-black text-rose-800 flex items-center justify-between mt-0.5">
                        <span>{verb.imperativ}</span>
                        <button onClick={() => speakSwedish(verb.imperativ, audioRate)} className="cursor-pointer">
                          <Volume2 className="w-3 h-3 text-slate-400 hover:text-indigo-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Example Sentence */}
                  <div className="mt-3 p-2.5 bg-indigo-50/40 rounded-xl text-xs border border-indigo-100/60">
                    <div className="flex items-start space-x-1.5">
                      <span className="font-bold text-indigo-900 shrink-0">Ex:</span>
                      <span className="text-slate-700 italic">"{verb.exampleSentence}"</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyConjugation(verb)}
                    className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedId === verb.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Kopierat!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Kopiera böjning</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => speakSwedish(verb.exampleSentence, audioRate)}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Lyssna på mening</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
