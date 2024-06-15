
const pg = require('pg');
const fs = require('fs');
const { Client, Pool } = pg;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'compos',
    password:'root',
    port:5432
});

const handler = async () => {
    client = await pool.connect();
    client.query("BEGIN");
    client.query("SAVEPOINT A");
    try{

        const data = await fs.readFileSync("IndiaStates-UTs.csv","utf8");
        const rows = data.split("\r\n");
        console.log(rows);
        for (const row of rows){
            const r = row.split(",");
            // console.log(r);
            try{
                const state = r[0];
                const lat = r[1], lon = r[2];
                const str = "update "+"states" + " set pos = "+ 
                            "ST_SetSRID(ST_MakePoint("+ lat+","+lon+"), 4326)"+" where statename = " + "\'" + state + "\';";
                console.log(str);
                await client.query(str);
            }catch(err){
                console.log(err)
            }
        }
        
        console.log("up here");
        client.query("commit");
    }catch(err){
        client.query("ROLLBACK A");
        console.log(err);
    }
}
handler();

// CODE USED FOR SEGGREGATING DISTRICTS INTO THEIR RESPECTIVE STATES

// const pg = require('pg');
// const express = require('express');

// const fs = require('fs').promises;
// const { Client, Pool } = pg;

// const pool = new Pool({
//     user:'postgres',
//     host:'localhost',
//     database:'compos',
//     password:'root',
//     port:5432
// });

// let client;

// const handler = async () => {
//     client = await pool.connect();
//     try{
//         client.query("BEGIN");
//         client.query("SAVEPOINT A");

//         const res = await client.query("select * from districts");
//         let states = [];
//         res.rows.forEach(e => states.push(e.statename));
        
//         for (const row of res.rows){
//             const str = "insert into " + "\""+row.statename+"\"" + "(districtname , statename, pos) " +" values " + "("
//                         +"\'"+ row.districtname +"\'"+ ", "+"\'"+row.statename+"\'" + " , "  + " ST_SetSRID(ST_MakePoint(" + row.lat + " , " +
//                         row.lon + " ),4326))";
                        
//              console.log(str);  
//              await client.query(str);
//         }
        
        
//         console.log("up here");
//         client.query("commit");
//     }catch(err){
//         client.query("ROLLBACK A");
//         console.log(err);
//     }
// }

// handler();

// CODE USED FOR CREATING TABLE NAMES WITH STATENAMES

// const pg = require('pg');
// const express = require('express');

// const fs = require('fs').promises;
// const { Client, Pool } = pg;

// const pool = new Pool({
//     user:'postgres',
//     host:'localhost',
//     database:'compos',
//     password:'root',
//     port:5432
// });

// let client;

// const handler = async () => {
//     client = await pool.connect();
//     try{
//         client.query("BEGIN");
//         client.query("SAVEPOINT A");

//         const res = await client.query("select distinct statename from dist");
//         let states = [];
//         res.rows.forEach(e => states.push(e.statename));
//         for (const state of states){
//             await client.query(`CREATE TABLE IF NOT EXISTS "${state}" (
//                 id SERIAL PRIMARY KEY NOT NULL,
//                 districtname TEXT,
//                 statename TEXT,
//                 pos GEOMETRY(POINT, 4326)
//             )`);
//         }
//         console.log("up here");
//         client.query("commit");
//     }catch(err){
//         client.query("ROLLBACK A");
//         console.log(err);
//     }
// }

// handler();