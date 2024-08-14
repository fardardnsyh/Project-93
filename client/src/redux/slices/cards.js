import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCards = createAsyncThunk("card/fetchCards", async () => {
  const { data } = await axios.get("/cards");
  return data;
});

export const fetchRemoveCards = createAsyncThunk(
  "card/fetchRemoveCards",
  async (id) => {
    await axios.delete(`/cards/${id}`);
  }
);
export const fetchUpdateCards = createAsyncThunk(
  "card/fetchUpdateCards",
  async ({ id, values }) => {
    const { data } = await axios.patch(`/cards/${id}`, values);
    return data;
  }
);

export const fetchUpdateTodos = createAsyncThunk(
  "card/fetchUpdateTodos",
  async ({ id, values }) => {
    const { data } = await axios.patch(`/cards/${id}/todos`, values);
    return data;
  }
);

export const fetchUpdateAllCards = createAsyncThunk(
  "card/fetchUpdateAllCards",
  async (values) => {
    const { data } = await axios.patch(`/cards`, values);
    return data;
  }
);

export const fetchGetOneCards = createAsyncThunk(
  "card/fetchGetOneCards",
  async ({ id }) => {
    const { data } = await axios.get(`/cards/${id}`);
    return data;
  }
);

const initialState = {
  cards: {
    items: [],
    status: "loading",
  },
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setAddCard(state, action) {
      const newCard = action.payload.data;

      const isDuplicate = state.cards.items.some(
        (card) => card.title === newCard.title
      );

      if (!isDuplicate) {
        state.cards.items.push({ ...newCard, user: action.payload.userData });
      } else {
        console.error(`Карта с title '${newCard.title}' уже существует.`);
      }
    },
    setUpdateCard(state, action) {
      const _id = action.payload.id;
      const updatedCardData = action.payload.data;
      state.cards.items.map((obj) => {
        if (obj._id === _id) {
          obj = updatedCardData;
        }
      });

      state.cards.status = "loaded";
    },
    setCleaneState(state) {
      state.cards.items = [];
    },
  },
  extraReducers: {
    //get cards
    [fetchCards.pending]: (state) => {
      state.cards.items = [];
      state.cards.status = "loading";
    },
    [fetchCards.fulfilled]: (state, action) => {
      state.cards.items = action.payload;
      state.cards.status = "loaded";
    },
    [fetchCards.rejected]: (state) => {
      state.cards.items = [];
      state.cards.status = "error";
    },
    //delete crard by id
    [fetchRemoveCards.pending]: (state, action) => {
      state.cards.items = state.cards.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    //updete crard by id

    [fetchUpdateCards.fulfilled]: (state, action) => {
      const _id = action.payload._id;

      const updatedCard = action.payload;
      const index = state.cards.items.findIndex(
        (card) => card._id === updatedCard._id
      );

      if (index !== -1) {
        state.cards.items[index] = { _id, ...updatedCard };
      }
      state.cards.status = "loaded";
    },
    [fetchUpdateCards.rejected]: (state, action) => {
      state.cards.status = "error";
    },
    //updete todos by id

    [fetchUpdateTodos.fulfilled]: (state) => {
      state.cards.status = "loaded";
    },
    [fetchUpdateTodos.rejected]: (state) => {
      state.cards.status = "error";
    },
  },
});

export const { setAddCard, setUpdateCard, setUpdateCardState, setCleaneState } =
  cardsSlice.actions;

export const cardsReducer = cardsSlice.reducer;
