<script lang="ts">
	import '../styles/layout.css'
	import { API_URL } from '$lib/config/constants'
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import Header from '$lib/components/header/header.svelte'
	import { Footer } from '$lib/components/footer'

	const queryClient = new QueryClient()

	let { children } = $props()
</script>

<svelte:head>
	<link rel="preconnect" href={API_URL} />
	<title>Котики</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<Header />
	<div class="container min-h-[calc(100vh-var(--header-height))]">
		{@render children()}
	</div>
	<Footer />
</QueryClientProvider>

<style lang="postcss">
	@reference "../styles/layout.css";

	.container {
		@apply mx-auto flex w-full flex-col py-6 xl:py-8;

		/** Gradually add padding on the sides */
		@apply max-w-[calc(var(--breakpoint-xl)+var(--spacing)*6)] px-3;
	}
</style>
