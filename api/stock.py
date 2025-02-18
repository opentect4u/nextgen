from fastapi import APIRouter
from typing import Optional,Union
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
    error:int
class StockOutData(BaseModel):
     id:int
     stock_out:int
     req_no:str
class SaveTrans(BaseModel):
    sl_no:int
    trans_dt:str
    intended_for:str
    client_id:int
    project_id:int
    purpose:str   
    items:list[TransferItems]
    user:str
class PurchaseItems(BaseModel):
    sl_no:int
    item_id:int
    qty:int
    error:int
class SavePur(BaseModel):
    sl_no:int
    pur_dt:str
    project_id:int
    purpose:str   
    items:list[PurchaseItems]
    user:str

class GetStock(BaseModel):
    proj_id:int
    prod_id:int

class StockOutList(BaseModel):
     proj_id:int
     dt:str
     user:str
     items:list[StockOutData]

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

class GetPurItem(BaseModel):
     pur_no:str

class GetTransItem(BaseModel):
     trans_no:str

class ApproveItems(BaseModel):
    sl_no: int
    item_id: int
    prod_name: str
    qty: int
    approve_flag: str
    check: bool


class GetApproveItems(BaseModel):
     trans_no:str
     items:list[ApproveItems]
     user:str
     from_proj_id:int
     to_proj_id:int


class PoSearch(BaseModel):
    from_proj_id:Optional[Union[int,str]]=None
    to_proj_id:Optional[Union[int,str]]=None
    make:Optional[str]=None
    part_no:Optional[str]=None
    prod_id:Optional[str]=None


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
    values = f"'TWP-{tno}', '{data.trans_dt}', '{data.intended_for}', {data.client_id},{'0'},'{data.project_id}','{data.purpose}','{data.user}','{formatted_dt}','{data.user}'"
    table_name = "td_transfer"
    whr = ""
    flag = 0
    result = await db_Insert(table_name, fields, values, whr, flag)
    lastID=result["lastId"]
    #========================================================================================================
    for i in data.items:
                fields= f'trans_no,item_id,qty,created_by,created_at,approved_qty,balance'
                values = f"'TWP-{tno}','{i.item_id}','{i.qty}','{data.user}','{formatted_dt}',{'0'},'{i.qty}'"
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
                fields= f'trans_no,item_id,qty,created_by,created_at,approved_qty,balance'
                values = f"'TPP-{tno}','{i.item_id}','{i.qty}','{data.user}','{formatted_dt}',{'0'},'{i.qty}'"
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

    select = "t.trans_no,t.trans_dt,t.created_by,t.created_at,t.sl_no,p.proj_name,t.to_proj_id,t.from_proj_id,(select proj_name from td_project where sl_no=t.from_proj_id) as from_proj_name"
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
    res_dt = {}
    select = f"t.trans_no,t.trans_dt,t.created_by,t.created_at,t.from_proj_id,t.sl_no,p.proj_name,t.to_proj_id,t.purpose,t.intended_for,t.client_id,c.client_name,(select proj_name from td_project where sl_no=t.from_proj_id) as from_proj_name" if result1['msg']['client_id']>0 else f"t.trans_no,t.trans_dt,t.created_by,t.created_at,t.sl_no,p.proj_name,t.to_proj_id,t.purpose,t.intended_for,(select proj_name from td_project where sl_no=t.from_proj_id) as from_proj_name"
    schema = f"td_transfer t,td_project p,md_client c" if result1['msg']['client_id']>0 else "td_transfer t,td_project p"
    where = f"t.sl_no='{data.id}' and t.trans_no like '%{'TPP-'}%' and p.sl_no=t.to_proj_id and c.sl_no = t.client_id" if result1['msg']['client_id']>0 else f"t.sl_no='{data.id}' and t.trans_no like '%{'TPP-'}%' and p.sl_no=t.to_proj_id"
    order = "ORDER BY t.created_at DESC"
    flag = 0 if data.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@stockRouter.post("/get_transfer_stock")
