<script lang="ts">
	import { onMount } from 'svelte';
	import store from '../store.js';

	import { DarkMode, Textarea, P, Alert, ToolbarButton, Navbar, NavBrand } from 'flowbite-svelte';
	import { ImageOutline, FaceGrinOutline, PapperPlaneOutline } from 'flowbite-svelte-icons';

	let input_string = '';
	let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';

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

<form on:submit={onSendMessage} class="main-form">
	<Navbar>
		<NavBrand href="/">
			<img src="/bottleWhite.svg" class="top-left me-3 h-6 sm:h-9" alt="Prate Logo" />
		</NavBrand>
		<div class="top-right flex items-center md:order-2">
			<DarkMode {btnClass} />
		</div>
	</Navbar>

	<div class="main-body">
		<div class="upper-left">
			<P>User</P>
			<hr />
			{#each my_messages as message}
				<P class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
					{message}
				</P>
			{/each}
		</div>

		<div class="upper-right">
			<P>Client</P>
			<hr />
			{#each messages as message}
				<P class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
					{message}
				</P>
			{/each}
		</div>
	</div>
	<div class="bottom-text-submit">
		<label for="chat" class="sr-only">Your message</label>
		<Alert color="dark" class="px-3 py-2">
			<svelte:fragment slot="icon">
				<ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400">
					<ImageOutline class="h-5 w-5" />
					<span class="sr-only">Upload image</span>
				</ToolbarButton>
				<ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400">
					<FaceGrinOutline class="h-5 w-5" />
					<span class="sr-only">Add emoji</span>
				</ToolbarButton>
				<Textarea
					id="chat"
					class="mx-4"
					rows="1"
					placeholder="Your message..."
					bind:value={input_string}
				/>
				<ToolbarButton
					type="submit"
					color="blue"
					class="rounded-full text-primary-600 dark:text-primary-500"
				>
					<PapperPlaneOutline class="h-5 w-5 rotate-45" on:click={onSendMessage} />
					<span class="sr-only">Send message</span>
				</ToolbarButton>
			</svelte:fragment>
		</Alert>
	</div>
</form>

<style>
	.main-form {
		position: absolute;
		left: 0;
		top: 0;
		height: 100vh;
		width: 100vw;
		overflow: hidden;

		display: flex;
		flex-direction: column;
	}
	.main-body {
		display: grid;
		grid-template-areas:
			'upper-left upper-right'
			'bottom-text-submit bottom-text-submit';
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: 100%;
		width: 100%;
	}

	.upper-left {
		grid-area: upper-left;
		padding: 1rem;
	}
	.upper-right {
		padding: 1rem;
		grid-area: upper-right;
	}

	.bottom-text-submit {
		grid-area: bottom-text-submit;
	}
</style>
