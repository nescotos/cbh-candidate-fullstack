import { useState } from 'react';
import { UserProfile } from './userProfile';

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700" href="#">Health Explore</a>
              </div>
        <div className="flex md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                </svg>
          </button>
            </div>
          </div>
      <div className={"md:flex items-center block"}>
        <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
            <a className="my-1 text-sm text-gray-700 leading-5 hover:text-blue-600 hover:underline md:mx-4 md:my-0" href="#">Profile</a>
            <a className="my-1 text-sm text-gray-700 leading-5 hover:text-blue-600 hover:underline md:mx-4 md:my-0" href="#">Jobs</a>
            <a className="my-1 text-sm text-gray-700 leading-5 hover:text-blue-600 hover:underline md:mx-4 md:my-0" href="#">Professional Network</a>
            <a className="my-1 text-sm text-gray-700 leading-5 hover:text-blue-600 hover:underline md:mx-4 md:my-0" href="#">Lounge</a>
            <a className="my-1 text-sm text-gray-700 leading-5 hover:text-blue-600 hover:underline md:mx-4 md:my-0" href="#">Salary</a>
          </div>
            < UserProfile />
          </div>
        </div>
      </nav>
    </header>

  )
}
  

export default Header;