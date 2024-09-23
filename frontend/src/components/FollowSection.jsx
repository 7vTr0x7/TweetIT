import React, { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useDispatch, useSelector } from "react-redux";
import { followUser, readUser, unfollowUser } from "../pages/Profile/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { follow } from "../utils/functions/follow";
import {
  followed,
  readOtherUser,
  unfollowed,
} from "../pages/Profile/features/otherUserSlice";
import { unFollow } from "../utils/functions/unfollow";

const FollowSection = () => {
  const [text, setText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const users = useFetchUsers();

  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const filtered = users.filter((user) => user._id !== mainUser._id);
    setFilteredUsers(filtered);
  }, [users, mainUser._id]);

  useEffect(() => {
    dispatch(readUser());
  }, []);

  useEffect(() => {
    if (text !== "") {
      const filtered = filteredUsers.filter(
        (user) => user.userName.includes(text) || user.userAt.includes(text)
      );
      setFilteredUsers(filtered);
    } else {
      const filtered = users.filter((user) => user._id !== mainUser._id);
      setFilteredUsers(filtered);
    }
  }, [text]);

  const followHandler = async (user, userId) => {
    await follow({ followUserId: user?._id, userId });
    dispatch(readOtherUser(user?._id));

    dispatch(followed(user?._id));
    dispatch(followUser({ followUserId: user?._id, userId }));

    toast.success("Following");
  };

  const unFollowHandler = async (user, userId) => {
    await unFollow({ followUserId: user?._id, userId });
    dispatch(readOtherUser(user?._id));

    dispatch(unfollowed(user?._id));

    dispatch(unfollowUser({ followUserId: user?._id, userId }));

    toast.success("unfollowed");
  };

  return (
    <>
      <div className="p-3">
        <div
          className="d-flex px-2 py-1 rounded-2"
          style={{ backgroundColor: "white" }}>
          <FiSearch style={{ fontSize: "25px", marginTop: "5px" }} />
          <input
            className="form-control mx-1 border-0 bg-transparent"
            placeholder="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <p className="fw-semibold text-center mb-0 mt-3">
          <span>Who to follow?</span>
        </p>
        <div className="card mt-1 mb-3 ">
          <div className="card-body">
            {filteredUsers.length === 0 && (
              <p className="text-center fw-semibold my-3 text-secondary">
                Loading...
              </p>
            )}
            {filteredUsers &&
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="d-flex justify-content-between my-3 align-content-center">
                  <Link to={`/user-profile/${user._id}`} state={{ user }}>
                    <img
                      src={user.avatarUrl}
                      alt={user.userName}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "100%",
                      }}
                    />
                  </Link>
                  <span className="px-2 fw-semibold mt-1">
                    {user.userName.slice(0, 7)}...
                  </span>
                  {mainUser && mainUser?.following?.includes(user._id) ? (
                    <small
                      onClick={() => unFollowHandler(user, mainUser?._id)}
                      className="fw-semibold text-secondary mt-1"
                      style={{ cursor: "pointer" }}>
                      unfollow
                    </small>
                  ) : (
                    <small
                      onClick={() => followHandler(user, mainUser?._id)}
                      className="fw-semibold text-secondary mt-1"
                      style={{ cursor: "pointer" }}>
                      follow
                    </small>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowSection;
