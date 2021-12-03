const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json())

//creates the db connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database: "library"
})

//gets all books
const sqlGetallbooks = "SELECT books.bookID, books.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, books.bookGenre, books.bookCopies, libraries.libraryName FROM books JOIN authors ON books.authorID = authors.authorID JOIN libraries ON books.libraryID = libraries.libraryID ORDER BY bookID asc;"   

//gets only the first 50
const sqlGetbooks50 = "SELECT books.bookID, books.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, books.bookGenre, books.bookCopies, libraries.libraryName FROM books JOIN authors ON books.authorID = authors.authorID JOIN libraries ON books.libraryID = libraries.libraryID ORDER BY bookID asc limit 50;"    


//gets user history
const GetUserHistory1 = "WITH userList AS (SELECT bookID, borrowDate FROM library.borrowHistory where userID = "
const GetUserHistory2= "), userBookList AS (SELECT books.*, userList.borrowDate FROM userList JOIN books ON userList.bookID = books.bookID) SELECT userBookList.bookID, userBookList.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, userBookList.bookGenre, userBookList.borrowDate, libraries.libraryName FROM userBookList JOIN authors ON userBookList.authorID = authors.authorID JOIN libraries ON userBookList.libraryID = libraries.libraryID ORDER BY borrowDate desc;"

//gets a new Random Book
const GetNewBook1 = "WITH userList AS (SELECT bookID FROM library.borrowHistory where userID = "
const GetNewBook2 = "), booksList AS (SELECT books.bookID, books.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, books.bookGenre, books.bookCopies, libraries.libraryName FROM books JOIN authors ON books.authorID = authors.authorID JOIN libraries ON books.libraryID = libraries.libraryID ORDER BY bookID asc) SELECT * FROM booksList WHERE bookID NOT IN (SELECT bookID from userList) ORDER BY RAND() LIMIT 1;"

//gets the top 10 books borrowed by all users
const PopularBooks = "WITH popularCNT AS (SELECT bookID, COUNT(bookID) as CNT FROM library.borrowHistory group by bookID Order BY CNT desc limit 10),booksList AS (SELECT books.bookID, books.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, books.bookGenre, books.bookCopies, libraries.libraryName FROM books JOIN authors ON books.authorID = authors.authorID JOIN libraries ON books.libraryID = libraries.libraryID) SELECT * FROM popularCNT JOIN booksList ON popularCNT.bookID = booksList.bookID;"

//gets all recommended Books for the User. 
const recommendedUserBooks1 = "WITH userList AS (SELECT bookID, borrowDate FROM library.borrowHistory where userID = "
const recommendedUserBooks2 = "),  userBookList AS (SELECT books.*, userList.borrowDate FROM userList JOIN books ON userList.bookID = books.bookID),userFullBookList AS (SELECT userBookList.bookID, userBookList.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, userBookList.bookGenre, userBookList.borrowDate, libraries.libraryName FROM userBookList JOIN authors ON userBookList.authorID = authors.authorID JOIN libraries ON userBookList.libraryID = libraries.libraryID ORDER BY borrowDate desc LIMIT 3),recommendedAuthors AS (SELECT author FROM userFullBookList), recommendedGenres AS (SELECT bookGenre FROM userFullBookList),FullBookList AS (SELECT books.bookID, books.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, books.bookGenre, books.bookCopies, libraries.libraryName FROM books JOIN authors ON books.authorID = authors.authorID JOIN libraries ON books.libraryID = libraries.libraryID ORDER BY bookID asc),FullAuthors AS (SELECT * FROM FullBookList where author IN (SELECT * FROM recommendedAuthors)),FullGenres AS (SELECT * FROM FullBookList where bookGenre IN (SELECT * FROM recommendedGenres))SELECT * from FullAuthors UNION (SELECT * FROM FullGenres);"

//gets Username
const retrieveUserName1 = "SELECT CONCAT(userFname, ' ', userLName) AS username FROM library.users where userID = "


//=========== String Snippets ============

