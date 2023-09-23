import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Menu } from 'lucide-react'
import React from 'react'
import { SavedPane } from '.'

export const MobilePane = () => {
	const [isOpen, setIsOpen] = React.useState(false)
	return (
		<div className="flex md:hidden">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger onClick={() => setIsOpen((e) => !e)}>
					<span className="sr-only">saved queries</span>
					<Menu />
				</SheetTrigger>
				<SheetContent side="left">
					<SavedPane />
				</SheetContent>
			</Sheet>
		</div>
	)
}