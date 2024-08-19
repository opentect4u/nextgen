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

logging.basicConfig(level=logging.INFO)
poRouter = APIRouter()
class prodDetails(BaseModel):
    sl_no:Optional[int]=None
    item_name:Optional[Union[int,str,None]]=None
    qty:Optional[Union[int,str,None]]=None
    rate:Optional[Union[float,str,None]]=None
    disc:Optional[Union[float,str,None]]=None
    unit:Optional[Union[int,str,None]]=None
    unit_price:Optional[Union[int,str,None]]=None
    CGST:Optional[Union[float,str,None]]=None
    SGST:Optional[Union[float,str,None]]=None
    IGST:Optional[Union[float,str,None]]=None
    delivery_date:Optional[Union[str,None]]=None
     
class payTerms(BaseModel):
    sl_no:Optional[int]=None
    stage:Optional[Union[str,None]]=None
    term:Optional[Union[str,None]]=None

class PoModel(BaseModel):
    sl_no:Optional[int]=None
    po_id:Optional[Union[str,None]]=None
    po_status:Optional[Union[str,None]]=None
    po_issue_date:Optional[Union[str,None]]=None
    po_date:Optional[Union[str,None]]=None
    po_type:Optional[Union[str,None]]=None
    project_id:Optional[Union[int,str,None]]=None
    vendor_id:Optional[Union[int,str,None]]=None
    item_dtl:Optional[list[prodDetails]]=None
    price_basis:Optional[Union[str,None]]=None
    price_basis_desc:Optional[Union[str,None]]=None
    packing_fwd_val:Optional[str]=None
    packing_fwd_extra:Optional[float]=None
    packing_fwd_extra_val:Optional[float]=None
    freight_ins:Optional[Union[str,None]]=None
    freight_ins_val:Optional[Union[str,None]]=None
    test_certificate:Optional[Union[str,None]]=None
    test_certificate_desc:Optional[Union[str,None]]=None
    ld_date:Optional[Union[str,None]]=None
    ld_date_desc:Optional[Union[str,None]]=None
    ld_val:Optional[Union[str,None]]=None
    ld_val_desc:Optional[Union[str,None]]=None
    ld_val_per:Optional[Union[float,str,None]]=None
    min_per:Optional[Union[float,str,None]]=None
    warranty_guaranty:Optional[Union[str,None]]=None
    duration:Optional[Union[str,None]]=None
    duration_value:Optional[Union[str,None]]=None
    o_m_manual:Optional[Union[str,None]]=None
    o_m_desc:Optional[Union[str,None]]=None
    operation_installation:Optional[Union[str,None]]=None
    operation_installation_desc:Optional[Union[str,None]]=None
    packing_type:Optional[Union[str,None]]=None
    manufacture_clearance:Optional[Union[str,None]]=None
    manufacture_clearance_desc:Optional[Union[str,None]]=None
    payment_terms:Optional[list[payTerms]]
    bill_to:str
    ship_to:Optional[Union[str,None]]=None
    warehouse_flag:Optional[Union[str,None]]=None
    po_notes:Optional[Union[str,None]]=None
    mdcc:Optional[Union[str,None]]=None
    mdcc_scope:Optional[Union[str,None]]=None
    inspection:Optional[Union[str,None]]=None
    inspection_scope:Optional[Union[str,None]]=None
    draw:Optional[Union[str,None]]=None
    draw_scope:Optional[Union[str,None]]=None
    draw_period:Optional[Union[str,None]]=None
    final_save:Optional[Union[int,str,None]]=None
    po_no:Optional[Union[int,str,None]]=None
    fresh_flag:Optional[Union[int,str,None]]=None
    user:str

class GetPo(BaseModel):
    id:int

class approvePO(BaseModel):
    id:int
    status:str
    user:str

class getComments(BaseModel):
    id:int
    comments:str
    user:str

# @poRouter.post('/addpo')
# async def addpo(data:PoModel):
#     res_dt = {}
#     # print(data)
#     item_save=0
#     payment_save=0
#     current_datetime = datetime.now()
#     formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
#     fields= f'po_date="{data.po_date}",po_status="{data.po_status}",po_issue_date="{data.po_issue_date}",po_type="{data.po_type}",project_id="{data.project_id}",po_id="{data.po_id}",vendor_id="{data.vendor_id}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_date,po_type,project_id,po_id,vendor_id,po_status,po_issue_date,created_by,created_at'
#     values = f'"{data.po_date}","{data.po_type}","{data.project_id}","{data.po_id}","{data.vendor_id}","{data.po_status}","{data.po_issue_date}","{data.user}","{formatted_dt}"'
#     table_name = "td_po_basic"
#     whr = f'sl_no="{data.sl_no}"' if data.sl_no > 0 else None
#     flag = 1 if data.sl_no>0 else 0

#     result = await db_Insert(table_name, fields, values, whr, flag)
#     lastID=data.sl_no if data.sl_no>0 else result["lastId"]

#     print(data.item_dtl,type(data.item_dtl))
#     try:
#         if type(data.item_dtl) is not None and len(data.item_dtl)>0:

