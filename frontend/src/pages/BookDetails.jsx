import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Link } from "react-router-dom";

const BookDetails = () => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [authors, setAuthors] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://softwium.com/api/books/${id}`)
        .then((res) => {
            setBook(res.data);
            setAuthors(res.data.authors);
            console.log(res.data);
            console.log(authors);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    return (        
        
            loading ? (
                <Spinner />
            ) : (
                <div className="wrapper">
                    <div className="box bg-gray-100 text-gray-800-500">
                        <Link to={'/books'} className="backArrow">⬅</Link>
                        <div className="subBox">
                            <h3><b>Title : </b></h3>
                            <h3 className="font-semibold">{book.title}</h3>
                        </div>
                        <div className="subBox">
                            <h3><b>ID : </b></h3>
                            <h3>{book.id}</h3>
                        </div>
                        <div className="subBox">
                            <h3><b>ISBN : </b></h3>
                            <h3>{book.isbn}</h3>
                        </div>
                        <div className="subBox">
                            <h3><b>Pages : </b></h3>
                            <h3>{book.pageCount}</h3>
                        </div>
                        <div className="subBox">
                            <h3><b>Authors : </b></h3>
                            {
                                authors.map((author, index) => (
                                    <div className="authorBox bg-green-500 font-semibold" key={index}>
                                        {
                                            author ? <h3>{author}</h3> : <h3>TBD</h3>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )
        
    );
}

export default BookDetails;