async def save_trans(data:GetTrans):
    res_dt = {}

    select = "t.trans_no,t.trans_dt,t.created_by,t.created_at,t.sl_no,p.proj_name,p.proj_id as to_projid,t.to_proj_id,t.from_proj_id,(select proj_name from td_project where sl_no=t.from_proj_id) as from_proj_name,(select proj_id from td_project where sl_no=t.from_proj_id) as from_projid"
    schema = "td_transfer t,td_project p"
    where = f"t.sl_no='{data.id}' and p.sl_no=t.to_proj_id" if data.id>0 else f"p.sl_no=t.to_proj_id"
    order = "ORDER BY t.created_at DESC"
    flag = 0 if data.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result




@stockRouter.post("/get_transfer_stock_items")
async def save_trans(data:GetTransItem):
    res_dt = {}
    select = "t.sl_no,t.trans_no,t.item_id,t.qty, t.created_at, t.approve_flag,p.prod_name,t.balance,t.approved_qty,t.cancelled_qty,t.approve_flag,t.cancelled_by,t.cancel_flag,t.approved_by,p.model_no,p.article_no,p.part_no"
    schema = "td_transfer_items t,md_product p"
    where = f"t.trans_no='{data.trans_no}' and p.sl_no=t.item_id"
    order = "ORDER BY t.created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@stockRouter.post('/get_logical_stock')
async def getprojectpoc(id:GetStock):
    # print(id.id)
    res_dt = {}
    select1 = f"sum(i.qty) as req_stock"
    schema1 = "td_transfer t,td_transfer_items i"
    where1 = f"i.item_id={id.prod_id} and t.from_proj_id ={id.proj_id} and i.approve_flag='P' and i.trans_no=t.trans_no"
    order1 = ""
    flag1 = 0 
    result1 = await db_select(select1, schema1, where1, order1, flag1)
    print("qty=======",result1['msg']['req_stock'])

    # select = f"SUM(qty*in_out_flag) project_stock, (SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where item_id={id.prod_id} and proj_id = 0) as warehouse_stock, sum(req_qty*in_out_flag) req_qty"
    select = f"(SELECT SUM(qty*in_out_flag)  td_stock_new where item_id={id.prod_id} and proj_id = {id.proj_id} and proj_id!=0) project_stock, (SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where item_id={id.prod_id} and proj_id = 0) as warehouse_stock, sum(req_qty*in_out_flag) req_qty"
    schema = "td_stock_new"
    where = f"item_id={id.prod_id} and proj_id ={id.proj_id}"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return {"result":result,"req_stock":result1['msg']['req_stock']}

@stockRouter.post('/get_logical_stock_req')
async def getprojectpoc(id:GetStock):
    # print(id.id)
    res_dt = {}
    # select1 = f"sum(i.req_qty) as req_stock"
    select1 = f"sum(i.req_qty) - sum(i.cancelled_qty) - i.balance as req_stock"
    schema1 = "td_requisition t,td_requisition_items i"
    where1 = f"i.item_id={id.prod_id} and t.project_id ={id.proj_id} and i.approve_flag='P' and i.req_no=t.req_no"
    order1 = ""
    flag1 = 0 
    result1 = await db_select(select1, schema1, where1, order1, flag1)


    select_tot = f"sum(i.req_qty) - sum(i.cancelled_qty) - i.balance as tot_stock"
    schema_tot = "td_requisition t,td_requisition_items i"
    where_tot = f"i.item_id={id.prod_id} and t.project_id ={id.proj_id} and i.req_no=t.req_no"
    order_tot = ""
    flag_tot = 0 
    result_tot = await db_select(select_tot, schema_tot, where_tot, order_tot, flag_tot)
    print("tot_stock=======",result_tot['msg']['tot_stock'])

    select_can = f"sum(i.cancelled_qty) as can_stock"
    schema_can = "td_requisition t,td_requisition_items i"
    where_can = f"i.item_id={id.prod_id} and t.project_id ={id.proj_id} and i.req_no=t.req_no"
    order_can = ""
    flag_can = 0 
    result_can = await db_select(select_can, schema_can, where_can, order_can, flag_can)
    print("can_stock=======",result_can['msg']['can_stock'])

    select2 = f"sum(qty) as del_stock"
    schema2 = "td_stock_new"
    where2 = f"item_id={id.prod_id} and proj_id ={id.proj_id} and in_out_flag=-1"
    order2 = ""
    flag2 = 0 
    result2 = await db_select(select2, schema2, where2, order2, flag2)
    print(result2)

    select = f"(SELECT SUM(qty*in_out_flag) td_stock_new where item_id={id.prod_id} and proj_id = {id.proj_id} and proj_id!=0) project_stock, (SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where item_id={id.prod_id} and proj_id = 0) as warehouse_stock, sum(req_qty*in_out_flag) req_qty"
    schema = "td_stock_new"
    where = f"item_id={id.prod_id} and proj_id ={id.proj_id}"
    order = ""
    flag =1 
    result = await db_select(select, schema, where, order, flag)
    if result1['suc']>0:
       print('result==',result,'result1==',result1,'result2==',result2,'result_tot==',result_tot,'result_can==',result_can)
       cancel_stock= result_can['msg']['can_stock'] if result_can['msg']['can_stock'] else 0
       return {"result":result,"req_stock":result1['msg']['req_stock'],"cancel_stock":cancel_stock ,"tot_stock":int(result_tot['msg']['tot_stock']) - result2['msg']['del_stock'] if int(result_tot['msg']['tot_stock']) and result2['msg']['del_stock'] else int(result_tot['msg']['tot_stock']) if int(result_tot['msg']['tot_stock']) else 0}
    else:
       return {"result":result,"req_stock":0,"tot_stock":0,"can_stock":0}
    

# @stockRouter.post("/approve_transfer_items")
# async def save_trans(data:GetApproveItems):
#     current_datetime = datetime.now()
#     formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
#     formatted_appr_dt= current_datetime.strftime("%Y-%m-%d")
#     stock_in = 1
#     stock_out = -1
#     for i in data.items:
#             select1 = f"approve_flag"
#             schema1 = "td_transfer_items"
#             where1= f"sl_no='{i.sl_no}'" 
#             order1 = "ORDER BY created_at DESC"
#             flag1 = 0 
#             result1= await db_select(select1, schema1, where1, order1, flag1)
#             if i.approve_flag=='A' and (result1['msg']['approve_flag']!='A' or result1['msg']['approve_flag']!='H') :
#                 fields= f"approve_flag='{i.approve_flag}',approved_by='{data.user}',approved_at='{formatted_dt}', approved_qty={i.qty}"
#                 values = f''
#                 table_name = "td_transfer_items"
#                 whr=f"trans_no='{data.trans_no}' and sl_no={i.sl_no}"   
#                 flag1 = 1 
#                 result2 = await db_Insert(table_name, fields, values, whr, flag1)
#                 if result2['suc']>0:
#                   res_dt = {"suc": 1, "msg": f"Successfully saved!"}
                
#                 else:
#                   res_dt = {"suc": 0, "msg": f"Error while saving!"}


                  


                  


#                 # ======================================================

#             select_stck = f"max(date) as max_dt"
#             schema_stck = "td_stock_new"
#             where_stck= f"proj_id='{data.to_proj_id}' and item_id='{i.item_id}'" 
#             order_stck = ""
#             flag_stck = 0 
#             result_stck= await db_select(select_stck, schema_stck, where_stck, order_stck, flag_stck)

#             select_stck1 = f"max(sl_no) as max_sl"
#             schema_stck1 = "td_stock_new"
#             where_stck1= f"proj_id='{data.to_proj_id}' and item_id='{i.item_id}'" 
#             order_stck1 = ""
#             flag_stck1 = 0 
#             result_stck1= await db_select(select_stck1, schema_stck1, where_stck1, order_stck1, flag_stck1)

