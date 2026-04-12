<script lang="ts">
	import { cn } from '$lib/utils'
	import IntersectionObserver from 'svelte-intersection-observer'
	import type { HTMLImgAttributes, HTMLAttributes } from 'svelte/elements'

	export type ImageProps = {
		src: string
		alt?: string
		disableZoom?: boolean
		containerProps?: HTMLAttributes<HTMLDivElement>
		loaded?: boolean
	} & HTMLImgAttributes

	let {
		src,
		alt,
		width,
		height,
		containerProps = {},
		class: imageClasses,
		disableZoom,
		style: propsStyle,
		loaded = $bindable(false),
		...other
	}: ImageProps = $props()
	const {
		class: containerClasses,
		style: containerStyle,
		...otherContainerProps
	} = $derived(containerProps)
	const style = $derived(
		`aspect-ratio: ${width || 'auto'} / ${height || 'auto'};` + (propsStyle || containerStyle)
	)
	let element: HTMLElement | undefined = $state()
	let intersecting: boolean = $state(false)

	const handleLoad = () => {
		loaded = true
	}
</script>

<IntersectionObserver {element} rootMargin="512px" bind:intersecting>
	<div
		{...otherContainerProps}
		class={cn(
			'relative inline-flex h-auto max-w-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-black/3 align-middle transition-opacity',
			containerClasses,
			{ 'cursor-default': disableZoom }
		)}
		style={containerStyle || style}
		data-loaded={loaded}
		bind:this={element}
	>
		{#if intersecting}
			<img
				{...other}
				{src}
				{alt}
				loading="eager"
				onload={handleLoad}
				data-loaded={loaded}
				{style}
				{width}
				{height}
				class={cn(
					'no-drag z-0 h-auto w-full max-w-full opacity-0 transition-all duration-200 data-[loaded="true"]:opacity-100',
					imageClasses
				)}
			/>
		{/if}
	</div>
</IntersectionObserver>
