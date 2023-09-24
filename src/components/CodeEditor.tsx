import Editor from 'react-simple-code-editor'
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism.css'

export const CodeEditor = ({
	query,
	setQuery,
}: // code,
// setCode,
// setNewQueryObject,
// isNewQuery,
{
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
	// code: string
	// setCode: React.Dispatch<React.SetStateAction<string>>
	// setNewQueryObject: React.Dispatch<
	// 	React.SetStateAction<{
	// 		title: string
	// 		code: string
	// 	}>
	// >

	// isNewQuery: boolean
}) => {
	return (
		<Editor
			value={query.code}
			onValueChange={(code) => {
				// if (isNewQuery) {
				// 	setNewQueryObject((prev) => ({
				// 		...prev,
				// 		code: code,
				// 	}))
				// }
				setQuery((prev) => ({
					...prev,
					code: code,
				}))
				// setCode(code)
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
	)
}
