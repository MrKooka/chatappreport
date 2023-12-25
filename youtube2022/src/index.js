import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatProvider>
  </AuthContextProvider>
);
