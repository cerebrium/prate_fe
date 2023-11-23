<script>
	import { onMount } from 'svelte';

	let input_string = '';
	let messages = [{ id: Math.random() * 100000, message: 'there is a message here' }];

	let conn;
	let dis = 'flex';

	function handle_blur() {
		dis = 'none';
		console.log('this function is running');
	}

	function send_message() {
		messages.push({ id: Math.random() * 100000, message: input_string });
		messages = messages;
		input_string = '';

		//conn.send(input_string);
	}

	onMount(() => {
		try {
			/*
			const connection = new WebSocket('ws://localhost:3000', 'utf-8');

			const enc = new TextEncoder();
			connection.send(enc.encode('hello'));


			connection.addEventListener('message', (message) => {
				input_string = message.toString();
				console.log('incoming message from server: ', message);
			});

			return () => {
				connection.close();
			};
      */
		} catch (e) {
			console.log('there was and error: ', e);
		}
	});
</script>

<div class="main-container" style="display: {dis}">
	<div class="sidebar-container">Sidebar</div>
	<div class="texts-and-inputs-container">
		<div class="text-container" on:blur={handle_blur}>
			<div class="client-messages">
				{#each messages as message}
					<p id={message.id.toString()}>{message.message}</p>
				{/each}
			</div>
			<div class="user-messages">
				{#each messages as message}
					<p id={(message.id + 100000).toString()}>{message.message}</p>
				{/each}
			</div>
		</div>
		<div class="inputs-container">
			<textarea class="text-box" bind:value={input_string} />
			<div class="button-container">
				<button on:click={send_message}>Submit Message</button>
			</div>
		</div>
	</div>
</div>

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

	.sidebar-container {
		width: 150px;
		border-right: 1px solid lightslategrey;
		box-shadow: lightslategrey 1px 1px 6px;
		border-radius: 5px;
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

	button {
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
