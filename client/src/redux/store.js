import { configureStore } from "@reduxjs/toolkit";
import { cardsReducer } from "./slices/cards";
import { authReducer } from "./slices/auth";
import { soundReducer } from "./slices/sound";
import { questionsReducer } from "./slices/questions";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer,
    questions: questionsReducer,
    sound: soundReducer,
  },
});

export default store;
