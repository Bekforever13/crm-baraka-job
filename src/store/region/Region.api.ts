import { api } from '../index.api'
import { IRegionDataResponse, TAddNewRegion, TRegion } from './Region.types'

export const regionsApi = api.injectEndpoints({
	endpoints: builder => ({
		getRegions: builder.query<IRegionDataResponse, number>({
			query: (page = 1) => ({
				url: `/regions?page=${page}`,
			}),
			providesTags: ['regions'],
		}),
		addNewRegion: builder.mutation<unknown, TAddNewRegion>({
			query: body => ({
				url: '/regions',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['regions'],
		}),
		editRegion: builder.mutation<unknown, TRegion>({
			query: body => ({
				url: `/regions/${body.id}`,
				method: 'PUT',
				body: { name: { ...body.name } },
			}),
			invalidatesTags: ['regions'],
		}),
		deleteRegion: builder.mutation<unknown, number>({
			query: id => ({
				url: `/regions/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['regions'],
		}),
	}),
})
