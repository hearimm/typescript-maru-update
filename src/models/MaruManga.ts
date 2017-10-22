import * as mongoose from "mongoose";

export type MaruMangaModel = mongoose.Document & {
    titleId: string,
    title: string,

    ep: string,
    url: string,
    date: string
};


const maruMangaSchema = new mongoose.Schema({
    titleId: { type: String, unique: true },
    title: String,

    ep: String,
    url: String,
    date: String
});