#             if(data.sl_no > 0):
#                 item_ids = ",".join(str(idt.sl_no) for idt in data.item_dtl)
#                 try:
#                     del_table_name = 'td_po_items'
#                     del_whr = f"sl_no not in({item_ids}) and po_sl_no='{data.sl_no}'"
#                     del_qry = await db_Delete(del_table_name, del_whr)
#                 except:
#                     print('Error while delete td_po_items')

#             for c in data.item_dtl:
#                 fields1= f'item_id="{c.item_name}",quantity="{c.qty}",item_rt="{c.rate}",discount="{c.disc}",unit_id="{c.unit}",cgst_id="{c.CGST}", sgst_id="{c.SGST}",igst_id="{c.IGST}",delivery_dt="{c.delivery_date}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'po_sl_no,item_id,quantity,item_rt,discount,unit_id,cgst_id,sgst_id,igst_id,delivery_dt,created_by,created_at'
#                 values1 = f'"{lastID}","{c.item_name}","{c.qty}","{c.rate}","{c.disc}","{c.unit}","{c.CGST}","{c.SGST}","{c.IGST}","{c.delivery_date}","{data.user}","{formatted_dt}"'
#                 table_name1 = "td_po_items"
#                 whr1=  f'sl_no="{c.sl_no}" and po_sl_no="{data.sl_no}"' if c.sl_no > 0 else None
#                 flag1 = 1 if c.sl_no>0 else 0
#                 result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)
#                 item_save=1 if result1['suc']>0 else 0
#         else:
#             # fields1= f'po_sl_no,created_by,created_at'
#             # values1 = f'"{lastID}","{data.user}","{formatted_dt}"'
#             # table_name1 = "td_po_items"
#             # whr1= None
#             # flag1 = 0
#             # result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)
#             item_save=1 
#     except:
#         print('Error')
#         item_save=1
   
          
#     fields2= f'price_basis="{data.price_basis}",price_basis_desc="{data.price_basis_desc}",packing_fwd_val="{data.packing_fwd_val}",packing_fwd_extra="{data.packing_fwd_extra}",packing_fwd_extra_val="{data.packing_fwd_extra_val}",freight_ins="{data.freight_ins}",freight_ins_val="{data.freight_ins_val}",test_certificate="{data.test_certificate}",test_certificate_desc="{data.test_certificate_desc}",ld_date="{data.ld_date}",ld_date_desc="{data.ld_date_desc}",ld_val="{data.ld_val}",ld_val_desc="{data.ld_val_desc}",ld_val_per="{data.ld_val_per}",min_per="{data.min_per}",warranty_guarantee="{data.warranty_guaranty}",duration="{data.duration}",duration_value="{data.duration_value}",o_m_manual="{data.o_m_manual}",operation_installation_desc="{data.operation_installation_desc}",packing_type="{data.packing_type}",o_m_desc="{data.o_m_desc}",operation_installation="{data.operation_installation}",manufacture_clearance="{data.manufacture_clearance}",manufacture_clearance_desc="{data.manufacture_clearance_desc}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,price_basis,price_basis_desc,packing_fwd_val,packing_fwd_extra,packing_fwd_extra_val,freight_ins,freight_ins_val,test_certificate,test_certificate_desc,ld_date,ld_date_desc,ld_val,ld_val_desc,ld_val_per,min_per,warranty_guarantee,duration,duration_value,o_m_manual,operation_installation_desc,packing_type,o_m_desc,operation_installation,manufacture_clearance,manufacture_clearance_desc,created_by,created_at'
#     values2 = f'"{lastID}","{data.price_basis}","{data.price_basis_desc}","{data.packing_fwd_val}","{data.packing_fwd_extra}","{data.packing_fwd_extra_val}","{data.freight_ins}","{data.freight_ins_val}","{data.test_certificate}","{data.test_certificate_desc}","{data.ld_date}","{data.ld_date_desc}","{data.ld_val}","{data.ld_val_desc}","{data.ld_val_per}","{data.min_per}","{data.warranty_guaranty}","{data.duration}","{data.duration_value}","{data.o_m_manual}","{data.operation_installation_desc}","{data.packing_type}","{data.o_m_desc}","{data.operation_installation}","{data.manufacture_clearance}","{data.manufacture_clearance_desc}","{data.user}","{formatted_dt}"'
#     table_name2 = "td_po_terms_condition"
#     whr2 = f'po_sl_no="{data.sl_no}"' if data.sl_no > 0 else None
#     flag2 = 1 if data.sl_no>0 else 0

#     result2 = await db_Insert(table_name2, fields2, values2, whr2, flag2)

#     print(data.payment_terms,type(data.payment_terms))
#     try:
#         if type(data.payment_terms) is not None and len(data.payment_terms)>0:
#             if(data.sl_no > 0):
#                 pay_ids = ",".join(str(pdt.sl_no) for pdt in data.payment_terms)
#                 try:
#                     del_table_name = 'td_po_payment_dtls'
#                     del_whr = f"sl_no not in({pay_ids}) and po_sl_no='{data.sl_no}'"
#                     del_qry = await db_Delete(del_table_name, del_whr)
#                 except:
#                     print('Error while delete td_po_payment_dtls')

#             for c in data.payment_terms:
#                 fields3= f'stage_no="{c.stage}",terms_dtls="{c.term}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'po_sl_no,stage_no,terms_dtls,created_by,created_at'
#                 values3 = f'"{lastID}","{c.stage}","{c.term}","{data.user}","{formatted_dt}"'
#                 table_name3 = "td_po_payment_dtls"
#                 whr3=  f'sl_no="{c.sl_no}" and po_sl_no="{data.sl_no}"' if c.sl_no > 0 else None
#                 flag3 = 1 if c.sl_no>0 else 0
#                 result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
#                 payment_save=1 if result3['suc']>0 else 0
#         else:
#                 payment_save=1
#     except:
#         print('Error')
#         payment_save=1

#     # else:
#     #     fields3= f'po_sl_no,created_by,created_at'
#     #     values3 = f'"{lastID}","{data.user}","{formatted_dt}"'
#     #     table_name3 = "td_po_payment_dtls"
#     #     whr3=None
#     #     flag3 = 0
#     #     result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
#     #     payment_save=1 if result3['suc']>0 else 0


#     fields4= f'ship_to="{data.ship_to}",ware_house_flag="{data.warehouse_flag}",po_notes="{data.po_notes}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,bill_to,ship_to,ware_house_flag,po_notes,created_by,created_at'
#     values4 = f'"{lastID}","{data.bill_to}","{data.ship_to}","{data.warehouse_flag}","{data.po_notes}","{data.user}","{formatted_dt}"'
#     table_name4 = "td_po_delivery"
#     whr4 = f'po_sl_no="{data.sl_no}"' if data.sl_no > 0 else None
#     flag4 = 1 if data.sl_no>0 else 0

#     result4 = await db_Insert(table_name4, fields4, values4, whr4, flag4)

#     fields5= f'mdcc="{data.mdcc}",mdcc_scope="{data.mdcc_scope}",inspection="{data.inspection}",inspection_scope="{data.inspection_scope}",draw="{data.draw}",draw_scope="{data.draw_scope}",draw_period="{data.draw_period}",modified_by="{data.user}",modified_dt="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,mdcc,mdcc_scope,inspection,inspection_scope,draw,draw_scope,draw_period,created_by,created_dt'
#     values5 = f'"{lastID}","{data.mdcc}","{data.mdcc_scope}","{data.inspection}","{data.inspection_scope}","{data.draw}","{data.draw_scope}","{data.draw_period}","{data.user}","{formatted_dt}"'
#     table_name5 = "td_po_more"
#     whr5 = f'po_sl_no="{data.sl_no}"' if data.sl_no > 0 else None
#     flag5 = 1 if data.sl_no>0 else 0

#     result5 = await db_Insert(table_name5, fields5, values5, whr5, flag5)

#     ''' FOR FINAL SAVE '''
#     try:
#         if(data.final_save > 0 and lastID > 0):
#             currYear = current_datetime.strftime("%Y")
#             max_form_no = await db_select("IF(MAX(SUBSTRING(po_no, -6)) > 0, LPAD(MAX(cast(SUBSTRING(po_no, -6) as unsigned))+1, 6, '0'), '000001') max_form", "td_po_basic", f"SUBSTRING(po_no, 1, 4) = {currYear}", "", 0)
#             po_no = f"{currYear}{max_form_no['msg']['max_form']}"
#             pfields= f'po_no="{po_no}"'
#             pvalues = None
#             ptable_name = "td_po_basic"
#             pwhr = f'sl_no="{lastID}"'
#             pflag = 1
#             po_save = await db_Insert(ptable_name, pfields, pvalues, pwhr, pflag)
#     except:
#         print('Error While saving PO Number')
#     ''' END '''

#     if(result['suc']>0 and item_save>0 and result2['suc']>0 and payment_save>0 and result4['suc']>0 and result5['suc']>0):
#         res_dt = {"suc": 1, "msg": f"Saved successfully!" if data.sl_no==0 else f"Updated successfully!"}
#     else:
#         res_dt = {"suc": 0, "msg": f"Error while saving!" if data.sl_no==0 else f"Error while updating"}
  
#     return res_dt

@poRouter.post('/getpopending')
async def getprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number,b.po_no,b.po_id,b.po_date,b.po_type as type,b.po_issue_date,b.po_status,IF(b.po_status='P','In progress', IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='D','Delivered','Partial Delivery')))) po_status_val, IF(b.po_type='P','Project-Specific', IF(b.po_type='G', 'General','')) po_type,b.project_id,p.proj_name,b.vendor_id,b.created_by,b.created_at,b.created_by,b.created_at,b.modified_by,b.modified_at,v.vendor_name,b.sl_no"
    schema = '''td_po_basic b
left join td_project p ON p.sl_no=b.project_id
join md_vendor v ON v.sl_no=b.vendor_id
join (SELECT @a:= 0) AS a '''
    where = f"b.sl_no='{id.id}' and po_status='P'" if id.id>0 else "b.po_status='P'"
    order = "ORDER BY b.created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpoapproved')
