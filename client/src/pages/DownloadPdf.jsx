import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideLoading } from '../redux/features/alertSlice'

import Navbar from '../components/Shared/Navbar'
import DownloadMain from '../components/DownloadPDF/DownloadMain'

function DownloadPdf() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(hideLoading())
    }, [])

    return (
        <>
            <Navbar />
            <DownloadMain />
        </>
    )
}

export default DownloadPdf