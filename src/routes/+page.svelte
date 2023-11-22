<script>
	import { onMount } from 'svelte';

	let input_string = '';

	// @ts-expect-error tbd
	let conn;

	function send_message() {
		console.log('what is the message:', input_string);
		input_string = '';

		// @ts-expect-error tbd
		conn.send(input_string);
	}

	onMount(() => {
		try {
			const connection = new WebSocket('ws://localhost:3000', 'utf-8');

			const enc = new TextEncoder();
			connection.send(enc.encode('hello'));

			connection.send(enc.encode('hello'));

			connection.addEventListener('message', (message) => {
				input_string = message.toString();
				console.log('incoming message from server: ', message);
			});

			return () => {
				connection.close();
			};
		} catch (e) {
			console.log('there was and error: ', e);
		}
	});
</script>

<div class="container">
	<h1>Prate</h1>
	<input type="text" bind:value={input_string} />
	<button on:click={send_message}>Send Message</button>
</div>

<style>
</style>
