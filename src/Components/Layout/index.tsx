import { Container } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Timer from '../Pages/Timer'
import Setup from '../Pages/Setup'

const PageContainer = styled(Container)({
    width: '100%',
    height: '100%',
})

const Layout = (props: any) => {

    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <React.Fragment>
                        <PageContainer>
                            <Route exact path="/">
                                <Setup />
                            </Route>
                            <Route path="/timer">
                                <Timer />
                            </Route>
                        </PageContainer>
                    </React.Fragment>
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Layout
