"use client";

import { useShortlist } from "./ShortlistProvider";

interface SaveProjectButtonProps {
  slug: string;
  projectTitle: string;
  variant?: "inline" | "detail";
}

export default function SaveProjectButton({
  slug,
  projectTitle,
  variant = "inline",
}: SaveProjectButtonProps) {
  const { isSaved, toggleSaved, isLoaded } = useShortlist();
  const saved = isLoaded && isSaved(slug);

  return (
    <button
      type="button"
      onClick={() => toggleSaved(slug)}
      aria-pressed={saved}
      aria-label={
        saved
          ? `Remove ${projectTitle} from saved inspiration`
          : `Save ${projectTitle} to inspiration shortlist`
      }
      className={`save-btn ${variant === "detail" ? "save-btn--detail" : "save-btn--inline"} ${
        saved ? "is--saved" : ""
      }`}
    >
      <span className="save-btn_indicator" aria-hidden="true">
        {saved ? "■" : "□"}
      </span>
      <span className="save-btn_label">
        {saved ? "Saved to Shortlist" : "Save Project"}
      </span>
    </button>
  );
}
