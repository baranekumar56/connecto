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
            // const file = await fs.readFile("data.txt","utf8");
            client.query("BEGIN");
            client.query("SAVEPOINT A");
            // let data = file.split("\r\n");
            // data.pop();
            // data.forEach(element => {
            //     let d = element.split(">>>");
            //         // console.log(d);
            //         // console.log([Number(d[4]), d[0], d[1], Number(d[2]), Number(d[3])])
            //         // client.query("insert into districts values($1,$2,$3,$4,$5)", [Number(d[4]), d[0], d[1], Number(d[2]), Number(d[3])]);
            //     }
            // );
            // let dat = {}
            // const res = await client.query("select distinct statename from districts");
            // // (await res).rows.forEach(e=>{
            // //     dat[e] = await client.query("select * from districts where statename = $1", [e.statename]);
            // // })
            // console.log(res.rows)
            // const setdata = async () => {
            //     res.rows.forEach(async e => {
            //         // console.log(`select * from districts where statename = '${e.statename}'`)
            //         console.log(e.statename)
            //         const s = await client.query("select * from districts where statename = ($1) ", [e.statename]);
            //         dat[e.statename] = s.rows
            //     })
            // }

            let dat = {};
            const res = await client.query("select distinct statename from districts");

            for (const e of res.rows) {
                const s = await client.query("select * from districts where statename = $1", [e.statename]);
                dat[e.statename] = s.rows;
            }

            console.log(dat)


            client.query("COMMIT");
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


