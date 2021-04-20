const db = require("../db");

class Template {

    static async findOne(id) {
        const templateRes = await db.query(
            `SELECT id,
                    wall,
                    height,
                    width,
                    user_id
        
                FROM templates 
                WHERE id = $1`, [id]);
    
        if (templateRes.rows.length === 0) {
          throw { message: `There is no template with an id '${id}`, status: 404 }
        }
    
        return templateRes.rows[0];
      }

    
      static async findAll() {
        const templateRes = await db.query(
            `SELECT id,
                    wall,
                    height,
                    width,
                    user_id
                 
                FROM templates 
                ORDER BY id`);
    
        return templateRes.rows;
      }
    
      static async create(data) {
        const result = await db.query(
          `INSERT INTO templates (
                wall,
                height,
                width,
                user_id) 
             VALUES ($1, $2, $3, $4) 
             RETURNING wall,
                       height,
                       width,
                       user_id`,
          [
            data.wall,
            data.height,
            data.width,
            data.user_id
          ]
        );
    
        return result.rows[0];
      }
    

    
      static async update(id, data) {
        const result = await db.query(
          `UPDATE templates SET 
                wall=($1),
                height=($2),
                width=($3)
                WHERE id=$4
            RETURNING id,
                      wall,
                      height,
                      width`,
          [
            data.wall,
            data.height,
            data.width,
            id
          ]
        );
    
        if (result.rows.length === 0) {
          throw { message: `There is no template with an id '${id}`, status: 404 }
        }
    
        return result.rows[0];
      }
    
    
      static async remove(id) {
        const result = await db.query(
          `DELETE FROM templates 
             WHERE id = $1 
             RETURNING id`,
            [id]);
    
        if (result.rows.length === 0) {
          throw { message: `There is no template with an id '${id}`, status: 404 }
        }
      }
    }
    
    
module.exports = Template;
     
