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

const UiAddDistrictDrawer: React.FC<TAddDrawerProps> = ({
	editData,
	setIsDrawerOpen,
	isDrawerOpen,
}) => {
	const [options, setOptions] = React.useState<TSelectOptions[]>([])
	const [
		addNewDistrict,
		{ isLoading: addRegionIsLoading, isSuccess: addRegionIsSuccess },
	] = useAddNewDistrictMutation()
	const [
		editDistrict,
		{ isLoading: editRegionIsLoading, isSuccess: editRegionIsSuccess },
	] = useEditDistrictMutation()
	const { data } = useGetRegionsQuery(1)
	const initialValues: TDistrictData = {
		region_id: 0,
		name: {
			ru: '',
			kar: '',
			uz: '',
			en: '',
		},
	}
	const { handleSubmit, register, setValue, reset } = useForm<TDistrictData>({
		defaultValues: editData || initialValues,
	})

	React.useEffect(() => {
		if (editData?.region_id) {
			setValue('region_id', editData.region_id)
			setValue('name.kar', editData.name.kar)
			setValue('name.ru', editData.name.ru)
			setValue('name.uz', editData.name.uz)
			setValue('name.en', editData.name.en)
		}
	}, [editData])

	const onClose = () => {
		setIsDrawerOpen(false)
		reset({
			region_id: 0,
			name: {
				kar: '',
				ru: '',
				uz: '',
				en: '',
			},
		})
	}

	const handleClickSubmit = (values: TDistrictData) => {
		editData?.id
			? editDistrict({
					id: editData.id,
					...values,
			})
			: addNewDistrict(values)
	}

	React.useEffect(() => {
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
		setOptions(
			data?.data.map(item => ({
				value: item.id.toString(),
				label: item.name.ru,
			})) || []
		)
	}, [data])

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
						{...register('region_id')}
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
						{...register('name.ru')}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Каракалпакский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name.kar')}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Узбекский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name.uz')}
					/>
				</Row>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Английский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name.en')}
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
