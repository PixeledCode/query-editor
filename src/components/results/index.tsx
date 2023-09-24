import React from 'react'
import { DataTable } from '../ui/data-table'
import { Button } from '../ui/button'
import { ArrowDown, ArrowUp } from 'lucide-react'

export function ResultTable({
	data,
	loading,
}: {
	data: any[]
	loading: boolean
}) {
	// create columns from data
	const columns = React.useMemo<any>(() => {
		if (!data.length) return []
		return (
			Object.keys(data[0])
				.map((value) => {
					// skip few columns that are too big
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
									{column.getIsSorted() === 'asc' ? (
										<ArrowDown className="ml-2 h-4 w-4" />
									) : (
										<ArrowUp className="ml-2 h-4 w-4" />
									)}
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
			{loading ? (
				<div className="flex items-center justify-center">
					<span className=" text-4xl">Loading...</span>
				</div>
			) : (
				<DataTable columns={columns} data={data} />
			)}
		</div>
	)
}
