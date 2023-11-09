const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const { random } = require("./randomNumber");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<h1 style="color: blue;">Request received and processed</h1>');
  } else if (req.url === "/random") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Random Number: ${random()}\n`);
  } else if (req.url === "/about") {
    const filePath = path.join(
      __dirname,
      "static",
      "apple-html-css-replica",
      "about.html"
    );

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found\n");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/apple") {
    const filePath = path.join(__dirname, "static", "index.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found\n");
      } else {
        const mimeType = mime.lookup(filePath); // Use mime.lookup
        res.writeHead(200, { "Content-Type": mimeType });
        res.end(data);
      }
    });
  } else if (req.url.startsWith("/css/") || req.url.startsWith("/images/")) {
    const filePath = path.join(__dirname, "static", req.url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found\n");
      } else {
        const mimeType = mime.lookup(filePath);
        res.writeHead(200, { "Content-Type": mimeType });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found\n");
  }
});

server.listen(1234, () => {
  console.log("Server running on port 1234");
});
