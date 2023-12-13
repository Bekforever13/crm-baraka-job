import {
	Clients,
	Regions,
	Categories,
	// Home,
	Users,
	ClientInfo,
} from 'src/components/screens'

export const routes = [
	// { path: '/', element: <Home /> },
	{ path: '/', element: <Clients /> },
	{ path: '/client/:id', element: <ClientInfo /> },
	{ path: '/regions', element: <Regions /> },
	{ path: '/categories', element: <Categories /> },
	{ path: '/users', element: <Users /> },
]
