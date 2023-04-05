import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [gameId, setGameId] = useState(sessionStorage.getItem("gameId"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            token ? (
              <MainPage setToken={setToken} setGameId={setGameId} />
            ) : (
              <LoginPage setToken={setToken} />
            )
          }
        ></Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/game" element={<GamePage setGameId={setGameId} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
