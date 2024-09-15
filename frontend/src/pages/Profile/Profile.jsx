import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FollowSection from "../../components/FollowSection";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { useGetPosts } from "../../hooks/useGetPosts";
import { useGetUser } from "../../hooks/useGetUser";
import { follow } from "../../utils/functions/follow";
import { readPosts } from "../Home/features/userPostSlice";
import Post from "./../../components/Post";
import { editUser, readUser } from "./userSlice";
import { unFollow } from "../../utils/functions/unfollow";

const avatars = [
  "https://i.pravatar.cc/300?img=7",
  "https://i.pravatar.cc/300?img=6",
  "https://i.pravatar.cc/300?img=8",
  "https://i.pravatar.cc/300?img=9",
  "https://i.pravatar.cc/300?img=10",
];

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [postsData, setPostsData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const userParam = useParams();
  const { userId } = userParam || {};
  const dispatch = useDispatch();

  let user = useSelector((state) => state.user.user);

  let posts = useSelector((state) => state.posts.posts);

  const fetchedUser = useGetUser(userId);
  const fetchedPosts = useGetPosts(userId);

  useEffect(() => {
    if (userId && fetchedUser && fetchedPosts) {
      setUserData(fetchedUser || {});
      setPostsData(fetchedPosts || []);
    } else {
      setUserData(user || {});
      setPostsData(posts || []);
    }
  }, [fetchedUser, userId, fetchedPosts, user]);

  useEffect(() => {
    if (!userId) {
      dispatch(readUser()).then(() => {
        dispatch(readPosts(user._id));
      });
    }
  }, [dispatch, userId]);

  const editHandler = async () => {
    dispatch(editUser({ userData })).then(() => {
      dispatch(readUser()).then(() => {
        toast.success("Profile Updated");
        setIsEdit(false);
      });
    });
  };

  const followHandler = async () => {
    const followed = await follow({ followUserId: userId, userId: user._id });
    if (followed) {
      dispatch(readUser()).then(() => {
        toast.success("Following");
      });
    }
  };
  const unFollowHandler = async () => {
    const unFollowed = await unFollow({
      followUserId: userId,
      userId: user._id,
    });
    if (unFollowed) {
      dispatch(readUser()).then(() => {
        toast.success("unFollowed");
      });
    }
  };

  return (
    <>
      <Header />
      <div className="mt-1 bg-body-tertiary container px-4 ">
        <div className="row">
          <div className="col-md-3">
            <Nav />
          </div>
          <div className="col-md-6">
            {!userData ? (
              <p className="my-3 fw-semibold text-center">Loading ...</p>
            ) : (
              <div
                className="position-relative my-3 p-3 rounded-3"
                style={{ backgroundColor: "white" }}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <img
                      src={userData.avatarUrl}
                      alt={userData.userName}
                      style={{
                        height: "70px",
                        width: "70px",
                        borderRadius: "100%",
                      }}
                    />
                    <div>
                      <p className="fs-5 fw-bold px-3 m-0">
                        {userData.userName}
                      </p>
                      <p className="fs-6 px-3 m-0">{userData.userAt}</p>
                      <p className="fs-6 px-3 m-0">{userData.bio}</p>
                      <hr />

                      <div className="d-flex justify-content-between">
                        <p className="fw-semibold m-0">
                          {userData?.posts?.length} Post
                          {userData?.posts?.length > 1 ? "s" : ""}
                        </p>
                        <p className="fw-semibold m-0">
                          {userData?.followers?.length} Follower
                          {userData?.followers?.length > 1 ? "s" : ""}
                        </p>

                        <p className="fw-semibold m-0">
                          {userData?.following?.length} following
                        </p>
                      </div>
                    </div>
                  </div>

                  {userId ? (
                    <>
                      {user && user?.following?.includes(userId) ? (
                        <button
                          className="btn btn-light h-25 fw-semibold"
                          onClick={unFollowHandler}>
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="btn btn-light h-25 fw-semibold"
                          onClick={followHandler}>
                          Follow
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      className="btn btn-light h-25 fw-semibold"
                      onClick={() => setIsEdit((prev) => !prev)}>
                      Edit
                    </button>
                  )}
                </div>
                {isEdit && (
                  <div className="d-flex justify-content-center">
                    <div
                      className="position-absolute  p-3 shadow-lg rounded-3 "
                      style={{
                        width: "300px",
                        backgroundColor: "white",
                        top: "0px",
                      }}>
                      <div onClick={() => setIsAvatarOpen((prev) => !prev)}>
                        <img
                          src={userData.avatarUrl}
                          alt={userData.userName}
                          style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "100%",
                          }}
                        />
                        {isAvatarOpen && (
                          <div
                            className="p-2 my-2 shadow-lg d-flex flex-wrap rounded-3"
                            style={{ backgroundColor: "white" }}>
                            {avatars.map((img) => (
                              <div
                                className="p-1"
                                key={img}
                                onClick={() =>
                                  setUserData((prev) => ({
                                    ...prev,
                                    avatarUrl: img,
                                  }))
                                }>
                                <img
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "100%",
                                  }}
                                  src={img}
                                  alt="avatar"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <input
                          className="form-control fw-semibold"
                          value={userData.userName}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              userName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="mt-3">
                        <textarea
                          className="form-control fw-semibold"
                          value={userData.bio}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          rows={3}></textarea>
                      </div>
                      <div className="mb-2 mt-3 d-flex justify-content-between ">
                        <button
                          className="btn btn-light fw-semibold"
                          onClick={editHandler}>
                          Update
                        </button>
                        <button
                          className="btn btn-light fw-semibold"
                          onClick={() => setIsEdit(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="my-3">
              {postsData.length === 0 && (
                <p className="fw-semibold text-center">Loading...</p>
              )}
              {postsData &&
                postsData.map((post) => (
                  <div key={post._id}>
                    <Post post={post} user={user} />
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-3">
            <FollowSection />
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Profile;
