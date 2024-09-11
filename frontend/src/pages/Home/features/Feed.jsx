import React, { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";
import { MdGif } from "react-icons/md";
import { FiSliders } from "react-icons/fi";

const Main = () => {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState("Latest");

  return (
    <div className="position-relative">
      <div
        onClick={() => setIsPostOpen(true)}
        className="my-3 py-2 px-3 d-flex rounded-3"
        style={{ backgroundColor: "white" }}>
        <img
          src="https://via.placeholder.com/50"
          style={{ borderRadius: "100%" }}
        />
        <p
          className="m-0 px-4 fw-semibold"
          style={{ position: "relative", top: "13px" }}>
          What is happening?
        </p>
      </div>
      {isPostOpen && (
        <div className="d-flex justify-content-center ">
          <div
            className="p-3 rounded-3 position-absolute z-2 shadow-lg"
            style={{ backgroundColor: "white", width: "70%", top: "20px" }}>
            <span className="px-1 py-3" onClick={() => setIsPostOpen(false)}>
              <FaArrowLeftLong style={{ fontSize: "20px" }} />
            </span>
            <div>
              <textarea
                className="form-control my-3"
                placeholder="What is Happening?"
                rows="5"></textarea>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <FaRegImage style={{ fontSize: "20px" }} />
                <MdGif style={{ fontSize: "30px", marginLeft: "10px" }} />
              </div>
              <button className="btn btn-light fw-semibold">Post</button>
            </div>
          </div>
        </div>
      )}

      <div className="position-relative" style={{ backgroundColor: "white" }}>
        <div className="d-flex justify-content-between  my-4 px-3 py-2">
          <p className="m-0 fw-semibold">{filter} Post</p>
          <span onClick={() => setIsFilter((prev) => !prev)}>
            <FiSliders />
          </span>
        </div>
        {isFilter && (
          <div
            className="position-absolute px-3 py-2 "
            style={{ right: "10px", top: "30px", cursor: "pointer" }}>
            <ul className="list-group fw-semibold z-2 shadow-lg">
              <li
                className="list-group-item"
                onClick={() => setFilter("Latest")}>
                Latest
              </li>
              <li
                className="list-group-item"
                onClick={() => setFilter("Trending")}>
                Trending
              </li>
              <li
                className="list-group-item"
                onClick={() => setFilter("Oldest")}>
                Oldest
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
