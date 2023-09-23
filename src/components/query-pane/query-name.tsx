import { Pencil, Check } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useQueryStore } from '@/lib/store'
import { useToast } from '../ui/use-toast'

export const QueryName = ({
	selectedQuery,
	setNewQueryObject,
	newQueryObject,
}: {
	selectedQuery: {
		title: string
		query: string
	} | null
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
}) => {
	const [queryName, setQueryName] = React.useState(
		selectedQuery ? selectedQuery?.title : newQueryObject.title
	)
	const [isEditing, setIsEditing] = React.useState(false)
	const selectedQueryKey = useQueryStore((state) => state.selectedQuery)
	const updateQuery = useQueryStore((state) => state.updateQuery)

	const { toast } = useToast()

	React.useEffect(() => {
		if (selectedQuery) {
			setQueryName(selectedQuery.title)
		} else {
			setQueryName(newQueryObject.title)
		}
		setIsEditing(false)
	}, [selectedQuery, setQueryName, newQueryObject.title])

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
							if (selectedQuery) {
								updateQuery(selectedQueryKey, queryName, selectedQuery.query)
							} else {
								setNewQueryObject((prev) => ({
									...prev,
									title: queryName,
								}))
							}
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
