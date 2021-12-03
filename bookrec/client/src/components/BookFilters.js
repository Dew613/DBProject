import { useState } from "react"
import Button from "./Button"

const BookFilters = ({onFilter,onNewRandom,onPopular}) =>{

    const [titleText, setTitleText] = useState("")
    const [authorText, setAuthorText] = useState("")
    const [GenreText, setGenreText] = useState("")
    const [filterTitle, setFilterTitle] = useState(false)
    const [filterAuthor, setFilterAuthor] = useState(false)
    const [filterGenre, setFilterGenre] = useState(false)
    const [filterAvailable, setFilterAvailable] = useState(false)
    const [filterAll, setFilterAll] = useState(true)

    const onSubmit = (e) => {
        e.preventDefault()

        if(filterTitle && !titleText){
            alert("please add a title")
            return
        }

        if(filterAuthor && !authorText){
            alert("please add an author")
            return
        }

        if(filterGenre && !GenreText){
            alert("please add a genre")
            return
        }

        onFilter(filterTitle,titleText,filterAuthor, authorText, filterGenre, GenreText, filterAvailable, filterAll)
        setTitleText("")
        setAuthorText("")
        setGenreText("")
        setFilterTitle(false)
        setFilterAuthor(false)
        setFilterGenre(false)
        setFilterAvailable(false)
        setFilterAll(true)
    }

    return(
        <div className ="container"> 
            <form className="add-form" onSubmit={onSubmit}>
                
                <div className="form-control form-control-check">
                    <label>Filter Title</label>
                    <input type="checkbox" checked={filterTitle}
                    value={filterTitle} onChange={(e) => {
                        setFilterTitle(e.currentTarget.checked)
                        setTitleText("")
                        }}></input>

                   {filterTitle && <label>Title</label>}
                   {filterTitle && <input type="text" placeholder="Title contains ... " 
                    value={titleText} onChange={(e) => setTitleText(e.target.value)}>
                    </input>}
                </div>
                <div className="form-control form-control-check">
                    <label>Filter Author</label>
                    <input type="checkbox" checked={filterAuthor}
                    value={filterAuthor} onChange={(e) => {
                        setFilterAuthor(e.currentTarget.checked)
                        setAuthorText("")
                        }}></input>

                    {filterAuthor && <label>Author</label>}
                    {filterAuthor && <input type="text" placeholder="Author contains ... " 
                    value={authorText} onChange={(e) => setAuthorText(e.target.value)}>
                    </input>}
                </div>
                <div className="form-control form-control-check">
                    <label>Filter Genre</label>
                    <input type="checkbox" checked={filterGenre}
                    value={filterGenre} onChange={(e) => {
                        setFilterGenre(e.currentTarget.checked)
                        setGenreText("")
                        }}></input>

                    {filterGenre && <label>Genre</label>}
                    {filterGenre && <input type="text" placeholder="Genre contains ..." 
                    value={GenreText} onChange={(e) => setGenreText(e.target.value)}>
                    </input>}
                </div>
                <div className="form-control form-control-check">
                    <label>Filter Available</label>
                    <input type="checkbox" checked={filterAvailable}
                    value={filterAvailable} onChange={(e) => setFilterAvailable(e.currentTarget.checked)}></input>
                </div>
                <div className="form-control form-control-check">
                    <label>Limit 50</label>
                    <input type="checkbox" checked={filterAll}
                    value={filterAll} onChange={(e) => setFilterAll(e.currentTarget.checked)}></input>
                </div>
                <input type="submit" value="Filter Books" className="btn btn-block"></input>
            </form>
            <div>
            <Button color="green" text = "New Random Book" onClick={onNewRandom}/>
            </div>
            <Button color="blue" text = "Top 10 Most Popular Books" onClick = {onPopular}/>

        </div>
    )
}

export default BookFilters