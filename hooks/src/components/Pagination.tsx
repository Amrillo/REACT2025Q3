import { useState, type FC } from "react"

type PaginationPropsType = {  
    setPage: (page: number) => void;
    page : number
}
export const Pagination: FC<PaginationPropsType> = ({setPage , page}) => {  

    return ( 
        <div className="pagination">
            <button
                className="pagination-btn"
                disabled = {page === 1}
                onClick={()=> setPage(page - 1)}
                > Prev </button>
            <button className="pagination-page">{page}</button>
            <button
                className="pagination-btn"
                onClick={()=> setPage(page + 1)}    
                 >Next</button>
        </div>
    )
}