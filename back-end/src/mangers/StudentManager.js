import { client } from "../clientDb/client.js";

export default class StudentManager {
  static async browse() {
    try {
      const [rows] = await client.query(`select * from students`);
      return rows;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  static async read(userId) {
    try {
      const [rows] = await client.query(
        `select * from students where userId = ?`,
        [userId]
      );
      return rows[0];
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  static async add(
    firstname,
    lastname,
    title = "student",
    description = "",
    userId,
    imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/828px-User_icon-cp.svg.png",
    githubUrl = "www.github.com",
    linkedinUrl = "www.linkedin.com"
  ) {
    try {
      const [result] = await client.query(
        `insert into students (firstname, lastname, title, description,userId, imgUrl, githubUrl, linkedinUrl) 
        values (? , ? , ? , ? , ? , ? , ? , ?)`,
        [
          firstname,
          lastname,
          title,
          description,
          parseInt(userId),
          imgUrl,
          githubUrl,
          linkedinUrl,
        ]
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      const [result] = await client.query(`delete from students WHERE id = ?`, [
        id,
      ]);
      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  static async update(userId, props) {
    let sql = `UPDATE students set`;
    const sqlValues = [];
    for (const [key, value] of Object.entries(props)) {
      sql += `${sqlValues.length ? "," : ""} ${key} = ?`;
      sqlValues.push(value);
    }
    sql += ` where userId = ?`;
    sqlValues.push(userId);
    const [res] = await client.query(sql, sqlValues);
    const profil = await StudentManager.read(userId);
    return { affectedRows: res.affectedRows, profil, success: true };
  }

  static async updateImage(userId, imgUrl) {
    const res = await client.query(
      `UPDATE students SET imgUrl = ? WHERE userId = ?`,
      [imgUrl, +userId]
    );

    const profil = await StudentManager.read(userId);
    return { affectedRows: res.affectedRows, profil, success: true };
  }
}
