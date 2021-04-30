import { useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isloggedInVar } from '../apollo/variables';
import '../styles/MobileNav.css';
import { Cross } from './Icons';

const MobileNav = ({ setClicked }) => {
  const isLoggedIn = useReactiveVar(isloggedInVar);
  const [term, setTerm] = useState("");
  const history = useHistory();

  const onSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${term}`);
    setClicked(false);
  }

  return (
    <nav className="mobile-nav">
      <div className="cross" onClick={() => setClicked(false)}><Cross /></div>
      <form className="mobile-nav__form" onSubmit={onSubmit}>
        <input placeholder="검색" className="mobile-nav__input" type="text" value={term} onChange={e => setTerm(e.target.value)} />
        <button style={{ visibility: "hidden" }}></button>
      </form>
      <ul className="mobile-ul">
        {
          !isLoggedIn && <>
            <li className="mobile-li" onClick={() => setClicked(false)}><Link to="/signup">Signup</Link></li>
            <li className="mobile-li" onClick={() => setClicked(false)}><Link to='/login'>Login</Link></li>
          </>
        }
      </ul>
    </nav>
  )
}

export default MobileNav;