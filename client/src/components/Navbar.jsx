import React from 'react'
import Search from './Search';
import { Link } from 'react-router-dom';
import { MdShoppingBag, MdShoppingCart } from 'react-icons/md'
const Navbar = () => {
    const user =false
    const admin =true;
  return (
    <div className='fixed z-20 w-full bg-white p-3 flex items-center justify-between shadow-md border-b'>
        <Link to={'/'}><h1 className='flex items-center text-purple-600'><MdShoppingBag size={30}/> E-commerce</h1></Link>
        <div className='hidden sm:flex items-center gap-3'>
            <div className='flex items-center gap-2 text-slate-600'>
                <Link to={'/'}>Home</Link>
                <Link to={'/products'}>Products</Link>
            </div>
            <Search/>
        </div>
        <div className='flex items-center gap-2'>

            <MdShoppingCart size={25}/>
            {user ? (<div className='flex items-center gap-3'>
                {admin && <Link to={'/admin'}>Admin</Link>}
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-slate-300'>
                    {user[0]}</div>
                    <button className='max-[400px]:hidden flex px-2 py-0.5 rounded-md bg-red-500 text-slate-300
                    '>Logout</button>
            </div>):(<Link to={'/login'}><button className='px-4 py-2 rounded-md bg-teal-700 text-slate-300
                    '>Login</button></Link>)}
        </div>
    </div>
  )
}

export default Navbar