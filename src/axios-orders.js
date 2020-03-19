import axios from 'axios';

const instance=axios.create({
    baseURL: 'https://burguerbuilder1.firebaseio.com/'
});

export default instance;