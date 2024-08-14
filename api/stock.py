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

@stockRouter.post("/add_edit_stock")
async def add_edit_stock(data:Stock):
    
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    table_name = "md_stock"
    fields = f"item_id={data.item_id}, stock={data.stock}, modified_by = '{data.user}', modified_dt = '{formatted_dt}'" if data.sl_no>0 else f"item_id,stock,stock_dt,created_by,created_dt"
    values = None if data.sl_no>0 else f"'{data.item_id}','{data.stock}','{data.stock_dt}','{data.user}','{formatted_dt}'"
    where = f"sl_no={data.sl_no}" if data.sl_no>0 else None
    flag = 1 if data.sl_no>0 else 0
    res_dt = await db_Insert(table_name,fields,values,where,flag)

    return res_dt