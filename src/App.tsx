import { useState } from 'react';
import { 
  UserProfile, 
  Course, 
  CourseChapter, 
  StudentAssignment, 
  StudentSubmission, 
  TranslationLanguage,
  NavigationTab
} from './types';
import { COURSES_DATA, INITIAL_ASSIGNMENTS, INITIAL_SUBMISSIONS } from './data/coursesData';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { LessonReaderView } from './components/LessonReaderView';
import { CourseLibraryView } from './components/CourseLibraryView';
import { AssignmentsView } from './components/AssignmentsView';
import { VerbDictionaryView } from './components/VerbDictionaryView';
import { GrammarVerbsView } from './components/GrammarVerbsView';
import { DictionaryView } from './components/DictionaryView';
import { TeacherPortalView } from './components/TeacherPortalView';
import { LoginModal, DEMO_STUDENT, DEMO_TEACHER } from './components/LoginModal';
import { WordLookupModal } from './components/WordLookupModal';
import { NewAssignmentModal } from './components/NewAssignmentModal';
import { BookOpen, ExternalLink, HelpCircle, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  // Current User Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_STUDENT);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  
  // Course and Lesson Selection State
  const [courses] = useState<Course[]>(COURSES_DATA);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('sfi-c');
  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  
  const [selectedChapterId, setSelectedChapterId] = useState<string>(selectedCourse.chapters[0]?.id || 'c1');
  const selectedChapter = selectedCourse.chapters.find(ch => ch.id === selectedChapterId) || selectedCourse.chapters[0];
  
  const [selectedLessonId, setSelectedLessonId] = useState<string>(selectedChapter?.lessons[0]?.id || 'c1-l1');
  const selectedLesson = selectedChapter?.lessons.find(l => l.id === selectedLessonId) || selectedChapter?.lessons[0];

  // Data Collections State
  const [assignments, setAssignments] = useState<StudentAssignment[]>(INITIAL_ASSIGNMENTS);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(INITIAL_SUBMISSIONS);

  // User Preferences State
  const [audioRate, setAudioRate] = useState<number>(0.9);
  const [preferredLang, setPreferredLang] = useState<TranslationLanguage>('ar');

  // Modals State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWordLookupOpen, setIsWordLookupOpen] = useState(false);
  const [lookupWord, setLookupWord] = useState('');
  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);

  // Role Switcher Helper
  const handleToggleRole = () => {
    if (currentUser.role === 'student') {
      setCurrentUser(DEMO_TEACHER);
      setActiveTab('teacher');
    } else {
      setCurrentUser(DEMO_STUDENT);
      setActiveTab('dashboard');
    }
  };

  // Lesson Launchers
  const handleStartLesson = (chapterId: string, lessonId: string) => {
    setSelectedChapterId(chapterId);
    setSelectedLessonId(lessonId);
    setActiveTab('lesson');
  };

  const handleSelectLessonFromLibrary = (course: Course, chapter: CourseChapter, lessonId: string) => {
    setSelectedCourseId(course.id);
    setSelectedChapterId(chapter.id);
    setSelectedLessonId(lessonId);
    setActiveTab('lesson');
  };

  const handleStartAssignment = (lessonId: string) => {
    // Find chapter containing this lesson
    for (const ch of selectedCourse.chapters) {
      const foundLesson = ch.lessons.find(l => l.id === lessonId);
      if (foundLesson) {
        setSelectedChapterId(ch.id);
        setSelectedLessonId(lessonId);
        setActiveTab('lesson');
        return;
      }
    }
    // Fallback
    setActiveTab('lesson');
  };

  // Word Lookup Opener
  const handleOpenWordLookupWithWord = (word: string) => {
    setLookupWord(word);
    setIsWordLookupOpen(true);
  };

  // Complete Lesson Callback
  const handleCompleteLesson = () => {
    // Update assignments status if matching
    setAssignments(prev => prev.map(a => {
      if (a.lessonId === selectedLessonId) {
        return { ...a, status: 'klar', score: 100 };
      }
      return a;
    }));

    // Increment user points & minutes
    setCurrentUser(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + 50,
      weeklyCompletedMinutes: Math.min(prev.weeklyCompletedMinutes + 15, prev.weeklyGoalMinutes + 60)
    }));

    setActiveTab('dashboard');
  };

  // Teacher Grade Submission Callback
  const handleGradeSubmission = (
    id: string, 
    score: number, 
    note: string, 
    status: 'godkand' | 'komplettering'
  ) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status,
          score,
          teacherNote: note
        };
      }
      return s;
    }));
  };

  // Add Assignment Callback
  const handleAddAssignment = (newAssignment: StudentAssignment) => {
    setAssignments(prev => [newAssignment, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col justify-between selection:bg-[#4f46e5] selection:text-white">
      {/* Top Main Navigation Header */}
      <Header
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourseId}
        courses={courses}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenWordLookup={() => {
          setLookupWord('');
          setIsWordLookupOpen(true);
        }}
        onToggleRole={handleToggleRole}
        audioRate={audioRate}
        setAudioRate={setAudioRate}
        preferredLang={preferredLang}
        setPreferredLang={setPreferredLang}
      />

      {/* Main Container View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        {activeTab === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            selectedCourse={selectedCourse}
            assignments={assignments}
            onStartLesson={handleStartLesson}
            onOpenAssignments={() => setActiveTab('assignments')}
            onOpenLibrary={() => setActiveTab('library')}
            onOpenVerbs={() => setActiveTab('verbs')}
            onOpenGrammar={() => setActiveTab('grammar')}
            onOpenDictionary={() => setActiveTab('dictionary')}
            onOpenTeacherPortal={currentUser.role === 'teacher' ? () => setActiveTab('teacher') : undefined}
            preferredLang={preferredLang}
          />
        )}

        {activeTab === 'lesson' && selectedChapter && selectedLesson && (
          <LessonReaderView
            course={selectedCourse}
            chapter={selectedChapter}
            lesson={selectedLesson}
            onCompleteLesson={handleCompleteLesson}
            onSelectWord={handleOpenWordLookupWithWord}
            preferredLang={preferredLang}
            audioRate={audioRate}
          />
        )}

        {activeTab === 'library' && (
          <CourseLibraryView
            courses={courses}
            selectedCourse={selectedCourse}
            onSelectCourse={setSelectedCourseId}
            onSelectLesson={handleSelectLessonFromLibrary}
          />
        )}

        {activeTab === 'assignments' && (
          <AssignmentsView
            assignments={assignments}
            onStartAssignment={handleStartAssignment}
          />
        )}

        {activeTab === 'verbs' && (
          <VerbDictionaryView
            preferredLang={preferredLang}
            setPreferredLang={setPreferredLang}
            audioRate={audioRate}
            initialLevel="all"
            onOpenGrammarGuide={() => setActiveTab('grammar')}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarVerbsView
            preferredLang={preferredLang}
            setPreferredLang={setPreferredLang}
            audioRate={audioRate}
            initialLevel={selectedCourse.code.replace('SFI ', '').trim() as any || 'C'}
          />
        )}

        {activeTab === 'dictionary' && (
          <DictionaryView
            preferredLang={preferredLang}
            setPreferredLang={setPreferredLang}
            audioRate={audioRate}
            onOpenVerbs={() => setActiveTab('verbs')}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherPortalView
            submissions={submissions}
            onGradeSubmission={handleGradeSubmission}
            onOpenNewAssignment={() => setIsNewAssignmentOpen(true)}
            courses={courses}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="bg-[#e60064] text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
                LIBER
              </span>
              <span className="font-extrabold text-slate-800 tracking-tight">lunis.liber.se</span>
            </div>
            <span className="text-slate-300">|</span>
            <span>Digitalt läromedel för sfi och sva</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-semibold text-slate-600">
            <a 
              href="https://www.liber.se" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-600 flex items-center space-x-1 transition-colors"
            >
              <span>Liber.se</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="hover:text-indigo-600 transition-colors"
            >
              Inloggningshjälp
            </button>
            <button 
              onClick={() => setIsWordLookupOpen(true)}
              className="hover:text-indigo-600 transition-colors"
            >
              Flerspråkigt lexikon
            </button>
            <button 
              onClick={handleToggleRole}
              className="text-indigo-600 hover:text-indigo-800 hover:underline font-bold"
            >
              Växla till {currentUser.role === 'student' ? 'Lärarvy' : 'Elevvy'}
            </button>
          </div>

          <div className="text-slate-400 text-[11px] flex items-center space-x-1">
            <span>© {new Date().getFullYear()} Liber AB • Lunis Digital</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(user) => {
          setCurrentUser(user);
          if (user.role === 'teacher') {
            setActiveTab('teacher');
          } else {
            setActiveTab('dashboard');
          }
        }}
      />

      <WordLookupModal
        isOpen={isWordLookupOpen}
        onClose={() => setIsWordLookupOpen(false)}
        initialWord={lookupWord}
        preferredLang={preferredLang}
      />

      <NewAssignmentModal
        isOpen={isNewAssignmentOpen}
        onClose={() => setIsNewAssignmentOpen(false)}
        courses={courses}
        onAddAssignment={handleAddAssignment}
      />
    </div>
  );
}
