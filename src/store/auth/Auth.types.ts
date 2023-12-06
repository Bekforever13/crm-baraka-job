export interface IInitialState {
	isAuth: boolean
	token: string
}

export interface ILoginDataBody {
	phone: string
	password: string
}
export interface IAuthDataResponse {
	token: string
}