import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AbsenteeHero } from './components/AbsenteeHero';
import { LectureCard } from './components/LectureCard';
import { LectureDetailModal } from './components/LectureDetailModal';
import { RequestBoard } from './components/RequestBoard';
import { UploadNoteModal } from './components/UploadNoteModal';
import { MyBinderView } from './components/MyBinderView';
import { ScheduleView } from './components/ScheduleView';
import { QuickAbsenceModal } from './components/QuickAbsenceModal';
import { PrintableLectureView } from './components/PrintableLectureView';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { INITIAL_SUBJECTS, INITIAL_LECTURES, INITIAL_REQUESTS, INITIAL_GRATITUDE } from './data/seedData';
import { ClassSubject, LectureSession, AbsenteeRequest, GratitudeEvent, StudentUser } from './types';
import { HeartHandshake, ShieldCheck, AlertCircle, BookOpen } from 'lucide-react';

export default function App() {
  // Screen Routing: 'landing' (Front page introduction) | 'login' (College auth) | 'app' (Main hub)
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    const saved = localStorage.getItem('classcatchup_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentScreen, setCurrentScreen] = useState<'landing' | 'login' | 'app'>(() => {
    // If student is already logged in, enter directly into the app hub, otherwise show front page intro
    const saved = localStorage.getItem('classcatchup_current_user');
    return saved ? 'app' : 'landing';
  });

  // Navigation & User Perspective within the Hub
  const [activeTab, setActiveTab] = useState<'browse' | 'requests' | 'binder' | 'schedule'>('browse');
  const [userRole, setUserRole] = useState<'absent_student' | 'in_class_peer'>('absent_student');

  // Core Data loaded from localStorage with initial seeds
  const [subjects] = useState<ClassSubject[]>(() => {
    const saved = localStorage.getItem('classcatchup_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [lectures, setLectures] = useState<LectureSession[]>(() => {
    const saved = localStorage.getItem('classcatchup_lectures');
    return saved ? JSON.parse(saved) : INITIAL_LECTURES;
  });

  const [requests, setRequests] = useState<AbsenteeRequest[]>(() => {
    const saved = localStorage.getItem('classcatchup_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [gratitudeEvents, setGratitudeEvents] = useState<GratitudeEvent[]>(() => {
    const saved = localStorage.getItem('classcatchup_gratitude');
    return saved ? JSON.parse(saved) : INITIAL_GRATITUDE;
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('classcatchup_bookmarks');
    return saved ? JSON.parse(saved) : ['lec-cs-101-2026-09-24'];
  });

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('classcatchup_completed');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter & Search
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-24');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Modals
  const [selectedLectureForDetail, setSelectedLectureForDetail] = useState<LectureSession | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isQuickAbsenceOpen, setIsQuickAbsenceOpen] = useState(false);
  const [printableLecture, setPrintableLecture] = useState<LectureSession | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('classcatchup_lectures', JSON.stringify(lectures));
  }, [lectures]);

  useEffect(() => {
    localStorage.setItem('classcatchup_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('classcatchup_gratitude', JSON.stringify(gratitudeEvents));
  }, [gratitudeEvents]);

  useEffect(() => {
    localStorage.setItem('classcatchup_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('classcatchup_completed', JSON.stringify(completedIds));
  }, [completedIds]);

  // Handlers
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompleted = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendGratitude = (author: string, message: string) => {
    const newEvent: GratitudeEvent = {
      id: `g-${Date.now()}`,
      targetAuthor: author,
      lectureTitle: selectedLectureForDetail?.title || 'Class Notes',
      message,
      karmaAdded: 10,
      timestamp: 'Just now',
    };
    setGratitudeEvents((prev) => [newEvent, ...prev]);

    // Also increment karma in lecture note
    if (selectedLectureForDetail) {
      setLectures((prev) =>
        prev.map((lec) => {
          if (lec.id === selectedLectureForDetail.id) {
            return {
              ...lec,
              peerNotes: lec.peerNotes.map((pn) =>
                pn.author === author ? { ...pn, karmaCount: pn.karmaCount + 10 } : pn
              ),
            };
          }
          return lec;
        })
      );
    }
  };

  const handleSaveNewLecture = (newLecture: LectureSession) => {
    setLectures((prev) => [newLecture, ...prev]);
    setSelectedLectureForDetail(newLecture);
  };

  const handleCreateRequest = (req: Omit<AbsenteeRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: AbsenteeRequest = {
      ...req,
      id: `req-${Date.now()}`,
      status: 'pending',
      createdAt: 'Just now',
    };
    setRequests((prev) => [newReq, ...prev]);
  };

  const handleFulfillRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'fulfilled',
              fulfilledBy: currentUser?.fullName || 'Peer Scribe (You)',
              fulfilledNotesCount: 1,
            }
          : r
      )
    );
    // Open upload modal to add the actual notes
    setIsUploadModalOpen(true);
  };

  const handleBookmarkAllDay = (ids: string[]) => {
    setBookmarkedIds((prev) => {
      const merged = new Set([...prev, ...ids]);
      return Array.from(merged);
    });
  };

  const handleLoginSuccess = (user: StudentUser) => {
    setCurrentUser(user);
    setCurrentScreen('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('classcatchup_current_user');
    setCurrentUser(null);
    setCurrentScreen('landing');
  };

  // Screen 1: Front Page Introduction
  if (currentScreen === 'landing') {
    return (
      <LandingPage
        onGoToLogin={() => setCurrentScreen('login')}
        onExploreDemo={() => setCurrentScreen('app')}
      />
    );
  }

  // Screen 2: College ID & Email Login Portal
  if (currentScreen === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setCurrentScreen('landing')}
      />
    );
  }

  // Screen 3: Printable Note Packet View
  if (printableLecture) {
    const matchingSub = subjects.find((s) => s.id === printableLecture.subjectId);
    return (
      <PrintableLectureView
        lecture={printableLecture}
        subject={matchingSub}
        onBack={() => setPrintableLecture(null)}
      />
    );
  }

  // Filtered lectures for the feed
  const filteredLectures = lectures.filter((lec) => {
    if (selectedSubjectId !== 'all' && lec.subjectId !== selectedSubjectId) {
      return false;
    }
    if (selectedDate !== 'all' && lec.date !== selectedDate) {
      return false;
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = lec.title.toLowerCase().includes(query);
      const matchSubject = subjects.find((s) => s.id === lec.subjectId)?.name.toLowerCase().includes(query);
      const matchOverview = lec.summary.overview.toLowerCase().includes(query);
      const matchNotes = lec.peerNotes.some((pn) => pn.content.toLowerCase().includes(query));
      const matchInstructor = lec.instructorName.toLowerCase().includes(query);
      if (!matchTitle && !matchSubject && !matchOverview && !matchNotes && !matchInstructor) {
        return false;
      }
    }
    return true;
  });

  const todayCount = lectures.filter((l) => l.date === '2026-09-24').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar with Student Auth State & Landing Link */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        currentUser={currentUser}
        onOpenUpload={() => setIsUploadModalOpen(true)}
        onOpenQuickAbsence={() => setIsQuickAbsenceOpen(true)}
        onGoToLanding={() => setCurrentScreen('landing')}
        onOpenLogin={() => setCurrentScreen('login')}
        onLogout={handleLogout}
      />

      {/* Main View Switching */}
      <main className="flex-1">
        {activeTab === 'browse' && (
          <div>
            {/* Absentee Hero with date & subject filter */}
            <AbsenteeHero
              subjects={subjects}
              selectedSubjectId={selectedSubjectId}
              setSelectedSubjectId={setSelectedSubjectId}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalLecturesToday={todayCount}
            />

            {/* Lecture Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 font-display">
                    {selectedDate === '2026-09-24'
                      ? "Today's Archived Lectures"
                      : selectedDate === '2026-09-23'
                      ? "Yesterday's Archived Lectures"
                      : selectedDate === 'all'
                      ? 'All Archived Class Sessions'
                      : `Lectures on ${selectedDate}`}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing {filteredLectures.length} {filteredLectures.length === 1 ? 'class session' : 'class sessions'} with chalkboard photos, scribe notes & homework
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsQuickAbsenceOpen(true)}
                    className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Catch Up On Missed Day</span>
                  </button>
                </div>
              </div>

              {filteredLectures.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4 max-w-xl mx-auto my-8">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      No Notes Found for This Selection
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Were you absent for a class that isn't listed here yet? You can submit a 1-click anonymous request and classmates will upload the notes!
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDate('all');
                        setSelectedSubjectId('all');
                        setSearchQuery('');
                      }}
                      className="px-3.5 py-2 text-xs font-semibold border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50"
                    >
                      Reset Filters
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('requests')}
                      className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                    >
                      Post Anonymous Request
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLectures.map((lecture) => {
                    const sub = subjects.find((s) => s.id === lecture.subjectId);
                    const isBookmarked = bookmarkedIds.includes(lecture.id);
                    const isCompleted = completedIds.includes(lecture.id);

                    return (
                      <LectureCard
                        key={lecture.id}
                        lecture={lecture}
                        subject={sub}
                        isBookmarked={isBookmarked}
                        isCompleted={isCompleted}
                        onToggleBookmark={() => handleToggleBookmark(lecture.id)}
                        onToggleCompleted={() => handleToggleCompleted(lecture.id)}
                        onOpenDetail={() => setSelectedLectureForDetail(lecture)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <RequestBoard
            requests={requests}
            subjects={subjects}
            userRole={userRole}
            onCreateRequest={handleCreateRequest}
            onFulfillRequest={handleFulfillRequest}
          />
        )}

        {activeTab === 'binder' && (
          <MyBinderView
            lectures={lectures}
            subjects={subjects}
            bookmarkedIds={bookmarkedIds}
            completedIds={completedIds}
            gratitudeEvents={gratitudeEvents}
            onOpenDetail={(lec) => setSelectedLectureForDetail(lec)}
            onToggleBookmark={handleToggleBookmark}
            onToggleCompleted={handleToggleCompleted}
            onOpenPrintView={(lec) => setPrintableLecture(lec)}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView
            subjects={subjects}
            lectures={lectures}
            onSelectLecture={(lec) => setSelectedLectureForDetail(lec)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 font-display">ClassCatchup</span>
            <span aria-hidden="true">·</span>
            <span>Student-to-student lecture repository for absent classmates</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentScreen('landing')}
              className="hover:text-indigo-600 transition-colors"
            >
              About / Intro
            </button>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Peer Verified Notes</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-indigo-700">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>No Awkward DMs Needed</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Flagship Lecture Detail Modal */}
      {selectedLectureForDetail && (
        <LectureDetailModal
          lecture={selectedLectureForDetail}
          subject={subjects.find((s) => s.id === selectedLectureForDetail.subjectId)}
          isOpen={true}
          isBookmarked={bookmarkedIds.includes(selectedLectureForDetail.id)}
          isCompleted={completedIds.includes(selectedLectureForDetail.id)}
          onClose={() => setSelectedLectureForDetail(null)}
          onToggleBookmark={() => handleToggleBookmark(selectedLectureForDetail.id)}
          onToggleCompleted={() => handleToggleCompleted(selectedLectureForDetail.id)}
          onSendGratitude={handleSendGratitude}
          onOpenPrintView={(lec) => {
            setSelectedLectureForDetail(null);
            setPrintableLecture(lec);
          }}
        />
      )}

      {/* In-Class Contributor Upload Modal */}
      {isUploadModalOpen && (
        <UploadNoteModal
          subjects={subjects}
          isOpen={true}
          onClose={() => setIsUploadModalOpen(false)}
          onSaveLecture={handleSaveNewLecture}
        />
      )}

      {/* Quick Day Absence Recovery Modal */}
      {isQuickAbsenceOpen && (
        <QuickAbsenceModal
          isOpen={true}
          onClose={() => setIsQuickAbsenceOpen(false)}
          lectures={lectures}
          subjects={subjects}
          onOpenDetail={(lec) => setSelectedLectureForDetail(lec)}
          onBookmarkAll={handleBookmarkAllDay}
        />
      )}
    </div>
  );
}
