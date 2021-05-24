const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Node</h1>");
})

let students = [];

//VIEW ALL STUDENT DETAILS
app.get("/students", (req, res) => {
    res.send(students);
});

//CREATE
app.post("/student", (req, res) => {
    // console.log(req.body);
    req.body.id = students.length + 1;
    students.push(req.body);
    res.json({
        message: "Student Created"
    })
});

//READ
app.get("/student/:id", (req, res) => {
    // console.log(req.params.id);
    let studentId = req.params.id;
    let student = students.find((obj) => obj.id == studentId);
    if (student)
        res.json(student)
    else
        res.json({
            message: "Student not found"
        })

})

//UPDATE
app.put("/student/:id", function (req, res) {
    let studentId = req.params.id;
    let updateData = req.body;

    // Find the index value of the student id 1
    let studentindex = students.findIndex((obj) => obj.id == studentId)
    let studentData = students[studentindex]
    // console.log(studentindex)

    if (studentData) {
        // Update the particular key
        Object.keys(updateData).forEach((keyItem) => {
            studentData[keyItem] = updateData[keyItem]
        })

        students[studentindex] = studentData;

        res.json({
            message: "studentUpdate Success"
        })
    } else {
        res.json({
            message: "No User Found"
        })
    }
})

//DELETE
app.delete("/student/:id", (req, res) => {
    let studentId = req.params.id;
    let student = students.findIndex((obj) => obj.id == studentId);
    console.log(student);
    students.splice(student, 1);
    res.json({
        message: "Student Deleted"
    })
});


app.use(cors());
app.use(express.json());

app.listen(8000);
