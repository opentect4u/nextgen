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
    from_dt:str
    to_dt:str

class mrnpur(BaseModel):
    pur_no:str
    
class stockoutreport(BaseModel):
    type:str
    proj_id:int
    dt:str

class MatVal(BaseModel):
    proj_id:int

class dashboardReport(BaseModel):
    flag:int
    


@reportRouter.post('/allstock1')
async def getprojectpoc(id:Allstock):
    res_dt = {}

    select = f"@a:=@a+1 serial_number,concat(p.prod_name,' (Part No.: ',p.part_no,' Article No.: ',p.article_no,' Model No.: ',p.model_no,' Desc: ',p.prod_desc,') ') prod_name,SUM(st.qty*st.in_out_flag) stock,st.item_id,"
    schema = "td_stock_new st, md_product p,(SELECT @a:= 0) AS a"
    where = f"st.proj_id ={id.project_id} and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result

@reportRouter.post('/allstock')
async def getprojectpoc(id:Allstock):
    res_dt = {}

    select = f"@a:=@a+1 as '#',concat(p.prod_name,' (Part No.: ',p.part_no,' Article No.: ',p.article_no,' Model No.: ',p.model_no,' Desc: ',p.prod_desc,') ') as 'Product',SUM(st.qty*st.in_out_flag) as 'Quantity'"
    schema = "td_stock_new st, md_product p,(SELECT @a:= 0) AS a"
    where = f"st.proj_id ={id.project_id} and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result



@reportRouter.post('/itemwise1')
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
    for i in result['msg']:
        i['warehouse_stock'] = result1['msg'][0]['warehouse_stock'] if len(result1['msg']) else 0

    if len(result['msg']):
       return result
    else:
       return result1
    

@reportRouter.post('/itemwise')
async def getprojectpoc(id:Itemwise):
  
    select = f"@a:=@a+1 '#',concat(p.prod_name,' (Part No.: ',p.part_no,' Article No.: ',p.article_no,' Model No.: ',p.model_no,' Desc: ',p.prod_desc,') ') 'Product',CONCAT(pr.proj_name,'(ID: ',pr.proj_id,')') as 'Project',SUM(st.qty*st.in_out_flag)  'Project Quantity' "
    schema = "td_stock_new st, md_product p,td_project pr,(SELECT @a:= 0) AS a"
    where = f"st.item_id ={id.item_id} and pr.sl_no=st.proj_id and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)

    select1 = f"p.prod_name as 'Product',SUM(qty*in_out_flag) as 'Warehouse Quantity'"
    schema1 = "td_stock_new st, md_product p"
    where1 = f"st.item_id ={id.item_id} and st.proj_id = 0 and st.item_id=p.sl_no and '{id.dt}'>=st.date group by st.proj_id"
    order1 = ""
    flag1 = 1 
    result1 = await db_select(select1, schema1, where1, order1, flag1)
    print(result1)
    for i in result['msg']:
        i['Warehouse Quantity'] = result1['msg'][0]['Warehouse Quantity'] if len(result1['msg']) else 0

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

        # select_trans = f"i.approved_qty, i.approved_qty as copy_qty,r.trans_no as req_no,i.item_id,r.to_proj_id as proj_id,(select sum(qty) from td_stock_new st where st.item_id={i['item_id']} and st.proj_id={id.proj_id} and st.ref_no=r.trans_no and in_out_flag=-1) del_qty"
        # schema_trans = "td_transfer_items i,td_transfer r"
        # where_trans = f"i.item_id={i['item_id']} and r.to_proj_id={id.proj_id} and (i.approve_flag='A' || i.approve_flag='H') and i.trans_no=r.trans_no"
        # order_trans = ""
        # flag_trans = 1 
        # result_trans = await db_select(select_trans, schema_trans, where_trans, order_trans, flag_trans)
        # print(result_req)

        select2 = f"sum(i.approved_qty) as qty,r.req_no as req_no"
        schema2 = "td_requisition_items i,td_requisition r"
        where2 = f"i.item_id={i['item_id']} and r.project_id={id.proj_id} and (i.approve_flag='A' || i.approve_flag='H') and i.req_no=r.req_no"
        order2 = ""
        flag2= 0 
        result2 = await db_select(select2, schema2, where2, order2, flag2)
        print(result2)
        stock.append({"id":i['item_id'],"name":i['item_name'],"stock":result['msg']['balance'],"req_stock":result2['msg']['qty'],"req_list":result_req['msg']})
        stock.reverse()
    return {'suc':1,'msg':stock}




@reportRouter.post('/get_stock_out_data1')
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

        # select_trans = f"i.approved_qty, i.approved_qty as copy_qty,r.trans_no as req_no,i.item_id,r.to_proj_id as proj_id,(select sum(qty) from td_stock_new st where st.item_id={i['item_id']} and st.proj_id={id.proj_id} and st.ref_no=r.trans_no and in_out_flag=-1) del_qty"
        # schema_trans = "td_transfer_items i,td_transfer r"
        # where_trans = f"i.item_id={i['item_id']} and r.to_proj_id={id.proj_id} and (i.approve_flag='A' || i.approve_flag='H') and i.trans_no=r.trans_no"
        # order_trans = ""
        # flag_trans = 1 
        # result_trans = await db_select(select_trans, schema_trans, where_trans, order_trans, flag_trans)
        # print(result_req)

        select2 = f"sum(i.approved_qty) as qty,r.req_no as req_no"
        schema2 = "td_requisition_items i,td_requisition r"
        where2 = f"i.item_id={i['item_id']} and r.project_id={id.proj_id} and (i.approve_flag='A' || i.approve_flag='H') and i.req_no=r.req_no"
        order2 = ""
        flag2= 0 
        result2 = await db_select(select2, schema2, where2, order2, flag2)
        print(result2)
        stock.append({"id":i['item_id'],"name":i['item_name'],"stock":result['msg']['balance'],"req_stock":result2['msg']['qty'],"req_list":result_req['msg']})
        stock.reverse()
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


@reportRouter.post('/mrnprojreport1')
async def getprojectpoc(id:mrnprojreport):
    if id.po_no=='0':
            if id.type == 'P':
                if id.vendor_id and id.proj_id:
                    criteria = f"pb.vendor_id = {id.vendor_id} and pb.project_id={id.proj_id}"
                elif id.vendor_id:
                    criteria = f"pb.vendor_id = {id.vendor_id} and project_id!=0"
                elif id.proj_id:    
                    criteria = f"pb.project_id={id.proj_id}"
                else:
                    criteria = f"pb.project_id!=0"
            else:
                if id.vendor_id:
                    criteria = f"pb.vendor_id = {id.vendor_id} and pb.project_id=0"
                else:
                    criteria = f"pb.project_id=0"
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
  
    select = f"DISTINCT i.item_id,pb.fresh_flag, GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt,'%d/%m/%Y')) as invoice_dt, concat(p.prod_name,'(Make:',p.prod_make,', Part No.:',p.part_no,',  Article No.:',p.article_no,', Model No.:',p.model_no,', Description:',p.prod_desc,')') as prod_name, pb.po_no, i.quantity, SUM(distinct d.rc_qty) AS rc_qty, GROUP_CONCAT(DISTINCT d.mrn_no) AS mrn_no,GROUP_CONCAT(DISTINCT d.invoice) AS invoice,pi.approved_ord_qty, pb.pur_req, v.vendor_name,CONCAT(pd.proj_name, ' (ID:', pd.proj_id, ')') AS proj_name" if id.type=='P' else f"DISTINCT i.item_id,pb.fresh_flag,GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt,'%d/%m/%Y')) invoice_dt,concat(p.prod_name,'(Make:',p.prod_make,', Part No.:',p.part_no,',  Article No.:',p.article_no,', Model No.:',p.model_no,', Description:',p.prod_desc,')') as prod_name, SUM(d.rc_qty) AS rc_qty, GROUP_CONCAT(DISTINCT d.mrn_no) AS mrn_no,GROUP_CONCAT(DISTINCT d.invoice) AS invoice,i.quantity,pi.approved_ord_qty,pb.pur_req,'Warehouse' as proj_name,v.vendor_name"
    
    schema = f"td_po_items i LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria} LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no LEFT JOIN md_product p on i.item_id=p.sl_no LEFT JOIN td_project pd on pb.project_id=pd.sl_no LEFT JOIN md_vendor v on pb.vendor_id=v.sl_no LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id left join td_item_delivery_invoice inv on d.mrn_no=inv.mrn_no group by i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty, pb.pur_req, v.vendor_name,pb.po_no" if id.type=='P' else f"td_po_items i LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria} LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no LEFT JOIN md_product p on i.item_id=p.sl_no LEFT JOIN md_vendor v on pb.vendor_id=v.sl_no LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id left join td_item_delivery_invoice inv on d.mrn_no=inv.mrn_no group by i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty, pb.pur_req, v.vendor_name,pb.po_no"
    where = f""
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result



