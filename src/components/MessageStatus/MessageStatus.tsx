import React from "react";
import { ConnectionStatus } from "@/types";
import {
	CheckingStatus,
	ErrorStatus,
	SuccessStatus,
} from "./ConnectionStatus/ConnectionStatus";

type MessageStatusProps = {
	status: ConnectionStatus;
};

const MessageStatus: React.FC<MessageStatusProps> = ({ status }) => {
	let content = <></>;
	if (status.isChecking) {
		content = <CheckingStatus />;
	} else if (!status.isConnected) {
		content = <ErrorStatus message={status.error || "Unknown error"} />;
	} else {
		content = <SuccessStatus modelName={status.modelInfo || "Unknown"} />;
	}

	return <section className="flex-0">{content}</section>;
};

export default React.memo(MessageStatus);
