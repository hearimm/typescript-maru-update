import * as winston from "winston";
import * as TelegramBot from "node-telegram-bot-api";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";
import { default as TelegramUser, Subscription, TelegramUserModel } from "../models/TelegramUser";

export let findMinitoon = function (callback: (resultMsg: string) => void, msg: TelegramBot.Message) {

    const my_manga_list = [
        "빗치 같은 게 아냐", "이세계 온천으로 전생한 내 효능이 너무 쩐다", "해골기사님은 지금 이세계 모험 중", "부덕의 길드", "내 공주구두를 신어줘", "집사들의 침묵", "원펀맨 오리지날", "원펀맨 리메이크", "패러렐 파라다이스", "히비키 -소설가가 되는 방법-", "인어공주의 미안한 식사", "이상적인 기둥서방 생활", "여친, 빌리겠습니다", "미소년 잘 먹겠습니다", "알몸카메라", "노조미X키미오", "마왕을 시작하는 법", "마지널 오퍼레이션", "하면 안 되는 나나코 씨", "아마노 메구미는 빈틈투성이"
    ];

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
        const maruMangaquery = MaruManga.find().select("titleId url ep");
        type QueryObj = {
            title: string,
            ep: { $gt: number }
        };
        subList.forEach(sub => {
            const maruMangaquery = MaruManga.findOne().select("titleId url ep")
                .where("title").equals(sub.title)
                .where("ep").gt(sub.ep);
            winston.log("info", "query is", { anyString: maruMangaquery.getQuery() });
            maruMangaquery.exec(function (err, res) {
                callback(res.get("titleId") + "\n" + res.get("url"));
            });
        });
        winston.log("info", "end");
    });
};
