import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "sweetalert2/src/sweetalert2.scss";
import { theme } from "./utils/constants";
import "swiper/scss";
import { ModalProvider } from "./contexts/modalContext";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./contexts/authContext";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AuthProvider>
      </Provider>
      <ToastContainer></ToastContainer>
    </ThemeProvider>
  </BrowserRouter>
  //   <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
