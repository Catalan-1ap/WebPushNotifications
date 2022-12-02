self.addEventListener("push", (event) => {
	const data = event.data.json();

	event.waitUntil(notify(data));
});


async function notify(data) {
	const allClients = await self.clients.matchAll();

	await self.registration.showNotification(data.title, data.options);
	allClients.forEach(client => {
		client.postMessage({
			receiverId: data.receiverId
		});
	});
}