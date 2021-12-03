import { useState, useEffect } from 'react'
import BookTable from './BookTable';
import BooksHeader from './BooksHeader';
import Axios from "axios";
import './general.css'
import BookFilters from './BookFilters';


const Book = ({user}) =>{
    const [showAll, setShowAll] = useState(true)
    const [books, setBooks] = useState([{
      bookID: 1,
      bookTitle: '"13 1/2"',
      author: 'Barr Nevada',
      bookCopies: 2,
      libraryName: 'Central Library'
    }]);
    const [userID, setUserID] = useState(user)

    useEffect(() => { 
      const getBooks = async () => {
          const data = await fetchBooks()
          //console.log(data)
      }
      getBooks()
    }, [])
  
    const fetchBooks = async() =>{
      //console.log("this happens first")
      await Axios.get("http://localhost:3001/books").then((response) => {
        setBooks(response.data)
        return response.data
      })
    }

    const filterShow = async()=>{
      if(showAll){
        await Axios.get("http://localhost:3001/books/all").then((response) => {
         setBooks(response.data)
        })
      }
      else{
        await Axios.get("http://localhost:3001/books").then((response) => {
         setBooks(response.data)
        })
      }

      setShowAll(!showAll)
    }


    const newRandomBook = async() =>{
      //console.log("Random Books happened")
      await Axios.get("http://localhost:3001/Filter/Random", {params:{userID:userID}}).then((response) => {
        setBooks(response.data)
      })
    }

    const getPopularBooks = async() =>{
      //console.log("Popular Books happened")
      await Axios.get("http://localhost:3001/Filter/Popular").then((response) => {
        setBooks(response.data)
      })
    }

    const filterBooks = async(filterTitle,titleText,filterAuthor, authorText, filterGenre, genreText, filterAvailable, filterAll) =>{
      console.log("filterTitle is: ", filterTitle)
      await Axios.get("http://localhost:3001/Filter", 
      {params: {filterTitle: filterTitle, titleText: titleText, filterAuthor: filterAuthor, authorText: authorText, filterGenre: filterGenre, genreText: genreText, filterAvailable: filterAvailable, filterAll: filterAll }})
      .then((response) => {
        setBooks(response.data)
       })
    }




  return (
    <div>
      <BooksHeader showAll = {!showAll} onShow={filterShow}/>
      <BookFilters onFilter={filterBooks} onNewRandom={newRandomBook} onPopular={getPopularBooks}/>
    <h1>Book List</h1>
    {books.length > 0 ? <BookTable books = {books}/> : "No Books To Show"}
    </div>
  );
}

export default Book;
