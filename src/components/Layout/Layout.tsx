import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => (
	<div className='bg-[#F5F2DF] w-full min-h-screen flex items-start justify-start'>
		<Navbar />
		<main className='w-full pl-[12%]'>
			<Outlet />
		</main>
	</div>
)

export { Layout }
