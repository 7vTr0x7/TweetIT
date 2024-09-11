import React from "react";

const Post = ({ post }) => {
  return (
    <>
      <div className="mt-3 p-4 rounded-3" style={{ backgroundColor: "white " }}>
        <div>
          <img
            src={post.user.avatarUrl}
            style={{ height: "50px", width: "50px", borderRadius: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default Post;
