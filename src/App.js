import { Route, Routes, BrowserRouter } from "react-router-dom";

import Search from "./pages/Search";
import Details from "./pages/Details";
import HomePage from "./pages/HomePage";
import Response from "./pages/Response";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/main.scss";



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details" element={<Details />} />
          <Route path="/response" element={<Response />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
