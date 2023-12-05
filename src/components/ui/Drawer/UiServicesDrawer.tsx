import React from 'react'
import { Drawer, Row, message } from 'antd'
import { useForm } from 'react-hook-form'
import {
	useAddNewServiceMutation,
	useEditServiceMutation,
} from 'src/store/index.endpoints'
import { IRuKarUz } from 'src/store/shared/shared.types'
import { TAddDrawerProps } from './Drawer.types'

const UiServicesDrawer: React.FC<TAddDrawerProps> = props => {
	const { editData, setIsDrawerOpen, isDrawerOpen, setEditData } = props
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<IRuKarUz>()

	const [
		addNewService,
		{ isLoading: addLoading, isSuccess: addServiceIsSuccess },
	] = useAddNewServiceMutation()
	const [
		editService,
		{ isLoading: editLoading, isSuccess: editServiceIsSuccess },
	] = useEditServiceMutation()

	const onClose = () => {
		setIsDrawerOpen(false)
		setEditData({
			id: 0,
			name: { kar: '', ru: '', uz_latin: '', uz_kiril: '', en: '' },
			region_id: 0,
		})
	}

	const onSubmit = (values: IRuKarUz) => {
		if (
			values?.ru.length ||
			values?.uz_latin.length ||
			values?.uz_kiril.length ||
			values?.en.length ||
			values?.kar.length
		) {
			editData?.id
				? editService({ id: editData.id, name: values })
				: addNewService({ name: values })
		}
	}

	React.useEffect(() => {
		if (editData) {
			reset({
				kar: editData?.name.kar,
				ru: editData?.name.ru,
				uz_latin: editData?.name.uz_latin,
				uz_kiril: editData?.name.uz_kiril,
				en: editData?.name.en,
			})
		}
		if (!editData?.id) {
			reset({
				kar: '',
				ru: '',
				uz_latin: '',
				uz_kiril: '',
				en: '',
			})
		}
	}, [editData?.id, editData?.name])

	React.useEffect(() => {
		if (addServiceIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Сервис успешно добавлен.')
			reset()
		}
	}, [addServiceIsSuccess])

	React.useEffect(() => {
		if (editServiceIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Сервис успешно изменён.')
			reset()
		}
	}, [editServiceIsSuccess])

	React.useEffect(() => {
		// clear form values when drawer closed
		if (!isDrawerOpen) {
			reset({
				kar: '',
				ru: '',
				uz_latin: '',
				uz_kiril: '',
				en: '',
			})
		}
	}, [isDrawerOpen])

	return (
		<Drawer
			title='Сервис'
			placement='right'
			onClose={onClose}
			open={isDrawerOpen}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Русский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('ru', { required: true })}
					/>
					{errors.ru && errors.ru.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле Русский
						</span>
					)}
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Каракалпакский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('kar', { required: true })}
					/>
					{errors.kar && errors.kar.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле Каракалпакский
						</span>
					)}
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Узбекский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('uz_kiril', { required: true })}
					/>
					{errors.uz_kiril && errors.uz_kiril.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле Узбекский
						</span>
					)}
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					O‘zbekcha:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('uz_latin', { required: true })}
					/>
					{errors.uz_latin && errors.uz_latin.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле O‘zbekcha
						</span>
					)}
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Английский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('en', { required: true })}
					/>
					{errors.en && errors.en.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле Английский
						</span>
					)}
				</Row>
				<button
					className='w-full p-3 border rounded-md bg-[#F4C95B] text-white font-bold'
					type='submit'
					disabled={isSubmitting || addLoading || editLoading}
				>
					{isSubmitting || addLoading || editLoading
						? 'Загрузка...'
						: 'Применить'}
				</button>
			</form>
		</Drawer>
	)
}

export { UiServicesDrawer }
