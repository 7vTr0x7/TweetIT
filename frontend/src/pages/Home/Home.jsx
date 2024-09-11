import React from "react";
import Header from "../../components/Header";
import Nav from "../../components/Nav";

const Home = () => {
  return (
    <>
      <Header />
      <main className="my-4 bg-bg-body-tertiary container">
        <div className="row">
          <div className="col-md-3 ">
            <Nav />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
