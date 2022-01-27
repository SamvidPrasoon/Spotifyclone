import {atom} from "recoil"

export const playlist = atom({
  key:"playlist",
  default:null
})
export const playState = atom({
    key: 'playState', // unique ID (with respect to other atoms/selectors)
    default: '37i9dQZF1DXaMu9xyX1HzK', // default value (aka initial value)
  });

