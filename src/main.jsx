import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./Store/Store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Protected from "./Components/AuthLayout.jsx";
import LoginPage from "./Pages/LoginPage.jsx";

import AddPost from "./Pages/AddPost.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import EditPost from "./Pages/EditPost.jsx";

import Post from "./Pages/Post.jsx";

import AllPosts from "./Pages/AllPosts.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route
        path="login"
        element={
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        }
      />
      <Route
        path="signup"
        element={
          <Protected authentication={false}>
            <SignUpPage />
          </Protected>
        }
      />
      <Route
        path="all-posts"
        element={
          <Protected authentication={true}>
            <AllPosts />
          </Protected>
        }
      />
      <Route
        path="add-post"
        element={
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        }
      />
      <Route
        path="edit-post/:slug"
        element={
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        }
      />
      <Route path="post/:slug" element={<Post />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
