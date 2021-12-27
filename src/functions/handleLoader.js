const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const chalk = require('chalk');
let table = new ascii("Commands");
table.setHeading("Command", "Status");

module.exports = (client) => {
    readdirSync("src/commands/").forEach(dir => {
        const commands = readdirSync(`src/commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            // let pull = require(`../commands/${dir}/${file}`);
                table.addRow(file, '✅');
        }
    });
    console.log(chalk.cyanBright(table.toString()));
}