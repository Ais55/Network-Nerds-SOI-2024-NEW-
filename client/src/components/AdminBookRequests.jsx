import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
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

    const handleApprove = async (issueId) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/book/approve-issue/${issueId}`
            );
            const newIssuedBooks = issuedBooks.filter((b) => b.id !== issueId);
            setIssuedBooks(newIssuedBooks);
        } catch (error) {
            console.error("Error approving issue:", error);
        }
    };
    const handleDeny = async (issueId) => {
        try{
            console.log(issueId)
            await axios.delete(`${import.meta.env.VITE_API_URL}/book/issue/${issueId}`)
                // console.log(issuedBooks)
                const newIssues = issuedBooks.filter( issue => issue.id!==issueId)
                setIssuedBooks(newIssues)
            }catch(err){
                console.log(err)
            }
    }
    // console.log(issuedBooks);
    return (role==='admin' &&
        <div className="admin-issued-books">
    <h1>Requested Issues: </h1>
    {issuedBooks.length ? (
        <ul className="requested-issues-list">
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
                            <p>Book ID to be issued: {issue.instance}</p>
                            <button
                                className="approve-button"
                                onClick={() => {
                                    handleApprove(issue.id);
                                }}>
                                Approve Issue
                            </button>
                            <button
                                className="deny-button"
                                onClick={() => {
                                    handleDeny(issue.id);
                                }}>
                                Deny Issue
                            </button>
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
