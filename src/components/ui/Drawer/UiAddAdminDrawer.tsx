import { useRef, useState, FC, useEffect } from 'react'
import { Drawer, Row, message } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useAddNewAdminMutation } from 'src/store/index.endpoints'
import { TNewAdminTypes } from 'src/store/users/Users.types'
import { formatPhone } from 'src/utils/utils'
import InputMask from 'react-input-mask'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'
import { useActions, useSelectors } from 'src/hooks'

const UiAddAdminDrawer: FC = () => {
	// states
	const [showPassword, setShowPassword] = useState(false)
	// store actions and states
	const { usersDrawer } = useSelectors()
	const { setUsersDrawer } = useActions()
	// react-hook-form hook
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm<TNewAdminTypes>({})
	// rtk hooks
	const [addNewAdmin, { isLoading, isSuccess }] = useAddNewAdminMutation()
	// hook
	const formRef = useRef<HTMLFormElement>(null)

	// after drawer closed we will clear values
	const onClose = () => {
		reset({
			phone: '',
			name: '',
			password: '',
		})
		setUsersDrawer(false)
	}

	//  create new admin
	const handleClickSubmit = (values: TNewAdminTypes) => {
		addNewAdmin({ ...values, phone: formatPhone(values.phone) })
	}

	useEffect(() => {
		// clear form after success
		if (isSuccess && formRef.current) {
			setUsersDrawer(false)
			message.success('Новый админ успешно добавлен')
			reset({
				phone: '',
				name: '',
				password: '',
			})
		}
	}, [isSuccess])

	return (
		<Drawer
			title='Админ'
			placement='right'
			onClose={onClose}
			open={usersDrawer}
		>
			<form ref={formRef} onSubmit={handleSubmit(handleClickSubmit)}>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Ф.И.О
					<input
						className='w-full px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name', {
							required: true,
							maxLength: 20,
						})}
					/>
					{errors.name && errors.name.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле Фамилия
						</span>
					)}
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Номер телефона
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
								className='w-full px-4 py-2 rounded-md border outline-none'
							/>
						)}
					/>
					{errors.phone && errors.phone.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле Номер телефона
						</span>
					)}
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Пароль
					<div className='relative'>
						<input
							className='w-full pl-4 pr-12 py-2 rounded-md border outline-none'
							type={showPassword ? 'text' : 'password'}
							{...register('password', {
								required: true,
								min: 8,
							})}
						/>
						<span
							className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer'
							onClick={() => setShowPassword(prev => !prev)}
						>
							{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
						</span>
					</div>
					{errors.password && errors.password.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле Пароль
						</span>
					)}
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					<button
						className='w-full px-4 p-3 border rounded-md bg-[#F4C95B] text-white font-bold '
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? 'Загрузка...' : 'Применить'}
					</button>
				</Row>
			</form>
		</Drawer>
	)
}

export { UiAddAdminDrawer }
