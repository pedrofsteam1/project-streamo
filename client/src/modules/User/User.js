import Axios from 'axios';

export default {
    registerUser: async (nome, email, password) => {
        const msg = {
            nome: nome,
            email: email,
            password: password
        }
        const response = await Axios.post('/register/signUp', msg);

        return response.data;
    },

    userLogin: async (email, pw) => {
        const msg = {
            email: email,
            password: pw
        }
        const response = await Axios.post('/login/signIn', msg);

        return response.data;
    },

    checkEmail: async (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}