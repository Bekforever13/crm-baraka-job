import React, { Suspense } from 'react'

const LazyClients = React.lazy(() =>
	import('src/components/screens').then(module => ({ default: module.Clients }))
)
const LazyClientInfo = React.lazy(() =>
	import('src/components/screens').then(module => ({
		default: module.ClientInfo,
	}))
)
const LazyRegions = React.lazy(() =>
	import('src/components/screens').then(module => ({ default: module.Regions }))
)
const LazyCategories = React.lazy(() =>
	import('src/components/screens').then(module => ({
		default: module.Categories,
	}))
)
const LazyUsers = React.lazy(() =>
	import('src/components/screens').then(module => ({ default: module.Users }))
)

export const routes = [
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
