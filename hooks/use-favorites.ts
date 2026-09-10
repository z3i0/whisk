"use client";

import { useCallback, useSyncExternalStore } from "react";
import { RecipeSummary, SavedFavoriteRecipe } from "@/lib/themealdb/types";

const STORAGE_KEY = "whisk_favorites_v1";
const EVENT_NAME = "whisk_favorites_changed";

const EMPTY_FAVORITES: SavedFavoriteRecipe[] = [];
let cachedFavorites: SavedFavoriteRecipe[] = [];
let cachedRaw: string | null = null;

function getStoredFavorites(): SavedFavoriteRecipe[] {
  if (typeof window === "undefined") return EMPTY_FAVORITES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_FAVORITES;
    if (raw === cachedRaw) return cachedFavorites;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedRaw = raw;
      cachedFavorites = parsed;
      return cachedFavorites;
    }
    return EMPTY_FAVORITES;
  } catch (error) {
    console.error("Failed to read favorites from localStorage:", error);
    return EMPTY_FAVORITES;
  }
}

function saveFavorites(items: SavedFavoriteRecipe[]): void {
  if (typeof window === "undefined") return;
  try {
    const serialized = JSON.stringify(items);
    window.localStorage.setItem(STORAGE_KEY, serialized);
    cachedRaw = serialized;
    cachedFavorites = items;
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (error) {
    console.error("Failed to save favorites to localStorage:", error);
  }
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(EVENT_NAME, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(EVENT_NAME, handler);
  };
}

const emptySubscribe = () => () => {};

export function useFavorites() {
  const isLoaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const favorites = useSyncExternalStore(
    subscribe,
    getStoredFavorites,
    () => EMPTY_FAVORITES
  );

  const isFavorite = useCallback(
    (id: string): boolean => {
      if (!isLoaded || !id) return false;
      return favorites.some((item) => item.id === id);
    },
    [isLoaded, favorites]
  );

  const addFavorite = useCallback((recipe: RecipeSummary) => {
    const current = getStoredFavorites();
    if (!current.some((item) => item.id === recipe.id)) {
      const newFavorite: SavedFavoriteRecipe = {
        ...recipe,
        savedAt: Date.now(),
      };
      saveFavorites([newFavorite, ...current]);
    }
  }, []);

  const removeFavorite = useCallback((id: string) => {
    const current = getStoredFavorites();
    const filtered = current.filter((item) => item.id !== id);
    saveFavorites(filtered);
  }, []);

  const toggleFavorite = useCallback(
    (recipe: RecipeSummary) => {
      const current = getStoredFavorites();
      const exists = current.some((item) => item.id === recipe.id);
      if (exists) {
        removeFavorite(recipe.id);
      } else {
        addFavorite(recipe);
      }
    },
    [addFavorite, removeFavorite]
  );

  return {
    favorites: isLoaded ? favorites : EMPTY_FAVORITES,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isLoaded,
    count: isLoaded ? favorites.length : 0,
  };
}
