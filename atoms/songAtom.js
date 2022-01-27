import {atom} from 'recoil'
export const currentTrackId = atom({
    key:"currentTrackId",
    default:null
})

export const isPlayingState = atom({
    key:"isPlayingState",
    default:false
})