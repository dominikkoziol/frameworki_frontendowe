import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useState, useEffect } from 'react';
import useDropdown from "react-dropdown-hook";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './App.scss';
import logo from './assets/images/logo.png';
import Home from './pages/home/home';
import DropdownMenuComponent from './components/dropdown-menu/dropdownMenu.component';
import PageNotFound from "./pages/404/404";
import User from "./models/user";

import { getPhotoById } from "./api/photos";
import { getUser } from "./api/users";
import Photo from "./models/photo";

import LeftSideMenuComponent from './components/left-side-menu/left-side-menu.component';
import Entities from "./pages/entities/entities";
import Profile from "./pages/profile/profile";
import Workspace from "./pages/workspace/workspace";


function App() {
  const [wrapperRef, dropdownOpen, toggleDropdown] = useDropdown();

  const menuHandler = () => toggleDropdown();
  const userId: number = 1;

  const [user = new User(), setUser] = useState<User>();
  useEffect(() => {
    getUser(userId).then(response => { setUser(response.data); });
  }, [user.id]);

  const [photo = new Photo(), setPhoto] = useState<Photo>();
  useEffect(() => {
    getPhotoById(userId).then(response => { setPhoto(response.data) });
  }, [photo.id]);

  return (
    <div className="App">
      <Router>

        <nav>
          <div className="logo-icon-container">
            <div className="image-container">
              <img src={logo} alt="logo" />
            </div>
            <div className="menu" ref={wrapperRef}>
              <div className="icon-container" onClick={menuHandler}>
                <HomeIcon />
                <span>Home</span>
              </div>
              <KeyboardArrowDownIcon onClick={menuHandler} />
              {dropdownOpen && <DropdownMenuComponent />}
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
              <div className="notifications"><span>3</span></div>
            </div>
            <div>
              <QuestionAnswerIcon />
              <div className="notifications"><span>2</span></div>
            </div>
          </div>
        </nav>
        <div className="main-app-content">
          <LeftSideMenuComponent user={user} photo={photo} />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/404">
              <PageNotFound />
            </Route>
            <Route path="/entities">
              <Entities />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/workspace/:id">
              <Workspace />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
