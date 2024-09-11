import React, { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";
import { MdGif } from "react-icons/md";

const Main = () => {
  const [isPost, setIsPost] = useState(false);

  return (
    <div className="position-relative">
      <div
        onClick={() => setIsPost(true)}
        className="my-4 py-2 px-3 d-flex rounded-3"
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
      {isPost && (
        <div className="d-flex justify-content-center ">
          <div
            className="p-3 rounded-3 position-absolute"
            style={{ backgroundColor: "white", width: "70%", top: "20px" }}>
            <span className="px-1 py-3" onClick={() => setIsPost(false)}>
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
    </div>
  );
};

export default Main;