async def getprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number,b.po_no,b.po_id,b.po_date,b.po_type as type,b.po_issue_date,b.po_status,IF(b.po_status='P','In progress', IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='D','Delivered','Partial Delivery')))) po_status_val, IF(b.po_type='P','Project-Specific', IF(b.po_type='G', 'General','')) po_type,b.project_id,p.proj_name,b.vendor_id,b.created_by,b.created_at,b.created_by,b.created_at,b.modified_by,b.modified_at,v.vendor_name,b.sl_no"
    schema = "td_po_basic b,td_project p,md_vendor v,(SELECT @a:= 0) AS a"
    where = f"b.sl_no='{id.id}' and p.sl_no=b.project_id and v.sl_no=b.vendor_id and po_status='P'" if id.id>0 else "p.sl_no=b.project_id and v.sl_no=b.vendor_id and b.po_status!='P'"
    order = "ORDER BY b.created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpo')
async def getprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number,b.po_no,b.po_id,b.po_date,b.po_type as type,b.po_issue_date,b.po_status,IF(b.po_status='P','In progress', IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='D','Delivered','Partial Delivery')))) po_status_val, IF(b.po_type='P','Project-Specific', IF(b.po_type='G', 'General','')) po_type,b.project_id,p.proj_name,b.vendor_id,b.created_by,b.created_at,b.created_by,b.created_at,b.modified_by,b.modified_at,v.vendor_name,b.sl_no"
    schema = '''td_po_basic b
left join td_project p ON p.sl_no=b.project_id
join md_vendor v ON v.sl_no=b.vendor_id
join (SELECT @a:= 0) AS a '''
    where = f"b.sl_no='{id.id}' and b.po_status IN ('P','U','A')" if id.id>0 else "b.po_status IN ('P','U','A')"
    order = "ORDER BY b.created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpoitem')
async def getprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = "*"
    schema = "td_po_items"
    where = f"po_sl_no='{id.id}'" if id.id>0 else ""
    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpoterms')
async def getprojectpoc(id:GetPo):
    print(id.id)
    res_dt = {}

    select = "*"
    schema = "td_po_terms_condition"
    where = f"po_sl_no='{id.id}'" if id.id>0 else ""
    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpopayterms')
async def getprojectpoc(id:GetPo):
    print(id.id)
    res_dt = {}

    select = "*"
    schema = "td_po_payment_dtls"
    where = f"po_sl_no='{id.id}'" if id.id>0 else ""
    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpodelivery')
async def getprojectpoc(id:GetPo):
    print(id.id)
    res_dt = {}

    select = "*"
    schema = "td_po_delivery"
    where = f"po_sl_no='{id.id}'" if id.id>0 else ""
    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpomore')
async def getprojectpoc(id:GetPo):
    print(id.id)
    res_dt = {}
    select = "*"
    schema = "td_po_more"
    where = f"po_sl_no='{id.id}'" if id.id>0 else ""
    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpreviewitems')
async def getpreviewitems(id:GetPo):
    print(id.id)
    res_dt = {}
    select = "p.prod_name,p.prod_make,c.catg_name,p.part_no,p.model_no,p.article_no,p.hsn_code,p.prod_desc,i.quantity,i.item_rt,i.discount,i.cgst_id,i.sgst_id,i.igst_id,u.unit_name"
    schema = "md_product p,td_po_items i,md_category c,md_unit u"
    where = f"i.po_sl_no='{id.id}' and c.sl_no=p.prod_cat and i.item_id=p.sl_no and i.unit_id=u.sl_no" if id.id>0 else ""
    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/approvepo')
async def approvepo(id:approvePO):
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'po_status="{id.status}",modified_by="{id.user}",modified_at="{formatted_dt}"'
    values = f''
    table_name = "td_po_basic"
    whr = f'sl_no="{id.id}"' if id.id > 0 else None
    flag = 1 if id.id>0 else 0

    result = await db_Insert(table_name, fields, values, whr, flag)
    if result['suc']:
        res_dt = {"suc": 1, "msg": f"Action Successful!"}
    else:
        res_dt = {"suc": 0, "msg": f"Error while saving!"}
  
    return res_dt

@poRouter.post('/addpocomments')
async def addpocomments(id:getComments):
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'proj_id,proj_remarks,created_by,created_at'
    values = f'"{id.id}","{id.comments}","{id.user}","{formatted_dt}"'
    table_name = "td_project_remarks"
    whr = f'' if id.id > 0 else None
    flag =  0

    result = await db_Insert(table_name, fields, values, whr, flag)
    if result['suc']:
        res_dt = {"suc": 1, "msg": f"Comments updated!"}
    else:
        res_dt = {"suc": 0, "msg": f"Error while updated!"}
  
    return res_dt
      

@poRouter.post('/getpocomments')
async def getpocomments(id:GetPo):
    print(id.id)
    res_dt = {}
    select = "proj_remarks,created_by,created_at"
    where = f"proj_id='{id.id}'" if id.id>0 else ""
    schema = "td_project_remarks"

    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result


