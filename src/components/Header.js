import { useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isloggedInVar, logUserOut } from '../apollo/variables';
import useUser from '../hooks/useUser';
import '../styles/header.css';
import Button from './Button';
import { Hamburger, ThinHamburger, Youtube } from './Icons';
import MobileNav from './MobileNav';
import SearchInput from './SearchInput';

const Header = ({ setPop }) => {
  const isLoggedIn = useReactiveVar(isloggedInVar);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const { data } = useUser();
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="thin-hamburger" onClick={() => setPop(true)}>
            <ThinHamburger size="19" />
          </div>
          <Link to={'/'}><div className="logo"><Youtube size="30" /><h1>Duktube</h1></div></Link>
          <SearchInput />
          <ul className="nav-ul">
            {
              isLoggedIn ? <>
                <Link to={`/user/${data?.me?.id}`}>
                  <img src={data?.me?.avatar} alt={data?.me?.avatar} className="header-avatar" />
                </Link>
                <Link to={`/user/${data?.me?.id}`}>
                  <span className="header-username">{data?.me?.username}</span>
                </Link>
                <span className="header-upload">
                  <Link to="/upload">
                    <Button text="Upload" color="green" />
                  </Link>
                </span>
                <Button text="Logout" color="red" onClick={() => logUserOut()} />
              </> : <>
                <Link to='/signup'><li className="nav-li"><Button text="Join" color="skyblue" /></li></Link>
                <Link to='/login'><li className="nav-li"><Button text="Login" color="green" /></li></Link>
              </>
            }
          </ul>
        </nav>
        <div className="hamburger" onClick={() => setHamburgerClicked(true)}>
          <Hamburger />
        </div>
        {
          hamburgerClicked ? <MobileNav setHamburgerClicked={setHamburgerClicked} /> : null
        }
      </header>
    </>
  )
}

export default Header;