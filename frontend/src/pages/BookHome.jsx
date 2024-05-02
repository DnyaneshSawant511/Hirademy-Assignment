import React, { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "../components/Spinner";

const BookHome = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
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
    return (
        <div>
            <div className="p-4">
            <div className="flex justify-between items-center bg-gray-100 py-4 px-6 shadow-md rounded-lg mb-4">
                <h1 className="text-3xl text-gray-800 font-semibold inline-flex items-center font-serif">
                    <span className="text-sky-500 text-4xl mr-2">📚</span> Hirademy Book Shelf
                </h1>
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
                                books.map((book, index) => (
                                    <tr  className="h-8">
                                        <td className="border border-slate-700 rounded-md text-center p-3 font-medium">
                                            {book.id}
                                        </td>
                                        <td className="border border-slate-700 rounded-md text-center p-3 font-medium">
                                            {book.title}
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