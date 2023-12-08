import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Login } from 'src/components/screens'
import { routes } from 'src/routes/Routes'
import { useSelectors } from 'src/hooks/useSelectors'
import { Layout } from 'src/components/Layout/Layout'
import { Politics } from './components/screens/Politics'

const App: React.FC = () => {
	const { isAuth } = useSelectors()
	const { pathname } = useLocation()
	const navigate = useNavigate()

	React.useEffect(() => {
		if (!isAuth && pathname !== '/politics')
			navigate('/auth', { replace: true })
	}, [pathname, isAuth])

	return (
		<div>
			<Routes>
				<Route path='/politics' element={<Politics />} />
				<Route path='/auth' element={<Login />} />
				{isAuth && (
					<Route path='/' element={<Layout />}>
						{routes.map(item => (
							<Route key={item.path} path={item.path} element={item.element} />
						))}
					</Route>
				)}
			</Routes>
		</div>
	)
}

export { App }
