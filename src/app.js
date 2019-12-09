const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Paths
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//HBS engine and views folder
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Static dir included:
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Egor Puchkov"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Egor Puchkov",
    img: "/img/I.jpg"
  });
});

//WX for address request==============
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address"
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location }={}) => {
    if (err) {
      return res.send({
        error: err
      });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({
          error: err
        });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  console.log(req.query.search);

  res.send({
    products: [req.query.search]
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "It is helping text",
    name: "Egor Puchkov",
    title: "Help"
  });
});

app.get("/help/*", (req, res) => {
  res.send("No help arcticle");
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    helpText: "No page",
    name: "Egor Puchkov",
    title: "404 page"
  });
});

app.listen(3000, () => {
  console.log("Hello its my webServer");
});
