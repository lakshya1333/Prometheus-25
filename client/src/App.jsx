import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import useScreenSize from "./hooks/useScreenSize";

function App() {
  const isSmallScreen = useScreenSize();

  if (isSmallScreen) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] bg-black bg-opacity-80 text-white p-4 md:p-6 rounded-lg text-center text-sm md:text-lg w-11/12 md:w-auto">
        For the best experience, please switch to a PC or larger screen device.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App