import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import axios from '../../axios/axios'
import { FaFileExport } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showloading } from '../../redux/features/alertSlice';
import { IoIosCloseCircle } from 'react-icons/io'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../../redux/features/api/apiSlice';

function PdfRenderComponent() {
    const { data, refetch } = useGetUserDetailsQuery()
    const userId = data?.data._id
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectedPDF = useSelector((state) => state.pdf.file)
    const [numPages, setNumPages] = useState(0);
    const [selectedPages, setSelectedPages] = useState([]);
    const handlePDFLoadSuccess = ({ numPages }) => {
        dispatch(hideLoading())
        setNumPages(numPages);
    };
    const handleCheckboxChange = (page) => {
        if (selectedPages.includes(page)) {
            setSelectedPages(selectedPages.filter((selectedPage) => selectedPage !== page));
        } else {
            setSelectedPages([...selectedPages, page]);
        }
    };

    const handleProcessPDF = async () => {
        try {
            dispatch(showloading())
            const formDataToSend = new FormData();
            if (userId) {
                formDataToSend.append('userId', userId);
            }
            formDataToSend.append('pdf', selectedPDF);
            formDataToSend.append('selectedPages', JSON.stringify(selectedPages))
            axios.post('/upload-pdf', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                if (res.data.success) {
                    refetch()
                    navigate('/download-pdf', { state: res.data.fileName })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                }
            })

        } catch (error) {
            console.error(error);
        }
    };
    const emptySelectedPages = () => {
        Swal.fire({
            title: 'Are you sure you want to deselect all?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectedPages([]);
                //   Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                //   )
            }
        })
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      // Update the isMobile state when the window is resized
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        selectedPDF && (<div className='flex justify-center relative'>
            <button onClick={handleProcessPDF} className={`fixed bottom-[2%] lg:bottom-[5%] right-[4%] lg:right-16 bg-black text-white flex px-2 lg:px-10 py-2 lg:py-5 rounded-xl text-lg lg:text-3xl font-semibold gap-4 items-center ${selectedPages.length !== 0 ? 'fixed' : 'hidden'} hover:bg-gray-700 transition-all duration-500 ease-in-out z-10`}>Export PDF <FaFileExport className='animate-pulse' /></button>
            <button onClick={emptySelectedPages} className={`fixed top-[85%] lg:top-[20%] right-[10%] lg:right-[8%] bg-red-600 text-white flex px-2 lg:px-4 py-2 rounded-xl text-xl font-semibold gap-4 items-center ${selectedPages.length !== 0 ? 'fixed' : 'hidden'} transition-all hover:bg-red-800 hover:-translate-y-1 duration-500 ease-in-out z-10`}> <span className='hidden lg:block'>Deselect All</span> <IoIosCloseCircle /></button>
            <div className=' lg:w-full overflow-auto bg-gradient-to-b from-[#2C666E] via-white to-[#2C666E] flex justify-center h-[91vh] relative' >
                <Document file={selectedPDF} onLoadSuccess={handlePDFLoadSuccess} className={'flex flex-col gap-10 '}>
                    {Array.from({ length: numPages }, (_, i) => (
                        <div key={`page_${i + 1}`} className='flex gap-2  items-center lg:items-start px-3 lg:px-0'>
                            <label className="flex items-center cursor-pointer mt-5 relative">
                                <input
                                    name='pdfpage'
                                    type="checkbox"
                                    checked={selectedPages.includes(i)}
                                    onChange={() => handleCheckboxChange(i)}
                                    className="hidden"
                                />
                                <div className="w-6 h-6 rounded-full border-2 border-white  flex items-center justify-center mr-2">
                                    {selectedPages.includes(i) && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white font-bold bg-[#07393C] rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                {/* Page {i + 1}  */}
                            </label>
                            <Page
                                pageNumber={i + 1}
                                height={650}
                                width={isMobile ? 350 : ''} 
                                
                                onClick={() => handleCheckboxChange(i)}
                                className={
                                    `${selectedPages.includes(i)? 'border-[#07393C] border-[4px] transition duration-300 ease-in-out': 'p-[4px]'}`}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </div>
                    ))}
                </Document>
            </div>
        </div>)
    )
}

export default PdfRenderComponent