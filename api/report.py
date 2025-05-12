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

class mrnprojreport(BaseModel):
    type:str
    proj_id:int
    vendor_id:int
    po_no:str

class mrnpur(BaseModel):
    pur_no:str
    
class stockoutreport(BaseModel):
    type:str
    proj_id:int
    dt:str

class MatVal(BaseModel):
    proj_id:int
    


@reportRouter.post('/allstock')
async def getprojectpoc(id:Allstock):
    res_dt = {}

    select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag) stock,st.item_id,concat(p.prod_name,' (Part No.: ',p.part_no,' Article No.: ',p.article_no,' Model No.: ',p.model_no,' Desc: ',p.prod_desc,') ') prod_name"
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

    select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag)  project_stock,st.item_id,concat(p.prod_name,' (Part No.: ',p.part_no,' Article No.: ',p.article_no,' Model No.: ',p.model_no,' Desc: ',p.prod_desc,') ') prod_name,st.proj_id,pr.proj_name "
    schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    where = f"st.item_id ={id.item_id} and pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)

    select1 = f"SUM(qty*in_out_flag) as warehouse_stock, st.item_id,p.prod_name,st.proj_id"
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
        i['warehouse_stock'] = result1['msg'][0]['warehouse_stock'] if len(result1['msg']) else 0

    if len(result['msg']):
       return result
    else:
       return result1


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

    select = f"@a:=@a+1 serial_number,SUM(st.qty*st.in_out_flag)  project_stock,(SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where proj_id = 0 and item_id=st.item_id)  as warehouse_stock,st.item_id,concat(p.prod_name,' (Part No.: ',p.part_no,' Article No.: ',p.article_no,' Model No.: ',p.model_no,' Desc: ',p.prod_desc,') ') prod_name,st.proj_id,pr.proj_name "
    schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    where = f"pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result


