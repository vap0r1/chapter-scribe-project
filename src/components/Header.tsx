
import { ArrowLeft, Settings, BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserSettings } from "@/types";

interface HeaderProps {
  currentView: 'dashboard' | 'reader';
  onBackToDashboard: () => void;
  onOpenSettings: () => void;
  userSettings: UserSettings;
}

export const Header = ({ currentView, onBackToDashboard, onOpenSettings, userSettings }: HeaderProps) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-all duration-300 ${
      userSettings.theme === 'dark' 
        ? 'bg-gray-900/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {currentView === 'reader' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToDashboard}
              className="flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NovelReader
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentView === 'dashboard' ? 'Your Library' : 'Reading Mode'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {currentView === 'dashboard' && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSettings}
              className="flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          )}
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
        </div>
      </div>
    </header>
  );
};
