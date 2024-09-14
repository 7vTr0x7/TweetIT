import React from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import FollowSection from "../../components/FollowSection";

const Explore = () => {
  return (
    <>
      <Header />
      <div className="my-1 bg-body-tertiary container px-4">
        <div className="row">
          <div className="col-md-3">
            <Nav />
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-3">
            <FollowSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
