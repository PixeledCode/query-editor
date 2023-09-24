import Editor from 'react-simple-code-editor'
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism.css'

export const CodeEditor = ({
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
	return (
		<Editor
			value={query.code}
			onValueChange={(code) => {
				setQuery((prev) => ({
					...prev,
					code: code,
				}))
			}}
			highlight={(code) => highlight(code, languages.sql)}
			padding={10}
			aria-label="Code Editor"
			style={{
				fontFamily: '"Fira code", "Fira Mono", monospace',
				fontSize: 12,
				height: '400px',
				overflow: 'scroll',
			}}
		/>
	)
}
