/**
 * arquivo responsável pela conexão e manipulação do banco de dados.
 */

var mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost/cruddb")
    .then(conn => global.conn = conn)
    .catch(err => console.log(err))


function findAll(callback) {
    global.conn.collection("customers").find({}).toArray(callback);
}

//função que realiza a inserção
function insert(customer, callback) {
    global.conn.collection("customers").insert(customer, callback);
}

//função que pega os dados do cliente a partir do id
var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback) {
    global.conn.collection("customers").find(new ObjectId(id)).toArray(callback);
}

//função que realiza o update
function update(id, customer, callback){
    global.conn.collection("customers").updateOne({_id:new ObjectId(id)}, customer, callback);
}

//função que deleta o usuário selecionado
function deleteOne(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne }