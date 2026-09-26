import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Header() {

    const navigate = useNavigate()  
    
    const navItems = [
    {
      name: 'Insert',
      slug: "/",
    },
    {
      name: 'Select',
      slug: "/show",
    },
    {
      name: 'Slide Images',
      slug: "/images",
    }
  ]
  return (
    <header className='flex flex-col bg-white mb-8 h-28'>
      <nav className='pl-5 pr-5 text-black shadow-md h-full flex justify-center'>
        <ul className='h-full flex items-center '>
          
            {navItems.map((item) => (
                <li key={item.name}
                    className='h-12 border-8  rounded-lg mx-4 flex text-center'>
                    <button
                    onClick={() => navigate(item.slug)}
                    className='
                      max-md:hidden
                      px-8
                      font-bold
                    '>{item.name}</button>
                </li>
                )
            )}
        </ul>
      </nav>
    </header>
  )
}

export default Header