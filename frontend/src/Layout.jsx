import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <div className="max-w-7xl mx-auto bg-white rounded-lg p-8">
                <Outlet />
            </div>
        </>
    )
}

export default Layout
