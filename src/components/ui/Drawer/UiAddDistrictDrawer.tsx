import React from 'react'
import { Drawer, Row, message } from 'antd'
import {
	useAddNewDistrictMutation,
	useEditDistrictMutation,
	useGetRegionsQuery,
} from 'src/store/index.endpoints'
import { TDistrictData } from 'src/store/shared/shared.types'
import { useForm } from 'react-hook-form'
import { TAddDrawerProps, TSelectOptions } from './Drawer.types'

const initialValues: TDistrictData = {
	region_id: 0,
	name: {
		ru: '',
		kar: '',
		uz_latin: '',
		uz_kiril: '',
		en: '',
	},
}

const UiAddDistrictDrawer: React.FC<TAddDrawerProps> = props => {
	const { editData, setIsDrawerOpen, isDrawerOpen, setEditData } = props
	const [options, setOptions] = React.useState<TSelectOptions[]>([])

	const { data } = useGetRegionsQuery({ page: 0, search: '' })
	const [
		addNewDistrict,
		{ isLoading: addRegionIsLoading, isSuccess: addRegionIsSuccess },
	] = useAddNewDistrictMutation()
	const [
		editDistrict,
		{ isLoading: editRegionIsLoading, isSuccess: editRegionIsSuccess },
	] = useEditDistrictMutation()
	const { handleSubmit, register, setValue, reset } = useForm<TDistrictData>({
		defaultValues: editData || initialValues,
	})

	const onClose = () => {
		setIsDrawerOpen(false)
		setEditData({
			id: 0,
			name: { kar: '', ru: '', uz_latin: '', uz_kiril: '', en: '' },
			region_id: 0,
		})
	}

	const handleClickSubmit = (values: TDistrictData) => {
		// check is forms valid for submit
		if (
			values?.name?.ru.length ||
			values?.name.uz_latin.length ||
			values?.name.uz_kiril.length ||
			values?.name?.en.length ||
			values?.name?.kar.length ||
			values.region_id
		) {
			editData?.id
				? editDistrict({ ...values, id: editData.id })
				: addNewDistrict(values)
		}
	}

	React.useEffect(() => {
		// fill forms if clicked edit button
		if (editData?.region_id) {
			setValue('region_id', editData.region_id)
			setValue('name.kar', editData.name.kar)
			setValue('name.ru', editData.name.ru)
			setValue('name.uz_latin', editData.name.uz_latin)
			setValue('name.uz_kiril', editData.name.uz_kiril)
			setValue('name.en', editData.name.en)
		}
	}, [editData])

	React.useEffect(() => {
		// notification messages
		if (addRegionIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Округ успешно добавлен.')
		}
		if (editRegionIsSuccess) {
			setIsDrawerOpen(false)
			message.success('Округ успешно изменён.')
		}
	}, [addRegionIsSuccess, editRegionIsSuccess])

	React.useEffect(() => {
		// set options for select region
		setOptions(
			data?.data.map(item => ({
				value: item.id.toString(),
				label: item.name.ru,
			})) || []
		)
	}, [data])

	React.useEffect(() => {
		// clear form values when drawer closed
		if (!isDrawerOpen) {
			reset({
				region_id: -1,
				name: {
					kar: '',
					ru: '',
					uz_latin: '',
					uz_kiril: '',
					en: '',
				},
			})
		}
	}, [isDrawerOpen])

	return (
		<Drawer
			title='Округ'
			placement='right'
			onClose={onClose}
			open={isDrawerOpen}
		>
			<form onSubmit={handleSubmit(handleClickSubmit)}>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Выберите регион:
					<select
						className='border py-2 px-3 rounded-md w-[300px]'
						{...register('region_id', { required: true })}
					>
						{options.map(item => (
							<option key={item.value} value={item.value}>
								{item.label}
							</option>
						))}
					</select>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Русский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name.ru', { required: true })}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Каракалпакский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name.kar', { required: true })}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Узбекский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name.uz_kiril', { required: true })}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Ozbekcha:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name.uz_latin', { required: true })}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Английский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name.en', { required: true })}
					/>
				</Row>
				<button
					className='w-full p-3 border rounded-md bg-[#F4C95B] text-white font-bold '
					type='submit'
					disabled={addRegionIsLoading || editRegionIsLoading}
				>
					{addRegionIsLoading || editRegionIsLoading
						? 'Загрузка...'
						: 'Применить'}
				</button>
			</form>
		</Drawer>
	)
}

export { UiAddDistrictDrawer }
