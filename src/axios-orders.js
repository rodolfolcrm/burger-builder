import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-730cc.firebaseio.com/'
});

export default instance;