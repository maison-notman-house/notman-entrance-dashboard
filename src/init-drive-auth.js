// var googleDocsCms = require('google-docs-cms');
'use strict'

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var readline = require('readline');

const CLIENT_ID = '22498368587-vrlb42iks6iej2842c2e1huvrq1vttjc.apps.googleusercontent.com';
const CLIENT_SECRET = '5v61TYJe3QvZadKPVlLRTR2L';
const REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob';

var oauth2Client = new OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var scopes = [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly'
    ];


// console.log('past following URL into a web browser');
// console.log(url);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function saveToken(error, result, profile1) {
    if (error) {
        console.log('Access Token Error', error);
    }
    token = oauth2.accessToken.create(result);
    console.log('token',token)
}

function getAccessToken (oauth2Client, callback) {

    var url = oauth2Client.generateAuthUrl({
        approval_prompt: 'force',
        access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
        scope: scopes // If you only need one scope you can pass it as string
    });


    var tokens = { access_token: 'ya29.Ci87A6lFLFrOiH67L41QcZgUkwf0f-6jgjYlo3mXO1CmdDTYwuFlAe6M-S-dJXVacA',
      token_type: 'Bearer',
      refresh_token: '1/oui0dElvN9JCVuBbJvc8PUq7kaF1mVe03qiehnCD_Kw',
      expiry_date: 1470856509599
    };

    if (tokens) {
       oauth2Client.setCredentials(tokens);
       callback();
       return;
    }

    console.log('Visit the url: ', url);
    rl.question('Enter the code here:', function (code) {
        // request access token
        oauth2Client.getToken(code, function (err, tokens) {
            if (err) {
                return callback(err);
            }
            console.log(tokens);
            // set tokens to the client
            // TODO: tokens should be set by OAuth2 client.
            oauth2Client.setCredentials(tokens);

//             saveToken(
//             oauth2Client.accessToken
            callback();
        });
    });
}

// rl.question('Provide Key generated on web page ', (answer) => {

getAccessToken(oauth2Client, function () {
    var drive = google.drive({ version: 'v2', auth: oauth2Client });

    var folderId = '0B5pElvk6o2C1fmJMWkZzMGpMM3BkTWxfdzd1ODhVSFlEUDFMcE1yUU8xQlFUZGZiVGliVmM';

    //var key = '4/3qgW0XGB1BZnA-b4TsLe0tySpaKBBkSzcz3FzJh6Mv4';

    drive.children.list({
      //auth: answer,
      folderId: folderId,
    }, function(error, response) {
       if (error) {
          console.log('err: ', error);
          return;
       }
       var items = response.items;
       var i;
       //for (i=0; i<items.length; i++) {
           drive.files.get({
               fileId: items[0].id
           }, function (error, response) {
               if (error) {
                  console.log('err: ', error);
                  return;
               }
               console.log(response);
           });
       //}
       console.log(response);
    });

});

// ref: http://masashi-k.blogspot.ca/2013/07/accessing-to-my-google-drive-from-nodejs.html

// googleDocsCms({
//    id: '1ZfxCEIrPuitAezfuctgR4h7ceIzx44i_F54dKLSpbOE',
//    outPath: __dirname + 'out.json'
// }).then(function (res) {
//    console.log(res);
// }, function (err) {
//    console.log(err);
// });
