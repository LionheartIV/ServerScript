const utilities = require("./utilities");
const config = require("./config/serverconfig.json");
const api = {"test" : require("./api/test")}

module.exports = (req, res) => {
    utilities.logger(req, res);
    const incoming = new URL(req.url, `${config.host}:${config.port}`);
    const endpoint = incoming.pathname;

    //utilities.sendText(res, "Hilsen fra severen");    
    if(endpoint === "/"){
        utilities.redirect(res, config.default_doc);
        return;
    }
    const rx = /^\/(html|css|img|js)\/\w+\.(html|js|css|png|jpe?g|gif|tiff|bmp)$/;
    //const rx = new RegExp ("^\\/(html|css|img|js)\\/[-\\w]+\\.(html|js|css|png|jpe?g|gif|tiff|bmp)$")

    let match = endpoint.match(rx);
    if(match){
        //Her findes et match
        utilities.sendFile(res, config.public_root + match[0]);
        return;        
    }


    //console.log(api)
    const regEx = /^\/api\/(?<route>\w+)(?<param>\/\d+)?$/;

    match = endpoint.match(regEx);
    if(match) {
        //Match fundet til API'en
        if(api[match.groups.route]){
            //Hvis jeg er her er der fundet endpoint
            if(api[match.groups.route][req.method]){
                //Hvis jeg er her er der en handler til metoden
                api[match.groups.route][req.method].handler(req, res, match.groups.param);
                return;
            }
            //Hvis jeg er her, er der ikke en handler
            utilities.sendJson(res, {msg: `Method ${req.method} not allowed`}, 405);
            return;
        }
    }

    
    //Her er intet match
    utilities.sendJson(res, {"Message": `Resourcen ${endpoint} findes ikke`}, 404);

    
}
