<script lang="ts">
	import { cn } from '$lib/utils'
	import type { HTMLAttributes } from 'svelte/elements'

	type GridProps = HTMLAttributes<HTMLElement>

	const { class: className, children, ...rest }: GridProps = $props()
</script>

<div
	{...rest}
	class={cn('grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-6', className)}
>
	{@render children?.()}
</div>
