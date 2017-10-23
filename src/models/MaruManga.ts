import * as mongoose from "mongoose";

export type MaruMangaModel = mongoose.Document & {
    titleId: string,
    title: string,

    ep: Number,
    url: string,
    date: string
};


const maruMangaSchema = new mongoose.Schema({
    titleId: { type: String, unique: true },
    title: String,

    ep: Number,
    url: String,
    date: String
});

const MaruManga = mongoose.model("MaruManga", maruMangaSchema);
export default MaruManga;
