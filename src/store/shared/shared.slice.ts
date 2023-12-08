import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISharedInitialState, TItemData } from './shared.types'

const initialState: ISharedInitialState = {
	showDrawer: false,
	search: '',
	categoriesSearch: '',
	regionSearch: '',
	districtSearch: '',
	editData: null,
}

const sharedSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setShowDrawer(state, { payload }: PayloadAction<boolean>) {
			state.showDrawer = payload
		},
		setEditData(state, { payload }: PayloadAction<TItemData | null>) {
			state.editData = payload
		},
		setSearch(state, { payload }: PayloadAction<string>) {
			state.search = payload
		},
		setCategoriesSearch(state, { payload }: PayloadAction<string>) {
			state.categoriesSearch = payload
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
