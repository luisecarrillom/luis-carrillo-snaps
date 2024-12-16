import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FilterIcon from "../../assets/images/Filter.svg";
import FacebookIcon from "../../assets/images/Facebook.svg";
import InstagramIcon from "../../assets/images/Instagram.svg";
import TwitterIcon from "../../assets/images/X_twitter.svg";
import PinterestIcon from "../../assets/images/Pinterest.svg";
import "./ComponentName.scss";

const ComponentName = () => {
  const [tags, setTags] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${API_URL}/tags`);
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${API_URL}/photos`);
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchPhotos();
  }, []);

  const filteredPhotos = selectedFilter
    ? photos.filter((photo) => photo.tags.includes(selectedFilter))
    : photos;

  const toggleFilter = (tag) => {
    setSelectedFilter(tag === selectedFilter ? null : tag);
  };

  return (
    <div className="component">
      <header className="component__header">
        <Link to="/" className="component__title">
          Snaps
        </Link>
        <button
          className={`component__filter-toggle ${
            isFilterOpen ? "component__filter-toggle--active" : ""
          }`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filters
          <img
            src={FilterIcon}
            alt="Filter Icon"
            className={`filter-icon ${isFilterOpen ? "icon-white" : ""}`}
          />
        </button>
      </header>

      <div className="component__content">
        <div className="component__mission">
          <p>
            <strong>Our mission:</strong>
            <br />
            Provide photographers a space to share photos of the neighborhoods
            they cherish, <em>expressed in their unique style.</em>
          </p>
        </div>
        {isFilterOpen && (
          <div className="component__filters">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`component__filter ${
                  selectedFilter === tag ? "component__filter--active" : ""
                }`}
                onClick={() => toggleFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="component__gallery">
        {filteredPhotos.map((photo) => (
          <Link
            key={photo.id}
            to={`/photo/${photo.id}`}
            className="component__photo-card"
          >
            <img
              src={`${API_URL}/photos/${photo.photo}`}
              alt={photo.photoDescription || "Photo"}
            />
            <div className="component__photo-info">{photo.photographer}</div>
            <div className="component__photo-tags">
              {photo.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`tag ${
                    selectedFilter === tag ? "tag--active" : ""
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <footer className="component__footer">
        <div className="component__footer-content">
          <h1 className="footer__title">Snaps</h1>
          <div className="footer__links">
            <div className="footer__column">
              <p>
                <strong>For photographers</strong>
              </p>
              <p>
                <strong>Hire talent</strong>
              </p>
              <p>
                <strong>Inspiration</strong>
              </p>
            </div>
            <div className="footer__column">
              <p>
                <strong>About</strong>
              </p>
              <p>
                <strong>Careers</strong>
              </p>
              <p>
                <strong>Support</strong>
              </p>
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

export default ComponentName;

