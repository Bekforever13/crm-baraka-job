import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IClientsParams, IInitialState } from './Client.types'

const initialState: IInitialState = {
	tableFilter: {
		limit: 10,
		page: 1,
	},
}

const ClientSlice = createSlice({
	name: 'ClientSlice',
	initialState,
	reducers: {
		setTableFilter(state, { payload }: PayloadAction<IClientsParams>) {
			state.tableFilter = payload
		},
		setLimit(state, { payload }: PayloadAction<number>) {
			state.tableFilter.limit = payload
		},
		setPage(state, { payload }: PayloadAction<number>) {
			state.tableFilter.page = payload
		},
	},
})

export const { reducer, actions } = ClientSlice
