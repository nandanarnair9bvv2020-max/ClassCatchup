import React, { useState } from 'react';
import { 
  Lock, Mail, IdCard, ArrowRight, ShieldCheck, GraduationCap, 
  Sparkles, CheckCircle2, Eye, EyeOff, AlertCircle, ArrowLeft, School
} from 'lucide-react';
import { StudentUser } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: StudentUser) => void;
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackToLanding,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form fields
  const [email, setEmail] = useState('tl25btcs0386@vidyaacademy.ac.in');
  const [collegeId, setCollegeId] = useState('TL25BTCS0386');
  const [password, setPassword] = useState('StudyPass2026!');
  const [fullName, setFullName] = useState('Arjun Nambiar');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [collegeName, setCollegeName] = useState('Vidya Academy of Science & Technology');
  const [semester, setSemester] = useState('Semester 3 (S3)');
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickFill = (type: 'user' | 'peer') => {
    if (type === 'user') {
      setEmail('tl25btcs0386@vidyaacademy.ac.in');
      setCollegeId('TL25BTCS0386');
      setPassword('StudyPass2026!');
      setFullName('Arjun Nambiar');
      setDepartment('Computer Science & Engineering');
      setCollegeName('Vidya Academy of Science & Technology');
    } else {
      setEmail('sarah.lin@vidyaacademy.ac.in');
      setCollegeId('TL25BTCS0114');
      setPassword('ScribeNotes2026!');
      setFullName('Sarah Lin');
      setDepartment('Computer Science & Engineering');
      setCollegeName('Vidya Academy of Science & Technology');
    }
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid college or university email address.');
      return;
    }
    if (!collegeId.trim() || collegeId.trim().length < 4) {
      setErrorMessage('Please enter your valid College Student ID / Roll Number (minimum 4 characters).');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const student: StudentUser = {
        collegeId: collegeId.toUpperCase().trim(),
        email: email.trim().toLowerCase(),
        fullName: fullName.trim() || 'Student',
        department: department.trim() || 'Engineering & Science',
        collegeName: collegeName.trim() || 'Vidya Academy of Science & Technology',
        semester,
        avatarInitials: (fullName.trim() || collegeId).slice(0, 2).toUpperCase(),
        isLoggedIn: true,
      };

      if (rememberMe) {
        localStorage.setItem('classcatchup_current_user', JSON.stringify(student));
      }

      onLoginSuccess(student);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* Top bar with back to intro */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg backdrop-blur-xs border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to ClassCatchup Intro</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-indigo-300 font-mono">
          <School className="w-4 h-4 text-indigo-400" />
          <span>Campus Authentication Portal</span>
        </div>
      </div>

      {/* Main Login Card Area */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 space-y-6">
          {/* Card Header */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30 mb-2">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight font-display text-slate-950">
              {isRegisterMode ? 'Register Student Access' : 'Student College Sign In'}
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Enter your student email, college ID, and password to access missed lectures and chalkboard notes.
            </p>
          </div>

          {/* Quick Demo Pre-fill Pill Bar */}
          <div className="bg-slate-100 p-2 rounded-xl text-center space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Quick 1-Click Fill Demo Credentials
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('user')}
                className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-indigo-50 text-indigo-700 rounded-lg border border-slate-200 transition-colors shadow-2xs"
              >
                Vidya Academy ID: TL25BTCS0386
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('peer')}
                className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 transition-colors shadow-2xs"
              >
                Scribe ID: TL25BTCS0114
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Student Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Arjun Nambiar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                  required
                />
              </div>
            )}

            {/* College Email */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                College / University Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student.id@vidyaacademy.ac.in"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-mono"
                  required
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Use your official institutional email (e.g. @vidyaacademy.ac.in)
              </span>
            </div>

            {/* College ID / Roll Number */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Student College ID / Roll Number
              </label>
              <div className="relative">
                <IdCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  placeholder="e.g. TL25BTCS0386"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-mono uppercase tracking-wider"
                  required
                />
              </div>
            </div>

            {isRegisterMode && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="Computer Science & Engineering">CS & Engineering</option>
                    <option value="Electronics & Communication">Electronics & Comm</option>
                    <option value="Mechanical Engineering">Mechanical Eng</option>
                    <option value="Civil Engineering">Civil Eng</option>
                    <option value="Applied Sciences">Applied Sciences</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="Semester 1 (S1)">Semester 1</option>
                    <option value="Semester 2 (S2)">Semester 2</option>
                    <option value="Semester 3 (S3)">Semester 3</option>
                    <option value="Semester 4 (S4)">Semester 4</option>
                    <option value="Semester 5 (S5)">Semester 5</option>
                    <option value="Semester 6 (S6)">Semester 6</option>
                  </select>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                {!isRegisterMode && (
                  <span className="text-[11px] text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span>Remember this device</span>
              </label>

              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Encrypted Campus Auth</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isRegisterMode ? 'Create Student Profile & Enter' : 'Sign In to ClassCatchup'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="text-center pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMessage('');
              }}
              className="text-xs text-slate-600 hover:text-indigo-600 font-medium transition-colors"
            >
              {isRegisterMode ? (
                <span>Already have a registered Student ID? <strong>Sign In</strong></span>
              ) : (
                <span>First time here with a new College ID? <strong>Register Access</strong></span>
              )}
            </button>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="mt-6 text-center space-y-1">
          <p className="text-[11px] text-slate-400">
            Vidya Academy of Science & Technology · ClassCatchup Student Network
          </p>
          <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400">
            <span>Student Privacy Protected</span>
            <span>·</span>
            <span>Zero Data Shared Outside College</span>
          </div>
        </div>
      </div>

      <div />
    </div>
  );
};
