import React from 'react'
import { CodeEditor } from './components/CodeEditor'
import { SiteHeader } from './components/SiteHeader'
import { QueryHeader } from './components/query-pane'
import { ResultTable } from './components/results'
import { SavedPane } from './components/saved-pane'
import { Separator } from './components/ui/separator'
import { useQueryStore } from './lib/store'
import { useReportPageLoadMetrics } from './lib/utils'

function App() {
	const [tableData, setTableData] = React.useState([]) as any[]
	const [query, setQuery] = React.useState({
		title: '',
		code: '',
	})

	const queries = useQueryStore((state) => state.queries)
	const selectedQueryKey = useQueryStore((state) => state.selectedQuery)
	const selectedQuery = selectedQueryKey ? queries[selectedQueryKey] : null

	React.useEffect(() => {
		if (selectedQuery) {
			setQuery(selectedQuery)
		} else {
			setQuery({
				title: 'New Query',
				code: '',
			})
		}
	}, [selectedQuery])

	// report page load metrics in devtools
	// useReportPageLoadMetrics()

	return (
		<>
			<SiteHeader />
			<main className="md:flex">
				<div className="hidden md:grid">
					<SavedPane />
				</div>

				<div className="md:w-[calc(100%_-_320px)]">
					<QueryHeader
						query={query}
						setQuery={setQuery}
						setTableData={setTableData}
					/>
					<Separator className="mt-4" />
					<div>
						<CodeEditor query={query} setQuery={setQuery} />

						<Separator className="mt-4" />
						<div className="p-4">
							<h2 className="text-lg font-bold text-start">Results</h2>
							<ResultTable data={tableData} />
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default App