@reportRouter.post('/mrnprojreport1')
async def get_project_po(id: mrnprojreport):
    
    if id.po_no == '0':
        if id.type == 'P':  # Project PO
            if id.vendor_id and id.proj_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = {id.proj_id}"
            elif id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id != 0"
            elif id.proj_id:
                criteria = f"pb.project_id = {id.proj_id}"
            else:
                criteria = "pb.project_id != 0"
        else:  # Warehouse PO
            if id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = 0"
            else:
                criteria = "pb.project_id = 0"
    else:
        # po_no is specific (not '0')
        if id.type == 'P':
            if id.vendor_id and id.proj_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = {id.proj_id} AND pb.po_no = '{id.po_no}'"
            elif id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id != 0 AND pb.po_no = '{id.po_no}'"
            elif id.proj_id:
                criteria = f"pb.project_id = {id.proj_id} AND pb.po_no = '{id.po_no}'"
            else:
                criteria = f"pb.po_no = '{id.po_no}'"
        else:
            if id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = 0 AND pb.po_no = '{id.po_no}'"
            else:
                criteria = f"pb.po_no = '{id.po_no}' AND pb.project_id = 0"

    print(f"Criteria: {criteria}")

   
    if id.type == 'P':  # Project type
        select = """
            DISTINCT i.item_id, pb.fresh_flag,
            GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS invoice_dt,
            CONCAT(p.prod_name, '(Make:', p.prod_make, ', Part No.:', p.part_no,
                ',  Article No.:', p.article_no, ', Model No.:', p.model_no,
                ', Description:', p.prod_desc, ')') AS prod_name,
            pb.po_no, i.quantity,
            COALESCE(SUM(DISTINCT d.rc_qty),0) AS rc_qty,
            GROUP_CONCAT(DISTINCT d.mrn_no) AS mrn_no,
            GROUP_CONCAT(DISTINCT d.invoice SEPARATOR ',\n') AS invoice,
            pi.approved_ord_qty,
            pi.approved_ord_qty - COALESCE(SUM(DISTINCT d.rc_qty),0) as pending_qty,
            pb.pur_req,
            v.vendor_name,
            CONCAT(pd.proj_name, ' (ID:', pd.proj_id, ')') AS proj_name
            
        """
        group_by = """
            GROUP BY i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty,
            pb.pur_req, v.vendor_name, pb.po_no
        """
        join_schema = f"""
            td_po_items i
            LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria}
            LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no
            LEFT JOIN md_product p ON i.item_id = p.sl_no
            LEFT JOIN td_project pd ON pb.project_id = pd.sl_no
            LEFT JOIN md_vendor v ON pb.vendor_id = v.sl_no
            LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id
            LEFT JOIN td_item_delivery_invoice inv ON d.mrn_no = inv.mrn_no
        """
    else:  # Warehouse type
        select = f"""
            DISTINCT i.item_id, pb.fresh_flag,
            GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt, '%d/%m/%Y') SEPARATOR '\n') AS invoice_dt,
            CONCAT(p.prod_name, '(Make:', p.prod_make, ', Part No.:', p.part_no,
                ',  Article No.:', p.article_no, ', Model No.:', p.model_no,
                ', Description:', p.prod_desc, ')') AS prod_name,
            SUM(d.rc_qty) AS rc_qty,
            GROUP_CONCAT(DISTINCT d.mrn_no) AS mrn_no,
            GROUP_CONCAT(DISTINCT d.invoice SEPARATOR '\n') AS invoice,
            i.quantity,
            pi.approved_ord_qty,
            pi.approved_ord_qty - COALESCE(SUM(DISTINCT d.rc_qty),0) as pending_qty,
            pb.pur_req,
            pb.po_no,
            'Warehouse' AS proj_name,
            v.vendor_name
        """
        group_by = """
            GROUP BY i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty,
            pb.pur_req, v.vendor_name, pb.po_no
        """
        join_schema = f"""
            td_po_items i
            LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria}
            LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no
            LEFT JOIN md_product p ON i.item_id = p.sl_no
            LEFT JOIN md_vendor v ON pb.vendor_id = v.sl_no
            LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id
            LEFT JOIN td_item_delivery_invoice inv ON d.mrn_no = inv.mrn_no
            where inv.invoice_dt between '{id.from_dt}' and '{id.to_dt}'

        """

   
    # result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    print('query===========',join_schema + group_by)
    result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    return result


