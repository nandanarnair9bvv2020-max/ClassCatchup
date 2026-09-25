import { ClassSubject, LectureSession, AbsenteeRequest, GratitudeEvent } from '../types';
import { CLASS_ASSETS } from './assets';

export const INITIAL_SUBJECTS: ClassSubject[] = [
  {
    id: 'cs-101',
    code: 'CS 101',
    name: 'Data Structures & Algorithms',
    instructor: 'Prof. Aris Thorne',
    room: 'Turing Hall 304',
    schedule: 'Mon, Wed, Thu · 10:00 - 11:15 AM',
    accentColor: 'indigo',
    totalLectures: 24,
    unresolvedRequests: 1,
  },
  {
    id: 'math-240',
    code: 'MATH 240',
    name: 'Linear Algebra & Matrix Theory',
    instructor: 'Dr. Elena Rostova',
    room: 'Euler Science Center 102',
    schedule: 'Mon, Tue, Thu · 01:30 - 02:45 PM',
    accentColor: 'sky',
    totalLectures: 26,
    unresolvedRequests: 0,
  },
  {
    id: 'phys-211',
    code: 'PHYS 211',
    name: 'General Physics: Mechanics',
    instructor: 'Dr. Marcus Vance',
    room: 'Newton Lecture Hall A',
    schedule: 'Wed, Thu, Fri · 08:30 - 09:45 AM',
    accentColor: 'amber',
    totalLectures: 22,
    unresolvedRequests: 1,
  },
  {
    id: 'chem-102',
    code: 'CHEM 102',
    name: 'Chemical Equilibrium & Kinetics',
    instructor: 'Prof. Clara Higgins',
    room: 'Curie Lab Building 210',
    schedule: 'Tue, Wed, Fri · 11:30 - 12:45 PM',
    accentColor: 'emerald',
    totalLectures: 20,
    unresolvedRequests: 0,
  },
];

