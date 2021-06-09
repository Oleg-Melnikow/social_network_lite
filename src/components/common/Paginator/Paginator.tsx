import React, {useState} from 'react';
import style from "./Paginator.module.css"

type PaginatorPropType = {
    pageSize: number,
    currentPage: number,
    totalUsersCount: number,
    onPageChanged: (pageNumber: number) => void,
}

export const Paginator = (props: PaginatorPropType) => {

    let {pageSize, currentPage, totalUsersCount, onPageChanged} = props;
    let portionSize = 10;
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages: number[] = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pageCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize - 1
    let rightPortionNumber = portionNumber * portionSize

    return (
        <div className={style.pagination}>
            {
                portionNumber > 1 &&
                <span className={style.first}
                      onClick={() => setPortionNumber(portionNumber - 1)}>Prev</span>
            }
            {
                pages.filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                    .map((p, i) => <span key={i}
                                         onClick={() => onPageChanged(p)}
                                         className={currentPage === p ? style.active : ""}>{p}</span>)
            }
            {
                portionCount > portionNumber &&
                <span className={style.last}
                      onClick={() => setPortionNumber(portionNumber + 1)}>Next</span>
            }
        </div>
    )
}