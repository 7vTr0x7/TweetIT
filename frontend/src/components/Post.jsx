import React, { useState } from "react";

import { HiDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

import { FaRegHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";

const Post = ({ post, user }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const date = new Date(post.createdAt);

  const likePostHandler = async () => {
    trycatch;
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
          {isOptionOpen && (
            <div
              className="position-absolute fw-semibold shadow-lg px-3 py-2 rounded-3 z-1"
              style={{
                backgroundColor: "white",
                right: "0px",
                top: "0px",
                cursor: "pointer",
              }}>
              <p className="m-0">Edit</p>
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
              <span>
                <FaRegHeart style={{ color: "red" }} />
              </span>
            ) : (
              <span>
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
            <span>
              <FaRegBookmark style={{ color: "black" }} />
            </span>
          ) : (
            <span>
              <FaRegBookmark />
            </span>
          )}
          <span>
            <IoMdShare />
          </span>
        </div>
      </div>
    </>
  );
};

export default Post;
