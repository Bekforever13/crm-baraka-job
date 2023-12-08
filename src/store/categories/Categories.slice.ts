import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAddCategoriesData, TCategoriesInitState } from './Categories.types'

const initialState: TCategoriesInitState = {
	categoriesData: [],
}

const CategoriesSlice = createSlice({
	name: 'CategoriesSlice',
	initialState,
	reducers: {
		setCategoriesData(state, { payload }: PayloadAction<TAddCategoriesData[]>) {
			state.categoriesData = payload
		},
	},
})

export const { reducer, actions } = CategoriesSlice
