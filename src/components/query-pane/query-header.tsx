import { Play, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { QueryName } from './query-name'
import React from 'react'
import { useQueryStore } from '@/lib/store'
import { MobilePane } from '../saved-pane/mobile'
import { Separator } from '../ui/separator'

type HeaderProps = {
	setFile: React.Dispatch<React.SetStateAction<string>>
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
	randomFileName: () => string
}

export const QueryHeader = ({
	query,
	setQuery,
	setFile,
	randomFileName,
}: HeaderProps) => {
	const { toast } = useToast()

	const selectedQueryKey = useQueryStore((state) => state.selectedQuery)
	const updateQuery = useQueryStore((state) => state.updateQuery)
	const updateSelectedQuery = useQueryStore(
		(state) => state.updateSelectedQuery
	)

	return (
		<section className="flex items-center flex-wrap gap-2 justify-between mt-4 px-4">
			<div className="flex items-center gap-3">
				<MobilePane />
				<QueryName query={query} setQuery={setQuery} />
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
						<div className="flex items-center gap-2">
							<Plus size={16} />
							<span>Create</span>
						</div>
					</Button>

					<Button
						variant="secondary"
						size="sm"
						onClick={() => {
							if (selectedQueryKey) {
								updateQuery(selectedQueryKey, query.title, query.code)
							} else {
								const newQueryId = idByName(query.title)
								updateQuery(newQueryId, query.title, query.code)
								updateSelectedQuery(newQueryId)

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

function idByName(name: string) {
	const slugged = name
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')

	return `${slugged}-${new Date().valueOf()}`
}
