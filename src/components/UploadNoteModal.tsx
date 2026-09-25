import React, { useState } from 'react';
import { Camera, FileText, Plus, X, PenTool, Sparkles, AlertTriangle, Check } from 'lucide-react';
import { ClassSubject, LectureSession, BoardPhoto, PeerNote } from '../types';
import { WhiteboardCanvas } from './WhiteboardCanvas';
import { CLASS_ASSETS } from '../data/assets';

interface UploadNoteModalProps {
  subjects: ClassSubject[];
  isOpen: boolean;
  onClose: () => void;
  onSaveLecture: (newLecture: LectureSession) => void;
}

export const UploadNoteModal: React.FC<UploadNoteModalProps> = ({
  subjects,
  isOpen,
  onClose,
  onSaveLecture,
}) => {
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || 'cs-101');
  const [date, setDate] = useState('2026-09-24');
  const [period, setPeriod] = useState('Period 2 · 10:00 AM - 11:15 AM');
  const [title, setTitle] = useState('');
  const [instructorName, setInstructorName] = useState('Prof. Aris Thorne');
  const [room, setRoom] = useState('Turing Hall 304');
  const [overview, setOverview] = useState('');
  const [takeaway1, setTakeaway1] = useState('');
  const [takeaway2, setTakeaway2] = useState('');
  const [teacherExamAlert, setTeacherExamAlert] = useState('');
  const [homeworkTitle, setHomeworkTitle] = useState('');
  const [homeworkDue, setHomeworkDue] = useState('');
  const [authorName, setAuthorName] = useState('Alex Morgan');
  const [authorRole, setAuthorRole] = useState('Row 2 Scribe');
  const [noteContent, setNoteContent] = useState('');
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>(CLASS_ASSETS.blackboardCS);
  const [boardCaption, setBoardCaption] = useState('Chalkboard main derivation & examples');
  
  // Sketch Pad state
  const [showSketchPad, setShowSketchPad] = useState(false);
  const [sketchedImageUrl, setSketchedImageUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubjectChange = (id: string) => {
    setSubjectId(id);
    const sub = subjects.find(s => s.id === id);
    if (sub) {
      setInstructorName(sub.instructor);
      setRoom(sub.room);
    }
  };

  const handleSaveSketch = (dataUrl: string) => {
    setSketchedImageUrl(dataUrl);
    setShowSketchPad(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !overview.trim()) return;

    const boardPhotos: BoardPhoto[] = [];
    if (sketchedImageUrl) {
      boardPhotos.push({
        id: `bp-${Date.now()}-sketch`,
        imageUrl: sketchedImageUrl,
        caption: 'Hand-drawn blackboard diagram',
        uploadedBy: authorName,
        timestamp: 'Just now',
        boardType: 'whiteboard',
        keyNotes: ['Formula & diagram sketch from class'],
      });
    } else if (selectedPresetImage) {
      boardPhotos.push({
        id: `bp-${Date.now()}`,
        imageUrl: selectedPresetImage,
        caption: boardCaption || 'Classroom chalkboard notes',
        uploadedBy: authorName,
        timestamp: 'Just now',
        boardType: 'blackboard',
        keyNotes: ['Important board notes for absent students'],
      });
    }

    const peerNotes: PeerNote[] = [
      {
        id: `pn-${Date.now()}`,
        author: authorName,
        authorRole,
        format: 'markdown',
        title: `${title} - Class Notes`,
        content: noteContent || `### ${title}\n\n${overview}\n\n#### Key Points Covered:\n- ${takeaway1 || 'Detailed step-by-step proofs'}\n- ${takeaway2 || 'Application and edge cases'}\n\n> **Exam Warning:** ${teacherExamAlert || 'Review standard theorems.'}`,
        timestamp: 'Just now',
        karmaCount: 15,
        isVerified: true,
      }
    ];

    const newLecture: LectureSession = {
      id: `lec-${subjectId}-${Date.now()}`,
      subjectId,
      date,
      period,
      sessionNumber: Math.floor(Math.random() * 10) + 20,
      title,
      instructorName,
      room,
      summary: {
        overview,
        coreTakeaways: [
          takeaway1 || 'Understood core theoretical concepts and proof mechanics.',
          takeaway2 || 'Worked through comprehensive chalkboard examples with the class.',
        ],
        teacherExamAlert: teacherExamAlert || 'Instructor emphasized practicing problem set derivations.',
        keyFormulasOrTerms: [
          { term: 'Core Concept', explanation: 'Main definition introduced during the session.' },
        ],
      },
      homework: homeworkTitle ? [
        {
          id: `hw-${Date.now()}`,
          title: homeworkTitle,
          dueDate: homeworkDue || 'Next lecture',
          details: 'Complete problems reviewed on the board.',
          isUrgent: true,
          estimatedMinutes: 60,
        }
      ] : [],
      boardPhotos,
      peerNotes,
      attachments: [],
    };

    onSaveLecture(newLecture);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 border border-slate-200 shadow-2xl space-y-5 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>In-Class Contributor Portal</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
              Upload Today's Notes & Board Snaps for Absent Classmates
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Course / Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} - {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Class Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Period / Time
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. Period 2 · 10:00 AM"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Lecture Topic Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dynamic Programming: Memoization vs Tabulation"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              3-Minute Executive Synopsis (What happened in class?)
            </label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={2}
              placeholder="e.g. Today the professor introduced Fibonacci memoization and walked through the grid traveler matrix problem on the chalkboard."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* Teacher Verbal Warning Callout */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
            <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Verbal Exam Alert or Teacher Announcements (High Value for Absent Students!)</span>
            </label>
            <input
              type="text"
              value={teacherExamAlert}
              onChange={(e) => setTeacherExamAlert(e.target.value)}
              placeholder="e.g. Prof said: 'Question 2 on the midterm will specifically test the bottom-up table initialization!'"
              className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Core Takeaway 1
              </label>
              <input
                type="text"
                value={takeaway1}
                onChange={(e) => setTakeaway1(e.target.value)}
                placeholder="e.g. Overlapping subproblems enable memoization"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Core Takeaway 2
              </label>
              <input
                type="text"
                value={takeaway2}
                onChange={(e) => setTakeaway2(e.target.value)}
                placeholder="e.g. Space complexity reduces from O(2^n) to O(n)"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Homework info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Homework Assigned
              </label>
              <input
                type="text"
                value={homeworkTitle}
                onChange={(e) => setHomeworkTitle(e.target.value)}
                placeholder="e.g. Problem Set 4 (Exercises 1-6)"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Due Date
              </label>
              <input
                type="text"
                value={homeworkDue}
                onChange={(e) => setHomeworkDue(e.target.value)}
                placeholder="e.g. Next Tuesday · 11:59 PM"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Board Visual Options */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                Attach Blackboard Snapshot or Diagram
              </span>
              <button
                type="button"
                onClick={() => setShowSketchPad(!showSketchPad)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>{showSketchPad ? 'Close Sketchpad' : 'Draw Whiteboard Sketch'}</span>
              </button>
            </div>

            {showSketchPad ? (
              <WhiteboardCanvas
                onSaveSketch={handleSaveSketch}
                onCancel={() => setShowSketchPad(false)}
              />
            ) : sketchedImageUrl ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Custom Whiteboard Sketch Attached</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSketchedImageUrl(null)}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Remove sketch
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'CS Blackboard', url: CLASS_ASSETS.blackboardCS },
                  { name: 'Math Spiral Notes', url: CLASS_ASSETS.notebookMath },
                  { name: 'Physics Whiteboard', url: CLASS_ASSETS.whiteboardPhysics },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPresetImage(preset.url)}
                    className={`relative rounded-lg overflow-hidden border-2 h-20 text-left transition-all ${
                      selectedPresetImage === preset.url
                        ? 'border-indigo-600 ring-2 ring-indigo-200'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[10px] text-white px-1.5 py-0.5 truncate block">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Scribe Credit */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Your Name / Alias
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Your Role
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="e.g. Front Row Scribe"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              You will earn +25 Community Karma for helping absent classmates.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              >
                Publish Class Notes (+25 Karma)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
