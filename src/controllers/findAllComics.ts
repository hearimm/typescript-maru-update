import * as winston from "winston";
import * as TelegramBot from "node-telegram-bot-api";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";
import { default as TelegramUser, Subscription, TelegramUserModel } from "../models/TelegramUser";
import { FindComicsUtil } from "./findComics";
import { DocumentQuery, Document } from "mongoose";

export class FindAllComics implements FindComicsUtil {
    exec(callback: (resultMsg: string) => void, msg: TelegramBot.Message): void {
        const maruMangaQuery = this.findQuery(msg.text);

        winston.log("info", "query is", { anyString: maruMangaQuery.getQuery() });


        const promise = maruMangaQuery.exec();

        promise.then(function (res: Document[]) {
            res.forEach((doc) => {
                callback(doc.get("titleId") + "\n" + doc.get("url"));
            });
        });
    }

    private findQuery(text: String): DocumentQuery<Document[], Document> {
        return MaruManga.find().select("titleId url ep").where("title", new RegExp(text.trim().replace(" ", ".*")));
    }
}