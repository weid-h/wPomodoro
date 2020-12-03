import { Howl } from "howler";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../Layout";

export const IndexPage = () => {
  return (
    <>
      <Router>
        <Switch>
          <React.Fragment>
            <Route exact path="/">
              <Layout />
            </Route>
          </React.Fragment>
        </Switch>
      </Router>
    </>
  );
};

export default IndexPage;
