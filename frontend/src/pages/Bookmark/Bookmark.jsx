import React, { useEffect } from "react";
import Header from "./../../components/Header";
import Nav from "../../components/Nav";
import Post from "../../components/Post";
import FollowSection from "../../components/FollowSection";
import { useDispatch, useSelector } from "react-redux";
import { readUser } from "../Profile/userSlice";

const Bookmark = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(readUser());
  }, []);

  return (
    <>
      <Header />
      <div className="mt-1 bg-body-tertiary container px-4 ">
        <div className="row">
          <div className="col-md-3">
            <Nav />
          </div>
          <div className="col-md-6 mb-5">
            <h4 className="text-center my-3 text-secondary">Explore</h4>
            {posts &&
              posts.map((post) => (
                <div key={post._id}>
                  <Post post={post} user={user} />
                </div>
              ))}
          </div>
          <div className="col-md-3">
            <FollowSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
