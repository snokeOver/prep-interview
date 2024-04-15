import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { IoHome } from "react-icons/io5";
import { AuthContext } from "../../authProvider/AuthProvider";
import RingLoading from "../shared/RingLoading";

const Navbar = () => {
  const { loading, user, setUser, logOut, setLogOutSuccess, pageLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const fallbackPPUrl = "https://i.ibb.co/vxg6nY4/user.png";

  const [isHovering, setIsHovering] = useState(false);

  // Handle log out button
  const handleLogOut = () => {
    logOut()
      .then((result) => {
        setUser(null);
        setLogOutSuccess(true);
        setCartNumber(0);
        navigate("/login");
      })
      .catch((err) => console.log(err.message));
  };

  // define the navlinks
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${isActive ? "border border-primary bg-base-100" : ""} mr-1`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${isActive ? "border border-primary bg-base-100" : ""} mr-1`
          }
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/js"
          className={({ isActive }) =>
            `${isActive ? "border border-primary bg-base-100" : ""} mr-1`
          }
        >
          JavaScript
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/react"
          className={({ isActive }) =>
            `${isActive ? "border border-primary bg-base-100" : ""} mr-1`
          }
        >
          React
        </NavLink>
      </li>
      {loading || pageLoading ? (
        <RingLoading />
      ) : (
        user && (
          <>
            <li>
              <NavLink
                to="/user-profile"
                className={({ isActive }) =>
                  `${isActive ? "border border-primary bg-base-100" : ""} mr-1`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/update-profile"
                className={({ isActive }) =>
                  `${isActive ? "border border-primary bg-base-100" : ""} mr-1`
                }
              >
                Update Profile
              </NavLink>
            </li>
          </>
        )
      )}
    </>
  );

  // fallback for Profile image to show default image
  const handleImageError = (event) => {
    event.target.src = "https://i.ibb.co/vxg6nY4/user.png";
  };
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div>
          <NavLink
            className="text-3xl font-semibold font-rubik flex items-center gap-2"
            to="/"
          >
            <IoHome className="bg-primary rounded-full p-[.36rem] text-gray-200" />
            <span className="hidden md:flex">Prep-Interview</span>
          </NavLink>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks} </ul>
      </div>

      <div className="navbar-end">
        <ThemeButton />

        {loading || pageLoading ? (
          <RingLoading />
        ) : user ? (
          <>
            <div
              tabIndex={0}
              role="button"
              className="relative btn btn-ghost btn-circle avatar mr-1"
            >
              <div
                className="w-8 rounded-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img
                  alt="User Photo"
                  src={user.photoURL || fallbackPPUrl}
                  onError={handleImageError}
                />
                {isHovering && (
                  <div className="absolute bg-base-100 top-14 -left-28 text-xs text-left shadow-md py-5 px-4 rounded-lg z-10">
                    <h3> {user.displayName}</h3>
                    <div className="divider my-1"></div>
                    <h3> {user.email}</h3>
                  </div>
                )}
              </div>
            </div>
            <Link
              onClick={handleLogOut}
              className="btn btn-primary px-3 rounded-none btn-sm"
              to="/"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <>
              <Link
                className="btn btn-outline btn-success dark:btn-info px-3 rounded-sm btn-sm mr-3"
                to="/register"
              >
                Register
              </Link>
              <Link
                className="btn btn-primary px-3 rounded-sm btn-sm"
                to="/login"
              >
                Login
              </Link>
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
