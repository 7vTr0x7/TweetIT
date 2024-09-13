import React from "react";
import { FaRegImage } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdGif } from "react-icons/md";

const AddPost = ({ setIsPostOpen }) => {
  return (
    <div className="d-flex justify-content-center ">
      <div
        className="p-3 rounded-3 position-absolute z-2 shadow-lg"
        style={{
          backgroundColor: "white",
          width: "70%",
          top: "20px",
          zIndex: 10,
        }}>
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
  );
};

export default AddPost;
