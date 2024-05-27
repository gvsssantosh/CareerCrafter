    import axios from 'axios';

    export const adminServiceObj = {
        createAdmin,
        adminLogin,
        updateAdminPassword,
        updateAdmin
    };

    const url = 'http://localhost:3002/adminapi';

    async function createAdmin(adminObj) {
        try {
            let result = await axios.post(`${url}/adminRegister`, adminObj);
            return result.data;
        } catch (error) {
            console.error('Error creating admin:', error);
            throw error;
        }
    }

    async function adminLogin(adminObj) {
        try {
            let result = await axios.post(`${url}/adminLogin`, adminObj);
            console.log(result.data);
            return result.data;
            
        } catch (error) {
            console.error('Error logging in admin:', error);
            throw error;
        }
    }

    async function updateAdminPassword(adminObj) {
        try {

            console.log(adminObj);
            let result = await axios.put(`${url}/adminPasswordUpdate`, adminObj);
            return result.data;
        } catch (error) {
            console.error('Error updating admin password:', error);
            throw error;
        }
    }
    
    async function updateAdmin(adminObj, adminID) {
        try {
            const token = sessionStorage.getItem('admin-token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            let result = await axios.put(`${url}/updateAdmin/${adminID}`, adminObj, config);
            return result.data;
        } catch (error) {
            console.error('Error updating admin details:', error);
            throw error;
        }
    }
