import axios from 'axios';
// eslint-disable-next-line
export default {
    getUsers: ()=> axios.get("https://randomuser.me/api/?results=100&nat=us")
};
//*** Random dummy information to populate the directory. ***//

