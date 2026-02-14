import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./index.css";
import { ColorModeScript } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Info from "./pages/Info";
import Page404 from "./pages/Page404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/info/:name",
    element: <Info />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
      <ColorModeScript initialColorMode="light" />
    </ChakraProvider>
  </React.StrictMode>,
);
