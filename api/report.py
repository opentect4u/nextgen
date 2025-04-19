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

class GetStockOut(BaseModel):
    dt:str
    proj_id:int

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
    # res_dt = {}

    # select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag)  project_stock,(SELECT SUM(qty*in_out_flag) FROM td_stock_new where item_id={id.item_id} and proj_id = 0) as warehouse_stock,st.item_id,p.prod_name,st.proj_id,pr.proj_name "
    # schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    # where = f"st.item_id ={id.item_id} and pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"
    # order = ""
    # flag = 1 
    # result = await db_select(select, schema, where, order, flag)
    # return result


    res_dt = {}

    select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag)  project_stock,st.item_id,p.prod_name,st.proj_id,pr.proj_name "
    schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    where = f"st.item_id ={id.item_id} and pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)

    select1 = f"SUM(qty*in_out_flag) as warehouse_stock "
    schema1 = "td_stock_new st, md_product p"
    where1 = f"st.item_id ={id.item_id} and st.proj_id = 0 and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"
    order1 = ""
    flag1 = 1 
    result1 = await db_select(select1, schema1, where1, order1, flag1)
    print(result1)
    # return result1
    # result['msg'].append({'warehouse_stock':result1['msg'][0]['warehouse_stock']})
    # return result
    for i in result['msg']:
        i['warehouse_stock'] = result1['msg'][0]['warehouse_stock']

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



    select = f"@a:=@a+1 serial_number,st.item_id as id,SUM(st.qty*st.in_out_flag) stock,(select sum(req_qty) from td_requisition_items where approve_flag='P' and item_id={id.item_id}) un_req_stock,(select sum(req_qty) from td_requisition_items where approve_flag='A' and item_id={id.item_id}) app_req_stock ,(SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where item_id={id.item_id} and proj_id = 0) as warehouse_stock,st.item_id,p.prod_name as name,st.proj_id,pr.proj_name"
    schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    where = f"st.item_id ={id.item_id} and pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result


@reportRouter.post('/get_stock_out_data')
async def getprojectpoc(id:GetStockOut):

    select_stck1 = f"distinct st.item_id as item_id, p.prod_name as item_name"
    schema_stck1 = "td_stock_new st,md_product p"
    where_stck1= f"st.proj_id='{id.proj_id}' and st.item_id=p.sl_no" 
    order_stck1 = ""
    flag_stck1 = 1 
    result_stck1= await db_select(select_stck1, schema_stck1, where_stck1, order_stck1, flag_stck1)
    print(result_stck1)
    stock = []

    for i in result_stck1['msg']:
        
        select_stck = f"max(sl_no) as max_sl"
        schema_stck = "td_stock_new"
        where_stck = f"item_id={i['item_id']} and proj_id='{id.proj_id}'"
        order_stck = ""
        flag_stck = 0 
        result_stck = await db_select(select_stck, schema_stck, where_stck, order_stck, flag_stck)
        
        select = f"balance"
        schema = "td_stock_new"
        where = f"sl_no={result_stck['msg']['max_sl']}"
        order = ""
        flag = 0 
        result = await db_select(select, schema, where, order, flag)
         
        select_req = f"i.approved_qty, i.approved_qty as copy_qty,r.req_no as req_no,i.item_id,r.project_id,(select sum(qty) from td_stock_new st where st.item_id={i['item_id']} and st.proj_id={id.proj_id} and st.ref_no=r.req_no) del_qty"
        schema_req = "td_requisition_items i,td_requisition r"
        where_req = f"i.item_id={i['item_id']} and r.project_id={id.proj_id} and (i.approve_flag='A' || i.approve_flag='H') and i.req_no=r.req_no"
        order_req = ""
        flag_req = 1 
        result_req = await db_select(select_req, schema_req, where_req, order_req, flag_req)
        print(result_req)

        select_trans = f"i.approved_qty, i.approved_qty as copy_qty,r.trans_no as req_no,i.item_id,r.to_proj_id as proj_id,(select sum(qty) from td_stock_new st where st.item_id={i['item_id']} and st.proj_id={id.proj_id} and st.ref_no=r.trans_no and in_out_flag=-1) del_qty"
        schema_trans = "td_transfer_items i,td_transfer r"
        where_trans = f"i.item_id={i['item_id']} and r.to_proj_id={id.proj_id} and (i.approve_flag='A' || i.approve_flag='H') and i.trans_no=r.trans_no"
        order_trans = ""
        flag_trans = 1 
        result_trans = await db_select(select_trans, schema_trans, where_trans, order_trans, flag_trans)
        print(result_req)

        select2 = f"sum(i.approved_qty) as qty,r.req_no as req_no"
        schema2 = "td_requisition_items i,td_requisition r"
        where2 = f"i.item_id={i['item_id']} and r.project_id={id.proj_id} and (i.approve_flag='A' || i.approve_flag='H') and i.req_no=r.req_no"
        order2 = ""
        flag2= 0 
        result2 = await db_select(select2, schema2, where2, order2, flag2)
        print(result2)
        stock.append({"id":i['item_id'],"name":i['item_name'],"stock":result['msg']['balance'],"req_stock":result2['msg']['qty'],"req_list":result_req['msg']+result_trans['msg']})

    return {'suc':1,'msg':stock}



    # select = f"sum(i.req_qty) req_qty"
    # schema = "td_stock_new"
    # where = f"sl_no={result_stck1['msg']['max_sl']}"
    # order = ""
    # flag = 1 
    # result = await db_select(select, schema, where, order, flag)
    return stock


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
