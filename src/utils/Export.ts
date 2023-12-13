import * as XLSX from 'xlsx'
/* eslint-disable-next-line   */
const flattenObject = (obj: any, parentKey = ''): any => {
	/* eslint-disable-next-line   */
	return Object.keys(obj).reduce((acc: any, key) => {
		const newKey = parentKey ? `${parentKey}.${key}` : key
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			Object.assign(acc, flattenObject(obj[key], newKey))
		} else {
			acc[newKey] = obj[key]
		}
		return acc
	}, {})
}

export const exportToExcel = <T>(data: T[]): void => {
	// Flatten the deep objects
	const flattenedData = data.map(obj => flattenObject(obj))

	const worksheet = XLSX.utils.json_to_sheet(flattenedData)
	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1')
	XLSX.writeFile(workbook, 'Data.xlsx')
}
