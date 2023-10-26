import { api } from '../index.api'
import {
	IItemDataResponse,
	TAddNewItem,
	TItemData,
} from 'src/store/shared/shared.types'

export const groupsApi = api.injectEndpoints({
	endpoints: builder => ({
		getGroups: builder.query<IItemDataResponse, number>({
			query: (page = 1) => ({
				url: `/services?page=${page}`,
			}),
			providesTags: ['groups'],
		}),
		addNewGroup: builder.mutation<unknown, TAddNewItem>({
			query: body => ({
				url: '/services',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['groups'],
		}),
		editGroup: builder.mutation<unknown, TItemData>({
			query: body => ({
				url: `/services/${body.id}`,
				method: 'PUT',
				body: { name: { ...body.name } },
			}),
			invalidatesTags: ['groups'],
		}),
		deleteGroup: builder.mutation<unknown, number>({
			query: id => ({
				url: `/services/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['groups'],
		}),
	}),
})
