//STYLING
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CropingImage from "./components/crop";
import { History } from "./components/history/history";
import React from "react";
import ImageToPdfConverter from "./components/imageToPdf/imageToPdf";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CropingImage />} />
      <Route path="/history" element={<History />} />
      <Route path="/image2pdf" element={<ImageToPdfConverter />} />
    </Routes>
  );
}

export default App;
