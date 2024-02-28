import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { Navbar } from "./components/common/Navbar";
import { ForgotPassword } from "./pages/ForgotPassword";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { About } from "./pages/About";
import { Error } from "./pages/Error";
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./components/core/Auth/PrivateRoute";
import { MyProfile } from "./components/core/Dashboard/MyProfile";
import { EnrolledCourse } from "./components/core/Dashboard/EnrolledCourse";
import Settings from "./components/core/Dashboard/settings";
import AddCourse from "./components/core/Dashboard/AddCourse";
import Cart from "./components/core/Dashboard/cart";
import { ContactUs } from "./pages/ContactUs";
import { useSelector } from "react-redux";
import { MyCourses } from "./components/core/Dashboard/MyCourses";
import { Catalog } from "./pages/Catalog";
import { EditCourse } from "./components/core/Dashboard/Editcourse";
import { CoursePage } from "./pages/CoursePage";
import { ViewCourse } from "./pages/ViewCourse";
import { VideoDetail } from "./components/core/ViewCourse/VideoDetail";
import { Instructor } from "./components/core/Dashboard/Instructor";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <div className="border-b-[1px] border-richblack-600 mb-10">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        ></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/updatepassword/:id" element={<UpdatePassword />}></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>
        <Route path="/aboutus" element={<About />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>

        {/* Dashboard */}
        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
          {user && user.accountType === "Student" && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourse />}
              ></Route>
              <Route
                path="/dashboard/cart"
                element={<Cart />}
              ></Route>
              <Route
                path="/dashboard/purchase-history"
                element={<MyProfile />}
              ></Route>
            </>
          )}

          {user && user.accountType === "Instructor" && (
            <>
            <Route
            path="/dashboard/add-course"
            element={<AddCourse />}
          ></Route>
          <Route
            path="/dashboard/my-course"
            element={<MyCourses />}
          ></Route>
          <Route
            path="/dashboard/instructor"
            element={<Instructor />}
          ></Route>
          <Route
            path="/dashboard/edit-course/:courseId"
            element={<EditCourse />}
          ></Route>
            </>)
          }
          <Route path="/dashboard/setting" element={<Settings />}></Route>
        </Route>

        {/* view course */}
        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          {
            user && user.accountType === "Student" && (
              <>
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetail/>}></Route>
              </>
            )
          }
        </Route>

        <Route path="/catalog/:catalogname" element={<Catalog/>}/>
        <Route path="/courses/:courseId" element={<CoursePage/>}></Route>
        <Route path="*" element={<Error/>} />
        <Route path="/error" element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
