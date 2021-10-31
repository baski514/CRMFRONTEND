import React,{useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { API_GET_RECORD_Details, API_UPDATE_RECORD } from '../../backend';
import { httpsGET, httpsPATCH, httpsPOST } from '../../backend_api/CRMAPI';


const RecordDetails=(props,selectedTab)=>{
    const history = useHistory();
    const {match} = props;
    const [recordDetail,setRecordDetail] = useState([])
    let objName = match.params.obj_name
    let recordId = match.params.recordId;

    useEffect(() => {
        loadDetails()
    },[])

    const loadDetails=()=>{
        let endPoint = `${API_GET_RECORD_Details}${objName}/${recordId}`;
        debugger;
        
        httpsGET(null,`${endPoint}`).then((response)=>{
            if(response.msg){
                debugger;
                let listBody = [];

                Object.keys(response.msg).forEach((key)=>{
                    let body = {}
                    if(key!=="_id" && key!=="__v" && key!=="Id"){
                        body[key] = response.msg[key];
                        body.value = response.msg[key];
                        listBody.push(body)
                    }
                })
                console.log("ListBody",listBody);
                setRecordDetail(listBody);
            }
        }).catch((error)=>{
            console.log("Error to fecth",error);
        })
    }

    const updateRecord=()=>{
        let endPoint = `${API_UPDATE_RECORD}${objName}/${recordId}`;

        let body = {}
        recordDetail.forEach((record)=>{
            body[Object.keys(record)[0]] = Object.values(record)[1]; 
        })

        console.log("Body:-  ",body)
        httpsPATCH(null,`${endPoint}`,body).then((response)=>{
            console.log("RESPONSE--",response)

            alert("Record Updated")
            // let listBody
            // Object.keys(response.msg).forEach((key)=>{
            //     let body = {}
            //     if(key!=="_id" && key!=="__v" && key!=="Id"){
            //         body[key] = response.msg[key];
            //         body.value = response.msg[key];
            //         listBody.push(body)
            //     }
            // })

            // let fieldCopy = [...records]
            // fieldCopy.push({Name:body.Name})
            // setRecords(fieldCopy);
            // setShowCreateRecord(false)
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

    return(
        <div className="antialiased text-gray-900 h-screen overflow-auto bg-white">

        <div className="w-full flex flex-col justify-center  border border-gray-300">
                        <div className="w-full flex flex-row mt-5 items-center justify-center">
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                    updateRecord();
                                }}
                                title="Save">Save</button>
                            <button className="m-1 bg-gray-100 px-2 py-1 border border-gray-400 rounded-sm text-xs hover:bg-blue-100" onClick={()=>{
                                props.history.goBack()
                            }}
                            title="Cancel">Cancel</button>
                        </div>
                        
                        {recordDetail && recordDetail.length>0 && recordDetail.map((obj,index)=>{
                            return(
                                <div class="md:mt-2">
                        <div class="form">
                            <div class="md:space-y-2 md:mb-3 items-center flex flex-row justify-center">
                                <div class="md:mb-3 md:space-y-2 max-w-md text-xs flex flex-col">
                                    <label class=" font-semibold text-gray-600 md:py-2">
                                        {Object.keys(obj)[0]}
                                    </label>
                                    
                                    <div class="flex flex-wrap items-stretch w-full md:mb-4 relative">
                                        <input
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter md:h-10 h-8 px-4"
                                            type={typeof Object.values(obj)[0]}
                                            onChange={(e)=>{
                                                let copyOfFields = [...recordDetail];
                                                copyOfFields[index].value = e.target.value;
                                                setRecordDetail(copyOfFields)
                                            }}
                                            value={Object.values(obj)[1]}
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
                            )
                        }) 
                     }
                    </div>
            </div>
    )
}

export default RecordDetails;