import React, { createContext, useContext, useState, useEffect } from 'react';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // Use local storage to persist audio player state
    useEffect(() => {
        const storedState = localStorage.getItem('audioPlayerState');
        if (storedState) {
            const { isPlaying: storedIsPlaying, currentSong: storedCurrentSong } = JSON.parse(storedState);
            setIsPlaying(storedIsPlaying);
            setCurrentSong(storedCurrentSong);
        }
    }, []);

    useEffect(() => {
        // Save audio player state to local storage
        localStorage.setItem('audioPlayerState', JSON.stringify({ isPlaying, currentSong }));
    }, [isPlaying, currentSong]);

    return (
        <AudioPlayerContext.Provider value={{ isPlaying, currentSong, togglePlay }}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export const useAudioPlayer = () => {
    return useContext(AudioPlayerContext);
};