"use client";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";
import { ConsultationDialog } from "./consultation-dialog";

export function FreeConsultationButton() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isExpanded && !isHovered) {
      timeoutId = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isExpanded, isHovered]);

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <button
        dir="ltr"
        className={cn(
          "fixed bottom-6 left-6 z-50",
          "flex items-center justify-center rounded-full",
          "bg-white dark:bg-gray-800",
          "text-gray-900 dark:text-white",
          "shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700",
          "transition-all duration-500 ease-out",
          "hover:scale-105",
          isVisible && "animate__animated animate__bounceInLeft",

          isExpanded
            ? "gap-3 px-4 py-3"
            : "w-[72px] h-[72px] p-0" 
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={t.freeConsultation.ariaLabel}
      >
        {/* Icon and pulse container */}
        <div className="relative flex-shrink-0 rounded-full overflow-hidden">
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse" />

          {/* Icon container */}
          <div
            className={cn(
              "relative flex items-center justify-center w-14 h-14 rounded-full bg-blue-500",
              isHovered && "animate__animated animate__swing animate__infinite"
            )}
          >
            <Gift className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Expanding text */}
        <span
          className={cn(
            "font-semibold text-xs whitespace-nowrap transition-all duration-500 ease-out",
            isExpanded
              ? "max-w-xs opacity-100 ml-2"
              : "max-w-0 opacity-0 ml-0 overflow-hidden"
          )}
        >
          {t.freeConsultation.button}
        </span>
      </button>

      <ConsultationDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
}
