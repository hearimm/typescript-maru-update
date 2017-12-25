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

        maruMangaQuery.exec(function (err: any, res: Document[]) {
            this.printLogQueryExec(err, res);
            this.resultCallBack(res, callback);
        });
    }

    private findQuery(text: String): DocumentQuery<Document[], Document> {
        return MaruManga.find().select("titleId url ep").where("title", new RegExp(text.trim().replace(" ", ".*")));
    }

    private resultCallBack(res: Document[], callback: (resultMsg: string) => void) {
        res.forEach((doc) => {
            callback(doc.get("titleId") + "\n" + doc.get("url"));
        });
    }

    private printLogQueryExec(err: any, res: Document[]) {
        if (err) {
            winston.log("error", "error msg is ", { anyString: err });
        }
        else {
            winston.log("info", "findAllComics msg is ", { anyString: res });
        }
    }
}