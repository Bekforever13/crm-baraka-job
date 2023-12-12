import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISharedInitialState, TItemData } from './shared.types'

const initialState: ISharedInitialState = {
	showDrawer: false,
	search: '',
	districtSearch: '',
	editData: null,
	secondDrawer: false,
}

const sharedSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setSecondDrawer(state, { payload }: PayloadAction<boolean>) {
			state.secondDrawer = payload
		},
		setShowDrawer(state, { payload }: PayloadAction<boolean>) {
			state.showDrawer = payload
		},
		setEditData(state, { payload }: PayloadAction<TItemData | null>) {
			state.editData = payload
		},
		setSearch(state, { payload }: PayloadAction<string>) {
			state.search = payload
		},
		setDistrictSearch(state, { payload }: PayloadAction<string>) {
			state.districtSearch = payload
		},
	},
})

export const { reducer, actions } = sharedSlice
