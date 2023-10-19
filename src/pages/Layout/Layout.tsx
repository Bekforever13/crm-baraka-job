import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { Header } from './Header/Header'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
	return (
		<div className='bg-[#F5F2DF] w-screen min-h-screen flex items-start justify-start'>
			<Navbar />
			<main className='w-full pl-[200px]'>
				<Header />
				<Outlet />
			</main>
		</div>
	)
}

export { Layout }
