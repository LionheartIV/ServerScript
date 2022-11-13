const utilities = require("../utilities");
const dataService = require("../dataservice/testservice");

module.exports ={
    GET: {
        handler : (req, res, param) => {
            if(param){
                param = param.replace("/","");
                dataService.getById(param)
                .then(data => {
                utilities.sendJson(res, {msg:"test", method: req.method, param: param, data});  
                })
                .catch(err => {
                    utilities.sendJson(res, {msg:"test", method: req.method, param: param, err: err.message});
                })
                return;
            }
            dataService.getAll()
            .then(data => {
                utilities.sendJson(res, {msg:"test", method: req.method, param: param, data});  
            })
            .catch(err => {
                utilities.sendJson(res, {msg:"test", method: req.method, param: param, err: err.message});
            })
        }
    },
    POST: {
        handler : (req, res) => {
            if(param){
                utilities.sendJson(res, {msg: "Bad request"}, 400)
                return;
            }
            utilities.getBody(req)
                .then(body => {
                    utilities.sendJson(res, {msg:"test", method: req.method, body});
                })
                .catch(err => {
                    utilities.sendJson(res, err, 500);
                })
        }
    },
    PUT: {
        handler : (req, res, param) => {
            if(param){
                param = param.replace("/","");
                utilities.sendJson(res, {msg:"test", method: req.method, param: param});
                return;
            }
            utilities.sendJson(res, {msg: "Parameter required"}, 400);
        }
    },
    DELETE: {
        handler : (req, res, param) => {
            if(!param){
                utilities.sendJson(res, {msg: "Parameter required"}, 400)
                return;
            }
            param = param.replace("/","");
            utilities.sendJson(res, {msg:"test", method: req.method});
        }
    }
}