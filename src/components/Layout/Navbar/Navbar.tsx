import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { BiSolidMapPin, BiSolidUserDetail } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { TbCategory } from 'react-icons/tb'
import { IoPeopleOutline } from 'react-icons/io5'
import { Popconfirm } from 'antd'
import { useActions } from 'src/hooks/useActions'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useWindowSize } from 'src/hooks/useWindowSize'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem
}

const items: MenuProps['items'] = [
	getItem('Главная', '/', <AiOutlineHome />),
	getItem('Клиенты', '/clients', <IoPeopleOutline />),
	getItem('Регионы', '/regions', <TbCategory />),
	getItem('Округи', '/districts', <BiSolidMapPin />),
	getItem('Сервисы', '/services', <BiSolidUserDetail />),
	getItem('Пользователи', '/users', <FaUsers />),
]

const Navbar: React.FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { setAuth } = useActions()
	const { width } = useWindowSize()

	const handleClickLogout = () => {
		localStorage.removeItem('token')
		setAuth(false)
		navigate('/auth')
	}

	const onClick: MenuProps['onClick'] = e => navigate(e.key)

	return (
		// <nav className='hidden z-50 fixed md:flex flex-col justify-between gap-y-5 bg-[#689C56] w-[180px] min-h-screen py-7 select-none'>
		<nav className='select-none bg-[#689C56] z-50 fixed top-0 w-full flex items-center justify-between h-20 md:flex md:flex-col md:justify-between md:gap-y-5  md:w-[180px] md:min-h-screen md:py-7'>
			<div>
				<h1 className='text-white text-2xl text-center font-bold mb-7 md:block hidden'>
					JOB Baraka
				</h1>
				<Menu
					onClick={onClick}
					style={{
						width: width > 768 ? 180 : '60vw',
						color: 'white',
						backgroundColor: 'transparent',
					}}
					defaultSelectedKeys={[pathname]}
					mode={width > 768 ? 'vertical' : 'horizontal'}
					items={items}
				/>
			</div>
			<Popconfirm
				title='Вы хотите выйти?'
				onConfirm={handleClickLogout}
				okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
			>
				<div className='flex text-white w-full pl-5 items-center justify-start text-base rounded-2xl p-3 gap-3 cursor-pointer hover:bg-black hover:bg-opacity-10'>
					<FiLogOut />
					Logout
				</div>
			</Popconfirm>
		</nav>
	)
}

export { Navbar }
