<script lang="ts">
	import { onMount } from 'svelte';
	import store from '../store.js';

	let input_string = '';

	let dis = 'flex';

	function handle_blur() {
		dis = 'none';
		console.log('this function is running');
	}

	let my_messages: string[] = [];

	function onSendMessage() {
		store.sendMessage(input_string);
		my_messages.push(input_string);
		my_messages = my_messages;
		input_string = '';
	}
	/* eslint-disable @typescript-eslint/no-explicit-any */
	let messages: any = [];

	onMount(() => {
		store.subscribe((currentMessage) => {
			console.log('recieving the current message: ', currentMessage);
			messages = [...messages, currentMessage];
		});
	});
</script>

<form on:submit={onSendMessage} class="main-container" style="display: {dis}">
	<div class="texts-and-inputs-container">
		<div class="text-container" on:blur={handle_blur}>
			<div class="client-messages">
				client messages
				<hr />
				{#each my_messages as message}
					<p>{message}</p>
				{/each}
			</div>
			<div class="user-messages">
				group messages
				<hr />
				{#each messages as message}
					<p>{message}</p>
				{/each}
			</div>
		</div>
		<div class="inputs-container">
			<input type="text" class="text-box" bind:value={input_string} />
			<div class="button-container">
				<input type="submit" value="Submit Message" class="input-achino" />
			</div>
		</div>
	</div>
</form>

<style>
	.main-container {
		position: absolute;
		left: 0;
		top: 0;
		height: 100vh;
		width: 100vw;
		background-color: black;
	}

	.texts-and-inputs-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 10px;
	}

	/*
	.sidebar-container {
		width: 150px;
		border-right: 1px solid lightslategrey;
		box-shadow: lightslategrey 1px 1px 6px;
		border-radius: 5px;
	}
  */

	/* width */
	::-webkit-scrollbar {
		width: 5px;

		background: black;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: black;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: grey;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: black;
	}

	.text-container {
		display: flex;
		height: 100%;
		overflow: scroll;
		margin-bottom: 35px;
	}

	.client-messages {
		padding: 10px;
		width: 50%;
		color: darksalmon;
	}

	.user-messages {
		padding: 10px;
		text-align: right;
		width: 50%;
		color: darkseagreen;
	}

	.text-box {
		border-top: 1px solid lightslategrey;
		box-shadow: lightslategrey 1px 1px 6px;
		padding: 5px;
		height: 50px;
		width: 90%;
		border-radius: 5px;
		background-color: black;
		color: darkseagreen;
	}

	.input-achino {
		width: 90px;
		height: 40px;
		border-radius: 0.5rem;
		background-color: blanchedalmond;
		border: none;
		box-shadow: blanchedalmond 1px 1px 4px;
	}

	.inputs-container {
		display: flex;
	}

	.button-container {
		width: 10%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
