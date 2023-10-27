import React from 'react'
import { Tooltip } from "@nextui-org/tooltip";
import { FaUserAlt } from 'react-icons/fa'
import { ImInfo } from 'react-icons/im'
import {RiLogoutCircleRFill} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../../redux/features/api/apiSlice';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { setPdf } from '../../redux/features/pdfSlice';

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const pdfSelected = useSelector((state)=>state.pdf.file)
  const token = localStorage.getItem('token') 
  const location = useLocation()
  const path = location.pathname
  const {data,isSuccess,isLoading} = useGetUserDetailsQuery()
  
  const logout =()=>{
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setPdf(null))
        localStorage.removeItem('token')
        navigate('/')
        toast.success('logout successful')
      }
    })
  }
  return (
    <div className={`bg-[#2C666E] h-[9vh] flex ${pdfSelected?'justify-between':'justify-end'}  items-center pl-2 pr-5 lg:pl-10  relative`}>
      {pdfSelected?(<h5 className='text-white italic flex font-semibold text-tiny lg:text-lg  items-center gap-2'><ImInfo className='text-sky-500 animate-bounce hidde lg:block' />Select the pages to be exported...</h5>):null}
     
      {!token?<button className='flex items-center gap-3 bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800' onClick={()=>navigate('/login')}>Login <FaUserAlt /></button>:

       <div className='flex items-center gap-3'>
        <p className='text-white font-bold tracking-wides'>{!isLoading&&isSuccess?data?.data?.name:null}</p>
        {path!=='/my-documents'?<button className='px-3 bg-black text-tiny lg:text-base py-1 lg:py-2 rounded-lg hover:bg-gray-800 transition duration-300 text-white font-semibold' onClick={()=>navigate('/my-documents')}>My Documents</button>:null}
        <Tooltip  showArrow={true} placement="bottom"  content={'Logout'} size='lg' classNames={{
        base: "py-2 px-4 shadow-xl text-black text-white bg-black text-base",
        arrow: "bg-red-400",
      }}>
        <button onClick={logout} className=' bg-black text-white p-1 lg:p-2 rounded-full text-3xl font-semibold'> <RiLogoutCircleRFill/></button>

      </Tooltip>
       </div>
      }
    </div>
  )
}

export default Navbar