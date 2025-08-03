import React from 'react'
import {assets} from '../assets/assets.js'

const Sidebar = () => {
  return (
    <>
    <div>
        {/* sidebar card 1 home and search */}
        <div id='widget-1'>
            <img src={assets.home_icon} alt="" />
            <h1>Home</h1>
            <img src={assets.search_icon} alt="" />
            <h1>Search</h1>
        </div>
    </div>
  </>
  )
}

export default Sidebar


