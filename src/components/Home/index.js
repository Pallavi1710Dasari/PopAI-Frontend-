import './index.css';
import React, { useState } from 'react';
import SideBar from "../SideBar/index.js"
import MainSection from '../MainSection';

function Home() {
    const [isExpanded, setExpand] = useState(false);
    const onChangesidebar = () => {
        setExpand(!isExpanded);
      };

    let sideClassName = isExpanded ? "sidebar-opened" : "sidebar-closed";
    let containerClassName = isExpanded ? "body-container-with-full-sidebar" : "body-container-without-full-sidebar";

    return(
        <div className='home-con'>
            <SideBar className="sideClassName" onChangesidebar={onChangesidebar} isExpanded={isExpanded} />
            <MainSection className="containerClassName"/>
        </div>
    )
}
export default Home;
