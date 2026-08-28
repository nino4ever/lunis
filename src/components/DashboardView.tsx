import React from 'react';
import { UserProfile, Course, StudentAssignment, TranslationLanguage } from '../types';
import { 
  BookOpen, 
  Flame, 
  Clock, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Sparkles, 
  FileText, 
  Volume2, 
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';

interface DashboardViewProps {
  currentUser: UserProfile;
  selectedCourse: Course;
  assignments: StudentAssignment[];
  onStartLesson: (chapterId: string, lessonId: string) => void;
  onOpenAssignments: () => void;
  onOpenLibrary: () => void;
  onOpenVerbs?: () => void;
  onOpenGrammar?: () => void;
  onOpenDictionary: () => void;
  onOpenTeacherPortal?: () => void;
  preferredLang: TranslationLanguage;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  selectedCourse,
  assignments,
  onStartLesson,
  onOpenAssignments,
  onOpenLibrary,
  onOpenVerbs,
  onOpenGrammar,
  onOpenDictionary,
  onOpenTeacherPortal
}) => {
  const currentChapter = selectedCourse.chapters[0];
  const currentLesson = currentChapter?.lessons[0];
  const pendingAssignments = assignments.filter(a => a.status !== 'klar');
  const completedAssignments = assignments.filter(a => a.status === 'klar');

  const progressPercent = Math.round((currentUser.weeklyCompletedMinutes / currentUser.weeklyGoalMinutes) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner with Lunis Identity & Vibrant Palette Gradient */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-32 bottom-0 translate-y-16 w-48 h-48 rounded-full bg-amber-400/15 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="bg-[#e60064] text-white font-black text-[10px] px-2 py-0.5 rounded tracking-wider uppercase">
                LIBER LUNIS
              </span>
              <span className="text-indigo-200 text-xs font-semibold">
                {currentUser.school}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Hej {currentUser.name.split(' ')[0]}! Välkommen tillbaka.
            </h1>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
              Du studerar <span className="font-bold text-white">{selectedCourse.title}</span>. 
              Ditt mål denna vecka är {currentUser.weeklyGoalMinutes} minuters aktiv träning.
            </p>
          </div>

          {/* Quick Metrics Header */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/15 backdrop-blur-xs border border-white/20 rounded-2xl p-3 text-center min-w-24 shadow-sm">
              <div className="flex items-center justify-center space-x-1 text-amber-300">
                <Flame className="w-5 h-5 fill-amber-300" />
                <span className="text-lg font-black">{currentUser.studyStreakDays}</span>
              </div>
              <div className="text-[10px] font-semibold text-indigo-100 uppercase tracking-wider mt-0.5">
                Dagar i rad
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-xs border border-white/20 rounded-2xl p-3 text-center min-w-28 shadow-sm">
              <div className="flex items-center justify-center space-x-1 text-white">
                <Trophy className="w-5 h-5 text-amber-300" />
                <span className="text-lg font-black">{currentUser.totalPoints}</span>
              </div>
              <div className="text-[10px] font-semibold text-indigo-100 uppercase tracking-wider mt-0.5">
                Poäng
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Continue Learning & Active Chapters */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning Hero Card */}
          {currentChapter && currentLesson && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                    Pågående kapitel • {selectedCourse.code}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Kapitel {currentChapter.number} av {selectedCourse.chapters.length}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 mb-1">
                {currentChapter.title}
              </h2>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                Tema: <span className="font-semibold text-slate-800">{currentChapter.theme}</span>. 
                Träna på svensk ordföljd, uttal och läsförståelse anpassat för ditt vardags- och arbetsliv.
              </p>

              {/* Lesson Preview Box */}
              <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{currentLesson.title}</h3>
                    <p className="text-xs text-slate-500">{currentLesson.subtitle}</p>
                    <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-indigo-800 font-semibold">
                      <span className="flex items-center space-x-1">
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Med talsyntes</span>
                      </span>
                      <span>•</span>
                      <span>{currentLesson.exercises.length} självrättande övningar</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onStartLesson(currentChapter.id, currentLesson.id)}
                  className="bg-[#4f46e5] hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Öppna övning</span>
                </button>
              </div>

              {/* Progress bar inside card */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600 font-semibold">
                  <span>Kapitelframsteg</span>
                  <span>{currentChapter.completedCount || 3} av {currentChapter.totalCount || 4} lektioner klara</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Learning Hub Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">
                Snabblänkar & Moduler
              </h2>
              <button 
                onClick={onOpenLibrary}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center space-x-1"
              >
                <span>Visa alla kurser</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Module 1: Svenskt Verblexikon (Nivå A-D) */}
              <div 
                onClick={onOpenVerbs || onOpenGrammar}
                className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center space-x-1.5">
                    <span>Svenskt Verblexikon</span>
                    <span className="bg-emerald-100 text-emerald-900 font-bold text-[9px] px-1.5 py-0.2 rounded">Nivå B, C, D</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Komplett lista över alla svenska verb, böjningar (infinitiv, presens, preteritum, supinum, imperativ) och interaktiv tränare.
                  </p>
                </div>
              </div>

              {/* Module 2: Grammatik & Struktur */}
              <div 
                onClick={onOpenGrammar || (() => onStartLesson('c1', 'c1-l1'))}
                className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center space-x-1.5">
                    <span>Grammatikguide & Regler</span>
                    <span className="bg-amber-100 text-amber-900 font-bold text-[9px] px-1.5 py-0.2 rounded">Alla nivåer</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Komplett grammatik (V2-regeln, BIFF-regeln), verbgrupper, substantivböjning och ordföljd.
                  </p>
                </div>
              </div>

              {/* Module 2: Uttal & Talsyntes */}
              <div 
                onClick={() => onStartLesson('c1', 'c1-l1')}
                className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Uttalsträning & Röst
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Lyssna på modersmålstal och spela in ditt eget uttal med mikrofonen.
                  </p>
                </div>
              </div>

              {/* Module 3: Ordbok & Lexikon på 9 språk */}
              <div 
                onClick={onOpenDictionary}
                className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Lunis Ordbok & Glosor
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Sök bland sfi-glosor med översättning på 9 språk och ljudfiler.
                  </p>
                </div>
              </div>

              {/* Module 4: Skrivuppgifter */}
              <div 
                onClick={onOpenAssignments}
                className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Skrivuppgifter & Inlämningar
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Skriv brev och berättelser som granskas och betygsätts av din lärare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Weekly Goal, Assignments & Teacher message */}
        <div className="space-y-6">
          {/* Weekly Goal Progress Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Veckomål</span>
              </h2>
              <span className="text-xs font-extrabold text-indigo-600">{progressPercent}%</span>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <div>
                <span className="text-2xl font-black text-slate-900">
                  {currentUser.weeklyCompletedMinutes}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {' '}/ {currentUser.weeklyGoalMinutes} min
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">35 min kvar</span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>

            <div className="grid grid-cols-7 gap-1 text-center pt-2 border-t border-slate-100">
              {['M', 'T', 'O', 'T', 'F', 'L', 'S'].map((day, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-400 mb-1">{day}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    idx < 3 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : idx === 3 
                      ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-200' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {idx < 3 ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments Mini List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Mina uppgifter ({pendingAssignments.length})
              </h2>
              <button 
                onClick={onOpenAssignments}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Alla ({assignments.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingAssignments.slice(0, 3).map((ass) => (
                <div 
                  key={ass.id}
                  onClick={() => onStartLesson('c1', ass.lessonId)}
                  className="p-3 bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/70 hover:border-indigo-300 rounded-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 leading-tight">
                      {ass.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                      {ass.status === 'pagaende' ? 'Pågår' : 'Ej påbörjad'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Inlämning: {ass.dueDate}</span>
                    </span>
                    <span className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                      Starta →
                    </span>
                  </div>
                </div>
              ))}

              {completedAssignments.length > 0 && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center space-x-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{completedAssignments.length} klarade uppgifter</span>
                  </span>
                  <span className="font-bold text-slate-700">100% rätt</span>
                </div>
              )}
            </div>
          </div>

          {/* Teacher Info Notice */}
          <div className="bg-amber-50/90 border border-amber-200/80 rounded-3xl p-5 text-xs text-amber-900 shadow-xs">
            <div className="flex items-center space-x-2 font-bold mb-1.5 text-amber-950">
              <GraduationCap className="w-4 h-4 text-amber-700" />
              <span>Meddelande från läraren</span>
            </div>
            <p className="leading-relaxed text-amber-800 text-[11px]">
              "Hej alla i grupp 2C! Kom ihåg att läsa texten om Fatimas anställningsintervju och öva på V2-regeln inför lektionen på torsdag."
            </p>
            <div className="mt-2 text-[10px] text-amber-700 font-semibold">
              — Karin Lindqvist, sfi-lärare
            </div>
            {currentUser.role === 'teacher' && onOpenTeacherPortal && (
              <button
                onClick={onOpenTeacherPortal}
                className="mt-3 w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-xs"
              >
                Gå till Lärarportalen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
