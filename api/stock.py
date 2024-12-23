from fastapi import APIRouter
from typing import Optional
from enum import Enum
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models.masterApiModel import db_select, db_Insert, db_Delete
from datetime import datetime
import datetime as dt
import random
from models.utils import get_hashed_password, verify_password
stockRouter = APIRouter()

class Stock(BaseModel):
    sl_no:int
    item_id:int
    stock_dt:str
    stock:int
    user:str
class getData(BaseModel):
    id:int

class CheckItem(BaseModel):
    item_id:int
    trans_no:str

class TransferItems(BaseModel):
    sl_no:int
    item_id:int
    qty:int

class SaveTrans(BaseModel):
    sl_no:int
    trans_dt:str
    intended_for:str
    client_id:int
    project_id:int
    purpose:str   
    items:list[TransferItems]
    user:str


class SaveTransPtoP(BaseModel):
    sl_no:int
    trans_dt:str
    intended_for:str
    client_id:int
    from_project_id:int
    project_id:int
    purpose:str   
    items:list[TransferItems]
    user:str

class GetTrans(BaseModel):
     id:int

class GetTransItem(BaseModel):
     trans_no:str

@stockRouter.post("/add_edit_stock")
async def add_edit_stock(data:Stock):
    
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    table_name = "md_stock"
    fields = f"item_id='{data.item_id}', stock='{data.stock}',  modified_at = '{formatted_dt}'" if data.sl_no>0 else f"item_id,stock,stock_dt,created_by,created_at"
    values = None if data.sl_no>0 else f"'{data.item_id}','{data.stock}','{data.stock_dt}','{data.user}','{formatted_dt}'"
    where = f"sl_no='{data.sl_no}'" if data.sl_no>0 else None
    flag = 1 if data.sl_no>0 else 0
    result = await db_Insert(table_name,fields,values,where,flag)
    if(result['suc']):
        res_dt = {"suc": 1, "msg": f"Stock opened successfully!" if data.sl_no==0 else f"Stock updated successfully!"}
    else:
        res_dt = {"suc": 0, "msg": f"Error while saving!" if data.sl_no==0 else f"Error while updating"}
        # if v.sl_no not in k:
        #     print('here in delete')
        #     table_name='md_vendor_poc'
        #     wr=f"sl_no='{v.sl_no}'"
        #     result = await db_Delete(table_name, wr)
    return res_dt

@stockRouter.post("/getstock")
async def getstock(data:getData):
    print('I am logging in!')
    print(data.id)
    res_dt = {}
    # SELECT @a:=@a+1 serial_number, busi_act_name FROM md_busi_act, (SELECT @a:= 0) AS a
    select = "@a:=@a+1 serial_number,s.stock_dt,s.stock,s.created_by,s.created_at,s.modified_at,s.sl_no,i.prod_name, i.sl_no as item_id"
    # select = "@a:=@a+1 serial_number, *"
    schema = "md_stock s,md_product i,(SELECT @a:= 0) AS a"
    where = f"s.sl_no='{data.id}' and i.sl_no=s.item_id" if data.id>0 else f"s.delete_flag='N' and i.sl_no=s.item_id"
    order = "ORDER BY s.created_at DESC"
    flag = 0 if data.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@stockRouter.post("/check_item")
async def getstock(data:CheckItem):
    print('I am logging in!')
    res_dt = {}
    select = "i.qty,t.trans_no,t.purpose,t.to_proj_id,trans_dt,t.from_proj_id,t.req_by,t.created_by,t.created_at,(select proj_name from td_project where sl_no=t.from_proj_id) as from_proj,(select proj_name from td_project where sl_no=t.to_proj_id) as to_proj"
    schema = "td_transfer_items i,td_transfer t"
    where = f"i.item_id='{data.item_id}' and i.approve_flag='P'and t.trans_no=i.trans_no and i.trans_no like '%{data.trans_no}%'"
    order = "ORDER BY t.created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@stockRouter.post("/save_transfer")
