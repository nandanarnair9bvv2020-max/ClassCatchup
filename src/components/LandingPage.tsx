import React, { useState } from 'react';
import { 
  Camera, FileText, CheckCircle2, ShieldCheck, HeartHandshake, 
  Sparkles, ArrowRight, AlertTriangle, BookOpen, Clock, 
  MessageSquare, Users, ChevronRight, Lock, Eye
} from 'lucide-react';
import { CLASS_ASSETS } from '../data/assets';

interface LandingPageProps {
  onGoToLogin: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGoToLogin,
  onExploreDemo,
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'board' | 'exam_alert' | 'summary' | 'request'>('board');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Front Page Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
              ClassCatchup
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
              Campus Academic Network
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <a href="#problem" className="hover:text-slate-900 transition-colors">
              The Absentee Dilemma
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">
              Class Feedback
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onExploreDemo}
              className="hidden sm:flex px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Live Demo
            </button>
            <button
              type="button"
              onClick={onGoToLogin}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>College ID Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50/80 border border-indigo-200/80 px-3 py-1 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>The Student-Led Repository for Absent Classmates</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1] font-display">
                Missed class today? <br />
                <span className="text-indigo-600">Never text 5 people</span> asking for notes again.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                When you're out sick, commuting, or dealing with an emergency, you shouldn't have to face the anxiety of messaging classmates or deciphering blurry photos. ClassCatchup gives absent students instant access to high-res blackboard snapshots, student scribe notes, homework deadlines, and verbal teacher exam warnings.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onGoToLogin}
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Enter Student Portal</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  type="button"
                  onClick={onExploreDemo}
                  className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-sm font-semibold shadow-xs flex items-center gap-2 transition-all"
                >
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span>Preview Today's Class Notes</span>
                </button>
              </div>

              {/* Typographic proof metrics without pills */}
              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Free for College Students</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>No Phone Numbers Shared</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
                  <HeartHandshake className="w-4 h-4 text-amber-600" />
                  <span>Anonymous Note Requests</span>
                </span>
              </div>
            </div>

            {/* Right Interactive Preview Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-5 shadow-xl border border-slate-200/90 space-y-4">
                {/* Simulated Lecture Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      CS 101 · Period 2 (10:00 AM)
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5 font-display">
                      Binary Search Trees: AVL Rotations
                    </h3>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                    Archived Today
                  </span>
                </div>

                {/* Real Chalkboard Image Preview */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-44 bg-slate-950">
                  <img
                    src={CLASS_ASSETS.blackboardCS}
                    alt="Classroom blackboard preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium flex items-center gap-1.5 drop-shadow-sm">
                      <Camera className="w-3.5 h-3.5 text-indigo-300" />
                      <span>Chalkboard 1: Double Rotation Derivation (Full Resolution)</span>
                    </span>
                  </div>
                </div>

                {/* Verbal Teacher Exam Warning Box */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Teacher Spoken Exam Cue:</span>
                  </div>
                  <p className="text-[11px] text-amber-950 leading-relaxed italic">
                    "Question 2 on the midterm will specifically test intermediate pivot rotations—not just the final tree!"
                  </p>
                </div>

                {/* Homework tag */}
                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span className="font-semibold text-slate-800">Problem Set 5 Due Tuesday</span>
                  </span>
                  <span className="text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={onExploreDemo}>
                    View Packet →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: The Absent Student Problem */}
      <section id="problem" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              The Reality of Missing Class
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              Why texting classmates for notes feels so uncomfortable
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every college and high school student knows the friction of missing a lecture. The current workarounds leave absent students stressed and behind.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                The Awkward Group Chat Ask
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reaching out to acquaintances feels intrusive. Messages get left on "Seen", students don't want to seem needy, or you end up asking someone whose handwriting is illegible.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Missing Spoken Teacher Cues
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Textbooks and syllabi never capture the oral hints professors announce in class: <em>"This specific theorem will be 30% of next week's exam."</em> Absent students miss these completely.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Zero Incentive for Note Takers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated students who take great notes get flooded with individual DMs. With ClassCatchup, they upload once, earn institutional Karma, and help the entire cohort at once.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: How It Works in 3 Steps */}
      <section id="how-it-works" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              The Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              How ClassCatchup works in 3 seamless steps
            </h2>
            <p className="text-sm text-slate-600">
              A self-sustaining peer loop where students in class support absent peers without friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 relative">
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Step 01
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Peers Archive Today's Lecture
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Designated class scribes or front-row students snap the chalkboard, attach typed or handwritten notes, and record oral teacher announcements before leaving the lecture hall.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 relative">
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Step 02
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Absent Student Opens the Hub
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log in with your College ID and select the date you were away. View full chalkboard photos, copy homework details, and read the 3-minute executive catch-up summary.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 relative">
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Step 03
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Anonymous Q&A & Appreciation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need more details? Ask the AI lecture assistant or drop an anonymous request. Send 1-click thank-you gratitude to the scribe who uploaded the notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Interactive Feature Showcase */}
      <section id="features" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Inside The Platform
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              Everything an absent student needs to return prepared
            </h2>
            <p className="text-sm text-slate-600">
              Click through the core components built into every lecture session archive.
            </p>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl mb-8 overflow-x-auto">
              {[
                { id: 'board', label: 'Blackboard Camera Snaps', icon: Camera },
                { id: 'exam_alert', label: 'Verbal Exam Warning Box', icon: AlertTriangle },
                { id: 'summary', label: '3-Minute Absentee Brief', icon: BookOpen },
                { id: 'request', label: 'Anonymous Note Request Board', icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activePreviewTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePreviewTab(tab.id as any)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Feature Tab Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
              {activePreviewTab === 'board' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      High-Resolution Blackboard Capture
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Actual Board Proofs & Mathematical Diagrams
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Scribes upload high-resolution photos of classroom blackboards and whiteboards. You can zoom in up to 250% to inspect indices, minus signs, and coordinate axes that are impossible to read in compressed WhatsApp images.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Zoom from 75% to 250% with pan controls</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Annotated key takeaways from the scribe</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Integrated blackboard sketchpad for formula drawings</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-sm h-64 bg-slate-900">
                    <img
                      src={CLASS_ASSETS.blackboardCS}
                      alt="Blackboard snapshot feature"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {activePreviewTab === 'exam_alert' && (
                <div className="space-y-4 max-w-xl mx-auto">
                  <div className="text-center space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Verbal In-Class Cue Tracker
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Teacher Exam Alerts & Spoken Warnings
                    </h3>
                    <p className="text-xs text-slate-600">
                      The most dangerous part of missing class is missing what the professor said aloud.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Class Announcement Captured Today:</span>
                    </div>
                    <p className="text-sm font-medium italic leading-relaxed">
                      "Make sure you understand the derivation shown in the second half of lecture 24—it is guaranteed to be on next week’s quiz. Do not skip the pivot rotation step!"
                    </p>
                    <span className="text-[11px] text-amber-700 block pt-1">
                      Logged by front-row class scribe · Verified by 3 peers
                    </span>
                  </div>
                </div>
              )}

              {activePreviewTab === 'summary' && (
                <div className="space-y-4 max-w-xl mx-auto">
                  <div className="text-center space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Fast Catchup Protocol
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      3-Minute Absentee Executive Brief
                    </h3>
                    <p className="text-xs text-slate-600">
                      Don't have time to read 15 pages of notes right away? Start with the 3-minute essentials.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 text-xs text-slate-700">
                    <div className="font-bold text-slate-900 border-b border-slate-100 pb-2">
                      What was covered in class today:
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>Proved the AVL balance condition: |height(L) - height(R)| &lt;= 1 for all internal nodes.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>Demonstrated Left-Left Single Rotation and Left-Right Double Rotation on the board.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>Assigned Problem Set 5 due next Tuesday at 11:59 PM.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activePreviewTab === 'request' && (
                <div className="space-y-4 max-w-xl mx-auto">
                  <div className="text-center space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      Privacy-First Assistance
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Anonymous Classroom Note Requests
                    </h3>
                    <p className="text-xs text-slate-600">
                      Need notes for a lecture that hasn't been uploaded yet? Post anonymously without sharing contact info.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Posted by "Absent Student in Row 4"</span>
                      <span className="text-amber-600 font-semibold">Awaiting Notes</span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      Need Lab Spectrophotometer Calibration Data at 540nm
                    </div>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      "I was home sick today with a fever. Could someone share the trial 1-4 absorbance readings from period 3 so I can finish the lab report tonight?"
                    </p>
                    <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                      Attending peers can fulfill this with 1-click note upload and earn +20 Karma!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Testimonials */}
      <section id="testimonials" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Student Endorsements
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              Built for real college classrooms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "I caught severe viral fever right before midterms. Instead of stressing out and texting 10 different people for photos, I just logged in with my student ID and had every single blackboard derivation ready to study."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  AN
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Arjun Nambiar</div>
                  <div className="text-[10px] text-slate-400">Computer Science · S3</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "As the elected class scribe, I used to get 20 separate DMs asking for my notes. Now I take clear pictures of the board once, upload them to ClassCatchup, and see genuine thank-you notes from absent friends."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                  SL
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Sarah Lin</div>
                  <div className="text-[10px] text-slate-400">Class Scribe · Vidya Academy</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "The Teacher Exam Alert box saved my grade. The professor verbally hinted at a specific matrix proof that wasn't in any handout, and our in-class peers recorded it right in the session packet."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">
                  CD
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Chloe Dupont</div>
                  <div className="text-[10px] text-slate-400">Math & Physics Honor Society</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-800/80 px-3 py-1 rounded-lg">
            <Lock className="w-3.5 h-3.5" />
            <span>Campus Student Access</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Ready to catch up on missed lectures without the stress?
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Enter your college email and student ID to immediately browse today's chalkboard photos, scribe notes, and homework announcements.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onGoToLogin}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Sign In with College ID</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onExploreDemo}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Explore Missed Classes Feed
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 font-display">ClassCatchup</span>
            <span aria-hidden="true">·</span>
            <span>Vidya Academy Student Peer Academic Repository</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onGoToLogin}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Student Sign In
            </button>
            <span aria-hidden="true">·</span>
            <span>Strict Student Privacy</span>
            <span aria-hidden="true">·</span>
            <span>Zero Third-Party Tracking</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
