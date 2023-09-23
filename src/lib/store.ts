import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const savedQueries = {
	'all-users': {
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
	customers: {
		title: 'Customers',
		query: `SELECT CustomerName, City FROM Customers;`,
	},
	employees: {
		title: 'Employees',
		query: `
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
	queries: Record<string, { title: string; query: string }>
	updateQuery: (key: string, title: string, query: string) => void
	selectedQuery: string
	updateSelectedQuery: (key: string) => void
	addNewQuery: (key: string, title: string, query: string) => void
	deleteQuery: (key: string) => void
}

export const useQueryStore = create<State>()(
	persist(
		(set) => ({
			queries: savedQueries,
			selectedQuery: 'customers',
			updateSelectedQuery: (key: string) => set({ selectedQuery: key }),
			updateQuery: (key: string, title: string, query: string) =>
				set((state) => ({
					queries: { ...state.queries, [key]: { title, query } },
				})),
			addNewQuery: (key: string, title: string, query: string) =>
				set((state) => ({
					queries: { ...state.queries, [key]: { title, query } },
				})),
			deleteQuery: (key: string) =>
				set((state) => {
					const { [key]: deleted, ...rest } = state.queries
					return { queries: rest }
				}),
		}),
		{
			name: 'query-storage',
		}
	)
)