export const INITIAL_LECTURES: LectureSession[] = [
  {
    id: 'lec-cs-101-2026-09-24',
    subjectId: 'cs-101',
    date: '2026-09-24',
    period: 'Period 2 · 10:00 AM - 11:15 AM',
    sessionNumber: 24,
    title: 'Binary Search Trees: Traversal & AVL Balance Conditions',
    instructorName: 'Prof. Aris Thorne',
    room: 'Turing Hall 304',
    summary: {
      overview: 'Introduced AVL balance factors balance(v) = height(left) - height(right) and demonstrated why standard un-balanced BST degrades to O(n) linked list behavior on sorted input. Proved single and double rotations on the chalkboard.',
      coreTakeaways: [
        'A binary search tree guarantees O(log n) search ONLY when tree height is bounded by logarithmic depth.',
        'AVL property requires |height(left) - height(right)| <= 1 for EVERY node in the tree.',
        'Left-Left and Right-Right imbalances require a Single Rotation.',
        'Left-Right and Right-Left imbalances require a Double Rotation (child first, then parent).'
      ],
      teacherExamAlert: 'Prof. Thorne explicitly told the class: "Question 2 on Midterm 2 will require you to trace the double rotation step-by-step for key insertion into an AVL tree. Do not just draw the final tree—show the intermediate pivot."',
      keyFormulasOrTerms: [
        { term: 'Balance Factor (BF)', explanation: 'BF(N) = Height(LeftSubtree) - Height(RightSubtree). Must be in {-1, 0, 1}.' },
        { term: 'Inorder Traversal', explanation: 'Visits nodes Left -> Root -> Right. Guarantees keys are emitted in strictly ascending order.' },
        { term: 'Double Rotation (LR)', explanation: 'Rotate Left on left child, followed by Rotate Right on the root node.' }
      ]
    },
    homework: [
      {
        id: 'hw-cs-24',
        title: 'Problem Set 5: Self-Balancing Trees',
        dueDate: 'Tuesday, Sep 29 · 11:59 PM',
        details: 'Implement AVL insertion in Java/C++ and trace deletions on pages 148–151. Submit through the class portal.',
        isUrgent: true,
        estimatedMinutes: 90
      }
    ],
    boardPhotos: [
      {
        id: 'bp-cs-1',
        imageUrl: CLASS_ASSETS.blackboardCS,
        caption: 'Chalkboard 1: Binary search tree balance condition & O(log n) time complexity proof',
        uploadedBy: 'Marcus K. (Front Row Scribe)',
        timestamp: '10:48 AM Today',
        boardType: 'blackboard',
        keyNotes: ['Height proof derivation', 'Left vs Right subtree depth formula', 'Pointer rewiring diagrams']
      }
    ],
    peerNotes: [
      {
        id: 'pn-cs-1',
        author: 'Sarah Lin',
        authorRole: 'Elected Class Scribe · Top Contributor',
        format: 'markdown',
        title: 'Complete Lecture Transcript & Diagram Walkthrough',
        content: `### AVL Tree Balance Mechanics & Rotations
**Date:** Sep 24, 2026 | **Lecturer:** Prof. Thorne

#### 1. Why naive BSTs fail in the real world:
If we insert elements in sorted order: \`[10, 20, 30, 40, 50]\`, our BST resembles a degenerate linear linked list. Searching takes **O(n)** time rather than **O(log n)**.

#### 2. The AVL Invariant:
For every internal node $v$:
$$\\text{Balance Factor}(v) = \\text{height}(v.\\text{left}) - \\text{height}(v.\\text{right})$$
Valid balance factors are strictly: $\\{-1, 0, +1\\}$.

#### 3. Rotations Cheat-Sheet:
- **Case 1 (Left-Left):**
  - Node is heavy on left, left child is heavy on left.
  - Solution: Single **Right Rotation** on root.
- **Case 2 (Left-Right):**
  - Node is heavy on left, left child is heavy on right.
  - Solution: **Left Rotation** on left child, followed by **Right Rotation** on root.

> **Crucial Verbal Note:** The professor gave a hint about the midterm: "Always verify whether the problem asks for tree height starting at index 0 (edges) or index 1 (nodes). For our course, a leaf has height 0."`,
        timestamp: '11:22 AM Today',
        karmaCount: 38,
        isVerified: true
      },
      {
        id: 'pn-cs-2',
        author: 'David Chen',
        authorRole: 'Row 3 Note Taker',
        format: 'formula_sheet',
        title: 'Quick 1-Page Rotation Algorithm & Edge Cases',
        content: `### Quick Rotation Pseudo-code
\`\`\`text
RightRotate(y):
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    updateHeight(y)
    updateHeight(x)
    return x
\`\`\`
*Common mistake on quizzes:* Forgetting to update the heights of y before x!`,
        timestamp: '11:35 AM Today',
        karmaCount: 19
      }
    ],
    audioBrief: {
      duration: '2:40',
      speaker: 'Sarah Lin (Audio Recap)',
      summaryText: '2-minute student voice walkthrough: covers the 4 rotation cases and where classmates got confused during the professor’s live pointer demonstration.'
    },
    attachments: [
      { name: 'AVL_Tree_Rotations_Handout.pdf', size: '1.4 MB', type: 'Handout' },
      { name: 'lecture24_starter_code.zip', size: '340 KB', type: 'Code' }
    ]
  },
  {
    id: 'lec-math-240-2026-09-24',
    subjectId: 'math-240',
    date: '2026-09-24',
    period: 'Period 4 · 01:30 PM - 02:45 PM',
    sessionNumber: 26,
    title: 'Eigenvalues, Eigenvectors & Matrix Diagonalization (A = PDP⁻¹)',
    instructorName: 'Dr. Elena Rostova',
    room: 'Euler Science Center 102',
    summary: {
      overview: 'Covered the characteristic polynomial det(A - λI) = 0 and how to construct eigenspaces. Walked through the complete step-by-step diagonalization algorithm for 3x3 matrices.',
      coreTakeaways: [
        'An n x n matrix A is diagonalizable if and only if it has n linearly independent eigenvectors.',
        'Eigenvalues are the roots of the characteristic equation det(A - λI) = 0.',
        'Geometric multiplicity of each eigenvalue cannot exceed its algebraic multiplicity.',
        'Matrix powers become effortless once diagonalized: A^k = P * D^k * P^-1.'
      ],
      teacherExamAlert: 'Dr. Rostova warned: "In the 3x3 problem, people consistently make arithmetic errors computing the 2x2 cofactors of det(A - λI). Practice expanding along the row with the most zeros!"',
      keyFormulasOrTerms: [
        { term: 'Characteristic Equation', explanation: 'det(A - λI) = 0. Solving for λ yields the scalar eigenvalues.' },
        { term: 'Eigenspace E_λ', explanation: 'Null space of (A - λI). Basis vectors of this nullspace form the matrix P.' },
        { term: 'Diagonal Matrix D', explanation: 'Diagonal entries are the ordered eigenvalues λ_1, λ_2, ..., λ_n.' }
      ]
    },
    homework: [
      {
        id: 'hw-math-26',
        title: 'Section 5.3 Exercises 4, 8, 14, 22',
        dueDate: 'Monday, Sep 28 · Beginning of Class',
        details: 'Find eigenvalues, bases for eigenspaces, and check if diagonalizable. Show all cofactor expansions clearly.',
        isUrgent: false,
        estimatedMinutes: 75
      }
    ],
    boardPhotos: [
      {
        id: 'bp-math-1',
        imageUrl: CLASS_ASSETS.notebookMath,
        caption: 'Handwritten spiral notebook scan: Complete 3x3 Diagonalization with P and D matrix construction',
        uploadedBy: 'Chloe Dupont (Math TA Scribe)',
        timestamp: '02:50 PM Today',
        boardType: 'whiteboard',
        keyNotes: ['Cofactor signs grid (+ - +)', 'Eigenspace dimension check', 'Inverting 2x2 matrix shortcut']
      }
    ],
    peerNotes: [
      {
        id: 'pn-math-1',
        author: 'Chloe Dupont',
        authorRole: 'Math Honor Society Scribe',
        format: 'markdown',
        title: 'Step-by-Step Diagonalization Protocol & Common Traps',
        content: `### Matrix Diagonalization Workflow ($A = PDP^{-1}$)
**Date:** Sep 24, 2026 | **Instructor:** Dr. Elena Rostova

#### The 4 Step Protocol:
1. **Find Eigenvalues:**
   Calculate $\\det(A - \\lambda I) = 0$.
2. **Find Eigenvectors:**
   For each distinct $\\lambda_i$, find non-trivial solutions to $(A - \\lambda_i I)\\vec{v} = \\vec{0}$ by row-reducing to RREF.
3. **Verify Linearly Independent Count:**
   You must have $n$ eigenvectors in total for an $n \\times n$ matrix. If an eigenvalue with multiplicity 2 only yields 1 eigenvector, the matrix is **not** diagonalizable!
4. **Form $P$ and $D$:**
   - Columns of $P$ are the eigenvectors in order.
   - Diagonal of $D$ holds matching eigenvalues.

> **Exam Hint from Dr. Rostova:** "Question on Quiz 4: Why is $A^k = P D^k P^{-1}$ useful? Because raising a diagonal matrix to power $k$ simply takes $(d_{ii})^k$ in $O(n)$ steps!"`,
        timestamp: '03:10 PM Today',
        karmaCount: 42,
        isVerified: true
      }
    ],
    audioBrief: {
      duration: '3:15',
      speaker: 'Chloe Dupont',
      summaryText: 'Quick audio briefing on how Dr. Rostova derived the characteristic equation shortcut and how to avoid the negative sign trap in determinant cofactors.'
    },
    attachments: [
      { name: 'Linear_Algebra_5.3_Diagonalization_Handout.pdf', size: '890 KB', type: 'Worksheet' }
    ]
  },
  {
    id: 'lec-phys-211-2026-09-24',
    subjectId: 'phys-211',
    date: '2026-09-24',
    period: 'Period 1 · 08:30 AM - 09:45 AM',
    sessionNumber: 22,
    title: 'Rotational Dynamics, Moment of Inertia & Parallel Axis Theorem',
    instructorName: 'Dr. Marcus Vance',
    room: 'Newton Lecture Hall A',
    summary: {
      overview: 'Transitioned from linear kinematic motion to rotational motion. Derived moment of inertia for continuous bodies and applied Parallel Axis Theorem I = I_cm + Md^2 to rolling cylinders on an incline.',
      coreTakeaways: [
        'Mass in linear motion maps to Moment of Inertia I in rotational motion (torque τ = I * α).',
        'Parallel Axis Theorem: I = I_cm + M * d^2 where d is distance between the two parallel axes.',
        'Total kinetic energy of a rolling object without slipping: K = (1/2)Mv^2 + (1/2)Iω^2.',
        'A hollow cylinder rolls slower down a ramp than a solid cylinder of identical mass and radius.'
      ],
      teacherExamAlert: 'Dr. Vance stressed: "Students almost always forget that Parallel Axis Theorem only works if one of the two axes passes through the CENTER OF MASS. You cannot shift between two arbitrary offset axes without going through CM!"',
      keyFormulasOrTerms: [
        { term: 'Moment of Inertia', explanation: 'I = ∫ r^2 dm for continuous body; measures resistance to angular acceleration.' },
        { term: 'Parallel Axis Theorem', explanation: 'I = I_cm + M d^2 (axis must be parallel and relative to center of mass).' },
        { term: 'Rolling Constraint', explanation: 'v_cm = R * ω (condition for rolling without slipping).' }
      ]
    },
    homework: [
      {
        id: 'hw-phys-22',
        title: 'MasteringPhysics: Set 6 (Incline Dynamics)',
        dueDate: 'Friday, Sep 25 · 11:59 PM',
        details: 'Six numerical problems on spheres and hollow cylinders racing down 30-degree inclines.',
        isUrgent: true,
        estimatedMinutes: 60
      }
    ],
    boardPhotos: [
      {
        id: 'bp-phys-1',
        imageUrl: CLASS_ASSETS.whiteboardPhysics,
        caption: 'Whiteboard 2: Free body diagram for rolling sphere showing static friction direction & torque',
        uploadedBy: 'Liam O’Connor',
        timestamp: '09:30 AM Today',
        boardType: 'whiteboard',
        keyNotes: ['Friction force pointing up ramp', 'Angular momentum vector', 'Center of mass acceleration derivation']
      }
    ],
    peerNotes: [
      {
        id: 'pn-phys-1',
        author: 'Liam O’Connor',
        authorRole: 'Physics Study Group Lead',
        format: 'markdown',
        title: 'Rolling Motion Without Slipping: Free Body Diagram & Energy Balance',
        content: `### Rotational Mechanics: Rolling on Incline
**Lecturer:** Dr. Marcus Vance | **Date:** Sep 24, 2026

#### Energy Conservation Analysis:
At top of incline of height $h$:
$$E_{\\text{initial}} = Mgh$$

At bottom:
$$E_{\\text{final}} = \\frac{1}{2} M v_{\\text{cm}}^2 + \\frac{1}{2} I_{\\text{cm}} \\omega^2$$

Since no slipping: $\\omega = \\frac{v_{\\text{cm}}}{R}$
$$Mgh = \\frac{1}{2} v_{\\text{cm}}^2 \\left( M + \\frac{I_{\\text{cm}}}{R^2} \\right)$$

Solving for velocity at bottom:
$$v_{\\text{cm}} = \\sqrt{\\frac{2gh}{1 + \\frac{I_{\\text{cm}}}{MR^2}}}$$

**Key Physical Insight:**
Notice that mass $M$ and radius $R$ cancel out! The race depends solely on the geometric factor $c = \\frac{I_{\\text{cm}}}{MR^2}$.
- Solid sphere: $c = 0.4$ (Fastest!)
- Solid cylinder: $c = 0.5$
- Hollow sphere: $c = 0.67$
- Thin hoop: $c = 1.0$ (Slowest!)`,
        timestamp: '10:00 AM Today',
        karmaCount: 31,
        isVerified: true
      }
    ],
    audioBrief: {
      duration: '2:15',
      speaker: 'Liam O’Connor',
      summaryText: 'Why static friction does not dissipate mechanical energy during rolling without slipping, and how to set up the torque pivot.'
    },
    attachments: [
      { name: 'Moments_of_Inertia_Reference_Table.pdf', size: '420 KB', type: 'Formula Sheet' }
    ]
  },
  {
    id: 'lec-chem-102-2026-09-23',
    subjectId: 'chem-102',
    date: '2026-09-23',
    period: 'Period 3 · 11:30 AM - 12:45 PM',
    sessionNumber: 20,
    title: 'Le Chatelier’s Principle & Dynamic Chemical Equilibrium',
    instructorName: 'Prof. Clara Higgins',
    room: 'Curie Lab Building 210',
    summary: {
      overview: 'Investigated response of reaction quotients Q vs equilibrium constant K under temperature, pressure, volume, and concentration perturbations.',
      coreTakeaways: [
        'If Q < K, reaction shifts right toward products to re-establish equilibrium.',
        'Changing temperature is the ONLY disturbance that alters the numerical value of K.',
        'Adding an inert gas at constant volume does NOT shift equilibrium because partial pressures remain unchanged.',
        'For exothermic reactions (ΔH < 0), increasing temperature shifts equilibrium to the left.'
      ],
      teacherExamAlert: 'Prof. Higgins noted: "A favorite exam question is adding helium gas at constant pressure vs constant volume. Be ready to explain the difference using partial pressures."',
      keyFormulasOrTerms: [
        { term: 'Reaction Quotient Q', explanation: 'Expression identical to K but evaluated at instantaneous non-equilibrium concentrations.' },
        { term: 'Van ’t Hoff Equation', explanation: 'ln(K2/K1) = -(ΔH°/R)(1/T2 - 1/T1). Relates K variation with temperature.' }
      ]
    },
    homework: [
      {
        id: 'hw-chem-20',
        title: 'Equilibrium Constant Calculations (WS 4)',
        dueDate: 'Friday, Sep 25 · In Class',
        details: 'Problems 12 through 18 on Le Chatelier shifts and ICE table equilibrium concentrations.',
        isUrgent: false,
        estimatedMinutes: 45
      }
    ],
    boardPhotos: [
      {
        id: 'bp-chem-1',
        imageUrl: CLASS_ASSETS.blackboardCS,
        caption: 'Chalkboard 3: Haber process N2 + 3H2 <=> 2NH3 pressure vs temperature trade-off graph',
        uploadedBy: 'Maya Patel',
        timestamp: '12:35 PM Yesterday',
        boardType: 'blackboard',
        keyNotes: ['Catalyst increases rate but does NOT alter equilibrium position', 'Exothermic curve']
      }
    ],
    peerNotes: [
      {
        id: 'pn-chem-1',
        author: 'Maya Patel',
        authorRole: 'Chemistry Lab Assistant',
        format: 'markdown',
        title: 'ICE Table Master Guide & Perturbation Analysis',
        content: `### Le Chatelier’s Principle Summary
**Lecturer:** Prof. Clara Higgins | **Date:** Sep 23, 2026

#### The Equilibrium Rules:
- **Concentration:** Add reactant $\\to$ shifts right. Remove product $\\to$ shifts right.
- **Pressure / Volume:** Decrease volume (increase total pressure) $\\to$ shifts toward side with FEWER gas moles.
- **Temperature:**
  - Endothermic ($\\Delta H > 0$): Heat is a reactant $\\to$ raising $T$ shifts right ($K$ increases).
  - Exothermic ($\\Delta H < 0$): Heat is a product $\\to$ raising $T$ shifts left ($K$ decreases).
- **Catalyst:** Speeds up both forward and reverse rates equally; **no shift** in $K$ or equilibrium concentrations!`,
        timestamp: '01:15 PM Yesterday',
        karmaCount: 27,
        isVerified: true
      }
    ],
    attachments: [
      { name: 'Le_Chatelier_ICE_Worksheet.pdf', size: '610 KB', type: 'Worksheet' }
    ]
  }
];

