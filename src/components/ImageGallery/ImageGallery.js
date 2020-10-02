import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, imageClick }) => (
  <ul className={styles.ImageGallery}>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <li
        className={styles.ImageGalleryItem}
        key={id}
        onClick={() => imageClick(largeImageURL)}
      >
        <ImageGalleryItem webformatURL={webformatURL} />
      </li>
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  imageClick: PropTypes.func.isRequired,
};
export default ImageGallery;
