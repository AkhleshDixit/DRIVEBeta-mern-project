import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';
import filelstcss from './UserFilesList.module.css'

export const UserFilesList = () => {

    let history = useHistory();
    const [files, setFiles] = useState([]);
    const id = localStorage.getItem('id');

    const deleteFile = (e) => {
        fetch(`/user/delete/${e.target.id}`, { method: "DELETE" }).then(resp => {
            resp.json().then((result) => {
                setFiles(files.splice(e.target.name, 1));
                setFiles(files);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    const downloadFile = (e) => {
        let userFilePath = files[e.target.name].userFilePath;
        // userFilePath = userFilePath.split("/");
        userFilePath = userFilePath.split("\\");
        const fileName = files[e.target.name].fileName;

        fetch(`/user/download/${userFilePath[3]}`)
            .then(async res => ({
                filename: fileName,
                blob: await res.blob()
            }))
            .then(resObj => {
                // It is necessary to create a new blob object with mime-type explicitly set for all browsers except Chrome, but it works for Chrome too.
                const newBlob = new Blob([resObj.blob]);

                // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob);
                } else {
                    // For other browsers: create a link pointing to the ObjectURL containing the blob.
                    const objUrl = window.URL.createObjectURL(newBlob);

                    let link = document.createElement('a');
                    link.href = objUrl;
                    link.download = resObj.filename;
                    link.click();

                    // For Firefox it is necessary to delay revoking the ObjectURL.
                    setTimeout(() => { window.URL.revokeObjectURL(objUrl); }, 250);
                }
            })
            .catch((error) => {
                console.log('DOWNLOAD ERROR', error);
            });
    }

    useEffect(() => {
        fetch(`/user/userFilesList/${id}`).then(resp => {
            resp.json().then((result) => {
                setFiles(result);
            });
        }).catch((err) => {
            console.log(err);
        })
    }, [id])


    return (
        <>
            <div className={filelstcss.container}>
                <div className={filelstcss.seccontainer}>
                    <Pagination data={files} downloadFile={downloadFile} deleteFile={deleteFile} />
                    <div className={filelstcss.bckbtn}>
                        <button onClick={() => { history.goBack() }}>Go Back</button>
                    </div>
                </div>
            </div>
        </>
    )
}
