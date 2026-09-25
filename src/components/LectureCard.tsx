import React from 'react';
import { Bookmark, BookmarkCheck, Camera, FileText, AlertTriangle, ArrowRight, Clock, CheckSquare } from 'lucide-react';
import { LectureSession, ClassSubject } from '../types';

interface LectureCardProps {
  lecture: LectureSession;
  subject?: ClassSubject;
  isBookmarked: boolean;
  isCompleted: boolean;
  onToggleBookmark: () => void;
  onToggleCompleted: () => void;
  onOpenDetail: () => void;
}

export const LectureCard: React.FC<LectureCardProps> = ({
  lecture,
  subject,
  isBookmarked,
  isCompleted,
  onToggleBookmark,
  onToggleCompleted,
  onOpenDetail,
}) => {
  const photoCount = lecture.boardPhotos.length;
  const notesCount = lecture.peerNotes.length;
  const hasHomework = lecture.homework && lecture.homework.length > 0;

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
      isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
    }`}>
      {/* Top Header & Metadata */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          {/* Zero-pill metadata kicker */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-bold text-indigo-600">{subject?.code || 'CLASS'}</span>
            <span aria-hidden="true">·</span>
            <span>{lecture.period}</span>
            <span aria-hidden="true">·</span>
            <span>{lecture.date}</span>
          </div>

          {/* Quick Bookmark and Caught Up toggles */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onToggleCompleted}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
              }`}
              title={isCompleted ? 'Mark as not caught up' : 'Mark lecture as caught up'}
            >
              <CheckSquare className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onToggleBookmark}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                isBookmarked
                  ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
              }`}
              title={isBookmarked ? 'Remove from binder' : 'Save to my catchup binder'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-3.5 h-3.5" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Primary Title */}
        <h3
          onClick={onOpenDetail}
          className="mt-2.5 text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer leading-snug font-display"
        >
          {lecture.title}
        </h3>

        {/* Instructor info */}
        <div className="mt-1 text-xs text-slate-500">
          <span>{lecture.instructorName}</span>
          <span className="mx-1.5" aria-hidden="true">·</span>
          <span>{lecture.room}</span>
        </div>

        {/* Executive summary preview */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {lecture.summary.overview}
        </p>

        {/* High-value Absentee Box: Teacher Exam Verbal Warning */}
        {lecture.summary.teacherExamAlert && (
          <div className="mt-3.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-semibold text-amber-800">Teacher Exam Cue: </span>
              <span>{lecture.summary.teacherExamAlert}</span>
            </div>
          </div>
        )}

        {/* Homework due alert */}
        {hasHomework && (
          <div className="mt-2.5 text-xs text-slate-600 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="font-semibold text-slate-800">Assigned:</span>
            <span className="truncate">{lecture.homework[0].title}</span>
            <span className="text-slate-400">({lecture.homework[0].dueDate.split('·')[0]})</span>
          </div>
        )}
      </div>

      {/* Visual Asset Thumbnail & Resource Counts */}
      <div className="bg-slate-50/80 border-t border-slate-100 p-4">
        {photoCount > 0 && (
          <div
            onClick={onOpenDetail}
            className="group relative rounded-xl overflow-hidden mb-3 border border-slate-200 cursor-pointer h-32 bg-slate-900"
          >
            <img
              src={lecture.boardPhotos[0].imageUrl}
              alt={lecture.boardPhotos[0].caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[11px] font-medium text-white truncate drop-shadow-sm flex items-center gap-1.5">
                <Camera className="w-3 h-3 text-indigo-300" />
                <span>{lecture.boardPhotos[0].caption}</span>
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-slate-400" />
              <span>{photoCount} {photoCount === 1 ? 'board photo' : 'board photos'}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>{notesCount} {notesCount === 1 ? 'peer scribe' : 'peer scribes'}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenDetail}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1"
          >
            <span>Catch Up</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
