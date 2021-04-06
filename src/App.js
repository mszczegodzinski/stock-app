import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/stock-app/dashboard">
            <div
              className="App"
              style={{ height: "100vh", display: "flex", flexDirection: "column" }}
            >
              <Dashboard />
              <Footer />
            </div>
          </Route>
          <Route exact path="/stock-app">
            <div
              className="App"
              style={{ height: "100vh", display: "flex", flexDirection: "column" }}
            >
              <HomePage />
              <Footer />
            </div>
          </Route>
          <Route path="*">
            <Redirect to="/stock-app" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
