import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCheckUserQuery } from 'src/store/index.endpoints'
import { message } from 'antd'

const Layout: React.FC = () => {
	const navigate = useNavigate()
	const { data, isSuccess, isError } = useCheckUserQuery()

	React.useEffect(() => {
		if (isSuccess) !data?.data.role.includes('admin') && navigate('/auth')
		if (isError) message.error('Произошла ошибка при проверке пользователя.')
	}, [isSuccess, isError])

	return (
		<div className='bg-[#F5F2DF] w-full min-h-screen flex items-start justify-start'>
			<Navbar />
			<main className='w-full pl-[12%]'>
				<Outlet />
			</main>
		</div>
	)
}

export { Layout }
