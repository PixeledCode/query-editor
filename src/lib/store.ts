import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const savedQueries = {
	'all-users': {
		title: 'All Users',
		code: `
    query {
      users {
      id
      name
      email
      }
    }`,
	},
	customers: {
		title: 'Customers',
		code: `SELECT CustomerName, City FROM Customers;`,
	},
	employees: {
		title: 'Employees',
		code: `
    query {
      employees {
        id
        firstName
        lastName
        email
        address
        city
        country
        postalCode
        phone
        fax
        title
        reportsTo
      }
    }`,
	},
}

interface State {
	queries: Record<string, { title: string; code: string }>
	updateQuery: (key: string, title: string, code: string) => void
	selectedQuery: string
	updateSelectedQuery: (key: string) => void
	addNewQuery: (key: string, title: string, code: string) => void
	deleteQuery: (key: string) => void
}

export const useQueryStore = create<State>()(
	persist(
		(set) => ({
			queries: savedQueries,
			selectedQuery: 'customers',
			updateSelectedQuery: (key: string) => set({ selectedQuery: key }),
			updateQuery: (key: string, title: string, code: string) =>
				set((state) => ({
					queries: { ...state.queries, [key]: { title, code } },
				})),
			addNewQuery: (key: string, title: string, code: string) =>
				set((state) => ({
					queries: { ...state.queries, [key]: { title, code } },
				})),
			deleteQuery: (key: string) =>
				set((state) => {
					const { [key]: deleted, ...rest } = state.queries
					console.log(`deleted: ${deleted.title}`)

					return { queries: rest }
				}),
		}),
		{
			name: 'query-storage',
		}
	)
)
