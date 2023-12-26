import axios from "axios";
import React, { useEffect, useReducer } from "react";
import "./App.css";

// Define initial state
const initialState = {
  productData: [],
  loading: true,
  error: null,
};

// Define reducer function to handle state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        productData: action.payload,
        loading: false,
        error: null,
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        productData: state.productData.filter(
          (item) => item.id !== action.payload
        ),
        error: null,
      };
    case "FETCH_FAILURE":
    case "DELETE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 2.1) สร้าง function getBlogPost เอาไว้สร้าง request
  const getProductData = async () => {
    try {
      const response = await axios.get("http://localhost:4001/products");
      console.log(response);
      // Dispatch action on success
      dispatch({ type: "FETCH_SUCCESS", payload: response.data.data });
    } catch (error) {
      // Dispatch action on failure
      dispatch({ type: "FETCH_FAILURE", payload: error.message });
    }
  };

  // 2.2) Execute getBlogPost แต่ว่าต้องใส่ใน useEffect เพื่อให้ สร้าง Request
  // แค่ครั้งแรกครั้งเดียวตอนที่ Component render
  useEffect(() => {
    getProductData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      // Dispatch action on success
      dispatch({ type: "DELETE_SUCCESS", payload: productId });
    } catch (error) {
      // Dispatch action on failure
      dispatch({ type: "DELETE_FAILURE", payload: error.message });
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product">
        {state.loading ? (
          <p>Loading...</p>
        ) : state.error ? (
          <p>Error: {state.error}</p>
        ) : (
          state.productData.map((postItem) => (
            <div className="product-preview" key={postItem.id}>
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
          ))
        )}
      </div>
    </div>
  );
}

export default App;
