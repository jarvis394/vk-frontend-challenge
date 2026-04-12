<script lang="ts">
</script>

{#snippet link(title: string, href: string)}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="px-4 py-2 transition-colors hover:text-black/52" {href}>{title}</a>
{/snippet}

<footer class="flex h-16 w-full bg-black/3 text-black/32">
	<div class="mx-auto flex w-full max-w-7xl items-center justify-center select-none">
		{@render link('jarvis394', 'https://github.com/jarvis394')}
		<p>•</p>
		{@render link('GitHub', 'https://github.com/jarvis394/vk-frontend-challenge')}
	</div>
</footer>
