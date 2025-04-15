"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const CThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Toggle between light, dark and system themes
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const renderThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun />;
      case "dark":
        return <Moon />;
      default:
        return <Monitor />;
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={toggleTheme}
      className="flex items-center justify-center bg-background border-foreground dark:bg-background dark:border-foreground"
    >
      {renderThemeIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default CThemeToggle;
