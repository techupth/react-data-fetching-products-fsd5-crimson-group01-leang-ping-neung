import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [ProductData, setProductData] = useState([]);
  // 2.1) สร้าง function getBlogPost เอาไว้สร้าง request
  const getProductData = async () => {
    const response = await axios.get("http://localhost:4001/products");
    console.log(response);
    // แล้ว update state
    setProductData(response.data.data);
  };
  // 2.2) Execute getBlogPost แต่ว่าต้องใส่ใน useEffect เพื่อให้ สร้าง Request
  // แค่ครั้งแรกครั้งเดียวตอนที่ Component render
  useEffect(() => {
    getProductData();
  }, []);

  const handleDelete = async (productId) => {
    // 1)
    // await axios.delete(`http://localhost:4001/products/${productId}`);
    // getProductData()
    // 2) OK กว่า***
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      const newProductData = ProductData.filter(
        (item) => item.id !== productId
      );
      // const newProductData = ProductData.filter((item) => {return item.id !== productId});
      setProductData(newProductData);
      console.log("Product deleted successfully:", productId);
    } catch (error) {
      // Handle errors if any
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product">
        {ProductData.map((postItem, index) => {
          return (
            <div className="product-preview " key={index}>
              <div className="product-list">
                <img
                  src={postItem.image}
                  alt={postItem.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {postItem.name}</h1>
                <h2>Product price: {postItem.price}</h2>
                <p>Product description: {postItem.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  handleDelete(postItem.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
