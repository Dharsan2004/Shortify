const express = require("express");
const app = express();

const redis = require("redis");
const redisClient = redis.createClient(6379);

const shortUrlModel = require("./models/shortUrl");

require("dotenv").config();

const shortUrl = require("./models/shortUrl");
const mongoose = require("mongoose");
const crypto = require("crypto");

const mongoURL =
    "mongodb+srv://dharsanS2004:dharsangoogle@cluster0.oveqvmp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

function generateShortURL(longURL) {
    const hash = crypto.createHash("sha512").update(longURL).digest("hex");
    const shortURL = hash.substring(0, 7);
    return shortURL;
}

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

app.get("/", async (req, res) => {
    const shorturls = await shortUrl.find();
    res.render("index", { shortUrls: shorturls });
});

app.post("/shortUrls", async (req, res) => {
    const longURL = req.body.fullurl;
    const shortenedURL = generateShortURL(longURL);

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
    await shortUrl.deleteOne();
    res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
    const shortURL = req.params.shortUrl;
    const url = await shortUrl.findOne({ short: shortURL });
    url.clicks++;
    await url.save();
    try {
        if (redisClient.connected) {
            redisClient.get(shortURL, async (err, response) => {
                if (response) {
                    console.log("URL successfully retrieved from cache");
                    const cachedUrlData = JSON.parse(response);
                    const cachedUrl = new shortUrlModel(cachedUrlData); // Create a new instance of the model
                    // cachedUrl.clicks++;
                    // await cachedUrl.save();
                    res.status(200).redirect(cachedUrl.full);
                } else {
                    const url = await shortUrl.findOne({ short: shortURL });
                    if (url) {
                        redisClient.setex(shortURL, 600, JSON.stringify(url));
                        console.log(
                            "URL successfully retrieved from the database"
                        );
                        res.redirect(url.full);
                    } else {
                        res.sendStatus(404);
                    }
                }
            });
        } else {
            throw new Error("Redis client connection closed");
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
