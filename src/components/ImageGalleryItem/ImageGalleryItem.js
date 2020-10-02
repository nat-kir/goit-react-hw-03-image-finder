import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL }) => (
  <img className={styles.ImageGalleryItemImage} src={webformatURL} alt=""></img>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
