const mysql = require("mysql2");
const config = require("../config/dbconfig.json");
let pool;
try {

    const pool = mysql.createPool(config);

}
catch(err){
    console.log(err);
}
exports.getAll = () => {
    return new Promise((succes, failure) => {
        const sql = "select * from tblapi order by fullname";
        pool.execute(sql, (err, rows) => {
            if(err) {
                failure(err);
                return;
            }
            succes(rows);
        });
    });
}

exports.getBtId = id => {
    return new Promise((succes, failure) => {
        const sql = "select * from tblapi where id = ? order by fullname";
        pool.execute(sql, [id], (err, rows) => {
            if(err) {
                failure(err);
                return;
            }
            succes(rows);
        });
    });
}
exports.insert = jsonData => {
    return new Promise((succes, failure) => {
        const sql = "insert into tblapi (fullname, email, student) values(?, ?, ?)";
        try {
            pool.execute(sql, [jsonData.fullname, jsonData.email, jsonData.student], (err, result) => {
                if(err) {
                    failure(err);
                    return;
                }
                succes(result);
            });
        }
        catch(err){
            console.log(err);
            failure(err);
        }
    });
}

exports.update = (id, jsonData) => {
    return new Promise((succes, failure) => {
        const sql = "update tblapi set fullname = ?, email = ?, student = ? where id = ?";
        pool.execute(sql, [jsonData.fullname, jsonData.email, jsonData.student, id], (err, result) => {
            if(err) {
                failure(err);
                return;
            }
            succes(result);
        });
    });
}

exports.delete = (id) => {
    return new Promise((succes, failure) => {
        const sql = "delete from tblapi where id = ?";
        pool.execute(sql, [id], (err, result) => {
            if(err){
                failure(err);
                return;
            }
            succes(result);
        });
    });
}