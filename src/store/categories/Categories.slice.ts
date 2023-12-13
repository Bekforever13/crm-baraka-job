import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAddCategoriesData, TCategoriesInitState } from './Categories.types'
import { TItemData } from '../shared/shared.types'

const initialState: TCategoriesInitState = {
	categoriesDrawer: false,
	serviceDrawer: false,
	categoriesData: [],
	categoriesSearch: '',
	categoryID: 0,
	categoriesEditData: null
}

const CategoriesSlice = createSlice({
	name: 'CategoriesSlice',
	initialState,
	reducers: {
		setServiceDrawer(state, { payload }: PayloadAction<boolean>) {
			state.serviceDrawer = payload
		},
		setCategoryDrawer(state, { payload }: PayloadAction<boolean>) {
			state.categoriesDrawer = payload
		},
		setCategoriesData(state, { payload }: PayloadAction<TAddCategoriesData[]>) {
			state.categoriesData = payload
		},
		setCategoriesSearch(state, { payload }: PayloadAction<string>) {
			state.categoriesSearch = payload
		},
		setCategoriesEditData(state, { payload }: PayloadAction<TItemData | null>) {
			state.categoriesEditData = payload
		},
		setCategoryID(state, { payload }: PayloadAction<number>) {
			state.categoryID = payload
		},
	},
})

export const { reducer, actions } = CategoriesSlice
