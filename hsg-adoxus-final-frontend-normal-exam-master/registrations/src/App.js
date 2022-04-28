import db from './firebase/db'; // eslint-disable-line no-unused-vars
// ↑↑↑ A FENTI SOR(OKA)T NE MÓDOSÍTSD ↑↑↑
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.scss";
import Admin from "./pages/Admin";
import RegisterForm from "./pages/RegisterForm";

function App() {
  const roleList = ["admin", "vendég", "regisztrált felhasználó"];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/new" element={<RegisterForm roleList={roleList}/>}/>
        <Route path="/" element={<Admin roleList={roleList}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
