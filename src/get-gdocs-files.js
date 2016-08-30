// ref: https://gist.github.com/davestevens/6f376f220cc31b4a25cd

var google = require("googleapis"),
    drive = google.drive("v2"),
    fs = require("fs");

var config = {
  "client_id": "22498368587-ao40q2t5aofp0fegjmaoeo419jvfb1m4.apps.googleusercontent.com",
  "client_secret": "lqXy2Q2vpfHqQygaT_OPT0oL",
  "scope": "scope",
  "redirect_url": "redirect_url",
  "tokens": {
    "access_token": "access_token",
    "token_type": "Bearer",
    "id_token": "id_token",
    "refresh_token": "refresh_token",
    "expiry_date": "expiry_date"
  }
};

function buildClient() {
  var client = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
    config.redirect_url
  );
  client.setCredentials(config.tokens);
  return client;
}

var client = buildClient(),
    folderId = "folderId"; // The Google Drive Folder Id

// Request all image files from folder
drive.children.list({
  auth: client,
  folderId: folderId,
  q: "mimeType contains 'image' and trashed = false"
}, function(error, response) {
  if (error) { return console.log("ERROR", error); }

  response.items.forEach(function(item) {
    var file = fs.createWriteStream("./" + item.title);
    file.on("finish", function() {
      console.log("downloaded", item.title);
    });

    // Download file
    drive.files.get({
      auth: client,
      fileId: item.id,
      alt: "media"
    }).pipe(file);
  });
});