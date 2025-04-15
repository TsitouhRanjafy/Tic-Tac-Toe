import db from "./match.db.js";

export const getAllDoc = () => {
    return new Promise((resolve,reject) => {
        db.allDocs({include_docs: true}, (err,doc) => {
            if(!err) resolve(doc.rows.map((row) => row.doc));
            else reject(err);
        })
    })
}

export const postNewMatch = (match) => {
    return new Promise((resolve,reject) => {
        db.put(match, (err, result) => {
            if (!err) resolve(result);
            else reject(err);
        });
    })
}

export const updateMatch = (match) => {
    return new Promise((resolve,reject) => {
        db.put(match,(err,result) => {
            if (!err) resolve(result);
            else reject(err);
        })
    })
}

export const findByRoomName = (roomName) => {
    return new Promise((resolve,reject) => {
        db.find({
            selector: { roomName }
        },(err,result) => {
            if (!err) resolve(result.docs);
            else reject(err);
        })
    })
}