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
class ProjectPoc(BaseModel):
    sl_no:int
    poc_name:str
    poc_ph_1:str
    poc_ph_2:str
    poc_email:str
class Project(BaseModel):
     id:int
     proj_id:str
     proj_name:str
     client_id:int
     client_location:str
     client_gst:str
     client_pan:str
     order_id:str
     order_date:str
     proj_delivery_date:str
     proj_desc:str
     proj_order_val:str
     proj_end_user:str
     proj_consultant:str
     epc_contractor:str
     price_basis:str
     ld_clause_flag:str
     ld_clause:str
     erection_responsibility:str
     warranty:str
     proj_manager:int
     proj_poc:list[ProjectPoc]
    #  proj_remarks:str
     user:str
     

class GetProject(BaseModel):
     id:int


# @projectRouter.post('/addproject')
# async def addproject(dt:Project):
#     print(dt)
#     res_dt={}
#     current_datetime = datetime.now()
#     formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
#     fields= f'proj_id,proj_name,client_id,client_location,client_gst,client_pan,order_id,order_date,proj_delivery_date,proj_desc,proj_order_val,proj_end_user,proj_consultant,epc_contractor,price_basis,ld_clause,ld_clause_flag,erection_responsibility,warranty,created_by,created_at'
#     values = f'"{dt.proj_id}","{dt.proj_name}","{dt.client_id}","{dt.client_location}","{dt.client_gst}","{dt.client_pan}","{dt.order_id}","{dt.order_date}","{dt.proj_delivery_date}","{dt.proj_desc}","{dt.proj_order_val}","{dt.proj_end_user}","{dt.proj_consultant}","{dt.epc_contractor}","{dt.price_basis}","{dt.ld_clause}","{dt.ld_clause_flag}","{dt.erection_responsibility}","{dt.warranty}","{dt.user}","{formatted_dt}"' 
#     table_name = "td_project"
#     whr =  None
#     flag = 1 if dt.id>0 else 0
#     if(dt.id==0):
#         result = await db_Insert(table_name, fields, values, whr, flag)
#         if(result['suc']>0):
#             fields1= f'proj_id,proj_manager,created_by,created_at'
#             values1 = f'"{dt.proj_id}","{dt.proj_manager}","{dt.user}","{formatted_dt}"'
#             table_name1 = "td_project_assign"
#             whr1 =  None
#             flag1 = 1 if dt.id>0 else 0
#             result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)

#             # fields2= f'proj_id,proj_remarks,created_by,created_at'
#             # values2 = f'"{dt.proj_id}","{dt.proj_remarks}","{dt.user}","{formatted_dt}"'
#             # table_name2 = "td_project_remarks"
#             # whr2 =  None
#             # flag2 = 1 if dt.id>0 else 0
#             # result2 = await db_Insert(table_name2, fields2, values2, whr2, flag2)

#             if result1['suc']>0 :
#                 res_dt = {"suc": 1, "msg": "Project inserted successfully!"}
#             else:
#                 res_dt = {"suc": 0, "msg": "Error while inserting!"}
#         else:
#             res_dt = {"suc": 0, "msg": "Error while inserting!"}
    
#     else:
#         print(flag)
#         fields=f'proj_name="{dt.proj_name}",client_id="{dt.client_id}",client_location="{dt.client_location}",client_gst="{dt.client_gst}",client_pan="{dt.client_pan}",order_id="{dt.order_id}" order_date="{dt.order_date}",proj_delivery_date="{dt.proj_delivery_date}",proj_desc="{dt.proj_desc}",proj_order_val="{dt.proj_order_val}",proj_end_user="{dt.proj_end_user}",proj_consultant="{dt.proj_consultant}",epc_contractor="{dt.epc_contractor}",,price_basis="{dt.price_basis}",ld_clause="{dt.ld_clause}",ld_clause_flag="{dt.ld_clause_flag}",erection_responsibility="{dt.erection_responsibility}",warranty="{dt.warranty}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
#         whr=f'sl_no="{dt.id}"'
#         result = await db_Insert(table_name, fields, values, whr, flag)
#         if(result['suc']>0):
#             fields1= f'proj_manager="{dt.proj_manager}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
#             values1=''
#             table_name1 = "td_project_assign"
#             whr1=f'proj_id="{dt.proj_id}"'
#             flag1 = 1 if dt.id>0 else 0
#             result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)

            

#             if result1['suc']>0 :
#                 res_dt = {"suc": 1, "msg": "Project updated successfully!"}
#             else:
#                 res_dt = {"suc": 0, "msg": "Error while updating!"}
#         else:
#             res_dt = {"suc": 0, "msg": "Error while updating!"}


#     return res_dt

