import "./NavBar.css";
import { useDispatch,useSelector } from "react-redux";

import { logout } from '../../redux/slices/userSlice'
export const NavBar = () => {
  const { userInfo, isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  let isLoggedIn = false;
  
  if (Object.keys(userInfo).length !== 0 ) isLoggedIn = true;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-lightp-10">
        <a className="navbar-brand" href="/">
          Blog
        </a>

        <div className="collapse navbar-collapse" style={{ marginTop: "5px" }}>
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/profile">
              Profile
            </a>
            <a className="nav-item nav-link" href="/post">
              Post
            </a>

            {isAdmin && (
              <a className="nav-item nav-link" href="/reports">
                Reports
              </a>
            )}
          </div>
          <div className="Center">
            <input className="SearchBar" type="text" />
            <button className="btn btn-dark SearchButton">Search</button>
          </div>
        </div>

        <div id="navbarNavAltMarkup">
          {isLoggedIn && (
            <div className="Right">
              <span>{userInfo.data.name}</span>
              <button type="button" className="btn btn-outline-dark" onClick={()=>dispatch(logout())}>
                Logout
              </button>
            </div>
          )}

          {!isLoggedIn && (
            <div className="Right">
              <a href="/login">
                <button type="button" className="btn btn-dark login">
                  Login
                </button>
              </a>
              <a href="/register">
                <button type="button" className="btn btn-outline-dark">
                  Register
                </button>
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
