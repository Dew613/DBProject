import { useState, useEffect } from 'react'
import BookHistoryTable from './BookHistoryTable';
import BookTable from './BookTable';
import Axios from "axios";
import './general.css'
import Button from './Button';

const BookHistory = ({user}) =>{
    const [books, setBooks] = useState([{
      bookID: 1,
      bookTitle: '"13 1/2"',
      author: 'Barr Nevada',
      bookCopies: 2,
      libraryName: 'Central Library'
    }]);

    const [recommnedBooks, setRecommendedBooks] = useState([])
    const [userID, setUserID] = useState(user)
    const [userName, setUserName] = useState("")

    useEffect(() => { 
      const getBooks = async () => {
          const data = await fetchBooks()
      }

      setUserID(user)

      const getUserName = async() =>{
        const data2 = await fetchUserName()
      }

      getBooks()
      getUserName()
    }, [])
  
    const fetchBooks = async() =>{
      await Axios.get("http://localhost:3001/user/history", {params:{userID:userID}}).then((response) => {
        setBooks(response.data)
        return response.data
      })
    }

    const fetchUserName = async() =>{
      await Axios.get("http://localhost:3001/user/username", {params:{userID:userID}}).then((response) => {
        //console.log("the username data: ",response.data.username)
        setUserName(response.data[0].username)
        return response.data[0].username
      })
    }

    const getRecommendedBooks = async() =>{
      await Axios.get("http://localhost:3001/user/Recommended",{params:{userID:userID}}).then((response) => {
        console.log("recommended Happened")
        setRecommendedBooks(response.data)
      })
    }

    const clearRecommendedBooks = () =>{
      setRecommendedBooks([])
    }




  return (
    <div>
      <div className="center">
        <h1> hello {userName} </h1>
      </div>

    <h1 id="centerOnly">Borrowed Book List</h1>
    {books.length > 0 ? <BookHistoryTable books = {books} /> : "No Books To Show"}
    
    <header className="header">
      <Button color = "DarkOrange" text="Generate my Recommended Books" onClick={getRecommendedBooks}/>
      <Button color = "DarkRed" text="Clear Recommeneded Books" onClick={clearRecommendedBooks}/>
    </header>
      {recommnedBooks.length > 0 && <BookTable books = {recommnedBooks} />}


    </div>
  );
}

export default BookHistory;
