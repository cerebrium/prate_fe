/* eslint-disable @typescript-eslint/no-explicit-any */

import { writable } from 'svelte/store';

const messageStore = writable('');

let socket: any;
try {
	const wsUri =
		((window.location.protocol == 'https:' && 'wss://') || 'ws://') + 'prate.pro:3000' + '/ws';
	socket = new WebSocket(wsUri);
} catch (e) {
	console.log('socket creation error hello: ', e);
}

if (!socket) {
	throw new Error('there is no socket connection');
}

// Connection opened
socket.addEventListener('open', function (_: any) {
	console.log("It's open: ", _);
});

// Listen for messages
socket.addEventListener('message', function (event: any) {
	messageStore.set(event.data);
});

const sendMessage = (message: any) => {
	if (socket.readyState <= 1) {
		socket.send(message);
	}
};

export default {
	subscribe: messageStore.subscribe,
	sendMessage
};
