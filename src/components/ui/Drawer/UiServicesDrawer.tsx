import React from 'react'
import { Drawer, Row, message } from 'antd'
import { useForm } from 'react-hook-form'
import {
	useAddNewServiceMutation,
	useEditServiceMutation,
} from 'src/store/index.endpoints'
import { IRuKarUz } from 'src/store/shared/shared.types'
import { TAddDrawerProps } from './Drawer.types'

const UiServicesDrawer: React.FC<TAddDrawerProps> = ({
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

	const [addNewGroup, { isSuccess: addServiceIsSuccess }] =
		useAddNewServiceMutation()
	const [editGroup, { isSuccess: editServiceIsSuccess }] =
		useEditServiceMutation()

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
				? editGroup({ id: editData.id, name: values })
				: addNewGroup({ name: values })
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
		if (addServiceIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Сервис успешно добавлен.')
			reset()
		}
		if (editServiceIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Сервис успешно изменён.')
			reset()
		}
	}, [editData?.id, addServiceIsSuccess, editServiceIsSuccess])

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
					{isSubmitting ? 'Загрузка...' : 'Применить'}
				</button>
			</form>
		</Drawer>
	)
}

export { UiServicesDrawer }
