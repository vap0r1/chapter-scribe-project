
import { Palette, Type, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { UserSettings } from "@/types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

export const SettingsModal = ({ isOpen, onClose, settings, onSettingsChange }: SettingsModalProps) => {
  const updateSetting = (key: keyof UserSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const presetThemes = [
    { name: 'Light', bg: '#ffffff', text: '#000000', theme: 'light' as const },
    { name: 'Dark', bg: '#1f2937', text: '#ffffff', theme: 'dark' as const },
    { name: 'Sepia', bg: '#f7f3e9', text: '#5c4c3a', theme: 'light' as const },
    { name: 'Night Blue', bg: '#0f172a', text: '#cbd5e1', theme: 'dark' as const },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Palette className="h-4 w-4" />
            </div>
            <span>Reading Settings</span>
          </DialogTitle>
          <DialogDescription>
            Customize your reading experience for optimal comfort.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div>
            <Label className="text-base font-medium">Theme</Label>
            <div className="flex space-x-2 mt-2">
              <Button
                variant={settings.theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSetting('theme', 'light')}
                className="flex items-center space-x-2"
              >
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </Button>
              <Button
                variant={settings.theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSetting('theme', 'dark')}
                className="flex items-center space-x-2"
              >
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Typography */}
          <div className="space-y-4">
            <Label className="text-base font-medium flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <span>Typography</span>
            </Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fontSize" className="text-sm">Font Size</Label>
                <Select value={settings.fontSize} onValueChange={(value) => updateSetting('fontSize', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fontFamily" className="text-sm">Font Family</Label>
                <Select value={settings.fontFamily} onValueChange={(value) => updateSetting('fontFamily', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="sans-serif">Sans Serif</SelectItem>
                    <SelectItem value="monospace">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Color Presets */}
          <div>
            <Label className="text-base font-medium">Color Presets</Label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {presetThemes.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-center space-y-2"
                  onClick={() => {
                    updateSetting('backgroundColor', preset.bg);
                    updateSetting('textColor', preset.text);
                    updateSetting('theme', preset.theme);
                  }}
                >
                  <div 
                    className="w-full h-8 rounded border-2"
                    style={{ backgroundColor: preset.bg, borderColor: preset.text }}
                  >
                    <div 
                      className="w-full h-full flex items-center justify-center text-xs font-medium"
                      style={{ color: preset.text }}
                    >
                      Aa
                    </div>
                  </div>
                  <span className="text-xs">{preset.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="backgroundColor" className="text-sm">Background Color</Label>
              <div className="flex space-x-2 mt-1">
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                  className="w-12 h-10 rounded border border-input cursor-pointer"
                />
                <div className="flex-1 px-3 py-2 text-sm bg-muted rounded">
                  {settings.backgroundColor}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="textColor" className="text-sm">Text Color</Label>
              <div className="flex space-x-2 mt-1">
                <input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => updateSetting('textColor', e.target.value)}
                  className="w-12 h-10 rounded border border-input cursor-pointer"
                />
                <div className="flex-1 px-3 py-2 text-sm bg-muted rounded">
                  {settings.textColor}
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <Label className="text-base font-medium">Preview</Label>
            <div 
              className="mt-2 p-4 rounded-lg border"
              style={{ 
                backgroundColor: settings.backgroundColor, 
                color: settings.textColor 
              }}
            >
              <div className={`${
                settings.fontSize === 'small' ? 'text-sm' :
                settings.fontSize === 'medium' ? 'text-base' :
                settings.fontSize === 'large' ? 'text-lg' : 'text-xl'
              } ${
                settings.fontFamily === 'serif' ? 'font-serif' :
                settings.fontFamily === 'sans-serif' ? 'font-sans' : 'font-mono'
              }`}>
                This is how your text will appear while reading. The quick brown fox jumps over the lazy dog.
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
