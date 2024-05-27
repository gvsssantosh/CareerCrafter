import axios from 'axios';

export let authServiceObj =
{
    userRegister, userLogin, userUpdate, userUpdatePassword
};

let url = "http://localhost:3002/authenticationApi/"

// async function getToken() {
//     let authApiUrl = "http://localhost:3002/authapi/login";
//     let userObj = { "userName": "scott", "password": "scott123" }
//     let response = await axios.post(authApiUrl, userObj);
//     return response.data.token;
// }



async function userRegister(userObj) {
    //         let userObj = {
    //             password: req.body.password,
    //             first_name: req.body.first_name,
    //             last_name: req.body.last_name,
    //             email: req.body.email,
    //             phone_number: req.body.phone_number
    //         }
    try {
        let result = await axios.post(url + "/userRegister", userObj);
        return result.data;
    } catch (error) {
        return (error.response.data);
    }

}


async function userLogin(userObj) {
    //         let userObj = {
    //             email: req.body.email,        
    //             password: hashedPassword,
    //         }
    try {
        let result = await axios.post(url + "/userLogin", userObj);
        return result.data;
    } catch (error) {
        return error.response.data;
    }

}


async function userUpdate(userObj) {
    //         let userObj = {
    //             first_name: req.body.first_name,
    //             last_name: req.body.last_name,
    //             phone_number: req.body.phone_number,
    //             email: req.body.email
    //         }
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let result = await axios.put(url + `/userUpdate`, userObj, config);
    return result.data;
}
async function userUpdatePassword(userObj) {
    //         let userObj = {
    //             first_name: req.body.first_name,
    //             last_name: req.body.last_name,
    //             phone_number: req.body.phone_number,
    //             email: req.body.email
    //         }
    const token = sessionStorage.getItem('user-token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let result = await axios.put(url + `/userPasswordUpdate`, userObj, config);
    return result.data;
}
