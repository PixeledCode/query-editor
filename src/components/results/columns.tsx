import { ArrowUpDown } from 'lucide-react'
import { Button } from '../ui/button'

export const columns = [
	{
		accessorKey: 'categoryID',
		header: 'Category ID',
	},
	{
		accessorKey: 'categoryName',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
]
