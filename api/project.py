from fastapi import APIRouter
from enum import Enum
from pydantic import BaseModel
from fastapi import APIRouter
from enum import Enum
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models.masterApiModel import db_select, db_Insert
from datetime import datetime
import datetime as dt
import random

projectRouter = APIRouter()

class Project(BaseModel):
     id:int
     proj_id:str
     proj_name:str
     client_id:int
     order_id:str
     order_date:str
     proj_location:str
     proj_addr:str
     proj_desc:str
     proj_order_val:str
     proj_end_user:str
     proj_consultant:str
     epc_contractor:str
     proj_manufacturer:str
     price_basis:str
     extra:str
     ld_clause:str
     erection_responsibility:str
     warranty:str
     project_status:str
     proj_manager:str
     proj_remarks:str
     user:str
     
class GetProject(BaseModel):
     id:int


@projectRouter.post('/addproject')
async def addproject(dt:Project):
    print(dt)
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'proj_id,proj_name,client_id,order_id,order_date,proj_location,proj_addr,proj_desc,proj_order_val,proj_end_user,proj_consultant,epc_contractor,proj_manufacturer,price_basis,extra,ld_clause,erection_responsibility,warranty,project_status,created_by,created_at'
    values = f'"{dt.proj_id}","{dt.proj_name}","{dt.client_id}","{dt.order_id}","{dt.order_date}","{dt.proj_location}",{dt.proj_addr}","{dt.proj_desc}","{dt.proj_order_val}","{dt.proj_end_user}","{dt.proj_consultant}","{dt.epc_contractor}","{dt.proj_manufacturer}","{dt.price_basis}","{dt.extra}","{dt.ld_clause}","{dt.erection_responsibility}","{dt.warranty}","{dt.project_status}","{dt.user}","{formatted_dt}"'
    table_name = "td_project"
    whr =  None
    flag = 1 if dt.id>0 else 0
    if(dt.id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            fields1= f'proj_id,proj_manager,created_by,created_at'
            values1 = f'"{dt.proj_id}","{dt.proj_manager}","{dt.user}","{formatted_dt}"'
            table_name1 = "td_project_assign"
            whr1 =  None
            flag1 = 1 if dt.id>0 else 0
            result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)

            fields2= f'proj_id,proj_remarks,created_by,created_at'
            values2 = f'"{dt.proj_id}","{dt.proj_remarks}","{dt.user}","{formatted_dt}"'
            table_name2 = "td_project_remarks"
            whr2 =  None
            flag2 = 1 if dt.id>0 else 0
            result2 = await db_Insert(table_name2, fields2, values2, whr2, flag2)

            if result1['suc']>0 and result2['suc']>0:
                res_dt = {"suc": 1, "msg": "Project inserted successfully!"}
            else:
                res_dt = {"suc": 0, "msg": "Error while inserting!"}
    else:
        print(flag)
        fields=f'proj_id="{dt.proj_id}",proj_name="{dt.proj_name}",client_id="{dt.client_id}",order_date="{dt.order_date}",proj_location="{dt.proj_location}",proj_addr="{dt.proj_addr}",proj_desc="{dt.proj_desc}",proj_order_val="{dt.proj_order_val}",proj_end_user="{dt.proj_end_user}",proj_consultant="{dt.proj_consultant}",epc_contractor="{dt.epc_contractor}",proj_manufacturer="{dt.proj_manufacturer}",price_basis="{dt.price_basis}",extra="{dt.extra}",ld_clause="{dt.ld_clause}",erection_responsibility="{dt.erection_responsibility}",warranty="{dt.warranty}",project_status="{dt.project_status}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
        whr=f'sl_no="{dt.id}"'
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            fields1= f'proj_manager="{dt.proj_manager}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
            values1=''
            table_name1 = "td_project_assign"
            whr1=f'proj_id="{dt.proj_id}"'
            flag1 = 1 if dt.id>0 else 0
            result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)

            fields2= f'proj_remarks="{dt.proj_remarks}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
            values2 = ""
            table_name2 = "td_project_remarks"
            whr2 =f'proj_id="{dt.proj_id}"'
            flag2 = 1 if dt.id>0 else 0
            result2 = await db_Insert(table_name2, fields2, values2, whr2, flag2)

            if result1['suc']>0 and result2['suc']>0:
                res_dt = {"suc": 1, "msg": "Project updated successfully!"}
            else:
                res_dt = {"suc": 0, "msg": "Error while updating!"}
    return res_dt


@projectRouter.post('/getproject')
async def getproject(id:GetProject):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    # SELECT @a:=@a+1 serial_number, busi_act_name FROM md_busi_act, (SELECT @a:= 0) AS a
    select = "@a:=@a+1 serial_number, p.proj_id,p.proj_name,p.client_id,p.order_id,p.order_date,p.proj_location,p.proj_addr,p.proj_desc,p.proj_order_val,p.proj_end_user,p.proj_consultant,p.epc_contractor,p.proj_manufacturer,p.price_basis,p.extra,p.ld_clause,p.erection_responsibility,p.warranty,p.project_status,pa.proj_manager,u.user_name,r.proj_remarks,created_by,created_at, modified_by,modified_at,p.sl_no"
    # select = "@a:=@a+1 serial_number, *"
    schema = "td_project p,td_project_assign pa,td_project_remarks r,md_user u,(SELECT @a:= 0) AS a"
    where = f"pa.proj_id=p.proj_id and r.proj_id = p.proj_id and pa.proj_manager=u.sl_no and p.sl_no='{id.id}'" if id.id>0 else f"pa.proj_id=p.proj_id and r.proj_id = p.proj_id and pa.proj_manager=u.sl_no"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result
