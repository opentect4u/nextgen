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


@reportRouter.post('/allstock')
async def getprojectpoc(id:Allstock):
    # print(id.id)
    res_dt = {}

    select = f"SUM(qty*in_out_flag) "
    schema = "td_stock_new"
    where = f"proj_id ={id.project_id}"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result