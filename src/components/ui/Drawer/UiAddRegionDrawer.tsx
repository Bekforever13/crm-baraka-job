import React from 'react'
import { Drawer, Row, message } from 'antd'
import { useForm } from 'react-hook-form'
import {
	useAddNewRegionMutation,
	useEditRegionMutation,
} from 'src/store/index.endpoints'
import { IRuKarUz } from 'src/store/shared/shared.types'
import { TAddDrawerProps } from './Drawer.types'

const UiAddRegionDrawer: React.FC<TAddDrawerProps> = ({
	editData,
	setIsDrawerOpen,
	isDrawerOpen,
}) => {
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

	const onClose = () => {
		setIsDrawerOpen(false)
		reset({
			kar: '',
			ru: '',
			uz: '',
			en: '',
		})
	}

	const onSubmit = (values: IRuKarUz) => {
		if (editData?.id) editRegion({ id: editData.id, name: values })
		else addNewRegion({ name: values })
	}

	React.useEffect(() => {
		if (addRegionIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Регион успешно добавлен.')
		}
		if (editRegionIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Регион успешно изменён.')
		}
	}, [addRegionIsSuccess, editRegionIsSuccess])

	React.useEffect(() => {
		if (editData) {
			reset({
				kar: editData?.name.kar,
				ru: editData?.name.ru,
				uz: editData?.name.uz,
				en: editData?.name.en,
			})
		}
	}, [editData?.id])

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
						{...register('ru')}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Каракалпакский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('kar')}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Узбекский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('uz')}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Английский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('en')}
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