@reportRouter.post('/mrnprojreport')
async def get_project_po(id: mrnprojreport):
    
    if id.po_no == '0':
        if id.type == 'P':  # Project PO
            if id.vendor_id and id.proj_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = {id.proj_id}"
            elif id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id != 0"
            elif id.proj_id:
                criteria = f"pb.project_id = {id.proj_id}"
            else:
                criteria = "pb.project_id != 0"
        else:  # Warehouse PO
            if id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = 0"
            else:
                criteria = "pb.project_id = 0"
    else:
        # po_no is specific (not '0')
        if id.type == 'P':
            if id.vendor_id and id.proj_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = {id.proj_id} AND pb.po_no = '{id.po_no}'"
            elif id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id != 0 AND pb.po_no = '{id.po_no}'"
            elif id.proj_id:
                criteria = f"pb.project_id = {id.proj_id} AND pb.po_no = '{id.po_no}'"
            else:
                criteria = f"pb.po_no = '{id.po_no}'"
        else:
            if id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = 0 AND pb.po_no = '{id.po_no}'"
            else:
                criteria = f"pb.po_no = '{id.po_no}' AND pb.project_id = 0"

    print(f"Criteria: {criteria}")

    
    if id.type == 'P':  # Project type
        # select = """
        #     DISTINCT i.item_id,
        #     CONCAT(p.prod_name, '(Make:', p.prod_make, ', Part No.:', p.part_no,
        #         ',  Article No.:', p.article_no, ', Model No.:', p.model_no,
        #         ', Description:', p.prod_desc, ')') AS 'Product',
        #     pb.po_no as 'PO No.',
        #     GROUP_CONCAT(DISTINCT d.invoice SEPARATOR ',\n') AS 'Invoice',
        #     GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice Date',
        #     pi.approved_ord_qty as 'Ordered Quantity',
        #     (select SUM(rc_qty) AS 'Received Quantity' from td_item_delivery_details dd join td_item_delivery_invoice ii where dd.mrn_no=ii.mrn_no and ii.po_no = 'NGAPL/6789/00001/25-26' group by dd.prod_id) AS 'Received Quantity',
        #     pi.approved_ord_qty - (select SUM(rc_qty) from td_item_delivery_details dd join td_item_delivery_invoice ii where dd.mrn_no=ii.mrn_no) as 'Pending Quantity',
        #     pb.pur_req as 'Purchase Requisition',
        #     v.vendor_name as 'Vendor',
        #     CONCAT(pd.proj_name, ' (ID:', pd.proj_id, ')') AS 'Project'

        # """
        select = """

            pur.pur_no as 'Purchase Requisition',pb.po_no as 'PO No.', pr.proj_name as 'Project',v.vendor_name as 'Vendor',
            GROUP_CONCAT(d.invoice SEPARATOR ',\n') AS 'Invoice',
    		GROUP_CONCAT(DATE_FORMAT(d.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice Date',
            CONCAT(p.prod_name, '(Make:', p.prod_make, ', Part No.:',p.part_no,
            ',  Article No.:', p.article_no, ', Model No.:', p.model_no,
            ', Description:', p.prod_desc, ')') AS 'Product',pi.approved_ord_qty as 'Ordered Quantity',
            COALESCE(SUM(dd.rc_qty), 0)  AS 'Received Quantity',
            (pi.approved_ord_qty - COALESCE(SUM(dd.rc_qty), 0)) AS 'Pending Quantity'

"""
        group_by = """
            GROUP BY pb.po_no, 
            p.prod_name, p.prod_make, p.part_no, p.article_no, p.model_no, p.prod_desc,
            pi.approved_ord_qty,
            pr.proj_name,
            pur.pur_no
        """
        join_schema = f"""
            td_po_basic pb
            JOIN td_po_items i ON i.po_sl_no = pb.sl_no
            JOIN md_product p ON i.item_id = p.sl_no 
            JOIN td_purchase_req pur on pur.pur_proj = pb.project_id 
            JOIN td_project pr on pur.pur_proj = pr.sl_no
            JOIN md_vendor v ON pb.vendor_id = v.sl_no
            JOIN td_purchase_items pi on pi.pur_no = pb.pur_req AND pi.item_id = i.item_id
            LEFT JOIN td_item_delivery_invoice d on d.po_no = pb.po_no
            LEFT JOIN td_item_delivery_details dd on dd.mrn_no = d.mrn_no and pi.item_id = dd.prod_id
            where d.invoice_dt between '{id.from_dt}' and '{id.to_dt}'  AND {criteria}

        """
    else:  # Warehouse type
        # select = f"""
        #     DISTINCT i.item_id,
        #     CONCAT(p.prod_name, '(Make:', p.prod_make, ', Part No.:', p.part_no,
        #         ',  Article No.:', p.article_no, ', Model No.:', p.model_no,
        #         ', Description:', p.prod_desc, ')') AS 'Product',
        #     GROUP_CONCAT(DISTINCT d.invoice SEPARATOR ',\n') AS 'Invoice',
        #     GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice Date',
        #     pi.approved_ord_qty as 'Ordered Quantity',
        #      (select SUM(rc_qty) AS 'Received Quantity' from td_item_delivery_details dd join td_item_delivery_invoice ii where dd.mrn_no=ii.mrn_no and ii.po_no = 'NGAPL/6789/00001/25-26' group by dd.prod_id) AS 'Received Quantity',
        #     pi.approved_ord_qty - (select SUM(rc_qty) from td_item_delivery_details dd join td_item_delivery_invoice ii where dd.mrn_no=ii.mrn_no) as 'Pending Quantity',
        #     pb.pur_req as 'Purchase Requisition',
        #     pb.po_no as 'PO No.',
        #     'Warehouse' AS 'Project',
        #     v.vendor_name as 'Vendor'
        # """
        select = """
            pur.pur_no as 'Purchase Requisition',pb.po_no as 'PO No.', 'Warehouse' as 'Project',v.vendor_name as 'Vendor',
            GROUP_CONCAT(d.invoice SEPARATOR ',\n') AS 'Invoice',
    		GROUP_CONCAT(DATE_FORMAT(d.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice Date',
            CONCAT(p.prod_name, '(Make:', p.prod_make, ', Part No.:',p.part_no,
            ',  Article No.:', p.article_no, ', Model No.:', p.model_no,
            ', Description:', p.prod_desc, ')') AS 'Product',pi.approved_ord_qty as 'Ordered Quantity',
            COALESCE(SUM(dd.rc_qty), 0)  AS 'Received Quantity',
            (pi.approved_ord_qty - COALESCE(SUM(dd.rc_qty), 0)) AS 'Pending Quantity'
"""
        group_by = """
            GROUP BY pb.po_no, 
            p.prod_name, p.prod_make, p.part_no, p.article_no, p.model_no, p.prod_desc,
            pi.approved_ord_qty,
            pur.pur_no
        """
        join_schema = f"""
            td_po_basic pb
            JOIN td_po_items i ON i.po_sl_no = pb.sl_no
            JOIN md_product p ON i.item_id = p.sl_no 
            JOIN td_purchase_req pur on pur.pur_proj = pb.project_id 
            JOIN md_vendor v ON pb.vendor_id = v.sl_no
            JOIN td_purchase_items pi on pi.pur_no = pb.pur_req AND pi.item_id = i.item_id
            LEFT JOIN td_item_delivery_invoice d on d.po_no = pb.po_no
            LEFT JOIN td_item_delivery_details dd on dd.mrn_no = d.mrn_no and pi.item_id = dd.prod_id
            where d.invoice_dt between '{id.from_dt}' and '{id.to_dt}' AND {criteria}

        """

    
    # result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    print('query===========',join_schema + group_by)
    result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    return result


@reportRouter.post('/mrnprojreport2')
async def get_project_po(id: mrnprojreport):
    
    if id.po_no == '0':
        if id.type == 'P':  # Project PO
            if id.vendor_id and id.proj_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = {id.proj_id}"
            elif id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id != 0"
            elif id.proj_id:
                criteria = f"pb.project_id = {id.proj_id}"
            else:
                criteria = "pb.project_id != 0"
        else:  # Warehouse PO
            if id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = 0"
            else:
                criteria = "pb.project_id = 0"
    else:
        # po_no is specific (not '0')
        if id.type == 'P':
            if id.vendor_id and id.proj_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = {id.proj_id} AND pb.po_no = '{id.po_no}'"
            elif id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id != 0 AND pb.po_no = '{id.po_no}'"
            elif id.proj_id:
                criteria = f"pb.project_id = {id.proj_id} AND pb.po_no = '{id.po_no}'"
            else:
                criteria = f"pb.po_no = '{id.po_no}'"
        else:
            if id.vendor_id:
                criteria = f"pb.vendor_id = {id.vendor_id} AND pb.project_id = 0 AND pb.po_no = '{id.po_no}'"
            else:
                criteria = f"pb.po_no = '{id.po_no}' AND pb.project_id = 0"

    print(f"Criteria: {criteria}")

    
    if id.type == 'P':  # Project type
        select = """
            DISTINCT i.item_id,
            CONCAT(p.prod_name, '(Make:', p.prod_make, ', Part No.:', p.part_no,
                ',  Article No.:', p.article_no, ', Model No.:', p.model_no,
                ', Description:', p.prod_desc, ')') AS 'Product',
            pb.po_no as 'PO No.',
            GROUP_CONCAT(DISTINCT d.invoice SEPARATOR ',\n') AS 'Invoice',
            GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice Date',
            pi.approved_ord_qty as 'Ordered Quantity',
            SUM(d.rc_qty) AS 'Received Quantity',
            pi.approved_ord_qty - SUM(d.rc_qty) as 'Pending Quantity',
            pb.pur_req as 'Purchase Requisition',
            v.vendor_name as 'Vendor',
            CONCAT(pd.proj_name, ' (ID:', pd.proj_id, ')') AS 'Project'

        """
        group_by = """
            GROUP BY i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty,
            pb.pur_req, v.vendor_name, pb.po_no
        """
        join_schema = f"""
            td_po_items i
            LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria}
            LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no
            LEFT JOIN md_product p ON i.item_id = p.sl_no
            LEFT JOIN td_project pd ON pb.project_id = pd.sl_no
            LEFT JOIN md_vendor v ON pb.vendor_id = v.sl_no
            LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id
            LEFT JOIN td_item_delivery_invoice inv ON d.mrn_no = inv.mrn_no
            where inv.invoice_dt between '{id.from_dt}' and '{id.to_dt}'

        """
    else:  # Warehouse type
        select = f"""
            DISTINCT i.item_id,
            CONCAT(p.prod_name, '(Make:', p.prod_make, ', Part No.:', p.part_no,
                ',  Article No.:', p.article_no, ', Model No.:', p.model_no,
                ', Description:', p.prod_desc, ')') AS 'Product',
            GROUP_CONCAT(DISTINCT d.invoice SEPARATOR ',\n') AS 'Invoice',
            GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice Date',
            pi.approved_ord_qty as 'Ordered Quantity',
            SUM(d.rc_qty) AS 'Received Quantity',
            pi.approved_ord_qty - SUM(d.rc_qty) as 'Pending Quantity',
            pb.pur_req as 'Purchase Requisition',
            pb.po_no as 'PO No.',
            'Warehouse' AS 'Project',
            v.vendor_name as 'Vendor'
        """
        group_by = """
            GROUP BY i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty,
            pb.pur_req, v.vendor_name, pb.po_no
        """
        join_schema = f"""
            td_po_items i
            LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria}
            LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no
            LEFT JOIN md_product p ON i.item_id = p.sl_no
            LEFT JOIN md_vendor v ON pb.vendor_id = v.sl_no
            LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id
            LEFT JOIN td_item_delivery_invoice inv ON d.mrn_no = inv.mrn_no
            where inv.invoice_dt between '{id.from_dt}' and '{id.to_dt}'

        """

    
    # result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    print('query===========',join_schema + group_by)
    result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    return result




