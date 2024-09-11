import React from "react";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import FollowSection from "../../components/FollowSection";
import Main from "./features/Main";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="my-4 bg-body-tertiary container px-4">
        <div className="row">
          <div className="col-md-3 ">
            <Nav />
          </div>
          <div className="col-md-6">
            <Main />
          </div>
          <div className="col-md-3">
            <FollowSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