async def addexistingpo(data:PoModel):
    res_dt = {}
    # print(data)
    item_save=0
    payment_save=0
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'po_date="{data.po_date}",po_no="{data.po_no}",po_status="{data.po_status}",po_issue_date="{data.po_issue_date}",po_type="{data.po_type}",project_id="{data.project_id}",po_id="{data.po_id}",vendor_id="{data.vendor_id}",fresh_flag="{data.fresh_flag}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_date,po_no,po_type,project_id,po_id,vendor_id,po_status,po_issue_date,fresh_flag,created_by,created_at'
    values = f'"{data.po_date}","{data.po_no}","{data.po_type}","{data.project_id}","{data.po_id}","{data.vendor_id}","{data.po_status}","{data.po_issue_date}","{data.fresh_flag}","{data.user}","{formatted_dt}"'
    table_name = "td_po_basic"
    whr = f'sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag = 1 if data.sl_no>0 else 0

    result = await db_Insert(table_name, fields, values, whr, flag)
    lastID=data.sl_no if data.sl_no>0 else result["lastId"]

    print(data.item_dtl,type(data.item_dtl))
    try:
        if type(data.item_dtl) is not None and len(data.item_dtl)>0:

            if(data.sl_no > 0):
                item_ids = ",".join(str(idt.sl_no) for idt in data.item_dtl)
                try:
                    del_table_name = 'td_po_items'
                    del_whr = f"sl_no not in({item_ids}) and po_sl_no='{data.sl_no}'"
                    del_qry = await db_Delete(del_table_name, del_whr)
                except:
                    print('Error while delete td_po_items')

            for c in data.item_dtl:
                fields1= f'item_id="{c.item_name}",quantity="{c.qty}",item_rt="{c.rate}",discount="{c.disc}",unit_id="{c.unit}",cgst_id="{c.CGST}", sgst_id="{c.SGST}",igst_id="{c.IGST}",delivery_dt="{c.delivery_date}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'po_sl_no,item_id,quantity,item_rt,discount,unit_id,cgst_id,sgst_id,igst_id,delivery_dt,created_by,created_at'
                values1 = f'"{lastID}","{c.item_name}","{c.qty}","{c.rate}","{c.disc}","{c.unit}","{c.CGST}","{c.SGST}","{c.IGST}","{c.delivery_date}","{data.user}","{formatted_dt}"'
                table_name1 = "td_po_items"
                whr1=  f'sl_no="{c.sl_no}" and po_sl_no="{data.sl_no}"' if c.sl_no > 0 else None
                flag1 = 1 if c.sl_no>0 else 0
                result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)
                item_save=1 if result1['suc']>0 else 0
        else:
            # fields1= f'po_sl_no,created_by,created_at'
            # values1 = f'"{lastID}","{data.user}","{formatted_dt}"'
            # table_name1 = "td_po_items"
            # whr1= None
            # flag1 = 0
            # result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)
            item_save=1 
    except:
        print('Error')
        item_save=1
   
          
    fields2= f'price_basis="{data.price_basis}",price_basis_desc="{data.price_basis_desc}",packing_fwd_val="{data.packing_fwd_val}",packing_fwd_extra="{data.packing_fwd_extra}",packing_fwd_extra_val="{data.packing_fwd_extra_val}",freight_ins="{data.freight_ins}",freight_ins_val="{data.freight_ins_val}",test_certificate="{data.test_certificate}",test_certificate_desc="{data.test_certificate_desc}",ld_date="{data.ld_date}",ld_date_desc="{data.ld_date_desc}",ld_val="{data.ld_val}",ld_val_desc="{data.ld_val_desc}",ld_val_per="{data.ld_val_per}",min_per="{data.min_per}",warranty_guarantee="{data.warranty_guaranty}",duration="{data.duration}",duration_value="{data.duration_value}",o_m_manual="{data.o_m_manual}",operation_installation_desc="{data.operation_installation_desc}",packing_type="{data.packing_type}",o_m_desc="{data.o_m_desc}",operation_installation="{data.operation_installation}",manufacture_clearance="{data.manufacture_clearance}",manufacture_clearance_desc="{data.manufacture_clearance_desc}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,price_basis,price_basis_desc,packing_fwd_val,packing_fwd_extra,packing_fwd_extra_val,freight_ins,freight_ins_val,test_certificate,test_certificate_desc,ld_date,ld_date_desc,ld_val,ld_val_desc,ld_val_per,min_per,warranty_guarantee,duration,duration_value,o_m_manual,operation_installation_desc,packing_type,o_m_desc,operation_installation,manufacture_clearance,manufacture_clearance_desc,created_by,created_at'
    values2 = f'"{lastID}","{data.price_basis}","{data.price_basis_desc}","{data.packing_fwd_val}","{data.packing_fwd_extra}","{data.packing_fwd_extra_val}","{data.freight_ins}","{data.freight_ins_val}","{data.test_certificate}","{data.test_certificate_desc}","{data.ld_date}","{data.ld_date_desc}","{data.ld_val}","{data.ld_val_desc}","{data.ld_val_per}","{data.min_per}","{data.warranty_guaranty}","{data.duration}","{data.duration_value}","{data.o_m_manual}","{data.operation_installation_desc}","{data.packing_type}","{data.o_m_desc}","{data.operation_installation}","{data.manufacture_clearance}","{data.manufacture_clearance_desc}","{data.user}","{formatted_dt}"'
    table_name2 = "td_po_terms_condition"
    whr2 = f'po_sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag2 = 1 if data.sl_no>0 else 0

    result2 = await db_Insert(table_name2, fields2, values2, whr2, flag2)

    print(data.payment_terms,type(data.payment_terms))
    try:
        if type(data.payment_terms) is not None and len(data.payment_terms)>0:
            if(data.sl_no > 0):
                pay_ids = ",".join(str(pdt.sl_no) for pdt in data.payment_terms)
                try:
                    del_table_name = 'td_po_payment_dtls'
                    del_whr = f"sl_no not in({pay_ids}) and po_sl_no='{data.sl_no}'"
                    del_qry = await db_Delete(del_table_name, del_whr)
                except:
                    print('Error while delete td_po_payment_dtls')

            for c in data.payment_terms:
                fields3= f'stage_no="{c.stage}",terms_dtls="{c.term}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'po_sl_no,stage_no,terms_dtls,created_by,created_at'
                values3 = f'"{lastID}","{c.stage}","{c.term}","{data.user}","{formatted_dt}"'
                table_name3 = "td_po_payment_dtls"
                whr3=  f'sl_no="{c.sl_no}" and po_sl_no="{data.sl_no}"' if c.sl_no > 0 else None
                flag3 = 1 if c.sl_no>0 else 0
                result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
                payment_save=1 if result3['suc']>0 else 0
        else:
                payment_save=1
    except:
        print('Error')
        payment_save=1

    # else:
    #     fields3= f'po_sl_no,created_by,created_at'
    #     values3 = f'"{lastID}","{data.user}","{formatted_dt}"'
    #     table_name3 = "td_po_payment_dtls"
    #     whr3=None
    #     flag3 = 0
    #     result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
    #     payment_save=1 if result3['suc']>0 else 0


    fields4= f'ship_to="{data.ship_to}",ware_house_flag="{data.warehouse_flag}",po_notes="{data.po_notes}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,bill_to,ship_to,ware_house_flag,po_notes,created_by,created_at'
    values4 = f'"{lastID}","{data.bill_to}","{data.ship_to}","{data.warehouse_flag}","{data.po_notes}","{data.user}","{formatted_dt}"'
    table_name4 = "td_po_delivery"
    whr4 = f'po_sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag4 = 1 if data.sl_no>0 else 0

    result4 = await db_Insert(table_name4, fields4, values4, whr4, flag4)

    fields5= f'mdcc="{data.mdcc}",mdcc_scope="{data.mdcc_scope}",inspection="{data.inspection}",inspection_scope="{data.inspection_scope}",draw="{data.draw}",draw_scope="{data.draw_scope}",draw_period="{data.draw_period}",modified_by="{data.user}",modified_dt="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,mdcc,mdcc_scope,inspection,inspection_scope,draw,draw_scope,draw_period,created_by,created_dt'
    values5 = f'"{lastID}","{data.mdcc}","{data.mdcc_scope}","{data.inspection}","{data.inspection_scope}","{data.draw}","{data.draw_scope}","{data.draw_period}","{data.user}","{formatted_dt}"'
    table_name5 = "td_po_more"
    whr5 = f'po_sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag5 = 1 if data.sl_no>0 else 0

    result5 = await db_Insert(table_name5, fields5, values5, whr5, flag5)

    ''' FOR FINAL SAVE '''
    # try:
    #     if(data.final_save > 0 and lastID > 0):
    #         currYear = current_datetime.strftime("%Y")
    #         max_form_no = await db_select("IF(MAX(SUBSTRING(po_no, -6)) > 0, LPAD(MAX(cast(SUBSTRING(po_no, -6) as unsigned))+1, 6, '0'), '000001') max_form", "td_po_basic", f"SUBSTRING(po_no, 1, 4) = {currYear}", "", 0)
    #         po_no = f"{currYear}{max_form_no['msg']['max_form']}"
    #         pfields= f'po_no="{po_no}"'
    #         pvalues = None
    #         ptable_name = "td_po_basic"
    #         pwhr = f'sl_no="{lastID}"'
    #         pflag = 1
    #         po_save = await db_Insert(ptable_name, pfields, pvalues, pwhr, pflag)
    # except:
    #     print('Error While saving PO Number')
    ''' END '''

    if(result['suc']>0 and item_save>0 and result2['suc']>0 and payment_save>0 and result4['suc']>0 and result5['suc']>0):
        res_dt = {"suc": 1, "msg": f"Saved successfully!" if data.sl_no==0 else f"Updated successfully!"}
    else:
        res_dt = {"suc": 0, "msg": f"Error while saving!" if data.sl_no==0 else f"Error while updating"}
  
    return res_dt



