import React from "react";
import './Pagination.css'

function Pagination ({pageInfo, onPageChange}) {
    const {blockSize, startPage, endPage, currentPage, totalPages, hasPrev, hasNext} = pageInfo

    const pages = [];
    for (let i = startPage; i<=endPage; i ++) {
        pages.push(i);
    }

    return (
        <div className="pagination-wrapper">
            <div className="pagination">
                {/* 에러 방지용 */}
                <input type="hidden" value={blockSize} />
                {/* 처음 버튼 */}
                <button type="button" onClick={() => onPageChange(1)} disabled={currentPage === 1} className={currentPage === 1 ? "disabled" : ""}>&laquo;</button>

                {/* 이전 버튼 */}
                {hasPrev && (
                    <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? "disabled" : ""}>&lsaquo;</button>
                )}
                
                {/* 페이지 블럭 */}
                {pages.map((page) => (
                    <button type="button" key={page} onClick={() => onPageChange(page)} className={currentPage === page ? "active" : ""}>{page}</button>
                ))}

                {/* 다음 버튼 */}
                {hasNext && (
                    <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : ""} >&rsaquo;</button>
                )}

                {/* 마지막 버튼 */}
                <button type="button" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : ""}>&raquo;</button>
            </div>
        </div>
    );

}

export default Pagination;