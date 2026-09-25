import React from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { LectureSession, ClassSubject } from '../types';

interface PrintableLectureViewProps {
  lecture: LectureSession;
  subject?: ClassSubject;
  onBack: () => void;
}

export const PrintableLectureView: React.FC<PrintableLectureViewProps> = ({
  lecture,
  subject,
  onBack,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6">
      {/* Action Bar (hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to App</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Sheet */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-slate-200 print:shadow-none print:border-none print:p-0 space-y-6 text-slate-900">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600">
            <span>{subject?.code} · {subject?.name}</span>
            <span>ClassCatchup Peer Packet</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight mt-2 text-slate-900 font-display">
            {lecture.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2 font-medium">
            <span>Date: {lecture.date}</span>
            <span>·</span>
            <span>{lecture.period}</span>
            <span>·</span>
            <span>Instructor: {lecture.instructorName}</span>
            <span>·</span>
            <span>Room: {lecture.room}</span>
          </div>
        </div>

        {/* Teacher Verbal Warning Box */}
        {lecture.summary.teacherExamAlert && (
          <div className="p-4 bg-slate-50 border-l-4 border-slate-900 rounded-r-lg space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Exam Hint Announced In Class:
            </span>
            <p className="text-xs text-slate-700 font-medium">
              "{lecture.summary.teacherExamAlert}"
            </p>
          </div>
        )}

        {/* Synopsis & Key Takeaways */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            Lecture Synopsis
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {lecture.summary.overview}
          </p>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-2">
            Core Concepts to Master
          </h3>
          <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1.5">
            {lecture.summary.coreTakeaways.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Key Formulas */}
        {lecture.summary.keyFormulasOrTerms && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Key Formulas & Definitions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lecture.summary.keyFormulasOrTerms.map((f, i) => (
                <div key={i} className="p-3 border border-slate-200 rounded-lg text-xs">
                  <span className="font-bold font-mono text-slate-900 block">{f.term}</span>
                  <p className="text-slate-600 mt-0.5">{f.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scribe Notes */}
        {lecture.peerNotes.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Class Scribe Notes ({lecture.peerNotes[0].author} - {lecture.peerNotes[0].authorRole})
            </h2>
            <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {lecture.peerNotes[0].content}
            </div>
          </div>
        )}

        {/* Homework */}
        {lecture.homework.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Assigned Homework & Due Dates
            </h2>
            <div className="space-y-2">
              {lecture.homework.map((hw) => (
                <div key={hw.id} className="p-3 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{hw.title}</span>
                    <p className="text-slate-600">{hw.details}</p>
                  </div>
                  <span className="font-mono font-semibold text-slate-800 shrink-0">
                    Due: {hw.dueDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
          Archived via ClassCatchup · Shared for absent student study use
        </div>
      </div>
    </div>
  );
};
