import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { FaGithubSquare, FaLinkedin, FaInstagramSquare } from 'react-icons/fa'

import ImageDiv from '../../components/image-div/ImageDiv'
import PageHeader from '../../components/layout/PageHeader'

import { data } from '../../data/data'
import './main-page.styles.css'

const MainPage = () => {
  const [imageList, setImageList] = useState(data);
  const [imageListLoading, setImageListLoading] = useState(false);
  return (
    <>
      <PageHeader />
      <div className='main-div'>
        <div className='image-list-div'>
          {imageListLoading ? (
            <>
              <Spinner animation='grow' className='mx-1' />
              <Spinner animation='grow' className='mx-1' />
              <Spinner animation='grow' className='mx-1' />
            </>
          ) : imageList.length === 0 ? (
            <p className='mt-5'>No image exsits.</p>
          ) : (
            <div className='image-grid-area'>
              {imageList.map((img, idx) => (
                <ImageDiv key={idx} image_data={img} />
              ))}
            </div>
          )}

          {imageList.length > 0 && (
            <div className='image-list-footer'>
              Image Footer
            </div>
          )}
        </div>

      </div>
      <footer className='page-footer d-flex justify-content-center align-items-center'>
        <div>
          <span className='me-2'>Created By 
            <a className='ms-1' href='https://godsy07.netlify.app/' target='_blank' style={{ color: '#fff !important' }}>Godsy07</a>
          </span>
          <a className='me-1' href='https://github.com/godsy07' target='_blank'>
            <FaGithubSquare style={{ fontSize: "20px", color: '#fff' }} />
          </a>
          <a className='me-1' href='https://www.linkedin.com/in/godsy07/' target='_blank'>
            <FaLinkedin style={{ fontSize: "20px", color: '#fff' }} />
          </a>
          <a className='me-1' href='https://godsy07.netlify.app/' target='_blank'>
            <FaInstagramSquare style={{ fontSize: "20px", color: '#fff' }} />
          </a>
        </div>
      </footer>
    </>
  )
}

export default MainPage
