import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import { Navbar } from "./components/common/Navbar";
import { ForgotPassword } from "./pages/ForgotPassword";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute> }></Route>
        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
        <Route path="/updatepassword/:id" element={<UpdatePassword/>}></Route>
        <Route path="/verify-email" element={<VerifyEmail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