@reportRouter.post('/mrnprojreport')
async def getprojectpoc(id:mrnprojreport):
    res_dt = {}
    if id.po_no=='0':
            if id.type == 'P':
                if id.vendor_id and id.proj_id:
                    criteria = f"pb.vendor_id = {id.vendor_id} and pb.project_id={id.proj_id}"
                elif id.vendor_id:
                    criteria = f"pb.vendor_id = {id.vendor_id} and project_id!=0"
                elif id.proj_id:    
                    criteria = f"pb.project_id={id.proj_id}"
            else:
                if id.vendor_id:
                    criteria = f"pb.vendor_id = {id.vendor_id} and pb.project_id=0"
    else:
            print('inside !0')
            if id.type == 'P':
                print('inside !0 P')
                if id.vendor_id and id.proj_id:
                    criteria = f"pb.vendor_id = {id.vendor_id} and pb.project_id={id.proj_id} and pb.po_no='{id.po_no}'"
                elif id.vendor_id:
                    criteria = f"pb.vendor_id = {id.vendor_id} and project_id!=0 and pb.po_no='{id.po_no}'"
                elif id.proj_id:    
                    criteria = f"pb.project_id={id.proj_id} and pb.po_no='{id.po_no}'"
                else:
                    criteria = f"pb.po_no='{id.po_no}'"

            else:
                if id.vendor_id:
                    criteria = f"pb.vendor_id = {id.vendor_id} and pb.project_id=0 and pb.po_no='{id.po_no}'"
                else:
                    criteria = f"pb.po_no='{id.po_no}' and pb.project_id=0"



    print(criteria,'criteria')
    # select = f"DISTINCT i.item_id, p.prod_name,pb.po_no, i.quantity, d.rc_qty,d.mrn_no,d.invoice,pi.approved_ord_qty,pb.pur_req,v.vendor_name,concat(pd.proj_name,' (ID:',pd.proj_id,')') as proj_name" if id.type=='P' else f"DISTINCT i.item_id, p.prod_name, i.quantity, d.rc_qty,d.mrn_no,d.invoice,pi.approved_ord_qty,pb.pur_req,'Warehouse' as proj_name,v.vendor_name"
    
    # schema = f"td_po_items i LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria} LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no LEFT JOIN md_product p on i.item_id=p.sl_no LEFT JOIN td_project pd on pb.project_id=pd.sl_no LEFT JOIN md_vendor v on pb.vendor_id=v.sl_no LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id" if id.type=='P' else f"td_po_items i LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria} LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no LEFT JOIN md_product p on i.item_id=p.sl_no LEFT JOIN md_vendor v on pb.vendor_id=v.sl_no LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id"
    # where = f"EXISTS ( SELECT 1 FROM td_po_items i2 JOIN td_item_delivery_details d2 ON i2.item_id = d2.prod_id WHERE i2.item_id = i.item_id AND i2.quantity = i.quantity  AND d2.rc_qty = d.rc_qty)"
  

    select = f"DISTINCT i.item_id, GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt,'%d/%m/%Y')) invoice_dt, concat(p.prod_name,'(Make:',p.prod_make,', Part No.:',p.part_no,',  Article No.:',p.article_no,', Model No.:',p.model_no,', Description:',p.prod_desc,')') as prod_name, pb.po_no, i.quantity, SUM(d.rc_qty) AS rc_qty, GROUP_CONCAT(DISTINCT d.mrn_no) AS mrn_no,GROUP_CONCAT(DISTINCT d.invoice) AS invoice,pi.approved_ord_qty, pb.pur_req, v.vendor_name,CONCAT(pd.proj_name, ' (ID:', pd.proj_id, ')') AS proj_name" if id.type=='P' else f"DISTINCT i.item_id,GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt,'%d/%m/%Y')) invoice_dt,concat(p.prod_name,'(Make:',p.prod_make,', Part No.:',p.part_no,',  Article No.:',p.article_no,', Model No.:',p.model_no,', Description:',p.prod_desc,')') as prod_name, SUM(d.rc_qty) AS rc_qty, GROUP_CONCAT(DISTINCT d.mrn_no) AS mrn_no,GROUP_CONCAT(DISTINCT d.invoice) AS invoice,pi.approved_ord_qty,pb.pur_req,'Warehouse' as proj_name,v.vendor_name"
    
    schema = f"td_po_items i LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria} LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no LEFT JOIN md_product p on i.item_id=p.sl_no LEFT JOIN td_project pd on pb.project_id=pd.sl_no LEFT JOIN md_vendor v on pb.vendor_id=v.sl_no LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id left join td_item_delivery_invoice inv on d.mrn_no=inv.mrn_no" if id.type=='P' else f"td_po_items i LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria} LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no LEFT JOIN md_product p on i.item_id=p.sl_no LEFT JOIN md_vendor v on pb.vendor_id=v.sl_no LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id left join td_item_delivery_invoice inv on d.mrn_no=inv.mrn_no"
    where = f"EXISTS ( SELECT 1 FROM td_po_items i2 JOIN td_item_delivery_details d2 ON i2.item_id = d2.prod_id WHERE i2.item_id = i.item_id AND i2.quantity = i.quantity  AND d2.rc_qty = d.rc_qty) group by i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty, pb.pur_req, v.vendor_name,pb.po_no,pd.proj_name, pd.proj_id" if id.type == 'P' else f"EXISTS ( SELECT 1 FROM td_po_items i2 JOIN td_item_delivery_details d2 ON i2.item_id = d2.prod_id WHERE i2.item_id = i.item_id AND i2.quantity = i.quantity  AND d2.rc_qty = d.rc_qty) group by i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty, pb.pur_req, v.vendor_name,pb.po_no"
  


# Final query construction
    # query = f"SELECT {select} FROM {schema} WHERE {where}"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result



