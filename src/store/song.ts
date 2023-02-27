import create from 'zustand'
import { updateSongInput } from '../schema/song'

type State = {
  editedSong: updateSongInput
  updateEditedSong: (payload:updateSongInput) => void
  resetEditedSong: () => void
}

export const useSongStore = create<State>((set) => ({
  editedSong: { songId: '', name: '', songKey: '±0' },
  updateEditedSong: (payload) => {
    set({ editedSong: payload })
  },
  resetEditedSong: () => {
    set({ editedSong: { songId: '', name: '', songKey: '±0' } })
  }
}))
