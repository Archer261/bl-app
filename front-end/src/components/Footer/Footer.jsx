import React from 'react'

const Footer = () => {
    return (
        <footer className="py-8 px-4">
            <div className="flex flex-wrap justify-center md:justify-between space-y-4 md:space-y-0 md:flex-nowrap md:space-x-6">
            </div>
            <div className="mt-8 text-center">
                <a href="#" className="text-gray-600 hover:text-gray-800">Powered By <span>KJ Archer co.</span></a>
                <span className="text-gray-600 mx-2">|</span>
                <a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
                <span className="text-gray-600 mx-2">|</span>
                <a href="#" className="text-gray-600 hover:text-gray-800">Terms of Service</a>
            </div>
        </footer>
    )
}

export default Footer
