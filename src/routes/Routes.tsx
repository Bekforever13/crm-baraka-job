// src/hooks/useApp.ts

import { Suspense, lazy } from 'react'

const useApp = () => {
	const LazyClients = lazy(() =>
		import('src/components/screens').then(module => ({
			default: module.Clients,
		}))
	)
	const LazyClientInfo = lazy(() =>
		import('src/components/screens').then(module => ({
			default: module.ClientInfo,
		}))
	)
	const LazyRegions = lazy(() =>
		import('src/components/screens').then(module => ({
			default: module.Regions,
		}))
	)
	const LazyCategories = lazy(() =>
		import('src/components/screens').then(module => ({
			default: module.Categories,
		}))
	)
	const LazyUsers = lazy(() =>
		import('src/components/screens').then(module => ({ default: module.Users }))
	)

	const routes = [
		{
			path: '/',
			element: (
				<Suspense fallback={<div>Loading...</div>}>
					<LazyClients />
				</Suspense>
			),
		},
		{
			path: '/client/:id',
			element: (
				<Suspense fallback={<div>Loading...</div>}>
					<LazyClientInfo />
				</Suspense>
			),
		},
		{
			path: '/regions',
			element: (
				<Suspense fallback={<div>Loading...</div>}>
					<LazyRegions />
				</Suspense>
			),
		},
		{
			path: '/categories',
			element: (
				<Suspense fallback={<div>Loading...</div>}>
					<LazyCategories />
				</Suspense>
			),
		},
		{
			path: '/users',
			element: (
				<Suspense fallback={<div>Loading...</div>}>
					<LazyUsers />
				</Suspense>
			),
		},
	]

	return { routes }
}

export { useApp }
