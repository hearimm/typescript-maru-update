import * as winston from "winston";
import * as TelegramBot from "node-telegram-bot-api";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";
import { default as TelegramUser, Subscription, TelegramUserModel } from "../models/TelegramUser";
import { FindComicsUtil } from "./findComics";

export class FindMyComics implements FindComicsUtil {
    exec(callback: (resultMsg: string) => void, msg: TelegramBot.Message): void {

        const userSubscriptionQuery = TelegramUser.findOne()
            .select("subscriptions")
            .where("chatId").equals(msg.chat.id);

        userSubscriptionQuery.exec(function (err, res) {
            if (err) {
                winston.log("err", "errMsg", { err });
            } else {
                winston.log("info", "start", { res });
            }
            // winston.log("info", "start");

            const subList: Subscription[] = res.get("subscriptions");
            const maruMangaQuery = MaruManga.find().select("titleId url ep");
            type QueryObj = {
                title: string,
                ep: { $gt: number }
            };
            subList.forEach(sub => {
                const maruMangaQuery = MaruManga.findOne().select("titleId url ep")
                    .where("title").equals(sub.title)
                    .where("ep").gt(sub.ep);
                winston.log("info", "query is", { anyString: maruMangaQuery.getQuery() });
                maruMangaQuery.exec(function (err, res) {
                    if (res) {
                        callback(res.get("titleId") + "\n" + res.get("url"));
                    }
                });
            });
            winston.log("info", "end");
        });
    }
}


