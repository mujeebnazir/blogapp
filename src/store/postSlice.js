import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const post = {
        title: action.payload.title,
        slug: action.payload.$id,
        content: action.payload.content,
        featuredImage: action.payload.featuredImage,
      };
      state.posts.push(post);
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.slug !== action.payload.slug
      );
    },
    reSetPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.slug === action.payload.slug ? action.payload : post
      );
    },
  },
});

export const { addPost, removePost, reSetPosts, updatePost } =
  postSlice.actions;

export default postSlice.reducer;