//Getbooks part 1 (join only)
const getBooks1 = "SELECT books.bookID, books.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, books.bookGenre, books.bookCopies, libraries.libraryName FROM books JOIN authors ON books.authorID = authors.authorID JOIN libraries ON books.libraryID = libraries.libraryID"   

//makes a set with all the joins for the booklist
const getBooksSet = "WITH bookList AS (SELECT books.bookID, books.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, books.bookGenre, books.bookCopies, libraries.libraryName FROM books JOIN authors ON books.authorID = authors.authorID JOIN libraries ON books.libraryID = libraries.libraryID ORDER BY bookID asc)"

//string snippet to order by
const addOrder = " ORDER BY bookID asc"

//string snippet to add a limit
const addLimits = " limit 50"



db.connect(function(err) {
    if (err) throw err;
    db.query("show databases", function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
    });
  });



app.get("/books", (req,res) =>{
    const sqlGetbooks = "SELECT books.bookID, books.bookTitle, CONCAT(authorFName, ' ', authorLNAME) AS author, books.bookGenre, books.bookCopies, libraries.libraryName FROM books JOIN authors ON books.authorID = authors.authorID JOIN libraries ON books.libraryID = libraries.libraryID ORDER BY bookID asc limit 50;"    

        db.query(sqlGetbooks50,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            //console.log(result)
            res.send(result)
        }
    })
})

app.get("/books/all", (req,res) =>{
        db.query(sqlGetallbooks ,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            //console.log(result)
            res.send(result)
        }
    })
})


app.get("/user/username", (req,res) =>{
    //console.log(req.query.userID)
    var sqlstmt = retrieveUserName1 + req.query.userID + ";"
    db.query(sqlstmt,(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        //console.log(result)
        res.send(result)
    }
})
})


app.get("/user/history", (req,res) =>{
    var sqlstmt = GetUserHistory1 + req.query.userID + GetUserHistory2
        db.query(sqlstmt,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            //console.log(result)
            res.send(result)
        }
    })
})

app.get("/user/Recommended", (req,res) =>{
    var sqlstmt = recommendedUserBooks1 + req.query.userID + recommendedUserBooks2
    db.query(sqlstmt,(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        //console.log(result)
        res.send(result)
    }
})
})




app.get("/Filter/Random", (req,res) =>{
    var sqlstmt = GetNewBook1 +  req.query.userID + GetNewBook2
    db.query(sqlstmt,(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        //console.log(result)
        res.send(result)
    }
})
})

app.get("/Filter/Popular", (req,res) =>{
    db.query(PopularBooks,(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        //console.log(result)
        res.send(result)
    }
})
})


app.get("/Filter", (req,res) =>{



    var sqlstmt = getBooksSet + " SELECT * FROM bookList WHERE"

    var addOrs = false

    if(req.query.filterTitle === "true"){
        if(!addOrs){
            sqlstmt += " bookTitle LIKE '%" + req.query.titleText +"%'"
            addOrs = true
        }
    }

    if(req.query.filterAuthor === "true"){
        if(!addOrs){
            sqlstmt += " author LIKE '%" + req.query.titleText +"%'"
            addOrs = true
        }
        sqlstmt += " AND author LIKE '%" + req.query.authorText +"%'"
    }

    if(req.query.filterGenre === "true"){
        if(!addOrs){
            sqlstmt += " bookGenre LIKE '%" + req.query.genreText +"%'"
            addOrs = true
        }
        sqlstmt += " AND bookGenre LIKE '%" + req.query.genreText +"%'"
    }

    if(req.query.filterAvailable === "true"){
        if(!addOrs){
            sqlstmt += " bookCopies > 0"
            addOrs = true
        }
        sqlstmt += " AND  bookCopies > 0"
    }

    if(req.query.filterAll === "true"){
            sqlstmt += addLimits
    }

    sqlstmt += ";"
    //console.log(sqlstmt)
    db.query(sqlstmt,(err,result)=>{
    if(err){
        console.log(err)
    }
    else{

        res.send(result)
    }
})
})

app.listen(3001, ()=> {
    console.log("running on port 3001")
})