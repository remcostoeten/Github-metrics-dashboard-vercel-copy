"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAnimationSpeedStore } from "@/core/store/useAnimationSpeedStore";
import { useAnimationControlStore } from "@/core/store/useAnimationControlStore";
import { useGitHubStore } from "@/core/store/useGithubStore";

export default function Component() {
  const { animationSpeed, setAnimationSpeed } = useAnimationSpeedStore();
  const { isAnimationPaused, toggleAnimation } = useAnimationControlStore();
  const { fetchAmount, setFetchAmount } = useGitHubStore();

  const [activityListAmount, setActivityListAmount] = useState(5);
  const [font, setFont] = useState("Geist Sans");
  const [codeBlockTheme, setCodeBlockTheme] = useState("duotoneDark");
  const [githubUsername, setGithubUsername] = useState("");
  const [githubRepository1, setGithubRepository1] = useState(
    "remcostoeten/all-in-one-dashboard",
  );
  const [githubRepository2, setGithubRepository2] = useState(
    "remcostoeten/all-in-one-dashboard",
  );

  const handleAnimationSpeedChange = (value) => {
    setAnimationSpeed(value[0]);
  };

  const handleActivityListAmountChange = (value) => {
    setActivityListAmount(value[0]);
    setFetchAmount(value[0]);
  };

  const handleFontChange = (value) => {
    setFont(value);
  };

  const handleCodeBlockThemeChange = (value) => {
    setCodeBlockTheme(value);
  };

  const handleGithubUsernameChange = (value) => {
    setGithubUsername(value);
  };

  const handleGithubRepository1Change = (value) => {
    setGithubRepository1(value);
  };

  const handleGithubRepository2Change = (value) => {
    setGithubRepository2(value);
  };

  return (
    <div className="flex flex-col max-w-[1043px]  w-full  min-h-screen">
      {/* Header and navigation remain unchanged */}

      <div className="w-full mx-auto grid gap-2">
        <h1 className="font-semibold text-3xl">Settings</h1>
      </div>

      {/* Navigation remains unchanged */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Animation Speed</CardTitle>
            <CardDescription>
              Adjust the speed of the activity animation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Slider
              value={[animationSpeed]}
              onValueChange={handleAnimationSpeedChange}
              min={500}
              max={2000}
              step={100}
              defaultValue={[1]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity List Amount</CardTitle>
            <CardDescription>
              Set the number of activities to display in the list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Slider
              value={[activityListAmount]}
              onValueChange={handleActivityListAmountChange}
              min={1}
              max={20}
              step={1}
              defaultValue={[5]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity Animation</CardTitle>
            <CardDescription>
              Stop the activity animation to improve performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="stop-activity-animation"
                checked={isAnimationPaused}
                onCheckedChange={toggleAnimation}
              />
              <Label htmlFor="stop-activity-animation">
                Stop Activity Animation
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
