import { Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React from "react";
import { Helmet } from "react-helmet";
import Timer from "../Features/Timer";
import ToDo from "../Features/ToDo";

const PageContainer = styled(Container)({
  width: "100%",
  height: "100%",
});

const Layout: React.FC = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>wPomodoro!</title>
      </Helmet>
      <PageContainer>
        <Timer />
      </PageContainer>
      <hr/>
      <PageContainer>
        <ToDo />
      </PageContainer>
    </React.Fragment>
  );
};

export default Layout;
