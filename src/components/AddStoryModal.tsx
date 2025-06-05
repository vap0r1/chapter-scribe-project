
import { useState } from "react";
import { Plus, Link, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Story } from "@/types";

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStory: (story: Omit<Story, 'id' | 'createdAt' | 'lastScrapedAt'>) => void;
}

export const AddStoryModal = ({ isOpen, onClose, onAddStory }: AddStoryModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    description: '',
    coverImage: '',
    currentChapterNumber: 1,
    totalChapters: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.link) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAddStory({
      name: formData.name,
      link: formData.link,
      description: formData.description,
      coverImage: formData.coverImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      currentChapterNumber: formData.currentChapterNumber,
      totalChapters: formData.totalChapters || undefined
    });

    setFormData({
      name: '',
      link: '',
      description: '',
      coverImage: '',
      currentChapterNumber: 1,
      totalChapters: 0
    });
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Plus className="h-4 w-4" />
            </div>
            <span>Add New Story</span>
          </DialogTitle>
          <DialogDescription>
            Add a webnovel to your library. The system will automatically scrape new chapters.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Story Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter the story name"
              required
            />
          </div>

          <div>
            <Label htmlFor="link">Story URL *</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
                placeholder="https://example.com/novel/story-name"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the story"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL (Optional)</Label>
            <Input
              id="coverImage"
              type="url"
              value={formData.coverImage}
              onChange={(e) => handleInputChange('coverImage', e.target.value)}
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentChapter">Starting Chapter</Label>
              <Input
                id="currentChapter"
                type="number"
                min="1"
                value={formData.currentChapterNumber}
                onChange={(e) => handleInputChange('currentChapterNumber', parseInt(e.target.value) || 1)}
              />
            </div>
            <div>
              <Label htmlFor="totalChapters">Total Chapters (Optional)</Label>
              <Input
                id="totalChapters"
                type="number"
                min="0"
                value={formData.totalChapters}
                onChange={(e) => handleInputChange('totalChapters', parseInt(e.target.value) || 0)}
                placeholder="Auto-detect"
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.link || isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding...
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4 mr-2" />
                Add Story
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
