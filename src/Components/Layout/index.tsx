import {Container} from '@material-ui/core'
import {styled} from '@material-ui/styles'
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Timer from '../Pages/Timer'
import Setup from '../Pages/Setup'
import {Howl} from "howler";
import {Helmet} from "react-helmet";

const PageContainer = styled(Container)({
    width: '100%',
    height: '100%',
})

const Layout = () => {
    const howl = new Howl({"src": require("../../Chime.wav")})
    return (
        <React.Fragment>
            <Helmet>
                <title>wPomodoro!</title>
            </Helmet>
            <Router>
                <Switch>
                    <React.Fragment>
                        <PageContainer>
                            <Route exact path="/">
                                <Setup/>
                            </Route>
                            <Route path="/timer">
                                <Timer howl={howl}/>
                            </Route>
                        </PageContainer>
                    </React.Fragment>
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Layout
