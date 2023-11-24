import {
	Clients,
	Regions,
	Services,
	Home,
	Districts,
	Users,
	ClientInfo,
} from 'src/components/screens'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/clients', element: <Clients /> },
	{ path: '/client/:id', element: <ClientInfo /> },
	{ path: '/regions', element: <Regions /> },
	{ path: '/districts', element: <Districts /> },
	{ path: '/services', element: <Services /> },
	{ path: '/users', element: <Users /> },
]
