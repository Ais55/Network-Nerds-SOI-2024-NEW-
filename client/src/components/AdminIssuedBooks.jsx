import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import "../css/AdminIssueBooks.css";
const AdminIssuedBooks = ({role}) => {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (role!=='' && role!=='admin') {
            navigate('/error')
        }
    }, [role])
    useEffect(() => {
        const fetchIssuedBooks = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/book/book-issues`,
                    {
                        params: {
                            approved: true,
                        },
                    }
                );
                const sortedData = response.data.sort((a, b) => {
                    return new Date(b.issued_date) - new Date(a.issued_date);
                });
                setIssuedBooks(sortedData);
            } catch (error) {
                console.error("Error fetching issued books:", error);
            }
        };

        fetchIssuedBooks();
    }, []);
    const handleReturn = async (issueId) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/book/returnedissue/${issueId}`
            );
            const newIssuedBooks = issuedBooks.map((b) =>
                b.id === issueId ? { ...b, returned: true } : b
            );
            setIssuedBooks(newIssuedBooks);
        } catch (error) {
            console.error("Error approving issue:", error);
        }
    };
    // console.log(issuedBooks);
    return (role==='admin' &&
        <div className="admin-issued-books">
            <h1>Approved Issues: </h1>
            {issuedBooks.length ? (
                <ul className="admin-issued-books">
                    {issuedBooks.map((issue) => (
                        <li key={issue.id}>
                            <div className="issue-details">
                                <div className="image-container">
                                    <img
                                        src={issue.image_url}
                                        alt={issue.title}
                                        className="book-image"
                                    />
                                </div>
                                <div className="text-details">
                                    <p>Book: {issue.title}</p>
                                    <p>
                                        Student: {issue.username} ({issue.roll})
                                    </p>
                                    <p>Book ID issued: {issue.instance}</p>
                                    <p>
                                        Issue Date:{" "}
                                        {
                                            new Date(issue.issued_date)
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                    </p>
                                    {issue.returned ? (
                                        <p>
                                            <strong className="returned">
                                                Returned on:{" "}
                                            </strong>
                                            {
                                                new Date(issue.return_date)
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                        </p>
                                    ) : (
                                        <div>
                                            <button
                                                className="approve-button"
                                                onClick={() =>
                                                    handleReturn(issue.id)
                                                }>
                                                Mark as returned
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No Requests currently.</div>
            )}
        </div>
    );
};

export default AdminIssuedBooks;
