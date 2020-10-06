import React, { Component } from 'react';
// import axios from 'axios';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/SearchBar';
import Modal from './components/Modal';
import Button from './components/Button';
import LoaderSpiner from './components/Loader';
import ImagesApi from './services/ImagesApi';

class App extends Component {
  state = {
    images: [],
    showModal: false,
    largeImageURL: '',
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }
  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };
    this.setState({ isLoading: true });

    ImagesApi.fetchImages(options)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  imageClickHandler = imageURL => {
    this.setState({ largeImageURL: imageURL });
    this.toggleModal();
  };

  render() {
    const { images, showModal, largeImageURL, isLoading, error } = this.state;
    return (
      <>
        {error && <h2>Ops, something went wrong</h2>}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt=""></img>
          </Modal>
        )}
        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery images={images} imageClick={this.imageClickHandler} />

        {isLoading && <LoaderSpiner />}
        {images.length > 0 && !isLoading && (
          <Button onButtonClick={this.fetchImages} />
        )}
      </>
    );
  }
}

export default App;
