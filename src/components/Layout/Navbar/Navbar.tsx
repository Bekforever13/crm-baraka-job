import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { BiSolidUserDetail } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { TbCategory } from 'react-icons/tb'
import { Popconfirm } from 'antd'
import { useActions } from 'src/hooks/useActions'
import s from './Navbar.module.scss'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

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
	getItem('Клиенты', '/clients', <FaUsers />, [
		getItem('Все', '/clients/all', null),
		getItem('Рабочие', '/clients/workers', null),
		getItem('Заказчики', '/clients/customers', null),
	]),
	getItem('Категории', '/category', <TbCategory />),
	getItem('Группы', '/groups', <BiSolidUserDetail />),
]

const Navbar: React.FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { setAuth } = useActions()

	const handleClickLogout = () => {
		localStorage.removeItem('token')
		setAuth(false)
		navigate('/auth')
	}

	const onClick: MenuProps['onClick'] = e => navigate(e.key)

	return (
		<nav className={s.navbar}>
			<Menu
				onClick={onClick}
				style={{ width: 200, color: 'white', backgroundColor: 'transparent' }}
				defaultSelectedKeys={[pathname]}
				mode='inline'
				items={items}
			/>
			<Popconfirm
				title='Вы хотите выйти?'
				onConfirm={handleClickLogout}
				okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
			>
				<div className={s.logout}>
					<FiLogOut />
					Logout
				</div>
			</Popconfirm>
		</nav>
	)
}

export { Navbar }
