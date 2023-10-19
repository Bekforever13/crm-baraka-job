// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
// import { baseUrl } from 'src/config/url.config'

// export const api = createApi({
// 	reducerPath: 'api/tasks',
// 	baseQuery: fetchBaseQuery({
// 		baseUrl,
// 		prepareHeaders: headers => {
// 			const token = localStorage.getItem('token')
// 			token && headers.set('Authorization', `Bearer ${token}`)
// 			return headers
// 		},
// 	}),
// 	refetchOnFocus: true,
// 	tagTypes: ['words', 'categories', 'admins', 'types', 'auth'],
// 	endpoints: build => ({
// 		default: build.query({
// 			query: () => 'default',
// 		}),
// 	}),
// })
