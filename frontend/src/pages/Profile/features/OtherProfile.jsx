import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Nav from "../../../components/Nav";
import { useGetUser } from "../../../hooks/useGetUser";
import Post from "./../../../components/Post";
import FollowSection from "../../../components/FollowSection";
import { useDispatch, useSelector } from "react-redux";
import { readUser } from "../userSlice";
import { unFollow } from "./../../../utils/functions/unfollow";
import { follow } from "./../../../utils/functions/follow";
import { useGetPosts } from "./../../../hooks/useGetPosts";
import { readUserById } from "../../../utils/functions/readUserById";

const OtherProfile = () => {
  const searchUserId = useParams();
  const { id } = searchUserId;

  const user = useGetUser(id);

  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.user.user);

  const userId = mainUser._id;

  const posts = useGetPosts(user._id);

  const followHandler = async () => {
    const followed = await follow({ followUserId: user._id, userId });
    if (followed) {
      readUserById(user._id).then(() => {
        toast.success("Following");
      });
    }
  };
  const unFollowHandler = async () => {
    const unFollowed = await unFollow({
      followUserId: user._id,
      userId,
    });
    if (unFollowed) {
      dispatch(readUser()).then(() => {
        readUserById(user._id).then(() => {
          toast.success("unFollowed");
        });
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
            {!user ? (
              <p className="my-3 fw-semibold text-center">Loading ...</p>
            ) : (
              <div
                className="position-relative my-3 p-3 rounded-3"
                style={{ backgroundColor: "white" }}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <img
                      src={user.avatarUrl}
                      alt={user.userName}
                      style={{
                        height: "70px",
                        width: "70px",
                        borderRadius: "100%",
                      }}
                    />

                    <div>
                      <p className="fs-5 fw-bold px-3 m-0">{user.userName}</p>
                      <p className="fs-6 px-3 m-0">{user.userAt}</p>
                      <p className="fs-6 px-3 m-0">{user.bio}</p>
                      <hr />

                      <div className="d-flex justify-content-between">
                        <p className="fw-semibold m-0">
                          {user?.posts?.length} Post
                          {user?.posts?.length > 1 ? "s" : ""}
                        </p>
                        <p className="fw-semibold m-0">
                          {user?.followers?.length} Follower
                          {user?.followers?.length > 1 ? "s" : ""}
                        </p>

                        <p className="fw-semibold m-0">
                          {user?.following?.length} following
                        </p>
                      </div>
                    </div>

                    {user && (
                      <>
                        {mainUser && mainUser?.following?.includes(user._id) ? (
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
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="my-3">
              {posts.length === 0 && (
                <p className="fw-semibold text-center">Loading...</p>
              )}
              {posts &&
                posts.length > 0 &&
                posts.map((post) => (
                  <div key={post._id}>
                    <Post post={post} user={mainUser} />
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

export default OtherProfile;
