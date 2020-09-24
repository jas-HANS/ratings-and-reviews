import axios from 'axios';

const getReviews = () => {
  axios.get('http://52.26.193.201:3000/products/list')
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export default getReviews;
