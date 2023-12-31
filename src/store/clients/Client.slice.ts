import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IClientsParams, IInitialState, Option } from './Client.types'
import { TFiltersState } from 'src/components/screens/Clients/ClientsTypes'

const initialState: IInitialState = {
	tableFilter: {
		limit: 10,
		page: 1,
	},
	filters: {
		district: [],
		categories: [],
		region: [],
	},
	cascaderOptions: [],
	cascaderSearch: '',
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
		setFilters(state, { payload }: PayloadAction<TFiltersState>) {
			state.filters = payload
		},
		clearCascaderOptions(state) {
			state.cascaderOptions = []
		},
		setCascaderOptions(state, { payload }: PayloadAction<Option[]>) {
			state.cascaderOptions = payload
		},
		setCascaderSearch(state, { payload }: PayloadAction<string>) {
			state.cascaderSearch = payload
		},
	},
})

export const { reducer, actions } = ClientSlice
