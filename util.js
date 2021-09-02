const sharp = require("sharp");
const fs = require("fs");
const request = require("request");
const { reject } = require("lodash");

const download = (url, callback) => {
  const path = "./cached-loot.svg";

  return new Promise((resolve) => {
    request.head(url, (err, res, body) => {
      request(url).pipe(fs.createWriteStream(path)).on("close", resolve);
    });
  });
};

const convertToPng = async () => {
  return new Promise((resolve, reject) => {
    sharp("./cached-loot.svg")
      .png({
        create: {
          width: 350,
          height: 350,
        },
      })
      .toFile("cached-loot.png")
      .then(function (info) {
        resolve(info);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const downloadAndCovertToPng = async (url) => {
  // console.log("started download");
  await download(url);
  // console.log("ended download, started png conversion");
  await convertToPng();
  // console.log("ended png conversion");

  return new Promise((resolve) => {
    fs.readFile("./cached-loot.png", "base64", (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

module.exports = {
  downloadAndCovertToPng: downloadAndCovertToPng,
};

// const run = async () => {
// await downloadAndCovertToPng(
//   "https://storage.opensea.io/files/185fe4c7dd0e5a3f66b8fbcae6b4173f.svg"
// );
// };
// run();
