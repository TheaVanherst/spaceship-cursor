<script>
	import SpaceshipCursor 	from "$lib/spaceshipCursor.svelte";
    import Background from "../components/background.svelte";

    import { deviceType, screenSize, scrollPos } from "$lib/writables.js";

    import Device from "svelte-device-info";
    import { onMount } from "svelte";

    onMount(async () => {
        switch (true) {
            case Device.isPhone:  	$deviceType = 0; break;
            case Device.isTablet: 	$deviceType = 1; break;
            default:      			$deviceType = 2; break;}
    });
    // prevents rendering on anything that isn't a desktop device.
</script>

<svelte:head>
	<title></title>
</svelte:head>

<svelte:window bind:innerWidth={$screenSize} bind:scrollY={$scrollPos} />

<Background/>

{#if $deviceType === 2}
	<SpaceshipCursor/>
{/if}

<div class="body">
	<h1>Javascript Spaceship Cursor</h1>
	<p>Move the cursor to demo the cursor trail.</p>
</div>


<style>
	.body {
		padding: 15px;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.body > * {
		position: 	relative;
		display: 	flex;
		width: 		max-content;
	}
</style>