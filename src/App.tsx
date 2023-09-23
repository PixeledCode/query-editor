import { Github } from 'lucide-react'
import Editor from 'react-simple-code-editor'
import { Separator } from './components/ui/separator'
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism.css'
import React from 'react'
import { ResultTable } from './components/results'
import { QueryHeader } from './components/query-pane'
import { SavedPane } from './components/saved-pane'
import { useQueryStore } from './lib/store'

function App() {
	const [tableData, setTableData] = React.useState([]) as any[]
	const [code, setCode] = React.useState('')

	const queries = useQueryStore((state) => state.queries)
	const selectedQueryKey = useQueryStore((state) => state.selectedQuery)
	const selectedQuery = queries[selectedQueryKey]

	React.useEffect(() => {
		setCode(selectedQuery?.query.trim() || '')
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
			<main className="flex">
				<SavedPane />
				<div className="w-[calc(100%_-_320px)]">
					<QueryHeader
						setTableData={setTableData}
						selectedQuery={selectedQuery}
						code={code}
					/>
					<Separator className="mt-4" />
					<div>
						<Editor
							value={code}
							onValueChange={(code) => {
								setCode(code)
							}}
							highlight={(code) => highlight(code, languages.sql)}
							padding={10}
							style={{
								fontFamily: '"Fira code", "Fira Mono", monospace',
								fontSize: 12,
								height: '400px',
								overflow: 'scroll',
							}}
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
