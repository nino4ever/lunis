import React, { useState } from 'react';
import { DictionaryWord, TranslationLanguage } from '../types';
import { DICTIONARY_WORDS, SUPPORTED_LANGUAGES } from '../data/dictionaryData';
import { speakSwedish } from '../utils/audio';
import { Search, Volume2, X, Sparkles, BookOpen, Layers } from 'lucide-react';

interface WordLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWord?: string;
  preferredLang: TranslationLanguage;
  onSelectWordForExercises?: (word: string) => void;
}

export const WordLookupModal: React.FC<WordLookupModalProps> = ({
  isOpen,
  onClose,
  initialWord = '',
  preferredLang,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialWord);
  const [selectedLang, setSelectedLang] = useState<TranslationLanguage>(preferredLang);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const filteredWords = DICTIONARY_WORDS.filter(w => 
    w.swedish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.definitionSv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (w.translations[selectedLang] && w.translations[selectedLang].toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSpeak = (text: string) => {
    setIsPlayingAudio(true);
    speakSwedish(text, 0.85, () => setIsPlayingAudio(false));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#007079] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-800/80 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Lunis Ordbok & Lexikon</h3>
              <p className="text-[11px] text-teal-100">Översättningar på arabiska, franska, italienska och engelska</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-teal-200 hover:text-white p-1 rounded-lg hover:bg-teal-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Language Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sök på ett svenskt ord (t.ex. arbetsplats, ansöka, vårdcentral)..."
              className="w-full pl-9 pr-4 py-2.5 bg-white text-xs text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#007079]"
              autoFocus
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
              Ditt språk:
            </span>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 flex items-center space-x-1.5 transition-all ${
                  selectedLang === lang.code
                    ? 'bg-[#007079] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Word Results List */}
        <div className="p-4 max-h-96 overflow-y-auto divide-y divide-slate-100">
          {filteredWords.length > 0 ? (
            filteredWords.map((word) => (
              <div key={word.id} className="py-3.5 first:pt-0 last:pb-0 hover:bg-teal-50/30 p-2 rounded-xl transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-extrabold text-slate-900">
                        {word.article ? `${word.article} ` : ''}{word.swedish}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-teal-100 text-[#007079] text-[10px] font-bold uppercase tracking-wider">
                        {word.wordClass}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        • {word.category}
                      </span>
                    </div>

                    {word.forms && (
                      <div className="text-xs text-slate-600 font-mono mt-0.5 flex items-center space-x-1">
                        <Layers className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>Böjning: {word.forms}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSpeak(word.swedish)}
                    className="p-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#007079] transition-colors flex items-center space-x-1 text-xs font-semibold"
                    title="Lyssna på uttal"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                    <span className="hidden sm:inline">Lyssna</span>
                  </button>
                </div>

                {/* Definition and Translation */}
                <div className="mt-2 text-xs text-slate-700">
                  <p className="font-medium text-slate-800">{word.definitionSv}</p>
                  
                  {/* Selected Language Translation in highlight box */}
                  <div className="mt-1.5 p-2 bg-amber-50/70 border border-amber-200/80 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">
                      {SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.flag} Översättning:
                    </span>
                    <span className="text-xs font-extrabold text-amber-950">
                      {word.translations[selectedLang] || 'Översättning finns ej'}
                    </span>
                  </div>

                  {/* Example sentence */}
                  <div className="mt-1.5 text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700">Exempel:</span> "{word.exampleSentence}"
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">Inget ord matchade din sökning "{searchTerm}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Prova att söka på t.ex. "arbete", "ansöka", "vårdcentral" eller välj ett annat språk.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Inbyggt lexikon för Liber Lunis</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition-colors"
          >
            Stäng
          </button>
        </div>
      </div>
    </div>
  );
};
