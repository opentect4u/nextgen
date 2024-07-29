import React, { useState } from 'react'
import TDInputTemplate from '../TDInputTemplate'

function Notes({pressBack,pressNext}) {
const [notes,setNotes]=useState('')
  return (
    <div>
       <TDInputTemplate
                                placeholder="Notes"
                                type="text"
                                label="Notes"
                                name='notes'
                                formControlName={notes}
                                handleChange={(notes)=>setNotes(notes.target.value)}
                                mode={3}
                              />
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
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Notes
