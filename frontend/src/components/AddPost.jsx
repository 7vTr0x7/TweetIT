import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegImage } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdGif } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editPost, editUserPost } from "../pages/Home/features/userPostSlice";

const AddPost = ({ setIsOpen, isEdit, postId, userId, content }) => {
  const [description, setDescription] = useState(content || "");

  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const dispatch = useDispatch();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fww4myo8");
    formData.append("cloud_name", "dbzzejye6");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dbzzejye6/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrl(data.url);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5000000) {
      toast.error("file is too big");
      return;
    }
  };

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
        {imageUrl && (
          <div>
            <img src={imageUrl} className="w-100" />
          </div>
        )}
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
            <label htmlFor="image-upload">
              <FaRegImage style={{ fontSize: "20px", cursor: "pointer" }} />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {/* Video Icon */}
            <label htmlFor="video-upload">
              <MdGif
                style={{
                  fontSize: "30px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              />
            </label>
            <input
              type="file"
              id="video-upload"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideoUpload}
            />
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
      <Toaster />
    </div>
  );
};

export default AddPost;
