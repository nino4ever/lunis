import React, { useState } from 'react';
import { Course, CourseChapter } from '../types';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Briefcase, 
  Users, 
  HeartPulse, 
  Scale, 
  Stethoscope, 
  ArrowRight,
  Filter
} from 'lucide-react';

interface CourseLibraryViewProps {
  courses: Course[];
  selectedCourse: Course;
  onSelectCourse: (courseId: string) => void;
  onSelectLesson: (course: Course, chapter: CourseChapter, lessonId: string) => void;
}

export const CourseLibraryView: React.FC<CourseLibraryViewProps> = ({
  courses,
  selectedCourse,
  onSelectCourse,
  onSelectLesson
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.chapters.some(ch => ch.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedLevelFilter === 'all' || c.code.toLowerCase().includes(selectedLevelFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getChapterIcon = (name: string) => {
    switch (name) {
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-indigo-600" />;
      case 'Users': return <Users className="w-4 h-4 text-sky-600" />;
      case 'HeartPulse': return <HeartPulse className="w-4 h-4 text-rose-600" />;
      case 'Scale': return <Scale className="w-4 h-4 text-purple-600" />;
      case 'Stethoscope': return <Stethoscope className="w-4 h-4 text-emerald-600" />;
      default: return <BookOpen className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-[#e60064] text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
            BIBLIOTEK
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Liber Lunis Läromedelsbank
          </span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Kurser & Läromedel i SFI och SVA
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Utforska alla kurser från Kurs A till Kurs D samt yrkesinriktad sfi med anpassade kapitel, texter, ljudinspelningar och självrättande övningar.
        </p>

        {/* Search and Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sök bland kurser, teman (t.ex. arbetsliv, vård, grammatik)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
            {[
              { id: 'all', label: 'Alla nivåer' },
              { id: 'SFI B', label: 'Kurs B' },
              { id: 'SFI C', label: 'Kurs C' },
              { id: 'SFI D', label: 'Kurs D' },
              { id: 'YRKES', label: 'Yrkes-SFI' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedLevelFilter(f.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedLevelFilter === f.id
                    ? 'bg-[#4f46e5] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const isSelected = selectedCourse.id === course.id;

          return (
            <div 
              key={course.id}
              className={`bg-white rounded-3xl border transition-all overflow-hidden flex flex-col justify-between ${
                isSelected 
                  ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/20' 
                  : 'border-slate-100 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Course Top Header */}
              <div className="p-6 sm:p-7 border-b border-slate-100">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <span 
                      className="px-2.5 py-1 rounded-md text-white text-[11px] font-black tracking-wider uppercase"
                      style={{ backgroundColor: course.color }}
                    >
                      {course.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{course.level}</span>
                  </div>

                  {isSelected && (
                    <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                      Aktiv kurs
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-black text-slate-900 mb-1">{course.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{course.description}</p>

                <div className="flex items-center space-x-4 text-[11px] text-slate-500 font-semibold">
                  <span className="flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.chapters.length} kapitel</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.totalLessons} lektioner</span>
                  </span>
                </div>
              </div>

              {/* Chapters list */}
              <div className="p-6 bg-slate-50/50 space-y-2.5 flex-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Innehåll i kursen:
                </div>
                {course.chapters.map((ch) => (
                  <div 
                    key={ch.id}
                    className="p-3.5 bg-white border border-slate-200/70 rounded-2xl hover:border-indigo-300 transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center shrink-0 transition-colors">
                        {getChapterIcon(ch.iconName)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          Kapitel {ch.number}: {ch.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {ch.lessons.length} lektioner • {ch.theme}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectCourse(course.id);
                        if (ch.lessons[0]) {
                          onSelectLesson(course, ch, ch.lessons[0].id);
                        }
                      }}
                      className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-2.5 py-1 rounded-xl transition-colors flex items-center space-x-1"
                    >
                      <span>Öppna</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Bottom footer button */}
              <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectCourse(course.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                      : 'bg-[#4f46e5] hover:bg-indigo-700 text-white shadow-sm'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      <span>Vald som aktiv kurs</span>
                    </>
                  ) : (
                    <span>Välj denna kurs</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
