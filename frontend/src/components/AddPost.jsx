import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegImage } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdGif } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editPost, editUserPost } from "../pages/Home/features/userPostSlice";

const AddPost = ({ setIsOpen, isEdit, postId, userId, content }) => {
  const [description, setDescription] = useState(content || "");

  const dispatch = useDispatch();

  const editHandler = async () => {
    dispatch(editPost({ postId, description })).then(() => {
      dispatch(editUserPost({ postId, description }));

      toast.success("Post Edited");
      setIsOpen(false);
    });
  };

  return (
    <div className="d-flex justify-content-center ">
      <div
        className="p-3 rounded-3 position-absolute z-2 shadow-lg"
        style={{
          backgroundColor: "white",
          width: "70%",
          top: isEdit ? "0px" : "20px",
          zIndex: 10,
        }}>
        <span className="px-1 py-3" onClick={() => setIsOpen(false)}>
          <FaArrowLeftLong style={{ fontSize: "20px" }} />
        </span>
        <div>
          <textarea
            className="form-control my-3"
            placeholder="What is Happening?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"></textarea>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <FaRegImage style={{ fontSize: "20px" }} />
            <MdGif style={{ fontSize: "30px", marginLeft: "10px" }} />
          </div>
          {isEdit ? (
            <button className="btn btn-light fw-semibold" onClick={editHandler}>
              Edit
            </button>
          ) : (
            <button className="btn btn-light fw-semibold">Post</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
