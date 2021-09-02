// const sharp = require("sharp");
const fs = require("fs");
// const request = require("request");
const { reject } = require("lodash");
const svg2img = require("svg2img");
// const btoa = require("btoa");

// const download = (url, callback) => {
//   const path = "./cached-loot.svg";

//   return new Promise((resolve) => {
//     request.head(url, (err, res, body) => {
//       request(url).pipe(fs.createWriteStream(path)).on("close", resolve);
//     });
//   });
// };

// const convertToPng = async () => {
//   return new Promise((resolve, reject) => {
//     sharp("./cached-loot.svg")
//       .resize(1000, 1000, {
//         fastShrinkOnLoad: false,
//       })
//       .png({ quality: 100 })
//       .toFile("cached-loot.png")
//       .then(function (info) {
//         console.log(info);
//         resolve(info);
//       })
//       .catch(function (err) {
//         reject(err);
//       });
//   });
// };

// const downloadAndCovertToPng = async (url) => {
//   // console.log("started download");
//   await download(url);
//   // console.log("ended download, started png conversion");
//   await convertToPng();
//   // console.log("ended png conversion");

//   return new Promise((resolve) => {
//     fs.readFile("./cached-loot.png", "base64", (err, data) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//         return;
//       }
//       resolve(data);
//     });
//   });
// };

const convertRemoteSvgToPng = async (url) => {
  return new Promise((resolve) => {
    svg2img(
      url,
      { format: "png", quality: 100, width: 1500, height: 1500 },
      (error, buffer) => {
        fs.writeFileSync("cached-loot.png", buffer);

        fs.readFile("./cached-loot.png", "base64", (err, data) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          // console.log(data);
          resolve(data);
        });
      }
    );
  });
};

module.exports = {
  convertRemoteSVGToPng: convertRemoteSvgToPng,
  //   downloadAndCovertToPng,
};

// // const run = async () => {
// //   // await downloadAndCovertToPng(
// //   //   "https://storage.opensea.io/files/185fe4c7dd0e5a3f66b8fbcae6b4173f.svg"
// //   // );
// //   //5. convert to jpeg file
// //   convertRemoteSvgToPng(
// //     "https://storage.opensea.io/files/185fe4c7dd0e5a3f66b8fbcae6b4173f.svg"
// //   );
// // };
// // run();
