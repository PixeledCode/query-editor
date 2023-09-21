import { Github, Play } from 'lucide-react'
import Editor from 'react-simple-code-editor'
import './App.css'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'

// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism.css'
import React from 'react'
import { ResultTable } from './components/results'

function App() {
	const [code, setCode] = React.useState(
		`SELECT CustomerName, City FROM Customers; `
	)
	return (
		<>
			<header className="flex items-center py-2 px-4 justify-between text-background bg-foreground">
				<h1 className="text-xl font-bold">Query Editor</h1>
				<a href="https://github.com/pixeledCode/query-editor" target="_blank">
					<Github />
					<span className="sr-only">Github repository for Query Editor</span>
				</a>
			</header>
			<main>
				<div>
					<section className="flex items-center gap-2 justify-between mt-4 px-4">
						<h2 className="text-lg font-bold">Query Name</h2>
						<div className="flex items-center gap-4">
							<Button variant="secondary" size="sm">
								Save
							</Button>
							<Button size="sm">
								<div className="flex items-center gap-2">
									<Play size="16" />
									<span>Run</span>
								</div>
							</Button>
						</div>
					</section>
					<Separator className="mt-4" />
					<div>
						<Editor
							value={code}
							onValueChange={(code) => setCode(code)}
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
							<ResultTable />
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default App
