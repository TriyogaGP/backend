const koneksi = require('../../config/db');
const { response } = require('../../config');

const getBootcamps = (res, statement) => {
    // jalankan query
    koneksi.query(statement, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
        }
        
        // jika request berhasil
        kode = 200
        message = 'Berhasil'
        response(res, { kode, message, data: result }, 200);
    });
};

const getBootcampsBy = (res, statement, id) => {
    // jalankan query
    koneksi.query(statement, id, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
        }

        // jika request berhasil
        kode = 200
        message = 'Berhasil'
        response(res, { kode, message, data: result }, 200);
    });
};

const createBootcamps = (res, statement, statementCheck, data) => {
    // jalankan query
    koneksi.query(statementCheck, [data.name, data.email], (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
        }
        if(result.length){
            return response(res, { kode: '404', message: 'Nama atau Email sudah digunakan' }, 404);
        }else{
            koneksi.query(statement, data, (err, result, field) => {
                // error handling
                if (err) {
                    return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
                }

                // jika request berhasil
                kode = 200
                message = 'Berhasil'
                response(res, { kode, message }, 200);
            });
        }
    });
};

const updateBootcamps = (res, statement, statementCheck, id, data) => {
    // jalankan query
    koneksi.query(statementCheck, id, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
        }
        if(result.length){
            koneksi.query(statement, [data, id], (err, result, field) => {
                // error handling
                if (err) {
                    return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
                }

                // jika request berhasil
                kode = 200
                message = 'Berhasil'
                response(res, { kode, message }, 200);
            });
        }else{
            return response(res, { kode: '404', message: 'Data tidak ditemukan' }, 404);
        }
    });
};

const deleteBootcamps = (res, statement, statementCheck, id) => {
    // jalankan query
    koneksi.query(statementCheck, id, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
        }
        if(result.length){
            koneksi.query(statement, id, (err, result, field) => {
                // error handling
                if (err) {
                    return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
                }

                // jika request berhasil
                kode = 200
                message = 'Berhasil'
                response(res, { kode, message }, 200);
            });
        }else{
            return response(res, { kode: '404', message: 'Data tidak ditemukan' }, 404);
        }
    });
};

module.exports = {
    getBootcamps,
    getBootcampsBy,
    createBootcamps,
    updateBootcamps,
    deleteBootcamps
}