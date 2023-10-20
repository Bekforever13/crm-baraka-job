import {
	All,
	Categories,
	Customers,
	Groups,
	Home,
	Workers,
} from 'src/components/screens'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/clients/all', element: <All /> },
	{ path: '/clients/workers', element: <Workers /> },
	{ path: '/clients/customers', element: <Customers /> },
	{ path: '/category', element: <Categories /> },
	{ path: '/groups', element: <Groups /> },
]
