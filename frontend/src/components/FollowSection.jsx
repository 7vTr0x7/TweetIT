import React from "react";

import { FiSearch } from "react-icons/fi";

const FollowSection = () => {
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
          <div className="card-body"></div>
        </div>
      </div>
    </>
  );
};

export default FollowSection;
