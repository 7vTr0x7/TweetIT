import React, { useEffect } from "react";

import { FiSearch } from "react-icons/fi";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useDispatch, useSelector } from "react-redux";
import { readUser } from "../pages/Profile/userSlice";
import { Link, useNavigate } from "react-router-dom";

const FollowSection = () => {
  const users = useFetchUsers();

  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.user.user);

  const filteredUsers = users.filter((user) => user._id !== mainUser._id);

  useEffect(() => {
    dispatch(readUser());
  }, []);

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
                  <small
                    className="fw-semibold text-secondary mt-1"
                    style={{ cursor: "pointer" }}>
                    {mainUser && mainUser?.following?.includes(user._id)
                      ? "unfollow"
                      : "follow"}
                  </small>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowSection;
