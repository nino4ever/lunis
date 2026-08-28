import React, { useState } from 'react';
import { StudentAssignment } from '../types';
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  User, 
  ArrowRight, 
  Play, 
  RotateCcw,
  Sparkles,
  Trophy
} from 'lucide-react';

interface AssignmentsViewProps {
  assignments: StudentAssignment[];
  onStartAssignment: (lessonId: string) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  onStartAssignment
}) => {
  const [filter, setFilter] = useState<'alla' | 'paborjad' | 'klar'>('alla');

  const filtered = assignments.filter(a => {
    if (filter === 'paborjad') return a.status !== 'klar';
    if (filter === 'klar') return a.status === 'klar';
    return true;
  });

  const completedCount = assignments.filter(a => a.status === 'klar').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-[#e60064] text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
              UPPGIFTER
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Lunis Elevportal
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Mina uppgifter & Inlämningar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Här ser du alla uppgifter som din sfi-lärare har tilldelat dig med inlämningsdatum och resultat.
          </p>
        </div>

        {/* Stats Widget */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-indigo-50 border border-indigo-200/80 rounded-2xl p-4 text-center min-w-28 shadow-xs">
            <div className="text-xl font-black text-indigo-600">{completedCount} / {assignments.length}</div>
            <div className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider mt-0.5">
              Klara uppgifter
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        {[
          { id: 'alla', label: `Alla uppgifter (${assignments.length})` },
          { id: 'paborjad', label: `Att göra (${assignments.length - completedCount})` },
          { id: 'klar', label: `Slutförda (${completedCount})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as 'alla' | 'paborjad' | 'klar')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === tab.id
                ? 'bg-[#4f46e5] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isDone = item.status === 'klar';

          return (
            <div 
              key={item.id}
              className={`bg-white rounded-3xl p-6 border transition-all ${
                isDone 
                  ? 'border-emerald-200/80 bg-emerald-50/10' 
                  : 'border-slate-100 hover:border-indigo-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {item.courseTitle}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-semibold">{item.chapterTitle}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Inlämning: <strong className="text-slate-700">{item.dueDate}</strong></span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Tilldelad av: {item.assignedBy}</span>
                    </span>
                  </div>

                  {/* Teacher Feedback if completed */}
                  {item.feedback && (
                    <div className="mt-3 p-3.5 bg-indigo-50/80 border border-indigo-200/80 rounded-2xl text-xs text-indigo-950 flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Lärarrespons:</span> "{item.feedback}"
                      </div>
                    </div>
                  )}
                </div>

                {/* Status & CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                  <div className="flex items-center space-x-2">
                    {isDone ? (
                      <span className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Klar ({item.score}%)</span>
                      </span>
                    ) : item.status === 'pagaende' ? (
                      <span className="flex items-center space-x-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>Påbörjad</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                        <span>Ej påbörjad</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onStartAssignment(item.lessonId)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                      isDone
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-[#4f46e5] hover:bg-indigo-700 text-white shadow-sm'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Repetera</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Starta uppgift</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
