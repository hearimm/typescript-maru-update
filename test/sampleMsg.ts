import * as TelegramBot from "node-telegram-bot-api";

class Chat implements TelegramBot.Chat {
    id: number;
    type: string;
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    all_members_are_administrators?: boolean;
    photo?: TelegramBot.ChatPhoto;
    description?: string;
    invite_link?: string;
    pinned_message?: TelegramBot.Message;
    constructor() {
        this.id = 52925068;
        this.type = "private";
    }
}
export class SampleMsg implements TelegramBot.Message {

    message_id: number;
    from?: TelegramBot.User;
    date: number;
    chat: TelegramBot.Chat;
    forward_from?: TelegramBot.User;
    forward_from_chat?: TelegramBot.Chat;
    forward_from_message_id?: number;
    forward_signature?: string;
    forward_date?: number;
    reply_to_message?: TelegramBot.Message;
    edit_date?: number;
    author_signature?: string;
    text?: string;
    entities?: TelegramBot.MessageEntity[];
    audio?: TelegramBot.Audio;
    document?: TelegramBot.Document;
    game?: TelegramBot.Game;
    photo?: TelegramBot.PhotoSize[];
    sticker?: TelegramBot.Sticker;
    video?: TelegramBot.Video;
    voice?: TelegramBot.Voice;
    video_note?: TelegramBot.VideoNote;
    caption?: string;
    contact?: TelegramBot.Contact;
    location?: TelegramBot.Location;
    venue?: TelegramBot.Venue;
    new_chat_members?: TelegramBot.User[];
    left_chat_member?: TelegramBot.User;
    new_chat_title?: string;
    new_chat_photo?: TelegramBot.PhotoSize[];
    delete_chat_photo?: boolean;
    group_chat_created?: boolean;
    supergroup_chat_created?: boolean;
    channel_chat_created?: boolean;
    migrate_to_chat_id?: number;
    migrate_from_chat_id?: number;
    pinned_message?: TelegramBot.Message;
    invoice?: TelegramBot.Invoice;
    successful_payment?: TelegramBot.SuccessfulPayment;

    constructor() {
        this.message_id = 8668;
        this.date = new Date().getTime();
        this.chat = new Chat();
        this.text = "hi what's up";
    }

}