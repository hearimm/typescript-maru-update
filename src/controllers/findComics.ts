
import * as winston from "winston";
import * as TelegramBot from "node-telegram-bot-api";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";
import { default as TelegramUser, Subscription, TelegramUserModel } from "../models/TelegramUser";

export interface FindComicsUtil {
    exec(callback: (resultMsg: string) => void, msg: TelegramBot.Message): void;
}
