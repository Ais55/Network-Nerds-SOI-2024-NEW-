import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AdminIssueBooks.css";
const IssuedBooks = ({ role }) => {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== "" && role !== "student") {
            navigate("/error");
        }
    }, [role]);
    useEffect(() => {
        const fetchIssuedBooks = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/book/book-issues`
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
    console.log(issuedBooks);
    return (
        role === "student" && (
            <div className="admin-issued-books">
                <h1>Book Issue History: </h1>
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
                                        {/* <p>
                                Student: {issue.username} ({issue.roll})
                            </p> */}
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
                                        ) : !issue.issued ? (
                                            <div>
                                                <strong className="pending">
                                                    Pending Admin Confirmation
                                                </strong>
                                            </div>
                                        ) : (
                                            <div>
                                            <p>
                                                <strong className="to-be-returned">
                                                    To be returned on:{" "}
                                                </strong>
                                                {
                                                    new Date(issue.return_date)
                                                        .toISOString()
                                                        .split("T")[0]
                                                }
                                            </p>
                                            {Math.ceil((new Date(issue.return_date))/ (1000 * 3600 * 24)) < Math.ceil((new Date(Date.now()))/ (1000 * 3600 * 24))? <strong className="pending">
                                            Return with Penalty of {Math.ceil((new Date(issue.return_date) - Date.now())/ (1000 * 3600 * 24))} days
                                                </strong>: ""}
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
        )
    );
};

export default IssuedBooks;
