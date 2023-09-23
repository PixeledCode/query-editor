import { Pencil, Check } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useQueryStore } from '@/lib/store'
import { useToast } from '../ui/use-toast'

export const QueryName = ({
	selectedQuery,
	queryName,
	setQueryName,
}: {
	selectedQuery: {
		title: string
		query: string
	}
	queryName: string
	setQueryName: React.Dispatch<React.SetStateAction<string>>
}) => {
	const [isEditing, setIsEditing] = React.useState(false)
	const selectedQueryKey = useQueryStore((state) => state.selectedQuery)
	const updateQuery = useQueryStore((state) => state.updateQuery)

	const { toast } = useToast()

	React.useEffect(() => {
		setQueryName(selectedQuery.title)
		setIsEditing(false)
	}, [selectedQuery, setQueryName])

	return (
		<div>
			{isEditing ? (
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={queryName}
						onChange={(e) => setQueryName(e.target.value)}
						className="border rounded-md px-2 py-1"
					/>
					<Button
						size="icon"
						variant="ghost"
						onClick={() => {
							setIsEditing(false)
							updateQuery(
								selectedQueryKey || '',
								queryName,
								selectedQuery.query
							)
							toast({
								title: 'Query name updated successfully!',
							})
						}}
					>
						<span className=" sr-only">Save query name</span>
						<Check size={16} />
					</Button>
				</div>
			) : (
				<div className="flex items-center gap-2">
					<h2 className="text-lg font-bold">{queryName}</h2>
					<Button
						size="icon"
						variant="ghost"
						onClick={() => {
							setIsEditing(true)
						}}
					>
						<span className=" sr-only">Edit query name</span>
						<Pencil size={16} />
					</Button>
				</div>
			)}
		</div>
	)
}
