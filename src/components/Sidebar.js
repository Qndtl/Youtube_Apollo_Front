import { useHistory } from "react-router";
import "../styles/Sidebar.css";
import { Compass, FollowIcon, HomeIcon } from "./Icons";

const Sidebar = ({ clicked, setClicked }) => {
  const history = useHistory();
  return (
    <div className="sidebar-container">
      <div className={clicked === 'home' ? "sidebar-icon clicked" : "sidebar-icon"} onClick={() => { setClicked("home"); history.push('/') }}>
        <HomeIcon />
        <span>홈</span>
      </div>
      <div className={clicked === 'explore' ? "sidebar-icon clicked" : "sidebar-icon"} onClick={() => setClicked("explore")}>
        <Compass />
        <span>탐색</span>
      </div>
      <div className={clicked === 'subscribe' ? "sidebar-icon clicked" : "sidebar-icon"} onClick={() => setClicked("subscribe")}>
        <FollowIcon />
        <span>구독</span>
      </div>
    </div>
  )
}

export default Sidebar;