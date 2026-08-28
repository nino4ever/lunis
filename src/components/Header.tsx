import React from 'react';
import { UserProfile, TranslationLanguage, Course, NavigationTab } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/dictionaryData';
import { 
  BookOpen, 
  Home, 
  Library, 
  CheckSquare, 
  Languages, 
  GraduationCap, 
  Volume2, 
  LogOut, 
  User, 
  ChevronDown,
  Sparkles,
  Flame
} from 'lucide-react';

interface HeaderProps {
  currentUser: UserProfile;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedCourse: Course;
  onSelectCourse: (courseId: string) => void;
  courses: Course[];
  onOpenLogin: () => void;
  onOpenWordLookup: () => void;
  onToggleRole: () => void;
  audioRate: number;
  setAudioRate: (rate: number) => void;
  preferredLang: TranslationLanguage;
  setPreferredLang: (lang: TranslationLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  selectedCourse,
  onSelectCourse,
  courses,
  onOpenLogin,
  onOpenWordLookup,
  onToggleRole,
  audioRate,
  setAudioRate,
  preferredLang,
  setPreferredLang
}) => {
  const [courseDropdownOpen, setCourseDropdownOpen] = React.useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === preferredLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Banner with Liber & Lunis identity in Vibrant Palette */}
      <div className="bg-[#4338ca] text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="bg-[#e60064] text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
            LIBER
          </span>
          <span className="text-indigo-100 font-medium hidden sm:inline">
            Digitalt läromedel för sfi och svenska som andraspråk
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Audio speed indicator */}
          <div className="flex items-center space-x-1.5 bg-indigo-950/50 px-2.5 py-0.5 rounded-lg text-[11px] text-indigo-100">
            <Volume2 className="w-3.5 h-3.5 text-indigo-300" />
            <span>Taltempo:</span>
            <select
              value={audioRate}
              onChange={(e) => setAudioRate(parseFloat(e.target.value))}
              aria-label="Taltempo för uppläsning"
              className="bg-transparent text-white font-semibold cursor-pointer outline-none"
            >
              <option value="0.75" className="text-slate-800">0.75x Långsamt</option>
              <option value="0.9" className="text-slate-800">0.9x Normalt sfi</option>
              <option value="1.0" className="text-slate-800">1.0x Flytande</option>
            </select>
          </div>

          {/* Translation helper trigger */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-1 hover:text-indigo-200 transition-colors py-0.5 px-1.5 rounded"
            >
              <span className="text-sm">{activeLangObj.flag}</span>
              <span className="hidden md:inline font-medium">{activeLangObj.label.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-indigo-300" />
            </button>

            {langDropdownOpen && (
              <div 
                className="absolute right-0 mt-1 w-52 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Översättningsspråk (9 språk)
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setPreferredLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      preferredLang === lang.code ? 'font-bold text-indigo-600 bg-indigo-50/70' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {preferredLang === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick role switcher */}
          <button
            onClick={onToggleRole}
            className="text-[11px] bg-indigo-600/90 hover:bg-indigo-500 px-2.5 py-0.5 rounded-lg text-white font-medium flex items-center space-x-1.5 transition-colors"
            title="Växla mellan elevvy och lärarvy för demonstration"
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-200" />
            <span className="hidden sm:inline">Växla roll:</span>
            <span className="underline font-bold">{currentUser.role === 'student' ? 'Elev' : 'Lärare'}</span>
          </button>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Course Picker */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-2.5 focus:outline-none group text-left cursor-pointer"
            >
              {/* Lunis emblem */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow">
                <span className="font-extrabold text-xl tracking-tighter text-amber-300">L</span>
                <span className="font-extrabold text-sm text-white -ml-0.5">u</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-2xl font-black tracking-tight text-[#4f46e5]">lunis</span>
                  <span className="bg-[#e60064] text-white font-black text-[9px] px-1 py-0.2 rounded uppercase">
                    liber
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 -mt-1 hidden sm:block">
                  Sfi Digitalt Läromedel
                </p>
              </div>
            </button>

            {/* Course Selector dropdown */}
            <div className="relative">
              <button
                onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-xs font-semibold text-slate-800 transition-colors border border-slate-200/60"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedCourse.color }} />
                <span>{selectedCourse.code}: {selectedCourse.title.split('-')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {courseDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100"
                  onMouseLeave={() => setCourseDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Välj kurs / läromedel
                  </div>
                  {courses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => {
                        onSelectCourse(course.id);
                        setCourseDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-start space-x-2.5 transition-colors ${
                        selectedCourse.id === course.id ? 'bg-indigo-50/70 font-semibold' : ''
                      }`}
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" 
                        style={{ backgroundColor: course.color }}
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-800">{course.title}</div>
                        <div className="text-[11px] text-slate-500">{course.level}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#4f46e5] text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Startsida</span>
            </button>

            <button
              onClick={() => setActiveTab('lesson')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'lesson'
                  ? 'bg-[#4f46e5] text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Övningar & Texter</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'library'
                  ? 'bg-[#4f46e5] text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
              }`}
            >
              <Library className="w-4 h-4" />
              <span>Bibliotek</span>
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                activeTab === 'assignments'
                  ? 'bg-[#4f46e5] text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Mina uppgifter</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2"></span>
            </button>

            <button
              onClick={() => setActiveTab('verbs')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'verbs'
                  ? 'bg-[#4f46e5] text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Verblexikon (A-D)</span>
            </button>

            <button
              onClick={() => setActiveTab('grammar')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'grammar'
                  ? 'bg-[#4f46e5] text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Grammatikguide</span>
            </button>

            <button
              onClick={() => setActiveTab('dictionary')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dictionary'
                  ? 'bg-[#4f46e5] text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>Ordbok & Glosor</span>
            </button>

            {currentUser.role === 'teacher' && (
              <button
                onClick={() => setActiveTab('teacher')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'teacher'
                    ? 'bg-amber-500 text-slate-900 shadow-sm'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Lärarportal</span>
              </button>
            )}
          </nav>

          {/* Right Actions: Quick Word Search, Streak & Profile */}
          <div className="flex items-center space-x-3">
            {/* Quick Word Lookup Button */}
            <button
              onClick={onOpenWordLookup}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl border border-slate-200/80 transition-colors"
              title="Slå upp ett svenskt ord och lyssna på uttal"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Slå upp ord</span>
            </button>

            {/* Streak indicator */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{currentUser.studyStreakDays} dagar</span>
            </div>

            {/* User Profile avatar dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-500/30 transition-all focus:outline-none cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-indigo-200"
                />
                <div className="hidden xl:block text-left text-xs">
                  <div className="font-bold text-slate-800 leading-tight">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-500">
                    {currentUser.role === 'teacher' ? 'Lärare (SFI)' : currentUser.courseLevel}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:block" />
              </button>

              {userMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="font-bold text-sm text-slate-900">{currentUser.name}</div>
                    <div className="text-xs text-slate-500">{currentUser.email}</div>
                    <div className="mt-1 text-[11px] text-indigo-700 font-semibold flex items-center space-x-1">
                      <span>Skola:</span>
                      <span>{currentUser.school}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Min profil & Framsteg</span>
                    </button>
                    <button
                      onClick={() => {
                        onToggleRole();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      <span>Växla till {currentUser.role === 'student' ? 'Lärarvy' : 'Elevvy'}</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        onOpenLogin();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Byt användare / Logga in</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-200 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
              activeTab === 'dashboard' ? 'bg-[#4f46e5] text-white' : 'text-slate-600'
            }`}
          >
            Startsida
          </button>
          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
              activeTab === 'lesson' ? 'bg-[#4f46e5] text-white' : 'text-slate-600'
            }`}
          >
            Övningar
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
              activeTab === 'library' ? 'bg-[#4f46e5] text-white' : 'text-slate-600'
            }`}
          >
            Bibliotek
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
              activeTab === 'assignments' ? 'bg-[#4f46e5] text-white' : 'text-slate-600'
            }`}
          >
            Uppgifter
          </button>
          <button
            onClick={() => setActiveTab('verbs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
              activeTab === 'verbs' ? 'bg-[#4f46e5] text-white' : 'text-slate-600'
            }`}
          >
            Verblexikon
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
              activeTab === 'grammar' ? 'bg-[#4f46e5] text-white' : 'text-slate-600'
            }`}
          >
            Grammatik
          </button>
          <button
            onClick={() => setActiveTab('dictionary')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
              activeTab === 'dictionary' ? 'bg-[#4f46e5] text-white' : 'text-slate-600'
            }`}
          >
            Ordbok
          </button>
          {currentUser.role === 'teacher' && (
            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
                activeTab === 'teacher' ? 'bg-amber-500 text-slate-900' : 'text-amber-800'
              }`}
            >
              Lärarvy
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
