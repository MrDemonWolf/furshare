"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Components
 */
import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  button?: string;
  sun?: string;
  moon?: string;
};

export default function ThemeToggle(props: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={props.button}
    >
      <Sun
        className={`${props.sun} h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
      />
      <Moon
        className={`${props.moon} absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
