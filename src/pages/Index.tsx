
import { useState } from "react";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { Reader } from "@/components/Reader";
import { AddStoryModal } from "@/components/AddStoryModal";
import { SettingsModal } from "@/components/SettingsModal";
import { mockStories, mockChapters } from "@/lib/mockData";
import { Story, Chapter, UserSettings } from "@/types";

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'reader'>('dashboard');
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    theme: 'light',
    fontSize: 'medium',
    fontFamily: 'serif',
    backgroundColor: '#ffffff',
    textColor: '#000000'
  });

  const handleStorySelect = (story: Story) => {
    setCurrentStory(story);
    // Get first chapter or last read chapter
    const chapters = mockChapters.filter(ch => ch.storyId === story.id);
    if (chapters.length > 0) {
      setCurrentChapter(chapters[0]);
      setCurrentView('reader');
    }
  };

  const handleAddStory = (newStory: Omit<Story, 'id' | 'createdAt' | 'lastScrapedAt'>) => {
    const story: Story = {
      ...newStory,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      lastScrapedAt: new Date().toISOString()
    };
    setStories([...stories, story]);
    setShowAddModal(false);
  };

  const handleChapterChange = (chapterNumber: number) => {
    if (currentStory) {
      const chapters = mockChapters.filter(ch => ch.storyId === currentStory.id);
      const chapter = chapters.find(ch => ch.chapterNumber === chapterNumber);
      if (chapter) {
        setCurrentChapter(chapter);
      }
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentStory(null);
    setCurrentChapter(null);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      userSettings.theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      <Header 
        currentView={currentView}
        onBackToDashboard={handleBackToDashboard}
        onOpenSettings={() => setShowSettings(true)}
        userSettings={userSettings}
      />
      
      {currentView === 'dashboard' ? (
        <Dashboard 
          stories={stories}
          onStorySelect={handleStorySelect}
          onAddStory={() => setShowAddModal(true)}
          userSettings={userSettings}
        />
      ) : (
        <Reader 
          story={currentStory}
          chapter={currentChapter}
          onChapterChange={handleChapterChange}
          userSettings={userSettings}
        />
      )}

      <AddStoryModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddStory={handleAddStory}
      />

      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={userSettings}
        onSettingsChange={setUserSettings}
      />
    </div>
  );
};

export default Index;
