import  React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='flex-container'>
            <div>
               <img className='logo' src={assets.logo1} alt="" />
                <figcaption><pre><h3>           Admin Panel</h3></pre></figcaption> 
            </div>            
            <img className='profile' src={assets.profile_image} alt="" /> 
        </div>
             
    </div>
  )
}

export default Navbar
