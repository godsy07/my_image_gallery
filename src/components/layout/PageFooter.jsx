import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'

import './layout.styles.css'

const PageFooter = () => {
  return (
    <footer className='page-footer d-flex justify-content-center align-items-center'>
      <div>
        <span className='me-2'>
          Created By
          <a
            className='ms-1'
            href='https://godsy07.netlify.app/'
            title='Godsy07 Portfolio'
            target='_blank'
            rel="noreferrer"
            style={{ color: "#fff !important" }}
            >
            Godsy07
          </a>
        </span>
        <a
          className='me-1'
          href='https://github.com/godsy07'
          title='Github'
          target='_blank'
          rel="noreferrer"
          >
          <FaGithubSquare style={{ fontSize: "20px", color: "#fff" }} />
        </a>
        <a
          className='me-1'
          href='https://www.linkedin.com/in/godsy07/'
          title='LinkedIn'
          target='_blank'
          rel="noreferrer"
        >
          <FaLinkedin style={{ fontSize: "20px", color: "#fff" }} />
        </a>
        <a
          className='me-1'
          href='https://godsy07.netlify.app/'
          title='Instagram'
          target='_blank'
          rel="noreferrer"
        >
          <FaInstagramSquare style={{ fontSize: "20px", color: "#fff" }} />
        </a>
      </div>
    </footer>
  )
}

export default PageFooter
