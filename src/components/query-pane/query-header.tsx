import { Play } from 'lucide-react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { QueryName } from './query-name'

type HeaderProps = {
	randomFileName: () => string
	setFile: (fileName: string) => void
}

export const QueryHeader = ({ randomFileName, setFile }: HeaderProps) => {
	const { toast } = useToast()

	return (
		<section className="flex items-center gap-2 justify-between mt-4 px-4">
			<QueryName />
			<div className="flex items-center gap-4">
				<Button
					variant="secondary"
					size="sm"
					onClick={() => {
						toast({
							title: 'Query saved successfully!',
						})
					}}
				>
					Save
				</Button>
				<Button
					size="sm"
					onClick={() => {
						setFile(randomFileName())
						toast({
							title: 'Query run successfully!',
							variant: 'default',
						})
					}}
				>
					<div className="flex items-center gap-2">
						<Play size="16" />
						<span>Run</span>
					</div>
				</Button>
			</div>
		</section>
	)
}
