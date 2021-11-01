import React,{ useEffect,useState} from "react";
import {httpsGET} from "../../backend_api/CRMAPI"
import {API_GET_Fields} from "../../backend"

const Fields = (props) => {
    const { children, history, activeTabName, pathList,match } = props;
    const [fields,setFields] = useState([]);

    useEffect(() => {
        loadFields();
    },[])

    const loadFields=()=>{
        debugger;

        let objName = match.params.objName.substring(0,match.params.objName.length-1);
        let endPoint = `${API_GET_Fields}${objName}`
        
        httpsGET(localStorage.getItem('access_token'),`${endPoint}`).then((response)=>{
            setFields(response.msg)
            console.log("RESPONSE",response);
        }).catch((error)=>{
            console.log("Error to fecth",error);
        })
    }

    return (
        
            <div className="antialiased text-gray-900 h-screen overflow-auto" style={{backgroundColor:"#f3f2ef"}}>
                <div className="w-full flex flex-col border-t-4 shadow-md border-gray-500 pb-10 rounded-sm mt-5">
                    <div className="w-full  flex flex-col  items-center justify-between border-b">
                       
                    <div className="w-full  flex flex-row  items-center justify-between border-b px-2">
                        <div className="w-full flex flex-row justify-start">
                            <h1 className="font-bold text-sm">Custom Fields & Relationships</h1>
                        </div>
                        <div className="w-full flex flex-row justify-start items-center">
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                    let objName = match.params.objName.substring(0,match.params.objName.length-1);
                                    history.push(`/createField/${objName}`);
                                }}
                                title="New Fields">New</button>
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                props.history.goBack()
                            }}
                            title="Back">Back</button>
                        </div>

                    </div>
                      

                        <div className="w-full flex flex-col justify-center  border border-gray-300">
                            <div className="flex flex-row bg-gray-100">
                                <h1 className="border-r border-gray-300 px-7 text-xs font-bold py-1">Action</h1>
                                <h1 className="border-r border-gray-300 px-32 text-xs font-bold py-1">Field Label</h1>
                                <h1 className="border-r border-gray-300 px-32 text-xs font-bold py-1">Data type</h1>
                            </div>
                            {fields && fields.length>0 && fields.map((obj)=>{
                                console.log("Data",obj)
                                return(
                                    <div className="flex flex-row border-b border-gray-300 text-xs font-semibold text-blue-600 px-5 py-1">
                                        <div className="flex flex-row px-1 mr-4">
                                            <h1 className="border-r border-gray-300 pr-1 cursor-pointer">Edit</h1>
                                            <h1 className="px-1 cursor-pointer">Del</h1>
                                        </div>
                                        <div className="text-gray-800 text-normal px-32">
                                            <h1 className="px-7 hover:text-blue-400 cursor-pointer" onClick={()=>{
                                                history.push(`/setup/layout/LayoutFieldList/${obj}`)
                                            }}>{obj.path}</h1>
                                        </div>

                                        <div className="text-gray-800 text-normal px-7">
                                            <h1 className="px-7" >{obj.instance}</h1>
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

export default Fields;