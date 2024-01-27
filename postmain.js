// import http from 'http'

// let students = [
//     { id: 1, name: 'yogesh', age: 22, phone: 1234567890 },
//     { id: 2, name: 'rajat', age: 23, phone: 1234567811 }
// ];

// // text/plain
// // application/json


// const server = http.createServer((req, res) => {
//     if (req.method === "GET") {
//         if (req.url.match("/students")) {
//             res.writeHead(200, { 'Content-Type': 'application/json' })
//             res.end(JSON.stringify(students))
//             // console.log("hello world");
//         }
//         else {
//             res.writeHead(404, { 'Content-Type': 'text/plain' })
//             res.end("Not a valid endpoint")
//         }
//     }

//     //ADDING NEW DATA TO ARRAY
//     if (req.method === "POST") {
//         if (req.url.match("/new")) {
//             let newStudent = ''
//             req.on("data", (dt) => {
//                 newStudent += dt.toString()
//             })
//             req.on("end", () => {
//                 students.push(JSON.parse(newStudent))
//                 res.writeHead(200, { 'Content-Type': 'application/json' })
//                 res.end(JSON.stringify(students))
//             })
//         }
//     }


// })

// server.listen(4000, () => { console.log("server has started at port 4000") })
// // http://localhost:4000