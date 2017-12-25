
import * as TelegramBot from "node-telegram-bot-api";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";
import { default as TelegramUser, Subscription, TelegramUserModel } from "../models/TelegramUser";
import { FindComicsUtil } from "./findComics";
import { DocumentQuery, Document } from "mongoose";

export class SaveMyComics {
    msg: TelegramBot.Message;

    constructor(msg: TelegramBot.Message) {
        this.msg = msg;
    }
    greet() {
        return "Hello, " + this.msg.chat.id;
    }
    exec() {
        // find manga -- mongoose query

        // is that right? -- keyborad query
        // ok save -- mongoose query

    }
    private findQuery(): DocumentQuery<Document[], Document> {
        return MaruManga.find().select("titleId url ep").where("title", new RegExp(this.msg.text.trim().replace(" ", ".*")));
    }

    private save() {
        TelegramUser.findOneAndUpdate(
            { chatId: this.msg.chat.id }
            , { $set: { updateAt: 123 } }
            , { new: true }
            , function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);
            });
    }
}
export function sum(a: number, b: number) {
    return a + b;
}
