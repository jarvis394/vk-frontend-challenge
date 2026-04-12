<script lang="ts">
	import { CatImageButton } from '$lib/components/cat-image-button'
	import { Grid } from '$lib/components/grid'
	import SkeletonGrid from '$lib/components/skeleton-grid/skeleton-grid.svelte'
	import { api } from '$lib/config/api'
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import IntersectionObserver from 'svelte-intersection-observer'

	const query = createInfiniteQuery(() => ({
		queryKey: ['cats'],
		queryFn: ({ pageParam }) =>
			api.images.searchImages({ limit: 12, size: 'med', page: pageParam }),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => (lastPage.length > 0 ? allPages.length : undefined),
		staleTime: 1000 * 60 * 5 // 5 minutes
	}))

	let element: HTMLElement | undefined = $state()
	let intersecting = $state(false)

	let isFetching = false
	$effect(() => {
		if (intersecting && query.hasNextPage && !query.isFetchingNextPage && !isFetching) {
			isFetching = true
			query.fetchNextPage().finally(() => {
				isFetching = false
			})
		}
	})
</script>

{#if query.isLoading}
	<SkeletonGrid />
{:else if query.isError}
	<div class="flex items-center justify-center py-12 text-red-500">
		<p class="text-xl">Ошибка: {query.error?.message}</p>
	</div>
{:else if query.data}
	<Grid>
		{#each query.data.pages as page, i (i)}
			{#each page as cat (cat.id)}
				<CatImageButton data={cat} />
			{/each}
		{/each}
	</Grid>

	<IntersectionObserver rootMargin="64px" {element} bind:intersecting>
		<div bind:this={element} class="h-24 w-full">
			{#if query.isFetchingNextPage}
				<div class="flex items-center justify-center py-8">
					<p class="text-md animate-pulse">... загружаем еще котиков ...</p>
				</div>
			{/if}
		</div>
	</IntersectionObserver>
{/if}
