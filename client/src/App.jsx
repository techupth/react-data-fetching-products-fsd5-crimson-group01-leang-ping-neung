import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [productList, setProductList] = useState([]);

  const getProductList = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductList(result.data.data);
  };

  const deleteProductList = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    try {
      const newProductList = productList.filter((item) => {
        return item.id !== id;
      });
      getProductList(newProductList);
    } catch {
      console.log("ERROR"); // ถ้าไม่สำเร็จโชว์ข้อความ error เพื่อลดการสร้าง request ข้อมูล
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>

        {productList.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-preview">
              <img
                src={product.image}
                alt="some product"
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price} Baht</h2>
              <p>Product description: {product.description}</p>
            </div>

            <button
              className="delete-button"
              onClick={() => {
                deleteProductList(product.id);
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
