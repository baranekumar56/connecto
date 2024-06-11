const pg = require('pg');
const express = require('express');
const fs = require('fs').promises;
const { Client, Pool } = pg;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'compos',
    password:'root',
    port:5432
});

async function connectToDB(){
    try{
        const client = await pool.connect();
        try{
            const file = await fs.readFile("data.txt","utf8");
            client.query("BEGIN");
            client.query("SAVEPOINT A");
            let data = file.split("\r\n");
            data.pop();
            data.forEach(element => {
                let d = element.split(">>>");
                    // console.log(d);
                    // console.log([Number(d[4]), d[0], d[1], Number(d[2]), Number(d[3])])
                    client.query("insert into districts values($1,$2,$3,$4,$5)", [Number(d[4]), d[0], d[1], Number(d[2]), Number(d[3])]);
                }
            );
            client.query("COMMIT");
            console.log("Data has been added successfully");
        }catch(err){
            client.query("ROLLBACK A");
            console.error(err);
        }finally{
            
            client.release();
        }
    }catch(err){
        console.log(err);
    }
}

connectToDB();


