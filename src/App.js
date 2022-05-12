import logo from "./logo.svg";
import "./App.css";
import { Switch } from "react-router-dom";
import Home from "./pages/Home";
import { Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import { useState, useCallback, useEffect } from "react";
import RegisterBoard from "./pages/RegisterBoard";
import useSWR from "swr";
import BoardDetail from "./pages/BoardDetail";
import BoardMod from "./pages/BoardMod";
import { getCookie } from "./utils/getCookie";
import SignUp from "./pages/SignUp";

function App() {
  const { data: tokens, mutate } = useSWR("http://localhost:8080/api/v1/reissue");
  useEffect(() => {
    console.log("refreshed");

    let refreshToken = getCookie("refreshToken");
    let accessToken = getCookie("accessToken");

    mutate({
      refreshToken,
      accessToken,
    });
  }, [mutate]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }} className="App">
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/login" render={() => <Login />} />
        <Route exact path="/board/register" render={() => <RegisterBoard />} />
        <Route path="/board/mod/:bid" component={BoardMod} />
        <Route path="/board/:bid" component={BoardDetail} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
