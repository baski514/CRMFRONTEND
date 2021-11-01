import React, { Component,useEffect,useRef,useState} from "react";
import { useHistory } from "react-router-dom";
import { API_CREATE_RECORD, API_GET_Fields, API_GET_RECORD } from "../../backend";
import { httpsGET, httpsPOST } from "../../backend_api/CRMAPI";
import CommonModal from "../ui_utilities/modals/CommonModal";

const Records=(props,selectedTab)=>{
    const history = useHistory();
    const {match} = props;
    const [fields,setFields] = useState([]);
    const [coreField,setCoreField] = useState([]);
    const [records,setRecords] = useState([]);
    const [showCreateRecord,setShowCreateRecord] = useState(false);
    let objName = match.params.obj_name.substring(0,match.params.obj_name.length-1);
    

    console.log("Match",match);
    useEffect(() => {

        loadFields();
        loadRecords();
    },[])

    const loadRecords=()=>{
        let endPoint = `${API_GET_RECORD}${objName}`
        
        httpsGET(localStorage.getItem('access_token'),`${endPoint}`).then((response)=>{
            
            if(response.msg && response.msg.length > 0 && response.msg instanceof Array){
                debugger;
                setRecords(response.msg);
            }
            console.log("records",response);
        }).catch((error)=>{
            console.log("Error to fecth",error);
        })
    }

    const loadFields=()=>{
        let endPoint = `${API_GET_Fields}${objName}`
        
        httpsGET(localStorage.getItem('access_token'),`${endPoint}`).then((response)=>{
            try {
                let fieldsTemp = []
                setCoreField(response.msg);
                response.msg.forEach((res)=>{
                    if(res.path!=='_id' && res.path!=='__v' && res.path!=='Id'){
                        res.value=""
                        fieldsTemp.push(res)
                    }
                })
                setFields(response.msg.filter((res)=>{return res.path!=='_id' && res.path!=='__v' && res.path!=='Id'}))
            } catch (error) {
                console.log("Error to load fields",error)
            }
            console.log("RESPONSE",response);
        }).catch((error)=>{
            console.log("Error to fecth",error);
        })
    }

    const createRecord=()=>{
        let endPoint = `${API_CREATE_RECORD}${objName}`

        let body={};

        fields.forEach((f)=>{
            body[f.path] = f.value
        })

        httpsPOST(localStorage.getItem('access_token'),`${endPoint}`,body).then((response)=>{
            console.log("RESPONSE--",response)
            let fieldCopy = [...records]
            fieldCopy.push({Name:body.Name,_id:response.msg._id})
            setRecords(fieldCopy);
            setShowCreateRecord(false)
            // try {
            //     let fieldsTemp = []
            //     setCoreField(response.msg);
            //     response.msg.forEach((res)=>{
            //         if(res.path!=='_id' && res.path!=='__v' && res.path!=='Id'){
            //             res.value=""
            //             fieldsTemp.push(res)
            //         }
            //     })
            //     setFields(response.msg.filter((res)=>{return res.path!=='_id' && res.path!=='__v' && res.path!=='Id'}))
            // } catch (error) {
            //     console.log("Error to load fields",error)
            // }
            console.log("RESPONSE",response);
        }).catch((error)=>{
            console.log("Error to fecth",error);
        })
    }

    const createRecordUi=()=>{
        return(
            <div className="bg-white text-gray-700 p-4">
                <div>
         
                <div class="grid md:gap-8 grid-cols-1">
                <div class="flex flex-col ">
                    <div class="flex flex-col sm:flex-row items-center">
                        <h2 class="font-semibold md:text-lg mr-auto text-base">
                            {match.params.obj_name}
                        </h2>
                    </div>
                    {fields && fields.map((f,i)=>{
                        console.log("FIELD",f)
                        return(
                    <div class="md:mt-2">
                        <div class="form">
                            <div class="md:space-y-2 md:mb-3">
                                <div class="md:mb-3 md:space-y-2 w-full text-xs">
                                    <label class=" font-semibold text-gray-600 md:py-2">
                                        {f.path}
                                    </label>
                                    
                                    <div class="flex flex-wrap items-stretch w-full md:mb-4 relative">
                                        <input
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter md:h-10 h-8 px-4"
                                            type={f.instance}
                                            onChange={(e)=>{
                                                console.log("ER- ",e.target.value)
                                                let copyOfFields = [...fields];
                                                // if(copyOfFields[i]){

                                                // }else{
                                                //     copyOfFields.push()
                                                // }

                                                copyOfFields[i].value = e.target.value;
                                                setFields(copyOfFields)
                                            }}
                                            value={f.value?f.value:""}
                                        />
                                        {/* {this.state.errorModalEvent
                                            .errorSTittle ? (
                                            <p className="text-red-500">
                                                Enter title
                                            </p>
                                        ) : null} */}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    )})}
                </div>
            </div>
                </div>
            </div>
        )
    }


    const handleEvent=(type)=>{
        if(type ==="CLOSE"){
            setShowCreateRecord(false);
        }else{
            createRecord();
        }
    }


    return(
        <div className="antialiased text-gray-900 h-screen overflow-auto bg-white">
            <div className="w-full flex flex-row justify-end p-1">
                <button 
                    className="m-1 bg-gray-200 p-1 border border-gray-400 rounded-sm text-xs items-end hover:bg-blue-100" title="New record" onClick={()=>{
                       setShowCreateRecord(true)
                       console.log("fields",fields)
                    }}>New
                </button>
                <button 
                    className="m-1 bg-gray-200 p-1 border border-gray-400 rounded-sm text-xs items-end hover:bg-blue-100" title="Objects" onClick={()=>{
                        history.push('/setup/customObjectPage')
                    }}>Objects
                </button>
                <button 
                    className="m-1 bg-gray-200 p-1 border border-gray-400 rounded-sm text-xs items-end hover:bg-blue-100" title="Create New" onClick={()=>{
                        history.push('/createObject')
                    }}>Create New Object
                </button>    
            </div>

            <div className="w-full flex flex-col justify-center  border border-gray-300">
                            <div className="flex flex-row bg-gray-100">
                                <h1 className="border-r border-gray-300 px-40 text-xs font-bold py-1">Name</h1>
                            </div>
                            {records && records.length>0 && records.map((obj,index)=>{

                                return(
                                    <div className="flex flex-row border-b border-gray-300 text-xs font-semibold text-blue-600 px-5 py-1">
                                        <div className="text-gray-800 text-normal  items-center flex flex-row">
                                            <h1 className="pr-28">{index+1}</h1>
                                            <h1 className="px-7 hover:text-blue-400 cursor-pointer" onClick={()=>{
                                                history.push(`/details/${objName}/${obj._id}`)
                                            }}>{obj.Name}</h1>
                                        </div>

                                        {/* <div className="text-gray-800 text-normal px-7">
                                            <h1 className="px-7" >{obj.instance}</h1>
                                        </div> */}
                                    </div>
                                )
                            }) 
                         }
                        </div>

            <CommonModal
                handleEvent={handleEvent}
                showModal={showCreateRecord}
                >
                    {createRecordUi()}
                </CommonModal>
        </div>
    )
}

export default Records;