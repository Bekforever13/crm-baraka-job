import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISharedInitialState } from './shared.types'

const initialState: ISharedInitialState = {
	activeSubmenu: '',
}

const sharedSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setActiveSubmenu(state, { payload }: PayloadAction<string>) {
			state.activeSubmenu = payload
		},
	},
})

export const { reducer, actions } = sharedSlice
