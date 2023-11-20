import React from 'react'
import { Drawer, Row, message } from 'antd'
import { useForm } from 'react-hook-form'
import {
	useAddNewRegionMutation,
	useEditRegionMutation,
} from 'src/store/index.endpoints'
import { IRuKarUz } from 'src/store/shared/shared.types'
import { TAddDrawerProps } from './Drawer.types'

const UiAddRegionDrawer: React.FC<TAddDrawerProps> = props => {
	const { editData, setIsDrawerOpen, isDrawerOpen } = props
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<IRuKarUz>()

	const [
		addNewRegion,
		{ isLoading: addRegionIsLoading, isSuccess: addRegionIsSuccess },
	] = useAddNewRegionMutation()
	const [
		editRegion,
		{ isLoading: editRegionIsLoading, isSuccess: editRegionIsSuccess },
	] = useEditRegionMutation()

	const onClose = () => setIsDrawerOpen(false)

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
	}, [editData])

	React.useEffect(() => {
		if (addRegionIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Регион успешно добавлен.')
		}
	}, [addRegionIsSuccess])

	React.useEffect(() => {
		if (editRegionIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Регион успешно изменён.')
			reset()
		}
	}, [editRegionIsSuccess])

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
			title='Регион'
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
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Каракалпакский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('kar', { required: true })}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Узбекский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('uz_kiril', { required: true })}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Ozbekcha:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('uz_latin', { required: true })}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Английский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('en', { required: true })}
					/>
				</Row>
				<button
					className='w-full p-3 border rounded-md bg-[#F4C95B] text-white font-bold'
					type='submit'
					disabled={isSubmitting}
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
