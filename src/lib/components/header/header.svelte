<script lang="ts">
	import { resolve } from '$app/paths'
	import type { RouteId } from '$app/types'
	import { page } from '$app/state'

	const handleClick = (href: RouteId, e: MouseEvent) => {
		if (href === page.route.id) {
			e.preventDefault()
		}
	}
</script>

{#snippet headerButton(title: string, href: RouteId)}
	<a
		class={[
			'text-md hover:bg-primary-700/12 active:bg-primary-700 p-5 px-6 transition-colors select-none active:duration-50',
			page.route.id === href && 'bg-primary-600 hover:bg-primary-600!'
		]}
		href={resolve(href)}
		onclick={handleClick.bind(null, href)}
	>
		{title}
	</a>
{/snippet}

<header
	class="bg-primary-500 fixed top-0 z-50 flex h-(--header-height) w-full text-white shadow-md"
>
	<nav class="mx-auto flex w-full max-w-7xl">
		{@render headerButton('Все котики', '/')}
		{@render headerButton('Любимые котики', '/favorites')}
	</nav>
</header>
<div class="h-(--header-height)"></div>
