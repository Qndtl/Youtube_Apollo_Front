import { Link } from "react-router-dom";
import "../styles/PopSidebar.css";
import { Compass, FollowIcon, HomeIcon, ThinHamburger, Youtube } from "./Icons";

const PopSidebar = ({ pop, setPop, clicked, setClicked }) => {
  return (
    <>
      <div className="black-background" onClick={() => setPop(false)}></div>
      <div className="pop-container">
        <div className="pop-header">
          <div className="pop-thin__hamburger" onClick={() => setPop(false)}>
            <ThinHamburger size="19" />
          </div>
          <Link to='/'>
            <div className="pop-logo">
              <Youtube size="30" />
              <h2 onClick={() => setPop(false)}>Youtube</h2>
            </div>
          </Link>
        </div>
        <div className="pop-body">
          <Link to='/'>
            <div className={clicked === "home" ? "pop-body__row clicked" : "pop-body__row"} onClick={() => setClicked("home")}>
              <HomeIcon />
              <span>홈</span>
            </div>
          </Link>
          <div className={clicked === "explore" ? "pop-body__row clicked" : "pop-body__row"} onClick={() => setClicked("explore")}>
            <Compass />
            <span>탐색</span>
          </div>
          <div className={clicked === "subscribe" ? "pop-body__row clicked" : "pop-body__row"} onClick={() => setClicked("subscribe")}>
            <FollowIcon />
            <span>구독</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopSidebar;