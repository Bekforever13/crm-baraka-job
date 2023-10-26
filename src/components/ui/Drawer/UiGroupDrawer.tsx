import React from 'react'
import { Drawer, Row, message } from 'antd'
import {
	useAddNewGroupMutation,
	useEditGroupMutation,
} from 'src/store/index.endpoints'
import { IRuKarUz } from 'src/store/shared/shared.types'
import { Formik, Form, Field } from 'formik'
import { TAddDrawerProps } from './Drawer.types'

const UiGroupDrawer: React.FC<TAddDrawerProps> = ({
	editData,
	setIsDrawerOpen,
	isDrawerOpen,
}) => {
	const [
		addNewGroup,
		{ isLoading: addGroupIsLoading, isSuccess: addGroupIsSuccess },
	] = useAddNewGroupMutation()
	const [
		editGroup,
		{ isLoading: editGroupIsLoading, isSuccess: editGroupIsSuccess },
	] = useEditGroupMutation()
	const initialValues = {
		ru: '',
		kar: '',
		uz: '',
	}
	const onClose = () => {
		setIsDrawerOpen(false)
	}

	const handleClickSubmit = (values: IRuKarUz) => {
		if (editData?.id) {
			editGroup({ id: editData.id, name: values })
		} else {
			addNewGroup({ name: values })
		}
	}

	React.useEffect(() => {
		if (addGroupIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Группа успешно добавлен.')
		}
		if (editGroupIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Группа успешно изменён.')
		}
	}, [addGroupIsSuccess, editGroupIsSuccess])

	return (
		<Drawer
			title='Группа'
			placement='right'
			onClose={onClose}
			open={isDrawerOpen}
		>
			<Formik
				initialValues={
					(editData?.name.ru !== '' && editData?.name) || initialValues
				}
				enableReinitialize
				onSubmit={handleClickSubmit}
			>
				{formikProps => {
					React.useEffect(() => {
						if (editData) {
							formikProps.setFieldValue('kar', editData?.name.kar)
							formikProps.setFieldValue('ru', editData?.name.ru)
							formikProps.setFieldValue('uz', editData?.name.uz)
						}
					}, [editData?.id])

					return (
						<Form>
							<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
								Русский:
								<Field
									className='w-[300px] px-4 py-2 rounded-md border outline-none'
									type='text'
									name='ru'
								/>
							</Row>
							<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
								Каракалпакский:
								<Field
									className='w-[300px] px-4 py-2 rounded-md border outline-none'
									type='text'
									name='kar'
								/>
							</Row>
							<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
								Узбекский:
								<Field
									className='w-[300px] px-4 py-2 rounded-md border outline-none'
									type='text'
									name='uz'
								/>
							</Row>
							<button
								className='w-full p-3 border rounded-md bg-[#F4C95B] text-white font-bold '
								type='submit'
								disabled={addGroupIsLoading}
							>
								{addGroupIsLoading || editGroupIsLoading
									? 'Загрузка...'
									: 'Применить'}
							</button>
						</Form>
					)
				}}
			</Formik>
		</Drawer>
	)
}

export { UiGroupDrawer }
