import React, { Component } from "react";
import Base from './Base';
import { useHistory } from "react-router-dom";

const Home=(props,selectedTab)=>{
    const history = useHistory();
    console.log("HomeHistory",selectedTab);
    
    

    return(
        <div className="antialiased text-gray-900 h-screen overflow-auto bg-white">
                <div className="w-full flex flex-row justify-end p-1">
                <button className="m-1 bg-gray-200 p-1 border border-gray-400 rounded-sm text-xs items-end hover:bg-blue-100" title="Objects" onClick={()=>{
                            history.push('/setup/customObjectPage')
                        }}>Objects</button>
                    <button className="m-1 bg-gray-200 p-1 border border-gray-400 rounded-sm text-xs items-end hover:bg-blue-100" title="Create New" onClick={()=>{
                            history.push('/createObject')
                        }}>Create New Object</button>
                          
                </div>
            </div>
    )
}

export default Home;