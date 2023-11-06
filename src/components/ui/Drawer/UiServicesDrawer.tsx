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

	const onClose = () => {
		reset()
		setIsDrawerOpen(false)
	}

	const onSubmit = (values: IRuKarUz) => {
		if (editData?.id) {
			editGroup({ id: editData.id, name: values })
			reset()
		} else {
			addNewGroup({ name: values })
			reset()
		}
	}

	React.useEffect(() => {
		if (editData) {
			reset({
				kar: editData?.name.kar,
				ru: editData?.name.ru,
				uz: editData?.name.uz,
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
