
export interface Story {
  id: number;
  name: string;
  link: string;
  currentChapterNumber: number;
  createdAt: string;
  lastScrapedAt: string;
  coverImage?: string;
  description?: string;
  totalChapters?: number;
}

export interface Chapter {
  id: number;
  storyId: number;
  chapterNumber: number;
  title: string;
  content: string;
  sourceUrl: string;
  scrapedAt: string;
  wordCount?: number;
}

export interface ReadingProgress {
  id: number;
  storyId: number;
  lastReadChapterId: number;
  lastReadPage: number;
  progressPercentage: number;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  fontFamily: 'serif' | 'sans-serif' | 'monospace';
  backgroundColor: string;
  textColor: string;
}
