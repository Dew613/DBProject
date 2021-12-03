const BookTableRow = ({book}) => {
    // console.log(book)
    return(
        <tr> 
        <td>{book.bookID}</td>
        <td>{book.bookTitle}</td>
        <td>{book.author}</td>
        <td>{book.bookGenre}</td>
        <td>{book.bookCopies}</td>
        <td>{book.libraryName}</td>
    </tr>
    )
}



export default BookTableRow