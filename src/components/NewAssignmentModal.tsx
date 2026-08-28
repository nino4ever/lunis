import React, { useState } from 'react';
import { Course, StudentAssignment } from '../types';
import { X, Send, BookOpen, Calendar, CheckSquare, Users } from 'lucide-react';

interface NewAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onAddAssignment: (assignment: StudentAssignment) => void;
}

export const NewAssignmentModal: React.FC<NewAssignmentModalProps> = ({
  isOpen,
  onClose,
  courses,
  onAddAssignment
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'sfi-c');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('2026-09-10');
  const [targetGroup, setTargetGroup] = useState('Hela klassen (SFI 2C)');

  if (!isOpen) return null;

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const chapters = currentCourse.chapters;
  const [selectedChapterId, setSelectedChapterId] = useState(chapters[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chapter = chapters.find(ch => ch.id === selectedChapterId) || chapters[0];
    const newAss: StudentAssignment = {
      id: `ass-${Date.now()}`,
      title: title || `Träning: ${chapter.title}`,
      courseTitle: currentCourse.title.split('-')[0],
      chapterTitle: `Kapitel ${chapter.number}: ${chapter.title}`,
      lessonId: chapter.lessons[0]?.id || 'c1-l1',
      dueDate: dueDate || '2026-09-10',
      status: 'ej_paborjad',
      assignedBy: 'Karin Lindqvist (Lärare)'
    };
    onAddAssignment(newAss);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-800 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-[#e60064] text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
              LÄRARE
            </span>
            <h3 className="font-extrabold text-base text-white">Dela ut uppgift till elever</h3>
          </div>
          <button onClick={onClose} className="text-indigo-200 hover:text-white p-1 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kurs / Läromedel
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:outline-none"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Välj kapitel / lektion
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:outline-none"
            >
              {chapters.map(ch => (
                <option key={ch.id} value={ch.id}>Kapitel {ch.number}: {ch.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Uppgiftsnamn / Instruktion
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="t.ex. Läxa till torsdag: Ordföljd och personligt brev"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mottagare
              </label>
              <select
                value={targetGroup}
                onChange={(e) => setTargetGroup(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:outline-none"
              >
                <option>Hela klassen (SFI 2C)</option>
                <option>Enskild elev: Fatima</option>
                <option>Enskild elev: Dmytro</option>
                <option>Enskild elev: Amina</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sista inlämningsdatum
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="bg-[#4f46e5] hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dela ut uppgift</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
