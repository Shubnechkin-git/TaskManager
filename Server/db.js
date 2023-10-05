const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/Users.db'); // Имя файла базы данных SQLite

// Создаем таблицу, если она не существует
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, check_tutorial BOOLEAN)');
});

const sendIdBaseUser = async (idUser) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT id FROM Users WHERE user_id = ?', idUser, (err, row) => {
                if (err) {
                    console.error('Ошибка при выполнении запроса:', err);
                    reject(err);
                } else {
                    const id = row ? row.id : null;
                    console.log('ID пользователя:', id);
                    resolve(id);
                }
            });
        });
    });
}


const setCheckUser = async (idUser, check) => {
    if (idUser !== undefined) {
        console.log(idUser, check);

        try {
            // Проверяем, существует ли пользователь
            const id = await sendIdBaseUser(idUser);

            if (id === null) {
                // Если пользователь не существует, выполняем INSERT
                await new Promise((resolve, reject) => {
                    db.serialize(() => {
                        const stmt = db.prepare('INSERT INTO Users (user_id, check_tutorial) VALUES (?, ?)');
                        stmt.run(idUser, check, (err) => {
                            if (err) {
                                console.error('Ошибка при выполнении INSERT-запроса:', err);
                                reject(err);
                            } else {
                                console.log('Данные успешно добавлены в базу данных.');
                                resolve(idUser); // Возвращаем idUser
                            }
                            stmt.finalize(); // Завершаем подготовленный запрос
                        });
                    });
                });
            } else {
                console.log('Пользователь с ID', idUser, 'уже существует.');
                return idUser; // Возвращаем idUser
            }
        } catch (error) {
            console.error('Ошибка при выполнении операции:', error);
        }
    }
}





module.exports = {
    sendIdBaseUser,
    setCheckUser
};
