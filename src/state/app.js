const initialState = {
  currentSongNumber: -1,
  currentPlayingTime:0,
};

//action
const SET_CURRENT_SONG = "SET_CURRENT_SONG",
  SET_PLAYING_TIME = "SET_PLAYING_TIME";

//set current song
export const songSelect = (index) => ({
  type: SET_CURRENT_SONG,
  payload: index,
});

//set playing time
export const setPlayingTime = (time) => ({
  type: SET_PLAYING_TIME,
  payload: time,
});

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      console.log(action.payload);
      return { ...state, currentSongNumber: action.payload };
    case SET_PLAYING_TIME:
      return { ...state, currentPlayingTime: action.payload };
    default:
      return state;
  }
};