#             print(result_stck['msg']['max_dt'],result_stck1['msg']['max_sl'])

#             if result_stck['msg']['max_dt'] and result_stck1['msg']['max_sl']:
#                  select_stck2 = f"balance,count(balance) as cnt"
#                  schema_stck2 = "td_stock_new"
#                  where_stck2= f"proj_id='{data.to_proj_id}' and item_id='{i.item_id}' and date='{result_stck['msg']['max_dt']}' and sl_no='{result_stck1['msg']['max_sl']}'" 
#                  order_stck2 = ""
#                  flag_stck2 = 0 
#                  result_stck2= await db_select(select_stck2, schema_stck2, where_stck2, order_stck2, flag_stck2)
#                  qty = result_stck2['msg']['balance'] + i.qty 
#             else:
#                  qty=i.qty

#             flds= f'date,ref_no,proj_id,item_id,qty,in_out_flag,balance,created_by,created_at'
#             val = f'"{formatted_appr_dt}","{data.trans_no}","{data.to_proj_id}",{i.item_id},{i.qty},{stock_in},{qty},"{data.user}","{formatted_dt}"'
#             table = "td_stock_new"
#             whr=f""
#             flag2 =  0
#             result3 = await db_Insert(table, flds, val, whr, flag2)
#             if(result3['suc']>0): 
#                 stock_save = 1
#                 res_dt2 = {"suc": 1, "msg": f"Updated Successfully And Inserted to stock"}

#             else:
#                 stock_save = 0

#                 res_dt2= {"suc": 0, "msg": f"Error while inserting into td_stock_new"}
            
#             select_stck = f"max(date) as max_dt"
#             schema_stck = "td_stock_new"
#             where_stck= f"proj_id='{data.from_proj_id}' and item_id='{i.item_id}'" 
#             order_stck = ""
#             flag_stck = 0 
#             result_stck= await db_select(select_stck, schema_stck, where_stck, order_stck, flag_stck)

#             select_stck1 = f"max(sl_no) as max_sl"
#             schema_stck1 = "td_stock_new"
#             where_stck1= f"proj_id='{data.from_proj_id}' and item_id='{i.item_id}'" 
#             order_stck1 = ""
#             flag_stck1 = 0 
#             result_stck1= await db_select(select_stck1, schema_stck1, where_stck1, order_stck1, flag_stck1)

#             print(result_stck['msg']['max_dt'],result_stck1['msg']['max_sl'])


#             select_stck2 = f"balance"
#             schema_stck2 = "td_stock_new"
#             where_stck2= f"proj_id='{data.from_proj_id}' and item_id='{i.item_id}' and date='{result_stck['msg']['max_dt']}' and sl_no='{result_stck1['msg']['max_sl']}'" 
#             order_stck2 = ""
#             flag_stck2 = 0 
#             result_stck2= await db_select(select_stck2, schema_stck2, where_stck2, order_stck2, flag_stck2)

#             qty = result_stck2['msg']['balance'] - i.qty

#             flds_out= f'date,ref_no,proj_id,item_id,qty,in_out_flag,balance,created_by,created_at'
#             val_out= f'"{formatted_appr_dt}","{data.trans_no}","{data.from_proj_id}",{i.item_id},{i.qty},{stock_out},{qty},"{data.user}","{formatted_dt}"'
#             table_out= "td_stock_new"
#             whr_out=f""
#             flag2_out=  0
#             result3_out= await db_Insert(table_out, flds_out, val_out, whr_out, flag2_out)
#             if(result3_out['suc']>0): 
#                 stock_save = 1
#                 res_dt2_out = {"suc": 1, "msg": f"Updated Successfully And Inserted to stock"}

#             else:
#                 stock_save = 0

#                 res_dt2_out= {"suc": 0, "msg": f"Error while inserting into td_stock_new"}

