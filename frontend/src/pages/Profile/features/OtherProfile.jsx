import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { editUser, readUser } from "../userSlice";
import { readPosts } from "../../Home/features/userPostSlice";
import Header from "../../../components/Header";
import Nav from "../../../components/Nav";

const avatars = [
  "https://i.pravatar.cc/300?img=7",
  "https://i.pravatar.cc/300?img=6",
  "https://i.pravatar.cc/300?img=8",
  "https://i.pravatar.cc/300?img=9",
  "https://i.pravatar.cc/300?img=10",
];

const OtherProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const dispatch = useDispatch();

  let user = useSelector((state) => state.user.user);

  let posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(readUser()).then(() => dispatch(readPosts(user._id)));
  }, [dispatch, user]);

  const editHandler = async () => {
    dispatch(editUser({ userData: user })).then(() => {
      dispatch(readUser()).then(() => {
        toast.success("Profile Updated");
        setIsEdit(false);
      });
    });
  };

  // const followHandler = async () => {
  //   const followed = await follow({ followUserId: userId, userId: user._id });
  //   if (followed) {
  //     dispatch(readUser()).then(() => {
  //       toast.success("Following");
  //     });
  //   }
  // };
  // const unFollowHandler = async () => {
  //   const unFollowed = await unFollow({
  //     followUserId: userId,
  //     userId: user._id,
  //   });
  //   if (unFollowed) {
  //     dispatch(readUser()).then(() => {
  //       toast.success("unFollowed");
  //     });
  //   }
  // };

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
                  </div>

                  {/* "      {userId ? (
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
                  )}" */}
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
                          src={user.avatarUrl}
                          alt={user.userName}
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
                                  setuser((prev) => ({
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
                          value={user.userName}
                          onChange={(e) =>
                            setuser((prev) => ({
                              ...prev,
                              userName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="mt-3">
                        <textarea
                          className="form-control fw-semibold"
                          value={user.bio}
                          onChange={(e) =>
                            setuser((prev) => ({
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
              {posts.length === 0 && (
                <p className="fw-semibold text-center">Loading...</p>
              )}
              {posts &&
                posts.map((post) => (
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

export default OtherProfile;
