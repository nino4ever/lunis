import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { Lock, Mail, ArrowRight, ShieldCheck, BookOpen, GraduationCap, X, School } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const DEMO_STUDENT: UserProfile = {
  id: 'usr-student-1',
  name: 'Fatima Al-Mansoor',
  email: 'fatima.almansoor@vuxenutbildning.se',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
  courseLevel: 'SFI Kurs C (Studieväg 2/3)',
  school: 'Komvux Vuxenutbildning Stockholm',
  studyStreakDays: 12,
  weeklyGoalMinutes: 120,
  weeklyCompletedMinutes: 85,
  totalPoints: 1450,
  preferredTranslationLang: 'ar'
};

export const DEMO_TEACHER: UserProfile = {
  id: 'usr-teacher-1',
  name: 'Karin Lindqvist',
  email: 'karin.lindqvist@skola.stockholm.se',
  role: 'teacher',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
  courseLevel: 'Lärare i SFI & SVA',
  school: 'Komvux Vuxenutbildning Stockholm',
  studyStreakDays: 45,
  weeklyGoalMinutes: 300,
  weeklyCompletedMinutes: 280,
  totalPoints: 3800,
  preferredTranslationLang: 'en'
};

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<'konto' | 'skolfederation'>('konto');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'teacher') {
      onLogin({
        ...DEMO_TEACHER,
        email: email || DEMO_TEACHER.email
      });
    } else {
      onLogin({
        ...DEMO_STUDENT,
        email: email || DEMO_STUDENT.email
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-800 px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-indigo-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Stäng inloggning"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-[#e60064] text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
              LIBER
            </span>
            <span className="text-xs font-semibold text-indigo-100 uppercase tracking-wider">
              Lunis Inloggning
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">Logga in på Lunis</h2>
          <p className="text-xs text-indigo-100 mt-1">
            Välkommen till ditt digitala läromedel i sfi och svenska som andraspråk.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3">
          <button
            onClick={() => setActiveTab('konto')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'konto'
                ? 'border-[#4f46e5] text-[#4f46e5]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Liber-konto / E-post
          </button>
          <button
            onClick={() => setActiveTab('skolfederation')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'skolfederation'
                ? 'border-[#4f46e5] text-[#4f46e5]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>Skolfederation</span>
          </button>
        </div>

        <div className="p-6">
          {/* Quick Demo Selector */}
          <div className="mb-5 bg-indigo-50/70 border border-indigo-200/70 rounded-2xl p-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 mb-2 flex items-center justify-between">
              <span>Snabbval för demo / test</span>
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onLogin(DEMO_STUDENT);
                  onClose();
                }}
                className="flex items-center space-x-2 bg-white hover:bg-indigo-100/60 border border-indigo-200 px-2.5 py-2 rounded-xl text-left transition-colors group cursor-pointer"
              >
                <img
                  src={DEMO_STUDENT.avatar}
                  alt={DEMO_STUDENT.name}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-800 truncate group-hover:text-[#4f46e5]">
                    Elev: Fatima
                  </div>
                  <div className="text-[10px] text-slate-500">SFI Kurs C</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onLogin(DEMO_TEACHER);
                  onClose();
                }}
                className="flex items-center space-x-2 bg-white hover:bg-amber-100/60 border border-amber-200 px-2.5 py-2 rounded-xl text-left transition-colors group cursor-pointer"
              >
                <img
                  src={DEMO_TEACHER.avatar}
                  alt={DEMO_TEACHER.name}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-800 truncate group-hover:text-amber-800">
                    Lärare: Karin
                  </div>
                  <div className="text-[10px] text-slate-500">Lärarportal</div>
                </div>
              </button>
            </div>
          </div>

          {activeTab === 'konto' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-postadress eller användarnamn
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="namn.efternamn@skola.se"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Lösenord
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); }} className="text-[11px] font-semibold text-[#4f46e5] hover:underline">
                    Glömt lösenord?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-4 text-xs">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      checked={selectedRole === 'student'}
                      onChange={() => setSelectedRole('student')}
                      className="text-[#4f46e5] focus:ring-[#4f46e5]"
                    />
                    <span className="font-medium text-slate-700">Elev</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      checked={selectedRole === 'teacher'}
                      onChange={() => setSelectedRole('teacher')}
                      className="text-[#4f46e5] focus:ring-[#4f46e5]"
                    />
                    <span className="font-medium text-slate-700">Lärare</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4f46e5] hover:bg-indigo-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                <span>Logga in</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-3 py-2">
              <p className="text-xs text-slate-600">
                Logga in med din skolas eller kommuns federerade inloggning:
              </p>
              <button
                onClick={() => {
                  onLogin(DEMO_STUDENT);
                  onClose();
                }}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Stockholms stad (Skolplattformen)</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  onLogin(DEMO_STUDENT);
                  onClose();
                }}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Göteborgs stad Vuxenutbildning</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  onLogin(DEMO_STUDENT);
                  onClose();
                }}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Malmö Stad Skolfederation</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          )}

          {/* Bottom info */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Liber SFI Digital 2026</span>
            </span>
            <a 
              href="https://www.liber.se" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#4f46e5] hover:underline font-semibold"
            >
              Om Liber Lunis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
