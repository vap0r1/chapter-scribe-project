
import { Plus, Clock, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Story, UserSettings } from "@/types";

interface DashboardProps {
  stories: Story[];
  onStorySelect: (story: Story) => void;
  onAddStory: () => void;
  userSettings: UserSettings;
}

export const Dashboard = ({ stories, onStorySelect, onAddStory, userSettings }: DashboardProps) => {
  const totalChapters = stories.reduce((sum, story) => sum + (story.totalChapters || 0), 0);
  const averageProgress = stories.length > 0 ? Math.round((stories.reduce((sum, story) => 
    sum + (story.currentChapterNumber / (story.totalChapters || 1) * 100), 0) / stories.length)) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={`hover:shadow-lg transition-all duration-300 ${
          userSettings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stories.length}</div>
            <p className="text-xs text-muted-foreground">Active in your library</p>
          </CardContent>
        </Card>
        
        <Card className={`hover:shadow-lg transition-all duration-300 ${
          userSettings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chapters</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalChapters}</div>
            <p className="text-xs text-muted-foreground">Available to read</p>
          </CardContent>
        </Card>
        
        <Card className={`hover:shadow-lg transition-all duration-300 ${
          userSettings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{averageProgress}%</div>
            <p className="text-xs text-muted-foreground">Across all stories</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Story Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your Stories</h2>
        <Button 
          onClick={onAddStory}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Story
        </Button>
      </div>

      {/* Stories Grid */}
      {stories.length === 0 ? (
        <Card className={`text-center py-12 ${
          userSettings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm'
        }`}>
          <CardContent>
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
            <p className="text-muted-foreground mb-6">Add your first webnovel to start reading!</p>
            <Button 
              onClick={onAddStory}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Story
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => {
            const progressPercentage = story.totalChapters 
              ? Math.round((story.currentChapterNumber / story.totalChapters) * 100)
              : 0;

            return (
              <Card 
                key={story.id}
                className={`group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden ${
                  userSettings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm'
                }`}
                onClick={() => onStorySelect(story)}
              >
                {story.coverImage && (
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={story.coverImage} 
                      alt={story.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {story.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {story.description || "A captivating webnovel waiting to be explored."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Chapter {story.currentChapterNumber}</span>
                      <span>{story.totalChapters ? `of ${story.totalChapters}` : ''}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{progressPercentage}% complete</span>
                      <span>Updated {new Date(story.lastScrapedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
