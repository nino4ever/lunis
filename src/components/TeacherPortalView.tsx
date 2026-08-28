import React, { useState } from 'react';
import { StudentSubmission, Course } from '../types';
import { 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Plus, 
  MessageSquare, 
  Search, 
  Award, 
  ChevronRight,
  Volume2,
  Sparkles,
  Send,
  AlertCircle
} from 'lucide-react';
import { speakSwedish } from '../utils/audio';

interface TeacherPortalViewProps {
  submissions: StudentSubmission[];
  onGradeSubmission: (id: string, score: number, note: string, status: 'godkand' | 'komplettering') => void;
  onOpenNewAssignment: () => void;
  courses: Course[];
}

export const TeacherPortalView: React.FC<TeacherPortalViewProps> = ({
  submissions,
  onGradeSubmission,
  onOpenNewAssignment
}) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'roster' | 'analytics'>('submissions');
  const [selectedSubId, setSelectedSubId] = useState<string | null>(submissions[0]?.id || null);
  const [gradeInput, setGradeInput] = useState<number>(90);
  const [feedbackNote, setFeedbackNote] = useState<string>('');
  const [broadcastMessage, setBroadcastMessage] = useState<string>('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const selectedSubmission = submissions.find(s => s.id === selectedSubId);
  const pendingSubmissions = submissions.filter(s => s.status === 'behover_rattas');

  const handleGrade = (status: 'godkand' | 'komplettering') => {
    if (!selectedSubmission) return;
    onGradeSubmission(
      selectedSubmission.id,
      gradeInput,
      feedbackNote || (status === 'godkand' ? 'Bra jobbat! Välformulerat och korrekt.' : 'Vänligen utveckla svaret med fler meningar.'),
      status
    );
    setFeedbackNote('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastMessage('');
      setBroadcastSent(false);
    }, 3000);
  };

  const demoStudents = [
    { name: 'Fatima Al-Mansoor', email: 'fatima.almansoor@vux.se', level: 'SFI Kurs C', progress: 85, streak: 12, lastActive: 'I dag 09:45', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
    { name: 'Dmytro Kovalenko', email: 'dmytro.k@vux.se', level: 'SFI Kurs C', progress: 92, streak: 18, lastActive: 'I går 16:20', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
    { name: 'Amina Warsame', email: 'amina.w@vux.se', level: 'SFI Kurs B', progress: 74, streak: 8, lastActive: '24 aug 14:10', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80' },
    { name: 'Rami Haddad', email: 'rami.h@vux.se', level: 'SFI Kurs D', progress: 68, streak: 4, lastActive: '25 aug 11:30', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
    { name: 'Elena Petrova', email: 'elena.p@vux.se', level: 'SFI Kurs C', progress: 90, streak: 15, lastActive: 'I dag 08:15', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Teacher Banner */}
      <div className="bg-gradient-to-br from-indigo-700 via-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-[#e60064] text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wider uppercase">
              LIBER LUNIS
            </span>
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
              Lärar- och Administrationsportal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Klass SFI 2C & 3D (Stockholms Vuxenutbildning)
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-xl">
            Övervaka elevernas aktivitet, tilldela digitala läromedel och rätta inlämningar i realtid.
          </p>
        </div>

        <button
          onClick={onOpenNewAssignment}
          className="relative z-10 bg-white hover:bg-indigo-50 text-indigo-900 px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all shadow-md hover:shadow-lg shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-indigo-700" />
          <span>Dela ut ny uppgift</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Aktiva elever</span>
          </div>
          <div className="text-2xl font-black text-slate-900">24 st</div>
          <div className="text-[11px] text-indigo-700 font-semibold mt-1">19 inloggade denna vecka</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Att rätta</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{pendingSubmissions.length} st</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">Inlämningar väntar</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Genomförandegrad</span>
          </div>
          <div className="text-2xl font-black text-slate-900">82%</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">+6% jmf förra månaden</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>Studietid</span>
          </div>
          <div className="text-2xl font-black text-slate-900">48h 20m</div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">Totalt i klassen v. 35</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        {[
          { id: 'submissions', label: `Inlämningar att rätta (${pendingSubmissions.length})` },
          { id: 'roster', label: `Klasslista & Framsteg (${demoStudents.length})` },
          { id: 'analytics', label: 'Meddelanden & Blogg' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'submissions' | 'roster' | 'analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#4f46e5] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main View Area */}
      {activeTab === 'submissions' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Elevinlämningar ({submissions.length})
            </div>
            {submissions.map((sub) => {
              const isSelected = selectedSubId === sub.id;

              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-600/30'
                      : 'bg-white border-slate-100 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={sub.studentAvatar}
                      alt={sub.studentName}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {sub.studentName}
                        </h4>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          sub.status === 'behover_rattas'
                            ? 'bg-amber-100 text-amber-800'
                            : sub.status === 'godkand'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {sub.status === 'behover_rattas' ? 'Att rätta' : sub.status === 'godkand' ? 'Godkänd' : 'Komplettera'}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5 truncate">
                        {sub.assignmentTitle}
                      </p>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Inlämnad: {sub.submittedAt}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grading & Review Panel */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedSubmission.studentAvatar}
                      alt={selectedSubmission.studentName}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {selectedSubmission.studentName}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium">
                        {selectedSubmission.courseTitle} • {selectedSubmission.assignmentTitle}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 font-semibold">
                    {selectedSubmission.submittedAt}
                  </span>
                </div>

                {/* Student's Answer Box */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
                    <span>Elevens inlämnade text:</span>
                    {selectedSubmission.studentTextAnswer && (
                      <button
                        onClick={() => speakSwedish(selectedSubmission.studentTextAnswer || '', 0.9)}
                        className="text-xs text-indigo-600 font-bold hover:underline flex items-center space-x-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Läs upp elevens text</span>
                      </button>
                    )}
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                    "{selectedSubmission.studentTextAnswer || 'Ljudfil inspelad (muntligt uttal bedömt automatiskt med 95% exakthet).'}"
                  </div>
                </div>

                {/* Existing Teacher note if any */}
                {selectedSubmission.teacherNote && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950">
                    <strong>Tidigare kommentar:</strong> {selectedSubmission.teacherNote} (Betyg: {selectedSubmission.score}%)
                  </div>
                )}

                {/* Teacher Feedback Input Form */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700">
                    Ge feedback och bedömning till eleven:
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Poäng / Resultat (0-100%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradeInput}
                      onChange={(e) => setGradeInput(parseInt(e.target.value) || 0)}
                      className="w-28 px-3 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Lärarkommentar / Råd till eleven
                    </label>
                    <textarea
                      rows={3}
                      value={feedbackNote}
                      onChange={(e) => setFeedbackNote(e.target.value)}
                      placeholder="Skriv kommentar om grammatik, ordföljd eller uttal..."
                      className="w-full p-3 text-xs bg-slate-50 border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleGrade('komplettering')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      Be om komplettering
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGrade('godkand')}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm cursor-pointer"
                    >
                      Godkänn inlämning
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center text-slate-500 shadow-sm">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold">Välj en inlämning i listan för att granska</p>
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'roster' ? (
        /* Student Roster Table */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Elever i Klass SFI 2C ({demoStudents.length})</h3>
            <button 
              onClick={onOpenNewAssignment}
              className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              + Tilldela uppgift till alla
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="py-3 px-4">Elev</th>
                  <th className="py-3 px-4">Kursnivå</th>
                  <th className="py-3 px-4">Framsteg</th>
                  <th className="py-3 px-4">Streak</th>
                  <th className="py-3 px-4">Senast aktiv</th>
                  <th className="py-3 px-4 text-right">Åtgärd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {demoStudents.map((st, sIdx) => (
                  <tr key={sIdx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={st.avatar} alt={st.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-slate-900">{st.name}</div>
                        <div className="text-[10px] text-slate-400">{st.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{st.level}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: `${st.progress}%` }} />
                        </div>
                        <span className="font-bold text-slate-700">{st.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-amber-700">🔥 {st.streak} d</td>
                    <td className="py-3 px-4 text-slate-500">{st.lastActive}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-indigo-600 hover:underline font-bold cursor-pointer">
                        Visa profil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Broadcast & Classroom Blog */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-indigo-700" />
              <span>Skicka meddelande / uppmaning till klassen</span>
            </h3>
            <form onSubmit={handleSendBroadcast} className="space-y-3">
              <textarea
                rows={4}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Skriv ett meddelande till alla elever som visas på deras startsida i Lunis..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
              />
              <button
                type="submit"
                className="bg-[#4f46e5] hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publicera meddelande</span>
              </button>
            </form>

            {broadcastSent && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                ✓ Meddelandet har publicerats på elevernas startsida!
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Tidigare publicerade meddelanden</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="font-bold text-slate-800">Glöm inte inlämningen på fredag!</div>
                <div className="text-slate-600 mt-1">
                  Alla ska lämna in det personliga brevet i kapitel 1 senast kl 16:00.
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Publicerad 24 aug av Karin Lindqvist</div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="font-bold text-slate-800">Välkomna till höstterminen i sfi!</div>
                <div className="text-slate-600 mt-1">
                  Vi börjar terminen med tema Arbetsliv och svensk grammatik.
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Publicerad 18 aug av Karin Lindqvist</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
