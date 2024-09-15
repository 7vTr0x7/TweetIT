import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import FollowSection from "../../components/FollowSection";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readUser } from "./userSlice";
import { readPosts } from "../Home/features/userPostSlice";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);

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

  const editHandler = () => {};

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
                    onClick={editHandler}>
                    Edit
                  </button>
                )}
              </div>
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
