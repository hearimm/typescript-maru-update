import * as winston from "winston";
import * as TelegramBot from "node-telegram-bot-api";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";
import { default as TelegramUser, Subscription, TelegramUserModel } from "../models/TelegramUser";

interface Add {
    exec(callback: (resultMsg: string) => void, msg: TelegramBot.Message): void;
}

class AddImpl implements Add {
    exec(callback: (resultMsg: string) => void, msg: TelegramBot.Message): void {
        // TODO: insert 쿼리.
        winston.log("info", "Add exec");
    }
}
