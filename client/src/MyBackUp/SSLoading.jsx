import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductData = async () => {
    try {
      const response = await axios.get("http://localhost:4001/products");
      setProductData(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching product data:", error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      const newProductData = productData.filter(
        (item) => item.id !== productId
      );
      setProductData(newProductData);
      console.log("Product deleted successfully:", productId);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product">
        {loading && <p>Loading...</p>}
        {!loading &&
          productData.map((postItem, index) => (
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
          ))}
      </div>
    </div>
  );
}

export default App;
