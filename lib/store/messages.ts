import { create } from "zustand";
import { LIMIT_MESSAGE } from "../constants";

export type IMessage = {
    created_at: string;
    id: string;
    is_edit: boolean;
    send_by: string;
    text: string;
    users: {
        avatar_url: string;
        created_at: string;
        display_name: string;
        id: string;
    } | null;
};

interface MessageState {
    hasMore: boolean;
    page: number;
    messages: IMessage[];
    addMessage: (_message: IMessage) => void;
    actionMessage: IMessage | undefined;
    setActionMessage: (_message: IMessage | undefined) => void;
    optimisticDeleteMessage: (_messageId: string) => void;
    optimisticEditMessage: (_messageId: IMessage) => void;
    optimisticIds: string[];
    setOtpimisticId: (_id: string) => void;
    setMessages: (_messages: IMessage[]) => void;
}

export const useMessage = create<MessageState>()((set) => ({
    hasMore: true,
    page: 1,
    messages: [],
    actionMessage: undefined,
    optimisticIds: [],
    setOtpimisticId: (id: string) =>
        set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
    addMessage: (newMessage: IMessage) =>
        set((state) => ({
            messages: [...state.messages, newMessage],
        })),
    setActionMessage: (message: IMessage | undefined) =>
        set(() => ({ actionMessage: message })),
    optimisticDeleteMessage: (messageId) =>
        set((state) => {
            return {
                messages: state.messages.filter((message) => message.id !== messageId),
            };
        }),
    optimisticEditMessage: (updatedMessage) =>
        set((state) => {
            return {
                messages: state.messages.filter((message) => {
                    if (message.id === updatedMessage.id) {
                        message.text = updatedMessage.text;
                        message.is_edit = updatedMessage.is_edit;
                    }
                    return message;
                }),
            };
        }),
    setMessages: (messages) => set((state) => ({
        messages: [...messages, ...state.messages],
        page: state.page + 1,
        hasMore: messages.length >= LIMIT_MESSAGE,
    })),
}));
