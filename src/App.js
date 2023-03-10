import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "./redux/userSlice";

import Login from "./pages/Login";
import Info from "./pages/Info";
import Luck from "./pages/Lock";
import Register from "./pages/Register";
import MemberList from "./pages/MemberList";
import Appbar from "./components/Appbar";
import "./App.css";

const App = () => {
  const { token } = useSelector(selectUser);

  const verifyToken = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        {token === "" && verifyToken === null ? (
          <Route path="*" element={<Navigate replace to="/login" />} />
        ) : (
          <>
            <Route path="/login" element={<Navigate replace to="/" />} />
            <Route path="/" element={<Appbar />}>
              <Route path="/" index element={<Luck />} />
              <Route path="/info" element={<Info />} />
              <Route path="/register" element={<Register />} />
              <Route path="/memberlist" element={<MemberList />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
