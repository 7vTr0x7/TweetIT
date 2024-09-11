import React from "react";

const FollowSection = () => {
  return (
    <>
      <div className="p-3">
        <input className="form-control" placeholder="Search" />

        <div className="card my-3 ">
          <p className="card-header fw-semibold text-center">
            <span>Who to follow?</span>
          </p>
          <div className="card-body"></div>
        </div>
      </div>
    </>
  );
};

export default FollowSection;
