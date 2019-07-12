/**
*
* @author J. Bradley Briggs
*/
class Terminal {
    constructor() {
        this.execute = require('child_process').exec;
        this.root = `gnome-terminal `;
        this.tabs = "";
        this.cmds = "";
    }

    tab(title) {
        var tabString = ` --tab `;
        if (title) tabString += `--title="${title}" `;
        this.tabs = tabString;
        return this;
    }

    runSingle(command = "") {
        var keep = "$SHELL";
        var cmdString = ` --command="bash -c '${command}; ${keep}'" `;
        this.cmds = cmdString;
        return this;
    }

    run(...commands) {
        if (commands) {
            var allCmds = "";
            commands.forEach((cmd, index) => {
                allCmds += ` ${cmd}`;
                if (index != commands.length - 1) allCmds += ";";
            });
            if (allCmds != "") return this.runSingle(allCmds);
        }
        return this;
    }

    open() {
        return new Promise((resolve, reject) => {
            var fullCmd = this.root + this.tabs + this.cmds;

            console.log(fullCmd);
            this.execute(fullCmd, (err, stdOut, stdErr) => {
                if (err) reject(err);
                else resolve({
                    stdOut: stdOut,
                    stdErr: stdErr
                })
            })
        })
    }
}

// var term = new Terminal();
// term.tab("A Tab")
//     .run("cd /home/", "ls -lah")
//     .open();