import React from 'react'
import { useState } from 'react';
import './PopForm.css'
import {formatList} from './helper/FormatList'

export default function PopupForm({setOpenModal}) {

    const [format, setFormat] = useState("Retrospective")
    const [inputValue, setInputValue] = useState("")

    const handleChange = (e) =>{
        setFormat(e.target.value)
    }

    return(
  <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenModal(false);}}>X</button>
        </div>
        <div className="title">
          <h3>New EvBoardz</h3>
        </div>
        <div className="body">
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">EvBoard Name*</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                 <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Description*</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Format*</label>
                    <select class="form-control" value={format} onChange={handleChange}>
                        <option value="Retrospective">Retrospective</option>
                        <option value="Pros & Cons">Pros and cons</option>
                        <option value="One Section">1 Section</option>
                        <option value="Two Sections">2 Sections</option>
                        <option value="Three Sections">3 Sections</option>
                        <option value="Four Sections">4 Sections</option>
                    </select>
                </div>

                {formatList.map((item,index) => (
                    item.name === format && (
                        item.sections.map((section,index2) =>(
                            // console.log(section)
                            <div class="mb-3" key={index}>
                                <label class="form-label">Section {index2 + 1} *</label>
                                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={section} />
                            </div> 
                        ))
                        
                    )
                ))
                }

                <button type='submit'>Create</button>
            </form>
        </div>
      </div>
    </div>
    )
}