@reportRouter.post('/mrnpurreq')
async def getprojectpoc(id:mrnpur):
  
    select = f"@a:=@a+1 '#', concat(pr.prod_name,'(Make:',pr.prod_make,', Part No.:',pr.part_no,',  Article No.:',pr.article_no,', Model No.:',pr.model_no,', Description:',pr.prod_desc,')') as 'Product',GROUP_CONCAT(DISTINCT d.mrn_no SEPARATOR '\n') AS 'MRN No.',GROUP_CONCAT(DISTINCT d.invoice SEPARATOR '\n') AS 'Invoice',GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt,'%d/%m/%Y') SEPARATOR '\n') 'Invoice Date', i.quantity as 'Ordered Quantity',COALESCE(SUM(rc_qty),'Not Received') AS 'Received Quantity'"
    schema = f" td_purchase_items p LEFT JOIN td_po_items i ON i.item_id = p.item_id AND p.pur_no LIKE '%{id.pur_no}%' LEFT JOIN md_product pr ON pr.sl_no = i.item_id LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no IN (SELECT po_no FROM td_po_basic     WHERE pur_req LIKE '%{id.pur_no}%') left join td_item_delivery_invoice inv on inv.mrn_no=d.mrn_no,(SELECT @a:= 0) AS a"
    where = f" i.po_sl_no IN (SELECT sl_no FROM td_po_basic WHERE pur_req LIKE '%{id.pur_no}%') GROUP BY i.item_id, i.quantity,p.approved_ord_qty, pr.prod_name"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result


    # select = f"@a:=@a+1 AS serial_number,t1.item_id,t1.total_po_quantity AS quantity,p.approved_ord_qty,COALESCE(SUM(d.rc_qty),'Not Received') AS rc_qty, GROUP_CONCAT(DISTINCT d.mrn_no) AS mrn_no,GROUP_CONCAT(DISTINCT d.invoice) AS invoice, GROUP_CONCAT(DATE_FORMAT(inv.invoice_dt,'%d/%m/%Y')) AS invoice_dt,CONCAT(pr.prod_name,'(Make:',pr.prod_make,', Part No.:',pr.part_no,', Article No.:',pr.article_no,', Model No.:',pr.model_no,', Description:',pr.prod_desc,')') AS prod_name"
    # schema = f"(SELECT i.item_id,SUM(i.quantity) AS total_po_quantity,i.po_sl_no FROM td_po_items i "
    # where = f"i.po_sl_no IN (SELECT sl_no FROM td_po_basic WHERE pur_req LIKE '%{id.pur_no}%')  GROUP BY i.item_id) AS t1 LEFT JOIN td_purchase_items p ON t1.item_id = p.item_id AND p.pur_no LIKE '%{id.pur_no}%' LEFT JOIN md_product pr ON pr.sl_no = t1.item_id LEFT JOIN td_item_delivery_details d ON t1.item_id = d.prod_id AND d.po_no IN (SELECT po_no FROM td_po_basic WHERE pur_req LIKE '%PR-1747891204%') LEFT JOIN  td_item_delivery_invoice inv ON inv.mrn_no = d.mrn_no, (SELECT @a:= 0) AS a"
    # order = ""
    # flag = 1 
    # result = await db_select(select, schema, where, order, flag)
    # return result


@reportRouter.post('/stockoutreport1')
async def getprojectpoc(id:stockoutreport):
    # res_dt = {}

    select = f"@a:=@a+1 serial_number,DATE_FORMAT(st.date,'%d/%m/%Y') as date,st.item_id,st.balance,st.qty,st.created_by,concat(p.prod_name,'(Part No.:',p.part_no,', Article No.:',p.article_no,', Model No.:',p.model_no,', Make:',p.prod_make,', Description:',p.prod_desc,')') as prod_name,st.in_out_flag,st.ref_no,st.proj_id,pr.proj_name,st.created_at" if id.type=='P' else f"@a:=@a+1 serial_number,DATE_FORMAT(st.date,'%d/%m/%Y') as date,st.balance,st.item_id,st.qty,st.created_by,concat(p.prod_name,'(Part No.:',p.part_no,', Article No.:',p.article_no,', Model No.:',p.model_no,', Make:',p.prod_make,', Description:',p.prod_desc,')') as prod_name,st.in_out_flag,st.ref_no,0 as proj_id,'Warehouse' as proj_name,st.created_at"
    schema = "td_stock_new st left join md_product p on st.item_id=p.sl_no left join td_project pr on st.proj_id=pr.sl_no,(SELECT @a:= 0) AS a" if id.type=='P' else "td_stock_new st left join md_product p on st.item_id=p.sl_no,(SELECT @a:= 0) AS a"
   
    where = f"st.in_out_flag=-1 and st.proj_id=0 and ref_no like '%REQ%' and st.date>='{id.dt}'" if id.type == 'W' else f"st.in_out_flag=-1 and ref_no like '%REQ%' and st.proj_id={id.proj_id} and st.date>='{id.dt}'"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result

@reportRouter.post('/stockoutreport')
async def getprojectpoc(id:stockoutreport):
    # res_dt = {}

    select = f"@a:=@a+1 '#',DATE_FORMAT(st.date,'%d/%m/%Y') as 'Date',concat(p.prod_name,'(Part No.:',p.part_no,', Article No.:',p.article_no,', Model No.:',p.model_no,', Make:',p.prod_make,', Description:',p.prod_desc,')') as 'Product',pr.proj_name as 'Stocked Out From',st.qty as 'Quantity',st.created_by as 'Stocked Out By'" if id.type=='P' else f"@a:=@a+1 as '#',DATE_FORMAT(st.date,'%d/%m/%Y') as 'Date',concat(p.prod_name,'(Part No.:',p.part_no,', Article No.:',p.article_no,', Model No.:',p.model_no,', Make:',p.prod_make,', Description:',p.prod_desc,')') as 'Product','Warehouse' as 'Stocked Out From',st.qty as 'Quantity',st.created_by as 'Stocked Out By'"
    schema = "td_stock_new st left join md_product p on st.item_id=p.sl_no left join td_project pr on st.proj_id=pr.sl_no,(SELECT @a:= 0) AS a" if id.type=='P' else "td_stock_new st left join md_product p on st.item_id=p.sl_no,(SELECT @a:= 0) AS a"
   
    where = f"st.in_out_flag=-1 and st.proj_id=0 and ref_no like '%REQ%' and st.date>='{id.dt}'" if id.type == 'W' else f"st.in_out_flag=-1 and ref_no like '%REQ%' and st.proj_id={id.proj_id} and st.date>='{id.dt}'"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result
    

