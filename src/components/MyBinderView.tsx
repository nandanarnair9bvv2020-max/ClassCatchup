import React from 'react';
import { Bookmark, CheckSquare, Clock, Heart, ArrowRight, BookOpen, Printer, Sparkles } from 'lucide-react';
import { LectureSession, ClassSubject, GratitudeEvent } from '../types';

interface MyBinderViewProps {
  lectures: LectureSession[];
  subjects: ClassSubject[];
  bookmarkedIds: string[];
  completedIds: string[];
  gratitudeEvents: GratitudeEvent[];
  onOpenDetail: (lecture: LectureSession) => void;
  onToggleBookmark: (id: string) => void;
  onToggleCompleted: (id: string) => void;
  onOpenPrintView: (lecture: LectureSession) => void;
}

export const MyBinderView: React.FC<MyBinderViewProps> = ({
  lectures,
  subjects,
  bookmarkedIds,
  completedIds,
  gratitudeEvents,
  onOpenDetail,
  onToggleBookmark,
  onToggleCompleted,
  onOpenPrintView,
}) => {
  const bookmarkedLectures = lectures.filter((l) => bookmarkedIds.includes(l.id));
  const caughtUpCount = completedIds.length;
  const totalRelevant = bookmarkedLectures.length || lectures.length;
  const catchupPercent = totalRelevant > 0 ? Math.round((caughtUpCount / totalRelevant) * 100) : 0;

  // Collect all homework from saved or recent lectures
  const pendingHomework = lectures.flatMap((l) =>
    l.homework.map((hw) => ({
      ...hw,
      lectureTitle: l.title,
      date: l.date,
      subjectCode: subjects.find(s => s.id === l.subjectId)?.code || 'CLASS',
    }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Catchup Stats Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <Bookmark className="w-4 h-4" />
              <span>Personal Absentee Study Binder</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">
              Your Missed Classes Catchup Dashboard
            </h2>
            <p className="text-xs text-slate-600 max-w-xl">
              Keep track of what you missed while absent, verify homework deadlines, and check off lectures as you finish reviewing them before returning to school.
            </p>
          </div>

          {/* Catchup Progress Ring & Stats */}
          <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                {caughtUpCount} / {lectures.length}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Lectures Caught Up ({catchupPercent}%)
              </div>
            </div>

            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, catchupPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Bookmarked & Missed Lectures (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <span>Saved Lectures in Your Binder</span>
              <span className="text-xs font-normal text-slate-500">
                ({bookmarkedLectures.length} bookmarked)
              </span>
            </h3>

            {bookmarkedLectures.length > 0 && (
              <button
                type="button"
                onClick={() => onOpenPrintView(bookmarkedLectures[0])}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Binder Packet</span>
              </button>
            )}
          </div>

          {bookmarkedLectures.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                Your Binder is Currently Empty
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Browse today's or yesterday's missed sessions and click the bookmark icon on any lecture card to save it here for fast revision.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedLectures.map((lec) => {
                const sub = subjects.find((s) => s.id === lec.subjectId);
                const isCaughtUp = completedIds.includes(lec.id);

                return (
                  <div
                    key={lec.id}
                    className={`bg-white rounded-2xl border p-5 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isCaughtUp ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="space-y-1.5 max-w-lg">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="font-bold text-indigo-600">{sub?.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{lec.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{lec.period}</span>
                      </div>

                      <h4
                        onClick={() => onOpenDetail(lec)}
                        className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors"
                      >
                        {lec.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-1">
                        {lec.summary.overview}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleCompleted(lec.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                          isCaughtUp
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>{isCaughtUp ? 'Caught Up' : 'Mark Done'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenDetail(lec)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <span>Study</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pending Homework Checklist from Absent Sessions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500" />
                <span>Homework & Due Dates to Finish</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {pendingHomework.length} assigned
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {pendingHomework.map((hw, i) => (
                <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-900">{hw.title}</span>
                      <span className="text-slate-400">({hw.subjectCode})</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{hw.details}</p>
                  </div>
                  <div className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 shrink-0 self-start sm:self-auto">
                    {hw.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Community Gratitude & Karma Log (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <Heart className="w-4 h-4 fill-rose-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Community Gratitude
              </h3>
            </div>

            <p className="text-xs text-slate-600">
              When classmates upload clear notes and blackboard snapshots, absent students send anonymous thank-you messages and Karma points.
            </p>

            <div className="space-y-3 pt-2">
              {gratitudeEvents.map((g) => (
                <div key={g.id} className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900">To {g.targetAuthor}</span>
                    <span className="font-mono text-emerald-600 font-bold">+{g.karmaAdded} Karma</span>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    "{g.message}"
                  </p>
                  <div className="text-[11px] text-slate-400 pt-1">
                    {g.lectureTitle} · {g.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Absentee Tips */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Absentee Study Protocol</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              Returning to class tomorrow?
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>1. Review the 3-minute executive summary for each missed class.</li>
              <li>2. Check the Teacher Verbal Alerts box to avoid surprise quiz questions.</li>
              <li>3. Attempt the homework problem sets so you don't fall behind.</li>
              <li>4. Print your note packet to slip into your physical class binder.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
