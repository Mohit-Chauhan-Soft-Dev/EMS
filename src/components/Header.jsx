import React from 'react'

const Header = () => {
  return (
    <div className='fixed-top'>
        <header>
            <nav className="navbar navbar-dark bg-dark">
                <div>
                    <a href="http://localhost:4040/" className="navbar-brand padding-left">
                        EMS - Employee Management System
                    </a>
                </div>
            </nav>
        </header>
    </div>
  );
}

export default Header
