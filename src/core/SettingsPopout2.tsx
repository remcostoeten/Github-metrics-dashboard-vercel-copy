import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
import { GeistSans } from 'geist/font';
import { SettingsIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAnimationSpeedStore } from '@/core/store/animationSpeedStore';
import { useAnimationControlStore } from '@/core/store/animationControlStore';
import { useAmountGithubActivityStore } from '@/core/store/amountGithubActivityStore';
import { useCodeThemeStore, CodeThemeStore } from '@/core/store/codeThemeStore';
import { useFontStore } from '@/core/store/fontStore';
import { useRepoStore } from '@/core/store/repoStore';

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans_JP({ subsets: ["latin"] });

const themes = {
  "vs-dark": "VS Dark",
  "github-dark": "GitHub Dark",
  monokai: "Monokai",
};

export default function SettingsPopout2() {
  const { animationSpeed, setAnimationSpeed } = useAnimationSpeedStore();
  const { isAnimationPaused, toggleAnimation } = useAnimationControlStore();
  const { fetchAmount, setFetchAmount } = useAmountGithubActivityStore();
  const { currentTheme, setCurrentTheme } = useCodeThemeStore() as CodeThemeStore;
  const { currentFont, setFont } = useFontStore();
  const { repos, addRepo, removeRepo } = useRepoStore();

  const [showSettings, setShowSettings] = useState(false);
  const [localAnimationSpeed, setLocalAnimationSpeed] = useState(animationSpeed);
  const [localFetchAmount, setLocalFetchAmount] = useState(fetchAmount);
  const [newRepo, setNewRepo] = useState('');

  useEffect(() => {
    setLocalAnimationSpeed(animationSpeed);
    setLocalFetchAmount(fetchAmount);
  }, [animationSpeed, fetchAmount]);

  const handleAnimationSpeedChange = (value) => {
    const newSpeed = value[0];
    setLocalAnimationSpeed(newSpeed);
    setAnimationSpeed(newSpeed);
  };

  const handleActivityListAmountChange = (value) => {
    const newAmount = value[0];
    setLocalFetchAmount(newAmount);
    setFetchAmount(newAmount);
  };

  const handleFontChange = (value) => {
    setFont(value);
    toast(`Switched to ${value} font`);
  };

  const getFontClass = () => {
    switch (currentFont) {
      case "geist-sans":
        return GeistSans.variable;
      case "noto":
        return noto.className;
      case "inter":
        return inter.className;
      default:
        return GeistSans.variable;
    }
  };

  const handleCodeBlockThemeChange = (value) => {
    setCurrentTheme(value);
    toast(`Switched to ${value} theme`);
  };

  const handleAddRepo = () => {
    if (newRepo.trim()) {
      addRepo(newRepo.trim());
      setNewRepo('');
      toast(`Added repository: ${newRepo.trim()}`);
    }
  };

  const handleRemoveRepo = (repo) => {
    removeRepo(repo);
    toast(`Removed repository: ${repo}`);
  };

  return (
    <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50">
      <div
        className={`flex flex-col items-end transition-all duration-300 ${
          showSettings ? "w-[350px]" : "w-12 h-12"
        }`}
        onMouseEnter={() => setShowSettings(true)}
        onMouseLeave={() => setShowSettings(false)}
        onClick={() => setShowSettings(!showSettings)}
      >
        <div
          className={`bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 ${
            showSettings ? "rotate-45" : ""
          }`}
          style={{ position: "relative", zIndex: 51 }}
        >
          <SettingsIcon className="h-6 w-6" />
        </div>
        {showSettings && (
          <div className="bg-card text-card-foreground rounded-lg shadow-lg p-4 mt-4 w-full">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Font</h3>
                <Select value={currentFont} onValueChange={handleFontChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geist-sans">Geist Sans</SelectItem>
                    <SelectItem value="noto">Noto Sans JP</SelectItem>
                    <SelectItem value="inter">Inter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Code Theme</h3>
                <Select
                  value={currentTheme}
                  onValueChange={handleCodeBlockThemeChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select code theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themes).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Animation Control</h3>
                <div className="flex items-center justify-between">
                  <span>
                    Animation {isAnimationPaused ? "Paused" : "Running"}
                  </span>
                  <Switch
                    checked={!isAnimationPaused}
                    onCheckedChange={toggleAnimation}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Animation Speed</h3>
                <div className="space-y-2">
                  <Slider
                    value={[localAnimationSpeed]}
                    onValueChange={handleAnimationSpeedChange}
                    min={100}
                    max={5000}
                    step={100}
                  />
                  <div className="flex justify-between">
                    <span>100ms</span>
                    <span>{localAnimationSpeed}ms</span>
                    <span>5000ms</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Activity List</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="show-amount" className="w-32">
                      Show Amount
                    </label>
                    <Slider
                      id="show-amount"
                      min={3}
                      max={20}
                      step={1}
                      value={[localFetchAmount]}
                      onValueChange={handleActivityListAmountChange}
                    />
                    <span>{localFetchAmount}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Repositories</h3>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      value={newRepo}
                      onChange={(e) => setNewRepo(e.target.value)}
                      placeholder="owner/repo"
                    />
                    <Button onClick={handleAddRepo}>Add</Button>
                  </div>
                  <div className="space-y-2">
                    {repos.map((repo) => (
                      <div key={repo} className="flex justify-between items-center">
                        <span>{repo}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveRepo(repo)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}