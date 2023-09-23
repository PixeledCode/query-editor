import { Separator } from '../ui/separator'
import { useQueryStore } from '@/lib/store'

export const SavedPane = () => {
	const queries = useQueryStore((state) => state.queries)
	const updateSelectedQuery = useQueryStore(
		(state) => state.updateSelectedQuery
	)

	return (
		<div className="py-4 pb-0 border-r border-solid border-zinc-300 min-h-[calc(100vh_-_44px)] min-w-[320px]">
			<h2 className="px-4 text-lg font-bold text-start">Saved Queries</h2>
			<Separator className="mt-3" />
			<div className="mt-4 flex flex-col gap-6">
				{Object.keys(queries).map((key) => (
					<button
						className="flex flex-col gap-2 p-4 hover:bg-indigo-100 text-start"
						onClick={() => {
							console.log(key)
							updateSelectedQuery(key)
						}}
						key={key}
					>
						<h3 className="text-sm font-bold text-start">
							{queries[key].title}
						</h3>

						<pre className=" overflow-auto pb-3">
							{queries[key].query.trim()}
						</pre>
					</button>
				))}
			</div>
		</div>
	)
}
