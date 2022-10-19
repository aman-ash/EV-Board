import React from 'react'
import { useState } from 'react';
import './PopForm.css'
import {formatList} from './helper/FormatList'
import { createBoard } from '../service/boardServices';
let up = {Sections: []}
export default function PopupForm({setOpenModal}) {
    const [inputValue, setInputValue] = useState({
        boardName:"",
        description:"",
        format: "Retrospective",
        Sections:[],
        cards:[],
    });

    const handleChange = (e) =>{
        setInputValue((prev)=>({
            ...prev, [e.target.name]: e.target.value,
        }))
    }
    const updateFieldChanged = index => e => {
        up.Sections[index] = e.target.value
        setInputValue((prev)=>({
            ...prev,
            ...up,
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(inputValue)
        createBoard(inputValue)
        .then( (resp) => {console.log(resp);})
        .catch( (error) => {console.log(error)})
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
                    <input type="text" name='boardName' value={inputValue.boardName} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                 <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Description*</label>
                    <input type="text" name='description' value={inputValue.description} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Format*</label>
                    <select class="form-control" name='format' value={inputValue.format} onChange={handleChange}>
                        <option value="Retrospective">Retrospective</option>
                        <option value="Pros & Cons">Pros and cons</option>
                        <option value="One Section">1 Section</option>
                        <option value="Two Sections">2 Sections</option>
                        <option value="Three Sections">3 Sections</option>
                        <option value="Four Sections">4 Sections</option>
                    </select>
                </div>

               

                 {formatList.map((item,index) => (
                    item.name === inputValue.format && (
                        item.sections.map((section,index2) =>(
                            // console.log(section)
                            <div class="mb-3" key={index2}>
                                <label class="form-label">Section {index2 + 1} *</label>
                                <input type="text" value={inputValue.Sections[index2]} onChange={updateFieldChanged(index2)}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                            </div> 
                        ))
                        
                    )
                ))
                } 

                <button type='submit' onClick={handleSubmit}>Create</button>
            </form>
        </div>
      </div>
    </div>
    )
}