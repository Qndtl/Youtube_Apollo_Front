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
  return (
    <Router>
      <Header setPop={setPop} />
      <SidebarLayout pop={pop} setPop={setPop}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            {
              isLoggedIn ? <Redirect to='/' /> : <Signup />
            }
          </Route>
          <Route path="/login">
            {
              isLoggedIn ? <Redirect to='/' /> : <Login />
            }
          </Route>
          <Route path="/upload">
            {
              isLoggedIn ? <Upload /> : <Redirect to='/' />
            }
          </Route>
          <Route path="/video/:id">
            <VideoDetail />
          </Route>
          <Route path="/user/:id">
            <UserDetail />
          </Route>
          <Route path="/edit/video/:id">
            <EditVideo />
          </Route>
          <Route path="/search">
            <SearchResult />
          </Route>
        </Switch>
      </SidebarLayout>
    </Router>
  );
}

export default App;
