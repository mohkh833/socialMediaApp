import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { NavBar } from "./Components/NavBar/NavBar";
import {Home} from "./Pages/HomePage/Home"
import {Register} from "./Pages/RegisterPage/Register"
import {Login} from "./Pages/LoginPage/Login"
import {Report} from "./Pages/ReportPage/Report"
import {Profile} from "./Pages/ProfilePage/Profile"
import {PostFormPage} from "./Pages/PostFormPage/PostFormPage";
import {PageNotFound} from "./Components/PageNotFound/PageNotFound"
import { EditProfile } from "./Pages/EditProfile/EditProfile";
import { EditPostBox } from "./Components/EditPostBox/EditPostBox";

function App() {
  return (
    <>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/reports" element={<Report/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/post" element={<PostFormPage/>}></Route>
          <Route path="*" element={<PageNotFound/>} />
          <Route path="/post/edit/:id" element={<EditPostBox/>} />
          <Route path="/profile/edit" element={<EditProfile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
