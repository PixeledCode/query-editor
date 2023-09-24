import { Pencil, Check } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

export const QueryName = ({
	query,
	setQuery,
}: {
	query: {
		title: string
		code: string
	}
	setQuery: React.Dispatch<
		React.SetStateAction<{
			title: string
			code: string
		}>
	>
}) => {
	const [queryName, setQueryName] = React.useState(query.title)
	const [isEditing, setIsEditing] = React.useState(false)

	const { toast } = useToast()

	React.useEffect(() => {
		setQueryName(query.title)
		setIsEditing(false)
	}, [query.title, setQueryName])

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
							setQuery((prev) => ({
								...prev,
								title: queryName,
							}))

							toast({
								title: 'Click on save to update name',
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
