import { Payment, columns } from './columns'
import { DataTable } from '../ui/data-table'
import React from 'react'

async function getData(): Promise<Payment[]> {
	return [
		{
			id: '728ed52f',
			amount: 100,
			status: 'pending',
			email: 'm@example.com',
		},
	]
}

export function ResultTable() {
	const [data, setData] = React.useState<Payment[]>([])
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		setLoading(true)
		getData().then((data) => {
			setData(data)
			setLoading(false)
		})
	}, [])

	return (
		<div className="container mx-auto py-10">
			{loading ? (
				<div>Loading...</div>
			) : (
				<DataTable columns={columns} data={data} />
			)}
		</div>
	)
}
