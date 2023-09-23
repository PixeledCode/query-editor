import { CodeBlock } from 'react-code-blocks'
import { Separator } from '../ui/separator'

const savedQueries = [
	{
		title: 'All Users',
		query: `
    query {
      users {
      id
      name
      email
      }
    }`,
	},
	{
		title: 'Customers',
		query: `SELECT CustomerName, City FROM Customers;`,
	},
	{
		title: 'Employees',
		query: `
    query {
      users {
      id
      name
      email
      }
    }`,
	},
]

export const SavedPane = () => {
	return (
		<div className="py-4 pb-0 border-r border-solid border-zinc-300 min-h-[calc(100vh_-_44px)] min-w-[320px]">
			<h2 className="px-4 text-lg font-bold text-start">Saved Queries</h2>
			<Separator className="mt-3" />
			<div className="mt-4 flex flex-col gap-6">
				{savedQueries.map((query) => (
					<button className="flex flex-col gap-2 p-4 hover:bg-indigo-100">
						<h3 className="text-sm font-bold text-start">{query.title}</h3>
						<CodeBlock
							text={query.query.trim()}
							language="sql"
							showLineNumbers={false}
						/>
					</button>
				))}
			</div>
		</div>
	)
}
