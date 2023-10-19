import { Categories, Clients, Home } from 'src/pages'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/clients/', element: <Clients /> },
	{ path: '/category', element: <Categories /> },
]
