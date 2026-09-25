export interface ClassSubject {
  id: string;
  code: string;
  name: string;
  instructor: string;
  room: string;
  schedule: string;
  accentColor: string;
  totalLectures: number;
  unresolvedRequests: number;
}

export interface BoardPhoto {
  id: string;
  imageUrl: string;
  caption: string;
  uploadedBy: string;
  timestamp: string;
  boardType: 'blackboard' | 'whiteboard' | 'slides' | 'lab_diagram';
  keyNotes: string[];
}

export interface PeerNote {
  id: string;
  author: string;
  authorRole: string; // e.g., "Elected Class Scribe", "Row 2 Scribe", "Math Club Tutor"
  format: 'markdown' | 'handwritten_scan' | 'formula_sheet';
  title: string;
  content: string;
  handwrittenScanUrl?: string;
  timestamp: string;
  karmaCount: number;
  isVerified?: boolean;
}

export interface HomeworkItem {
  id: string;
  title: string;
  dueDate: string;
  details: string;
  isUrgent?: boolean;
  estimatedMinutes?: number;
}

export interface LectureSession {
  id: string;
  subjectId: string;
  date: string; // YYYY-MM-DD
  period: string; // "Period 2 · 10:00 AM - 11:15 AM"
  sessionNumber: number;
  title: string;
  instructorName: string;
  room: string;
  summary: {
    overview: string;
    coreTakeaways: string[];
    teacherExamAlert: string; // Verbal cues professor announced in class
    keyFormulasOrTerms: { term: string; explanation: string }[];
  };
  homework: HomeworkItem[];
  boardPhotos: BoardPhoto[];
  peerNotes: PeerNote[];
  audioBrief?: {
    duration: string;
    speaker: string;
    summaryText: string;
  };
  attachments: {
    name: string;
    size: string;
    type: string;
  }[];
}

export interface AbsenteeRequest {
  id: string;
  subjectId: string;
  date: string;
  topicTitle: string;
  requestNote: string;
  category: 'board_photo' | 'typed_notes' | 'homework_clarification' | 'lab_data';
  anonymousAlias: string;
  status: 'pending' | 'fulfilled';
  fulfilledBy?: string;
  fulfilledNotesCount?: number;
  createdAt: string;
  urgency: 'high' | 'normal';
}

export interface GratitudeEvent {
  id: string;
  targetAuthor: string;
  lectureTitle: string;
  message: string;
  karmaAdded: number;
  timestamp: string;
}

export interface StudentUser {
  collegeId: string;
  email: string;
  fullName: string;
  department: string;
  collegeName: string;
  semester?: string;
  avatarInitials?: string;
  isLoggedIn: boolean;
}
