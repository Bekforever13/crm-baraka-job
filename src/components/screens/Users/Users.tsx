import React from 'react'
import { Table, message, Popconfirm, Select } from 'antd'
import {
	useDeleteUserMutation,
	useEditUserRoleMutation,
	useGetUsersQuery,
} from 'src/store/index.endpoints'
import { IRuKarUz } from 'src/store/shared/shared.types'
import { BiSolidTrash } from 'react-icons/bi'
import { IUser, TUserRole } from 'src/store/users/Users.types'

const Users: React.FC = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { data, isLoading, isError } = useGetUsersQuery(currentPage)
	const [deleteUser, { isSuccess }] = useDeleteUserMutation()
	const [changeRole, { isSuccess: changeRoleIsSuccess }] =
		useEditUserRoleMutation()
	const total = data?.meta.total

	const roles = [
		{ value: 1, label: 'super_admin' },
		{ value: 2, label: 'admin' },
		{ value: 3, label: 'user' },
	]

	const handleSelectRole = (e: TUserRole) => {
		changeRole(e)
	}

	const columns = [
		{
			title: 'Имя',
			dataIndex: 'first_name',
			key: 'first_name',
		},
		{
			title: 'Фамилия',
			dataIndex: 'last_name',
			key: 'last_name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Язык',
			dataIndex: 'language',
			key: 'language',
		},
		{
			title: 'Роль',
			dataIndex: 'role',
			key: 'role',
			render: (el: string, rec: IUser) => (
				<Select
					value={el}
					onSelect={e => handleSelectRole({ userId: rec.id, roleId: e })}
					options={roles}
				/>
			),
		},
		{
			title: 'Округ',
			dataIndex: 'district',
			key: 'district',
			render: (el: IRuKarUz) => <>{el.ru}</>,
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			render: (_: unknown, rec: IUser) => {
				return (
					<Popconfirm
						title='Удалить пользователя?'
						onConfirm={() => deleteUser(rec.id)}
						okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
					>
						<BiSolidTrash className='cursor-pointer' size='22' color='red' />
					</Popconfirm>
				)
			},
		},
	]

	React.useEffect(() => {
		if (isSuccess) message.success('Пользователь успешно удалён.')
		if (isError) message.error('Произошла ошибка, повторите попытку.')
		if (changeRoleIsSuccess)
			message.success('Роль пользователя успешно изменён')
	}, [isSuccess, isError, changeRoleIsSuccess])

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<Table
				loading={isLoading}
				pagination={{
					total: total,
					current: currentPage,
					onChange: page => setCurrentPage(page),
				}}
				rowKey={e => e.id}
				dataSource={data?.data}
				columns={columns}
			/>
		</div>
	)
}

export { Users }
