import React,{useState} from "react";
import { httpsPOST } from "../../backend_api/CRMAPI";
import {API_CREATE_OBJECTS} from "../../backend"
import Base from '../Base'
// import Navbar from "./navbar/Navbar";

const CreateObjects = (props) => {
    const { children, history, activeTabName, pathList } = props;
    const [objName,setObjName] = useState("")

    const createObject =()=>{
        let objDetail = {};
        debugger;
        objDetail.modelName = objName;
        httpsPOST(null,API_CREATE_OBJECTS,objDetail).then((response)=>{
            console.log("RESPONSE",response)
            alert(`${objName} created`)
            setObjName("");
        }).catch((error)=>{
            console.log("Error: ",error)
        })
    }

    return (
        <div className="antialiased text-gray-900 h-screen overflow-auto p-3">
                <h1>New Custom Object</h1>
                <div className="w-full flex flex-col border-t-4 shadow-md border-gray-500 pt-2 pb-10 rounded-sm mt-5">
                    <div className="w-full  flex flex-row  items-center justify-between border-b px-2">
                        <div className="w-full flex flex-row justify-start">
                            <h1 className="font-bold text-sm">Custom Object Definition Edit</h1>
                        </div>
                        
                        <div className="w-full flex flex-row justify-start items-center">
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                   createObject()
                                }}
                                title="Save">Save</button>
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                props.history.goBack()
                            }}
                            title="Cancel">Cancel</button>
                        </div>

                    </div>

                    <div className="w-full flex flex-row justify-center mt-12 items-center">
                        <h1 className="mr-3 text-sm text-gray-600">Object Name</h1>
                        <input type="text" className="border border-gray-600 rounded-sm p-1 text-sm mr-3" placeholder="Enter Name"
                            onChange={(e)=> setObjName(e.target.value)}
                            value={objName}
                        />
                        
                        <h1 className="mr-5 text-sm text-gray-900 font-bold">Example: Account</h1>
                    </div>
                </div>
                
            </div>    
    );
 
}

export default CreateObjects;