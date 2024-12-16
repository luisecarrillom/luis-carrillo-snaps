import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./PageName.scss";

import FacebookIcon from "../../assets/images/Facebook.svg";
import InstagramIcon from "../../assets/images/Instagram.svg";
import TwitterIcon from "../../assets/images/X_twitter.svg";
import PinterestIcon from "../../assets/images/Pinterest.svg";
import ArrowIcon from "../../assets/images/Arrow.svg";
import LikeIcon from "../../assets/images/Like_Outline.svg";

const PageName = () => {
  const { id } = useParams(); 
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });


  const fetchPhotoData = async () => {
    try {
 
      const photoResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/photos/${id}`
      );
      setPhoto(photoResponse.data);

   
      const commentsResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/photos/${id}/comments`
      );
      setComments(commentsResponse.data || []); 
    } catch (error) {
      console.error("Error fetching photo data:", error);
    }
  };

  useEffect(() => {
    fetchPhotoData();
  }, [id]);


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.comment) {
      alert("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/photos/${id}/comments`,
        newComment,
        { headers: { "Content-Type": "application/json" } }
      );

      setComments([...comments, response.data]); 
      setNewComment({ name: "", comment: "" }); 
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">

      <header className="page__header">
        <Link to="/">
          <h1>Snaps</h1>
        </Link>
        <Link to="/" className="page__home-link">
          <img src={ArrowIcon} alt="Arrow" className="page__arrow-icon" />
          <span className="page__home-text">Home</span>
        </Link>
      </header>


      <div className="page__content">
        <div className="page__photo-container">
          <img
            src={`${import.meta.env.VITE_REACT_APP_API_URL}/api/${photo.photo}`}
            alt={photo.photoDescription}
            className="page__photo"
          />
          <div className="page__photo-details">
            <p>
              <strong>Photo by {photo.photographer}</strong>
            </p>
            <p>{photo.photoDescription}</p>
            <p className="page__likes">
              <img src={LikeIcon} alt="Like Icon" className="page__like-icon" />
              {photo.likes} likes
            </p>
            <div className="page__tags">
              {photo.tags?.map((tag, index) => (
                <span key={index} className="page__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page__comments">
        <h3>{comments.length} Comments</h3>
        <form onSubmit={handleCommentSubmit} className="page__comment-form">
          <label htmlFor="name">
            <strong>Name</strong>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={newComment.name}
            onChange={(e) =>
              setNewComment({ ...newComment, name: e.target.value })
            }
          />
          <label htmlFor="comment">
            <strong>Comment</strong>
          </label>
          <textarea
            id="comment"
            placeholder="Comment"
            value={newComment.comment}
            onChange={(e) =>
              setNewComment({ ...newComment, comment: e.target.value })
            }
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        <ul className="page__comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="page__comment">
              <p>
                <strong>{comment.name}</strong>{" "}
                {new Date(comment.timestamp).toLocaleDateString()}
              </p>
              <p>{comment.comment}</p>
            </li>
          ))}
        </ul>
      </div>

      <footer className="component__footer">
        <div className="component__footer-content">
          <h1 className="footer__title">Snaps</h1>
          <div className="footer__links">
            <div className="footer__column">
              <p><strong>For photographers</strong></p>
              <p><strong>Hire talent</strong></p>
              <p><strong>Inspiration</strong></p>
            </div>
            <div className="footer__column">
              <p><strong>About</strong></p>
              <p><strong>Careers</strong></p>
              <p><strong>Support</strong></p>
            </div>
          </div>
          <div className="footer__social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={FacebookIcon} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src={TwitterIcon} alt="Twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={InstagramIcon} alt="Instagram" />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">
              <img src={PinterestIcon} alt="Pinterest" />
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2024 Snaps . Terms Privacy Cookies</p>
        </div>
      </footer>
    </div>
  );
};

export default PageName;
