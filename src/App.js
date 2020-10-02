import React, { Component } from 'react';
import axios from 'axios';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/SearchBar';
import Modal from './components/Modal';
import Button from './components/Button';
import LoaderSpiner from './components/Loader';

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
      this.fetchPictures();
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

  fetchPictures = () => {
    const { currentPage, searchQuery, error } = this.state;
    this.setState({ isLoading: true });
    axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=18518596-31881a04385693b28c16ddbf4&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(erro => this.setState({ error }))
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
          <Button onButtonClick={this.fetchPictures} />
        )}
      </>
    );
  }
}

export default App;
