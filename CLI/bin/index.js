#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import yargs from "yargs";
import axios from "axios";

const options = yargs.usage("Usage: -n <name>")
                     .option("n", {alias: "name", describe: "your name", type: "string", demandOption: true})
                     .option("s", { alias: "search", describe: "Search term", type: "string" })
                     .argv;

const greeting = chalk.white.bold(`Hello ${options.name}!`);

const boxOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
}
const msgBox = boxen(greeting, boxOptions);
console.log(msgBox);

if (options.search) {
    console.log(`Searching for jokes about ${options.search}...`)
   } else {
    console.log("Here's a random joke for you:");
   }


const url = options.search ? `https://icanhazdadjoke.com/search?term=${escape(options.search)}` : "https://icanhazdadjoke.com/";
axios.get(url, { headers: { Accept: "application/json"}}).
        then((res) => {
            if (options.search) {
                // if searching for jokes, loop over the results
                res.data.results.forEach( j => {
                  console.log("\n" + j.joke);
                });
                if (res.data.results.length === 0) {
                  console.log("no jokes found :'(");
                }
              } else {
                console.log(res.data.joke);
              }
        });
// console.log("Hello World");


//npm install -g to run  anywhere and run cmd hello(we set in bin);
// npm uninstall -g cli to uninstall script