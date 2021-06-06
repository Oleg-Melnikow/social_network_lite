import React from 'react';
import style from "./Paginator.module.css"

type PaginatorPropType = {
    pageSize: number,
    currentPage: number,
    totalUsersCount: number,
    onPageChanged: (pageNumber: number) => void,
}

export const Paginator = (props: PaginatorPropType) => {

    let {pageSize, currentPage, totalUsersCount, onPageChanged} = props;

    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages: number[] = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {pages.map((p, i) => <span key={i}
                                       onClick={() => onPageChanged(p)}
                                       className={currentPage === p ? style.selectPage : ""}> {p}</span>)}
        </div>
    )
}