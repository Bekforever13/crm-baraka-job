import { FC, useEffect } from 'react'
import { Navbar } from './Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCheckUserQuery } from 'src/store/index.endpoints'
import { message } from 'antd'

const Layout: FC = () => {
	// hooks
	const navigate = useNavigate()
	// access token
	const token = localStorage.getItem('token')
	// rtk hooks
	const { data, isSuccess, isError } = useCheckUserQuery(token ? token : '')

	useEffect(() => {
		// if role is not admin then navigate back to auth page
		if (isSuccess) {
			!data?.data.role.includes('admin') && navigate('/auth')
		}
		// if can't check user go back to auth page
		if (isError) {
			message.error('Произошла ошибка при проверке пользователя.')
			navigate('/auth')
		}
	}, [isSuccess, isError])

	return (
		<div className='bg-[#F5F2DF] w-full min-h-screen flex items-start justify-start'>
			<Navbar />
			<main className='w-full md:pl-[180px] md:mt-0 mt-20'>
				<Outlet />
			</main>
		</div>
	)
}

export { Layout }
