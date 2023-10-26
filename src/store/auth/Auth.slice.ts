import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInitialState } from './Auth.types'

const initialState: IInitialState = {
	isAuth: localStorage.getItem('token') ? true : false,
	token: localStorage.getItem('token') || '',
}

const AuthSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setToken(state, { payload }: PayloadAction<string>) {
			localStorage.setItem('token', `${payload}`)
			state.token = payload
		},
		setAuth(state, { payload }: PayloadAction<boolean>) {
			state.isAuth = payload
		},
	},
})
export const { reducer, actions } = AuthSlice