#                 # ======================================================
    
#     res_dt = {"suc": 1, "msg": res_dt2_out['msg']}
   
#     return res_dt



@stockRouter.post("/approve_transfer_items")
async def save_trans(data:GetApproveItems):
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    formatted_appr_dt= current_datetime.strftime("%Y-%m-%d")
    stock_in = 1
    stock_out = -1
    for i in data.items:
            select1 = f"approve_flag"
            schema1 = "td_transfer_items"
            where1= f"sl_no='{i.sl_no}'" 
            order1 = "ORDER BY created_at DESC"
            flag1 = 0 
            result1= await db_select(select1, schema1, where1, order1, flag1)
            if i.approve_flag=='A' and (result1['msg']['approve_flag']!='A' or result1['msg']['approve_flag']!='H') :
                fields= f"approve_flag='{i.approve_flag}',approved_by='{data.user}',approved_at='{formatted_dt}', approved_qty={i.qty}"
                values = f''
                table_name = "td_transfer_items"
                whr=f"trans_no='{data.trans_no}' and sl_no={i.sl_no}"   
                flag1 = 1 
                result2 = await db_Insert(table_name, fields, values, whr, flag1)
                if result2['suc']>0:
                  res_dt = {"suc": 1, "msg": f"Successfully saved!"}
                
                else:
                  res_dt = {"suc": 0, "msg": f"Error while saving!"}


                select = "balance"
                table = "td_transfer_items"
                where = f"sl_no={i.sl_no}"
                order = ""
                flag = 0 
                res_dt = await db_select(select,table,where,order,flag)
                print('dfdfdfdf',res_dt['msg'])

                _select = "approved_qty"
                _table = "td_transfer_items"
                _where = f"sl_no={i.sl_no}"
                _order = ""
                _flag = 0 
                _res_dt = await db_select(_select,_table,_where,_order,_flag)
                print('dfdfdfdf',_res_dt['msg'])
                if i.qty>0:
                    balance = int(res_dt['msg']['balance']) - i.qty if int(res_dt['msg']['balance'])>0 else i.qty
                    approved_qty = int(_res_dt['msg']['approved_qty']) + i.qty if int(_res_dt['msg']['approved_qty'])>0 else i.qty
                    # approve_flag = 'A'  if approved_qty == i.req_qty else 'H'
                    approve_flag = 'A'  
                    fields1= f'approved_qty="{approved_qty}",balance={balance},modified_by="{id.user}",modified_at="{formatted_dt}",approve_flag="{approve_flag}"'
                    values1 = f''
                    table_name1 = "td_transfer_items"
                    whr1 = f'sl_no="{i.sl_no}"' 

                    flag2 = 1 

                    result3 = await db_Insert(table_name1, fields1, values1, whr1, flag2)

                # ======================================================

                    select_stck = f"max(date) as max_dt"
                    schema_stck = "td_stock_new"
                    where_stck= f"proj_id='{data.to_proj_id}' and item_id='{i.item_id}'" 
                    order_stck = ""
                    flag_stck = 0 
                    result_stck= await db_select(select_stck, schema_stck, where_stck, order_stck, flag_stck)

                    select_stck1 = f"max(sl_no) as max_sl"
                    schema_stck1 = "td_stock_new"
                    where_stck1= f"proj_id='{data.to_proj_id}' and item_id='{i.item_id}'" 
                    order_stck1 = ""
                    flag_stck1 = 0 
                    result_stck1= await db_select(select_stck1, schema_stck1, where_stck1, order_stck1, flag_stck1)

                    print(result_stck['msg']['max_dt'],result_stck1['msg']['max_sl'])

                    if result_stck['msg']['max_dt'] and result_stck1['msg']['max_sl']:
                        select_stck2 = f"balance,count(balance) as cnt"
                        schema_stck2 = "td_stock_new"
                        where_stck2= f"proj_id='{data.to_proj_id}' and item_id='{i.item_id}' and date='{result_stck['msg']['max_dt']}' and sl_no='{result_stck1['msg']['max_sl']}'" 
                        order_stck2 = ""
                        flag_stck2 = 0 
                        result_stck2= await db_select(select_stck2, schema_stck2, where_stck2, order_stck2, flag_stck2)
                        qty = result_stck2['msg']['balance'] + i.qty 
                    else:
                        qty=i.qty

                    flds= f'date,ref_no,proj_id,item_id,qty,in_out_flag,balance,created_by,created_at'
                    val = f'"{formatted_appr_dt}","{data.trans_no}","{data.to_proj_id}",{i.item_id},{i.qty},{stock_in},{qty},"{data.user}","{formatted_dt}"'
                    table = "td_stock_new"
                    whr=f""
                    flag2 =  0
                    result3 = await db_Insert(table, flds, val, whr, flag2)
                    if(result3['suc']>0): 
                        stock_save = 1
                        res_dt2 = {"suc": 1, "msg": f"Updated Successfully And Inserted to stock"}

                    else:
                        stock_save = 0

                        res_dt2= {"suc": 0, "msg": f"Error while inserting into td_stock_new"}
                    
                    select_stck = f"max(date) as max_dt"
                    schema_stck = "td_stock_new"
                    where_stck= f"proj_id='{data.from_proj_id}' and item_id='{i.item_id}'" 
                    order_stck = ""
                    flag_stck = 0 
                    result_stck= await db_select(select_stck, schema_stck, where_stck, order_stck, flag_stck)

                    select_stck1 = f"max(sl_no) as max_sl"
                    schema_stck1 = "td_stock_new"
                    where_stck1= f"proj_id='{data.from_proj_id}' and item_id='{i.item_id}'" 
                    order_stck1 = ""
                    flag_stck1 = 0 
                    result_stck1= await db_select(select_stck1, schema_stck1, where_stck1, order_stck1, flag_stck1)

                    print(result_stck['msg']['max_dt'],result_stck1['msg']['max_sl'])


                    select_stck2 = f"balance"
                    schema_stck2 = "td_stock_new"
                    where_stck2= f"proj_id='{data.from_proj_id}' and item_id='{i.item_id}' and date='{result_stck['msg']['max_dt']}' and sl_no='{result_stck1['msg']['max_sl']}'" 
                    order_stck2 = ""
                    flag_stck2 = 0 
                    result_stck2= await db_select(select_stck2, schema_stck2, where_stck2, order_stck2, flag_stck2)

                    qty = result_stck2['msg']['balance'] - i.qty

                    flds_out= f'date,ref_no,proj_id,item_id,qty,in_out_flag,balance,created_by,created_at'
                    val_out= f'"{formatted_appr_dt}","{data.trans_no}","{data.from_proj_id}",{i.item_id},{i.qty},{stock_out},{qty},"{data.user}","{formatted_dt}"'
                    table_out= "td_stock_new"
                    whr_out=f""
                    flag2_out=  0
                    result3_out= await db_Insert(table_out, flds_out, val_out, whr_out, flag2_out)
                    if(result3_out['suc']>0): 
                        stock_save = 1
                        res_dt2_out = {"suc": 1, "msg": f"Updated Successfully And Inserted to stock"}

                    else:
                        stock_save = 0

                        res_dt2_out= {"suc": 0, "msg": f"Error while inserting into td_stock_new"}

                        # ======================================================
            else:
                fields= f"cancel_flag='{i.approve_flag}',cancelled_by='{data.user}',cancelled_at='{formatted_dt}', cancelled_qty={i.qty}"
                values = f''
                table_name = "td_transfer_items"
                whr=f"trans_no='{data.trans_no}' and sl_no={i.sl_no}"   
                flag1 = 1 
                result2 = await db_Insert(table_name, fields, values, whr, flag1)
                if result2['suc']>0:
                  res_dt = {"suc": 1, "msg": f"Successfully saved!"}
                
                else:
                  res_dt = {"suc": 0, "msg": f"Error while saving!"}


                select = "balance"
                table = "td_transfer_items"
                where = f"sl_no={i.sl_no}"
                order = ""
                flag = 0 
                res_dt = await db_select(select,table,where,order,flag)
                print('dfdfdfdf',res_dt['msg'])

                _select = "cancelled_qty"
                _table = "td_transfer_items"
                _where = f"sl_no={i.sl_no}"
                _order = ""
                _flag = 0 
                _res_dt = await db_select(_select,_table,_where,_order,_flag)
                print('dfdfdfdf',_res_dt['msg'])
                if i.qty>0:
                    balance = int(res_dt['msg']['balance']) - i.qty if int(res_dt['msg']['balance'])>0 else i.qty
                    cancelled_qty = int(_res_dt['msg']['cancelled_qty']) + i.qty if int(_res_dt['msg']['cancelled_qty'])>0 else i.qty
                    # approve_flag = 'A'  if approved_qty == i.req_qty else 'H'
                    cancell_flag = 'A'  
                    fields1= f'cancelled_qty="{cancelled_qty}",balance={balance},modified_by="{id.user}",modified_at="{formatted_dt}",approve_flag="{approve_flag}"'
                    values1 = f''
                    table_name1 = "td_transfer_items"
                    whr1 = f'sl_no="{i.sl_no}"' 

                    flag2 = 1 

                    result3 = await db_Insert(table_name1, fields1, values1, whr1, flag2)
                 
    res_dt = {"suc": 1, "msg": res_dt2_out['msg']}
   
    return res_dt



