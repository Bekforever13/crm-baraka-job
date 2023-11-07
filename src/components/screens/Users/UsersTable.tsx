import React from 'react'
import { Table, message, Popconfirm, Select } from 'antd'
import {
	useDeleteUserMutation,
	useEditUserRoleMutation,
	useGetUsersQuery,
} from 'src/store/index.endpoints'
import { BiSolidTrash } from 'react-icons/bi'
import type { ColumnsType } from 'antd/es/table'
import { IUser, TUserRole } from 'src/store/users/Users.types'

const roles = [
	{ value: 1, label: 'super_admin' },
	{ value: 2, label: 'admin' },
	{ value: 3, label: 'worker' },
	{ value: 4, label: 'client' },
]

const UsersTable: React.FC = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { data, isLoading, isError } = useGetUsersQuery(currentPage)
	const [deleteUser, { isSuccess }] = useDeleteUserMutation()
	const [changeRole, { isSuccess: changeRoleIsSuccess }] =
		useEditUserRoleMutation()

	const handleSelectRole = (e: TUserRole) => changeRole(e)

	const columns: ColumnsType<IUser> = [
		{
			title: 'Имя',
			dataIndex: 'full_name',
			key: 'full_name',
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
			width: 200,
			render: (el: string, rec) => (
				<Select
					style={{ width: '100%' }}
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
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, rec) => {
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
		<Table
			loading={isLoading}
			pagination={{
				total: data?.meta.total,
				current: currentPage,
				onChange: page => setCurrentPage(page),
			}}
			rowKey={e => e.id}
			dataSource={data?.data}
			columns={columns}
		/>
	)
}

export { UsersTable }
