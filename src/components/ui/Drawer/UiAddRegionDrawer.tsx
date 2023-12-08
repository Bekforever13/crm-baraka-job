import { FC, useEffect } from 'react'
import { Drawer, Row, message } from 'antd'
import { useForm } from 'react-hook-form'
import {
	useAddNewRegionMutation,
	useEditRegionMutation,
} from 'src/store/index.endpoints'
import { IRuKarUz } from 'src/store/shared/shared.types'
import { useActions, useSelectors } from 'src/hooks'

const UiAddRegionDrawer: FC = () => {
	// store actions and states
	const { showDrawer, editData } = useSelectors()
	const { setShowDrawer, setEditData } = useActions()
	// react-hook-form hook
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<IRuKarUz>({
		defaultValues: {
			kar: editData?.name.kar || '',
			ru: editData?.name.ru || '',
			uz_latin: editData?.name.uz_latin || '',
			uz_kiril: editData?.name.uz_kiril || '',
			en: editData?.name.en || '',
		},
	})
	// rtk hooks
	const [
		addNewRegion,
		{ isLoading: addRegionIsLoading, isSuccess: addRegionIsSuccess },
	] = useAddNewRegionMutation()
	const [
		editRegion,
		{ isLoading: editRegionIsLoading, isSuccess: editRegionIsSuccess },
	] = useEditRegionMutation()

	// after drawer closed we will clear values
	const onClose = () => {
		setShowDrawer(false)
		setEditData({
			id: 0,
			name: { kar: '', ru: '', uz_latin: '', uz_kiril: '', en: '' },
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
				? editRegion({ id: editData.id, name: values })
				: addNewRegion({ name: values })
		}
	}

	useEffect(() => {
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
	}, [editData?.name, editData?.id])

	// success message
	useEffect(() => {
		if (addRegionIsSuccess) {
			setShowDrawer(false)
			message.success('Регион успешно добавлен.')
			reset()
		}
	}, [addRegionIsSuccess])

	// success message
	useEffect(() => {
		if (editRegionIsSuccess) {
			setShowDrawer(false)
			message.success('Регион успешно изменён.')
			reset({
				kar: '',
				ru: '',
				uz_latin: '',
				uz_kiril: '',
				en: '',
			})
		}
	}, [editRegionIsSuccess])

	return (
		<Drawer
			title='Регион'
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
					disabled={isSubmitting || addRegionIsLoading || editRegionIsLoading}
				>
					{isSubmitting || addRegionIsLoading || editRegionIsLoading
						? 'Загрузка...'
						: 'Применить'}
				</button>
			</form>
		</Drawer>
	)
}

export { UiAddRegionDrawer }
