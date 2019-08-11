import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function basicRouting() {
    return (
        <Router>
            <nav className="navbar-nav nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li> <Link to="/services">Services</Link></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/services" component={Services}></Route>
            </Switch>
        </Router>
    )
}

function Home() {
    return (
        <div><h1>Home</h1></div>
    )
}

function About() {
    return (
        <div><h1>About</h1></div>
    )
}

function Services({ match }) {
    return (
        <Router>
            <div><h1>Services</h1></div>
            <div>
                <ul>
                    <li><Link to={`${match.url}/web`}>Web Development</Link></li>
                    <li><Link to={`${match.url}/graphics`}>Graphics Design</Link></li>
                    <li><Link to={`${match.url}/seo`}>Search Engine Optimisation</Link></li>
                </ul>
            </div>

            <Switch>
                <Route path={`${match.path}/:id`} component={Service}></Route>
                <Route path={`${match.path}`} render={() => <p>Please, click a link below</p>}></Route>
            </Switch>
        </Router>
    )
}

function Service({ match }) {
    return (
        <div><h4>{match.params.id}</h4></div>
    )
}

export default basicRouting
