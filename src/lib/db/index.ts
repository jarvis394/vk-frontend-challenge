import Dexie, { type EntityTable } from 'dexie'
import type { FavoriteCat } from '../types/Cat'

export class CatDatabase extends Dexie {
	favorites!: EntityTable<FavoriteCat, 'id'>

	constructor() {
		super('CatDatabase')
		this.version(2).stores({
			favorites: 'id, favoritedAt'
		})
	}
}

export const db = new CatDatabase()
