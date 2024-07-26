import React, { useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import VError from "../../Components/VError";
function More({ pressNext, pressBack, type }) {
  const [insp_flag, setInspFlag] = useState("N");
  const [insp, setInsp] = useState("");
  const [drawing_flag, setDrawingFlag] = useState("N");
  const [drawing, setDrawing] = useState("");
  const [mdcc_flag, setMdccFlag] = useState("N");
  const [mdcc, setMdcc] = useState("");
  const [drawingDate,setDrawingDate]=useState([{id:0,dt:""}])
  const handleDtChange=(index,event)=>{
    let data = [...drawingDate];
    data[index][event.target.name] = event.target.value;
    setDrawingDate(data)
    console.log(drawingDate)
  }
  const addDt=()=>{
    setDrawingDate([...drawingDate,{id:0,dt:""}])

    console.log(drawingDate)
  }
  const removeDt = (index) => {
    let data = [...drawingDate];
    data.splice(index, 1)
    setDrawingDate(data)
}
  const onSubmit=()=>{
    console.log(drawingDate)

    if(mdcc_flag=='MDCC' || !insp_flag=='Inspection required?' || drawing_flag=='Drawing/Datasheet?'|| (mdcc_flag=='Y' && !mdcc) || (insp_flag=='Y' && !insp) || (drawing_flag=='Y' && !drawing) ){

    }
    else{
        console.log(drawingDate)
        pressNext({mdcc_flag:mdcc_flag,mdcc_scope:mdcc,drawing_flag:drawing_flag,drawing_scope:drawing,inspection_flag:insp_flag,inspection_scope:insp})
    }
  }
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        <div className="flex flex-col sm:col-span-1 gap-3 mt-5">
          <TDInputTemplate
            placeholder="MDCC"
            type="text"
            label="MDCC"
            name="mdcc"
            data={[
              { name: "Yes", code: "Y" },
              { name: "No", code: "N" },
            ]}
            formControlName={mdcc_flag}
            handleChange={(e) => {
              setMdccFlag(e.target.value);
              console.log(mdcc_flag);
            }}
            mode={2}
          />
           {mdcc_flag=='MDCC' && (
                      <VError title={"MDCC is required"} />
                    )}
          {mdcc_flag == "Y" && (
            <TDInputTemplate
              placeholder="MDCC Scope"
              type="text"
              label="MDCC Scope"
              name="mdcc"
              formControlName={mdcc}
              handleChange={text=>setMdcc(text.target.value)}
              mode={1}
            />
           
          )}
           {mdcc_flag=='Y' && !mdcc &&  (
                <VError title={"MDCC scope is required"} />
              )}
        </div>
        <div className="flex flex-col sm:col-span-1 gap-3 mt-5">
          <TDInputTemplate
            placeholder="Inspection required?"
            type="text"
            label="Inspection required?"
            name="insp_flag"
            handleChange={(e) => {
              setInspFlag(e.target.value);
              console.log(insp_flag);
            }}
            formControlName={insp_flag}
            data={[
              { name: "Yes", code: "Y" },
              { name: "No", code: "N" },
            ]}
            mode={2}
          />
           {insp_flag=='Inspection required?' && (
                      <VError title={"Inspection flag is required"} />
                    )}
          {insp_flag == "Y" && (
            <TDInputTemplate
              placeholder="Inspection Scope"
              type="text"
              formControlName={insp}
              handleChange={text=>setInsp(text.target.value)}
              label="Inspection Scope"
              name="insp"
              mode={1}
            />
         )}
          {insp_flag=='Y' && !insp && (
                      <VError title={"Inspection scope is required"} />
                    )}
        </div>
        <div className="flex flex-col sm:col-span-1 gap-3 mt-5">
          <TDInputTemplate
            placeholder="Drawing/Datasheet?"
            type="text"
            label="Drawing/Datasheet?"
            name="drawing"
            data={[
              { name: "Yes", code: "Y" },
              { name: "No", code: "N" },
            ]}
            mode={2}
            handleChange={(e) => {
              setDrawingFlag(e.target.value);
              console.log(drawing_flag);
            }}
            formControlName={drawing_flag}
          />
           {drawing_flag=='Drawing/Datasheet?' && (
                      <VError title={"Drawing/Datasheet flag is required"} />
                    )}
          {drawing_flag == "Y" && (
          <>
          <TDInputTemplate
              placeholder="Drawing/Datasheet Scope"
              type="text"
              formControlName={drawing}
              handleChange={e=>setDrawing(e.target.value)}
              label="Drawing/Datasheet Scope"
              name="drawing"
              mode={1}
            />
           {drawing_flag=='Y' && !drawing && (
                      <VError title={"Drawing scope is required"} />
                    )}

{drawingDate.map((input,index)=>
         <>   <div key={index} className="flex-col justify-between">
           <div className="flex gap-2 justify-end">
         {drawingDate.length>1 && <button  className=" inline-flex items-center justify-center -mt-1 text-sm font-medium text-center text-white bg-primary-700 h-9 w-9  bg-red-900 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={()=>removeDt(index)}>-</button>}
          <button  className=" inline-flex items-center justify-center -mt-1 text-sm font-medium text-center text-white bg-primary-700 h-9 w-9  bg-green-900 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={()=>addDt()}>+</button>
          </div>
<TDInputTemplate
            placeholder=""
            type="date"
            formControlName={input.dt}
            handleChange={event => handleDtChange(index, event)}
            // handleChange={e=>setDrawing(e.target.value)}
            label="Drawing date"
            name="dt"
            mode={1}
          />
         
         
            </div>
</>
            )}
         
         
          </>  
          )}
         
        </div>
{/* 
        {drawing && (
          <div className=" sm:col-span-4 mt-6">
            <label
              for="catnm"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Drawing/Datasheet to be implemented by
            </label>
            <input
              type="text"
              name="catnm"
              id="catnm"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type here..."
              required=""
            />
          </div>
        )}
        {insp && (
          <div className="sm:col-span-4">
            <label
              for="catnm"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Inspection Scope
            </label>
            <input
              type="text"
              name="catnm"
              id="catnm"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type here..."
              required=""
            />
          </div>
        )} */}
      </div>
      <div className="flex pt-4 justify-between w-full">
        <button
          className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
          onClick={pressBack}
        >
          Back
        </button>
        <button
          type="submit"
          className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
            onClick={() => onSubmit()}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default More;
