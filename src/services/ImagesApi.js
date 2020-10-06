import axios from 'axios';

const fetchImages = ({ searchQuery = '', currentPage = 1 }) => {
  return axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=18518596-31881a04385693b28c16ddbf4&image_type=photo&orientation=horizontal&per_page=12`,
  );
};

export default { fetchImages };
