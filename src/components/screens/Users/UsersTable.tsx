import React from 'react'
import { Table, message, Popconfirm, Select } from 'antd'
import {
	useDeleteUserMutation,
	useEditUserRoleMutation,
	useGetUsersQuery,
} from 'src/store/index.endpoints'
import { BiSolidTrash } from 'react-icons/bi'
import type { ColumnsType } from 'antd/es/table'
import { INewUserType, TUserRole } from 'src/store/users/Users.types'
import { useSelectors } from 'src/hooks/useSelectors'

const roles = [
	{ value: 2, label: 'Админ' },
	{ value: 3, label: 'Рабочий' },
	{ value: 4, label: 'Клиент' },
	{ value: 5, label: 'Пользователь' },
]

const UsersTable: React.FC = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { search } = useSelectors()
	const { data, isLoading, isError } = useGetUsersQuery({
		page: currentPage,
		search: search,
	})
	const [deleteUser, { isSuccess }] = useDeleteUserMutation()
	const [changeRole, { isSuccess: changeRoleIsSuccess }] =
		useEditUserRoleMutation()

	const handleSelectRole = (e: TUserRole) => changeRole(e)

	const columns: ColumnsType<INewUserType> = [
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
					value={
						(el === 'admin' && 'Админ') ||
						(el === 'worker' && 'Рабочий') ||
						(el === 'client' && 'Клиент') ||
						(el === 'user' && 'Пользователь')
					}
					onSelect={e =>
						handleSelectRole({ userId: rec.id, roleId: e as string })
					}
					options={roles}
				/>
			),
		},
		{
			title: 'Регион',
			dataIndex: 'region',
			key: 'region',
			render: (_, rec) => rec.region?.name.ru,
		},
		{
			title: 'Округ',
			dataIndex: 'district',
			key: 'district',
			render: (_, rec) => rec.district?.name.ru,
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, rec) => {
				return (
					<Popconfirm
						title='Удалить пользователя?'
						onConfirm={() => {
							if (data?.meta.total && data?.meta.total < 11) {
								setCurrentPage(1)
							}
							deleteUser(rec.id)
						}}
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
				showSizeChanger: false,
			}}
			rowKey={e => e.id}
			dataSource={data?.data}
			columns={columns}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
		/>
	)
}

export { UsersTable }
