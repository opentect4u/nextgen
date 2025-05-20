from core.database import connect
import mysql.connector
from models.master_model import createResponse

async def db_select(select, schema, where, order, flag):
    whr = f"WHERE {where}" if where != '' else ''
    sql = f"SELECT {select} FROM {schema} {whr} {order}"
    res_dt = {}
    print('SQL======',sql)
    try:
        conn = connect()
        cursor = conn.cursor()
        cursor.execute(sql)
        # records = cursor.fetchall() if flag > 0 else cursor.fetchone()
        records = cursor.fetchall() if flag > 0 else cursor.fetchone()
        if(records is not None):
            result = createResponse(records, cursor.column_names, flag)
            res_dt = {"suc": 1, "msg": result,"sql":sql}

        else:
            res_dt = {"suc": 2, "msg": "No Data Found","sql":sql}
        conn.close()
        cursor.close()    
        
    except mysql.connector.Error as err:
        # conn.close()
        # cursor.close()
        res_dt = {"suc": 0, "msg": err}
    
    finally:
        return res_dt

async def db_Insert(table_name, fields, values, where, flag, selectInsert = False):
    res_dt = {}
    sql = ''
    whr = f"WHERE {where}" if where != '' else ''
    msg = ''
    errMsg = ''

    if (flag > 0):
        sql = f"UPDATE {table_name} SET {fields} {whr}"
        # print('SQL======',sql)
        msg = "Updated Successfully !!"
        errMsg = "Data not updated !!"
    else:
        sql = f"INSERT INTO {table_name} ({fields}) VALUES ({values})" if(not selectInsert) else f"INSERT INTO {table_name} {fields}"
        print('SQL =======',sql)
        msg = "Inserted Successfully !!"
        errMsg = "Data not inserted  !!"

    try:
        conn = connect()
        cursor = conn.cursor()

        cursor.execute(sql)

        conn.commit()
        conn.close()
        cursor.close()
        # print(cursor.rowcount,'rowcount')
        # if cursor.rowcount>0:
        res_dt = {"suc":1, "msg":msg, "lastId":cursor.lastrowid}
        # else:
        #     res_dt = {"suc":0, "msg":errMsg, "lastId":0}

        # print(res_dt,"##############")
    except mysql.connector.Error as err:
        # conn.close()
        # cursor.close()
        #  print('Error========',err)
         res_dt =  {"suc": 0, "msg": err, "lastId":0}
         

    finally:
        return res_dt
    

async def db_Delete(table_name, where):
    res_dt = {}
    msg = ''
    errMsg = ''
    
    sql = f"DELETE FROM {table_name} WHERE {where}"
    # print(sql)
    msg = "Deleted Successfully !!"
    errMsg = "Data not deleted  !!"

    try:
        conn = connect()
        cursor = conn.cursor()

        cursor.execute(sql)

        conn.commit()
        conn.close()
        cursor.close()

        # if cursor.rowcount>0:
        res_dt = {"suc":1, "msg":msg}
        # else:
            # res_dt = {"suc":0, "msg":errMsg}

        # print(res_dt,"##############")
    except mysql.connector.Error as err:
        # conn.close()
        # cursor.close()
        #  print(err)
         res_dt =  {"suc": 0, "msg": err}
         

    finally:
        return res_dt