async def save_trans(data:SaveTrans):
    res_dt = {}
    print(data)
    current_datetime = datetime.now()
    tno = int(round(current_datetime.timestamp()))
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")


    fields= f"trans_no,trans_dt,intended_for,client_id,from_proj_id,to_proj_id,purpose,created_by,created_at,req_by"
    values = f"'TWP-{tno}', '{data.trans_dt}', '{data.intended_for}', {data.client_id},{0}, '{data.project_id}','{data.purpose}','{data.user}','{formatted_dt}',{data.user}"
    table_name = "td_transfer"
    whr = ""
    flag = 0
    result = await db_Insert(table_name, fields, values, whr, flag)
    lastID=result["lastId"]
    #========================================================================================================
    for i in data.items:
                fields= f'trans_no,item_id,qty,created_by,created_at'
                values = f"'TWP-{tno}','{i.item_id}','{i.qty}','{data.user}','{formatted_dt}'"
                table_name = "td_transfer_items"
                whr=""
                # flag1 = 1 if v.sl_no>0 else 0
                flag1 = 1 if data.sl_no>0 else 0
                result2 = await db_Insert(table_name, fields, values, whr, flag1)
            

                if(result2['suc']>0): 

                    res_dt2 = {"suc": 1, "msg": f"Saved Successfully"}

                else:
                    res_dt2= {"suc": 0, "msg": f"Error while inserting"}
            # else:
            #     res_dt1= {"suc": 0, "msg": f"Error while updating item"}

    #===========================================================================================================

    if result['suc']>0 :
                res_dt = {"suc": 1, "msg": f"Saved Successfully"}
    else:
                 res_dt = {"suc": 0, "msg": f"Error while updating invoice"}
            
    
    return res_dt


@stockRouter.post("/get_twp")
async def save_trans(data:GetTrans):
    res_dt = {}

    select = "t.trans_no,t.trans_dt,t.created_by,t.created_at,t.sl_no,p.proj_name"
    schema = "td_transfer t,td_project p"
    where = f"t.sl_no='{data.id}' and t.trans_no like '%{'TWP-'}%' and p.sl_no=t.to_proj_id" if data.id>0 else f"t.trans_no like '%{'TWP-'}%' and p.sl_no=t.to_proj_id"
    order = "ORDER BY t.created_at DESC"
    flag = 0 if data.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@stockRouter.post("/get_twp_record")
async def save_trans(data:GetTrans):
    select1 = f"client_id"
    schema1 = "td_transfer"
    where1= f"sl_no='{data.id}'" 
    order1 = "ORDER BY created_at DESC"
    flag1 = 0 
    result1= await db_select(select1, schema1, where1, order1, flag1)
    print('client_id=',result1['msg']['client_id'])
    res_dt = {}
    select = f"t.trans_no,t.trans_dt,t.created_by,t.created_at,t.sl_no,p.proj_name,t.to_proj_id,t.purpose,t.intended_for,t.client_id,c.client_name" if result1['msg']['client_id']>0 else f"t.trans_no,t.trans_dt,t.created_by,t.created_at,t.sl_no,p.proj_name,t.to_proj_id,t.purpose,t.intended_for"
    schema = f"td_transfer t,td_project p,md_client c" if result1['msg']['client_id']>0 else "td_transfer t,td_project p"
    where = f"t.sl_no='{data.id}' and t.trans_no like '%{'TWP-'}%' and p.sl_no=t.to_proj_id and c.sl_no = t.client_id" if result1['msg']['client_id']>0 else f"t.sl_no='{data.id}' and t.trans_no like '%{'TWP-'}%' and p.sl_no=t.to_proj_id"
    order = "ORDER BY t.created_at DESC"
    flag = 0 
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@stockRouter.post("/get_trans_items")
async def save_trans(data:GetTransItem):
    res_dt = {}

    select = "*"
    schema = "td_transfer_items"
    where = f"trans_no='{data.trans_no}'"
    order = ""
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result




