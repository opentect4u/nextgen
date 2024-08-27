from fastapi import APIRouter,File,UploadFile,Form
from enum import Enum
from pydantic import BaseModel
from fastapi import APIRouter
from enum import Enum
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models.masterApiModel import db_select, db_Insert, db_Delete
from datetime import datetime
import datetime as dt
import random
from typing import Optional, Annotated, Union
import os

import logging
amendRouter = APIRouter()


class GetPo(BaseModel):
    id:int

@amendRouter.post('/getamendproject')
async def getamendprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number,b.po_no,b.po_id,b.po_date,b.po_type as type,b.po_issue_date,b.po_status,IF(b.po_status='P','In progress', IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='D','Delivered','Partial Delivery')))) po_status_val, IF(b.po_type='P','Project-Specific', IF(b.po_type='G', 'General','')) po_type,b.project_id,p.proj_name,b.vendor_id,b.created_by,b.created_at,b.created_by,b.created_at,b.modified_by,b.modified_at,v.vendor_name,b.sl_no,b.fresh_flag"
    schema = '''td_po_basic b
left join td_project p ON p.sl_no=b.project_id
join md_vendor v ON v.sl_no=b.vendor_id
join (SELECT @a:= 0) AS a '''
    where = f"b.sl_no='{id.id}' and b.po_status IN ('P','U','A') AND amend_flag = 'Y'" if id.id>0 else "b.po_status IN ('P','U','A') AND amend_flag = 'Y'"
    order = "ORDER BY b.created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@amendRouter.post('/addpoamend')
async def addpoamend(data:GetPo):
    am_po_no = await db_select(f"CONCAT((SELECT po_no FROM td_po_basic WHERE sl_no = {data.id}), '-', IF(INSTR(po_no, '-') > 0, MAX(SUBSTRING_INDEX(po_no, '-', -1))+1, 1)) am_po", "td_po_basic", f"SUBSTRING_INDEX(parent_po_no, '-', 1) = (SELECT po_no FROM td_po_basic WHERE sl_no = {data.id})", "", 0)
    
    fields= f'''SELECT NULL sl_no, po_id, "{am_po_no['msg']['am_po']}" po_no, po_date, po_type, po_issue_date, project_id, vendor_id, 'P' po_status, 'Y' fresh_flag, 0 active_step, po_no parent_po_no, 'Y' amend_flag, created_by, created_at, NULL modified_by, NULL modified_at FROM td_po_basic WHERE sl_no = {data.id}'''
    table_name = "td_po_basic"
    po_save = await db_Insert(table_name, fields, None, None, 0, True)
    lastID=po_save["lastId"]

    try:
        if(lastID > 0):
            fields1= f'SELECT NULL sl_no, "{lastID}" po_sl_no,bill_to,ware_house_flag,ship_to,po_notes,created_by,created_at, NULL modified_by, NULL modified_at FROM td_po_delivery WHERE po_sl_no = "{data.id}"'
            table_name1 = "td_po_delivery"
            result1 = await db_Insert(table_name1, fields1, None, None, 0, True)

            fields2= f'SELECT NULL sl_no, "{lastID}" po_sl_no,mdcc,mdcc_scope,inspection,inspection_scope,draw,draw_scope,draw_period,created_by,created_dt, NULL modified_by, NULL modified_at FROM td_po_more WHERE po_sl_no = "{data.id}"'
            table_name2 = "td_po_more"
            result2 = await db_Insert(table_name2, fields2, None, None, 0, True)

            fields3= f'SELECT NULL sl_no, "{lastID}" po_sl_no, item_id, quantity, item_rt, discount_percent, discount, unit_id, cgst_id, sgst_id, igst_id, delivery_dt,created_by,created_at, NULL modified_by, NULL modified_at FROM td_po_items WHERE po_sl_no = "{data.id}"'
            table_name3 = "td_po_items"
            result3 = await db_Insert(table_name3, fields3, None, None, 0, True)

            fields4= f'SELECT NULL sl_no, "{lastID}" po_sl_no, stage_no, terms_dtls,created_by,created_at, NULL modified_by, NULL modified_at FROM td_po_payment_dtls WHERE po_sl_no = "{data.id}"'
            table_name4 = "td_po_payment_dtls"
            result4 = await db_Insert(table_name4, fields4, None, None, 0, True)

            fields5= f'SELECT NULL sl_no, "{lastID}" po_sl_no, price_basis, price_basis_desc, packing_fwd_extra, packing_fwd_extra_val, packing_fwd_val, freight_ins, freight_ins_val, test_certificate, test_certificate_desc,ld_date, ld_date_desc, ld_val, ld_val_desc, ld_val_per, min_per, warranty_guarantee, dispatch_dt,comm_dt, duration, duration_value, o_m_manual, o_m_desc, operation_installation, operation_installation_desc, packing_type, manufacture_clearance, manufacture_clearance_desc,created_by,created_at, NULL modified_by, NULL modified_at FROM td_po_terms_condition WHERE po_sl_no = "{data.id}"'
            table_name5 = "td_po_terms_condition"
            result5 = await db_Insert(table_name5, fields5, None, None, 0, True)
    except:
        print('Error While saving')

    return po_save