@projectRouter.post('/addproject')
async def addproject(dt:Project):
    print(dt)
    res_dt={}
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'proj_id,proj_name,client_id,client_location,client_gst,client_pan,order_id,order_date,proj_delivery_date,proj_desc,proj_order_val,proj_end_user,proj_consultant,epc_contractor,price_basis,ld_clause,ld_clause_flag,erection_responsibility,warranty,created_by,created_at'
    values = f'"{dt.proj_id}","{dt.proj_name}","{dt.client_id}","{dt.client_location}","{dt.client_gst}","{dt.client_pan}","{dt.order_id}","{dt.order_date}","{dt.proj_delivery_date}","{dt.proj_desc}","{dt.proj_order_val}","{dt.proj_end_user}","{dt.proj_consultant}","{dt.epc_contractor}","{dt.price_basis}","{dt.ld_clause}","{dt.ld_clause_flag}","{dt.erection_responsibility}","{dt.warranty}","{dt.user}","{formatted_dt}"' if dt.id==0 else f'proj_name="{dt.proj_name}",client_id="{dt.client_id}",client_location="{dt.client_location}",client_gst="{dt.client_gst}",client_pan="{dt.client_pan}",order_id="{dt.order_id}" order_date="{dt.order_date}",proj_delivery_date="{dt.proj_delivery_date}",proj_desc="{dt.proj_desc}",proj_order_val="{dt.proj_order_val}",proj_end_user="{dt.proj_end_user}",proj_consultant="{dt.proj_consultant}",epc_contractor="{dt.epc_contractor}",,price_basis="{dt.price_basis}",ld_clause="{dt.ld_clause}",ld_clause_flag="{dt.ld_clause_flag}",erection_responsibility="{dt.erection_responsibility}",warranty="{dt.warranty}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
    table_name = "td_project"
    whr =  f'sl_no="{dt.id}"' if dt.id>0 else ""
    flag = 1 if dt.id>0 else 0
    # if(dt.id==0):
    result = await db_Insert(table_name, fields, values, whr, flag)
    lastID=dt.id if dt.id>0 else result["lastId"]

    if(result['suc']>0):
            fields1= f'proj_id,proj_manager,created_by,created_at' if dt.id==0 else f'proj_manager="{dt.proj_manager}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
            values1 = f'"{dt.proj_id}","{dt.proj_manager}","{dt.user}","{formatted_dt}"'
            table_name1 = "td_project_assign"
            whr1 =f'proj_id="{dt.proj_id}"' if dt.id>0 else None
            flag1 = 1 if dt.id>0 else 0
            result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)

            # fields2= f'proj_id,proj_remarks,created_by,created_at'
            # values2 = f'"{dt.proj_id}","{dt.proj_remarks}","{dt.user}","{formatted_dt}"'
            # table_name2 = "td_project_remarks"
            # whr2 =  None
            # flag2 = 1 if dt.id>0 else 0
            # result2 = await db_Insert(table_name2, fields2, values2, whr2, flag2)

            for v in dt.proj_poc:
                fields= f'poc_name="{v.poc_name}", poc_email="{v.poc_email}",poc_ph_1="{v.poc_ph_1}",poc_ph_2="{v.poc_ph_2}",poc_email="{v.poc_email}",modified_by="{dt.user}",modified_at="{formatted_dt}"' if v.sl_no > 0 else f'proj_id,poc_name,poc_email,poc_phone_1,poc_phone_2,created_by,created_at'
                values = f'"{dt.proj_id}","{v.poc_name}","{v.poc_email}","{v.poc_ph_1}","{v.poc_ph_2}","{dt.user}","{formatted_dt}"'
                table_name = "td_project_poc"
                whr =  f'sl_no="{v.sl_no}"' if v.sl_no > 0 else None
                flag2 = 1 if v.sl_no>0 else 0
                result2 = await db_Insert(table_name, fields, values, whr, flag2)

            if result1['suc'] and result2['suc']>0 :
                res_dt = {"suc": 1, "msg": f"Project saved successfully!" if dt.id==0 else  f"Project updated successfully!" }
            else:
                res_dt = {"suc": 0, "msg": "Error!"}
    else:
            res_dt = {"suc": 0, "msg": "Error!"}
    

    return res_dt




@projectRouter.post('/getproject')
async def getproject(id:GetProject):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    # SELECT @a:=@a+1 serial_number, busi_act_name FROM md_busi_act, (SELECT @a:= 0) AS a
    select = "@a:=@a+1 serial_number,p.proj_id,p.proj_name,p.client_id,p.client_location,p.client_gst,p.client_pan,p.proj_delivery_date,p.order_id,p.order_date,p.proj_desc,p.proj_order_val,p.proj_end_user,p.proj_consultant,p.epc_contractor,p.price_basis,p.ld_clause,p.ld_clause_flag,p.erection_responsibility,p.warranty,pa.proj_manager,u.user_name as proj_manager_name,p.created_by,p.created_at,p.modified_by,p.modified_at,p.sl_no"
    # select = "@a:=@a+1 serial_number, *"
    schema = "td_project p,td_project_assign pa,md_user u,(SELECT @a:= 0) AS a"
    where = f"pa.proj_id=p.proj_id and pa.proj_manager=u.sl_no and p.sl_no='{id.id}'" if id.id>0 else f"pa.proj_id=p.proj_id and pa.proj_manager=u.sl_no"
    # where = f"p.sl_no='{id.id}'" if id.id>0 else f"pa.proj_id=p.proj_id and pa.proj_manager=u.sl_no"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@projectRouter.post('/getprojectpoc')
async def getprojectpoc(id:GetProject):
    print(id.id)
    res_dt = {}

    select = "*"
    schema = "td_project_poc"
    where = f"proj_id='{id.id}'" if id.id>0 else ""
    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

