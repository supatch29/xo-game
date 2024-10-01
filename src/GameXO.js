import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

// ฟังก์ชันตรวจสอบผู้ชนะ
const checkWinner = (board) => {
  const winPatterns = [
    // แนวนอน
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // แนวตั้ง
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // แนวทแยง
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // คืนค่าผู้ชนะ (X หรือ O)
    }
  }
  return null; // ไม่มีผู้ชนะ
};

// Random AI - เลือกช่องว่างแบบสุ่ม
const findRandomMove = (board) => {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((cell) => cell !== null); // กรองเฉพาะช่องที่ยังว่าง
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]; // เลือกช่องที่ว่างแบบสุ่ม
};
// ฟังก์ชันสำหรับควบคุมการเล่นเกม
const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // กระดานเกม 3x3
  const [isXTurn, setIsXTurn] = useState(true); // เช็คเทิร์นของผู้เล่น
  const [playerScore, setPlayerScore] = useState(0); // เก็บคะแนนของผู้เล่น
  const [aiScore, setAiScore] = useState(0); // เก็บคะแนนของ AI
  const [consecutiveWins, setConsecutiveWins] = useState(0); // จำนวนชนะติดต่อกัน

  const handleClickXO = (index) => {
    if (board[index] || checkWinner(board)) return; // ถ้าช่องถูกคลิกแล้วหรือมีผู้ชนะ จะไม่ทำอะไร

    const newBoard = [...board];
    newBoard[index] = "x"; // ผู้เล่น X ทำการคลิก
    setBoard(newBoard); // อัปเดตกระดานเกม
    setIsXTurn(false); // สลับเทิร์นให้ AI เล่น

    // ตรวจสอบว่ามีผู้ชนะหรือไม่
    const winner = checkWinner(newBoard);
    if (winner) {
      if (winner === "x") {
        setPlayerScore((prevScore) => Math.max(prevScore + 1, 0)); // เพิ่มคะแนนให้ผู้เล่น
        setAiScore((prevScore) => Math.max(prevScore - 1, 0)); // ลดคะแนน AI
        setConsecutiveWins((prevWins) => {
          const newWins = prevWins + 1;
          if (newWins === 3) {
            setPlayerScore((score) => score + 1); // เพิ่มคะแนนพิเศษ
            return 0; // รีเซ็ตจำนวนเกมชนะติดต่อกัน
          }
          return newWins; // เพิ่มจำนวนเกมชนะติดต่อกัน
        });
      } else if (winner === "o") {
        setAiScore((prevScore) => Math.max(prevScore + 1, 0)); // เพิ่มคะแนนให้ AI
        setPlayerScore((prevScore) => Math.max(prevScore - 1, 0)); // ลดคะแนนผู้เล่น
        setConsecutiveWins(0); // รีเซ็ตจำนวนเกมชนะติดต่อกัน
      }
      setTimeout(() => {
        restartGame();
      }, 2500);
      return; // ออกจากฟังก์ชันเพื่อไม่ให้ AI ทำงานถัดไป
    }

    // AI ทำการเลือกช่องแบบสุ่ม
    setTimeout(() => {
      const aiMove = findRandomMove(newBoard); // หา Move ของ AI
      if (aiMove !== undefined) {
        newBoard[aiMove] = "o"; // วาง O ในช่องที่ AI เลือก
        setBoard(newBoard); // อัปเดตกระดานเกม

        // ตรวจสอบว่ามีผู้ชนะหรือไม่
        const winnerAfterAiMove = checkWinner(newBoard);
        if (winnerAfterAiMove) {
          if (winnerAfterAiMove === "o") {
            setAiScore((prevScore) => Math.max(prevScore + 1, 0)); // เพิ่มคะแนนให้ AI
            setPlayerScore((prevScore) => Math.max(prevScore - 1, 0)); // ลดคะแนนผู้เล่น
            setConsecutiveWins(0); // รีเซ็ตจำนวนเกมชนะติดต่อกัน
          }
          setTimeout(() => {
            restartGame();
          }, 2500);
        } else if (isBoardFull) {
          setConsecutiveWins(0); // รีเซ็ตจำนวนเกมชนะติดต่อกัน
          setTimeout(() => {
            restartGame();
          }, 2500);
        }

        setIsXTurn(true); // สลับกลับให้เป็นเทิร์นของผู้เล่น X
      }
    }, 500); // ตั้งดีเลย์เล็กน้อยเพื่อให้ดูเหมือน AI กำลังคิด
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null)); // รีเซ็ตกระดานให้ว่างทั้งหมด
    setIsXTurn(true); // รีเซ็ตให้เทิร์นเริ่มต้นเป็นของ X
  };

  const navigate = useNavigate(); // ต้องประกาศ `useNavigate` ภายในคอมโพเนนต์
  const handleLogout = () => {
    // ลบ Token ออกจาก Local Storage
    localStorage.removeItem("token");

    // นำผู้ใช้กลับไปยังหน้าแรก (หรือหน้า login)
    navigate("/");
  };

  const winner = checkWinner(board);
  const isBoardFull = board.every((cell) => cell !== null);

  return (
    <div className="game">
      <h1 style={{ color: "#fff" }}>Welcome to XO</h1>{" "}
      <p
        style={{ color: "#fff", marginLeft: "20%" }}
        className="w3-left-align "
      >
        กติกาการเก็บคะแนน
      </p>
      <ul
        style={{ color: "#fff", marginLeft: "20%" }}
        className="w3-left-align "
      >
        <li>
          เมื่อผู้เล่นเอาชนะบอทได้ จะได้รับ 1 คะแนน (ถ้าแพ้จะเสีย 1 คะแนน)
        </li>
        <li>
          ถ้าผู้เล่นเอาชนะบอทได้ 3 ครั้งติดต่อกันจะได้รับคะแนนพิเศษเพิ่มอีก 1
          คะแนน
        </li>
      </ul>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClickXO(index)}
            style={{ padding: "40%" }}
          >
            {cell}
          </div>
        ))}
      </div>
      <div style={{ color: "#fff", flexDirection: "column" }}>
        <p>AI : {aiScore} คะแนน</p>
        <p>You : {playerScore} คะแนน</p>
      </div>
      {winner && <p style={{ color: "#fff" }}>ผู้ชนะคือ: {winner}</p>}
      {!winner && isBoardFull && <p style={{ color: "#fff" }}>เสมอ</p>}
      <Button variant="contained" onClick={() => restartGame()} color="success" style={{ marginRight: "10px",}}>
        เริ่มเกมใหม่
      </Button>
      <Button variant="contained" color="error"  onClick={handleLogout}>Logout</Button>

    </div>
  );
};

export default App;
