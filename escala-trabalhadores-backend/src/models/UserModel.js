const db = require('../config/database');

const insertUser = ({ name, email, password, role, registry_number }) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (name, email, password, role, registry_number)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, password, role, registry_number],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

module.exports = {
  insertUser,
  getUserByEmail,
};
