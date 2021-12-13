import { Client } from "pg"
import express from "express"


const app = express()

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rootUser",
    database: "test_db",
})

async function PullData() {
    client.connect()
    client.query(`SELECT * FROM users`, (err, res) => {
        if (res) {
            console.log(res.rows)
        }
        else if (err) {
            console.log(err)
        }
        else {
            console.log("wtf?")
        }
    })
}

PullData()

// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => console.log("Listening on " + PORT))


