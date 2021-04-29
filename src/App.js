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

const App = () => {
  const isLoggedIn = useReactiveVar(isloggedInVar);
  const [pop, setPop] = useState(null);
  return (
    <Router>
      <Header setPop={setPop} />
      <Switch>
        <Route exact path="/">
          <SidebarLayout pop={pop} setPop={setPop}>
            <Home />
          </SidebarLayout>
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
            isLoggedIn ? <SidebarLayout pop={pop} setPop={setPop}>
              <Upload />
            </SidebarLayout> : <Redirect to='/' />
          }
        </Route>
        <Route path="/video/:id">
          <SidebarLayout pop={pop} setPop={setPop}>
            <VideoDetail />
          </SidebarLayout>
        </Route>
        <Route path="/user/:id">
          <SidebarLayout pop={pop} setPop={setPop}>
            <UserDetail />
          </SidebarLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
