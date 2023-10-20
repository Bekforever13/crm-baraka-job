import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout, Login } from './components/screens'
import { routes } from './routes/Routes'
import { useSelectors } from 'src/hooks/useSelectors'

const App: React.FC = () => {
	const { isAuth } = useSelectors()
	return (
		<div>
			<Routes>
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
