<script lang="ts">
	import { Grid } from '$lib/components/grid'
</script>

<Grid>
	{#each { length: 12 } as _, i (i)}
		<div class="aspect-square w-full rounded-sm bg-black/3"></div>
	{/each}
</Grid>
