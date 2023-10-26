import React from 'react'
import logo from '../../assets/Images/pdflogo.png'

function FallbackUI() {
  return (
    <div className="preloader loaded-success fixed top-0 inset-0  bg-opacity-70 z-50 bg-white">
  <div className="absolute left-[35%] md:left-[46%] top-1/2 transform -translate-y-1/2">
    <div className="relative mx-auto my-12">
      <div className="inline-block">
        <span className="relative flex h-10 items-center justify-center w-full">
          <span className="animate-ping absolute inline-flex h-20  w-20 rounded-full bg-black opacity-80" />
          <img className='relative animate-bounce inline-flex rounded-full h-20 w-20' src={logo} alt="" />
        </span>
      </div>
    </div>
  </div>
</div>
  )
}

export default FallbackUI