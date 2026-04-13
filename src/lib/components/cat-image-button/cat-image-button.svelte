<script lang="ts">
	import type { TheCatAPI } from '@thatapicompany/thecatapi'
	import { Image } from '$lib/components/image'
	import Heart from '../svg/heart.svelte'
	import HeartFilled from '../svg/heart-filled.svelte'
	import { db } from '$lib/db'
	import { liveQuery } from 'dexie'
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils'

	type CatImageButtonProps = {
		data: Awaited<ReturnType<TheCatAPI['images']['searchImages']>>[number]
	} & HTMLAttributes<HTMLElement>

	const { data, class: className, ...rest }: CatImageButtonProps = $props()
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
			await db.favorites.add({
				...$state.snapshot(data),
				favoritedAt: Date.now()
			})
		}
	}
</script>

<div {...rest} class={cn('cat-image-button', className)} data-favorite={isFavorite}>
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
			<HeartFilled class="animate-fade size-6" />
		{:else}
			<Heart class="size-6" />
		{/if}
	</button>
</div>

<style lang="postcss">
	@reference "../../../styles/layout.css";

	.cat-image-button {
		@apply relative aspect-square size-full cursor-pointer overflow-hidden rounded-sm bg-white text-black transition-all duration-200;
		@apply is-touch:[&>.like-button]:opacity-100;
		@apply border-[0.5px] border-black/3;
	}

	.cat-image-button:hover {
		@apply scale-105 shadow-md [&>.like-button]:opacity-100;
	}

	.cat-image-button:focus-within {
		@apply shadow-md [&>.like-button]:opacity-100;
	}

	.cat-image-button[data-favorite='true'] {
		@apply [&>.like-button]:opacity-100;
	}

	.like-button {
		@apply right-2 bottom-2 sm:right-3 sm:bottom-3;
		@apply absolute cursor-pointer overflow-hidden rounded-full p-3 text-red-500 opacity-0 drop-shadow-sm transition-all duration-200;
		@apply hover:bg-red-500/12;
		@apply active:bg-red-500/32 active:duration-50;
		@apply outline-0 focus-visible:bg-red-500/32;
	}
</style>
