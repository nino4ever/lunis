import React, { useState } from 'react';
import { TranslationLanguage, DictionaryWord } from '../types';
import { DICTIONARY_WORDS, SUPPORTED_LANGUAGES } from '../data/dictionaryData';
import { speakSwedish } from '../utils/audio';
import { 
  Search, 
  Volume2, 
  Sparkles, 
  Layers, 
  BookOpen, 
  RotateCw, 
  Check, 
  Filter,
  CheckCircle2
} from 'lucide-react';

interface DictionaryViewProps {
  preferredLang: TranslationLanguage;
  setPreferredLang: (lang: TranslationLanguage) => void;
  audioRate: number;
  onOpenVerbs?: () => void;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  preferredLang,
  setPreferredLang,
  audioRate,
  onOpenVerbs
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = ['all', 'Arbete', 'Hälsa', 'Samhälle', 'Kommunikation'];

  const filteredWords = DICTIONARY_WORDS.filter(w => {
    const matchesSearch = w.swedish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.definitionSv.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (w.translations[preferredLang] && w.translations[preferredLang].toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCat = selectedCategory === 'all' || w.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const currentFlashcard: DictionaryWord | undefined = filteredWords[currentCardIdx];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIdx((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIdx((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-[#e60064] text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
            LEXIKON
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Lunis Ordbok & Glosor
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Flerspråkig Ordbok & Grammatik
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Slå upp ord, lyssna på svenskt uttal och se översättningar på arabiska, franska, italienska och engelska.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {onOpenVerbs && (
              <button
                onClick={onOpenVerbs}
                className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300/80 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Alla verb & böjningar</span>
              </button>
            )}

            <button
              onClick={() => {
                setFlashcardMode(!flashcardMode);
                setIsFlipped(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
                flashcardMode
                  ? 'bg-[#4f46e5] text-white shadow-sm'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/80'
              }`}
            >
              <RotateCw className="w-4 h-4" />
              <span>{flashcardMode ? 'Visa ordlista' : 'Öva med Flashcards'}</span>
            </button>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Översättning till:
          </span>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setPreferredLang(lang.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center space-x-1.5 transition-all cursor-pointer ${
                preferredLang === lang.code
                  ? 'bg-[#4f46e5] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {flashcardMode ? (
        /* Flashcard Study Mode */
        <div className="max-w-xl mx-auto space-y-6 py-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Kort {currentCardIdx + 1} av {filteredWords.length}</span>
            <span>Klicka på kortet för att vända</span>
          </div>

          {currentFlashcard && (
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-indigo-200 shadow-xl min-h-[300px] flex flex-col justify-between items-center text-center cursor-pointer transition-all hover:border-[#4f46e5] relative select-none"
            >
              <div className="w-full flex justify-between items-center text-xs text-slate-400 font-bold">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full uppercase">
                  {currentFlashcard.wordClass}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakSwedish(currentFlashcard.swedish, audioRate);
                  }}
                  className="p-2.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                  title="Lyssna på ordet"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {!isFlipped ? (
                <div className="my-auto space-y-3">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900">
                    {currentFlashcard.article ? `${currentFlashcard.article} ` : ''}{currentFlashcard.swedish}
                  </div>
                  {currentFlashcard.forms && (
                    <div className="text-xs text-slate-500 font-mono">
                      {currentFlashcard.forms}
                    </div>
                  )}
                  <div className="text-xs text-indigo-600 font-semibold mt-4">
                    Klicka för att se betydelse & översättning →
                  </div>
                </div>
              ) : (
                <div className="my-auto space-y-3 animate-in fade-in duration-200">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-900">
                    {currentFlashcard.translations[preferredLang] || currentFlashcard.translations.en}
                  </div>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    {currentFlashcard.definitionSv}
                  </p>
                  <div className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-2xl border border-slate-100 max-w-sm mx-auto">
                    "{currentFlashcard.exampleSentence}"
                  </div>
                </div>
              )}

              <div className="text-[11px] text-slate-400 font-medium">
                {isFlipped ? 'Klicka för att vända tillbaka' : 'Svenskt ord'}
              </div>
            </div>
          )}

          {/* Flashcard Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 cursor-pointer shadow-xs"
            >
              ← Föregående
            </button>
            <button
              onClick={() => speakSwedish(currentFlashcard?.swedish || '', audioRate)}
              className="p-3.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors shadow-xs cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextCard}
              className="px-5 py-2.5 bg-[#4f46e5] text-white font-bold rounded-xl text-xs hover:bg-indigo-700 cursor-pointer shadow-sm"
            >
              Nästa kort →
            </button>
          </div>
        </div>
      ) : (
        /* Dictionary Grid Mode */
        <div className="space-y-4">
          {/* Search and Category Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök på ord eller betydelse..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#4f46e5] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'Alla kategorier' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWords.map((word) => (
              <div 
                key={word.id}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-black text-slate-900">
                          {word.article ? `${word.article} ` : ''}{word.swedish}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                          {word.wordClass}
                        </span>
                      </div>
                      {word.forms && (
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          {word.forms}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => speakSwedish(word.swedish, audioRate)}
                      className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors"
                      title="Lyssna på uttal"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 mt-2 font-medium">
                    {word.definitionSv}
                  </p>

                  <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">
                      {SUPPORTED_LANGUAGES.find(l => l.code === preferredLang)?.flag} {word.translations[preferredLang] || 'Översättning saknas'}
                    </span>
                    <span className="text-[10px] text-amber-800 font-semibold uppercase tracking-wider">
                      {SUPPORTED_LANGUAGES.find(l => l.code === preferredLang)?.label.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  "{word.exampleSentence}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
