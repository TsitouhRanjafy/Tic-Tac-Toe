import db from "./db.match.js";

export const getAllDoc = () => {
    return new Promise((resolve,reject) => {
        db.allDocs({include_docs: true}, (err,doc) => {
            if(!err) resolve(doc.rows.map((row) => row.doc));
            else reject(null);
        })
    })
}

export const postNewMatach = (match) => {
    return new Promise((resolve,reject) => {
        db.put(match, (err, result) => {
            if (!err) resolve(result);
            else reject(null);
        });
    })
}