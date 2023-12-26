import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

// 1) หา API ก่อนว่าต้องใช้ API อันไหน
// GET: localhost:4000/posts

// 2) สร้าง Request ไปหา Server (Axios)
// - ติดตั้ง axios
// - import axios
// - execute axios (useEffect, useState, async, ...)

// 3) นำข้อมูลจาก Response มา Render

function App() {
  const [blogPost, setBlogPost] = useState([]);

  // 2.1) สร้าง function getBlogPost เอาไว้สร้าง request
  const getBlogPost = async () => {
    const result = await axios.get("http://localhost:4000/posts");
    // อย่าลืม console.log(result)
    // ถ้าอยากจะได้ข้อมูลจาก Server เราต้อง result.data.data
    // แล้ว update state
    setBlogPost(result.data.data);
  };

  // 2.2) Execute getBlogPost แต่ว่าต้องใส่ใน useEffect เพื่อให้ สร้าง Request
  // แค่ครั้งแรกครั้งเดียวตอนที่ Component render
  useEffect(() => {
    getBlogPost();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Posts</h1>
      </div>
      <div className="board">
        {/* 
          3) นำข้อมูลจาก Response มา Render  
          blogPost = [{}, {}, {}]
        */}
        {blogPost.map((post) => {
          return (
            <div className="message">
              <h1>{post.title}</h1>
              <button className="delete-button">x</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
