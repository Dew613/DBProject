import BookHistoryTableRow from "./BookHistoryTableRow"

const BookHistoryTable = ({books}) =>{
    // console.log(books)
    
    return(

        <table border="1" className="center">
            <thead>
                <tr>
                    <th> Book ID </th>
                    <th> Book Title </th>
                    <th> Author </th>
                    <th> Book Genre </th>
                    <th> Borrow Date </th>
                    <th> Library </th>
                </tr>
            </thead>
            <tbody>

                {books.map((book, index) => (
                    <BookHistoryTableRow key={index} book={book}/>
                ))}
                
            </tbody>
        </table>
    )
}


export default BookHistoryTable