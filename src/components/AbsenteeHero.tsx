import React from 'react';
import { Search, Calendar, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ClassSubject } from '../types';

interface AbsenteeHeroProps {
  subjects: ClassSubject[];
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalLecturesToday: number;
}

export const AbsenteeHero: React.FC<AbsenteeHeroProps> = ({
  subjects,
  selectedSubjectId,
  setSelectedSubjectId,
  selectedDate,
  setSelectedDate,
  searchQuery,
  setSearchQuery,
  totalLecturesToday,
}) => {
  return (
    <div className="bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border-b border-slate-200/80 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Missed class? Catch up immediately without texting anyone.
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            When you're out sick or absent, you shouldn't have to scramble through group chats or feel guilty asking classmates for pictures. Access high-resolution board photos, student lecture notes, homework due dates, and verbal teacher exam warnings in one place.
          </p>

          {/* Clean unboxed proof metadata with typographic separators (anti-slop rule) */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-indigo-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{totalLecturesToday} class sessions recorded today</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chalkboard snapshots verified</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
              <span>100% Anonymous requests</span>
            </span>
          </div>
        </div>

        {/* Filter and date bar */}
        <div className="mt-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search missed topics, derivations, formulas, or professors..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
              />
            </div>

            {/* Quick Date Segmented Controls */}
            <div className="md:col-span-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setSelectedDate('2026-09-24')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedDate === '2026-09-24'
                      ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Today (Sep 24)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDate('2026-09-23')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedDate === '2026-09-23'
                      ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Yesterday (Sep 23)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDate('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedDate === 'all'
                      ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Past Dates
                </button>
              </div>

              {/* Specific Date input */}
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="date"
                  value={selectedDate === 'all' ? '' : selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border-none text-xs focus:outline-none text-slate-700 cursor-pointer"
                  title="Pick exact date you missed class"
                />
              </div>
            </div>
          </div>

          {/* Subject Pills (Segmented filter buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedSubjectId('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedSubjectId === 'all'
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Subjects
            </button>

            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedSubjectId === sub.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{sub.code}</span>
                <span className="text-[11px] opacity-75 font-normal">({sub.name.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
