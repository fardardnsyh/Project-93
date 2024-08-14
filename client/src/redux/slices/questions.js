import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const { data } = await axios.get("/questions");
    return data;
  }
);

export const fetchCreateQuestions = createAsyncThunk(
  "questions/fetchCreateQuestions",
  async (value) => {
    const { data } = await axios.post("/questions", value);
    return data;
  }
);

export const fetchRemoveQuestions = createAsyncThunk(
  "questions/fetchRemoveQuestions",
  async (id) => {
    await axios.delete(`/questions/${id}`);
  }
);

export const fetchUpdateQuestions = createAsyncThunk(
  "questions/fetchUpdateQuestions",
  async ({ id, value }) => {
    const { data } = await axios.patch(`/questions/${id}`, { status: value });
    return data;
  }
);

const initialState = {
  questions: {
    items: [],
    status: "loaded",
  },
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: {
    //create questions
    [fetchCreateQuestions.pending]: (state) => {
      state.questions.status = "loading";
    },
    [fetchCreateQuestions.fulfilled]: (state, action) => {
      state.questions.status = "loaded";
      state.questions.items = [...state.questions.items, action.payload];
    },
    [fetchCreateQuestions.rejected]: (state) => {
      state.questions.status = "error";
    },
    //get questions
    [fetchQuestions.pending]: (state) => {
      state.questions.items = [];
      state.questions.status = "loading";
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.questions.items = action.payload;
      state.questions.status = "loaded";
    },
    [fetchQuestions.rejected]: (state) => {
      state.questions.items = [];
      state.questions.status = "error";
    },
    //delete question by id
    [fetchRemoveQuestions.pending]: (state) => {
      state.questions.status = "loading";
    },
    [fetchRemoveQuestions.fulfilled]: (state, action) => {
      state.questions.items = state.questions.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
      state.questions.status = "loaded";
    },
    //updete question by id
    [fetchUpdateQuestions.pending]: (state) => {
      state.questions.status = "loading";
    },
    [fetchUpdateQuestions.fulfilled]: (state, action) => {
      const updatedQuestion = action.payload.updatedQuestion;
      const index = state.questions.items.findIndex(
        (question) => question._id === updatedQuestion._id
      );
      if (index !== -1) {
        state.questions.items[index].status = updatedQuestion.status;
      }
      state.questions.status = "loaded";
    },
    [fetchUpdateQuestions.rejected]: (state, action) => {
      state.questions.status = "error";
    },
  },
});


export const questionsReducer = questionSlice.reducer;
