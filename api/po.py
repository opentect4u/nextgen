from fastapi import APIRouter,File,UploadFile,Form
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
from typing import Optional, Annotated, Union
import os

import logging

logging.basicConfig(level=logging.INFO)
poRouter = APIRouter()
class prodDetails(BaseModel):
    sl_no:Optional[int]=None
    item_name:Optional[int]=None
    qty:Optional[int]=None
    rate:Optional[float]=None
    disc:Optional[float]=None
    unit:Optional[int]=None
    unit_price:Optional[int]=None
    CGST:Optional[int]=None
    SGST:Optional[int]=None
    IGST:Optional[int]=None
    delivery_date:Optional[str]=None
     
class payTerms(BaseModel):
    sl_no:Optional[int]=None
    stage:Optional[str]=None
    term:Optional[str]=None

class PoModel(BaseModel):
    sl_no:Optional[int]=None
    po_id:Optional[str]=None
    po_date:Optional[str]=None
    po_type:Optional[str]=None
    project_id:Optional[int]=None
    vendor_id:Optional[int]=None
    item_dtl:Optional[list[prodDetails]]=None
    price_basis:Optional[str]=None
    price_basis_desc:Optional[str]=None
    packing_fwd_per:Optional[float]=None
    freight_ins:Optional[str]=None
    test_certificate:Optional[str]=None
    test_certificate_desc:Optional[str]=None
    ld_date:Optional[str]=None
    ld_date_desc:Optional[str]=None
    ld_val:Optional[str]=None
    ld_val_desc:Optional[str]=None
    ld_val_per:Optional[float]=None
    min_per:Optional[float]=None
    warranty_guaranty:Optional[str]=None
    duration:Optional[str]=None
    duration_value:Optional[str]=None
    o_m_manual:Optional[str]=None
    o_m_desc:Optional[str]=None
    operation_installation:Optional[str]=None
    operation_installation_desc:Optional[str]=None
    packing_type:Optional[str]=None
    manufacture_clearance:Optional[str]=None
    manufacture_clearance_desc:Optional[str]=None
    payment_terms:Optional[list[payTerms]]
    bill_to:str
    ship_to:Optional[str]=None
    warehouse_flag:Optional[str]=None
    po_notes:Optional[str]=None
    mdcc:Optional[str]=None
    mdcc_scope:Optional[str]=None
    inspection:Optional[str]=None
    inspection_scope:Optional[str]=None
    draw:Optional[str]=None
    draw_scope:Optional[str]=None
    draw_period:Optional[str]=None
    user:str




@poRouter.post('/addpo')
async def addpo(data:PoModel):
    
    res_dt = {}
    print(data)
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'po_date="{data.po_date}",po_type="{data.po_type}",project_id="{data.project_id}",po_id="{data.po_id}",vendor_id="{data.vendor_id}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_date,po_type,project_id,po_id,vendor_id,created_by,created_at'
    values = f'"{data.po_date}","{data.po_type}","{data.project_id}","{data.po_id}","{data.vendor_id}","{data.user}","{formatted_dt}"'
    table_name = "td_po_basic"
    whr = f'sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag = 1 if data.sl_no>0 else 0

    result = await db_Insert(table_name, fields, values, whr, flag)

    lastID=data.sl_no if data.sl_no>0 else result["lastId"]
    
    for c in data.item_dtl:
        fields1= f'item_id="{c.item_name}",quantity="{c.qty}",item_rt="{c.rate}",discount="{c.disc}",unit_id="{c.unit}",cgst_id="{c.CGST}", sgst_id="{c.SGST}",igst_id="{c.IGST}",delivery_dt="{c.delivery_date}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'po_sl_no,item_id,quantity,item_rt,discount,unit_id,cgst_id,sgst_id,igst_id,delivery_dt,created_by,created_at'
        values1 = f'"{lastID}","{c.item_name}","{c.qty}","{c.rate}","{c.disc}","{c.unit}","{c.CGST}","{c.SGST}","{c.IGST}","{c.delivery_date}","{data.user}","{formatted_dt}"'
        table_name1 = "td_po_items"
        whr1=  f'sl_no="{c.sl_no}"' if c.sl_no > 0 else None
        flag1 = 1 if c.sl_no>0 else 0
        result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)


    
    if(result['suc']>0 and result1['suc']>0):
        res_dt = {"suc": 1, "msg": f"Saved successfully!" if data.sl_no==0 else f"Updated successfully!"}
    else:
        res_dt = {"suc": 0, "msg": f"Error while saving!" if data.sl_no==0 else f"Error while updating"}
    # del_table_name = 'md_client_poc'
    # del_whr = f"sl_no not in()"
    # del_qry = await db_Delete(del_table_name, del_whr)
    # for c in data.c_loc:
    #     fields= f'c_loc="{c.c_location}",c_gst="{c.c_gst}",c_pan="{c.c_pan}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'client_id,c_loc,c_gst,c_pan,created_by,created_at'
    #     values = f'"{lastID}","{c.c_location}","{c.c_gst}","{c.c_pan}","{data.user}","{formatted_dt}"'
    #     table_name = "md_client_loc"
    #     whr =  f'sl_no="{c.sl_no}"' if c.sl_no > 0 else None
    #     flag1 = 1 if c.sl_no>0 else 0
    #     result = await db_Insert(table_name, fields, values, whr, flag1)

    #     # if(result['suc']>0):
    #     #     res_dt = {"suc": 1, "msg": f"Client saved successfully!" if c.sl_no==0 else f"Client updated successfully!"}
    #     # else:
    #     #     res_dt = {"suc": 0, "msg": f"Error while saving!" if c.sl_no==0 else f"Error while updating"}


    # for c in data.c_poc:
    #     fields= f'poc_name="{c.poc_name}",poc_email="{c.poc_email}",poc_designation="{c.poc_designation}",poc_department="{c.poc_department}",poc_direct_no="{c.poc_direct_no}",poc_ext_no="{c.poc_ext_no}", poc_ph_1="{c.poc_ph_1}",poc_ph_2="{c.poc_ph_2}",poc_location="{c.poc_location}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'client_id,poc_name,poc_email,poc_designation,poc_department,poc_direct_no,poc_ext_no,poc_ph_1,poc_ph_2,poc_location,created_by,created_at'
    #     values = f'"{lastID}","{c.poc_name}","{c.poc_email}","{c.poc_designation}","{c.poc_department}","{c.poc_direct_no}","{c.poc_ext_no}","{c.poc_ph_1}","{c.poc_ph_2}","{c.poc_location}","{data.user}","{formatted_dt}"'
    #     table_name = "md_client_poc"
    #     whr =  f'sl_no="{c.sl_no}"' if c.sl_no > 0 else None
    #     flag1 = 1 if c.sl_no>0 else 0
    #     result = await db_Insert(table_name, fields, values, whr, flag1)

    #     if(result['suc']>0):
    #         res_dt = {"suc": 1, "msg": f"Client saved successfully!" if c.sl_no==0 else f"Client updated successfully!"}
    #     else:
    #         res_dt = {"suc": 0, "msg": f"Error while saving!" if c.sl_no==0 else f"Error while updating"}

    return res_dt