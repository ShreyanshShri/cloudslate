import { useState, useEffect, useRef } from "react";
import { useSocket } from "../../../../utils/ws_calls/useSocket";
import moment from "moment";

import MessageCard from "./utils/MessageCard";

import "./widgets.css";
import { useParams } from "react-router-dom";

type messageType = {
	sender?: string;
	time?: string;
	message?: string;
};

const Chatbox = () => {
	const { socket, error } = useSocket(localStorage.getItem("token") as string);
	const { id } = useParams();
	const [messageList, setMessageList] = useState<Array<messageType>>([]);
	const [inputVal, setInputVal] = useState<string>("");
	const scrollRef = useRef<any>(null);

	useEffect(() => {
		socket.emit("join-room", { file_id: id });

		socket.on("message", (payload: messageType) => {
			setMessageList((prev: messageType[]) => [...prev, payload]);
		});

		return () => {
			socket.off("message");
		};
	}, [socket]);

	useEffect(() => {
		error !== null && console.log(error);
	}, [error]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messageList]);

	const trySendMsg = (e: any) => {
		if (e.keyCode === 13 && inputVal !== "") {
			setMessageList((prev: messageType[]) => [
				...prev,
				{
					sender: localStorage.getItem("user_id") as string,
					time: moment().format("HH:mm"),
					message: inputVal,
				},
			]);
			socket.emit("message", {
				room: id,
				data: {
					message: inputVal,
				},
			});
			setInputVal("");
			return;
		}
	};

	return (
		<div className="chatbox">
			<div className="message-list">
				{messageList.map((message, index: number) => {
					return (
						<MessageCard
							key={index}
							message={message.message}
							sender={message.sender}
							time={message.time}
						/>
					);
				})}
				<div ref={scrollRef}></div>
			</div>
			<div className="input-wrapper">
				<input
					type="text"
					className="msg-input"
					placeholder="Press enter to send"
					value={inputVal}
					onChange={(e: any) => setInputVal(e.target.value)}
					onKeyUp={trySendMsg}
				/>
			</div>
		</div>
	);
};

export default Chatbox;
