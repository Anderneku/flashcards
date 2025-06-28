<script>
	export let answer;
	export let question;
	export let showCardBack;
    import '@fontsource/inter';
</script>


<div class="flip-box-front">


	<div id="image-cont">
		{question}
	</div>
</div>

<div class="flip-box-back" class:conceal-answer={showCardBack}>
	<div id="image-cont2">{answer}</div>
</div>


<style>
	/* Position the front and back side */
	.flip-box-front, .flip-box-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
        border-radius: 30px;
        font-family: "Inter";
        font-size: 25pt;
        box-shadow: 0px -2px 57px -7px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px -2px 57px -7px rgba(0,0,0,0.75);
-moz-box-shadow: 0px -2px 57px -7px rgba(0,0,0,0.75);
	}

	/* Style the front side */
	.flip-box-front {
		background-color: rgb(130, 40, 233);
		color: white;
	}
	
	@keyframes revealTextSlowly {
		to { color: black }
	}
	
	.conceal-answer {
		animation: revealTextSlowly .3s forwards;
	}
	
	/* Style the back side */
	.flip-box-back {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		color: black;
		transform: rotateY(180deg);
	}
	
	#image-cont {
        margin-top: 30px;
        width: 600px;
        height: 400px;
        padding: 10px;
        font-size: 25pt;
        text-align: center;
        word-wrap: break-word;
	}
	#image-cont2 {
        margin-top: 30px;
        width: 600px;
        height: 400px;
        padding: 10px;
        font-size: 25pt;
        text-align: center;
        word-wrap: break-word;
	}

</style>