import { Play, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { QueryName } from './query-name'
import React from 'react'
import Papa from 'papaparse'
import { useQueryStore } from '@/lib/store'
import { MobilePane } from '../saved-pane/mobile'
import { Separator } from '../ui/separator'

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
	code: string
	setNewQueryObject: React.Dispatch<
		React.SetStateAction<{
			title: string
			query: string
		}>
	>
	newQueryObject: {
		title: string
		query: string
	}
}

export const QueryHeader = ({
	setTableData,
	code,
	newQueryObject,
	setNewQueryObject,
}: HeaderProps) => {
	const { toast } = useToast()

	const queries = useQueryStore((state) => state.queries)
	const selectedQueryKey = useQueryStore((state) => state.selectedQuery)
	const selectedQuery = selectedQueryKey ? queries[selectedQueryKey] : null
	const updateQuery = useQueryStore((state) => state.updateQuery)
	const updateSelectedQuery = useQueryStore(
		(state) => state.updateSelectedQuery
	)
	console.log(newQueryObject)

	const [file, setFile] = React.useState(randomFileName)

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
		<section className="flex items-center flex-wrap gap-2 justify-between mt-4 px-4">
			<div className="flex items-center gap-3">
				<MobilePane />
				<QueryName
					selectedQuery={selectedQuery}
					setNewQueryObject={setNewQueryObject}
					newQueryObject={newQueryObject}
				/>
			</div>

			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<Button
						variant="secondary"
						size="sm"
						onClick={() => {
							updateSelectedQuery('')
						}}
					>
						<Plus size={16} />
						<span className="sr-only">New Query</span>
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onClick={() => {
							if (selectedQuery) {
								updateQuery(selectedQueryKey || '', selectedQuery.title, code)
							} else {
								updateQuery(
									// create a unique id for new query
									`${slugName(newQueryObject.title)}-${new Date().valueOf()}`,
									newQueryObject.title,
									newQueryObject.query
								)
								setNewQueryObject(() => ({
									title: 'New Query',
									query: '',
								}))
								setFile(randomFileName())
							}
							toast({
								title: 'Query saved successfully!',
							})
						}}
					>
						Save
					</Button>
				</div>
				<Separator orientation="vertical" className="h-8" />
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

function slugName(name: string) {
	return name
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
}
