import { FC, useEffect } from 'react'
import { Drawer, Row, message } from 'antd'
import { useForm } from 'react-hook-form'
import {
	useAddNewServiceMutation,
	useEditServiceMutation,
} from 'src/store/index.endpoints'
import { IRuKarUz } from 'src/store/shared/shared.types'
import { useActions, useSelectors } from 'src/hooks'

const UiServicesDrawer: FC = () => {
	// store states and actions
	const { setSecondDrawer, setDistrictEditData } = useActions()
	const { secondDrawer, categoriesEditData, categoryID } = useSelectors()
	// react hook form
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
		setSecondDrawer(false)
		setDistrictEditData({
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
			categoriesEditData?.id
				? editService({ id: categoriesEditData.id, name: values })
				: addNewService({ category_id: categoryID, name: values })
		}
	}

	useEffect(() => {
		if (categoriesEditData) {
			reset({
				kar: categoriesEditData?.name.kar,
				ru: categoriesEditData?.name.ru,
				uz_latin: categoriesEditData?.name.uz_latin,
				uz_kiril: categoriesEditData?.name.uz_kiril,
				en: categoriesEditData?.name.en,
			})
		}
		if (!categoriesEditData?.id) {
			reset({
				kar: '',
				ru: '',
				uz_latin: '',
				uz_kiril: '',
				en: '',
			})
		}
	}, [categoriesEditData?.id, categoriesEditData?.name])

	useEffect(() => {
		if (addServiceIsSuccess) {
			setSecondDrawer(false)
			message.success('Сервис успешно добавлен.')
			reset()
		}
	}, [addServiceIsSuccess])

	useEffect(() => {
		if (editServiceIsSuccess) {
			setSecondDrawer(false)
			message.success('Сервис успешно изменён.')
			reset()
		}
	}, [editServiceIsSuccess])

	useEffect(() => {
		// clear form values when drawer closed
		if (!secondDrawer) {
			reset({
				kar: '',
				ru: '',
				uz_latin: '',
				uz_kiril: '',
				en: '',
			})
		}
	}, [secondDrawer])

	return (
		<Drawer
			title='Сервис'
			placement='right'
			onClose={onClose}
			open={secondDrawer}
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
