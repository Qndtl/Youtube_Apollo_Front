import { useState } from "react";
import PopSidebar from "./PopSidebar";
import Sidebar from "./Sidebar";
import "../styles/SidebarLayout.css";

const SidebarLayout = ({ children, pop, setPop }) => {
  const [clicked, setClicked] = useState("home");
  return (
    <>
      <Sidebar clicked={clicked} setClicked={setClicked} />
      {
        pop ? <PopSidebar pop={pop} setPop={setPop} clicked={clicked} setClicked={setClicked} /> : null
      }
      <div className="children">
        {children}
      </div>
    </>
  )
}

export default SidebarLayout;