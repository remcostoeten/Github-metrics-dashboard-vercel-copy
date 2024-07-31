"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function Component() {
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [activityListAmount, setActivityListAmount] = useState(10);
  const [font, setFont] = useState("Inter");
  const [codeBlockTheme, setCodeBlockTheme] = useState("github-dark");
  const [githubUsername, setGithubUsername] = useState("");
  const [githubRepository1, setGithubRepository1] = useState(
    "remcostoeten/all-in-one-dashboard",
  );
  const [githubRepository2, setGithubRepository2] = useState(
    "remcostoeten/all-in-one-dashboard",
  );
  const [stopActivityAnimation, setStopActivityAnimation] = useState(false);
  const handleAnimationSpeedChange = (value) => {
    setAnimationSpeed(value);
  };
  const handleActivityListAmountChange = (value) => {
    setActivityListAmount(value);
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
  const handleStopActivityAnimationChange = (value) => {
    setStopActivityAnimation(value);
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
          prefetch={false}
        >
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Projects
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Deployments
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Analytics
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Logs
          </Link>
          <Link href="#" className="font-bold" prefetch={false}>
            Settings
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full ml-auto">
            <img
              src="/placeholder.svg"
              width="32"
              height="32"
              className="rounded-full border"
              alt="Avatar"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-muted/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Settings</h1>
        </div>
        <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
          <nav className="text-sm text-muted-foreground grid gap-4">
            <Link
              href="#"
              className="font-semibold text-primary"
              prefetch={false}
            >
              General
            </Link>
            <Link href="#" prefetch={false}>
              Domains
            </Link>
            <Link href="#" prefetch={false}>
              Log Drains
            </Link>
            <Link href="#" prefetch={false}>
              Webhooks
            </Link>
            <Link href="#" prefetch={false}>
              Integrations
            </Link>
            <Link href="#" prefetch={false}>
              Security
            </Link>
            <Link href="#" prefetch={false}>
              Advanced
            </Link>
          </nav>
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
                  min={0.5}
                  max={2}
                  step={0.1}
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
                  min={5}
                  max={20}
                  step={1}
                  defaultValue={[10]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Font</CardTitle>
                <CardDescription>
                  Choose the font for the dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={font} onValueChange={handleFontChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Code Block Theme</CardTitle>
                <CardDescription>
                  Choose the theme for the code blocks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={codeBlockTheme}
                  onValueChange={handleCodeBlockThemeChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="github-dark">GitHub Dark</SelectItem>
                    <SelectItem value="dracula">Dracula</SelectItem>
                    <SelectItem value="nord">Nord</SelectItem>
                    <SelectItem value="one-dark">One Dark</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GitHub Username</CardTitle>
                <CardDescription>
                  Enter a GitHub username to fetch data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="GitHub username"
                  value={githubUsername}
                  onChange={(e) => handleGithubUsernameChange(e.target.value)}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GitHub Repositories</CardTitle>
                <CardDescription>
                  Enter the GitHub repositories to fetch data from.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <TooltipProvider>
                      <Input
                        placeholder="remcostoeten/all-in-one-dashboard"
                        value={githubRepository1}
                        onChange={(e) =>
                          handleGithubRepository1Change(e.target.value)
                        }
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <InfoIcon className="h-4 w-4" />
                            <span className="sr-only">
                              Repository 1 tooltip
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Enter the first GitHub repository to fetch data from.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <TooltipProvider>
                      <Input
                        placeholder="remcostoeten/all-in-one-dashboard"
                        value={githubRepository2}
                        onChange={(e) =>
                          handleGithubRepository2Change(e.target.value)
                        }
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <InfoIcon className="h-4 w-4" />
                            <span className="sr-only">
                              Repository 2 tooltip
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Enter the second GitHub repository to fetch data from.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
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
                  <input
                    type="checkbox"
                    id="stop-activity-animation"
                    checked={stopActivityAnimation}
                    onChange={handleStopActivityAnimationChange}
                  />
                  <label htmlFor="stop-activity-animation">
                    Stop Activity Animation
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
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
