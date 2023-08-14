import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AccountContextProvider } from "./contexts/account-context.jsx";
import App from "./App.jsx";
import Main from "./pages/Main.jsx";
import Gallery from "./pages/Gallery.jsx";
import "./styles/tailwind.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/:space", element: <Gallery /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccountContextProvider>
      <RouterProvider router={router} />
    </AccountContextProvider>
  </React.StrictMode>
);
