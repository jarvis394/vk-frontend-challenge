<script lang="ts">
	import { db } from '$lib/db'
	import { liveQuery } from 'dexie'
	import { CatImageButton } from '$lib/components/cat-image-button'
	import { Grid } from '$lib/components/grid'
	import SkeletonGrid from '$lib/components/skeleton-grid/skeleton-grid.svelte'

	const favorites = liveQuery(() => db.favorites.orderBy('favoritedAt').reverse().toArray())
</script>

<svelte:head>
	<title>Любимые котики</title>
</svelte:head>

<div class="flex flex-col gap-6">
	{#if $favorites === undefined}
		<SkeletonGrid />
	{:else if $favorites.length === 0}
		<div class="flex items-center justify-center py-12">
			<p class="text-xl text-gray-400">У вас пока нет любимых котиков.</p>
		</div>
	{:else}
		<Grid>
			{#each $favorites as cat (cat.id)}
				<CatImageButton data={cat} />
			{/each}
		</Grid>
	{/if}
</div>
