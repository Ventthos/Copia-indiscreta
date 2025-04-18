export interface MessageState {
    type: "error" | "warning" | "question" | "message" | "correct";
    mode: "waiting" | "accept" | "yesNo" | "retry";
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}