import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { ClassSubject, LectureSession } from '../types';

interface ScheduleViewProps {
  subjects: ClassSubject[];
  lectures: LectureSession[];
  onSelectLecture: (lecture: LectureSession) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  subjects,
  lectures,
  onSelectLecture,
}) => {
  const [selectedDay, setSelectedDay] = useState<'Thursday' | 'Wednesday' | 'Tuesday' | 'Monday' | 'Friday'>('Thursday');

  const timetableByDay: Record<string, Array<{ time: string; subjectId: string; room: string }>> = {
    Monday: [
      { time: '10:00 - 11:15 AM', subjectId: 'cs-101', room: 'Turing Hall 304' },
      { time: '01:30 - 02:45 PM', subjectId: 'math-240', room: 'Euler Center 102' },
    ],
    Tuesday: [
      { time: '11:30 - 12:45 PM', subjectId: 'chem-102', room: 'Curie Lab 210' },
      { time: '01:30 - 02:45 PM', subjectId: 'math-240', room: 'Euler Center 102' },
    ],
    Wednesday: [
      { time: '08:30 - 09:45 AM', subjectId: 'phys-211', room: 'Newton Hall A' },
      { time: '10:00 - 11:15 AM', subjectId: 'cs-101', room: 'Turing Hall 304' },
      { time: '11:30 - 12:45 PM', subjectId: 'chem-102', room: 'Curie Lab 210' },
    ],
    Thursday: [
      { time: '08:30 - 09:45 AM', subjectId: 'phys-211', room: 'Newton Hall A' },
      { time: '10:00 - 11:15 AM', subjectId: 'cs-101', room: 'Turing Hall 304' },
      { time: '01:30 - 02:45 PM', subjectId: 'math-240', room: 'Euler Center 102' },
    ],
    Friday: [
      { time: '08:30 - 09:45 AM', subjectId: 'phys-211', room: 'Newton Hall A' },
      { time: '11:30 - 12:45 PM', subjectId: 'chem-102', room: 'Curie Lab 210' },
    ],
  };

  const currentSlots = timetableByDay[selectedDay] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>Weekly Timetable & Lecture Sync</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 font-display mt-1">
          Class Schedule & Absentee Lecture Mapping
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-xl">
          Select any day of the week to see which class periods met, and whether lecture notes, board snapshots, and homework have been archived.
        </p>

        {/* Day selector tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {day} {day === 'Thursday' && '(Today)'}
            </button>
          ))}
        </div>
      </div>

      {/* Day Schedule Slots */}
      <div className="space-y-4">
        {currentSlots.map((slot, index) => {
          const sub = subjects.find((s) => s.id === slot.subjectId);
          // Find matching lecture
          const matchingLecture = lectures.find((l) => l.subjectId === slot.subjectId);

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-36 shrink-0 font-mono text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{slot.time}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-indigo-600">{sub?.code}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{slot.room}</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 font-display">
                    {sub?.name}
                  </h4>

                  <div className="text-xs text-slate-500">
                    Instructor: {sub?.instructor}
                  </div>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                {matchingLecture ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Notes Archived ({matchingLecture.boardPhotos.length} photos)</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectLecture(matchingLecture)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <span>Catch Up</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    No lecture recorded for this period yet
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
