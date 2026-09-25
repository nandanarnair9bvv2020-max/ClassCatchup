import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, ShieldCheck, HeartHandshake, Sparkles, MessageSquare } from 'lucide-react';
import { AbsenteeRequest, ClassSubject } from '../types';

interface RequestBoardProps {
  requests: AbsenteeRequest[];
  subjects: ClassSubject[];
  userRole: 'absent_student' | 'in_class_peer';
  onCreateRequest: (req: Omit<AbsenteeRequest, 'id' | 'createdAt' | 'status'>) => void;
  onFulfillRequest: (requestId: string) => void;
}

export const RequestBoard: React.FC<RequestBoardProps> = ({
  requests,
  subjects,
  userRole,
  onCreateRequest,
  onFulfillRequest,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'fulfilled'>('all');

  // New Request Form State
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || 'cs-101');
  const [date, setDate] = useState('2026-09-24');
  const [topicTitle, setTopicTitle] = useState('');
  const [requestNote, setRequestNote] = useState('');
  const [category, setCategory] = useState<'board_photo' | 'typed_notes' | 'homework_clarification' | 'lab_data'>('board_photo');
  const [anonymousAlias, setAnonymousAlias] = useState('Absent Student');
  const [urgency, setUrgency] = useState<'high' | 'normal'>('high');

  const filteredRequests = requests.filter((r) => {
    if (filterSubject !== 'all' && r.subjectId !== filterSubject) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicTitle.trim() || !requestNote.trim()) return;

    onCreateRequest({
      subjectId,
      date,
      topicTitle,
      requestNote,
      category,
      anonymousAlias: anonymousAlias.trim() || 'Absent Student in Row 3',
      urgency,
    });

    setTopicTitle('');
    setRequestNote('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header and Callout */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>Anonymous Classroom Request Board</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1 font-display">
            Need notes for a missed session? Ask without the awkwardness.
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            You don't need to ask anyone directly. Drop an anonymous request here specifying what you missed. Classmates get notified to snap photos or share notes, and you receive them without revealing your personal contact details.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors shrink-0 whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post Anonymous Note Request</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Status filters */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Requests ({requests.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterStatus === 'pending' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Needs Notes ({requests.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilterStatus('fulfilled')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterStatus === 'fulfilled' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fulfilled ({requests.filter(r => r.status === 'fulfilled').length})
          </button>
        </div>

        {/* Subject filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterSubject('all')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
              filterSubject === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Classes
          </button>
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setFilterSubject(s.id)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                filterSubject === s.id
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s.code}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRequests.map((req) => {
          const sub = subjects.find(s => s.id === req.subjectId);
          const isFulfilled = req.status === 'fulfilled';

          return (
            <div
              key={req.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                isFulfilled ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                {/* Zero-pill metadata kicker */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-indigo-600">{sub?.code || 'CLASS'}</span>
                    <span aria-hidden="true">·</span>
                    <span>Missed {req.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{req.category.replace('_', ' ')}</span>
                  </div>

                  <span className={`text-[11px] font-semibold flex items-center gap-1 ${
                    isFulfilled ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {isFulfilled ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Fulfilled</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Awaiting Notes</span>
                      </>
                    )}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {req.topicTitle}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  "{req.requestNote}"
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Requested by: {req.anonymousAlias}</span>
                  <span>{req.createdAt}</span>
                </div>
              </div>

              {/* Action area */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                {isFulfilled ? (
                  <div className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Uploaded by {req.fulfilledBy || 'Classmate Scribe'}</span>
                  </div>
                ) : (
                  <div className="text-xs text-amber-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Attended this class? Earn +20 Karma</span>
                  </div>
                )}

                {!isFulfilled && userRole === 'in_class_peer' && (
                  <button
                    type="button"
                    onClick={() => onFulfillRequest(req.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Fulfill with My Notes</span>
                  </button>
                )}

                {isFulfilled && (
                  <span className="text-xs text-slate-500">
                    Available in Missed Lectures feed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to Post New Anonymous Request */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Post Anonymous Note Request
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Your name and student email will NEVER be displayed. In-class students will see what was missed and upload their notes or board snapshots.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Course / Subject
                  </label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                    Date You Missed
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Topic / Section Title
                </label>
                <input
                  type="text"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  placeholder="e.g. AVL Tree Deletions & Midterm Hints"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  What specifically do you need?
                </label>
                <textarea
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  rows={3}
                  placeholder="e.g. I was home sick with fever today. Could someone upload the right chalkboard derivation and any verbal hints the professor gave about the quiz?"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    What format do you need?
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="board_photo">Chalkboard / Whiteboard Photo</option>
                    <option value="typed_notes">Full Typed / Scribe Notes</option>
                    <option value="homework_clarification">Homework & Quiz Hints</option>
                    <option value="lab_data">Lab Data / Tables</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Anonymous Display Tag
                  </label>
                  <input
                    type="text"
                    value={anonymousAlias}
                    onChange={(e) => setAnonymousAlias(e.target.value)}
                    placeholder="e.g. Absent Student in Row 2"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  Post Anonymous Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
