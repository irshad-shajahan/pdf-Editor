import React from 'react'
import Navbar from '../components/Shared/Navbar';
import PdfRenderComponent from '../components/Home/pdfRenderComponent';
import UploadComponent from '../components/Home/uploadComponent';


function Home() {
  return (
    <div >
      <Navbar />
      <UploadComponent />
      <PdfRenderComponent />
    </div>
  );

}

export default Home