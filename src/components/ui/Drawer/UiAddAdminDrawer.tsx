import React, { useRef, useState } from 'react'
import { Drawer, Row, message } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useAddNewAdminMutation } from 'src/store/index.endpoints'
import { TNewAdminTypes } from 'src/store/users/Users.types'
import { formatPhone } from 'src/utils/shared'
import InputMask from 'react-input-mask'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

type TProps = {
	isDrawerOpen: boolean
	setIsDrawerOpen: (el: React.SetStateAction<boolean>) => void
}

const UiAddAdminDrawer: React.FC<TProps> = props => {
	const [showPassword, setShowPassword] = useState(false)
	const { setIsDrawerOpen, isDrawerOpen } = props
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm<TNewAdminTypes>({})
	const [addNewAdmin, { isLoading, isSuccess, isError }] =
		useAddNewAdminMutation()
	const formRef = useRef<HTMLFormElement>(null)
	const onClose = () => {
		reset({
			phone: '',
			last_name: '',
			first_name: '',
			password: '',
		})
		setIsDrawerOpen(false)
	}

	const handleClickSubmit = (values: TNewAdminTypes) => {
		addNewAdmin({ ...values, phone: formatPhone(values.phone) })
	}
	React.useEffect(() => {
		if (isError) {
			message.error('Данный телефон уже зарегистрирован')
			reset({ phone: '' })
		}
	}, [isError])

	React.useEffect(() => {
		if (isSuccess && formRef.current) {
			setIsDrawerOpen(false)
			message.success('Новый админ успешно добавлен')
			reset({
				phone: '',
				last_name: '',
				first_name: '',
				password: '',
			})
		}
	}, [isSuccess])

	return (
		<Drawer
			title='Админ'
			placement='right'
			onClose={onClose}
			open={isDrawerOpen}
		>
			<form ref={formRef} onSubmit={handleSubmit(handleClickSubmit)}>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Имя
					<input
						className='w-full px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('first_name', {
							required: true,
							maxLength: 20,
						})}
					/>
					{errors.first_name && errors.first_name.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле Имя
						</span>
					)}
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Фамилия
					<input
						className='w-full px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('last_name', {
							required: true,
							maxLength: 20,
						})}
					/>
					{errors.last_name && errors.last_name.type === 'required' && (
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
								mask='+\9\9\899 999 99 99'
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
