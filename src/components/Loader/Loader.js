import React from 'react';
import styles from './Loader.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const LoaderSpiner = () => {
  return <Loader className={styles.Loader} type="ThreeDots" color="#3f51b5" />;
};

export default LoaderSpiner;
