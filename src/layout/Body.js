import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './HomePage'
import MoviesPage from '../features/movies/MoviesPage'
import ShowsPage from '../features/tv/ShowsPage'
import PeoplePage from './PeoplePage'
import LoginPage from './LoginPage'
import DetailPage from './DetailPage'

export default function Body() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/all" component={MoviesPage} />
                <Route exact path="/all/:id" component={DetailPage} />
                <Route exact path="/all-shows" component={ShowsPage} />
                <Route exact path="/all-shows/:id" component={DetailPage} />
                <Route exact path="/people" component={PeoplePage} />
                <Route exact path="/login" component={LoginPage} />
                {/* <PrivateRoute exact path="/test" privilege={["super"]} component={TestPage} /> */}
            </Switch>
        </div>
    )
}
