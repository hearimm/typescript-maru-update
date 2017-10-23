import * as mongoose from "mongoose";


export type TelegramUserModel = mongoose.Document & {

    // "chat_id": 1,
    // "start_date": "20171015 11:01",
    // "subscription_list": [
    //     {
    //         "title": "히비키",
    //         "ep": "1"
    //     },
    //     {
    //         "title": "원펀맨",
    //         "ep": "1"
    //     }
    // ]

    chatId: string,
    startDate: Date,
    subscriptions: Subscription[]
};
export type Subscription = {
    title: string,
    ep: number,
    sendDate: Date
};


const telegramUserSchema = new mongoose.Schema({
    chatId: { type: String, unique: true },
    startDate: Date,
    subscriptions: Array
}, { timestamps: true });

const TelegramUser = mongoose.model("TelegramUser", telegramUserSchema);
export default TelegramUser;
