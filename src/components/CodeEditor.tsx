import Editor from 'react-simple-code-editor'
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism.css'

export const CodeEditor = ({
	code,
	setCode,
	setNewQueryObject,
	isNewQuery,
}: {
	code: string
	setCode: React.Dispatch<React.SetStateAction<string>>
	setNewQueryObject: React.Dispatch<
		React.SetStateAction<{
			title: string
			query: string
		}>
	>

	isNewQuery: boolean
}) => {
	return (
		<Editor
			value={code}
			onValueChange={(code) => {
				if (isNewQuery) {
					setNewQueryObject((prev) => ({
						...prev,
						query: code,
					}))
				}
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
	)
}