import PropTypes from 'prop-types'
import Button from './Button'

const BooksHeader = ({title, onShow, showAll}) => {


    return(

        <header className = "header">
            <h1> {title} </h1>
            <Button color = {showAll ? "red" :'silver'} text = {showAll ? "Show 50" : "Show All"} onClick = {onShow}/>
        </header>
    )
}

BooksHeader.defaultProps = {
    title: "RESET: "
}

BooksHeader.propTypes = {
    title: PropTypes.string.isRequired,
}
export default BooksHeader