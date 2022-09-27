import React from 'react'
import { useState } from 'react'
import './Home.css'
import PopupForm from './PopupForm'
export default function Home() {
const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <button className="openModalBtn" onClick={() => {setModalOpen(true)}}>Create</button>
      {modalOpen && <PopupForm setOpenModal={setModalOpen} />}
    </div>
  )
}
