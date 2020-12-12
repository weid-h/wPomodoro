import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHydration } from "../../Hooks/useHydration";
import Layout from "../Layout";

export const IndexPage = () => {
  const { loading } = useHydration();
  return (
    <>
      <Router>
        {!loading && (
          <Switch>
            <React.Fragment>
              <Route exact path="/">
                <Layout />
              </Route>
            </React.Fragment>
          </Switch>
        )}
      </Router>
    </>
  );
};

export default IndexPage;
