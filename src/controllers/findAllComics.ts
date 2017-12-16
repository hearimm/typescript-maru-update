import * as winston from "winston";
import * as TelegramBot from "node-telegram-bot-api";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";
import { default as TelegramUser, Subscription, TelegramUserModel } from "../models/TelegramUser";
import { FindComicsUtil } from "./findComics";

export class FindAllComics implements FindComicsUtil {
    exec(callback: (resultMsg: string) => void, msg: TelegramBot.Message): void {
        const maruMangaQuery = MaruManga.find().select("titleId url ep").where("title", new RegExp(msg.text.trim().replace(" ", ".*")));
        winston.log("info", "query is", { anyString: maruMangaQuery.getQuery() });
        maruMangaQuery.exec(function (err, res) {
            if (err) {
                winston.log("error", "error msg is ", { anyString: err });
            } else {
                winston.log("info", "findAllComics msg is ", { anyString: res });
            }
            res.forEach((doc) => {
                callback(doc.get("titleId") + "\n" + doc.get("url"));
            });
        });
    }
}