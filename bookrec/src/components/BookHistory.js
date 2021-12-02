import React, { Component } from 'react';
import { CsvToHtmlTable } from "react-csv-to-table";

import { historyData } from "./HistoryData.js";

class BookHistory extends Component {
   
       
     render() {
       
     
       return (
           <div>
               Recommended books: 346, 373, 677, 137

                <CsvToHtmlTable
                        data={historyData}
                        csvDelimiter=","
                        tableClassName="table table-striped table-hover"
                    />


                    
                    {/* <pre>
                    {bookHistory}
                    </pre> */}


           </div>


         
          
           
       );
     }
}
   
export default BookHistory;