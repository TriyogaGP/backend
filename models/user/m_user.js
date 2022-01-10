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

const createupdateUsers = (res, statementCheck, Usersstatement, Usersdetailsstatement, data) => {
    // jalankan query
	koneksi.query(statementCheck, [data.name, data.email], async(err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
        }
        if(result.length){
            return response(res, { kode: '404', message: 'Nama atau Email sudah digunakan' }, 404);
        }else{
            if (data.name == '' || data.name == null) { return response(res, { kode: '404', message: 'Nama Lengkap tidak boleh kosong', error: err }, 404); }
            else if (data.password == '' || data.password == null) { return response(res, { kode: '404', message: 'Kata Sandi tidak boleh kosong', error: err }, 404); }
			const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(data.password, salt);
			const kirimdata1 = {
				roleID: data.roleID,
				name: data.name,
				email: data.email,
				password: hashPassword,
				kodeOTP: data.password,
			}
			switch(data.jenis) {
			case 'ADD' :
				koneksi.query(Usersstatement, kirimdata1, (err, result, field) => {
					// error handling
					if (err) {
						return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
					}
					koneksi.query(statementCheck, [data.name, data.email], async(err, result, field) => {
						// error handling
						if (err) {
							return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
						}
						const kirimdata2 = {
							id_profile: result[0].id,
							telp: data.telp,
							alamat: data.alamat
						}
						// jika request berhasil
						koneksi.query(Usersdetailsstatement, kirimdata2, (err, result, field) => {
							// error handling
							if (err) {
								return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
							}

							var transporter = nodemailer.createTransport({
								service: 'gmail',
								auth: {
									user: 'triyoga.ginanjar.p@gmail.com',
									pass: 'Yoga17051993'
								}
							});
				
							var mailOptions = {
								from: 'triyoga.ginanjar.p@gmail.com',
								to: data.email,
								subject: 'Konfirmasi Pendaftaran Akun',
								// text: `Silahkan masukan kode verifikasi akun tersebut`
								html: `<h1>Konfirmasi Pendataran Akun</h1>
								<ul>
									<li>Nama Lengkap : ${data.name}</li>
									<li>Alamat Email : ${data.email}</li>
									<li>Kata Sandi : ${data.password}</li>
								</ul>
								Ikuti tautan ini untuk mengonfirmasi pendaftaran Anda:<br>
								<a href="http://localhost:5000/restApi/moduleUser/verifikasi/${data.password}/1">konfirmasi akun</a><br>Jika Anda memiliki pertanyaan, silakan balas email ini`
							};

							transporter.sendMail(mailOptions, (err, info) => {
								console.error(err)
								if (err) return response(res, { kode: '500', message: 'Gagal mengirim data ke alamat email anda, cek lagi email yang di daftarkan!.', error: err }, 500);;
								// jika request berhasil
								kode = 200
								message = 'Data berhasil disimpan'
								response(res, { kode, message }, 200);
							});
						});
					});
				});
				break;
			case 'EDIT':
				koneksi.query(Usersstatement, [kirimdata1, data.id], (err, result, field) => {
					// error handling
					if (err) {
						return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
					}
					const kirimdata2 = {
						telp: data.telp,
						alamat: data.alamat
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
		}
    });			
};

const updateUserBY = (res, statement, statementCheck, data) => {
    // jalankan query
	let kirimData;
    koneksi.query(statementCheck, data.id, async(err, result, field) => {
        // error handling
		let pesan = ''
        if (err) {
            return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
        }
        if(result.length){
			switch(data.jenis) {
				case 'activeAkun' :
						kirimData = {
							activeAkun: data.activeAkun
						}
						pesan = data.activeAkun === '0' ? 'Berhasil mengubah aktif akun menjadi tidak aktif' : 'Berhasil mengubah aktif akun menjadi aktif'
					break;
				default:
					console.log('Error')
			}
			koneksi.query(statement, [kirimData, data.id], (err, result, field) => {
                // error handling
                if (err) {
                    return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
                }

                // jika request berhasil
                kode = 200
                message = pesan
                response(res, { kode, message }, 200);
            });
        }else{
            return response(res, { kode: '404', message: 'Data tidak ditemukan' }, 404);
        }
    });
};

const deleteUsers = (res, statement1, statement2, statementCheck, id) => {
    // jalankan query
    koneksi.query(statementCheck, id, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
        }
        if(result.length){
            koneksi.query(statement1, id, (err, result, field) => {
                // error handling
                if (err) {
                    return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
                }

                // jika request berhasil
                koneksi.query(statement2, id, (err, result, field) => {
					// error handling
					if (err) {
						return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
					}
	
					// jika request berhasil
					kode = 200
					message = 'Berhasil'
					response(res, { kode, message }, 200);
				});
            });
        }else{
            return response(res, { kode: '404', message: 'Data tidak ditemukan' }, 404);
        }
    });
};

const verifikasiUsers = (res, statement, statementCheck, data) => {
    // jalankan query
    koneksi.query(statementCheck, data.kode, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
        }
        if(result.length){
			const kirimData = {
				activeAkun : data.activeAkun
			}
            koneksi.query(statement, [kirimData, data.kode], (err, result, field) => {
                // error handling
                if (err) {
                    return response(res, { kode: '500', message: 'Gagal', error: err }, 500);
                }
			
				res.send("<script>window.close();</script > ")

            });
        }else{
            return response(res, { kode: '404', message: 'Data tidak ditemukan' }, 404);
        }
    });
};

module.exports = {
    getUsers,
    createupdateUsers,
    updateUserBY,
    deleteUsers,
    verifikasiUsers,
}