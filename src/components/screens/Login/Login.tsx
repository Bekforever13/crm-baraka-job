import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useActions } from 'src/hooks/useActions'
import { useCheckUserQuery, useLoginMutation } from 'src/store/index.endpoints'
import { ILoginDataBody } from 'src/store/auth/Auth.types'
import { formatPhone } from 'src/utils/shared'
import { message } from 'antd'
import { MaskedInput } from 'antd-mask-input'

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ILoginDataBody>()
	const navigate = useNavigate()
	const { setAuth } = useActions()
	const [login, { data, isSuccess, isLoading, isError }] = useLoginMutation()

	const onSubmit = async (values: ILoginDataBody) => {
		await login({ ...values, phone: formatPhone(values.phone) })
	}

	React.useEffect(() => {
		if (isSuccess && data) {
			localStorage.setItem('token', data?.token)
			setAuth(true)
			navigate('/')
		}
		if (isError) message.error('Произошла ошибка. Повторите попытку!')
	}, [isSuccess, isError])

	React.useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const { data: checkUser, isSuccess: checkedUser } = useCheckUserQuery()
			if (token && checkedUser && checkUser?.data.role.includes('admin')) {
				navigate('/')
				setAuth(true)
			}
		}
	}, [])

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex items-center justify-center h-screen bg-[#F5F2DF] flex-col gap-y-5'
		>
			<h1 className='font-bold text-xl'>Authorization</h1>
			<Controller
				name='phone'
				control={control}
				render={({ field }) => (
					<MaskedInput
						{...field}
						mask='+{998}00 000 00 00'
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						placeholder='Телефон'
					/>
				)}
			/>

			{errors.phone && <div>Phone is required</div>}
			<input
				className='w-[300px] px-4 py-2 rounded-md border outline-none'
				type='password'
				{...register('password', { required: true })}
				placeholder='Пароль'
			/>
			{errors.password && <div>Password is required</div>}
			<button
				className='w-[300px] p-3 border rounded-md bg-[#F4C95B] text-white font-bold '
				type='submit'
				disabled={isLoading}
			>
				{isLoading ? 'Загрузка...' : 'Войти'}
			</button>
		</form>
	)
}

export { Login }
