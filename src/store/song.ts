import create from 'zustand'
import { updateSongInput } from '../schema/song'

type State = {
  editedSong: updateSongInput
  updateEditedSong: (payload:updateSongInput) => void
  resetEditedSong: () => void
  activeTab: string
  changeActiveTab: (payload:string) => void
}

export const useSongStore = create<State>((set) => ({
  editedSong: { songId: '', name: '', songKey: '±0', highNoteDifficulty: 'MODERATE' },
  updateEditedSong: (payload) => {
    set({ editedSong: payload })
  },
  resetEditedSong: () => {
    set({ editedSong: { songId: '', name: '', songKey: '±0', highNoteDifficulty: 'MODERATE' } })
  },
  activeTab: 'all',
  changeActiveTab: (payload: string) => {
    set({ activeTab: payload })
  }
}))
