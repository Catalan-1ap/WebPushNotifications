import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext.jsx";
import { getMessages } from "../../services/api.js";


function Messages() {
	const { user } = useUser();
	const [messages, setMessages] = useState([]);
	const serviceWorkerListener = useCallback((event) => {
		const receiverId = event.data.receiverId;

		if (receiverId === user.id)
			fetchMessages();
	}, [user]);

	async function fetchMessages() {
		const res = await getMessages(user.id);

		setMessages(res);
	}

	useEffect(() => {
		if (!user.id)
			return;

		fetchMessages();
	}, [user]);

	useEffect(() => {
		navigator.serviceWorker.addEventListener("message", serviceWorkerListener);

		return () => navigator.serviceWorker.removeEventListener("message", serviceWorkerListener);
	}, [serviceWorkerListener]);

	return (
		<>
			{messages.map(message => (
				<div key={message._id} style={{ border: "solid black 1px", padding: "1rem" }}>
					<h4>Title: {message.title}</h4>
					<h5>Body: {message.body}</h5>
				</div>
			))}
		</>
	);
}


export default Messages;