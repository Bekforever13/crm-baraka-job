import React, { useRef } from 'react'
import { Drawer, Row, message } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useAddNewAdminMutation } from 'src/store/index.endpoints'
import { TNewAdminTypes } from 'src/store/users/Users.types'
import { formatPhone } from 'src/utils/shared'
import InputMask from 'react-input-mask'

type TProps = {
	isDrawerOpen: boolean
	setIsDrawerOpen: (el: React.SetStateAction<boolean>) => void
}

const UiAddAdminDrawer: React.FC<TProps> = props => {
	const { setIsDrawerOpen, isDrawerOpen } = props
	const { handleSubmit, register, control, reset } = useForm<TNewAdminTypes>({})
	const [addNewAdmin, { isLoading, isSuccess, isError }] =
		useAddNewAdminMutation()
	const formRef = useRef<HTMLFormElement>(null)
	const onClose = () => setIsDrawerOpen(false)

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
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('first_name', { required: true, maxLength: 20 })}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Фамилия
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('last_name', { required: true, maxLength: 20 })}
					/>
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
								className='w-[300px] px-4 py-2 rounded-md border outline-none'
							/>
						)}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Пароль
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='password'
						{...register('password', { required: true })}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					<button
						className='w-full p-3 border rounded-md bg-[#F4C95B] text-white font-bold '
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
