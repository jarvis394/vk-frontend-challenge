import type { TheCatAPI } from '@thatapicompany/thecatapi'

export type FavoriteCat = Awaited<ReturnType<TheCatAPI['images']['searchImages']>>[number] & {
	favoritedAt?: number
}
