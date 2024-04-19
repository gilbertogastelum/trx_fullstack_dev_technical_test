import * as mysql from 'mysql2/promise';
import { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2";

const Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    timezone: '-06:00',
    dateStrings: true,
    charset : 'utf8',
    decimalNumbers: true,
    namedPlaceholders: true
});



export type QueryResult = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

export default Pool;