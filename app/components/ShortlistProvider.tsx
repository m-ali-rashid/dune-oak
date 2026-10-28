"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "dune_and_oak_saved_projects_v1";

interface ShortlistContextValue {
  savedSlugs: string[];
  isLoaded: boolean;
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
  removeSaved: (slug: string) => void;
  clearSaved: () => void;
}

const ShortlistContext = createContext<ShortlistContextValue>({
  savedSlugs: [],
  isLoaded: false,
  isSaved: () => false,
  toggleSaved: () => {},
  removeSaved: () => {},
  clearSaved: () => {},
});

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedSlugs(parsed.filter((item): item is string => typeof item === "string"));
        }
      }
    } catch {
      // Ignore storage access errors in restricted environments
    } finally {
      setIsLoaded(true);
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (Array.isArray(parsed)) {
            setSavedSlugs(parsed.filter((item): item is string => typeof item === "string"));
          }
        } catch {
          // Ignore malformed JSON
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const persist = useCallback((next: string[]) => {
    setSavedSlugs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota errors
    }
  }, []);

  const isSaved = useCallback(
    (slug: string) => savedSlugs.includes(slug),
    [savedSlugs]
  );

  const toggleSaved = useCallback(
    (slug: string) => {
      const exists = savedSlugs.includes(slug);
      const next = exists
        ? savedSlugs.filter((item) => item !== slug)
        : [...savedSlugs, slug];
      persist(next);
    },
    [savedSlugs, persist]
  );

  const removeSaved = useCallback(
    (slug: string) => {
      persist(savedSlugs.filter((item) => item !== slug));
    },
    [savedSlugs, persist]
  );

  const clearSaved = useCallback(() => {
    persist([]);
  }, [persist]);

  return (
    <ShortlistContext.Provider
      value={{
        savedSlugs,
        isLoaded,
        isSaved,
        toggleSaved,
        removeSaved,
        clearSaved,
      }}
    >
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  return useContext(ShortlistContext);
}
