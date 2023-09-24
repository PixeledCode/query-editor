import { Github } from 'lucide-react'

export const SiteHeader = () => {
	return (
		<header className="flex items-center py-2 px-4 justify-between text-background bg-foreground">
			<h1 className="text-xl font-bold">Query Editor</h1>
			<a href="https://github.com/pixeledCode/query-editor" target="_blank">
				<Github />
				<span className="sr-only">Github repository for Query Editor</span>
			</a>
		</header>
	)
}
