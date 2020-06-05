import {
  configureStore,
  combineReducers,
  createReducer,
} from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userId: null,
  userPosts: [],
  // avatar: null,
};
const reducer = {
  CURRENT_USER: (state, { payload }) => {
    return {
      ...state,
      userName: payload.userName,
      userId: payload.userId,
      userPosts: payload.userPosts,
      // avatar: payload.avatar
    };
  },
  USER_SIGNOUT: () => initialState,
};

const user = createReducer(initialState, reducer);

const rootReduser = combineReducers({
  user: user,
});

export const store = configureStore({
  reducer: rootReduser,
});
