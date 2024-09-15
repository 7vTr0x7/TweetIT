import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import FollowSection from "../../components/FollowSection";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readUser } from "./userSlice";
import { editPost, readPosts } from "../Home/features/userPostSlice";
import { fetchAllPosts } from "../Explore/postsSlice";
import toast from "react-hot-toast";

const avatars = [
  "https://i.pravatar.cc/300?img=7",
  "https://i.pravatar.cc/300?img=8",
  "https://i.pravatar.cc/300?img=9",
  "https://i.pravatar.cc/300?img=10",
  "https://i.pravatar.cc/300?img=11",
];

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const userParam = useParams();
  const { userId } = userParam;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const posts = useSelector((state) => state.posts.posts);

  const fetchData = async () => {
    try {
      if (userId) {
        const userRes = await fetch(
          `https://tweet-it-backend.vercel.app/api/users/user/id/${userId}`
        );

        if (!userRes.ok) {
          console.log("Failed to get user");
        }

        const userData = await userRes.json();
        setUserData(userData);
        setUserName(userData.userName);
        setBio(userData.bio);
        setAvatar(userData.avatarUrl);

        const postRes = await fetch(
          `https://tweet-it-backend.vercel.app/api/users/user/posts/${userId}`
        );

        if (!postRes.ok) {
          console.log("Failed to get posts");
        }

        const postData = await postRes.json();
        setUserPosts(postData);
      } else {
        setUserData(user);
        setUserName(user.userName);
        setBio(user.bio);
        setAvatar(user.avatarUrl);

        setUserPosts(posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(readUser()).then(() => {
      dispatch(readPosts(user._id));
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const editHandler = async (postId) => {
    dispatch(editPost({ postId, data: { avatarUrl: avatar } })).then(() => {
      dispatch(readUser()).then(() => {
        toast.success("Profile Updated");
        setIsEdit(false);
      });
    });
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
                    <p className="fs-5 fw-bold px-3 m-0">{userData.userName}</p>
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
                    {user.following.includes(userId) ? (
                      <button className="btn btn-light h-25 fw-semibold">
                        Unfollow
                      </button>
                    ) : (
                      <button className="btn btn-light h-25 fw-semibold">
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
                        src={avatar}
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
                              onClick={() => setAvatar(img)}>
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
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <textarea
                        className="form-control fw-semibold"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
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
          </div>
          <div className="col-md-3">
            <FollowSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
