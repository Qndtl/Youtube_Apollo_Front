import { Link } from 'react-router-dom';
import '../styles/MobileNav.css';
import { Cross } from './Icons';

export default function MobileNav({ setClicked }) {
  return (
    <nav className="mobileNav">
      <div className="cross" onClick={() => setClicked(false)}><Cross /></div>
      <ul className="mobileUl">
        <li className="mobileLi" onClick={() => setClicked(false)}><Link to="/signup">Signup</Link></li>
        <li className="mobileLi" onClick={() => setClicked(false)}><Link to='/login'>Login</Link></li>
      </ul>
    </nav>
  )
}