@stockRouter.post("/save_transfer_ptop")
async def save_trans(data:SaveTransPtoP):
    res_dt = {}
    print(data)
    current_datetime = datetime.now()
    tno = int(round(current_datetime.timestamp()))
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")


    fields= f"trans_no,trans_dt,intended_for,client_id,from_proj_id,to_proj_id,purpose,created_by,created_at,req_by"
    values = f"'TPP-{tno}', '{data.trans_dt}', '{data.intended_for}', {data.client_id},'{data.from_project_id}', '{data.project_id}','{data.purpose}','{data.user}','{formatted_dt}','{data.user}'"
    table_name = "td_transfer"
    whr = ""
    flag = 0
    result = await db_Insert(table_name, fields, values, whr, flag)
    lastID=result["lastId"]
    #========================================================================================================
    for i in data.items:
                fields= f'trans_no,item_id,qty,created_by,created_at'
                values = f"'TPP-{tno}','{i.item_id}','{i.qty}','{data.user}','{formatted_dt}'"
                table_name = "td_transfer_items"
                whr=""
                # flag1 = 1 if v.sl_no>0 else 0
                flag1 = 1 if data.sl_no>0 else 0
                result2 = await db_Insert(table_name, fields, values, whr, flag1)
            

                if(result2['suc']>0): 

                    res_dt2 = {"suc": 1, "msg": f"Saved Successfully"}

                else:
                    res_dt2= {"suc": 0, "msg": f"Error while inserting"}
            # else:
            #     res_dt1= {"suc": 0, "msg": f"Error while updating item"}

    #===========================================================================================================

    if result['suc']>0 :
                res_dt = {"suc": 1, "msg": f"Saved Successfully"}
    else:
                 res_dt = {"suc": 0, "msg": f"Error while updating invoice"}
            
    
    return res_dt




@stockRouter.post("/get_tpp")
async def save_trans(data:GetTrans):
    res_dt = {}

    select = "t.trans_no,t.trans_dt,t.created_by,t.created_at,t.sl_no,p.proj_name"
    schema = "td_transfer t,td_project p"
    where = f"t.sl_no='{data.id}' and t.trans_no like '%{'TPP-'}%' and p.sl_no=t.to_proj_id" if data.id>0 else f"t.trans_no like '%{'TPP-'}%' and p.sl_no=t.to_proj_id"
    order = "ORDER BY t.created_at DESC"
    flag = 0 if data.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@stockRouter.post("/get_tpp_record")
async def save_trans(data:GetTrans):
    select1 = f"client_id"
    schema1 = "td_transfer"
    where1= f"sl_no='{data.id}'" 
    order1 = "ORDER BY created_at DESC"
    flag1 = 0 
    result1= await db_select(select1, schema1, where1, order1, flag1)
    print('client_id=',result1['msg']['client_id'])
    res_dt = {}
    select = f"t.trans_no,t.trans_dt,t.created_by,t.created_at,t.from_proj_id,t.sl_no,p.proj_name,t.to_proj_id,t.purpose,t.intended_for,t.client_id,c.client_name,(select proj_name from td_project where sl_no=t.to_proj_id) as from_proj_name" if result1['msg']['client_id']>0 else f"t.trans_no,t.trans_dt,t.created_by,t.created_at,t.sl_no,p.proj_name,t.to_proj_id,t.purpose,t.intended_for,(select proj_name from td_project where sl_no=t.to_proj_id) as from_proj_name"
    schema = f"td_transfer t,td_project p,md_client c" if result1['msg']['client_id']>0 else "td_transfer t,td_project p"
    where = f"t.sl_no='{data.id}' and t.trans_no like '%{'TPP-'}%' and p.sl_no=t.to_proj_id and c.sl_no = t.client_id" if result1['msg']['client_id']>0 else f"t.sl_no='{data.id}' and t.trans_no like '%{'TPP-'}%' and p.sl_no=t.to_proj_id"
    order = "ORDER BY t.created_at DESC"
    flag = 0 if data.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result