@reportRouter.post('/matvalmrn1')
async def getprojectpoc(id:MatVal):
    # res_dt = {}

    select = f"@a:=@a+1 serial_number,b.po_no,b.sl_no,i.item_id,i.quantity,i.discount,i.currency,i.discount_percent,GROUP_CONCAT(d.mrn_no) as mrn_no,GROUP_CONCAT(m.invoice) as invoice,GROUP_CONCAT(DATE_FORMAT(m.invoice_dt,'%d/%m/%Y')) as invoice_dt,i.cgst_id,i.sgst_id,i.igst_id,i.item_rt,(i.item_rt-i.discount)*sum(d.rc_qty) as net_unit_price, if(i.igst_id>0,(i.item_rt-i.discount)*sum(d.rc_qty)*i.igst_id/100, ((i.item_rt - i.discount) * sum(d.rc_qty) * i.cgst_id / 100) + ((i.item_rt - i.discount) * sum(d.rc_qty) * i.sgst_id / 100)) as total_gst, IF(i.igst_id > 0,( i.item_rt - i.discount ) * sum(d.rc_qty) * i.igst_id / 100+((i.item_rt-i.discount)*sum(d.rc_qty)), ( ((i.item_rt - i.discount ) *sum(d.rc_qty) * i.cgst_id / 100)+((i.item_rt-i.discount)*sum(d.rc_qty)) ) + (( (i.item_rt - i.discount ) * sum(d.rc_qty) * i.sgst_id / 100 ))) AS total,d.mrn_no,d.prod_id,d.rc_qty,sum(st.qty) as qty, (select sum(qty) as qty from td_stock_new where proj_id={id.proj_id} and item_id=st.item_id and in_out_flag=-1 and ref_no like '%REQ%' group by st.item_id) stock_out_qty,concat(pd.prod_name,'(Part No.:',pd.part_no,', Article No.:',pd.article_no,', Model No.:',pd.model_no,', Make:',pd.prod_make,', Description:',pd.prod_desc,')') as prod_name, SUM(d.rc_qty) AS total_rc_qty, SUM(st.qty) AS total_qty"
    schema = '''td_po_basic b 
    left join td_po_items i on b.sl_no=i.po_sl_no 
    left join md_product pd on pd.sl_no=i.item_id
    join td_item_delivery_details d on d.po_no=b.po_no and d.prod_id=i.item_id 
    join td_stock_new st on st.item_id=d.prod_id and st.ref_no=d.mrn_no 
    join td_item_delivery_invoice m on m.mrn_no=d.mrn_no,(SELECT @a:= 0) AS a
    '''
   
    where = f"b.project_id={id.proj_id} and b.po_no is not null GROUP BY i.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result


@reportRouter.post('/matvalmrn')
async def getprojectpoc(id:MatVal):
    # res_dt = {}

    select = f"@a:=@a+1 '#',concat(pd.prod_name,'(Part No.:',pd.part_no,', Article No.:',pd.article_no,', Model No.:',pd.model_no,', Make:',pd.prod_make,', Description:',pd.prod_desc,')') as 'Product',GROUP_CONCAT(m.invoice  SEPARATOR '\n') as 'Invoice',GROUP_CONCAT(DATE_FORMAT(m.invoice_dt,'%d/%m/%Y')  SEPARATOR '\n') as 'Invoice Date',i.cgst_id as 'CGST',i.sgst_id as 'SGST',i.igst_id 'IGST',(i.item_rt-i.discount)*sum(d.rc_qty) as 'Net Unit Price', IF(i.igst_id > 0,( i.item_rt - i.discount ) * sum(d.rc_qty) * i.igst_id / 100+((i.item_rt-i.discount)*sum(d.rc_qty)), ( ((i.item_rt - i.discount ) *sum(d.rc_qty) * i.cgst_id / 100)+((i.item_rt-i.discount)*sum(d.rc_qty)) ) + (( (i.item_rt - i.discount ) * sum(d.rc_qty) * i.sgst_id / 100 ))) AS Total,sum(st.qty) as 'Quantity', SUM(d.rc_qty) AS 'Received Quantity', SUM(st.qty) AS 'Stock In Quantity'"
    schema = '''td_po_basic b 
    left join td_po_items i on b.sl_no=i.po_sl_no 
    left join md_product pd on pd.sl_no=i.item_id
    join td_item_delivery_details d on d.po_no=b.po_no and d.prod_id=i.item_id 
    join td_stock_new st on st.item_id=d.prod_id and st.ref_no=d.mrn_no 
    join td_item_delivery_invoice m on m.mrn_no=d.mrn_no,(SELECT @a:= 0) AS a
    '''
   
    where = f"b.project_id={id.proj_id} and b.po_no is not null GROUP BY i.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result






@reportRouter.post('/matvalstockout1')
async def getprojectpoc(id:MatVal):
    # res_dt = {}

    select = f"@a:=@a+1 serial_number,b.po_no,b.sl_no,i.item_id,i.quantity,i.discount,i.currency,i.discount_percent,i.cgst_id,i.sgst_id,i.igst_id,i.item_rt,(i.item_rt-i.discount)*sum(st.qty) as net_unit_price, if(i.igst_id>0,(i.item_rt-i.discount)*sum(st.qty)*i.igst_id/100, ((i.item_rt - i.discount) * sum(st.qty) * i.cgst_id / 100) + ((i.item_rt - i.discount) * sum(st.qty) * i.sgst_id / 100)) as total_gst, IF(i.igst_id > 0,( i.item_rt - i.discount ) * sum(st.qty) * i.igst_id / 100+((i.item_rt-i.discount)*sum(st.qty)), ( ((i.item_rt - i.discount ) * sum(st.qty) * i.cgst_id / 100)+((i.item_rt-i.discount)*sum(st.qty)) ) + (( (i.item_rt - i.discount ) * sum(st.qty) * i.sgst_id / 100 ))) AS total,sum(st.qty) as qty, (select sum(qty) as qty from td_stock_new where proj_id={id.proj_id} and item_id=st.item_id and in_out_flag=-1 and ref_no like '%REQ%' group by st.item_id) stock_out_qty,concat(pd.prod_name,'(Part No.:',pd.part_no,', Article No.:',pd.article_no,', Model No.:',pd.model_no,', Make:',pd.prod_make,', Description:',pd.prod_desc,')') as prod_name"
    schema = f'''td_po_basic b 
    left join td_po_items i on b.sl_no=i.po_sl_no 
    left join md_product pd on pd.sl_no=i.item_id
    join td_stock_new st on st.item_id=i.item_id and st.ref_no like '%REQ%' and st.in_out_flag=-1 and st.proj_id='{id.proj_id}',
    (SELECT @a:= 0) AS a
    '''
   
    where = f"b.project_id={id.proj_id} and b.po_no is not null GROUP BY i.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result


@reportRouter.post('/matvalstockout')
async def getprojectpoc(id:MatVal):
    # res_dt = {}

    select = f"@a:=@a+1 as '#',concat(pd.prod_name,'(Part No.:',pd.part_no,', Article No.:',pd.article_no,', Model No.:',pd.model_no,', Make:',pd.prod_make,', Description:',pd.prod_desc,')') as Product,i.cgst_id as 'CGST',i.sgst_id as 'SGST',i.igst_id as 'IGST',(i.item_rt-i.discount)*sum(st.qty) as 'Net Unit Price', IF(i.igst_id > 0,( i.item_rt - i.discount ) * sum(st.qty) * i.igst_id / 100+((i.item_rt-i.discount)*sum(st.qty)), ( ((i.item_rt - i.discount ) * sum(st.qty) * i.cgst_id / 100)+((i.item_rt-i.discount)*sum(st.qty)) ) + (( (i.item_rt - i.discount ) * sum(st.qty) * i.sgst_id / 100 ))) AS Total, (select sum(qty) as qty from td_stock_new where proj_id={id.proj_id} and item_id=st.item_id and in_out_flag=-1 and ref_no like '%REQ%' group by st.item_id) 'Stocked Out Quantity'"
    schema = f'''td_po_basic b 
    left join td_po_items i on b.sl_no=i.po_sl_no 
    left join md_product pd on pd.sl_no=i.item_id
    join td_stock_new st on st.item_id=i.item_id and st.ref_no like '%REQ%' and st.in_out_flag=-1 and st.proj_id='{id.proj_id}',
    (SELECT @a:= 0) AS a
    '''
   
    where = f"b.project_id={id.proj_id} and b.po_no is not null GROUP BY i.item_id"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result


