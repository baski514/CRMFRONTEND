import React, { useEffect,useState} from "react";
import {API_GET_OBJECTS} from '../../backend'
import {httpsGET} from '../../backend_api/CRMAPI'
// import Navbar from "./navbar/Navbar";

const Objects = (props) => {
    const { children, history, activeTabName, pathList } = props;
    const [objects,setObjects] = useState([]);
    
    
    useEffect(() => {
        loadObjects();
    },[])

    const loadObjects=()=>{
        httpsGET(localStorage.getItem('access_token'),API_GET_OBJECTS).then((response)=>{
            console.log("API RESP",response);
            setObjects(response.msg)
        }).catch((error)=>{
            console.log("Error to fecth",error);
        })
    }

    return (
        <div className="antialiased text-gray-900 h-screen overflow-auto mx-3">
            <div className="w-full flex flex-col border-t-4 shadow-md border-gray-500 pb-10 rounded-sm mt-5">
                    <div className="w-full  flex flex-col  items-center justify-between border-b">
                       
                        <div className="w-full flex flex-row justify-center items-center pt-1 pb-1">
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                    history.push('/createObject')
                                }}
                                title="New Custom Object">New Custom Object</button>
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                props.history.goBack()
                            }}
                            title="Back">Back</button>
                        </div>

                        <div className="w-full flex flex-col justify-center  border border-gray-300">
                            <div className="flex flex-row bg-gray-100">
                                <h1 className="border-r border-gray-300 px-7 text-xs font-bold py-1">Action</h1>
                                <h1 className="border-r border-gray-300 px-32 text-xs font-bold py-1">Label</h1>
                            </div>
                            {objects && objects.length>0 && objects.map((obj)=>{
                                return(
                                    <div className="flex flex-row border-b border-gray-300 text-xs font-semibold text-blue-600 px-5 py-1">
                                        <div className="flex flex-row px-1 mr-4">
                                            <h1 className="border-r border-gray-300 pr-1 cursor-pointer">Edit</h1>
                                            <h1 className="px-1 cursor-pointer">Del</h1>
                                        </div>
                                        <div className="text-gray-800 text-normal px-7">
                                            <h1 className="px-7 hover:text-blue-400 cursor-pointer" onClick={()=>{
                                                history.push(`/setup/layout/LayoutFieldList/${obj}`)
                                            }}>{obj}</h1>
                                        </div>
                                    </div>
                                )
                            }) 
                            }
                        </div>

                    </div>

                    
                </div>
            </div>
    );
 
}

export default Objects;