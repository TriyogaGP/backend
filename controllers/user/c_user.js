const { m_user } = require('../../models');

error = {}

const readData = (req, res) => {
    // buat query sql
    const querySql = `SELECT a.*, b.roleName, c.telp, c.alamat, ROW_NUMBER() OVER(ORDER BY a.id ASC) AS item_no FROM users AS a 
        INNER JOIN roleUsers AS b ON a.roleID=b.id
        INNER JOIN users_details AS c ON a.id=c.id_profile
        WHERE a.roleID = ? && a.id != ? ORDER BY item_no ASC`;
    
    // masukkan ke dalam model
    m_user.getUsers(res, querySql, req.query);
};

const updateData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySqlUsers = data.id !== null ? 'UPDATE users SET ? WHERE id = ?' : 'INSERT INTO users SET ?';
    const querySqlUsersDetails = data.id !== null ? 'UPDATE users_details SET ? WHERE id_profile = ?' : 'INSERT INTO users_details SET ?';
    
    // // masukkan ke dalam model
    m_user.updateUsers(res, querySqlUsers, querySqlUsersDetails, data);
};

module.exports = {
    readData,
    updateData,
}