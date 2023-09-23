import React from 'react'
import { DataTable } from '../ui/data-table'
import { Button } from '../ui/button'
import { ArrowUpDown } from 'lucide-react'

export function ResultTable({ data }: any) {
	// create columns from data
	const columns = React.useMemo<any>(() => {
		if (!data.length) return []
		return (
			Object.keys(data[0])
				.map((value) => {
					// skip picture column
					if (['picture', 'photo', 'notes'].includes(value)) return
					return {
						accessorKey: value,
						header: ({ column }: any) => {
							return (
								<Button
									variant="ghost"
									onClick={() =>
										column.toggleSorting(column.getIsSorted() === 'asc')
									}
								>
									{value}
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							)
						},
					}
				})
				// remove undefined values
				.filter((n) => n)
		)
	}, [data])

	return (
		<div className="mx-auto py-6">
			<DataTable columns={columns} data={data} />
		</div>
	)
}
