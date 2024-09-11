import React from "react";
import Header from "../../components/Header";
import Nav from "../../components/Nav";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="my-4 bg-body-tertiary container px-4">
        <div className="row">
          <div className="col-md-3 ">
            <Nav />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
