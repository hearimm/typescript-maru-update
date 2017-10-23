import * as cheerio from "cheerio";
import { Builder, By, Key, until, Capabilities } from "selenium-webdriver";
import * as winston from "winston";
import { Response, Request, NextFunction } from "express";
import { default as MaruManga, MaruMangaModel } from "../models/MaruManga";

export let getCrawl = (req: Request, res: Response) => {
    crawl();
    res.send("");
};
export let crawl = function () {

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
                ep = epMatch[0];
            } else {
                ep = "";
            }
            title = titleId.replace(/\d*(화|권)/g, "").trim();
            url = data.find(".gall_href > a").attr("href").trim();

            data.find(".gall_text_href").next().children().remove(); // <span>등록일</>

            date = data.find(".gall_text_href").next().text();
            if (date.indexOf(":") > 0) {
                // date = today;
            }

            const maruManga = new MaruManga({
                titleId: titleId,
                title: title,
                ep: ep,
                url: url,
                date: date
            });

            maruManga.save();
            // Once we have our title, we'll store it to the our json object.
            primaryKey.titleId = titleId;
            json.titleId = titleId;
            json.title = title;
            json.ep = ep;
            json.url = url;
            json.date = date;

            winston.log("info", "Crawler Log Message", { anything: json });

            winston.log("info", "MongoDb Log Message", { anything: primaryKey });

        });
    });

    driver.quit();
};
