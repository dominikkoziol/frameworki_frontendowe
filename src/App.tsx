import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './assets/logo.png';
import Home from './pages/home';
import './App.scss';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <div className="logo-icon-container">
            <div className="image-container">
              <img src={logo} alt="logo" />
            </div>
            <div className="icon-container">
              <HomeIcon />
              <span>Home</span>
            </div>
          </div>
          <div className="input-container">
            <input type="text" placeholder="Search Legalcluster" />
            <SearchIcon className="search" />
          </div>

          <div className="icons-container">
            <HomeIcon />
            <div>
              <NotificationsIcon />
            </div>
            <div>
              <QuestionAnswerIcon />
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
