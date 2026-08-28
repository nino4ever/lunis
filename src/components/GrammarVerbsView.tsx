import React, { useState } from 'react';
import { TranslationLanguage, GrammarLevel, VerbGroup, VerbConjugation, GrammarRule } from '../types';
import { GRAMMAR_LEVELS, GRAMMAR_RULES, VERBS_DATABASE, VERB_GROUPS_INFO } from '../data/grammarVerbsData';
import { SUPPORTED_LANGUAGES } from '../data/dictionaryData';
import { speakSwedish, playSuccessSound, playErrorSound } from '../utils/audio';
import { 
  BookOpen, 
  Volume2, 
  Sparkles, 
  Search, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  GraduationCap, 
  HelpCircle, 
  ChevronRight,
  Filter,
  Flame,
  Award,
  Zap,
  Bookmark,
  Shuffle
} from 'lucide-react';

interface GrammarVerbsViewProps {
  preferredLang: TranslationLanguage;
  setPreferredLang: (lang: TranslationLanguage) => void;
  audioRate: number;
  initialLevel?: GrammarLevel;
}

export const GrammarVerbsView: React.FC<GrammarVerbsViewProps> = ({
  preferredLang,
  setPreferredLang,
  audioRate,
  initialLevel = 'C'
}) => {
  // Main view state
  const [selectedLevel, setSelectedLevel] = useState<GrammarLevel | 'all'>(initialLevel);
  const [activeSubTab, setActiveSubTab] = useState<'grammar' | 'verbs' | 'trainer' | 'groups'>('grammar');
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVerbGroup, setSelectedVerbGroup] = useState<VerbGroup | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Rule practice state (per rule id -> selected option index & feedback)
  const [ruleAnswers, setRuleAnswers] = useState<Record<string, number>>({});
  
  // Verb Trainer Game State
  const [trainerLevel, setTrainerLevel] = useState<GrammarLevel | 'all'>(initialLevel);
  const [trainerQuestionIdx, setTrainerQuestionIdx] = useState(0);
  const [trainerTargetTense, setTrainerTargetTense] = useState<'presens' | 'preteritum' | 'supinum' | 'imperativ'>('preteritum');
  const [userTrainerAnswer, setUserTrainerAnswer] = useState('');
  const [trainerFeedback, setTrainerFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [trainerScore, setTrainerScore] = useState(0);
  const [trainerStreak, setTrainerStreak] = useState(0);
  const [showTrainerAnswer, setShowTrainerAnswer] = useState(false);

  // Active Level metadata
  const currentLevelMeta = selectedLevel === 'all' 
    ? null 
    : GRAMMAR_LEVELS.find(l => l.id === selectedLevel);

  // Filtered grammar rules
  const filteredRules = GRAMMAR_RULES.filter(rule => {
    const matchesLevel = selectedLevel === 'all' || rule.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
    const matchesSearch = searchTerm.trim() === '' || 
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.explanation.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesLevel && matchesCategory && matchesSearch;
  });

  // Filtered verbs
  const filteredVerbs = VERBS_DATABASE.filter(verb => {
    const matchesLevel = selectedLevel === 'all' || verb.level === selectedLevel;
    const matchesGroup = selectedVerbGroup === 'all' || verb.verbGroup === selectedVerbGroup;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = term === '' ||
      verb.infinitiv.toLowerCase().includes(term) ||
      verb.presens.toLowerCase().includes(term) ||
      verb.preteritum.toLowerCase().includes(term) ||
      verb.supinum.toLowerCase().includes(term) ||
      verb.imperativ.toLowerCase().includes(term) ||
      verb.meaningSv.toLowerCase().includes(term) ||
      (verb.translations[preferredLang] && verb.translations[preferredLang].toLowerCase().includes(term));
    return matchesLevel && matchesGroup && matchesSearch;
  });

  // Verbs available for trainer game
  const trainerVerbs = VERBS_DATABASE.filter(v => trainerLevel === 'all' || v.level === trainerLevel);
  const currentTrainerVerb: VerbConjugation = trainerVerbs[trainerQuestionIdx % trainerVerbs.length] || VERBS_DATABASE[0];

  const handleNextTrainerQuestion = () => {
    setUserTrainerAnswer('');
    setTrainerFeedback(null);
    setShowTrainerAnswer(false);
    
    // Pick random tense
    const tenses: ('presens' | 'preteritum' | 'supinum' | 'imperativ')[] = ['presens', 'preteritum', 'supinum', 'imperativ'];
    const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
    setTrainerTargetTense(randomTense);

    // Pick next verb
    setTrainerQuestionIdx(prev => (prev + 1) % trainerVerbs.length);
  };

  const handleCheckTrainerAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userTrainerAnswer.trim()) return;

    let targetCorrect = currentTrainerVerb[trainerTargetTense].toLowerCase().trim();
    // Clean potential "att", "har", "!", punctuation
    if (trainerTargetTense === 'supinum' && targetCorrect.startsWith('har ')) {
      targetCorrect = targetCorrect.replace('har ', '');
    }
    const cleanUser = userTrainerAnswer.toLowerCase().trim().replace('!', '').replace('har ', '');
    const cleanTarget = targetCorrect.replace('!', '');

    if (cleanUser === cleanTarget) {
      setTrainerFeedback('correct');
      setTrainerScore(prev => prev + 10);
      setTrainerStreak(prev => prev + 1);
      playSuccessSound();
    } else {
      setTrainerFeedback('incorrect');
      setTrainerStreak(0);
      playErrorSound();
    }
  };

  const getTenseLabel = (tense: 'presens' | 'preteritum' | 'supinum' | 'imperativ') => {
    switch (tense) {
      case 'presens': return 'Presens (Nutid: Vad händer nu?)';
      case 'preteritum': return 'Preteritum (Dåtid: Vad hände i går?)';
      case 'supinum': return 'Supinum (Perfekt: Har gjort...)';
      case 'imperativ': return 'Imperativ (Uppmaning: Gör det nu!)';
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner with Vibrant Indigo-Violet Palette */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-60 h-60 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-40 bottom-0 translate-y-12 w-48 h-48 rounded-full bg-amber-400/15 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="bg-[#e60064] text-white font-black text-[10px] px-2 py-0.5 rounded tracking-wider uppercase">
                GRAMMATIK & VERB
              </span>
              <span className="text-indigo-200 text-xs font-semibold">
                Strukturerad progression för SFI & SVA
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Grammatik & Verbguide för alla nivåer
            </h1>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
              Lär dig svensk meningsbyggnad, ordföljd (V2 och BIFF), de 4 verbgrupperna och tempus från nybörjarnivå (Kurs A) till avancerat yrkesspråk.
            </p>
          </div>

          {/* Quick Stats / Audio Player preview */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/15 backdrop-blur-xs border border-white/20 rounded-2xl p-3.5 text-center min-w-28 shadow-sm">
              <div className="text-2xl font-black text-amber-300">
                {GRAMMAR_RULES.length}
              </div>
              <div className="text-[10px] font-bold text-indigo-100 uppercase tracking-wider mt-0.5">
                Grammatikregler
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-xs border border-white/20 rounded-2xl p-3.5 text-center min-w-28 shadow-sm">
              <div className="text-2xl font-black text-emerald-300">
                {VERBS_DATABASE.length}+
              </div>
              <div className="text-[10px] font-bold text-indigo-100 uppercase tracking-wider mt-0.5">
                Böjda verb
              </div>
            </div>
          </div>
        </div>

        {/* Translation Language Selector Bar inside Banner */}
        <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between flex-wrap gap-3 text-xs">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
            <span className="text-indigo-200 font-semibold shrink-0">Översätt till:</span>
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setPreferredLang(lang.code)}
                className={`px-2.5 py-1 rounded-xl font-bold flex items-center space-x-1.5 transition-all shrink-0 cursor-pointer ${
                  preferredLang === lang.code
                    ? 'bg-white text-indigo-900 shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>Välj nivå för grammatik & verb:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-4 py-3 rounded-2xl text-left border transition-all cursor-pointer ${
              selectedLevel === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-300'
                : 'bg-slate-50 hover:bg-indigo-50/70 border-slate-200 text-slate-700'
            }`}
          >
            <div className="text-xs font-black uppercase">Alla nivåer</div>
            <div className={`text-[11px] mt-0.5 ${selectedLevel === 'all' ? 'text-indigo-100' : 'text-slate-500'}`}>
              Kurs A – SVA
            </div>
          </button>

          {GRAMMAR_LEVELS.map(level => {
            const isSelected = selectedLevel === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`px-4 py-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-300'
                    : 'bg-slate-50 hover:bg-indigo-50/70 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase">{level.code}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {level.cefr}
                  </span>
                </div>
                <div className={`text-[11px] mt-0.5 truncate ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {level.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Level description callout if specific level selected */}
        {currentLevelMeta && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-900">{currentLevelMeta.title}:</span>{' '}
              <span>{currentLevelMeta.description}</span>
            </div>
            <div className="shrink-0 flex items-center space-x-1.5 font-semibold text-indigo-700">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${currentLevelMeta.badgeColor}`}>
                {currentLevelMeta.cefr}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Sub-Navigation Switcher (Grammar Rules, Verb Database, Verb Trainer, Verb Groups) */}
      <div className="flex border-b border-slate-200 bg-white rounded-3xl p-1.5 shadow-sm overflow-x-auto gap-1">
        <button
          onClick={() => setActiveSubTab('grammar')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeSubTab === 'grammar'
              ? 'bg-[#4f46e5] text-white shadow-sm'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Grammatikregler ({filteredRules.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('verbs')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeSubTab === 'verbs'
              ? 'bg-[#4f46e5] text-white shadow-sm'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Verblista & Tempus ({filteredVerbs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('trainer')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeSubTab === 'trainer'
              ? 'bg-amber-500 text-slate-900 shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/70'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Verbtränaren (Interaktiv böjning)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('groups')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeSubTab === 'groups'
              ? 'bg-[#4f46e5] text-white shadow-sm'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>De 4 Verbgrupperna</span>
        </button>
      </div>

      {/* ===================== VIEW 1: GRAMMAR RULES ===================== */}
      {activeSubTab === 'grammar' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök på regel (t.ex. V2, BIFF, preteritum, bisats)..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#4f46e5] focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Kategori:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
              >
                <option value="all">Alla kategorier</option>
                <option value="ordfoljd">Ordföljd (V2 & satser)</option>
                <option value="verb">Verb & Tempus</option>
                <option value="satser">Bisatser & Subjunktioner</option>
                <option value="substantiv">Substantiv & Genus</option>
                <option value="adjektiv">Adjektivböjning</option>
                <option value="pronomen">Pronomen</option>
                <option value="sva-formellt">Formellt språk / Yrke</option>
              </select>
            </div>
          </div>

          {/* Rules Cards List */}
          {filteredRules.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-sm">Inga regler matchade sökningen</h3>
              <p className="text-xs text-slate-500 mt-1">Pröva att ändra nivå eller rensa sökordet.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedLevel('all'); }}
                className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-100 cursor-pointer"
              >
                Återställ filter
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredRules.map(rule => {
                const levelMeta = GRAMMAR_LEVELS.find(l => l.id === rule.level);
                return (
                  <div 
                    key={rule.id}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md"
                  >
                    {/* Rule Top Accent Banner */}
                    <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center space-x-2.5">
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase border ${levelMeta?.badgeColor || 'bg-indigo-100 text-indigo-800'}`}>
                          {rule.levelTitle}
                        </span>
                        <span className="bg-indigo-100 text-indigo-700 text-[11px] font-bold px-2 py-0.5 rounded-md">
                          {rule.categoryLabel}
                        </span>
                      </div>

                      {rule.formula && (
                        <div className="bg-indigo-50 border border-indigo-200/80 text-indigo-900 font-mono text-[11px] font-bold px-3 py-1 rounded-xl">
                          {rule.formula}
                        </div>
                      )}
                    </div>

                    {/* Rule Content */}
                    <div className="p-6 sm:p-7 space-y-5">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">
                          {rule.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 leading-relaxed">
                          {rule.summary}
                        </p>
                      </div>

                      {/* Explanation Bullets */}
                      <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Förklaring & Regler:</span>
                        </div>
                        <ul className="space-y-1.5">
                          {rule.explanation.map((exp, idx) => (
                            <li key={idx} className="text-xs text-slate-700 flex items-start space-x-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span>{exp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Examples Table */}
                      <div className="space-y-2.5">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Exempelmeningar med uttal:</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {rule.examples.map((ex, exIdx) => (
                            <div 
                              key={exIdx}
                              className="bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-2xl p-4 transition-colors space-y-2"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="font-bold text-sm text-slate-900 leading-snug">
                                  {ex.swedish}
                                </div>
                                <button
                                  onClick={() => speakSwedish(ex.swedish, audioRate)}
                                  className="w-8 h-8 rounded-full bg-white hover:bg-indigo-600 hover:text-white text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer"
                                  title="Lyssna på svenskt uttal"
                                  aria-label={`Lyssna på: ${ex.swedish}`}
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="text-[11px] font-semibold text-indigo-700 bg-white/80 px-2 py-1 rounded-lg border border-indigo-100 inline-block">
                                💡 {ex.note}
                              </div>

                              {ex.translation && ex.translation[preferredLang] && (
                                <div className="text-xs text-slate-600 border-t border-indigo-100/60 pt-2 flex items-center space-x-1.5">
                                  <span className="text-slate-400 font-bold uppercase text-[10px]">Översättning:</span>
                                  <span className="font-medium text-slate-800">{ex.translation[preferredLang]}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Common mistake callout */}
                      {rule.commonMistake && (
                        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="space-y-1">
                            <div className="font-bold text-amber-900 flex items-center space-x-1.5">
                              <XCircle className="w-4 h-4 text-rose-500" />
                              <span>Vanligt fel att se upp för:</span>
                            </div>
                            <div className="text-slate-700 pl-5">
                              <span className="line-through text-rose-700 font-semibold">{rule.commonMistake.incorrect}</span>
                              <span className="mx-2 text-slate-400">➔</span>
                              <span className="text-emerald-700 font-bold">{rule.commonMistake.correct}</span>
                            </div>
                          </div>
                          <div className="text-[11px] text-slate-600 bg-white/80 p-2 rounded-xl border border-amber-200 sm:max-w-xs">
                            {rule.commonMistake.explanation}
                          </div>
                        </div>
                      )}

                      {/* Interactive Mini-Quiz */}
                      {rule.practiceQuestion && (
                        <div className="bg-indigo-900 text-white rounded-2xl p-4 sm:p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center space-x-1.5">
                              <Zap className="w-3.5 h-3.5 fill-amber-300" />
                              <span>Testa din förståelse</span>
                            </span>
                            {ruleAnswers[rule.id] !== undefined && (
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                ruleAnswers[rule.id] === rule.practiceQuestion.correctIndex 
                                  ? 'bg-emerald-500 text-white' 
                                  : 'bg-rose-500 text-white'
                              }`}>
                                {ruleAnswers[rule.id] === rule.practiceQuestion.correctIndex ? 'Rätt svar! 🎉' : 'Försök igen'}
                              </span>
                            )}
                          </div>

                          <div className="text-xs sm:text-sm font-bold text-white">
                            {rule.practiceQuestion.prompt}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {rule.practiceQuestion.options.map((opt, optIdx) => {
                              const isSelected = ruleAnswers[rule.id] === optIdx;
                              const isCorrect = optIdx === rule.practiceQuestion?.correctIndex;
                              let btnStyle = 'bg-white/10 hover:bg-white/20 text-white';
                              if (ruleAnswers[rule.id] !== undefined) {
                                if (isCorrect) btnStyle = 'bg-emerald-500 text-white font-bold';
                                else if (isSelected) btnStyle = 'bg-rose-500 text-white';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    setRuleAnswers(prev => ({ ...prev, [rule.id]: optIdx }));
                                    if (optIdx === rule.practiceQuestion?.correctIndex) {
                                      playSuccessSound();
                                    } else {
                                      playErrorSound();
                                    }
                                  }}
                                  className={`px-3 py-2 rounded-xl text-xs text-left transition-all cursor-pointer ${btnStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {ruleAnswers[rule.id] !== undefined && (
                            <div className="text-[11px] text-indigo-200 border-t border-white/10 pt-2 flex items-center justify-between">
                              <span>{rule.practiceQuestion.explanation}</span>
                              <button
                                onClick={() => setRuleAnswers(prev => {
                                  const copy = { ...prev };
                                  delete copy[rule.id];
                                  return copy;
                                })}
                                className="text-xs underline text-amber-300 hover:text-white ml-2 shrink-0 cursor-pointer"
                              >
                                Återställ
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================== VIEW 2: VERB CONJUGATION DATABASE ===================== */}
      {activeSubTab === 'verbs' && (
        <div className="space-y-6">
          {/* Verb Filter and Search Toolbar */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök verb på svenska eller översättning..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#4f46e5] focus:outline-none"
              />
            </div>

            {/* Verb Group Filter Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1">
              <button
                onClick={() => setSelectedVerbGroup('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedVerbGroup === 'all'
                    ? 'bg-[#4f46e5] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Alla grupper
              </button>
              <button
                onClick={() => setSelectedVerbGroup('grupp-1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedVerbGroup === 'grupp-1'
                    ? 'bg-[#4f46e5] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Grupp 1 (-ar)
              </button>
              <button
                onClick={() => setSelectedVerbGroup('grupp-2a')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedVerbGroup === 'grupp-2a'
                    ? 'bg-[#4f46e5] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Grupp 2a (-de)
              </button>
              <button
                onClick={() => setSelectedVerbGroup('grupp-2b')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedVerbGroup === 'grupp-2b'
                    ? 'bg-[#4f46e5] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Grupp 2b (-te)
              </button>
              <button
                onClick={() => setSelectedVerbGroup('grupp-3')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedVerbGroup === 'grupp-3'
                    ? 'bg-[#4f46e5] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Grupp 3 (kortverb)
              </button>
              <button
                onClick={() => setSelectedVerbGroup('grupp-4')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedVerbGroup === 'grupp-4'
                    ? 'bg-[#4f46e5] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Grupp 4 (starka)
              </button>
            </div>
          </div>

          {/* Verb Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredVerbs.map(verb => {
              const levelMeta = GRAMMAR_LEVELS.find(l => l.id === verb.level);
              return (
                <div
                  key={verb.id}
                  className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  {/* Top Bar with Group & Meaning */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase border ${levelMeta?.badgeColor || 'bg-indigo-100 text-indigo-800'}`}>
                        Nivå {verb.level}
                      </span>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                        {verb.groupName}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-indigo-700">
                      {verb.translations[preferredLang] || verb.meaningSv}
                    </div>
                  </div>

                  {/* 4 Core Tempus Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {/* Infinitiv */}
                    <div className="bg-slate-50 rounded-2xl p-2.5 border border-slate-100 text-center relative group">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Infinitiv</div>
                      <div className="text-xs font-black text-slate-800 mt-0.5">{verb.infinitiv}</div>
                      <button
                        onClick={() => speakSwedish(verb.infinitiv, audioRate)}
                        className="mt-1 w-6 h-6 mx-auto rounded-full bg-white hover:bg-indigo-600 hover:text-white text-indigo-600 border border-indigo-200 flex items-center justify-center transition-colors cursor-pointer"
                        title="Lyssna"
                        aria-label={`Lyssna på infinitiv: ${verb.infinitiv}`}
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Presens */}
                    <div className="bg-emerald-50/60 rounded-2xl p-2.5 border border-emerald-100 text-center relative group">
                      <div className="text-[10px] font-bold text-emerald-700 uppercase">Presens (Nu)</div>
                      <div className="text-xs font-black text-emerald-900 mt-0.5">{verb.presens}</div>
                      <button
                        onClick={() => speakSwedish(verb.presens, audioRate)}
                        className="mt-1 w-6 h-6 mx-auto rounded-full bg-white hover:bg-emerald-600 hover:text-white text-emerald-600 border border-emerald-200 flex items-center justify-center transition-colors cursor-pointer"
                        title="Lyssna"
                        aria-label={`Lyssna på presens: ${verb.presens}`}
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Preteritum */}
                    <div className="bg-indigo-50/60 rounded-2xl p-2.5 border border-indigo-100 text-center relative group">
                      <div className="text-[10px] font-bold text-indigo-700 uppercase">Preteritum (Då)</div>
                      <div className="text-xs font-black text-indigo-900 mt-0.5">{verb.preteritum}</div>
                      <button
                        onClick={() => speakSwedish(verb.preteritum, audioRate)}
                        className="mt-1 w-6 h-6 mx-auto rounded-full bg-white hover:bg-indigo-600 hover:text-white text-indigo-600 border border-indigo-200 flex items-center justify-center transition-colors cursor-pointer"
                        title="Lyssna"
                        aria-label={`Lyssna på preteritum: ${verb.preteritum}`}
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Supinum */}
                    <div className="bg-purple-50/60 rounded-2xl p-2.5 border border-purple-100 text-center relative group">
                      <div className="text-[10px] font-bold text-purple-700 uppercase">Supinum (Har)</div>
                      <div className="text-xs font-black text-purple-900 mt-0.5">{verb.supinum}</div>
                      <button
                        onClick={() => speakSwedish(verb.supinum, audioRate)}
                        className="mt-1 w-6 h-6 mx-auto rounded-full bg-white hover:bg-purple-600 hover:text-white text-purple-600 border border-purple-200 flex items-center justify-center transition-colors cursor-pointer"
                        title="Lyssna"
                        aria-label={`Lyssna på supinum: ${verb.supinum}`}
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Imperativ & Example Sentence */}
                  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">
                        Imperativ: <span className="font-black text-rose-600">{verb.imperativ}</span>
                      </span>
                      {verb.notes && (
                        <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                          {verb.notes}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-800 pt-1 border-t border-slate-200/60">
                      <div className="italic">"{verb.exampleSentence}"</div>
                      <button
                        onClick={() => speakSwedish(verb.exampleSentence, audioRate)}
                        className="p-1 text-slate-400 hover:text-indigo-600 rounded cursor-pointer"
                        title="Lyssna på meningen"
                        aria-label={`Lyssna på exempel: ${verb.exampleSentence}`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================== VIEW 3: VERB TRAINER GAME ===================== */}
      {activeSubTab === 'trainer' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Trainer Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            {/* Header with Game score and streak */}
            <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-amber-400 text-slate-900 font-black text-[10px] px-2 py-0.5 rounded tracking-wider uppercase">
                    INTERAKTIV TRÄNARE
                  </span>
                  <span className="text-xs text-indigo-100 font-bold">Verbträning</span>
                </div>
                <h2 className="text-xl font-black text-white mt-1">Böj verbet i rätt tempus</h2>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-xl text-center">
                  <div className="text-[10px] uppercase font-bold text-indigo-200">Poäng</div>
                  <div className="text-lg font-black text-amber-300">{trainerScore}</div>
                </div>

                <div className="bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-xl text-center">
                  <div className="text-[10px] uppercase font-bold text-indigo-200">Streak</div>
                  <div className="text-lg font-black text-emerald-300 flex items-center justify-center space-x-1">
                    <Flame className="w-4 h-4 fill-emerald-300" />
                    <span>{trainerStreak}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Level selector for trainer */}
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="font-bold text-slate-600">Träna verb för nivå:</span>
              <div className="flex items-center space-x-1 overflow-x-auto">
                <button
                  onClick={() => { setTrainerLevel('all'); setTrainerQuestionIdx(0); }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    trainerLevel === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Alla
                </button>
                {GRAMMAR_LEVELS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => { setTrainerLevel(l.id); setTrainerQuestionIdx(0); }}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      trainerLevel === l.id ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {l.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Target Prompt Box */}
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-6 text-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs font-bold text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200">
                    {currentTrainerVerb.groupName} • Nivå {currentTrainerVerb.level}
                  </span>
                  <button
                    onClick={() => speakSwedish(currentTrainerVerb.infinitiv, audioRate)}
                    className="p-1 rounded-full bg-white hover:bg-indigo-600 hover:text-white text-indigo-600 border border-indigo-200 transition-colors cursor-pointer"
                    title="Lyssna på infinitiv"
                    aria-label={`Lyssna på infinitiv: ${currentTrainerVerb.infinitiv}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Grundform (Infinitiv)</div>
                  <div className="text-3xl font-black text-indigo-950 mt-1">
                    {currentTrainerVerb.infinitiv}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    Betydelse: <span className="font-bold text-slate-700">{currentTrainerVerb.translations[preferredLang] || currentTrainerVerb.meaningSv}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-indigo-100 text-xs font-bold text-indigo-900">
                  🎯 Skriv formen i: <span className="font-black text-indigo-600 underline">{getTenseLabel(trainerTargetTense)}</span>
                </div>
              </div>

              {/* User Input Form */}
              <form onSubmit={handleCheckTrainerAnswer} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Ditt svar ({trainerTargetTense}):
                  </label>
                  <input
                    type="text"
                    value={userTrainerAnswer}
                    onChange={(e) => setUserTrainerAnswer(e.target.value)}
                    placeholder={`Skriv verbet i ${trainerTargetTense}...`}
                    disabled={trainerFeedback !== null}
                    autoFocus
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#4f46e5] focus:outline-none focus:bg-white text-center"
                  />
                </div>

                {/* Feedback state */}
                {trainerFeedback === 'correct' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-center space-x-1.5 text-emerald-700 font-extrabold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Helt rätt! Bra jobbat! (+10 poäng)</span>
                    </div>
                    <div className="text-xs text-emerald-800">
                      Exempel: <span className="font-semibold">"{currentTrainerVerb.exampleSentence}"</span>
                    </div>
                  </div>
                )}

                {trainerFeedback === 'incorrect' && (
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-center space-x-1.5 text-rose-700 font-extrabold text-sm">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Inte riktigt rätt!</span>
                    </div>
                    <div className="text-xs text-rose-900 font-medium">
                      Rätt form är:{' '}
                      <span className="font-black text-rose-700 underline text-sm">
                        {currentTrainerVerb[trainerTargetTense]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  {trainerFeedback === null ? (
                    <>
                      <button
                        type="submit"
                        disabled={!userTrainerAnswer.trim()}
                        className="flex-1 bg-[#4f46e5] hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 rounded-2xl text-xs transition-all shadow-sm cursor-pointer"
                      >
                        Kontrollera svar
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowTrainerAnswer(true)}
                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors cursor-pointer"
                      >
                        Visa ledtråd
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextTrainerQuestion}
                      className="w-full bg-[#4f46e5] hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Nästa verb</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {showTrainerAnswer && trainerFeedback === null && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center text-xs text-amber-900">
                    Ledtråd ({currentTrainerVerb.groupName}): Rätt form är <span className="font-bold">{currentTrainerVerb[trainerTargetTense]}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ===================== VIEW 4: VERB GROUPS PEDAGOGY ===================== */}
      {activeSubTab === 'groups' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <span className="bg-[#e60064] text-white font-black text-[10px] px-2 py-0.5 rounded tracking-wider uppercase">
                SYSTEMÖVERSIKT
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Hur svenskans verb böjs
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              De 4 Verbgrupperna i svenskan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              I svenskan delas regelbundna och oregelbundna verb in i fyra huvudgrupper beroende på hur verbet böjs i preteritum (dåtid) och supinum (har-form).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VERB_GROUPS_INFO.map((group, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-slate-900">{group.name}</h3>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                    {group.id.toUpperCase()}
                  </span>
                </div>

                <div className="bg-indigo-50/60 border border-indigo-100 font-mono text-[11px] font-bold text-indigo-900 p-2.5 rounded-xl">
                  {group.pattern}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {group.ruleDesc}
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-800 font-semibold flex items-center justify-between">
                  <span>Exempel: {group.example}</span>
                  <button
                    onClick={() => speakSwedish(group.example.replace(/→/g, ''), audioRate)}
                    className="p-1 text-slate-400 hover:text-indigo-600 rounded cursor-pointer"
                    title="Lyssna på exemplen"
                    aria-label={`Lyssna på: ${group.example}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