@stockRouter.post('/advanced_search_transfer')
async def getprojectpoc(id:PoSearch):
   
    res_dt = {}

    select = "t.sl_no,t.trans_no,t.from_proj_id,t.to_proj_id,i.item_id,p.prod_name,p.prod_make,p.part_no,(select proj_name from td_project where sl_no=t.to_proj_id) to_proj_name,(select proj_name from td_project where sl_no=t.from_proj_id) from_proj_name"
    schema = '''td_transfer t left join td_transfer_items i on t.trans_no=i.trans_no
left join md_product p ON p.sl_no=i.item_id 
'''
    where = ""
    if(id.from_proj_id != 0 and id.from_proj_id != ""):
        where += f"t.from_proj_id='{id.from_proj_id}' {"AND " if(id.to_proj_id != '' or id.part_no != '' or id.prod_id != '' or id.make!='') else ''}"
    if(id.to_proj_id != 0 and id.to_proj_id != ""):
        where += f"t.to_proj_id='{id.to_proj_id}' {"AND " if(id.part_no != '' or id.prod_id != '' or id.make!='') else ''}"
    if(id.part_no != ''):
        where += f"p.part_no like '%{id.part_no}%' {"AND " if(id.prod_id != '' or id.make!='') else ''}"
    if(id.prod_id != ''):
        where += f"i.item_id='{id.prod_id}' {"AND " if id.make else ''}"
    if(id.make):
         where += f"p.prod_make like '%{id.make}%' "
    # if(id.to_dt != '' or id.from_dt != ''):
    #     where += f'''(b.po_issue_date BETWEEN "{f'{id.from_dt}' if(id.from_dt != '') else ''}" and "{f'{id.to_dt}' if(id.to_dt != '') else ''}") 
        
        
    #     '''

    where = f"{f'({where}) AND ' if(where != '') else ''}" + f"(t.from_proj_id IS NOT NULL AND t.to_proj_id IS NOT NULL AND p.part_no IS NOT NULL and i.item_id is not null and p.prod_make is not null)"
    
    order = "ORDER BY t.created_at DESC"
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    return result




