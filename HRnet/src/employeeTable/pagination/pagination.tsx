import React from "react";
import "./pagination.css";

function Pagination({
    pagination,
    pageNumber,
    setPagination,
}: {
    pagination: number;
    pageNumber: number;
    setPagination: (pagination) => void;
}) {

    console.log(pageNumber)
    return (
        <div className="pagination">
            <button onClick={() => setPagination((prevValue) => prevValue - 1)} disabled={pagination === 1}>
                Previous
            </button>
            {pageNumber > 2 &&
                Array.from({ length: pageNumber }).map((pn, index) => {
                    const page = index + 1;
                    if (page !== 1 && page !== pageNumber && page !== pagination) {
                        if (pagination <= 4 && page <= 4) {
                            if (page === 4) {
                                if (pageNumber === 5)
                                    return (
                                        <button onClick={() => setPagination(page)} key={page}>
                                            {page}
                                        </button>
                                    );
                                return (
                                    <React.Fragment key={page}>
                                        <button onClick={() => setPagination(page)} key={page}>
                                            {page}
                                        </button>
                                        <button onClick={() => setPagination(page + 1)} key={page + 1}>
                                            {page + 1}
                                        </button>
                                        <p>...</p>
                                    </React.Fragment>
                                );
                            }
                            return (
                                <button onClick={() => setPagination(page)} key={page}>
                                    {page}
                                </button>
                            );
                        } else if (pagination > pageNumber - 4 && page > pageNumber - 4) {
                            if (page === pageNumber - 3) {
                                if (pageNumber === 5) {
                                    return (
                                        <button onClick={() => setPagination(page)} key={page}>
                                            {page}
                                        </button>
                                    );
                                }
                                return (
                                    <React.Fragment key={page}>
                                        <p>...</p>
                                        <button onClick={() => setPagination(page - 1)} key={page - 1}>
                                            {page - 1}
                                        </button>
                                        <button onClick={() => setPagination(page)} key={page}>
                                            {page}
                                        </button>
                                    </React.Fragment>
                                );
                            }
                            return (
                                <button onClick={() => setPagination(page)} key={page}>
                                    {page}
                                </button>
                            );
                        } else if (page === pagination - 1)
                            return (
                                <React.Fragment key={page}>
                                    <p>...</p>
                                    <button onClick={() => setPagination(page)} key={page}>
                                        {page}
                                    </button>
                                </React.Fragment>
                            );
                        else if (page === pagination + 1)
                            return (
                                <React.Fragment key={page}>
                                    <button onClick={() => setPagination(page)} key={page}>
                                        {page}
                                    </button>
                                    <p>...</p>
                                </React.Fragment>
                            );
                    } else
                        return (
                            <button
                                onClick={() => setPagination(page)}
                                key={page}
                                className={page === pagination ? "selected" : ""}
                            >
                                {page}
                            </button>
                        );
                })}
            <button
                onClick={() => setPagination((prevValue) => prevValue + 1)}
                disabled={pagination === pageNumber || pageNumber === 0}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