@reportRouter.post('/mrnpurreq')
async def getprojectpoc(id:mrnpur):
  
    # select = f"i.item_id, i.quantity, p.approved_ord_qty, d.rc_qty, d.mrn_no, d.invoice,pr.prod_name"
    # schema = f"td_po_items i LEFT JOIN td_purchase_items p ON i.item_id = p.item_id AND p.pur_no LIKE '%{id.pur_no}%' LEFT JOIN md_product pr on pr.sl_no=i.item_id LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no IN (SELECT po_no FROM td_po_basic WHERE pur_req LIKE '%{id.pur_no}%')"
    # where = f"i.po_sl_no IN (SELECT sl_no FROM td_po_basic WHERE pur_req LIKE '%{id.pur_no}%')"
    select = f" i.item_id, i.quantity,p.approved_ord_qty,SUM(d.rc_qty) AS rc_qty,GROUP_CONCAT(DISTINCT d.mrn_no) AS mrn_no,GROUP_CONCAT(DISTINCT d.invoice) AS invoice,DATE_FORMAT(inv.invoice_dt,'%d/%m/%Y') invoice_dt, concat(pr.prod_name,'(Make:',pr.prod_make,', Part No.:',pr.part_no,',  Article No.:',pr.article_no,', Model No.:',pr.model_no,', Description:',pr.prod_desc,')') as prod_name"
    schema = f" td_po_items i LEFT JOIN td_purchase_items p ON i.item_id = p.item_id AND p.pur_no LIKE '%{id.pur_no}%' LEFT JOIN md_product pr ON pr.sl_no = i.item_id LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no IN (SELECT po_no FROM td_po_basic     WHERE pur_req LIKE '%{id.pur_no}%') left join td_item_delivery_invoice inv on inv.mrn_no=d.mrn_no"
    where = f" i.po_sl_no IN (SELECT sl_no FROM td_po_basic WHERE pur_req LIKE '%{id.pur_no}%') GROUP BY i.item_id, i.quantity, p.approved_ord_qty, pr.prod_name"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result


@reportRouter.post('/stockoutreport')
async def getprojectpoc(id:stockoutreport):
    # res_dt = {}

    select = f"DATE_FORMAT(st.date,'%d/%m/%Y') as date,st.item_id,st.balance,st.qty,st.created_by,concat(p.prod_name,'(Part No.:',p.part_no,', Article No.:',p.article_no,', Model No.:',p.model_no,', Make:',p.prod_make,', Description:',p.prod_desc,')') as prod_name,st.in_out_flag,st.ref_no,st.proj_id,pr.proj_name,st.created_at" if id.type=='P' else f"DATE_FORMAT(st.date,'%d/%m/%Y') as date,st.balance,st.item_id,st.qty,st.created_by,concat(p.prod_name,'(Part No.:',p.part_no,', Article No.:',p.article_no,', Model No.:',p.model_no,', Make:',p.prod_make,', Description:',p.prod_desc,')') as prod_name,st.in_out_flag,st.ref_no,0 as proj_id,'Warehouse' as proj_name,st.created_at"
    schema = "td_stock_new st left join md_product p on st.item_id=p.sl_no left join td_project pr on st.proj_id=pr.sl_no" if id.type=='P' else "td_stock_new st left join md_product p on st.item_id=p.sl_no and st.proj_id=0"
   
    where = f"st.in_out_flag=-1 and ref_no like '%REQ%' and st.date>='{id.dt}'" if id.type == 'W' else f"st.in_out_flag=-1 and ref_no like '%REQ%' and st.proj_id={id.proj_id} and st.date>='{id.dt}'"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result
    

@reportRouter.post('/matvalmrn')
async def getprojectpoc(id:MatVal):
    # res_dt = {}

    select = f"b.po_no,b.sl_no,i.item_id,i.quantity,i.discount,i.currency,i.discount_percent,d.mrn_no,m.invoice,DATE_FORMAT(m.invoice_dt,'%d/%m/%Y') as invoice_dt,i.cgst_id,i.sgst_id,i.igst_id,i.item_rt,(i.item_rt-i.discount)*i.quantity as net_unit_price,d.mrn_no,d.prod_id,d.rc_qty,st.qty, (select sum(qty) from td_stock_new where proj_id={id.proj_id} and item_id=st.item_id and in_out_flag=-1 and ref_no like '%REQ%') stock_out_qty,concat(pd.prod_name,'(Part No.:',pd.part_no,', Article No.:',pd.article_no,', Model No.:',pd.model_no,', Make:',pd.prod_make,', Description:',pd.prod_desc,')') as prod_name, SUM(d.rc_qty) AS total_rc_qty, SUM(st.qty) AS total_qty"
    schema = '''td_po_basic b 
    left join td_po_items i on b.sl_no=i.po_sl_no 
    left join md_product pd on pd.sl_no=i.item_id
    join td_item_delivery_details d on d.po_no=b.po_no and d.prod_id=i.item_id 
    join td_stock_new st on st.item_id=d.prod_id and st.ref_no=d.mrn_no 
    join td_item_delivery_invoice m on m.mrn_no=d.mrn_no
    '''
   
    where = f"b.project_id={id.proj_id} and b.po_no is not null GROUP BY i.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result
