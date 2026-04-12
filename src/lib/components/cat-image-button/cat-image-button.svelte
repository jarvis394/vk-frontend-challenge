<script lang="ts">
	import type { TheCatAPI } from '@thatapicompany/thecatapi'
	import { Image } from '$lib/components/image'
	import Heart from '../svg/heart.svelte'
	import HeartFilled from '../svg/heart-filled.svelte'
	import { db } from '$lib/db'
	import { liveQuery } from 'dexie'

	type CatImageButtonProps = {
		data: Awaited<ReturnType<TheCatAPI['images']['searchImages']>>[number]
	}

	let { data }: CatImageButtonProps = $props()

	let isFavorite = $state(false)

	$effect(() => {
		const observable = liveQuery(() => db.favorites.get(data.id))
		const subscription = observable.subscribe({
			next: (val) => {
				isFavorite = !!val
			}
		})
		return () => subscription.unsubscribe()
	})

	async function handleLike() {
		if (isFavorite) {
			await db.favorites.delete(data.id)
		} else {
			await db.favorites.add($state.snapshot(data))
		}
	}
</script>

<div class="cat-image-button">
	<Image
		src={data.url}
		height={data.height}
		width={data.width}
		containerProps={{ class: 'size-full' }}
		alt="Cat"
		class="animate-fade size-full object-cover"
	/>
	<button class="like-button" onclick={handleLike} aria-label="Like" title="Like">
		{#if isFavorite}
			<HeartFilled class="size-6" />
		{:else}
			<Heart class="size-6" />
		{/if}
	</button>
</div>

<style lang="postcss">
	@reference "../../../styles/layout.css";

	.cat-image-button {
		@apply relative aspect-square size-full cursor-pointer overflow-hidden rounded-sm bg-white text-black transition-all duration-200;
		@apply hover:scale-105 hover:shadow-md hover:[&>.like-button]:opacity-100;
	}

	.like-button {
		@apply absolute right-3 bottom-3 cursor-pointer overflow-hidden rounded-full p-3 text-red-500 opacity-0 drop-shadow-sm transition-all duration-200;
		@apply hover:bg-red-500/12;
		@apply active:bg-red-500/32 active:duration-50;
	}
</style>
