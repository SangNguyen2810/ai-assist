import React, { useMemo } from "react";
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

	const content = useMemo(() => {
		if (status.isChecking) {
			return <CheckingStatus />;
		} else if (!status.isConnected) {
			return <ErrorStatus message={status.error || "Unknown error"} />;
		} else {
			return <SuccessStatus modelName={status.modelInfo || "Unknown"} />;
		}
	}, [status]);


	return <section className="flex-0">{content}</section>;
};

export default React.memo(MessageStatus);
