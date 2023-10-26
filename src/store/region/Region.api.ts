import { api } from '../index.api'
import {
	IItemDataResponse,
	TAddNewItem,
	TItemData,
} from 'src/store/shared/shared.types'

export const regionsApi = api.injectEndpoints({
	endpoints: builder => ({
		getRegions: builder.query<IItemDataResponse, number>({
			query: (page = 1) => ({
				url: `/regions?page=${page}`,
			}),
			providesTags: ['regions'],
		}),
		addNewRegion: builder.mutation<unknown, TAddNewItem>({
			query: body => ({
				url: '/regions',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['regions'],
		}),
		editRegion: builder.mutation<unknown, TItemData>({
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
