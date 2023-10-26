import React, { useRef, useState } from 'react'
import bgImage from '../../assets/gif/bgImage.jpg'
import { AiFillFilePdf } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { setPdf } from '../../redux/features/pdfSlice';
import { hideLoading, showloading } from '../../redux/features/alertSlice';

function UploadComponent() {
  const dispatch = useDispatch()
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (e) => {
    dispatch(showloading())
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      // setSelectedFile(file);
      dispatch(setPdf(e.target.files[0]))
      setSelectedPDF(e.target.files[0]);
      setErrorMessage('');
    } else {
      dispatch(hideLoading())
      setErrorMessage('Please select a valid PDF file.');
    }
  };
  const fileInputRef = useRef(null);

  const handleFileUpload2 = () => {
    fileInputRef.current.click();
  };

  return (
    !selectedPDF && (
      <div className='flex flex-col w-full h-[91vh] items-center' style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: 'repeat', backgroundSize: 'cover' }}>
        <input
          accept='.pdf'
          type="file"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className='hidden'
        />
        <h1 className='font-bold text-5xl lg:text-6xl mt-20'>PDF EDITOR</h1>
        <p className='mt-5 text-lg lg:text-xl font-semibold mb-20 text-center'>Edit PDF by exporting only the selected pages</p>
        <button
          className='bg-[#07393C] text-white font-semibold flex items-center gap-3 hover:bg-[#117378] px-5 lg:px-10 py-3 lg:py-5 rounded-xl lg:rounded-3xl text-2xl lg:text-3xl'
          onClick={handleFileUpload2}
        >
          Select PDF  <AiFillFilePdf />
        </button>
        <p className='mt-5 text-xl font-bold text-red-500'>{errorMessage}</p>
      </div>)
  )
}

export default UploadComponent