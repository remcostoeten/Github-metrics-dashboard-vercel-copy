'use client'

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as prismThemes from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Input } from "@/components/ui";

interface CodeContentProps {
  children: React.ReactNode;
}

// Extract all themes from the imported prismThemes
const themes = Object.keys(prismThemes).reduce((acc, themeName) => {
  acc[themeName] = prismThemes[themeName];
  return acc;
}, {} as Record<string, any>);

const CodeContent: React.FC<CodeContentProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>("vscDarkPlus");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const codeString = React.Children.toArray(children).join("\n");

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes) as (keyof typeof themes)[];
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextIndex]);
    toast(`Switched to ${themeKeys[nextIndex]} theme`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    toast(`Input text: ${inputText}`);
  };

  return (
    <>
      <button onClick={toggleTheme} className="mb-4 p-2 bg-gray-200 rounded fixed top-4 left-4">
        Toggle Theme
      </button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="mb-4 p-2 bg-gray-200 rounded fixed top-4 left-24">
            Open Dialog
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Input Text</DialogTitle>
            <DialogDescription>
              Please enter your text below.
            </DialogDescription>
          </DialogHeader>
          <Input type="text" value={inputText} onChange={handleInputChange} className="mb-4" />
          <Button onClick={handleDialogClose}>Submit</Button>
        </DialogContent>
      </Dialog>
      <div className="w-full overflow-x-auto">
        <SyntaxHighlighter
          language="javascript"
          style={themes[currentTheme]}
          showLineNumbers={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default CodeContent;