import * as crawlController from "./src/controllers/crawl";

const puts = require("sys").puts;

setInterval(function () {
    puts("hello");
}, 500);

process.addListener("SIGINT", function () {
    puts("good-bye");
    process.exit(0);
});