const express = require("express");
const app = express();

const shortUrl = require("./models/shortUrl");

const mongoose = require("mongoose");
const crypto = require("crypto");

const mongoURL = "mongodb://localhost/urlShortify" || process.env.MONGO_URL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

function generateShortURL(longURL) {
    const hash = crypto.createHash("sha512").update(longURL).digest("hex");
    const shortURL = hash.substring(0, 7); // Extract a portion of the hash for the shortened URL
    return shortURL;
}

// const longURL = "https://example.com/very/long/url";
// const shortenedURL = generateShortURL(longURL);
// console.log(shortenedURL);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const shorturls = await shortUrl.find();
    res.render("index", { shortUrls: shorturls });
});

app.post("/shortUrls", async (req, res) => {
    console.log(req.body.fullurl.length);
    const longURL = req.body.fullurl;
    const shortenedURL = generateShortURL(longURL);
    console.log(shortenedURL);

    if (req.body.fullurl.length === 0) {
        return res.redirect("/");
    }
    await shortUrl.create({
        full: req.body.fullurl,
        short: shortenedURL,
    });
    res.redirect("/");
});

app.get("/cleardb", async (req, res) => {
    console.log("cleared");
    await shortUrl.deleteOne();
    res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
    console.log(req.params.shortUrl);

    const short_id = await shortUrl.findOne({ short: req.params.shortUrl });
    console.log(short_id);
    if (short_id == null) return res.sendStatus(404);

    short_id.clicks++;
    await short_id.save();
    res.redirect(short_id.full);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is Running");
});
