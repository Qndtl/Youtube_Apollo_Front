import { useReactiveVar } from "@apollo/client";
import { useHistory } from "react-router";
import { isloggedInVar, logUserOut } from "../apollo/variables";
import "../styles/MobileFootBar.css";
import { Compass, FollowIcon, HomeIcon, LoginIcon, LogoutIcon, UploadIcon } from "./Icons";

const MobileFootBar = ({ clicked, setClicked }) => {
  const isLoggedIn = useReactiveVar(isloggedInVar);
  const history = useHistory();
  return (
    <div className="mobile-foot-bar__container">
      <div className={clicked === 'home' ? "foot-bar__home isclicked" : "foot-bar__home"} onClick={() => { setClicked("home"); history.push('/') }}>
        <HomeIcon />
        <span>홈</span>
      </div>
      <div className={clicked === 'explore' ? "foot-bar__explore isclicked" : "foot-bar__explore"} onClick={() => setClicked("explore")}>
        <Compass />
        <span>탐색</span>
      </div>
      <div className="foot-bar__upload" onClick={() => {
        if (isLoggedIn) {
          history.push('/upload');
        } else {
          history.push('/login');
        }
      }}>
        <UploadIcon size="36" />
      </div>
      <div className={clicked === 'subscribe' ? "foot-bar__follow isclicked" : "foot-bar__follow"} onClick={() => setClicked("subscribe")}>
        <FollowIcon />
        <span>구독</span>
      </div>
      <div className="foot-bar__log">
        {
          isLoggedIn ? <div className="log-logout" onClick={() => logUserOut()}>
            <LogoutIcon />
            <span>로그아웃</span>
          </div> : <div className="log-login" onClick={() => history.push('/login')}>
            <LoginIcon />
            <span>로그인</span>
          </div>
        }
      </div>
    </div>
  )
}

export default MobileFootBar;