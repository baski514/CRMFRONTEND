import React, { useEffect,useState} from "react";
import {API_CONNECT_DB, API_GET_OBJECTS} from '../backend'
import {httpsGET} from '../backend_api/CRMAPI'
import Routes from "../Routes";
import history from "../history"

// import Navbar from "./navbar/Navbar";

const Base = (props) => {
   
    const [objects,setObjects] = useState([]);
    const [selectedTab,setSelectedTab] = useState("");

    useEffect(() => {
        // connectDB();
        loadObjects();
    },[])

    const loadObjects=()=>{
        httpsGET(null,API_GET_OBJECTS).then((response)=>{
            console.log("API RESP",response);
            setObjects(response.msg)
        }).catch((error)=>{
            console.log("Error to fecth",error);
        })
    }

    // const connectDB=()=>{
    //     httpsGET(null,`${API_CONNECT_DB}bhaskarDb`).then((response)=>{
    //         console.log("API RESP",response);
    //         setObjects(response.msg)
    //     }).catch((error)=>{
    //         console.log("Error to fecth",error);
    //     })
    // }
    

    return (
            <div className="antialiased  bg-blue-300">
                <div className="h-20 w-full bg-white flex flex-row">
                    <img src="https://utilitarianlabs.com/static/img/logo.png" className="p-6"/>
                </div>
               
                <div className="m-3 rounded-md bg-white">
                    <div className="w-full bg-blue-100 border-b-2 border-gray-600 h-9 rounded-t-md flex flex-row items-center">
                        {objects && objects.length>0 && objects.map((obj)=>{
                            return(
                                <a className="cursor-pointer px-2 hover:text-blue-400 mx-1 rounded-t-md" href={`/record/${obj}`}>{obj}</a>
                            )
                        })}
                    </div>
                    <Routes/>
                </div>
            </div>
    );
 
}

export default Base;