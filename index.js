var request = require("request");
var cheerio = require("cheerio");
var url = "https://medium.com/";

request(url, function (err, resp, body) {
  $ = cheerio.load(body);

  // result list of links
  var linklist = [];

  // attribute => tags (all tags that has attributes of URL)
  var tags_attrib = {
    cite: ["blockquote", "del", "ins", "q"],
    data: ["object"],
    href: ["a", "area", "base", "link"],
    src: [
      "audio",
      "embed",
      "iframe",
      "img",
      "input",
      "script",
      "source",
      "track",
      "video",
    ],
    srcset: ["track"],
  };

  for (const key in tags_attrib) {
    tags_attrib[key].forEach((item) => {
      let links = $(item); // jquery all the specific tags
      $(links).each((i, link) => {
        linklist.push($(link).attr(key));
      });
    });
  }
  console.log("============ links =============\n", linklist);
});
