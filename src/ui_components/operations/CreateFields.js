import React,{ useEffect,useState} from "react";
import {httpsPOST} from "../../backend_api/CRMAPI"
import {API_CREATE_FIELD} from "../../backend"

const CreateFields = (props)=>{
    const { children, history, activeTabName, pathList, match} = props;
    console.log("Match",match);
    const [fieldName,setFieldName] = useState("");
    const [dataType,setDataType] = useState("String");
   
    const createField=()=>{
        let objDetail = {
            fieldName:fieldName,
            fieldType:dataType
        };
        
        httpsPOST(null,`${API_CREATE_FIELD}${match.params.objName}`,objDetail).then((response)=>{
            console.log("RESPONSE",response)
            alert(`${fieldName} created`)
            setFieldName("");
        }).catch((error)=>{
            console.log("Error: ",error)
        })
    }

    return(
            <div className="antialiased text-gray-900 h-screen overflow-auto p-3">
                <h1>New Custom Field</h1>
                <div className="w-full flex flex-col border-t-4 shadow-md border-gray-500 pt-2 pb-10 rounded-sm mt-5">
                    <div className="w-full  flex flex-row  items-center justify-between border-b px-2">
                        <div className="w-full flex flex-row justify-start">
                            <h1 className="font-bold text-sm">Custom Field Definition Edit</h1>
                        </div>
                        
                        <div className="w-full flex flex-row justify-start items-center">
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                    createField();
                                }}
                                title="Save">Save</button>
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                props.history.goBack()
                            }}
                            title="Cancel">Cancel</button>
                        </div>

                    </div>

                    <div className="w-full flex flex-row justify-center mt-12 items-center">
                                <h1 className="mr-3 text-sm text-gray-600">Field label</h1>
                                <input type="text" className="border border-gray-600 rounded-sm p-1 text-sm mr-3" placeholder="Enter Name"
                                    onChange={(e)=> setFieldName(e.target.value)}
                                    value={fieldName}
                                />
                                
                                
                            </div>

                            <div className="flex flex-row justify-center mt-7 items-center -ml-12">
                            <h1 className="mr-3 text-sm text-gray-600">Choose Data type</h1>
                                    <select
                                        id="dataType"
                                        onChange={(e)=>setDataType(e.target.value)}
                                        value={dataType}
                                        className="cursor-pointer shadow  border rounded py-2 px-3 text-gray-700 bg-gray-100 "
                                    >
                                        <option value="String">String</option>
                                        <option value="Number">Number</option>
                                    </select>
                                
                                
                            </div>
                </div>
            </div>
    )
}

export default CreateFields