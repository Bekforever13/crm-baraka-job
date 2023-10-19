import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { TbCategory } from 'react-icons/tb'
import { Popconfirm } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks/useSelectors'

const Navbar: React.FC = () => {
	const navigate = useNavigate()
	const [isActiveSubMenu, setIsActiveSubMenu] = React.useState(false)
	const { setActiveSubmenu } = useActions()
	const { activeSubmenu } = useSelectors()
	const { pathname } = useLocation()
	const { setAuth } = useActions()
	const menuItems = [
		{ pathname: '/', icon: <AiOutlineHome />, label: 'Главная' },
		{
			pathname: '/clients',
			icon: <FaUsers />,
			label: 'Клиенты',
			subMenu: [
				{ pathname: '/clients', label: 'Все' },
				{ pathname: '/clients', label: 'Рабочие' },
				{ pathname: '/clients', label: 'Заказчики' },
			],
		},
		{ pathname: '/category', icon: <TbCategory />, label: 'Категории' },
	]

	const handleClickRoute = (pathname: string) => {
		if (pathname === '/clients') {
			setIsActiveSubMenu(prev => !prev)
		} else {
			setActiveSubmenu('')
			setIsActiveSubMenu(false)
			navigate(pathname, { replace: true })
		}
	}
	const handleClickSubmenu = (str: string) => {
		setActiveSubmenu(str)
		navigate('/clients')
	}

	const handleClickLogout = () => {
		localStorage.removeItem('token')
		setAuth(false)
		navigate('/auth')
	}

	return (
		<nav className='fixed flex flex-col justify-between gap-y-5 bg-[#689C56] w-[200px] min-h-screen p-7 select-none'>
			<div className='flex flex-col items-baseline gap-3 text-xl rounded-2xl cursor-pointer'>
				{menuItems.map(item => {
					return (
						<div
							onClick={() => handleClickRoute(item.pathname)}
							key={item.pathname}
							className={`flex text-white w-full items-center justify-start text-base rounded-2xl p-3 gap-3 cursor-pointer hover:bg-black hover:bg-opacity-10 relative ${
								(pathname === item.pathname && 'bg-black bg-opacity-20',
								isActiveSubMenu &&
									item.pathname === '/clients' &&
									'hover:bg-transparent',
								item.pathname === '/category' && isActiveSubMenu
									? 'mt-[120px]'
									: '')
							}`}
						>
							{item.icon}
							{item.label}
							<div
								className={
									isActiveSubMenu
										? 'flex flex-col absolute top-14 text-sm ml-7 gap-y-1'
										: 'hidden'
								}
							>
								{item.subMenu?.map(subItem => (
									<div
										onClick={() => {
											handleClickRoute(subItem.pathname),
												handleClickSubmenu(subItem.label)
										}}
										key={subItem.pathname}
										className={`cursor-pointer p-2 rounded-2xl hover:bg-black hover:bg-opacity-10 ${
											activeSubmenu === subItem.label &&
											'bg-black bg-opacity-20'
										}`}
									>
										{subItem.label}
									</div>
								))}
							</div>
						</div>
					)
				})}
			</div>
			<Popconfirm
				title='Вы хотите выйти?'
				onConfirm={handleClickLogout}
				okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
			>
				<div className='flex text-white w-full items-center justify-start text-base rounded-2xl p-3 gap-3 cursor-pointer hover:bg-black hover:bg-opacity-10'>
					<FiLogOut />
					Logout
				</div>
			</Popconfirm>
		</nav>
	)
}

export { Navbar }
