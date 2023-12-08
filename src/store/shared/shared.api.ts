import { api } from '../index.api'
import { TImport } from 'src/store/shared/shared.types'

export const sharedApi = api.injectEndpoints({
	endpoints: builder => ({
		PostImport: builder.mutation<unknown, TImport>({
			query: ({ url, file }) => {
				const formData = new FormData()
				formData.append('file', file)
				return {
					url: `/create-${url}s`,
					method: 'POST',
					body: formData,
				}
			},
			invalidatesTags: ['categories', 'regions', 'districts'],
		}),
	}),
})
