<script lang="ts">
	import { cn } from '$lib/utils'
	import type { HTMLAttributes } from 'svelte/elements'

	type FooterProps = HTMLAttributes<HTMLElement>

	let { class: className, ...rest }: FooterProps = $props()
</script>

{#snippet link(title: string, href: string)}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="px-4 py-2 transition-colors hover:text-black/52" {href}>{title}</a>
{/snippet}

<footer {...rest} class={cn('flex h-16 w-full bg-black/3 text-black/32', className)}>
	<div class="mx-auto flex w-full max-w-7xl items-center justify-center select-none">
		{@render link('jarvis394', 'https://github.com/jarvis394')}
		<p>•</p>
		{@render link('GitHub', 'https://github.com/jarvis394/vk-frontend-challenge')}
	</div>
</footer>
