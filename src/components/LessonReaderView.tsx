import React, { useState, useEffect } from 'react';
import { ChapterLesson, CourseChapter, Course, TranslationLanguage, Exercise } from '../types';
import { DICTIONARY_WORDS } from '../data/dictionaryData';
import { speakSwedish, stopSpeaking, playSuccessSound, playErrorSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Mic, 
  MicOff, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Lightbulb, 
  Trophy, 
  FileText,
  Send,
  BookOpen
} from 'lucide-react';

interface LessonReaderViewProps {
  course: Course;
  chapter: CourseChapter;
  lesson: ChapterLesson;
  onCompleteLesson: () => void;
  onSelectWord: (word: string) => void;
  preferredLang: TranslationLanguage;
  audioRate: number;
}

export const LessonReaderView: React.FC<LessonReaderViewProps> = ({
  course,
  chapter,
  lesson,
  onCompleteLesson,
  onSelectWord,
  preferredLang,
  audioRate
}) => {
  const [activeMode, setActiveMode] = useState<'text' | 'exercises'>('text');
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [isPlayingFullText, setIsPlayingFullText] = useState(false);
  const [activePlayingParagraph, setActivePlayingParagraph] = useState<number | null>(null);

  // Exercise states
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fillBlankInput, setFillBlankInput] = useState('');
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedSwedishMatch, setSelectedSwedishMatch] = useState<string | null>(null);
  const [writingInput, setWritingInput] = useState('');
  const [isSubmittedWriting, setIsSubmittedWriting] = useState(false);

  // Speech recording state
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);

  // General evaluation feedback
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [lessonFinished, setLessonFinished] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);

  // Reset exercise state when moving to a new exercise
  useEffect(() => {
    setSelectedOption(null);
    setFillBlankInput('');
    setMatchedPairs({});
    setSelectedSwedishMatch(null);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setHasRecorded(false);
    setIsRecording(false);
    setSpeechFeedback(null);
    setIsSubmittedWriting(false);
  }, [currentExerciseIdx]);

  const currentExercise: Exercise | undefined = lesson.exercises[currentExerciseIdx];

  // Stop any audio when leaving view
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handlePlayParagraph = (paragraphText: string, pIdx: number) => {
    if (activePlayingParagraph === pIdx) {
      stopSpeaking();
      setActivePlayingParagraph(null);
    } else {
      setActivePlayingParagraph(pIdx);
      speakSwedish(paragraphText, audioRate, () => {
        setActivePlayingParagraph(null);
      });
    }
  };

  const handlePlayFullText = () => {
    if (isPlayingFullText) {
      stopSpeaking();
      setIsPlayingFullText(false);
      setActivePlayingParagraph(null);
    } else {
      if (!lesson.readingText) return;
      setIsPlayingFullText(true);
      const fullText = lesson.readingText.paragraphs.join(' ');
      speakSwedish(fullText, audioRate, () => {
        setIsPlayingFullText(false);
      });
    }
  };

  // Evaluation Handler
  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    if (currentExercise.type === 'multiple_choice' || currentExercise.type === 'listening_comprehension') {
      const correct = selectedOption === currentExercise.correctIndex;
      setIsCorrect(correct);
      setIsAnswerChecked(true);
      if (correct) {
        playSuccessSound();
        setScoreCount(prev => prev + 1);
      } else {
        playErrorSound();
      }
    } else if (currentExercise.type === 'fill_blank') {
      const cleaned = fillBlankInput.trim().toLowerCase();
      const match = currentExercise.correctAnswers.some(ans => ans.toLowerCase() === cleaned);
      setIsCorrect(match);
      setIsAnswerChecked(true);
      if (match) {
        playSuccessSound();
        setScoreCount(prev => prev + 1);
      } else {
        playErrorSound();
      }
    } else if (currentExercise.type === 'matching') {
      const allMatched = currentExercise.pairs.every(p => matchedPairs[p.swedish] === p.translation);
      setIsCorrect(allMatched);
      setIsAnswerChecked(true);
      if (allMatched) {
        playSuccessSound();
        setScoreCount(prev => prev + 1);
      } else {
        playErrorSound();
      }
    } else if (currentExercise.type === 'speech_pronunciation') {
      setIsCorrect(true);
      setIsAnswerChecked(true);
      playSuccessSound();
      setScoreCount(prev => prev + 1);
    } else if (currentExercise.type === 'writing') {
      setIsSubmittedWriting(true);
      setIsCorrect(true);
      setIsAnswerChecked(true);
      playSuccessSound();
      setScoreCount(prev => prev + 1);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIdx < lesson.exercises.length - 1) {
      setCurrentExerciseIdx(prev => prev + 1);
    } else {
      setLessonFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onCompleteLesson();
    }
  };

  const handleMatchingClick = (type: 'swedish' | 'translation', val: string) => {
    if (type === 'swedish') {
      setSelectedSwedishMatch(val);
      speakSwedish(val, audioRate);
    } else if (type === 'translation' && selectedSwedishMatch) {
      setMatchedPairs(prev => ({
        ...prev,
        [selectedSwedishMatch]: val
      }));
      setSelectedSwedishMatch(null);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
      setSpeechFeedback('Inspelning slutförd! Ditt uttal matchar svenskt prosodi och satsmelodi mycket väl.');
    } else {
      setIsRecording(true);
      setSpeechFeedback(null);
      setTimeout(() => {
        setIsRecording(false);
        setHasRecorded(true);
        setSpeechFeedback('Utmärkt! Systemet har fångat ditt tal med god tydlighet.');
      }, 3500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Navigation Breadcrumb & Toolbar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
            <span>{course.code}</span>
            <span>›</span>
            <span>Kapitel {chapter.number}</span>
            <span>›</span>
            <span className="text-[#4f46e5]">{chapter.title}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
            {lesson.title}
          </h1>
          <p className="text-xs text-slate-500">{lesson.subtitle}</p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-2xl self-start sm:self-center">
          <button
            onClick={() => setActiveMode('text')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeMode === 'text'
                ? 'bg-white text-[#4f46e5] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lärobok & Text</span>
          </button>
          <button
            onClick={() => setActiveMode('exercises')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeMode === 'exercises'
                ? 'bg-[#4f46e5] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Övningar ({lesson.exercises.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeMode === 'text' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Swedish Text with Audio & Click-to-lookup */}
          <div className="lg:col-span-2 space-y-6">
            {lesson.readingText ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-black text-slate-900">
                    {lesson.readingText.title}
                  </h2>
                  <button
                    onClick={handlePlayFullText}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                      isPlayingFullText
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-indigo-50 text-[#4f46e5] hover:bg-indigo-100 border border-indigo-200'
                    }`}
                  >
                    {isPlayingFullText ? (
                      <>
                        <VolumeX className="w-4 h-4 text-red-600" />
                        <span>Stoppa uppläsning</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-[#4f46e5]" />
                        <span>Lyssna på hela texten</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  {lesson.readingText.paragraphs.map((p, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-2xl transition-all relative group ${
                        activePlayingParagraph === idx 
                          ? 'bg-indigo-50/80 border border-indigo-300 ring-2 ring-indigo-200/50' 
                          : 'bg-slate-50/60 hover:bg-slate-50 border border-slate-200/60'
                      }`}
                    >
                      <button
                        onClick={() => handlePlayParagraph(p, idx)}
                        className="absolute right-3 top-3 p-1.5 rounded-lg bg-white shadow-xs border border-slate-200 text-slate-500 hover:text-[#4f46e5] opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Lyssna på detta stycke"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Render text with clickable words for instant translation */}
                      <p className="text-sm sm:text-base leading-relaxed text-slate-800 pr-8">
                        {p.split(' ').map((rawWord, wIdx) => {
                          const cleanWord = rawWord.replace(/[,.!?"]/g, '').toLowerCase();
                          const isKeyWord = lesson.readingText?.vocabularyIds.some(id => {
                            const found = DICTIONARY_WORDS.find(d => d.id === id);
                            return found && found.swedish.toLowerCase() === cleanWord;
                          });

                          return (
                            <span
                              key={wIdx}
                              onClick={() => {
                                speakSwedish(cleanWord, audioRate);
                                onSelectWord(cleanWord);
                              }}
                              className={`inline-block mr-1.5 px-0.5 rounded cursor-pointer transition-colors ${
                                isKeyWord
                                  ? 'bg-amber-100 text-amber-950 font-semibold underline decoration-amber-400 hover:bg-amber-200'
                                  : 'hover:bg-indigo-100 hover:text-[#4f46e5]'
                              }`}
                              title="Klicka för uttal och översättning"
                            >
                              {rawWord}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Markerade ord finns i ditt flerspråkiga lexikon</span>
                  </span>
                  <button
                    onClick={() => setActiveMode('exercises')}
                    className="bg-[#4f46e5] hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-sm cursor-pointer self-start sm:self-auto"
                  >
                    <span>Gå till övningar ({lesson.exercises.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center shadow-sm">
                <p className="text-slate-600">Ingen separat textlektion för detta avsnitt. Klicka på "Övningar" ovan.</p>
              </div>
            )}
          </div>

          {/* Right 1 Col: Grammar Focus & Key Words */}
          <div className="space-y-6">
            {/* Grammar Focus Box */}
            {lesson.grammarFocus && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center space-x-2 text-purple-700 font-extrabold text-xs uppercase tracking-wider mb-2">
                  <Lightbulb className="w-4 h-4 text-purple-600" />
                  <span>Grammatikfokus</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {lesson.grammarFocus.ruleTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 bg-purple-50/70 p-3 rounded-2xl border border-purple-100">
                  {lesson.grammarFocus.ruleSummary}
                </p>

                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Exempel:
                  </div>
                  {lesson.grammarFocus.examples.map((ex, exIdx) => (
                    <div 
                      key={exIdx} 
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs"
                    >
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>{ex.swedish}</span>
                        <button 
                          onClick={() => speakSwedish(ex.swedish, audioRate)}
                          className="text-purple-700 hover:text-purple-900 p-0.5 cursor-pointer"
                          title="Lyssna"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{ex.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Vocabulary Mini Box */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Nya ord i denna lektion</span>
              </h3>
              <div className="space-y-2">
                {DICTIONARY_WORDS.slice(0, 4).map((w) => (
                  <div 
                    key={w.id}
                    onClick={() => onSelectWord(w.swedish)}
                    className="p-2.5 bg-slate-50 hover:bg-indigo-50/70 rounded-xl border border-slate-200/60 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-800">{w.swedish}</span>
                      <div className="text-[11px] text-indigo-700 font-semibold">
                        {w.translations[preferredLang] || w.translations.en}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakSwedish(w.swedish, audioRate);
                      }}
                      className="p-1 text-slate-400 hover:text-[#4f46e5] cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Exercises Mode */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          {/* Exercise Progress Header */}
          {!lessonFinished ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Övning {currentExerciseIdx + 1} av {lesson.exercises.length}</span>
                <span className="text-[#4f46e5]">{scoreCount} rätta svar</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentExerciseIdx + 1) / lesson.exercises.length) * 100}%` }}
                />
              </div>
            </div>
          ) : null}

          {/* Exercise Body */}
          {!lessonFinished && currentExercise ? (
            <div className="space-y-6">
              {/* Type 1: Multiple Choice or Listening */}
              {(currentExercise.type === 'multiple_choice' || currentExercise.type === 'listening_comprehension') && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-[#4f46e5] text-xs font-bold uppercase tracking-wider">
                      {currentExercise.type === 'listening_comprehension' ? '🎧 Hörförståelse' : '📖 Flervalsfråga'}
                    </span>

                    {currentExercise.type === 'listening_comprehension' && (
                      <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex items-center justify-between my-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-[#4f46e5] text-white flex items-center justify-center">
                            <Volume2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Lyssna på ljudinspelningen</div>
                            <div className="text-[11px] text-slate-500">Klicka för att spela upp dialogen</div>
                          </div>
                        </div>
                        <button
                          onClick={() => speakSwedish(currentExercise.audioScript, audioRate)}
                          className="bg-[#4f46e5] hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Spela upp</span>
                        </button>
                      </div>
                    )}

                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {currentExercise.prompt}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {currentExercise.options.map((option, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                      if (isAnswerChecked) {
                        if (optIdx === currentExercise.correctIndex) {
                          optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'bg-red-50 border-red-300 text-red-900';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-indigo-50 border-[#4f46e5] text-[#4f46e5] ring-2 ring-indigo-200 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswerChecked}
                          onClick={() => setSelectedOption(optIdx)}
                          className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{option}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakSwedish(option, audioRate);
                            }}
                            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                            title="Lyssna på alternativet"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Type 2: Fill Blank */}
              {currentExercise.type === 'fill_blank' && (
                <div className="space-y-5">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider">
                    ✍️ Fyll i rätt form av ordet
                  </span>
                  
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Skriv rätt ordform i luckan:
                  </h2>

                  <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl text-base sm:text-lg text-slate-800 leading-loose flex flex-wrap items-center gap-2">
                    {currentExercise.sentenceWithBlank.split('___').map((part, pIdx, arr) => (
                      <React.Fragment key={pIdx}>
                        <span>{part}</span>
                        {pIdx < arr.length - 1 && (
                          <input
                            type="text"
                            value={fillBlankInput}
                            disabled={isAnswerChecked}
                            onChange={(e) => setFillBlankInput(e.target.value)}
                            placeholder="skriv här..."
                            className={`px-3 py-1.5 text-sm font-bold rounded-xl border-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] ${
                              isAnswerChecked
                                ? isCorrect
                                  ? 'border-emerald-500 text-emerald-800 bg-emerald-50'
                                  : 'border-red-500 text-red-800 bg-red-50'
                                : 'border-slate-300'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {currentExercise.hint && (
                    <div className="flex items-center space-x-2 text-xs text-amber-800 bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                      <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span><strong>Tips:</strong> {currentExercise.hint}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Type 3: Matching Pairs */}
              {currentExercise.type === 'matching' && (
                <div className="space-y-5">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider">
                    🔄 Matcha ord och betydelse
                  </span>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {currentExercise.prompt}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Swedish Words Column */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Svenska ord
                      </div>
                      {currentExercise.pairs.map((pair) => {
                        const isSelected = selectedSwedishMatch === pair.swedish;
                        const isMatched = !!matchedPairs[pair.swedish];

                        return (
                          <button
                            key={pair.swedish}
                            disabled={isAnswerChecked}
                            onClick={() => handleMatchingClick('swedish', pair.swedish)}
                            className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              isMatched
                                ? 'bg-indigo-50/70 border-indigo-300 text-indigo-700'
                                : isSelected
                                ? 'bg-[#4f46e5] text-white shadow-sm'
                                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <span>{pair.swedish}</span>
                            {isMatched && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Translations Column */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Betydelse / Förklaring
                      </div>
                      {currentExercise.pairs.map((pair) => {
                        const isTargetMatched = Object.values(matchedPairs).includes(pair.translation);

                        return (
                          <button
                            key={pair.translation}
                            disabled={isAnswerChecked || !selectedSwedishMatch}
                            onClick={() => handleMatchingClick('translation', pair.translation)}
                            className={`w-full p-3.5 rounded-2xl border text-left text-xs font-medium transition-all cursor-pointer ${
                              isTargetMatched
                                ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                                : selectedSwedishMatch
                                ? 'bg-white border-indigo-400 hover:bg-indigo-50 text-slate-800'
                                : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {pair.translation}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Type 4: Speech & Pronunciation Practice */}
              {currentExercise.type === 'speech_pronunciation' && (
                <div className="space-y-5">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    🗣️ Muntligt uttal & Tala svenska
                  </span>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {currentExercise.prompt}
                  </h2>

                  <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-3xl text-center space-y-4">
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      "{currentExercise.phraseToSpeak}"
                    </div>

                    {currentExercise.phoneticHint && (
                      <div className="text-xs text-slate-500 font-mono">
                        Uttal: {currentExercise.phoneticHint}
                      </div>
                    )}

                    <div className="flex items-center justify-center space-x-3 pt-2">
                      <button
                        onClick={() => speakSwedish(currentExercise.phraseToSpeak, audioRate)}
                        className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4 text-indigo-600" />
                        <span>Lyssna på förebild</span>
                      </button>

                      <button
                        onClick={toggleRecording}
                        className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                          isRecording
                            ? 'bg-red-600 text-white animate-pulse'
                            : hasRecorded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#4f46e5] text-white hover:bg-indigo-700'
                        }`}
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="w-4 h-4" />
                            <span>Spelar in... Tala nu</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4" />
                            <span>{hasRecorded ? 'Spela in igen' : 'Spela in ditt uttal'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {speechFeedback && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl font-medium">
                        ✓ {speechFeedback}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Type 5: Writing Task */}
              {currentExercise.type === 'writing' && (
                <div className="space-y-5">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
                    📝 Skrivuppgift & Inlämning
                  </span>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {currentExercise.prompt}
                  </h2>

                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                    <div className="text-xs font-bold text-slate-700">Hjälpfrågor att besvara i din text:</div>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                      {currentExercise.guidingQuestions.map((q, qIdx) => (
                        <li key={qIdx}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <textarea
                      rows={5}
                      value={writingInput}
                      onChange={(e) => setWritingInput(e.target.value)}
                      placeholder="Skriv din text här på svenska..."
                      disabled={isSubmittedWriting}
                      className="w-full p-4 text-xs sm:text-sm bg-white border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>Minst {currentExercise.minWords} ord</span>
                      <span>{writingInput.trim().split(/\s+/).filter(Boolean).length} ord skrivna</span>
                    </div>
                  </div>

                  {isSubmittedWriting && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-2">
                      <div className="font-bold flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Inlämning mottagen och skickad till läraren!</span>
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        Läraren Karin kommer att granska din text och ge kommentarer.
                      </p>
                      <div className="pt-2 border-t border-emerald-200/80">
                        <div className="font-semibold text-slate-800">Exempel på välformulerad text:</div>
                        <div className="italic text-slate-600 text-[11px] mt-0.5">
                          "{currentExercise.sampleAnswer}"
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback and Evaluation Banner */}
              {isAnswerChecked && (
                <div className={`p-4 rounded-2xl text-xs flex items-start space-x-3 ${
                  isCorrect
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                    : 'bg-red-50 border border-red-200 text-red-950'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-extrabold text-sm">
                      {isCorrect ? 'Rätt svar! Snyggt jobbat.' : 'Inte helt rätt den här gången.'}
                    </div>
                    {currentExercise.type !== 'speech_pronunciation' && currentExercise.type !== 'writing' && 'explanation' in currentExercise && (
                      <p className="mt-1 text-[11px] leading-relaxed opacity-90">
                        {currentExercise.explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (currentExerciseIdx > 0) {
                      setCurrentExerciseIdx(prev => prev - 1);
                    } else {
                      setActiveMode('text');
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center space-x-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Föregående</span>
                </button>

                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={
                      (currentExercise.type === 'multiple_choice' && selectedOption === null) ||
                      (currentExercise.type === 'fill_blank' && !fillBlankInput.trim()) ||
                      (currentExercise.type === 'writing' && writingInput.trim().length < 10)
                    }
                    className="bg-[#4f46e5] hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Rätta svar</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextExercise}
                    className="bg-[#4f46e5] hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-2 cursor-pointer"
                  >
                    <span>
                      {currentExerciseIdx < lesson.exercises.length - 1 ? 'Nästa övning' : 'Avsluta lektion'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : null}

          {/* Lesson Finished Celebration */}
          {lessonFinished && (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto ring-8 ring-indigo-50">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-1 max-w-md mx-auto">
                <h2 className="text-2xl font-black text-slate-900">Bra jobbat! Lektionen är klar.</h2>
                <p className="text-xs text-slate-600">
                  Du har slutfört alla övningar i <span className="font-bold text-slate-800">{lesson.title}</span> och tjänat +50 poäng till ditt veckomål.
                </p>
              </div>

              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={() => {
                    setLessonFinished(false);
                    setCurrentExerciseIdx(0);
                    setActiveMode('text');
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repetera texten</span>
                </button>

                <button
                  onClick={onCompleteLesson}
                  className="px-6 py-2.5 bg-[#4f46e5] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Tillbaka till startsidan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
