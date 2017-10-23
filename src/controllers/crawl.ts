import * as cheerio from "cheerio";
import { Builder, By, Key, until, Capabilities } from "selenium-webdriver";
import * as winston from "winston";
import { Response, Request, NextFunction } from "express";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";
import { default as TelegramUser, Subscription, TelegramUserModel } from "../models/TelegramUser";

export let getCrawl = (req: Request, res: Response) => {

    const funcCallBack = function (msg: string) {
        res.send(msg);
    };

    crawl(funcCallBack);
};
export let crawl = function (callback: (msg: string) => void) {

    const driver = new Builder()
        .withCapabilities(Capabilities.phantomjs())
        .build();

    driver.get("http://minitoon.net/bbs/board.php?bo_table=9999&page=1");
    driver.findElement(By.id("gall_ul")).getAttribute("innerHTML").then((html: string) => {
        const $ = cheerio.load(html);
        const $el = $(".gall_con");
        $el.each((i, el) => {
            let title, ep, url, date;
            const primaryKey = { titleId: "" };
            const json = { titleId: "", title: "", ep: "", url: "", date: "" };
            const data = $(el);
            const titleId = data.find(".list_subject").text().trim();
            const epMatch = titleId.match(/\d*(화|권)/g);
            if (Array.isArray(epMatch)) {
                ep = +epMatch[0].match(/^\d*/g); // string to int >> + "123"
            } else {
                ep = 0;
            }
            title = titleId.replace(/\d*(화|권)/g, "").trim();
            url = data.find(".gall_href > a").attr("href").trim();

            data.find(".gall_text_href").next().children().remove(); // <span>등록일</>

            date = data.find(".gall_text_href").next().text();
            if (date.indexOf(":") > 0) {
                // date = today
            }

            const maruManga = new MaruManga({
                titleId: titleId,
                title: title,
                ep: ep,
                url: url,
                date: date
            });
            winston.log("info", "maruManga saved", { anyString: ep });

            maruManga.save().then(function (doc) {
                winston.log("info", "Mongoose saved", { anyString: doc.get("title") });
            });
        });

        callback("Done");
    });

    driver.quit();
};