@reportRouter.post('/pr_ord_create')
async def getprojectpoc(id:mrnpur):
    select = f" @a:=@a+1 AS serial_number,pur.pur_no,pur.qty,pur.ordered_qty,pur.approved_ord_qty,(pur.qty - pur.ordered_qty) AS free_qty, pur.item_id,IF(req.pur_proj>0,CONCAT(proj.proj_name,' (ID: ',proj.proj_id,')'),'Warehouse') as proj_name,CONCAT(pd.prod_name,'(Part No.:', pd.part_no,', Article No.:', pd.article_no,', Model No.:', pd.model_no,', Make:', pd.prod_make,', Description:', pd.prod_desc, ')') AS prod_name,(select group_concat(po_no,if(po_status='P','(In Progress)',if(po_status='U','(Approval Pending)','(Approved)'))) from td_po_basic where pur_req like '%{id.pur_no}%') as po_no"
    schema = f'''td_purchase_req req left join td_purchase_items pur on req.pur_no=pur.pur_no left join md_product pd on pd.sl_no = pur.item_id left join td_project proj on req.pur_proj=proj.sl_no left join td_po_basic po on FIND_IN_SET(po.po_no, pur.pur_no) > 0 cross join (SELECT @a := 0) AS a
    '''
    where = f"pur.pur_no='{id.pur_no}'"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result




@reportRouter.post('/pending_ord_create1')
async def getprojectpoc(id:mrnpur):
    select = f" @a:=@a+1 AS serial_number,DATE_FORMAT(req.pur_date,'%d/%m/%Y') as pur_date,req.created_by,req.created_at, COALESCE(concat(pr.proj_name,'(',pr.proj_id,')'),'Warehouse') as proj_name, req.pur_no, sum(pur.qty) qty, sum(pur.ordered_qty) ordered_qty,sum(pur.approved_ord_qty) as approved_ord_qty, IF(sum(pur.approved_ord_qty)=0,'Not Ordered','Partially Ordered') as status"
    schema = f'''td_purchase_req req left join td_purchase_items pur on req.pur_no=pur.pur_no left join td_project pr on pr.sl_no=req.pur_proj cross join (SELECT @a := 0) AS a group by pur.pur_no having sum(pur.qty)>sum(pur.approved_ord_qty)
    '''
    where = f""
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result

@reportRouter.post('/pending_ord_create')
async def getprojectpoc(id:mrnpur):
    select = f" @a:=@a+1 AS '#',req.pur_no as 'PR No.',COALESCE(concat(pr.proj_name,'(',pr.proj_id,')'),'Warehouse') as 'Intended For',IF(sum(pur.approved_ord_qty)=0,'Not Ordered','Partially Ordered') as Status,DATE_FORMAT(req.pur_date,'%d/%m/%Y') as 'Requisition Date',req.created_by as 'Requisition By'"
    schema = f'''td_purchase_req req left join td_purchase_items pur on req.pur_no=pur.pur_no left join td_project pr on pr.sl_no=req.pur_proj cross join (SELECT @a := 0) AS a group by pur.pur_no having sum(pur.qty)>sum(pur.approved_ord_qty)
    '''
    where = f""
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result



@reportRouter.post('/po_dashboard_report')
async def getprojectpoc(flag:dashboardReport):
    if flag.flag==0:
        criteria="b.fresh_flag='Y'"
    elif flag.flag==1:
        criteria="b.fresh_flag='N'"
    elif flag.flag==3:
        criteria="b.amend_flag='Y'"
    else:
        criteria = "b.po_status='A' or b.po_status='U'"
    
    select = f"@a:=@a+1 '#', b.po_no 'PO No.',DATE_FORMAT(b.po_issue_date,'%d/%m/%Y') 'Date',b.created_by 'Created By',IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='P','In Progress','Partial Delivery'))) 'Status',COALESCE(CONCAT(p.proj_name,'(ID:',p.proj_id,')'),'Warehouse') 'Intended For',v.vendor_name 'Vendor',b.vend_ref 'Vendor Reference',ROUND(SUM(i.quantity * (i.item_rt - i.discount)), 2) 'Total Basic Value',ROUND(SUM(i.quantity * i.discount), 2) AS 'Total Discount', ROUND(SUM(i.quantity * (i.item_rt - i.discount) * ((COALESCE(i.cgst_id, 0) + COALESCE(i.sgst_id, 0) + COALESCE(i.igst_id, 0)) / 100)), 2) AS 'Total GST', ROUND(SUM(i.quantity * (i.item_rt - i.discount) + i.quantity * (i.item_rt - i.discount) * ((COALESCE(i.cgst_id, 0) + COALESCE(i.sgst_id, 0) + COALESCE(i.igst_id, 0))) / 100), 2) AS 'Grand Total'"
    schema = f"td_po_basic b left join td_project p ON p.sl_no=b.project_id join md_vendor v ON v.sl_no=b.vendor_id JOIN td_po_items i ON i.po_sl_no = b.sl_no cross join (SELECT @a := 0) AS a "
    where = f"{criteria} group by b.po_no"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result


@reportRouter.post('/siemens_dashboard_report')
async def getprojectpoc(flag:dashboardReport):
    select = f"@a:=@a+1 '#', b.po_no 'PO No.',DATE_FORMAT(b.created_at,'%d/%m/%Y') 'Date',b.created_by 'Created By','Approved' as 'Status',COALESCE(CONCAT(p.proj_name,'(ID:',p.proj_id,')'),'Warehouse') 'Intended For','Siemens' as 'Vendor',ROUND(SUM(i.net_price), 2) 'Total Basic Value',ROUND(SUM(i.total_price), 2)  AS 'Grand Total'"
    schema = f"td_siemens_details b left join td_project p ON p.sl_no=b.proj_id JOIN td_siemens_log i ON i.parent_id = b.sl_no cross join (SELECT @a := 0) AS a group by b.po_no"
    where = f""
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result)
    return result




