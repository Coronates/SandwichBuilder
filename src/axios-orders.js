import axios from 'axios';

const instance=axios.create({
    baseURL: 'https://sandwichbuilder1.firebaseio.com/'
});

export default instance;