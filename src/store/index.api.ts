import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const api = createApi({
	reducerPath: 'barakaJOB',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_APP_API_URL,
		prepareHeaders: headers => {
			const token = localStorage.getItem('token')
			token && headers.set('Authorization', `Bearer ${token}`)
			return headers
		},
	}),
	refetchOnFocus: true,
	tagTypes: ['regions', 'services', 'districts', 'users', 'clients'],
	endpoints: build => ({
		default: build.query({
			query: () => 'default',
		}),
	}),
})
