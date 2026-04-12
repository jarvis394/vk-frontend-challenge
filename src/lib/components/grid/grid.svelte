<script lang="ts">
	let { children } = $props()
</script>

<div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
	{@render children()}
</div>
