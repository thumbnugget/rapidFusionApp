// LyricsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LyricsContextType {
  selectedSongTitle: string | null;
  setSelectedSongTitle: (title: string | null) => void;
}


interface LyricsProviderProps {
    children: ReactNode;  // Explicitly defining the type for 'children'
  }

const LyricsContext = createContext<LyricsContextType | undefined>(undefined);

export const LyricsProvider: React.FC<LyricsProviderProps> = ({ children }) => {
    
    const [selectedSongTitle, setSelectedSongTitle] = useState<string | null>(null);
  
  return (
    <LyricsContext.Provider value={{ selectedSongTitle, setSelectedSongTitle }}>
      {children}
    </LyricsContext.Provider>
  );
};

export const useLyricsContext = () => {
  const context = useContext(LyricsContext);
  if (context === undefined) {
    throw new Error('useLyricsContext must be used within a LyricsProvider');
  }
  return context;
};

