import { Play } from 'lucide-react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { QueryName } from './query-name'
import React from 'react'
import Papa from 'papaparse'
import { useQueryStore } from '@/lib/store'

const availableTables = [
	'categories',
	'customers',
	'employees',
	'order_details',
	'orders',
	'products',
	'suppliers',
]

function randomFileName() {
	return availableTables[Math.floor(Math.random() * availableTables.length)]
}

type HeaderProps = {
	setTableData: React.Dispatch<React.SetStateAction<any[]>>
	selectedQuery: {
		title: string
		query: string
	}
	code: string
}

export const QueryHeader = ({
	setTableData,
	selectedQuery,
	code,
}: HeaderProps) => {
	const [file, setFile] = React.useState(randomFileName)
	const { toast } = useToast()

	const selectedQueryKey = useQueryStore((state) => state.selectedQuery)
	const updateQuery = useQueryStore((state) => state.updateQuery)

	React.useEffect(() => {
		Papa.parse(`/csv/${file}.csv`, {
			header: true,
			download: true,
			dynamicTyping: true,
			skipEmptyLines: true,
			complete: function (results) {
				setTableData(results.data)
			},
		})
	}, [file, setTableData])

	return (
		<section className="flex items-center gap-2 justify-between mt-4 px-4">
			<QueryName selectedQuery={selectedQuery} />
			<div className="flex items-center gap-4">
				<Button
					variant="secondary"
					size="sm"
					onClick={() => {
						updateQuery(selectedQueryKey, selectedQuery.title, code)
						toast({
							title: 'Query saved successfully!',
						})
					}}
				>
					Save
				</Button>
				<Button
					size="sm"
					onClick={() => {
						setFile(randomFileName())
						toast({
							title: 'Query run successfully!',
							variant: 'default',
						})
					}}
				>
					<div className="flex items-center gap-2">
						<Play size="16" />
						<span>Run</span>
					</div>
				</Button>
			</div>
		</section>
	)
}
