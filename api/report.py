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

@reportRouter.post('/itemwisestockin')
async def getprojectpoc(id:Itemwise):
    res_dt = {}
    # select1 = f"sum(i.req_qty) as req_stock"
    # schema1 = "td_requisition t,td_requisition_items i"
    # where1 = f"i.item_id={id.item_id} and i.approve_flag='P' and i.req_no=t.req_no"
    # order1 = ""
    # flag1 = 0 
    # result1 = await db_select(select1, schema1, where1, order1, flag1)
    # print(result1)
    # select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag) project_stock,SUM(st.req_qty*st.in_out_flag)  req_stock,(SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where item_id={id.item_id} and proj_id = 0) as warehouse_stock,st.item_id,p.prod_name,st.proj_id,pr.proj_name "
    # schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    # where = f"st.item_id ={id.item_id} and pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"



    select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag) project_stock,SUM(i.req_qty) req_stock,(SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where item_id={id.item_id} and proj_id = 0) as warehouse_stock,st.item_id,p.prod_name,st.proj_id,pr.proj_name"
    schema = "td_stock_new st, md_product p,td_project pr,td_requisition_items i,(SELECT @a:= 0) AS a"
    where = f"st.item_id ={id.item_id} and pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id and i.approve_flag='P'"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result

@reportRouter.post('/allitemwise')
async def getprojectpoc(id:AllItemwise):
    res_dt = {}

    select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag)  project_stock,(SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where proj_id = 0 and item_id=st.item_id)  as warehouse_stock,st.item_id,p.prod_name,st.proj_id,pr.proj_name "
    schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    where = f"pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result
