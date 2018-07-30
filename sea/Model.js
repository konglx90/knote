import mysql from 'mysql';
import db from '../conf/db';
import requiredSelfFields from '../decorators/requiredSelfFields';
import requiredArgs from '../decorators/requiredArgs';

class Model {
	constructor() {
        // 使用连接池，提升性能
        this.pool = mysql.createPool(db.mysql)
        // 表名
        this.table = null
        // 表明身份的字段
        this.identitytField = null
	}

	query(sql, data = []) {
        const pool = this.pool;
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				if(err) {
					connection.release()
                    reject(err)
                    return
                }
				connection.query(sql, data, function(err, result) {
                    connection.release()
					if(err) {
                        reject(err)
                        return
					}
					resolve(result)
				})
			})
		})
    }
    
    @requiredSelfFields({ table: 'string' })
    @requiredArgs(['number'])
    find_by_id(id) {
        const table = this.table;
        const identitytField = this.identitytField || 'id';

        const sql = `select * from ?? where ${identitytField} = ? `

        return this.query(sql, [ table, id ])
    }

    @requiredSelfFields({ table: 'string' })
    @requiredArgs(['number'])
    find_by_page(limit, offset = 0) {
        const table = this.table;

        let sql =  "select * from ?? limit ? , ?";

        return this.query(sql, [ table, limit, offset ])
    }

    @requiredSelfFields({ table: 'string' })
    @requiredArgs(['array'])
    insert(values) {
        const table = this.table;

        const sql = "insert into ?? set ?";

        return this.query(sql, [ table, values ])
    }

    @requiredSelfFields({ table: 'string' })
    @requiredArgs(['array', 'string'])
    update_by_id(values, id) {
        const table = this.table;

        const sql = "update ?? set ? where id = ?"
        
        return this.query(sql, [ table, values, id ])
    }

    @requiredSelfFields({ table: 'string' })
    @requiredArgs(['string'])
    delete_by_id(id) {
        const table = this.table;
        
        const sql = "delete from ?? where id = ?";

        return this.query(sql, [ table, id ])
    }
}

export default Model;