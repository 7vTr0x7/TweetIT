import React, { useState } from "react";

import { HiDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Toaster, toast } from "react-hot-toast";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { likeAPost } from "../utils/functions/likePost";
import { useDispatch } from "react-redux";
import { readUser } from "./../pages/Profile/userSlice";
import { dislikeAPost } from "../utils/functions/dislikePost";
import { readPosts } from "../pages/Home/features/userPostSlice";
import { addToBookmark } from "../utils/functions/addToBookmark";
import { removeFromBookmark } from "../utils/functions/removeFromBookmark";
import AddPost from "./AddPost";

const Post = ({ post, user }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const date = new Date(post.createdAt);

  const dispatch = useDispatch();
  const likeHandler = async (id) => {
    likeAPost(id, user._id).then(() => {
      dispatch(readUser()).then(() => {
        dispatch(readPosts(user._id)).then(() => {
          toast.success("Like Added");
        });
      });
    });
  };
  const dislikeHandler = async (id) => {
    dislikeAPost(id, user._id).then(() => {
      dispatch(readUser()).then(() => {
        dispatch(readPosts(user._id)).then(() => {
          toast.success("Like Removed");
        });
      });
    });
  };

  const addToBookmarkHandler = (id) => {
    addToBookmark(id, user._id).then(() => {
      dispatch(readUser()).then(() => {
        dispatch(readPosts(user._id)).then(() => {
          toast.success("Added to Bookmark");
        });
      });
    });
  };
  const removeFromBookmarkHandler = (id) => {
    removeFromBookmark(id, user._id).then(() => {
      dispatch(readUser()).then(() => {
        dispatch(readPosts(user._id)).then(() => {
          toast.success("Removed From Bookmark");
        });
      });
    });
  };

  const editHandler = () => {
    setIsEdit(true);
    setIsOptionOpen(false);
  };

  return (
    <>
      <div
        className=" mt-3 p-3 rounded-3 "
        style={{ backgroundColor: "white " }}>
        <div className="d-flex justify-content-between align-content-center">
          <div className="d-flex ">
            <img
              src={post.user.avatarUrl}
              style={{ height: "50px", width: "50px", borderRadius: "100%" }}
            />
            <div>
              <span className="m-0 px-3 fw-bold ">{post.user.userName}</span>
              <small className="m-0  ">{post.user.userAt}</small>
              <p className="m-0  px-3">
                <small>{date.toLocaleString()}</small>
              </p>
            </div>
          </div>
          <span
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => setIsOptionOpen((prev) => !prev)}>
            {isOptionOpen ? (
              <RxCross2 style={{ fontSize: "25px" }} />
            ) : (
              <HiDotsVertical />
            )}
          </span>
        </div>
        <div className="position-relative">
          {isEdit && (
            <AddPost
              setIsPostOpen={setIsEdit}
              isEdit={isEdit}
              content={post.description}
            />
          )}

          {isOptionOpen && (
            <div
              className="position-absolute fw-semibold shadow-lg px-3 py-2 rounded-3 z-1"
              style={{
                backgroundColor: "white",
                right: "0px",
                top: "0px",
                cursor: "pointer",
              }}>
              <p className="m-0" onClick={editHandler}>
                Edit
              </p>
              <p className="m-0">Delete</p>
            </div>
          )}
        </div>

        <div className="my-4 px-2">
          <p>{post.description}</p>
        </div>
        <div className="d-flex justify-content-between px-3 align-content-center fw-semibold">
          <p className="m-0">
            {user.likedPosts.includes(post._id) ? (
              <span onClick={() => dislikeHandler(post._id)}>
                <FaHeart />
              </span>
            ) : (
              <span onClick={() => likeHandler(post._id)}>
                <FaRegHeart />
              </span>
            )}
            <span className=" px-1 ">{post.likesCount}</span>
          </p>
          <p className="m-0">
            <span>
              <FaRegComment />
            </span>
          </p>
          {user.bookmarks.includes(post._id) ? (
            <span onClick={() => removeFromBookmarkHandler(post._id)}>
              <FaBookmark />
            </span>
          ) : (
            <span onClick={() => addToBookmarkHandler(post._id)}>
              <FaRegBookmark />
            </span>
          )}
          <span>
            <IoMdShare />
          </span>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Post;
