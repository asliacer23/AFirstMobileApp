// Local storage utilities for progress tracking
export interface Progress {
  userId: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  certificates: Certificate[];
  bookmarks: string[];
  lastAccessed?: string;
}

export interface Certificate {
  id: string;
  courseName: string;
  dateEarned: string;
  studentName: string;
}

export const storageService = {
  getProgress: (userId: string): Progress => {
    const key = `progress_${userId}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      return JSON.parse(stored);
    }
    
    return {
      userId,
      completedLessons: [],
      quizScores: {},
      certificates: [],
      bookmarks: [],
    };
  },

  saveProgress: (progress: Progress) => {
    const key = `progress_${progress.userId}`;
    localStorage.setItem(key, JSON.stringify(progress));
  },

  markLessonComplete: (userId: string, lessonId: string) => {
    const progress = storageService.getProgress(userId);
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.lastAccessed = new Date().toISOString();
      storageService.saveProgress(progress);
    }
  },

  saveQuizScore: (userId: string, quizId: string, score: number) => {
    const progress = storageService.getProgress(userId);
    progress.quizScores[quizId] = score;
    storageService.saveProgress(progress);
  },

  addCertificate: (userId: string, certificate: Certificate) => {
    const progress = storageService.getProgress(userId);
    progress.certificates.push(certificate);
    storageService.saveProgress(progress);
  },

  toggleBookmark: (userId: string, lessonId: string) => {
    const progress = storageService.getProgress(userId);
    const index = progress.bookmarks.indexOf(lessonId);
    
    if (index > -1) {
      progress.bookmarks.splice(index, 1);
    } else {
      progress.bookmarks.push(lessonId);
    }
    
    storageService.saveProgress(progress);
    return progress.bookmarks.includes(lessonId);
  },

  isBookmarked: (userId: string, lessonId: string): boolean => {
    const progress = storageService.getProgress(userId);
    return progress.bookmarks.includes(lessonId);
  }
};
