import React from 'react'
import { Drawer, Row, message } from 'antd'
import {
	useAddNewDistrictMutation,
	useEditDistrictMutation,
} from 'src/store/index.endpoints'
import { TDistrictData } from 'src/store/shared/shared.types'
import { useForm } from 'react-hook-form'
import { useActions, useSelectors } from 'src/hooks'

const UiDistrictDrawer: React.FC = () => {
	// store states and actions
	const { setSecondDrawer, setDistrictEditData } = useActions()
	const { secondDrawer, districtEditData, regionID } = useSelectors()

	// rtk hooks
	const [
		addNewDistrict,
		{ isLoading: addRegionIsLoading, isSuccess: addRegionIsSuccess },
	] = useAddNewDistrictMutation()
	const [
		editDistrict,
		{ isLoading: editRegionIsLoading, isSuccess: editRegionIsSuccess },
	] = useEditDistrictMutation()
	// react hook form
	const {
		handleSubmit,
		register,
		setValue,
		reset,
		formState: { errors },
	} = useForm<TDistrictData>()

	const onClose = () => {
		setSecondDrawer(false)
		reset({
			region_id: 0,
			name: {
				kar: '',
				ru: '',
				uz_latin: '',
				uz_kiril: '',
				en: '',
			},
		})
		setDistrictEditData(null)
	}

	const handleClickSubmit = (values: TDistrictData) => {
		// check is forms valid for submit
		if (
			values?.name?.ru.length ||
			values?.name.uz_latin.length ||
			values?.name.uz_kiril.length ||
			values?.name?.en.length ||
			values?.name?.kar.length
		) {
			districtEditData?.id
				? editDistrict({
						...values,
						id: districtEditData.id,
						region_id: regionID,
				})
				: addNewDistrict({ ...values, region_id: regionID })
		}
	}

	React.useEffect(() => {
		// fill forms if clicked edit button
		if (districtEditData?.region_id) {
			setValue('region_id', districtEditData.region_id)
			setValue('name.kar', districtEditData.name.kar)
			setValue('name.ru', districtEditData.name.ru)
			setValue('name.uz_latin', districtEditData.name.uz_latin)
			setValue('name.uz_kiril', districtEditData.name.uz_kiril)
			setValue('name.en', districtEditData.name.en)
		}
		if (!districtEditData?.id) {
			reset({
				region_id: 0,
				name: {
					kar: '',
					ru: '',
					uz_latin: '',
					uz_kiril: '',
					en: '',
				},
			})
		}
	}, [districtEditData?.id, districtEditData?.name])

	React.useEffect(() => {
		// notification messages
		if (addRegionIsSuccess) {
			setSecondDrawer(false)
			message.success('Округ успешно добавлен.')
			reset({
				region_id: 0,
				name: {
					kar: '',
					ru: '',
					uz_latin: '',
					uz_kiril: '',
					en: '',
				},
			})
		}
		if (editRegionIsSuccess) {
			setSecondDrawer(false)
			message.success('Округ успешно изменён.')
			reset({
				region_id: 0,
				name: {
					kar: '',
					ru: '',
					uz_latin: '',
					uz_kiril: '',
					en: '',
				},
			})
		}
	}, [addRegionIsSuccess, editRegionIsSuccess])

	return (
		<Drawer
			title='Округ'
			placement='right'
			onClose={onClose}
			open={secondDrawer}
		>
			<form onSubmit={handleSubmit(handleClickSubmit)}>
				<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
					Русский:
					<input
						className='w-[300px] px-4 py-2 rounded-md border outline-none'
						type='text'
						{...register('name.ru', { required: true })}
					/>
					{errors.name?.ru && errors.name?.ru.type === 'required' && (
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
						{...register('name.kar', { required: true })}
					/>
					{errors.name?.kar && errors.name?.kar.type === 'required' && (
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
						{...register('name.uz_kiril', { required: true })}
					/>
					{errors.name?.uz_kiril &&
						errors.name?.uz_kiril.type === 'required' && (
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
						{...register('name.uz_latin', { required: true })}
					/>
					{errors.name?.uz_latin &&
						errors.name?.uz_latin.type === 'required' && (
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
						{...register('name.en', { required: true })}
					/>
					{errors.name?.en && errors.name?.en.type === 'required' && (
						<span role='alert' className='text-red-500'>
							Пожалуйста, заполните поле Английский
						</span>
					)}
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

export { UiDistrictDrawer }
