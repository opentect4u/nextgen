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
    item_id:Optional[int]=None
    quantity:Optional[int]=None
    item_rt:Optional[float]=None
    discount:Optional[float]=None
    unit_id:Optional[int]=None
    cgst_id:Optional[int]=None
    sgst_id:Optional[int]=None
    igst_id:Optional[int]=None
    delivery_dt:Optional[str]=None
class paymentTerms(BaseModel):
    sl_no:Optional[int]=None
    stage:Optional[str]=None
    terms_dtls:Optional[str]=None
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
    packing_fwd_val:Optional[float]=None
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
    payment_terms:Optional[list[paymentTerms]]
    bill_to:str
    ship_to:Optional[str]=None
    warehouse_flag:Optional[str]=None
    po_notes:Optional[str]=None

    user:str




@poRouter.post('/addpo')
async def addpo(data:PoModel):
    
    res_dt = {}
    print(data)
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'por_date="{data.po_date}",po_type="{data.po_type}",project_id="{data.project_id}",po_id="{data.po_id}",vendor_id="{data.vendor_id}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_date,po_type,project_id,po_id,vendor_id,created_by,created_at'
    values = f'"{data.po_date}","{data.po_type}","{data.project_id}","{data.po_id}","{data.vendor_id}","{data.user}","{formatted_dt}"'
    table_name = "td_po_basic"
    whr = f'sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag = 1 if data.c_id>0 else 0

    result = await db_Insert(table_name, fields, values, whr, flag)

    lastID=data.sl_no if data.sl_no>0 else result["lastId"]
    if(result['suc']>0):
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