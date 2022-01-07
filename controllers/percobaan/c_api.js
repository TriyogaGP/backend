const { m_api } = require('../../models');

error = {}

const readData = (req, res) => {
    // buat query sql
    const querySql = 'SELECT *, ROW_NUMBER() OVER(ORDER BY id ASC) AS item_no FROM bootcamp ORDER BY item_no ASC';
    
    // masukkan ke dalam model
    m_api.getBootcamps(res, querySql);
};

const readDataBy = (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM bootcamp WHERE id = ?';
    
    // masukkan ke dalam model
    m_api.getBootcampsBy(res, querySql, req.params.id);
};

const insertData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const queryCheck = 'SELECT * FROM bootcamp WHERE name = ? OR email = ?';
    const querySql = 'INSERT INTO bootcamp SET ?';
    
    // masukkan ke dalam model
    m_api.createBootcamps(res, querySql, queryCheck, data);
};

const updateData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const queryCheck = 'SELECT * FROM bootcamp WHERE id = ?';
    const querySql = 'UPDATE bootcamp SET ? WHERE id = ?';
    
    // masukkan ke dalam model
    m_api.updateBootcamps(res, querySql, queryCheck, req.params.id, data);
};

const deleteData = (req, res) => {
    // buat variabel penampung data dan query sql
    const queryCheck = 'SELECT * FROM bootcamp WHERE id = ?';
    const querySql = 'DELETE FROM bootcamp WHERE id = ?';
    
    // masukkan ke dalam model
    m_api.deleteBootcamps(res, querySql, queryCheck, req.params.id);
};

module.exports = {
    readData,
    readDataBy,
    insertData,
    updateData,
    deleteData
}