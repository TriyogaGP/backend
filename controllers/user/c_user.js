const { m_user } = require('../../models');

error = {}

const readData = (req, res) => {
    // buat query sql
    const querySql = `SELECT a.id, a.roleID, a.name, a.email, a.password, a.gambar, a.gambarGmail, a.codeLog, a.activeAkun, 
        DATE_FORMAT(a.createdAt,'%Y-%m-%d') AS createdAt, DATE_FORMAT(a.updatedAt,'%Y-%m-%d') AS updatedAt, b.roleName, c.telp, c.alamat, ROW_NUMBER() OVER(ORDER BY a.id ASC) AS item_no FROM users AS a 
        INNER JOIN roleUsers AS b ON a.roleID=b.id 
        INNER JOIN users_details AS c ON a.id=c.id_profile
        WHERE a.roleID = ? && a.id != ? ORDER BY item_no ASC`;
    
    // masukkan ke dalam model
    m_user.getUsers(res, querySql, req.query);
};

const createupdateData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const queryCheck = 'SELECT * FROM users WHERE name = ? OR email = ?';
    const querySqlUsers = data.id !== null ? 'UPDATE users SET ? WHERE id = ?' : 'INSERT INTO users SET ?';
    const querySqlUsersDetails = data.id !== null ? 'UPDATE users_details SET ? WHERE id_profile = ?' : 'INSERT INTO users_details SET ?';
    
    // // masukkan ke dalam model
    m_user.createupdateUsers(res, queryCheck, querySqlUsers, querySqlUsersDetails, data);
};

const updateDataBY = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const queryCheck = 'SELECT * FROM users WHERE id = ?';
    const querySql = 'UPDATE users SET ? WHERE id = ?';
    
    // masukkan ke dalam model
    m_user.updateUserBY(res, querySql, queryCheck, data);
};

const deleteData = (req, res) => {
    // buat variabel penampung data dan query sql
    const queryCheck = 'SELECT * FROM users WHERE id = ?';
    const querySql1 = 'DELETE FROM users WHERE id = ?';
    const querySql2 = 'DELETE FROM users_details WHERE id_profile = ?';
    
    // masukkan ke dalam model
    m_user.deleteUsers(res, querySql1, querySql2, queryCheck, req.params.id);
};

const verifikasi = (req, res) => {
    // buat variabel penampung data dan query sql
    console.log(req.params)
    const queryCheck = 'SELECT * FROM users WHERE kodeOTP = ?';
    const querySql = 'UPDATE users SET ? WHERE kodeOTP = ?';
    
    // masukkan ke dalam model
    m_user.verifikasiUsers(res, querySql, queryCheck, req.params);
};

module.exports = {
    readData,
    createupdateData,
    updateDataBY,
    deleteData,
    verifikasi,
}