@stockRouter.post("/get_req_log")
async def save_trans(data:GetStock):
    res_dt = {}
    select = "r.req_no,r.req_date,i.approve_flag,i.rc_qty,r.reason,r.purpose,i.req_qty"
    schema = "td_requisition r,td_requisition_items i"
    where = f"i.item_id='{data.prod_id}' and r.project_id='{data.proj_id}' and r.req_no=i.req_no and i.approve_flag='P'"
    order = "ORDER BY r.created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@stockRouter.post("/save_stock_out")
async def save_stock_out(data:StockOutList):
        current_datetime = datetime.now()
        
        formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
        
        for i in data.items:
            select_stck = f"max(date) as max_dt"
            schema_stck = "td_stock_new"
            where_stck= f"proj_id='{data.proj_id}' and item_id='{i.id}'" 
            order_stck = ""
            flag_stck = 0 
            result_stck= await db_select(select_stck, schema_stck, where_stck, order_stck, flag_stck)

            select_stck1 = f"max(sl_no) as max_sl"
            schema_stck1 = "td_stock_new"
            where_stck1= f"proj_id='{data.proj_id}' and item_id='{i.id}'" 
            order_stck1 = ""
            flag_stck1 = 0 
            result_stck1= await db_select(select_stck1, schema_stck1, where_stck1, order_stck1, flag_stck1)

            print(result_stck['msg']['max_dt'],result_stck1['msg']['max_sl'])


            select_stck2 = f"balance"
            schema_stck2 = "td_stock_new"
            where_stck2= f"proj_id='{data.proj_id}' and item_id='{i.id}' and date='{result_stck['msg']['max_dt']}' and sl_no='{result_stck1['msg']['max_sl']}'" 
            order_stck2 = ""
            flag_stck2 = 0 
            result_stck2= await db_select(select_stck2, schema_stck2, where_stck2, order_stck2, flag_stck2)
            stock_out=-1
            qty = result_stck2['msg']['balance'] - i.stock_out

            flds_out= f'date,ref_no,proj_id,item_id,qty,in_out_flag,balance,created_by,created_at'
            val_out= f'"{formatted_dt}","{i.req_no}","{data.proj_id}",{i.id},{i.stock_out},{stock_out},{qty},"{data.user}","{formatted_dt}"'
            table_out= "td_stock_new"
            whr_out=f""
            flag2_out=  0
            result3_out= await db_Insert(table_out, flds_out, val_out, whr_out, flag2_out)

        return result3_out


