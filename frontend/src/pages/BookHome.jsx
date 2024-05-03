import React, { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const BookHome = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [maxPages, setMaxPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get('https://softwium.com/api/books')
        .then((res) => {
            setBooks(res.data);
            setLoading(false);
            console.log(res.data.length);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleMaxPagesChange = (event) => {
        const value = parseInt(event.target.value);
        setMaxPages(value);
    }

    const filteredBooks = books.filter(book => {
        if(searchTerm==''){
            return true;
        }
        return book.title.toLowerCase().includes(searchTerm.toLowerCase());
    }).filter(book => {
        if(maxPages === 0){
            return true;
        }
        return book.pageCount <= maxPages;
    });

    return (
        <div>
            <div className="p-4">
            <div className="flex justify-between items-center bg-gray-100 py-4 px-6 shadow-md rounded-lg mb-4">
                <h1 className="text-3xl text-gray-800 font-semibold inline-flex items-center font-serif">
                    <span className="text-sky-500 text-4xl mr-2">📚</span> Hirademy Book Shelf
                </h1>
            </div>

            <div className="flex justify-between items-center mb-4">
                <input type="text" 
                placeholder="Search by title" 
                value={searchTerm} 
                onChange={handleSearchTermChange} 
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500" />

                <input type="number" 
                placeholder="Max Pages" 
                value={maxPages} 
                onChange={handleMaxPagesChange} 
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500" />
            </div>

            {
                loading ? (
                    <Spinner />
                ) : (

                    <table className="w-full border-separate border-spacing-2 mainTable">
                        <thead className="bg-gray-200 border-b-2 border-gray-200">
                            <tr>
                                <th className="border-slate-600 rounded-md p-3 font-semibold tracking-wide text-left">ID</th>
                                <th className="border-slate-600 rounded-md p-3 font-semibold tracking-wide text-left">Title</th>
                                <th className="border-slate-600 rounded-md max-md:hidden p-3 font-semibold tracking-wide text-left">Pages</th>
                                <th className="border-slate-600 rounded-md max-md:hidden p-3 font-semibold tracking-wide text-left">ISBN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredBooks.map((book, index) => (
                                    <tr  className="h-8">
                                        <td className="border border-slate-700 rounded-md text-center p-3 font-medium">
                                            {book.id}
                                        </td>
                                        <td className="border border-slate-700 rounded-md text-center p-3 font-medium titleHover">
                                            <Link to={`/books/${book.id}`}>{book.title}</Link>
                                        </td>
                                        <td className="border border-slate-700 rounded-md text-center max-md:hidden p-3 font-medium">
                                            {book.pageCount}
                                        </td>
                                        <td className="border border-slate-700 rounded-md text-center max-md:hidden p-3 font-medium">
                                            {book.isbn}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                )
            }
        </div>
        </div>
    );
}

export default BookHome;