async def addfreshpo(data:PoModel):
    res_dt = {}
    # print(data)
    item_save=0
    payment_save=0
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'po_date="{data.po_date}",po_status="{data.po_status}",po_issue_date="{data.po_issue_date}",po_type="{data.po_type}",project_id="{data.project_id}",po_id="{data.po_id}",vendor_id="{data.vendor_id}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_date,po_type,project_id,po_id,vendor_id,po_status,po_issue_date,created_by,created_at'
    values = f'"{data.po_date}","{data.po_type}","{data.project_id}","{data.po_id}","{data.vendor_id}","{data.po_status}","{data.po_issue_date}","{data.user}","{formatted_dt}"'
    table_name = "td_po_basic"
    whr = f'sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag = 1 if data.sl_no>0 else 0

    result = await db_Insert(table_name, fields, values, whr, flag)
    lastID=data.sl_no if data.sl_no>0 else result["lastId"]

    print(data.item_dtl,type(data.item_dtl))
    try:
        if type(data.item_dtl) is not None and len(data.item_dtl)>0:

            if(data.sl_no > 0):
                item_ids = ",".join(str(idt.sl_no) for idt in data.item_dtl)
                try:
                    del_table_name = 'td_po_items'
                    del_whr = f"sl_no not in({item_ids}) and po_sl_no='{data.sl_no}'"
                    del_qry = await db_Delete(del_table_name, del_whr)
                except:
                    print('Error while delete td_po_items')

            for c in data.item_dtl:
                fields1= f'item_id="{c.item_name}",quantity="{c.qty}",item_rt="{c.rate}",discount="{c.disc}",unit_id="{c.unit}",cgst_id="{c.CGST}", sgst_id="{c.SGST}",igst_id="{c.IGST}",delivery_dt="{c.delivery_date}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'po_sl_no,item_id,quantity,item_rt,discount,unit_id,cgst_id,sgst_id,igst_id,delivery_dt,created_by,created_at'
                values1 = f'"{lastID}","{c.item_name}","{c.qty}","{c.rate}","{c.disc}","{c.unit}","{c.CGST}","{c.SGST}","{c.IGST}","{c.delivery_date}","{data.user}","{formatted_dt}"'
                table_name1 = "td_po_items"
                whr1=  f'sl_no="{c.sl_no}" and po_sl_no="{data.sl_no}"' if c.sl_no > 0 else None
                flag1 = 1 if c.sl_no>0 else 0
                result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)
                item_save=1 if result1['suc']>0 else 0
        else:
            # fields1= f'po_sl_no,created_by,created_at'
            # values1 = f'"{lastID}","{data.user}","{formatted_dt}"'
            # table_name1 = "td_po_items"
            # whr1= None
            # flag1 = 0
            # result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)
            item_save=1 
    except:
        print('Error')
        item_save=1
   
          
    fields2= f'price_basis="{data.price_basis}",price_basis_desc="{data.price_basis_desc}",packing_fwd_val="{data.packing_fwd_val}",packing_fwd_extra="{data.packing_fwd_extra}",packing_fwd_extra_val="{data.packing_fwd_extra_val}",freight_ins="{data.freight_ins}",freight_ins_val="{data.freight_ins_val}",test_certificate="{data.test_certificate}",test_certificate_desc="{data.test_certificate_desc}",ld_date="{data.ld_date}",ld_date_desc="{data.ld_date_desc}",ld_val="{data.ld_val}",ld_val_desc="{data.ld_val_desc}",ld_val_per="{data.ld_val_per}",min_per="{data.min_per}",warranty_guarantee="{data.warranty_guaranty}",duration="{data.duration}",duration_value="{data.duration_value}",o_m_manual="{data.o_m_manual}",operation_installation_desc="{data.operation_installation_desc}",packing_type="{data.packing_type}",o_m_desc="{data.o_m_desc}",operation_installation="{data.operation_installation}",manufacture_clearance="{data.manufacture_clearance}",manufacture_clearance_desc="{data.manufacture_clearance_desc}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,price_basis,price_basis_desc,packing_fwd_val,packing_fwd_extra,packing_fwd_extra_val,freight_ins,freight_ins_val,test_certificate,test_certificate_desc,ld_date,ld_date_desc,ld_val,ld_val_desc,ld_val_per,min_per,warranty_guarantee,duration,duration_value,o_m_manual,operation_installation_desc,packing_type,o_m_desc,operation_installation,manufacture_clearance,manufacture_clearance_desc,created_by,created_at'
    values2 = f'"{lastID}","{data.price_basis}","{data.price_basis_desc}","{data.packing_fwd_val}","{data.packing_fwd_extra}","{data.packing_fwd_extra_val}","{data.freight_ins}","{data.freight_ins_val}","{data.test_certificate}","{data.test_certificate_desc}","{data.ld_date}","{data.ld_date_desc}","{data.ld_val}","{data.ld_val_desc}","{data.ld_val_per}","{data.min_per}","{data.warranty_guaranty}","{data.duration}","{data.duration_value}","{data.o_m_manual}","{data.operation_installation_desc}","{data.packing_type}","{data.o_m_desc}","{data.operation_installation}","{data.manufacture_clearance}","{data.manufacture_clearance_desc}","{data.user}","{formatted_dt}"'
    table_name2 = "td_po_terms_condition"
    whr2 = f'po_sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag2 = 1 if data.sl_no>0 else 0

    result2 = await db_Insert(table_name2, fields2, values2, whr2, flag2)

    print(data.payment_terms,type(data.payment_terms))
    try:
        if type(data.payment_terms) is not None and len(data.payment_terms)>0:
            if(data.sl_no > 0):
                pay_ids = ",".join(str(pdt.sl_no) for pdt in data.payment_terms)
                try:
                    del_table_name = 'td_po_payment_dtls'
                    del_whr = f"sl_no not in({pay_ids}) and po_sl_no='{data.sl_no}'"
                    del_qry = await db_Delete(del_table_name, del_whr)
                except:
                    print('Error while delete td_po_payment_dtls')

            for c in data.payment_terms:
                fields3= f'stage_no="{c.stage}",terms_dtls="{c.term}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'po_sl_no,stage_no,terms_dtls,created_by,created_at'
                values3 = f'"{lastID}","{c.stage}","{c.term}","{data.user}","{formatted_dt}"'
                table_name3 = "td_po_payment_dtls"
                whr3=  f'sl_no="{c.sl_no}" and po_sl_no="{data.sl_no}"' if c.sl_no > 0 else None
                flag3 = 1 if c.sl_no>0 else 0
                result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
                payment_save=1 if result3['suc']>0 else 0
        else:
                payment_save=1
    except:
        print('Error')
        payment_save=1

    # else:
    #     fields3= f'po_sl_no,created_by,created_at'
    #     values3 = f'"{lastID}","{data.user}","{formatted_dt}"'
    #     table_name3 = "td_po_payment_dtls"
    #     whr3=None
    #     flag3 = 0
    #     result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
    #     payment_save=1 if result3['suc']>0 else 0


    fields4= f'ship_to="{data.ship_to}",ware_house_flag="{data.warehouse_flag}",po_notes="{data.po_notes}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,bill_to,ship_to,ware_house_flag,po_notes,created_by,created_at'
    values4 = f'"{lastID}","{data.bill_to}","{data.ship_to}","{data.warehouse_flag}","{data.po_notes}","{data.user}","{formatted_dt}"'
    table_name4 = "td_po_delivery"
    whr4 = f'po_sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag4 = 1 if data.sl_no>0 else 0

    result4 = await db_Insert(table_name4, fields4, values4, whr4, flag4)

    fields5= f'mdcc="{data.mdcc}",mdcc_scope="{data.mdcc_scope}",inspection="{data.inspection}",inspection_scope="{data.inspection_scope}",draw="{data.draw}",draw_scope="{data.draw_scope}",draw_period="{data.draw_period}",modified_by="{data.user}",modified_dt="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,mdcc,mdcc_scope,inspection,inspection_scope,draw,draw_scope,draw_period,created_by,created_dt'
    values5 = f'"{lastID}","{data.mdcc}","{data.mdcc_scope}","{data.inspection}","{data.inspection_scope}","{data.draw}","{data.draw_scope}","{data.draw_period}","{data.user}","{formatted_dt}"'
    table_name5 = "td_po_more"
    whr5 = f'po_sl_no="{data.sl_no}"' if data.sl_no > 0 else None
    flag5 = 1 if data.sl_no>0 else 0

    result5 = await db_Insert(table_name5, fields5, values5, whr5, flag5)

    ''' FOR FINAL SAVE '''
    try:
        if(data.final_save > 0 and lastID > 0):
            currYear = current_datetime.strftime("%Y")
            max_form_no = await db_select("IF(MAX(SUBSTRING(po_no, -6)) > 0, LPAD(MAX(cast(SUBSTRING(po_no, -6) as unsigned))+1, 6, '0'), '000001') max_form", "td_po_basic", f"SUBSTRING(po_no, 1, 4) = {currYear}", "", 0)
            po_no = f"{currYear}{max_form_no['msg']['max_form']}"
            pfields= f'po_no="{po_no}"'
            pvalues = None
            ptable_name = "td_po_basic"
            pwhr = f'sl_no="{lastID}"'
            pflag = 1
            po_save = await db_Insert(ptable_name, pfields, pvalues, pwhr, pflag)
    except:
        print('Error While saving PO Number')
    ''' END '''

    if(result['suc']>0 and item_save>0 and result2['suc']>0 and payment_save>0 and result4['suc']>0 and result5['suc']>0):
        res_dt = {"suc": 1, "msg": f"Saved successfully!" if data.sl_no==0 else f"Updated successfully!"}
    else:
        res_dt = {"suc": 0, "msg": f"Error while saving!" if data.sl_no==0 else f"Error while updating"}
  
    return res_dt



@poRouter.post('/addpo')
async def addpo(data:PoModel):
   if data.fresh_flag=='Y':
      await addfreshpo(data)
   else:
      await addexistingpo(data)
       