import React, { useEffect, useState } from 'react'
import "./OthersPost.css";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CircleGrid from '../../../components/Loaders/CircleGrid';
import { BASE_URL } from '../../../App';

const OthersPost = () => {
    const params = useParams()
    const [postDetails, setPostDetails] = useState("")

    const navigate = useNavigate()

    const getPostDetails = () => {
        axios.get(`${BASE_URL}/post/${params.id}`)
            .then((result) => {
                setPostDetails(result.data)
            })
            .catch((error) => {
                console.error(error)
                navigate("/error")
            })
    }

    useEffect(() => {
        getPostDetails()
    }, [])

    return (
        postDetails
            ?
            <div className="others">
                <div className="othersPost">
                    <div className="othersPostWrapper">
                        <img className="othersPostImg" src={postDetails.photo} alt="" />
                        <h1 className="othersPostTitle">
                            {postDetails.title}
                        </h1>
                        <div className="othersPostInfo">
                            <span>
                                Author:
                                <b className="othersPostAuthor">
                                    {postDetails.author}
                                </b>
                            </span>
                            <span>{new Date(postDetails.createdAt).toDateString()}</span>
                        </div>
                        <p className="othersPostDesc">
                            {postDetails.desc}
                        </p>
                    </div>
                </div>
            </div>
            : <div className="infinite_loader">
                <CircleGrid />
            </div>
    );
}

export default OthersPost