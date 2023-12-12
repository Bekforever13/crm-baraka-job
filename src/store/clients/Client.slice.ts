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
		addToCascaderOptions(state, { payload }: PayloadAction<Option>) {
			state.cascaderOptions = [...state.cascaderOptions, payload]
		},
		setCascaderSearch(state, { payload }: PayloadAction<string>) {
			state.cascaderSearch = payload
		},
		// searchCascader(state, { payload }: PayloadAction<string>) {
		// 	if (payload.length) {
		// 		state.cascaderOptions = state.cascaderOptions.filter(el => {
		// 			// if we search category
		// 			const isLeftCascadeNameMatch = Object.values(el.label).some(val =>
		// 				val.toLowerCase().includes(payload.toLowerCase())
		// 			)

		// 			if (isLeftCascadeNameMatch) {
		// 				return true
		// 			}

		// 			// if we searching service
		// 			const isRightCascadeNameMatch = el.children?.some(item =>
		// 				Object.values(item.label).some(val =>
		// 					val.toLowerCase().includes(payload.toLowerCase())
		// 				)
		// 			)

		// 			return isRightCascadeNameMatch
		// 		})
		// 	}
		// },
	},
})

export const { reducer, actions } = ClientSlice