@reportRouter.post('/powise_mrn_report1')
async def get_project_po(id: mrnprojreport):
    
    if id.po_no == '0':
        if id.type == 'P':  # Project PO
            if id.vendor_id and id.proj_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id = {id.proj_id}"
            elif id.vendor_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id != 0"
            elif id.proj_id:
                criteria = f"e.project_id = {id.proj_id}"
            else:
                criteria = "e.project_id != 0"
        else:  # Warehouse PO
            if id.vendor_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id = 0"
            else:
                criteria = "e.project_id = 0"
    else:
        # po_no is specific (not '0')
        if id.type == 'P':
            if id.vendor_id and id.proj_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id = {id.proj_id} AND e.po_no = '{id.po_no}'"
            elif id.vendor_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id != 0 AND e.po_no = '{id.po_no}'"
            elif id.proj_id:
                criteria = f"e.project_id = {id.proj_id} AND e.po_no = '{id.po_no}'"
            else:
                criteria = f"e.po_no = '{id.po_no}'"
        else:
            if id.vendor_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id = 0 AND e.po_no = '{id.po_no}'"
            else:
                criteria = f"e.po_no = '{id.po_no}' AND e.project_id = 0"

    # print(f"Criteria: {criteria}")

    
    if id.type == 'P':  # Project type
        select = """
           a.po_no as 'PO No.',a.pur_no as 'Purchase Requisition',a.project_id,a.proj_name as 'Project',a.vendor_id,a.vendor_name as 'Vendor',a.item_id,
           CONCAT(a.prod_name , '(Make:', a.prod_make, ', Part No.:', a.part_no,
                ',  Article No.:', a.article_no, ', Model No.:', a.model_no,
                ', Description:', a.prod_desc, ')') as 'Product',a.orderd_qty as 'Ordered Quantity',a.rcvd_qty as 'Received Quantity',a.pending_qty as 'Pending Quantity',b.Invoice as 'Invoice',b.Invoice_Date as 'Invoice Date'
          
        """
        schema = f"""

 (SELECT   a.po_no,a.pur_no,e.project_id,f.proj_name,e.vendor_id,g.vendor_name,a.item_id,
                c.prod_name,c.prod_make,c.part_no,c.article_no,c.model_no,c.prod_desc,a.approved_ord_qty "orderd_qty",
                SUM(b.rc_qty)"rcvd_qty",(a.approved_ord_qty - SUM(b.rc_qty))"pending_qty"
                FROM     
                td_purchase_items a,td_item_delivery_details b,md_product c,
                td_item_delivery_invoice d,td_po_basic e,td_project f,md_vendor g
                WHERE    a.po_no = b.po_no
                AND      a.item_id = b.prod_id
                AND      a.item_id = c.sl_no
                AND      b.invoice   = d.invoice
                AND      a.po_no   = e.po_no
         AND      e.project_id = f.sl_no
         AND      e.vendor_id = g.sl_no
         AND      d.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}' AND {criteria}
         GROUP BY a.po_no,a.pur_no,e.project_id,f.proj_name,e.vendor_id,g.vendor_name,a.item_id,c.prod_name,a.approved_ord_qty
         ORDER BY po_no,pur_no,item_id)a,

        (SELECT a.po_no,b.prod_id,GROUP_CONCAT(a.invoice SEPARATOR ',\n') AS 'Invoice',
        GROUP_CONCAT(DATE_FORMAT(a.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice_Date'
        FROM td_item_delivery_invoice a, td_item_delivery_details b
        WHERE a.sl_no=b.del_last_id AND a.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}'
        GROUP BY a.po_no,b.prod_id)b
        WHERE a.po_no  = b.po_no AND a.item_id=b.prod_id

"""
        group_by = """
            GROUP BY i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty,
            pb.pur_req, v.vendor_name, pb.po_no
        """
        join_schema = f"""
            td_po_items i
            LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria}
            LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no
            LEFT JOIN md_product p ON i.item_id = p.sl_no
            LEFT JOIN td_project pd ON pb.project_id = pd.sl_no
            LEFT JOIN md_vendor v ON pb.vendor_id = v.sl_no
            LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id
            LEFT JOIN td_item_delivery_invoice inv ON d.mrn_no = inv.mrn_no
            where inv.invoice_dt between '{id.from_dt}' and '{id.to_dt}'

        """
    else:  # Warehouse type
        select = """
           a.po_no as 'PO No.',a.pur_no as 'Purchase Requisition','Warehouse' as 'Project',a.vendor_id,a.vendor_name as 'Vendor',a.item_id,
            CONCAT(a.prod_name , '(Make:', a.prod_make, ', Part No.:', a.part_no,
                ',  Article No.:', a.article_no, ', Model No.:', a.model_no,
                ', Description:', a.prod_desc, ')') as 'Product' ,a.orderd_qty as 'Ordered Quantity',a.rcvd_qty as 'Received Quantity',a.pending_qty as 'Pending Quantity',b.Invoice as 'Invoice',b.Invoice_Date as 'Invoice Date'
          
        """
        schema = f"""

             (SELECT   a.po_no,a.pur_no,e.vendor_id,g.vendor_name,a.item_id,
                c.prod_name,c.prod_make,c.part_no,c.article_no,c.model_no,c.prod_desc,a.approved_ord_qty "orderd_qty",
                SUM(b.rc_qty)"rcvd_qty",(a.approved_ord_qty - SUM(b.rc_qty))"pending_qty"
                FROM     
                td_purchase_items a,td_item_delivery_details b,md_product c,
                td_item_delivery_invoice d,td_po_basic e,md_vendor g
                WHERE    a.po_no = b.po_no
                AND      a.item_id = b.prod_id
                AND      a.item_id = c.sl_no
                AND      b.invoice   = d.invoice
                AND      a.po_no   = e.po_no
            AND      e.vendor_id = g.sl_no
         AND      d.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}' AND {criteria}
         GROUP BY a.po_no,a.pur_no,e.project_id,e.vendor_id,g.vendor_name,a.item_id,c.prod_name,a.approved_ord_qty
         ORDER BY po_no,pur_no,item_id)a,

        (SELECT a.po_no,b.prod_id,GROUP_CONCAT(a.invoice SEPARATOR ',\n') AS 'Invoice',
        GROUP_CONCAT(DATE_FORMAT(a.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice_Date'
        FROM td_item_delivery_invoice a, td_item_delivery_details b
        WHERE a.sl_no=b.del_last_id AND a.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}'
        GROUP BY a.po_no,b.prod_id)b
        WHERE a.po_no  = b.po_no AND a.item_id=b.prod_id

"""
        group_by = """
            GROUP BY i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty,
            pb.pur_req, v.vendor_name, pb.po_no
        """
        join_schema = f"""
            td_po_items i
            LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria}
            LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no
            LEFT JOIN md_product p ON i.item_id = p.sl_no
            LEFT JOIN td_project pd ON pb.project_id = pd.sl_no
            LEFT JOIN md_vendor v ON pb.vendor_id = v.sl_no
            LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id
            LEFT JOIN td_item_delivery_invoice inv ON d.mrn_no = inv.mrn_no
            where inv.invoice_dt between '{id.from_dt}' and '{id.to_dt}'

        """
    
    # result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    # print('query===========',join_schema + group_by)
    print('query===========',join_schema + group_by)
    # result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    result = await db_select(select,schema, where="", order="", flag=1)
    return result


@reportRouter.post('/powise_mrn_report')
async def get_project_po(id: mrnprojreport):
    
    if id.po_no == '0':
        if id.type == 'P':  # Project PO
            if id.vendor_id and id.proj_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id = {id.proj_id}"
            elif id.vendor_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id != 0"
            elif id.proj_id:
                criteria = f"e.project_id = {id.proj_id}"
            else:
                criteria = "e.project_id != 0"
        else:  # Warehouse PO
            if id.vendor_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id = 0"
            else:
                criteria = "e.project_id = 0"
    else:
        # po_no is specific (not '0')
        if id.type == 'P':
            if id.vendor_id and id.proj_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id = {id.proj_id} AND e.po_no = '{id.po_no}'"
            elif id.vendor_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id != 0 AND e.po_no = '{id.po_no}'"
            elif id.proj_id:
                criteria = f"e.project_id = {id.proj_id} AND e.po_no = '{id.po_no}'"
            else:
                criteria = f"e.po_no = '{id.po_no}'"
        else:
            if id.vendor_id:
                criteria = f"e.vendor_id = {id.vendor_id} AND e.project_id = 0 AND e.po_no = '{id.po_no}'"
            else:
                criteria = f"e.po_no = '{id.po_no}' AND e.project_id = 0"

    # print(f"Criteria: {criteria}")

    
    if id.type == 'P':  # Project type
        select = """
          a.po_no 'PO No.',a.pur_no 'Purchase Requisition',a.project_id,a.proj_name 'Project',a.vendor_id,a.vendor_name 'Vendor',a.item_id,
           CONCAT(a.prod_name , '(Make:', a.prod_make, ', Part No.:', a.part_no,
                ',  Article No.:', a.article_no, ', Model No.:', a.model_no,
                ', Description:', a.prod_desc, ')') 'Product',a.orderd_qty 'Ordered Quantity',a.rcvd_qty 'Received Quantity',a.pending_qty 'Pending Quantity',b.Invoice,b.Invoice_Date as 'Invoice Date'
          
        """
        schema =f"""
            (SELECT  a.po_no,a.pur_no,e.project_id,f.proj_name,e.vendor_id,g.vendor_name,a.item_id,
            c.prod_name,a.approved_ord_qty "orderd_qty",c.prod_make,c.part_no,c.article_no,c.model_no,c.prod_desc,
            IFNULL(SUM(b.rc_qty),0) "rcvd_qty",(a.approved_ord_qty - IFNULL(SUM(b.rc_qty),0))"pending_qty"
            FROM      td_purchase_items a
            LEFT JOIN td_item_delivery_details b ON a.po_no = b.po_no AND a.item_id = b.prod_id
            JOIN      md_product c ON a.item_id = c.sl_no
            LEFT JOIN td_item_delivery_invoice d ON b.invoice = d.invoice AND d.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}'
            JOIN      td_po_basic e ON a.po_no   = e.po_no
            JOIN 	  td_project f ON e.project_id = f.sl_no
            JOIN	  md_vendor g ON e.vendor_id = g.sl_no  
            WHERE  {criteria} 
            GROUP BY a.po_no,a.pur_no,e.project_id,f.proj_name,e.vendor_id,g.vendor_name,a.item_id,c.prod_name,a.approved_ord_qty
            ORDER BY po_no,pur_no,item_id)a
            LEFT JOIN
            (SELECT a.po_no,b.prod_id,GROUP_CONCAT(a.invoice SEPARATOR ',\n') AS 'Invoice',
            GROUP_CONCAT(DATE_FORMAT(a.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice_Date'
            FROM td_item_delivery_invoice a, td_item_delivery_details b
            WHERE a.sl_no=b.del_last_id AND a.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}'
            GROUP BY a.po_no,b.prod_id)b ON a.po_no  = b.po_no AND a.item_id=b.prod_id


"""
        
        
        
        
#         f"""

