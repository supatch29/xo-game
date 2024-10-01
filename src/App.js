import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import GameXO from "./GameXO"; 
import UsersList from "./UsersList"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/gamexo" element={<GameXO />} />
        <Route path="/UsersList" element={<UsersList />} />
        {/* คุณสามารถเพิ่มเส้นทางอื่นๆ ได้ที่นี่ */}
      </Routes>
    </Router>
  );
}

export default App;
