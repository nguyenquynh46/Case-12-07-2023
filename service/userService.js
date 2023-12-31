import connection from "../connection.js";


class UserService {
    constructor() {
        connection.connecting();
    }

    findAllAccount() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from user', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    addAccount(formData) {
        let addAcc = `INSERT INTO user ( username, password, email, image, fullName, address, phone)
                  VALUES ( '${formData.userNameRs}', '${formData.passWordRS}',
                          '${formData.email}', '${formData.image}', '${formData.fullName}',
                          '${formData.address}', '${formData.phone}')`;
        return new Promise((resolve, reject) => {
            connection.getConnection().query(addAcc, (err, data55) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data55);
                }
            });
        });
    }


    delete(idDelete) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM user WHERE id = ${idDelete}`, (err, delProduct) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(delProduct);
                }
            });


        });
    }
    update(user) {
        let updateUS = `UPDATE user SET 
         id = ${user.id},
         userName = "${user.username}",
         password = "${user.password}", 
         email = "${user.email}",
         image = "${user.image}",
         fullName = "${user.fullName}", 
         address = "${user.address}",
         Phone = "${user.phone}", 
         Role = "${user.role}" 
         WHERE id = ${user.id};
          `
        return new Promise((resolve, reject) => {
            connection.getConnection().query(
                updateUS, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
        })
    }
    findByIdUser(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from user where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products[0])
                }
            })
        })
    }


    checkLogin(username, password) {
        let check = `select * from user where username ="${username}"  AND password = "${password}"`
        return new Promise((resolve, reject) => {
            connection.getConnection().query(check, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                    // if (products.length === 0 ) {
                    //     // Đăng nhập không thành công, chuyển hướng đến trang đăng ký
                    //     resolve(false);
                    // } else {
                    //     // Đăng nhập thành công
                    //     resolve(true);
                    // }
                }
            })
        })
    }

}

export default new UserService();
