import React from "react";
import { Dialog } from "primereact/dialog";

interface PrimeModalProps {
	modalStatus: boolean;
	onHideModal: () => void | null;
	closeable?: boolean;
	children: React.ReactNode;
	footer?: React.ReactElement;
	header: string;
	width?: number | string;
}

export const PrimeModal: React.FC<PrimeModalProps> = ({
	modalStatus,
	onHideModal,
	closeable = true,
	children,
	header,
	width = 600,
	footer,
}) => {
	return (
		<Dialog
			header={header}
			visible={modalStatus}
			modal
			closable={closeable}
			footer={footer}
			draggable={false}
			style={{ width: `${width}px` }}
			onHide={onHideModal}
			dismissableMask={true}
		>
			{children}
		</Dialog>
	);
};
