import React from 'react'
import bgImage from '../../assets/gif/bgImage.jpg'
import { useLocation } from 'react-router-dom';
// import { FaFileDownload } from 'react-icons/fa';
import {BsEyeFill} from 'react-icons/bs'
// import { saveAs } from 'file-saver';
// import axios from '../../axios/axios';

function DownloadMain() {
    const location = useLocation()
    const fileName = location.state
    const openPdfInNewTab = () => {
        const pdfUrl = `https://pdf.medoncall.online/api/generatedpdf/${fileName}`;
        window.open(pdfUrl, '_blank');
      };
    //   const downloadPdf =() =>{
    //     console.log(fileName);
    //     axios.get(`/download-pdf/${fileName}`).then((response) => {
    //         const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    //         saveAs(pdfBlob, `${name} ModifiedPdf.pdf`);
    //     })
    //   }

    return (
        <div className='flex flex-col justify-center w-full h-[92vh] items-center' style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: 'repeat', backgroundSize: 'cover' }}>
            <h1 className='mb-10 text-4xl font-bold bg-white py-2 px-4 rounded-2xl'>Your PDF is ready for download</h1>
           <div className='flex gap-8'>
           <button
                className='bg-orange-700 text-white font-semibold flex py-3 items-center gap-3 hover:bg-orange-500 px-8 rounded-2xl text-2xl'
                onClick={openPdfInNewTab}
            >
                View and Download PDF  <BsEyeFill />
            </button>
            {/* <button
                className='bg-[#07393C] text-white font-semibold flex items-center gap-3 hover:bg-[#117378] px-10 py-3 rounded-2xl text-2xl'
                onClick={downloadPdf}
            >
                Download PDF  <FaFileDownload />
            </button> */}
           </div>
        </div>
    )
}

export default DownloadMain