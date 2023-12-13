import { FC, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Login } from 'src/components/screens'
import { useSelectors } from 'src/hooks/useSelectors'
import { Layout } from 'src/components/Layout/Layout'
import { Politics } from './components/screens/Politics'
import { routes } from './routes/Routes'

const App: FC = () => {
	const { isAuth } = useSelectors()
	const { pathname } = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuth && pathname !== '/politics') {
			navigate('/auth', { replace: true })
		}
	}, [pathname, isAuth])

	return (
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
	)
}

export { App }
