const koneksi = require('../../config/db');
const { response } = require('../../config');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

function makeRandom(n) {
	for (let r = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 
				"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F",
				 "G", "H", "I",  "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W",
				 "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], e = n, t = new Array, a = 0; a <= e - 1; a++) {
		t[a] = r[parseInt(Math.random() * r.length)];
		t = t;
		randomtextnumber = t.join("")
	}
}

const getUsers = (res, statement, params) => {
    // jalankan query
	koneksi.query(statement, [params.idRole, params.idProfile], (err, result, field) => {
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

const updateUsers = (res, Usersstatement, Usersdetailsstatement, data) => {
    // jalankan query
	const kirimdata1 = {
		roleID: data.roleID,
		name: data.name,
		email: data.email
	}
	const kirimdata2 = {
		telp: data.telp,
		alamat: data.alamat
	}
	
	switch(data.jenis) {
	case 'ADD' :
		koneksi.query(Usersstatement, kirimdata1, (err, result, field) => {
			// error handling
			if (err) {
				return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
			}

			// jika request berhasil
			koneksi.query(Usersdetailsstatement, kirimdata2, (err, result, field) => {
				// error handling
				if (err) {
					return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
				}

				// jika request berhasil
				kode = 200
				message = 'Data berhasil disimpan'
				response(res, { kode, message }, 200);
			});
		});
		break;
	case 'EDIT':
		koneksi.query(Usersstatement, [kirimdata1, data.id], (err, result, field) => {
			// error handling
			if (err) {
				return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
			}

			// jika request berhasil
			koneksi.query(Usersdetailsstatement, [kirimdata2, data.id], (err, result, field) => {
				// error handling
				if (err) {
					return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
				}

				// jika request berhasil
				kode = 200
				message = 'Data berhasil diubah'
				response(res, { kode, message }, 200);
			});
		});
		break;
	default:
		console.log('Error')
	}
};

module.exports = {
    getUsers,
    updateUsers,
}