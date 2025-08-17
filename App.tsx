
import React from "react";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Education from "../pages/education/Education";

const App: React.FC = () => {
  return (
    <div>
      <h1>Fouraethiopia App</h1>
      <Home />
      <Profile />
      <Education />
    </div>
  );
};

export default App;
