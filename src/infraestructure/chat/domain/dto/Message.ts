export type Message = {
    id: number;
    sender: {id: number, name: string};
    type: "image" | "text";
    text?: string;
    imageUrl?: string;
}