import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useQueryStore } from '@/lib/store'

export const SavedPane = ({
	setIsOpen,
}: {
	setIsOpen?: (e: boolean) => void
}) => {
	const queries = useQueryStore((state) => state.queries)
	const selectedQuery = useQueryStore((state) => state.selectedQuery)
	const deleteQuery = useQueryStore((state) => state.deleteQuery)
	const updateSelectedQuery = useQueryStore(
		(state) => state.updateSelectedQuery
	)

	return (
		<div className="pt-4 border-r border-solid border-zinc-300 min-h-[calc(100vh_-_44px)] w-[320px]">
			<h2 className="px-4 text-lg font-bold text-start">Saved Queries</h2>
			<Separator className="mt-3" />
			<div className="mt-4 flex flex-col gap-6 max-h-[calc(100vh_-_128px)] overflow-y-auto">
				{Object.keys(queries).map((key) => (
					<div className="relative group">
						<div className="absolute top-0 right-0 hidden group-hover:block">
							<Button
								size="icon"
								variant="ghost"
								onClick={() => {
									deleteQuery(key)
									if (selectedQuery === key)
										updateSelectedQuery(Object.keys(queries)[0])
								}}
							>
								<Trash2 size={16} color="crimson" />
								<span className="sr-only">Delete Query</span>
							</Button>
						</div>
						<button
							className="flex flex-col gap-2 p-4 hover:bg-indigo-100 text-start w-full"
							onClick={() => {
								updateSelectedQuery(key)
								setIsOpen && setIsOpen(false)
							}}
							key={key}
						>
							<h3 className="text-sm font-bold text-start">
								{queries[key].title}
							</h3>

							<pre className="w-full overflow-auto pb-3">
								{queries[key].query.trim()}
							</pre>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
