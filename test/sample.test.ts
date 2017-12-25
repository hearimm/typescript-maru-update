import { } from "jest";
import * as supertest from "supertest";
import * as saveMyComics from "../src/controllers/saveMyComics";
import { SaveMyComics } from "../src/controllers/saveMyComics";
import { SampleMsg } from "./sampleMsg";


const sum = saveMyComics.sum;
let classObj: SaveMyComics;
const msg = new SampleMsg();

test("undefined class", () => {
    classObj = undefined;
    expect(classObj).toBeUndefined;
});

test("not undefined class", () => {

    classObj = new SaveMyComics(msg);
    expect(classObj).not.toBeUndefined;
});

test("find my chat id", () => {
    classObj = new SaveMyComics(msg);
    expect(classObj.greet()).toBe("Hello, " + msg.chat.id);
});

test("save update data", () => {
    classObj = new SaveMyComics(msg);
    expect(classObj.exec()).toBe("Hello, " + msg.chat.id);
});


test("sum 1 + 2 test", () => {
    expect(sum(1, 2)).toBe(3);
});