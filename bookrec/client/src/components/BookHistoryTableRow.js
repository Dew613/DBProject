const BookHistoryTableRow = ({book}) => {
    //console.log(typeof book.borrowDate)
    // const book_date = book.borrowDate ? book.borrowDate.substring(0,10) : "no date"
    return(
        <tr> 
        <td>{book.bookID}</td>
        <td>{book.bookTitle}</td>
        <td>{book.author}</td>
        <td>{book.bookGenre}</td>
        <td>{book.borrowDate ? book.borrowDate.substring(0,10) : "no date"}</td>
        <td>{book.libraryName}</td>
    </tr>
    )
}



export default BookHistoryTableRow