export const INITIAL_REQUESTS: AbsenteeRequest[] = [
  {
    id: 'req-1',
    subjectId: 'cs-101',
    date: '2026-09-24',
    topicTitle: 'Double Rotation LR Edge Cases on BSTs',
    requestNote: 'I had the flu today and couldn’t attend the 10 AM class. Did the professor finish the AVL deletion case or only insertion? Also looking for anyone with a photo of the right side of the chalkboard!',
    category: 'board_photo',
    anonymousAlias: 'Absent Student in Row 4',
    status: 'fulfilled',
    fulfilledBy: 'Sarah Lin',
    fulfilledNotesCount: 2,
    createdAt: '10:45 AM Today',
    urgency: 'high'
  },
  {
    id: 'req-2',
    subjectId: 'phys-211',
    date: '2026-09-24',
    topicTitle: 'Incline Cylinder Friction Direction Proof',
    requestNote: 'Missed 8:30 AM physics due to delayed transit. Need clarification on why static friction points UP the incline for a cylinder rolling down without slipping.',
    category: 'typed_notes',
    anonymousAlias: 'Commuter Student',
    status: 'fulfilled',
    fulfilledBy: 'Liam O’Connor',
    fulfilledNotesCount: 1,
    createdAt: '09:50 AM Today',
    urgency: 'normal'
  },
  {
    id: 'req-3',
    subjectId: 'chem-102',
    date: '2026-09-24',
    topicTitle: 'Today’s Lab Spectrophotometer Calibration Data',
    requestNote: 'Out sick today with fever. Did our lab group record the absorbance values at 540nm for trials 1-4? Need them so I can write my lab report tonight.',
    category: 'lab_data',
    anonymousAlias: 'Sick Student at Home',
    status: 'pending',
    createdAt: '01:10 PM Today',
    urgency: 'high'
  }
];

export const INITIAL_GRATITUDE: GratitudeEvent[] = [
  {
    id: 'g-1',
    targetAuthor: 'Sarah Lin',
    lectureTitle: 'Binary Search Trees: Traversal & AVL Balance',
    message: 'I was dreading missing CS101 today, but your notes were clearer than the textbook! Saved my life.',
    karmaAdded: 10,
    timestamp: '11:45 AM Today'
  },
  {
    id: 'g-2',
    targetAuthor: 'Chloe Dupont',
    lectureTitle: 'Eigenvalues & Diagonalization',
    message: 'The step-by-step P and D matrix notes allowed me to finish homework set 5 without bothering anyone.',
    karmaAdded: 10,
    timestamp: '03:40 PM Today'
  }
];
