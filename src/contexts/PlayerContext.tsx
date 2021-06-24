import { createContext, useContext, useState } from "react";

type Episode = {
    title: string
    members: string
    thumbnail: string
    duration: number
    url: string
}
type PlayerContextData = {
    episodeList: Array<Episode>
    currentEpisodeIndex: number
    isPlaying: boolean
    isLooping: boolean
    isShuffling: boolean
    hasPreviews: boolean
    hasNext: boolean
    togglePlay: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    playNext: () => void
    clearPlayerState: () => void
    playPreviews: () => void
    setPlayingState: (state: boolean) => void
    playList: (list: Episode[], index: number) => void
    play: (episode: Episode) => void
}
export const PlayerContext = createContext({} as PlayerContextData)

export const PlayerProvider: React.FC = props => {
    const [episodeList, setEpisodeList] = useState<Episode[]>([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)

    const play = (episode) => {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    const playList = (list: Episode[], index: number) => {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)

    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }
    const toggleLoop = () => {
        setIsLooping(!isLooping)
    }
    const toggleShuffle = () => {
        setIsShuffling(!isShuffling)
    }

    const setPlayingState = (state: boolean) => {
        setIsPlaying(state)
    }

    const hasPreviews = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
    const playNext = () => {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }
    const playPreviews = () => {
        if (hasPreviews) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    const clearPlayerState = () => {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
        setIsPlaying(false)
        setIsLooping(false)
        setIsShuffling(false)
    }
    return (
        <PlayerContext.Provider value={{
            currentEpisodeIndex,
            episodeList,
            playList,
            clearPlayerState,
            playNext,
            playPreviews,
            play,
            hasPreviews,
            toggleLoop,
            hasNext,
            togglePlay,
            toggleShuffle,
            isShuffling,
            setPlayingState,
            isLooping,
            isPlaying
        }}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}