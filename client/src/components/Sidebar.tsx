import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
 const {pathname} = useLocation()

  return (
    <div className="border-[#3e4144] px-2 border-r-1 py-3">
        <h1 className="text-3xl">HE</h1>
        <ul className="">
          <li
            className={`px-4 py-2 font-semibold my-4 rounded-full cursor-pointer ${
              pathname === "/"
                ? "bg-white text-black"
                : "hover:bg-[#3e4144] bg-none"
            }`}
          >
            <Link className="block" to="/">Home</Link>
          </li>
          <li
            className={`px-4 py-2 font-semibold my-4 rounded-full cursor-pointer ${
              pathname === "/profile"
                ? "bg-white text-black"
                : "bg-none hover:bg-[#3e4144]"
            }`}
          >
            <Link className="block" to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
  )
}
