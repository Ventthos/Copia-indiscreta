import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import { MessageWindow } from "../GeneralUse/MessageWindow";

export function OrdersMessageHandler() {
  const { messageState } = useContext(OrderContext);

  return (
    <>
      {messageState && (
        <MessageWindow
          title={messageState.title}
          message={messageState.message}
          mode={messageState.mode}
          type={messageState.type}
          onConfirm={messageState.onConfirm}
          onCancel={messageState.onCancel}
          onRetry={messageState.onRetry}
        />
      )}
    </>
  );
}
