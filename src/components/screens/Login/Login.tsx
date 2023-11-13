import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useActions } from 'src/hooks/useActions'
import { useCheckUserQuery, useLoginMutation } from 'src/store/index.endpoints'
import { ILoginDataBody } from 'src/store/auth/Auth.types'
import { formatPhone } from 'src/utils/shared'
import { message } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Login: React.FC = () => {
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)
	const [showPassword, setShowPassword] = React.useState(false)
	const {
		register,
		handleSubmit,
		control,
		formState: { isValid },
	} = useForm<ILoginDataBody>({
		mode: 'onChange',
	})
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	const { setAuth } = useActions()
	const [login, { data, isSuccess, isLoading, isError }] = useLoginMutation()
	const { data: checkUser, isSuccess: checkedUser } = useCheckUserQuery(
		token as string
	)

	const onSubmit = async (values: ILoginDataBody) => {
		setButtonDisabled(true)
		await login({ ...values, phone: formatPhone(values.phone) })
	}

	React.useEffect(() => {
		if (isSuccess && data) {
			localStorage.setItem('token', data?.token)
			setAuth(true)
			navigate('/')
		}
		if (isError) {
			message.error('Телефон или пароль введён неправильно. Повторите попытку')
		}
	}, [isSuccess, isError])

	React.useEffect(() => {
		if (token && checkedUser && checkUser?.data.role.includes('admin')) {
			navigate('/')
			setAuth(true)
		}
	}, [token, checkedUser])

	React.useEffect(() => {
		let timer: ReturnType<typeof setTimeout>
		if (isButtonDisabled) {
			timer = setTimeout(() => {
				setButtonDisabled(false)
			}, 3000)
		}
		return () => {
			clearTimeout(timer)
		}
	}, [isButtonDisabled])

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex items-center justify-center h-screen bg-[#F5F2DF] flex-col gap-y-5 select-none'
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
					<MaskedInput
						{...field}
						mask='+{998}00 000 00 00'
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						placeholder='Телефон'
					/>
				)}
			/>
			<div className='relative'>
				<input
					className='w-[300px] px-4 py-2 rounded-md border outline-none'
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
			<button
				className='w-[300px] p-3 border rounded-md bg-[#F4C95B] text-white font-bold '
				type='submit'
				disabled={isLoading || !isValid || isButtonDisabled}
			>
				{isLoading ? 'Загрузка...' : 'Войти'}
			</button>
		</form>
	)
}

export { Login }