@stockRouter.post("/save_pur_req")
async def save_trans(data:SavePur):
    res_dt = {}
    print(data)
    current_datetime = datetime.now()
    purno = int(round(current_datetime.timestamp()))
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")


    fields= f"pur_no,pur_date,pur_proj,pur_by,created_at,created_by"
    values = f"'PR-{purno}','{data.pur_dt}','{data.project_id}', '{data.user}','{formatted_dt}','{data.user}'"
    table_name = "td_purchase_req"
    whr = ""
    flag = 0
    result = await db_Insert(table_name, fields, values, whr, flag)
    lastID=result["lastId"]
    #========================================================================================================
    for i in data.items:
                fields= f'pur_no,item_id,qty,created_by,created_at'
                values = f"'PR-{purno}','{i.item_id}','{i.qty}','{data.user}','{formatted_dt}'"
                table_name = "td_purchase_items"
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


@stockRouter.post("/get_purchase_req")
async def save_trans(data:GetTrans):
    res_dt = {}

    select = "t.pur_no,t.pur_date,t.created_by,t.created_at,t.sl_no,p.proj_name,p.proj_name as proj_id"
    schema = "td_purchase_req t,td_project p"
    where = f"t.sl_no='{data.id}' and p.sl_no=t.pur_proj" if data.id>0 else f"p.sl_no=t.pur_proj"
    order = "ORDER BY t.created_at DESC"
    flag = 0 if data.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@stockRouter.post("/get_purchase_req_items")
async def save_trans(data:GetPurItem):
    res_dt = {}

    select = "*"
    schema = "td_purchase_items"
    where = f"pur_no='{data.pur_no}'"
    order = ""
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result




     












