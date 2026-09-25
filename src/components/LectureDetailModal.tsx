import React, { useState } from 'react';
import { 
  X, Bookmark, BookmarkCheck, CheckSquare, Printer, Sparkles, Camera, 
  FileText, Headphones, AlertTriangle, BookOpen, Clock, Heart, 
  Send, ZoomIn, ZoomOut, CheckCircle2, ChevronRight, Download
} from 'lucide-react';
import { LectureSession, ClassSubject } from '../types';

interface LectureDetailModalProps {
  lecture: LectureSession;
  subject?: ClassSubject;
  isOpen: boolean;
  isBookmarked: boolean;
  isCompleted: boolean;
  onClose: () => void;
  onToggleBookmark: () => void;
  onToggleCompleted: () => void;
  onSendGratitude: (author: string, message: string) => void;
  onOpenPrintView: (lecture: LectureSession) => void;
}

export const LectureDetailModal: React.FC<LectureDetailModalProps> = ({
  lecture,
  subject,
  isOpen,
  isBookmarked,
  isCompleted,
  onClose,
  onToggleBookmark,
  onToggleCompleted,
  onSendGratitude,
  onOpenPrintView,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'chalkboard' | 'peer_notes' | 'audio' | 'homework' | 'ai_tutor'>('overview');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [photoZoom, setPhotoZoom] = useState(1);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);
  const [gratitudeSentForNote, setGratitudeSentForNote] = useState<Record<string, boolean>>({});

  // AI Tutor State
  const [userQuestion, setUserQuestion] = useState('');
  const [aiAnswers, setAiAnswers] = useState<Array<{ q: string; a: string; time: string }>>([
    {
      q: 'What should I review first before coming back to class?',
      a: `Start with the chalkboard derivation of ${lecture.title}. Review the single and double rotations shown on Chalkboard 1, and make sure to start the assigned homework (${lecture.homework[0]?.title || 'Practice problems'}) before the next class session.`,
      time: 'Just now'
    }
  ]);
  const [isAskingAi, setIsAskingAi] = useState(false);

  // Audio Playback simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const [audioProgress, setAudioProgress] = useState<number>(25);

  if (!isOpen) return null;

  const currentPhoto = lecture.boardPhotos[selectedPhotoIndex] || lecture.boardPhotos[0];
  const currentNote = lecture.peerNotes[selectedNoteIndex] || lecture.peerNotes[0];

  const handleSendGratitude = (author: string, noteId: string) => {
    if (gratitudeSentForNote[noteId]) return;
    onSendGratitude(author, `Thank you for sharing your crystal clear notes on ${lecture.title}! It saved me from stressing over being absent.`);
    setGratitudeSentForNote(prev => ({ ...prev, [noteId]: true }));
  };

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim() || isAskingAi) return;

    const questionText = userQuestion;
    setUserQuestion('');
    setIsAskingAi(true);

    try {
      const response = await fetch('/api/ai/ask-lecture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText,
          lectureTitle: lecture.title,
          subjectName: subject?.name || 'Class',
          notesContext: currentNote ? currentNote.content : lecture.summary.overview,
          homeworkContext: lecture.homework.map(h => `${h.title}: ${h.details} (Due ${h.dueDate})`).join('; '),
          teacherWarnings: lecture.summary.teacherExamAlert,
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiAnswers(prev => [
          ...prev,
          { q: questionText, a: data.answer, time: 'Just now' }
        ]);
      } else {
        throw new Error('Failed to query assistant');
      }
    } catch {
      // Client-side fallback if server endpoint had network interruption
      setAiAnswers(prev => [
        ...prev,
        {
          q: questionText,
          a: `According to today's notes for ${lecture.title}: The instructor highlighted "${lecture.summary.teacherExamAlert}". Review the worked chalkboard derivation and complete ${lecture.homework[0]?.title || 'the assigned problem set'}.`,
          time: 'Just now'
        }
      ]);
    } finally {
      setIsAskingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-300 font-medium">
              <span>{subject?.code}</span>
              <span aria-hidden="true">·</span>
              <span>{lecture.period}</span>
              <span aria-hidden="true">·</span>
              <span>{lecture.date}</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white mt-0.5 font-display truncate max-w-xl">
              {lecture.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Mark as caught up */}
            <button
              type="button"
              onClick={onToggleCompleted}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isCompleted ? 'Caught Up' : 'Mark Caught Up'}</span>
            </button>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={onToggleBookmark}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                isBookmarked
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Save to My Catchup Binder"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Print Note Packet */}
            <button
              type="button"
              onClick={() => onOpenPrintView(lecture)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors"
              title="Open Printable Study Packet"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation (Segmented buttons adhering to zero-pill rules) */}
        <div className="px-6 py-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center gap-1 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>3-Min Catchup Brief</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('chalkboard')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'chalkboard'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-indigo-600" />
            <span>Blackboard Snaps ({lecture.boardPhotos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('peer_notes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'peer_notes'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Student Scribe Notes ({lecture.peerNotes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('homework')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'homework'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Homework & Deadlines</span>
          </button>

          {lecture.audioBrief && (
            <button
              type="button"
              onClick={() => setActiveTab('audio')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'audio'
                  ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-indigo-600" />
              <span>Voice Recap ({lecture.audioBrief.duration})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('ai_tutor')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ai_tutor'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Ask This Lecture</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {/* TAB 1: 3-MINUTE CATCHUP BRIEF */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Teacher Verbal Warning Box */}
              {lecture.summary.teacherExamAlert && (
                <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-4 text-amber-950 flex items-start gap-3 shadow-xs">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Verbal Announcement Made In Class Today
                    </h4>
                    <p className="mt-1 text-sm text-amber-900 font-medium leading-relaxed">
                      "{lecture.summary.teacherExamAlert}"
                    </p>
                    <span className="mt-2 block text-xs text-amber-700">
                      Recorded by in-class scribes so absent students don't miss test warnings.
                    </span>
                  </div>
                </div>
              )}

              {/* Executive Overview */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Lecture Synopsis
                </h4>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  {lecture.summary.overview}
                </p>
              </div>

              {/* 4 Core Takeaways */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  What You Must Know Before Next Class
                </h4>
                <ul className="space-y-2.5">
                  {lecture.summary.coreTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Formulas & Definitions */}
              {lecture.summary.keyFormulasOrTerms && lecture.summary.keyFormulasOrTerms.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Formulas & Definitions Introduced
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lecture.summary.keyFormulasOrTerms.map((f, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                        <span className="text-xs font-bold text-slate-900 font-mono block">
                          {f.term}
                        </span>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {f.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Jump Buttons to Notes & Blackboard */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500">
                  Ready to read the full handwritten equations or typed transcription?
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('chalkboard')}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Chalkboard Snapshots</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('peer_notes')}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Read Scribe Notes</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHALKBOARD / WHITEBOARD SNAPSHOTS */}
          {activeTab === 'chalkboard' && (
            <div className="space-y-4 max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">{currentPhoto.caption}</span>
                  <span aria-hidden="true">·</span>
                  <span>Captured by {currentPhoto.uploadedBy}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentPhoto.timestamp}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPhotoZoom(prev => Math.max(0.75, prev - 0.25))}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-600 w-12 text-center">
                    {Math.round(photoZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setPhotoZoom(prev => Math.min(2.5, prev + 0.25))}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Blackboard Image Canvas */}
              <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 min-h-[360px] max-h-[500px] flex items-center justify-center">
                <img
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.caption}
                  referrerPolicy="no-referrer"
                  style={{ transform: `scale(${photoZoom})`, transition: 'transform 0.15s ease-out' }}
                  className="max-h-[500px] w-auto object-contain cursor-grab active:cursor-grabbing select-none"
                />
              </div>

              {/* Board Annotations & Key Points */}
              {currentPhoto.keyNotes && (
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                  <span className="font-semibold text-slate-900 block mb-1">
                    Key chalkboard areas highlighted by scribe:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentPhoto.keyNotes.map((kn, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md">
                        {kn}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Thumbnail selector if multiple photos */}
              {lecture.boardPhotos.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pt-2">
                  {lecture.boardPhotos.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative rounded-lg overflow-hidden border-2 w-28 h-20 shrink-0 transition-transform ${
                        selectedPhotoIndex === idx
                          ? 'border-indigo-600 scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={p.imageUrl} alt={p.caption} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STUDENT SCRIBE NOTES */}
          {activeTab === 'peer_notes' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              {/* Note Selector Tabs if multiple students contributed */}
              {lecture.peerNotes.length > 1 && (
                <div className="flex items-center gap-2 p-1 bg-slate-200/80 rounded-xl">
                  {lecture.peerNotes.map((note, idx) => (
                    <button
                      key={note.id}
                      onClick={() => setSelectedNoteIndex(idx)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        selectedNoteIndex === idx
                          ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {note.author} ({note.format === 'markdown' ? 'Typed Notes' : 'Formulas'})
                    </button>
                  ))}
                </div>
              )}

              {/* Note Content Viewer */}
              {currentNote && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  {/* Author credit and anonymous gratitude button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{currentNote.author}</span>
                        <span className="text-xs text-indigo-600 font-medium">({currentNote.authorRole})</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Uploaded {currentNote.timestamp} · {currentNote.karmaCount} classmate gratitude points
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSendGratitude(currentNote.author, currentNote.id)}
                      disabled={gratitudeSentForNote[currentNote.id]}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        gratitudeSentForNote[currentNote.id]
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${gratitudeSentForNote[currentNote.id] ? 'fill-emerald-600' : 'fill-rose-500'}`} />
                      <span>
                        {gratitudeSentForNote[currentNote.id] ? 'Gratitude Sent! (+10 Karma)' : 'Send 1-Click Thank You (+10 Karma)'}
                      </span>
                    </button>
                  </div>

                  {/* Clean Formatted Note Content */}
                  <div className="prose prose-slate max-w-none text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                    {currentNote.content}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: HOMEWORK & DEADLINES */}
          {activeTab === 'homework' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Assignments Announced in This Session
                </h4>

                {lecture.homework.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">
                    No homework assigned during this lecture. Continue reading the syllabus topics.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {lecture.homework.map((hw) => (
                      <div key={hw.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold text-slate-900">{hw.title}</h5>
                          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            Due: {hw.dueDate}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {hw.details}
                        </p>
                        <div className="text-[11px] text-slate-400">
                          Estimated time: ~{hw.estimatedMinutes} minutes
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Official Course Handouts */}
              {lecture.attachments && lecture.attachments.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Distributed Classroom Handouts & Code
                  </h4>
                  <div className="divide-y divide-slate-100">
                    {lecture.attachments.map((att, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4 text-indigo-600" />
                          <span className="text-xs font-semibold text-slate-800">{att.name}</span>
                          <span className="text-xs text-slate-400">({att.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => alert(`Downloading handout: ${att.name}`)}
                          className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: AUDIO BRIEF */}
          {activeTab === 'audio' && lecture.audioBrief && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      2-Minute Absentee Audio Brief
                    </h4>
                    <p className="text-xs text-slate-500">
                      Recorded by {lecture.audioBrief.speaker} · Duration {lecture.audioBrief.duration}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                  "{lecture.audioBrief.summaryText}"
                </p>

                {/* Simulated Audio Player Controls */}
                <div className="space-y-2">
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>0:40</span>
                    <span>{lecture.audioBrief.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPlayingAudio(!isPlayingAudio);
                        if (!isPlayingAudio) {
                          setAudioProgress(prev => (prev >= 95 ? 10 : prev + 15));
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-xs"
                    >
                      <span>{isPlayingAudio ? 'Pause Voice Note' : 'Play Voice Note'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAudioSpeed(prev => prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1)}
                      className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono rounded-lg"
                    >
                      {audioSpeed}x
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-500">
                    High clarity student voice recap
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ASK THIS LECTURE (AI TUTOR) */}
          {activeTab === 'ai_tutor' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="bg-indigo-900 text-white rounded-xl p-5 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Absentee Q&A Assistant</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  Have a question about what was taught while you were away?
                </h3>
                <p className="text-xs text-indigo-200 mt-1">
                  Ask freely without feeling awkward texting classmates. Answers are grounded in today's notes, board transcript, and professor announcements.
                </p>

                {/* Pre-made question prompts */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    'What is the homework for this class?',
                    'Did the professor mention any test hints?',
                    'Explain the main derivation from today in simple terms'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setUserQuestion(preset)}
                      className="px-2.5 py-1 text-xs bg-indigo-800/80 hover:bg-indigo-800 text-indigo-100 rounded-lg border border-indigo-700 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3">
                {aiAnswers.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    {/* User Question */}
                    <div className="flex justify-end">
                      <div className="bg-slate-800 text-white text-xs rounded-xl rounded-tr-xs px-3.5 py-2 max-w-md">
                        {item.q}
                      </div>
                    </div>
                    {/* Tutor Answer */}
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl rounded-tl-xs p-4 max-w-xl shadow-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-[11px] mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Tutor Answer from Today's Notes:</span>
                        </div>
                        <div className="whitespace-pre-line leading-relaxed">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isAskingAi && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 text-slate-500 text-xs rounded-xl p-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                      <span>Consulting lecture board photos and scribe notes...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleAskAi} className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ask a question about today's lecture..."
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!userQuestion.trim() || isAskingAi}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
