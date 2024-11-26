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


@reportRouter.post('/allstock')
async def getprojectpoc(id:Allstock):
    # print(id.id)
    res_dt = {}

    select = f"SUM(st.qty*st.in_out_flag) stock,st.item_id,p.prod_name "
    schema = "td_stock_new st, md_product p"
    where = f"st.proj_id ={id.project_id} and st.item_id=p.sl_no and {id.dt}<=st.date group by st.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@reportRouter.post('/itemwise')
async def getprojectpoc(id:Itemwise):
    # print(id.id)
    res_dt = {}

    select = f"SUM(st.qty*st.in_out_flag) stock,st.item_id,p.prod_name,st.proj_id "
    schema = "td_stock_new st, md_product p"
    where = f"st.item_id ={id.item_id} and st.item_id=p.sl_no and {id.dt}<=st.date group by st.proj_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result