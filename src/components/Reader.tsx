
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Settings, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Story, Chapter, UserSettings } from "@/types";
import { mockChapters } from "@/lib/mockData";

interface ReaderProps {
  story: Story | null;
  chapter: Chapter | null;
  onChapterChange: (chapterNumber: number) => void;
  userSettings: UserSettings;
}

export const Reader = ({ story, chapter, onChapterChange, userSettings }: ReaderProps) => {
  const [showControls, setShowControls] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!story || !chapter) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No chapter selected</h3>
          <p className="text-muted-foreground">Please select a story and chapter to start reading.</p>
        </div>
      </div>
    );
  }

  const allChapters = mockChapters.filter(ch => ch.storyId === story.id);
  const currentIndex = allChapters.findIndex(ch => ch.id === chapter.id);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < allChapters.length - 1;

  const fontSize = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xl: 'text-xl'
  };

  const fontFamily = {
    serif: 'font-serif',
    'sans-serif': 'font-sans',
    monospace: 'font-mono'
  };

  const handlePreviousChapter = () => {
    if (canGoPrevious) {
      const previousChapter = allChapters[currentIndex - 1];
      onChapterChange(previousChapter.chapterNumber);
    }
  };

  const handleNextChapter = () => {
    if (canGoNext) {
      const nextChapter = allChapters[currentIndex + 1];
      onChapterChange(nextChapter.chapterNumber);
    }
  };

  return (
    <div 
      className="min-h-screen transition-all duration-300"
      style={{ 
        backgroundColor: userSettings.backgroundColor,
        color: userSettings.textColor 
      }}
      onMouseMove={() => setShowControls(true)}
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Progress value={readingProgress} className="h-1 rounded-none" />
      </div>

      {/* Reading Controls */}
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <Card className={`px-4 py-2 shadow-lg ${
          userSettings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white/90 backdrop-blur-sm'
        }`}>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousChapter}
              disabled={!canGoPrevious}
              className="flex items-center space-x-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            
            <div className="text-sm text-center">
              <div className="font-medium">Chapter {chapter.chapterNumber}</div>
              <div className="text-xs text-muted-foreground">{currentIndex + 1} of {allChapters.length}</div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextChapter}
              disabled={!canGoNext}
              className="flex items-center space-x-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Chapter Content */}
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{story.name}</h1>
          <h2 className="text-lg md:text-xl text-muted-foreground mb-4">{chapter.title}</h2>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{Math.ceil((chapter.wordCount || 500) / 200)} min read</span>
            </div>
            <div>
              Chapter {chapter.chapterNumber} of {story.totalChapters || allChapters.length}
            </div>
          </div>
        </div>

        <Card className={`${
          userSettings.theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 backdrop-blur-sm'
        }`}>
          <CardContent className="p-8">
            <div 
              className={`${fontSize[userSettings.fontSize]} ${fontFamily[userSettings.fontFamily]} leading-relaxed space-y-6`}
              style={{ color: userSettings.textColor }}
            >
              {chapter.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chapter Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Button
            variant="outline"
            onClick={handlePreviousChapter}
            disabled={!canGoPrevious}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Chapter</span>
          </Button>
          
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Progress: {Math.round(readingProgress)}%
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={handleNextChapter}
            disabled={!canGoNext}
            className="flex items-center space-x-2"
          >
            <span>Next Chapter</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
