/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import { input } from '@inquirer/prompts';
import qr from "qr-image";
import fs from "fs";

const chosenLink = await input({ message: 'Enter your desired website: ' });

fs.writeFile("URL.txt", chosenLink, (err) => {
    if (err) throw err;
    console.log("URL has been saved successfully!");
});

const qrImg = qr.image(chosenLink, { type: "png" });
qrImg.pipe(fs.createWriteStream("qr_code.png")).on("finish", () => {
    console.log("QR code saved as qr_code.png");
});