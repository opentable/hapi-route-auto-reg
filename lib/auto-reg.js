var walk = require("walk"),
    path = require("path"),
    chalk = require("chalk");

module.exports.register = function(plugin, directory){
    walk.walkSync(directory, {
        listeners: {
            file: function(root, fileStats, next){
                if(fileStats.name.substr(-3) === ".js") {
                    var file;
                    var filename = root + "/" + fileStats.name;
                    try{
                        file = require(path.resolve(filename));

                        if (file.routes) {
                            plugin.log(["routes"], "registering routes from file: " + filename);
                            file.routes(plugin);
                        }
                        else {
                            plugin.log(["routes"], "ignoring invalid file: " + filename);
                        }
                    }
                    catch(err){
                        plugin.log(["routes", "error"], chalk.red("error registering routes from file: " + filename + ", => " + err.toString()));
                    }
                }
                next();
            }
        }
    });
};
