import React from 'react'
import { Link } from 'react-router-dom'

const Logout = ({ handleSignout }) => {
  return (
    <>
      <div id="id01" className="w3-modal">
        <div className="w3-modal-content">
          <div className="w3-container">
            <span onclick="document.getElementById('id01').style.display='none'"
              className="w3-button w3-display-topright">&times;</span>
            <p>Some text in the Modal..</p>
            <p>Some text in the Modal..</p>
          </div>
        </div>
      </div>
    </>
    // <div>

    // <Link to='/'>
    // <button>Go to login page</button>
    // </Link>
    // </div>
  )
}

export default Logout