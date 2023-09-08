import React from "react";
import { useState} from "react";
import CardGrid from "./CardGrid";

function UsePagination({ records, searcTerms, recordesPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordesPerPage;
  const firstIndex = lastIndex - recordesPerPage;
  let renderRecords = records.slice(firstIndex, lastIndex);
  const numOfPages = Math.ceil(records.length / recordesPerPage);
  const numbers = [...Array(numOfPages + 1).keys()].slice(1);
  return (
    <div>
      <CardGrid rooms={renderRecords} searchTerms={searcTerms} />
      <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prevPage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
              <a href="#" className="page-link" onClick={() => changeCurrentPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );

  function prevPage(){
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1);
    }
  }

  function changeCurrentPage(id){
    setCurrentPage(id);
  }

  function nextPage(n){
    if (nextPage !== numOfPages){
        setCurrentPage(currentPage + 1);
    }
  }
}


export default UsePagination;
