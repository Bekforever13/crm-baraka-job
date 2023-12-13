import { FC, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useActions } from 'src/hooks/useActions'
import { useCheckUserQuery, useLoginMutation } from 'src/store/index.endpoints'
import { ILoginDataBody } from 'src/store/auth/Auth.types'
import { formatPhone } from 'src/utils/utils'
import { Spin, message, notification } from 'antd'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import InputMask from 'react-input-mask'
import { useButtonCooldown } from 'src/hooks'

const Login: FC = () => {
	// states
	const [showPassword, setShowPassword] = useState(false)
	// custom hook for disable button
	const [isButtonDisabled, setButtonDisabled] = useButtonCooldown(false, 3000)
	// react-hook-form hook
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ILoginDataBody>({ mode: 'onChange' })
	// hooks
	const navigate = useNavigate()
	// access token
	const token = localStorage.getItem('token')
	// store actions
	const { setAuth } = useActions()
	// rtk hooks
	const [login, { data, isSuccess, isLoading, isError }] = useLoginMutation()
	const { data: checkUser, isSuccess: checkedUser } = useCheckUserQuery(
		token ? token : ''
	)

	// on click button
	const onSubmit = async (values: ILoginDataBody) => {
		setButtonDisabled(true)
		await login({ ...values, phone: formatPhone(values.phone) })
	}

	// notifications
	useEffect(() => {
		if (isSuccess && data) {
			localStorage.setItem('token', data?.token)
			setAuth(true)
			navigate('/')
			message.success('Добро пожаловать')
		}
		if (isError) {
			notification.error({
				message: 'Ошибка',
				description:
					'Телефон или пароль введены неправильно. Повторите попытку',
				placement: 'topRight',
			})
		}
	}, [isSuccess, isError])

	// after submit give access to app and navigate
	useEffect(() => {
		if (token && checkedUser && checkUser?.data.role.includes('admin')) {
			navigate('/')
			setAuth(true)
		}
	}, [token, checkedUser])

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='relative flex items-center justify-center h-screen bg-[#F5F2DF] flex-col gap-y-5 select-none'
		>
			<h1 className='font-bold text-xl'>Вход в аккаунт</h1>
			<Controller
				name='phone'
				control={control}
				rules={{
					required: true,
					validate: value =>
						value.replace(/\D/g, '').length > 3 || 'Введите телефон',
				}}
				render={({ field }) => (
					<InputMask
						{...field}
						mask={'+\\9\\9\\899 999 99 99'}
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						placeholder='Телефон'
					/>
				)}
			/>
			{errors.phone && errors.phone.type === 'required' && (
				<span role='alert' className='text-red-500'>
					Пожалуйста, заполните поле Телефон
				</span>
			)}
			<div className='relative'>
				<input
					className='w-[300px] px-4 py-[7px] rounded-md border outline-none'
					type={showPassword ? 'text' : 'password'}
					{...register('password', { required: true })}
					placeholder='Пароль'
				/>
				<div
					className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
				</div>
			</div>
			{errors.password && errors.password.type === 'required' && (
				<span role='alert' className='text-red-500'>
					Пожалуйста, заполните поле Пароль
				</span>
			)}
			<button
				className='w-[300px] p-3 border rounded-md bg-[#F4C95B] text-white font-bold '
				type='submit'
				disabled={isLoading || isButtonDisabled}
			>
				{isLoading ? <Spin spinning /> : 'Войти'}
			</button>
		</form>
	)
}

export { Login }
