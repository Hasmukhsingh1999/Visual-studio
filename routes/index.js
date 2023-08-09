var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */

router.get("/", function (req, res, next) {
  var newArr = [];
  fs.readdir("./uploads", { withFileTypes: true }, function (err, data) {
    data.forEach(function (dirent) {
      newArr.push({ name: dirent.name, isFolder: dirent.isDirectory() });
    });
    res.render("index", { data: newArr });
    console.log(newArr);
  });
});

router.get("/createForm", function (req, res) {
  console.log(req.query.filename);
  fs.writeFile(`./uploads/${req.query.filename}`, "", function (err) {
    res.redirect("/");
  });
});

router.get("/createFolder", function (req, res) {
  fs.mkdir(`./uploads/${req.query.foldername}`, function (err) {
    res.redirect("/");
  });
});

router.get("/file/:showfiles", function (req, res) {
  fs.readFile(
    `./uploads/${req.params.showfiles}`,
    "utf-8",
    function (err, newdata) {
      var newArr = [];
      fs.readdir("./uploads", { withFileTypes: true }, function (err, data) {
        data.forEach(function (dirent) {
          newArr.push({ name: dirent.name, isFolder: dirent.isDirectory() });
        });
        res.render("filesopened", {
          data: newArr,
          filesname: req.params.showfiles,
          newdata,
        });
      });
    }
  );
});

router.get("/deleteFiles/:deletes", function (req, res) {
  fs.readFile(
    `./uploads/${req.params.showfiles}`,
    "utf-8",
    function (err, newdata) {
      var newArr = [];
      fs.readdir("./uploads", { withFileTypes: true }, function (err, data) {
        data.forEach(function (dirent) {
          newArr.push({ name: dirent.name, isFolder: dirent.isDirectory() });
        });
        fs.unlink(`./uploads/${req.params.deletes}`, function (err) {
          res.render("newsfiles", { filesname: req.params.showfiles, newdata });
        });
      });
    }
  );
});

router.get("/deleteFolder/:deletesFol", function (req, res) {
  fs.readFile(
    `./uploads/${req.params.showfiles}`,
    "utf-8",
    function (err, newdata) {
      var newArr = [];
      fs.readdir("./uploads", { withFileTypes: true }, function (err, data) {
        data.forEach(function (dirent) {
          newArr.push({ name: dirent.name, isFolder: dirent.isDirectory() });
        });
        fs.rmdir(`./uploads/${req.params.deletesFol}`, function (err) {
          res.render("newsfiles", { filesname: req.params.showfiles, newdata });
        });
      });
    }
  );
});

module.exports = router;
