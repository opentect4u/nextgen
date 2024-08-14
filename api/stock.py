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

@stockRouter.post("/add_edit_stock")
async def add_edit_stock(data:Stock):
    
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    table_name = "md_stock"
    fields = f"item_id='{data.item_id}', stock='{data.stock}', modified_by = '{data.user}', modified_at = '{formatted_dt}'" if data.sl_no>0 else f"item_id,stock,stock_dt,created_by,created_at"
    values = None if data.sl_no>0 else f"'{data.item_id}','{data.stock}','{data.stock_dt}','{data.user}','{formatted_dt}'"
    where = f"sl_no={data.sl_no}" if data.sl_no>0 else None
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


