import axios from "axios";


export default {
    checkLogin: async () => {
        const res = await axios.post('/api/auth');
        return res.data;
    },

    logOut: async () => {
        const res = await axios.get('/api/logout');
        console.log(res.data)
        return res.data
    },

    signIn: async (email, pw) => {
        const msg = {
            email: email,
            password: pw
        }
        const res = await axios.post('/api/signIn', {username: email, password: pw}, {withCredentials: true});
        return res.data;
    }
}