import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, AlertTriangle, ArrowRight, X, BookmarkCheck } from 'lucide-react';
import { LectureSession, ClassSubject } from '../types';

interface QuickAbsenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lectures: LectureSession[];
  subjects: ClassSubject[];
  onOpenDetail: (lecture: LectureSession) => void;
  onBookmarkAll: (lectureIds: string[]) => void;
}

export const QuickAbsenceModal: React.FC<QuickAbsenceModalProps> = ({
  isOpen,
  onClose,
  lectures,
  subjects,
  onOpenDetail,
  onBookmarkAll,
}) => {
  const [missedDate, setMissedDate] = useState('2026-09-24');
  const [allBookmarked, setAllBookmarked] = useState(false);

  if (!isOpen) return null;

  const dayLectures = lectures.filter((l) => l.date === missedDate);
  const totalHomework = dayLectures.flatMap((l) => l.homework);
  const totalPhotos = dayLectures.reduce((acc, l) => acc + l.boardPhotos.length, 0);

  const handleBookmarkDay = () => {
    onBookmarkAll(dayLectures.map((l) => l.id));
    setAllBookmarked(true);
    setTimeout(() => setAllBookmarked(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-slate-200 shadow-2xl space-y-6 my-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Absentee Day Recovery</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
              Consolidated Catch-Up for Your Missed Day
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

        {/* Date Selector */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block">
              Which day were you absent from school?
            </label>
            <p className="text-xs text-slate-500">
              We'll compile every period's notes, board pictures, and homework from that day.
            </p>
          </div>

          <input
            type="date"
            value={missedDate}
            onChange={(e) => setMissedDate(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          />
        </div>

        {/* Day Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-center">
            <span className="text-xl font-bold font-mono text-indigo-900 block">
              {dayLectures.length}
            </span>
            <span className="text-xs text-indigo-700">Lectures Archived</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center">
            <span className="text-xl font-bold font-mono text-emerald-900 block">
              {totalPhotos}
            </span>
            <span className="text-xs text-emerald-700">Board Photos Ready</span>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-center">
            <span className="text-xl font-bold font-mono text-amber-900 block">
              {totalHomework.length}
            </span>
            <span className="text-xs text-amber-700">Homework Assigned</span>
          </div>
        </div>

        {/* Lectures List for Selected Day */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Classes Held on {missedDate}
          </h4>

          {dayLectures.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              No recorded lectures found for this date. Check another day or post an anonymous request!
            </p>
          ) : (
            dayLectures.map((lec) => {
              const sub = subjects.find((s) => s.id === lec.subjectId);
              return (
                <div
                  key={lec.id}
                  className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="space-y-1 max-w-md">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-bold text-indigo-600">{sub?.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{lec.period}</span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {lec.title}
                    </h5>

                    {lec.summary.teacherExamAlert && (
                      <div className="text-[11px] text-amber-700 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">"{lec.summary.teacherExamAlert}"</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenDetail(lec);
                    }}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors shrink-0"
                  >
                    <span>View Notes</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleBookmarkDay}
            disabled={dayLectures.length === 0}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>{allBookmarked ? 'Added All to Binder!' : 'Add All to My Binder'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
