import { Client } from "pg"
import express from "express"
import cors from "cors"

const app = express()

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rootUser",
    database: "test_db",
})

client.connect()

app.use(cors({origin: "*"}))
app.use(express.json())

app.get("/api/data", async (req,res) => {
    client.query(`select * from notes`, (err, data) => {
        if (err) {
            return res.status(503).send({error:"There was an error on the server"})
        }
        res.send(data.rows)
    })    
})  

app.post("/api/data", async (req,res) => {
    const { text } = req.body 


    const query = `insert into notes (text)
                    values ('${text}') returning id, text;`
    client.query(query, (err, data) => {
        if (err) {
            return res.status(503).send({error:"There was an error on the server"})
        }
        res.send(data.rows)
    })    
})  

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log("Listening on " + PORT))


