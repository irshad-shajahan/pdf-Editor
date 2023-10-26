import React from 'react'
import { BsEyeFill, BsTrashFill } from 'react-icons/bs'
import { useGetUserDetailsQuery } from '../../redux/features/api/apiSlice'

function MyDocumentsMain() {
    const { data, isLoading, isSuccess } = useGetUserDetailsQuery()
    const openPdfInNewTab = (fileName) => {
        const pdfUrl = `https://pdf.medoncall.online/api/generatedpdf/${fileName}`;
        window.open(pdfUrl, '_blank');
    }
    const documentName = (name) => {
        const newName = name.split('&--&')[0]
        console.log(newName);
        return newName
    }

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear() % 100; // Get the last two digits of the year
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        return `${formattedDay} ${formattedMonth} ${year}`;
    }

    return (
        isSuccess && !isLoading && <div className='h-[91vh] flex flex-col items-center'>
            <h1 className='mt-5 text-4xl lg:text-5xl font-semibold'>MY DOCUMENTS</h1>
            <div className='w-full flex flex-col items-center mt-10 gap-5'>
                {data?.data?.documents?.map((elem) => (
                    <div key={elem.name} className='w-[95%] lg:w-[90%] items-center bg-sky-200 rounded-lg h-20 lg:p-5 px-2 lg:px-10 text-2xl flex justify-between'>
                        <h3 className='font-semibold text-base lg:text-2xl w-[35%]'>{documentName(elem.name)}</h3>
                        <p className='text-base text-gray-600 font-semibold'>{formatDate(elem.date)}</p>
                        <div className='flex gap-5 items-center'>
                            <div className='rounded-full bg-yellow-500 p-2 hover:bg-yellow-600 transition duration-200' onClick={() => openPdfInNewTab(elem.name)}>
                                <BsEyeFill />
                            </div>
                            <div className='rounded-full p-2 bg-red-500 hover:bg-red-600 transition duration-200'>
                                <BsTrashFill />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyDocumentsMain