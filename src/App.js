import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import { useReactiveVar } from '@apollo/client';
import { isloggedInVar } from './apollo/variables';
import Upload from './pages/Upload';
import SidebarLayout from './components/SidebarLayout';
import { useState } from 'react';
import VideoDetail from './pages/VideoDetail';
import UserDetail from './pages/UserDetail';
import EditVideo from './pages/EditVideo';
import SearchResult from './pages/SearchResult';

const App = () => {
  const isLoggedIn = useReactiveVar(isloggedInVar);
  const [pop, setPop] = useState(null);
  const [clicked, setClicked] = useState("home");
  return (
    <Router>
      <Header setPop={setPop} />
      <SidebarLayout pop={pop} setPop={setPop} clicked={clicked} setClicked={setClicked}>
        <Switch>
          <Route exact path="/">
            <Home setClicked={setClicked} />
          </Route>
          <Route path="/signup">
            {
              isLoggedIn ? <Redirect to='/' /> : <Signup setClicked={setClicked} />
            }
          </Route>
          <Route path="/login">
            {
              isLoggedIn ? <Redirect to='/' /> : <Login setClicked={setClicked} />
            }
          </Route>
          <Route path="/upload">
            {
              isLoggedIn ? <Upload /> : <Redirect to='/' />
            }
          </Route>
          <Route path="/video/:id">
            <VideoDetail setClicked={setClicked} />
          </Route>
          <Route path="/user/:id">
            <UserDetail setClicked={setClicked} />
          </Route>
          <Route path="/edit/video/:id">
            <EditVideo />
          </Route>
          <Route path="/search">
            <SearchResult setClicked={setClicked} />
          </Route>
        </Switch>
      </SidebarLayout>
    </Router>
  );
}

export default App;
