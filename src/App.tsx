import { Github } from 'lucide-react'
import React from 'react'
import { CodeEditor } from './components/CodeEditor'
import { QueryHeader } from './components/query-pane'
import { ResultTable } from './components/results'
import { SavedPane } from './components/saved-pane'
import { Separator } from './components/ui/separator'
import { useQueryStore } from './lib/store'

function App() {
	const [tableData, setTableData] = React.useState([]) as any[]
	const [code, setCode] = React.useState('')
	const [newQueryObject, setNewQueryObject] = React.useState({
		title: 'New Query',
		query: code,
	})

	const queries = useQueryStore((state) => state.queries)
	const selectedQueryKey = useQueryStore((state) => state.selectedQuery)
	const selectedQuery = selectedQueryKey ? queries[selectedQueryKey] : null

	React.useEffect(() => {
		if (selectedQuery) setCode(selectedQuery?.query.trim() || '')
		else setCode('')
	}, [selectedQuery])

	return (
		<>
			<header className="flex items-center py-2 px-4 justify-between text-background bg-foreground">
				<h1 className="text-xl font-bold">Query Editor</h1>
				<a href="https://github.com/pixeledCode/query-editor" target="_blank">
					<Github />
					<span className="sr-only">Github repository for Query Editor</span>
				</a>
			</header>
			<main className="md:flex">
				<div className="hidden md:grid">
					<SavedPane />
				</div>
				<div className="md:w-[calc(100%_-_320px)]">
					<QueryHeader
						setNewQueryObject={setNewQueryObject}
						newQueryObject={newQueryObject}
						setTableData={setTableData}
						code={code}
					/>
					<Separator className="mt-4" />
					<div>
						<CodeEditor
							code={code}
							setCode={setCode}
							setNewQueryObject={setNewQueryObject}
							isNewQuery={selectedQuery === null}
						/>
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
