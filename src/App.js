import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="App" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Dashboard />
      <Footer />
    </div>
  );
};

export default App;
