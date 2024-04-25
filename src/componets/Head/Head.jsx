import React from 'react'
import './Head.css'

export const Head= ({handleChange,inputText,dataStore, dataStoreByEnter})=>{
  return (
    <div className='head-container'>
      <input type="text" placeholder='New todo' value={inputText} onChange={handleChange} />
      <button onClick={dataStore}>Add TODO</button>
    </div>
  )
}
