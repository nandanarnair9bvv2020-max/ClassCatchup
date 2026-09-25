import React from 'react';
import { BookOpen, PlusCircle, LogOut, GraduationCap, Home, LogIn } from 'lucide-react';
import { StudentUser } from '../types';

interface NavbarProps {
  activeTab: 'browse' | 'requests' | 'binder' | 'schedule';
  setActiveTab: (tab: 'browse' | 'requests' | 'binder' | 'schedule') => void;
  userRole: 'absent_student' | 'in_class_peer';
  setUserRole: (role: 'absent_student' | 'in_class_peer') => void;
  currentUser: StudentUser | null;
  onOpenUpload: () => void;
  onOpenQuickAbsence: () => void;
  onGoToLanding: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  currentUser,
  onOpenUpload,
  onOpenQuickAbsence,
  onGoToLanding,
  onOpenLogin,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark + intro link */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('browse')}
            className="text-xl font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors whitespace-nowrap font-display"
          >
            ClassCatchup
          </button>

          <button
            type="button"
            onClick={onGoToLanding}
            className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-md"
            title="View Introduction & About ClassCatchup"
          >
            <Home className="w-3 h-3" />
            <span>Intro Page</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('browse')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'browse'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5'
                : 'hover:text-slate-900'
            }`}
          >
            Missed Lectures
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'requests'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5'
                : 'hover:text-slate-900'
            }`}
          >
            Anonymous Requests
          </button>

          <button
            onClick={() => setActiveTab('binder')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'binder'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5'
                : 'hover:text-slate-900'
            }`}
          >
            My Catchup Binder
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'schedule'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5'
                : 'hover:text-slate-900'
            }`}
          >
            Class Schedule
          </button>
        </nav>

        {/* Zone 3: Actions & User Authentication Badge */}
        <div className="flex items-center gap-3">
          {/* Role switcher toggle */}
          <div className="hidden sm:flex items-center p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setUserRole('absent_student')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                userRole === 'absent_student'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="View as student who missed class and needs notes"
            >
              Absent Student
            </button>
            <button
              onClick={() => setUserRole('in_class_peer')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                userRole === 'in_class_peer'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="View as peer student who attended and uploads notes"
            >
              In-Class Peer
            </button>
          </div>

          {/* Primary Action Button */}
          {userRole === 'absent_student' ? (
            <button
              onClick={onOpenQuickAbsence}
              className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Catch Up On Missed Day</span>
              <span className="sm:hidden">Catch Up</span>
            </button>
          ) : (
            <button
              onClick={onOpenUpload}
              className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload Notes</span>
              <span className="sm:hidden">Upload</span>
            </button>
          )}

          {/* Student Auth Profile or Login Button */}
          {currentUser && currentUser.isLoggedIn ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div
                className="hidden xl:flex flex-col text-right leading-tight"
                title={`${currentUser.email} (${currentUser.collegeName})`}
              >
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {currentUser.collegeId}
                </span>
                <span className="text-[10px] text-slate-500 truncate max-w-[130px]">
                  {currentUser.fullName}
                </span>
              </div>

              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold text-xs font-mono">
                {currentUser.avatarInitials || currentUser.collegeId.slice(0, 2)}
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                title="Log Out Student Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-500" />
              <span>College Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
