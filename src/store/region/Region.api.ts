import { api } from '../index.api'
import {
	IGetDataParams,
	IRegionDataResponse,
	TAddNewItem,
	TItemData,
} from 'src/store/shared/shared.types'

export const regionsApi = api.injectEndpoints({
	endpoints: builder => ({
		getRegions: builder.query<IRegionDataResponse, IGetDataParams>({
			query: body => ({
				url: '/regions',
				params: body,
			}),
			providesTags: ['regions'],
		}),
		getAllRegions: builder.query<IRegionDataResponse, void>({
			query: () => ({
				url: '/regions?limit=100000',
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