#  (SELECT   a.po_no,a.pur_no,e.project_id,f.proj_name,e.vendor_id,g.vendor_name,a.item_id,
#                 c.prod_name,c.prod_make,c.part_no,c.article_no,c.model_no,c.prod_desc,a.approved_ord_qty "orderd_qty",
#                 SUM(b.rc_qty)"rcvd_qty",(a.approved_ord_qty - SUM(b.rc_qty))"pending_qty"
#                 FROM     
#                 td_purchase_items a,td_item_delivery_details b,md_product c,
#                 td_item_delivery_invoice d,td_po_basic e,td_project f,md_vendor g
#                 WHERE    a.po_no = b.po_no
#                 AND      a.item_id = b.prod_id
#                 AND      a.item_id = c.sl_no
#                 AND      b.invoice   = d.invoice
#                 AND      a.po_no   = e.po_no
#          AND      e.project_id = f.sl_no
#          AND      e.vendor_id = g.sl_no
#          AND      d.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}' AND {criteria}
#          GROUP BY a.po_no,a.pur_no,e.project_id,f.proj_name,e.vendor_id,g.vendor_name,a.item_id,c.prod_name,a.approved_ord_qty
#          ORDER BY po_no,pur_no,item_id)a,

#         (SELECT a.po_no,b.prod_id,GROUP_CONCAT(a.invoice SEPARATOR ',\n') AS 'Invoice',
#         GROUP_CONCAT(DATE_FORMAT(a.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice_Date'
#         FROM td_item_delivery_invoice a, td_item_delivery_details b
#         WHERE a.sl_no=b.del_last_id AND a.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}'
#         GROUP BY a.po_no,b.prod_id)b
#         WHERE a.po_no  = b.po_no AND a.item_id=b.prod_id

# """
        group_by = """
            GROUP BY i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty,
            pb.pur_req, v.vendor_name, pb.po_no
        """
        join_schema = f"""
            td_po_items i
            LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria}
            LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no
            LEFT JOIN md_product p ON i.item_id = p.sl_no
            LEFT JOIN td_project pd ON pb.project_id = pd.sl_no
            LEFT JOIN md_vendor v ON pb.vendor_id = v.sl_no
            LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id
            LEFT JOIN td_item_delivery_invoice inv ON d.mrn_no = inv.mrn_no
            where inv.invoice_dt between '{id.from_dt}' and '{id.to_dt}'

        """
    else:  # Warehouse type
        select = """
                    a.po_no 'PO No.',a.pur_no 'Purchase Requisition','Warehouse' as 'Project',a.vendor_id,a.vendor_name 'Vendor',a.item_id,
           CONCAT(a.prod_name , '(Make:', a.prod_make, ', Part No.:', a.part_no,
                ',  Article No.:', a.article_no, ', Model No.:', a.model_no,
                ', Description:', a.prod_desc, ')') 'Product',a.orderd_qty 'Ordered Quantity',a.rcvd_qty 'Received Quantity',a.pending_qty 'Pending Quantity',b.Invoice,b.Invoice_Date as 'Invoice Date'
          
        """
        schema = f"""

            (SELECT  a.po_no,a.pur_no,e.project_id,e.vendor_id,g.vendor_name,a.item_id,
            c.prod_name,a.approved_ord_qty "orderd_qty",c.prod_make,c.part_no,c.article_no,c.model_no,c.prod_desc,
            IFNULL(SUM(b.rc_qty),0) "rcvd_qty",(a.approved_ord_qty - IFNULL(SUM(b.rc_qty),0))"pending_qty"
            FROM      td_purchase_items a
            LEFT JOIN td_item_delivery_details b ON a.po_no = b.po_no AND a.item_id = b.prod_id
            JOIN      md_product c ON a.item_id = c.sl_no
            LEFT JOIN td_item_delivery_invoice d ON b.invoice = d.invoice AND d.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}'
            JOIN      td_po_basic e ON a.po_no   = e.po_no
            JOIN	  md_vendor g ON e.vendor_id = g.sl_no  
            WHERE  {criteria} 
            GROUP BY a.po_no,a.pur_no,e.project_id,e.vendor_id,g.vendor_name,a.item_id,c.prod_name,a.approved_ord_qty
            ORDER BY po_no,pur_no,item_id)a
            LEFT JOIN
            (SELECT a.po_no,b.prod_id,GROUP_CONCAT(a.invoice SEPARATOR ',\n') AS 'Invoice',
            GROUP_CONCAT(DATE_FORMAT(a.invoice_dt, '%d/%m/%Y') SEPARATOR ',\n') AS 'Invoice_Date'
            FROM td_item_delivery_invoice a, td_item_delivery_details b
            WHERE a.sl_no=b.del_last_id AND a.invoice_dt BETWEEN '{id.from_dt}' AND '{id.to_dt}'
            GROUP BY a.po_no,b.prod_id)b ON a.po_no  = b.po_no AND a.item_id=b.prod_id

"""
        group_by = """
            GROUP BY i.item_id, i.quantity, p.prod_name, pi.approved_ord_qty,
            pb.pur_req, v.vendor_name, pb.po_no
        """
        join_schema = f"""
            td_po_items i
            LEFT JOIN td_po_basic pb ON i.po_sl_no = pb.sl_no AND {criteria}
            LEFT JOIN td_item_delivery_details d ON i.item_id = d.prod_id AND d.po_no = pb.po_no
            LEFT JOIN md_product p ON i.item_id = p.sl_no
            LEFT JOIN td_project pd ON pb.project_id = pd.sl_no
            LEFT JOIN md_vendor v ON pb.vendor_id = v.sl_no
            LEFT JOIN td_purchase_items pi ON i.item_id = pi.item_id
            LEFT JOIN td_item_delivery_invoice inv ON d.mrn_no = inv.mrn_no
            where inv.invoice_dt between '{id.from_dt}' and '{id.to_dt}'

        """
    
    # result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    # print('query===========',join_schema + group_by)
    print('query===========',join_schema + group_by)
    # result = await db_select(select, join_schema + group_by, where="", order="", flag=1)
    result = await db_select(select,schema, where="", order="", flag=1)
    return result

