import React from 'react'
import { Drawer, Row, Spin, message } from 'antd'
import { useForm } from 'react-hook-form'
import { IRuKarUz } from 'src/store/shared/shared.types'
import {
	useAddNewCategoriesMutation,
	useEditCategoriesMutation,
} from 'src/store/index.endpoints'
import { useActions, useSelectors } from 'src/hooks'

const UiCategoriesDrawer: React.FC = () => {
	// store actions and state
	const { showDrawer, editData } = useSelectors()
	const { setShowDrawer, setEditData } = useActions()
	// react-hook-form hook
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IRuKarUz>()
	// rtk hooks
	const [
		addNewCategories,
		{ isLoading: addLoading, isSuccess: addCategoriesIsSuccess },
	] = useAddNewCategoriesMutation()
	const [
		editCategories,
		{ isLoading: editLoading, isSuccess: editCategoriesIsSuccess },
	] = useEditCategoriesMutation()

	// after drawer closed we will clear values
	const onClose = () => {
		setShowDrawer(false)
		setEditData({
			id: 0,
			name: { kar: '', ru: '', uz_latin: '', uz_kiril: '', en: '' },
			region_id: 0,
		})
	}

	// if we editing we will submit like editing, else we create new
	const onSubmit = (values: IRuKarUz) => {
		if (
			values?.ru.length ||
			values?.uz_latin.length ||
			values?.uz_kiril.length ||
			values?.en.length ||
			values?.kar.length
		) {
			editData?.id
				? editCategories({ id: editData.id, name: values })
				: addNewCategories({ name: values })
		}
	}

	React.useEffect(() => {
		// if editData have values we will fill our form with it
		if (editData) {
			reset({
				kar: editData?.name.kar,
				ru: editData?.name.ru,
				uz_latin: editData?.name.uz_latin,
				uz_kiril: editData?.name.uz_kiril,
				en: editData?.name.en,
			})
		}
		// if editdata empty we clear form values
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

	// success message
	React.useEffect(() => {
		if (addCategoriesIsSuccess) {
			setShowDrawer(false)
			message.success('Сервис успешно добавлен.')
			reset()
		}
	}, [addCategoriesIsSuccess])

	// success message
	React.useEffect(() => {
		if (editCategoriesIsSuccess) {
			setShowDrawer(false)
			message.success('Сервис успешно изменён.')
			reset()
		}
	}, [editCategoriesIsSuccess])

	return (
		<Drawer
			title='Сервис'
			placement='right'
			onClose={onClose}
			open={showDrawer}
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
					{isSubmitting || addLoading || editLoading ? 
					<Spin spinning /> : 'Применить'}
				</button>
			</form>
		</Drawer>
	)
}

export { UiCategoriesDrawer }
