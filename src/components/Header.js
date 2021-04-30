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
  const [clicked, setClicked] = useState(false);
  const { data } = useUser();
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="thin-hamburger" onClick={() => setPop(true)}>
            <ThinHamburger size="19" />
          </div>
          <Link to='/'><div className="logo"><Youtube size="30" /><h1>Youtube</h1></div></Link>
          <SearchInput />
          <ul className="navUl">
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
                <Link to='/signup'><li className="navLi"><Button text="Join" color="skyblue" /></li></Link>
                <Link to='/login'><li className="navLi"><Button text="Login" color="green" /></li></Link>
              </>
            }
          </ul>
        </nav>
        <div className="hamburger" onClick={() => setClicked(true)}>
          <Hamburger />
        </div>
        {
          clicked ? <MobileNav setClicked={setClicked} /> : null
        }
      </header>
    </>
  )
}

export default Header;