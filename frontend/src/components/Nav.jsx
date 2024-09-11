import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Nav = () => {
  return (
    <>
      <nav>
        <ul
          className=" fw-semibold fs-6 "
          style={{ listStyle: "none", padding: "0px" }}>
          <li className="mt-3">
            <AiOutlineHome style={{ fontSize: "25px", marginBottom: "5px" }} />
            <span className="px-3">Home</span>
          </li>
          <li className="mt-3">
            <MdOutlineExplore
              style={{ fontSize: "25px", marginBottom: "5px" }}
            />
            <span className=" px-3">Explore</span>
          </li>
          <li className="mt-3">
            <IoBookmarkOutline
              style={{ fontSize: "25px", marginBottom: "5px" }}
            />
            <span className=" px-3">Bookmark</span>
          </li>
          <li className="mt-3">
            <CgProfile style={{ fontSize: "25px", marginBottom: "5px" }} />
            <span className=" px-3">Profile</span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
