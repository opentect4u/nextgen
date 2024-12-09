from fastapi import APIRouter, File, UploadFile, Form
from typing import Optional, Union
from enum import Enum
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models.masterApiModel import db_select, db_Insert, db_Delete
from datetime import datetime
import datetime as dt
import random
from models.utils import get_hashed_password, verify_password
import json
import os
from fastapi import FastAPI, Depends, File, UploadFile, Form
reportRouter = APIRouter()


class Allstock(BaseModel):
    dt:str
    project_id:int

class Itemwise(BaseModel):
    dt:str
    item_id:int

class AllItemwise(BaseModel):
    dt:str



@reportRouter.post('/allstock')
async def getprojectpoc(id:Allstock):
    res_dt = {}

    select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag) stock,st.item_id,p.prod_name "
    schema = "td_stock_new st, md_product p,(SELECT @a:= 0) AS a"
    where = f"st.proj_id ={id.project_id} and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result



@reportRouter.post('/itemwise')
async def getprojectpoc(id:Itemwise):
    res_dt = {}

    select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag)  project_stock,(SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where item_id={id.item_id} and proj_id = 0) as warehouse_stock,st.item_id,p.prod_name,st.proj_id,pr.proj_name "
    schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    where = f"st.item_id ={id.item_id} and pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result

    res_dt = {}

@reportRouter.post('/allitemwise')
async def getprojectpoc(id:AllItemwise):
    res_dt = {}

    select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag)  project_stock,(SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new group by item_id having proj_id = 0) as warehouse_stock,st.item_id,p.prod_name,st.proj_id,pr.proj_name "
    schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    where = f"pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result

    # select = f"SUM(st.qty*st.in_out_flag) stock,st.item_id,p.prod_name,st.proj_id"
    # schema = "td_stock_new st, md_product p"
    # where = f"st.item_id ={id.item_id} and st.item_id=p.sl_no and {id.dt}<=st.date group by st.proj_id"
    # order = ""
    # flag = 1 
    # result = await db_select(select, schema, where, order, flag)
    # return result