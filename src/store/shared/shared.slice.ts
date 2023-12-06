import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISharedInitialState } from './shared.types'

const initialState: ISharedInitialState = {
	showDrawer: false,
	search: '',
	serviceSearch: '',
	regionSearch: '',
	districtSearch: '',
}

const sharedSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setShowDrawer(state, { payload }: PayloadAction<boolean>) {
			state.showDrawer = payload
		},
		setSearch(state, { payload }: PayloadAction<string>) {
			state.search = payload
		},
		setServiceSearch(state, { payload }: PayloadAction<string>) {
			state.serviceSearch = payload
		},
		setRegionSearch(state, { payload }: PayloadAction<string>) {
			state.regionSearch = payload
		},
		setDistrictSearch(state, { payload }: PayloadAction<string>) {
			state.districtSearch = payload
		},
	},
})

export const { reducer, actions } = sharedSlice
