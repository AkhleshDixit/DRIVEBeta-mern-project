import React, { useState } from 'react'
import pag from './Pagination.module.css';

export const Pagination = ({ data, downloadFile, deleteFile }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const itemsPerpage = 5;
    const pageNumbersLimit = 5;
    const indexOfLastItem = currentPage * itemsPerpage;
    const indexOfFirstItem = indexOfLastItem - itemsPerpage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    let pages = [];

    for (let i = 1; i <= Math.ceil(data.length / itemsPerpage); i++) {
        pages.push(i);
    }

    const renderPageNumbers = pages.map((number) => {
        if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
            return <li key={number} onClick={() => { setCurrentPage(number) }} className={currentPage === number ? pag.active : null}>{number}</li>
        }
        else {
            return null
        }
    });

    const renderData = currentItems.map((file, index) => {
        return <li key={file._id} className={pag.listitem} ><div className={pag.filesname}>{file.fileName}</div> <button name={index} id={file._id} onClick={downloadFile}>Download</button><button name={index} id={file._id} onClick={deleteFile}>Delete</button></li>
    });

    const handleNextClick = () => {
        if (currentPage + 1 > maxPageNumberLimit) {
            setMinPageNumberLimit(currentPage + 1);
            setMaxPageNumberLimit(currentPage + pageNumbersLimit);
        }
        setCurrentPage(currentPage + 1);
    }

    const handlePrevClick = () => {
        if ((currentPage - 1) < minPageNumberLimit) {
            setMinPageNumberLimit(currentPage - pageNumbersLimit);
            setMaxPageNumberLimit(currentPage - 1);
        }
        setCurrentPage(currentPage - 1);
    }

    return (
        <div>
            {
                data.length === 0 ? <div className={pag.nothtoshow}><h1>Nothing to show</h1></div> :
                    (
                        <>
                            <div className={pag.lstitem}><span className={pag.filename}>File Name</span><p>Download</p><p>Delete</p></div>
                            <hr />
                            {renderData}
                            <ul className={pag.pagenumbers}>
                                <li>
                                    <button onClick={handlePrevClick} disabled={currentPage === pages[0] ? true : false}>Prev</button>
                                </li>
                                {renderPageNumbers}
                                <li>
                                    <button onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button>
                                </li>
                            </ul>
                        </>
                    )
            }
        </div>
    )
}
