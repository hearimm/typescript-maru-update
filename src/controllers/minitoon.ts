import * as winston from "winston";
import * as TelegramBot from "node-telegram-bot-api";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";
import { default as TelegramUser, Subscription, TelegramUserModel } from "../models/TelegramUser";

export let findMyComics = function (callback: (resultMsg: string) => void, msg: TelegramBot.Message) {

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
};

export let findAllComics = function (callback: (resultMsg: string) => void, msg: TelegramBot.Message) {

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
};
