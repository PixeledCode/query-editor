import { type ClassValue, clsx } from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const useReportPageLoadMetrics = () => {
	React.useEffect(() => {
		const perfObserver = new PerformanceObserver((observedEntries) => {
			const entry: PerformanceEntry =
				observedEntries.getEntriesByType('navigation')[0]
			console.log('pageload time: ', entry.duration)
		})

		perfObserver.observe({
			type: 'navigation',
			buffered: true,
		})
	}, [])
}
