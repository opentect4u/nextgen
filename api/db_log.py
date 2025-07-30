from models.masterApiModel import db_Insert

async def user_log_update(user_id,flag,table_nm,time,id):
    if flag == 'N':
        activity = 'inserted into'
    elif flag == 'E':
        activity = 'updated'
    elif flag == 'D':
        activity = 'deleted from'
    elif flag == 'I':
        activity = 'logged in'
    elif flag == 'A':
        activity = 'approved item in'
    elif flag == 'C':
        activity = 'cancelled item in'
    else:
        activity = 'logged out'
        
    narration = f'{user_id} has {activity} {table_nm} on {time} (ID:{id}) ' if flag !='I' and flag!='O' else f'{user_id} has {activity} on {time}'
    fields= f'user_id,activity_flag,table_nm,activity_dt,narration'
    values = f'"{user_id}","{flag}","{table_nm}","{time}","{narration}"'
    table_name = "td_user_log"
    # whr =  f'user_id="{user_id}"' if flag=='O' else None
    whr = ''
    # log_flag = 1 if flag=='O' else 0
    log_flag =0
   
    result = await db_Insert(table_name, fields, values, whr, log_flag)

    if(result['suc']>0):
        res_dt = {"suc": 1, "msg": "Saved successfully!"}
    else:
        res_dt = {"suc": 0, "msg": "Error while saving!"}
    
    return res_dt
