import * as XLSX from 'xlsx'

export const exportToExcel = <T>(data: T[]) => {
	const workbook = XLSX.utils.book_new()
	const worksheet = XLSX.utils.json_to_sheet(data)
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
	XLSX.writeFile(workbook, 'data.xlsx')
}
