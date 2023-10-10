<script>
    import { deviceType, scrollPos } from "$lib/writables.js";

    const levels = [4,3,2]
</script>

{#if $deviceType > 0}
	<parallax>
		{#each levels as level}
			<div class="spaceBg{level - 1}"
				 style="background-position-y: calc({-$scrollPos * (0.3 * level)}px);"></div>
		{/each}
	</parallax>
{:else}
	<parallax>
		{#each levels as level}
			<div class="spaceBg{level - 1}"></div>
		{/each}
	</parallax>
{/if}

<style lang="scss">
	parallax div {
		width: 		100%;
		top: 		0;
		position: 	fixed;}

	.spaceBg1 {
		-webkit-animation: 	backgroundSpeed1 18s linear infinite;
		animation: 			backgroundSpeed1 18s linear infinite;
		background-image: 	url("stars1.gif");

		background-position-x: 0;
		height: calc(100vh + 234px);

		position: 	fixed;
		z-index:   	-3;
		opacity: 	0.5;
	}
	.spaceBg2 {
		-webkit-animation: 	backgroundSpeed2 18s linear infinite;
		animation: 			backgroundSpeed2 18s linear infinite;
		background-image: 	url("stars2.gif");

		background-position-x: 250px;
		height: calc(100vh + 400px);

		position: 	fixed;
		z-index:   	-2;
		opacity: 	0.7;
	}
	.spaceBg3 {
		-webkit-animation: 	backgroundSpeed1 18s linear infinite;
		animation: 			backgroundSpeed1 18s linear infinite;
		background-image: 	url("stars1.gif");

		background-position-x: 355px;
		height: calc(100vh + 234px);

		position: 	fixed;
		z-index:   	-1;
		opacity: 	1;
	}

	@keyframes backgroundSpeed1 {
		0% {  	transform: translateY(-234px);}
		100% {  transform: translateY(0px);} }
	@keyframes backgroundSpeed2 {
		0% {  	transform: translateY(-400px);}
		100% {  transform: translateY(0px);} }
</style>