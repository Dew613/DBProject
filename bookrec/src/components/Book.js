import React, { useState }  from "react";
import { CsvToHtmlTable } from "react-csv-to-table";

import { sampleData } from "./BookData.js";

const Book = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div id="searchPage" >
            <input id = "searchbar"type="text" placeholder="" onChange={event => {
                setSearchTerm(event.target.value);
            }}>

            </input>
            <br></br>
            

                    <CsvToHtmlTable
                        data={sampleData}
                        csvDelimiter=","
                        tableClassName="tableborder"
                    />


                    
                    <pre>
                    {sampleData}
                    </pre>

                    
                </div>
        
    )
}

export default Book
