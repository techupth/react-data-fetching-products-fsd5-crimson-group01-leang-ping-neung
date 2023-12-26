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
    getProductList();
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>

        {productList.map((product) => (
          <div className="product-list" key={product.id}>
            <div className="product">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
