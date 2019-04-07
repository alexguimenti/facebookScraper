const defaultOption = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0"
  }
};

const request = require("request-promise").defaults(defaultOption);
const credentials = require("./credentials");
const fs = require("fs");

async function main() {
  const options = {
    method: "POST",
    uri:
      "https://m.facebook.com/login/device-based/regular/login/?refsrc=https%3A%2F%2Fm.facebook.com%2Flogin%2Fdevice-based%2Fedit-user%2F&lwv=101",
    form: {
      email: credentials.email,
      pass: credentials.pass
    },
    simple: false,
    resolveWithFullResponse: true
  };

  try {
    const result = await request(options);
    console.log(result.headers.location);
    const homepage = await request.get(result.headers.location);
    writeFile(homepage);
  } catch (error) {
    console.log(error);
    console.log("ERROR");
  }
}

function writeFile(body) {
  fs.writeFile("./test.html", body, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("Html was saved");
  });
}

main();
