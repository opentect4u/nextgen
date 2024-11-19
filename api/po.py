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

UPLOAD_FOLDER = "upload_file/upload_tc"
UPLOAD_FOLDER2 = "upload_file/upload_mdcc"
UPLOAD_FOLDER3 = "upload_file/upload_delivery"
UPLOAD_FOLDER4 = "upload_file/upload_log"
UPLOAD_FOLDER5 = "upload_file/upload_receipt"
UPLOAD_FOLDER6 = "upload_file/upload_vendor_mdcc"
UPLOAD_FOLDER7 = "upload_file/upload_more"
UPLOAD_FOLDER8 = "upload_file/upload_vtoc"

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(UPLOAD_FOLDER2, exist_ok=True)
os.makedirs(UPLOAD_FOLDER3, exist_ok=True)
os.makedirs(UPLOAD_FOLDER4, exist_ok=True)
os.makedirs(UPLOAD_FOLDER5, exist_ok=True)
os.makedirs(UPLOAD_FOLDER6, exist_ok=True)
os.makedirs(UPLOAD_FOLDER7, exist_ok=True)
os.makedirs(UPLOAD_FOLDER8, exist_ok=True)

logging.basicConfig(level=logging.INFO)
poRouter = APIRouter()
class prodDetails(BaseModel):
    sl_no:Optional[int]=None
    item_name:Optional[Union[int,str,None]]=None
    qty:Optional[Union[int,str,None]]=None
    rate:Optional[Union[float,str,None]]=None
    disc:Optional[Union[float,str,None]]=None
    disc_prtg:Optional[Union[float,str,int,None]]=None
    unit:Optional[Union[int,str,None]]=None
    unit_price:Optional[Union[int,str,float,None]]=None
    CGST:Optional[Union[float,str,None]]=None
    SGST:Optional[Union[float,str,None]]=None
    IGST:Optional[Union[float,str,None]]=None
    delivery_date:Optional[Union[str,None]]=None
    delivery_to:Optional[Union[str,None]]=None
    currency:Optional[Union[str,None]]=None
     
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
    vend_ref:Optional[Union[int,str,None]]=None
    item_dtl:Optional[list[prodDetails]]=None
    price_basis:Optional[Union[str,None]]=None
    price_basis_desc:Optional[Union[str,None]]=None
    packing_fwd_val:Optional[str]=None
    packing_fwd_extra:Optional[float]=None
    packing_fwd_extra_val:Optional[float]=None
    pf_currency:Optional[Union[str,None]]=None
    pf_cgst:Optional[float]=None
    pf_sgst:Optional[float]=None
    pf_igst:Optional[float]=None
    freight_ins:Optional[Union[str,None]]=None
    freight_ins_val:Optional[Union[str,None]]=None
    freight_extra:Optional[Union[float]]=None
    freight_extra_val:Optional[Union[float]]=None
    freight_cgst:Optional[Union[float]]=None
    freight_sgst:Optional[Union[float]]=None
    freight_igst:Optional[Union[float]]=None
    freight_currency:Optional[Union[str,None]]=None
    ins:Optional[Union[str,None]]=None
    ins_val:Optional[Union[str,None]]=None
    ins_extra:Optional[float]=None
    ins_extra_val:Optional[float]=None
    ins_currency:Optional[Union[str,None]]=None
    ins_cgst:Optional[float]=None
    ins_sgst:Optional[float]=None
    ins_igst:Optional[float]=None
    test_certificate:Optional[Union[str,None]]=None
    test_certificate_desc:Optional[Union[str,None]]=None
    ld_date:Optional[Union[str,None]]=None
    ld_date_desc:Optional[Union[str,None]]=None
    ld_val:Optional[Union[str,None]]=None
    ld_val_desc:Optional[Union[str,None]]=None
    ld_val_per:Optional[Union[float,str,None]]=None
    min_per:Optional[Union[float,str,None]]=None
    warranty_guaranty:Optional[Union[str,None]]=None
    dispatch_dt:Optional[Union[str,bool,None]]=None
    comm_dt:Optional[Union[str,bool,None]]=None
    duration:Optional[Union[str,None]]=None
    duration_value:Optional[Union[str,None]]=None
    o_m_manual:Optional[Union[str,None]]=None
    o_m_desc:Optional[Union[str,None]]=None
    operation_installation:Optional[Union[str,None]]=None
    operation_installation_desc:Optional[Union[str,None]]=None
    packing_type:Optional[Union[str,None]]=None
    packing_val:Optional[Union[str,None]]=None
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
class GetPoInfo(BaseModel):
    id:str
class GetStock(BaseModel):
    proj_id:int
    prod_id:int

class GetReq(BaseModel):
    Proj_id:int

class approvePO(BaseModel):
    id:int
    status:str
    user:str

class deleteMrn(BaseModel):
    id:str

class getComments(BaseModel):
    id:int
    comments:str
    user:str
class GetPoNo(BaseModel):
    po_no:str

class GetTc(BaseModel):
    id:int
    po_no:str
    item:int
    quantity:int
    tc_quantity:int
    rc_quantity:int
    user:str

class GetMdcc(BaseModel):
    id:int
    po_no:str
    test_dt:str
    item:int
    quantity:int
    status:str
    comments:str
    user:str

class srcMdccbyPO(BaseModel):
    po:str

class srcGetByItem(BaseModel):
    po:str
    item:str

class getDoc(BaseModel):
    id:int
    item:str

class deleteDoc(BaseModel):
    po_no:str
    # item:int
    user:str

class deleteReceipt(BaseModel):
    id:int
    user:str

class addItems(BaseModel):
    sl_no:int
    cust_qty:Union[str,int]
    wh_qty:Union[str,int]
class MrnItem(BaseModel):
    sl_no:int
    item_id:int
    prod_id:int
    quantity:int
    rc_qty:int
    sl:str
    remarks:str
    name:str

class getDelivery(BaseModel):
    id:int
    po_no:str
    items:list[MrnItem]
    invoice:str
    in_out_flag:int
    invoice_dt:str
    lr_no:str
    waybill:str
    ot_desc:str
    ic:str
    og:str
    dc:str
    lr:str
    wb:str
    pl:str
    om:str
    om_manual:str
    ws:str
    tc:str
    wc:str
    ot:str
    confirm:str
    user:str

class DeleteDelivery(BaseModel):
    po_no:str
    user:str
    item:int

class delLog(BaseModel):
    po_no:str
    user:str
    id:int

class GetPhrase(BaseModel):
    wrd:str

class ItemVtoC(BaseModel):
    item_id:int
    rc_qty:int

class DelVtoC(BaseModel):
    po_no:str
    project_id:int
    del_dt:str
    remarks:str
    user:str
    items:list[ItemVtoC]
    


class minList(BaseModel):
    sl_no:int
    item_id:int
    quantity:int
    issue_qty:int
    purpose:str
    notes:str
    name:str
    
class AddMin(BaseModel):
    req_no:str
    min:list[minList]
    user:str
    min_dt:str

class ProjId(BaseModel):
    Proj_id:int

class ReqItems(BaseModel):
    sl_no:int
    item_id:int
    rc_qty:int
    req_qty:int

class GetMinReq(BaseModel):
    id:int
class SaveReq(BaseModel):
    sl_no:int
    intended_for:str
    req_date:str
    project_id:int
    # req_type:str
    client_id:int
    purpose:str
    items:list[ReqItems]
    user:str
    in_out_flag:int
class approveReq(BaseModel):
    items:list[ReqItems]
    id:int
    status:str
    user:str
    project_id:int
    in_out_flag:int
    reason:str
class ReqId(BaseModel):
    last_req_id:int

class MrnId(BaseModel):
    id:int
    invoice:str

class getMrnList(BaseModel):
    last_req_id:str

class req_id(BaseModel):
    Proj_id:int
    req_no:str

class ReqNo(BaseModel):
    req_no:str

class CheckInvoice(BaseModel):
    inv_no:str
class MrnApproveItems(BaseModel):
    item_id:int
    rc_qty:int

class approveMRN(BaseModel):
    inv_no:str
    po_no:str
    status:str
    user:str
    rej_note:str
    in_out_flag:int
    items:list[MrnApproveItems]
    invoice_dt:str


class PoSearch(BaseModel):
    project_id:Optional[Union[int,str]]=None
    vendor_id:Optional[Union[int,str]]=None
    make:Optional[str]=None
    part_no:Optional[str]=None
    prod_id:Optional[str]=None
    from_dt:Optional[str]=None
    to_dt:Optional[str]=None

class DelSearch(BaseModel):
    invoice:Optional[str]=None
    make:Optional[str]=None
    project_id:Optional[Union[int,str]]=None
    vendor_id:Optional[Union[int,str]]=None
    part_no:Optional[str]=None
    prod_id:Optional[str]=None
    from_dt:Optional[str]=None
    to_dt:Optional[str]=None

class VtoC(BaseModel):
    po_no:str

class DeleteVtoC(BaseModel):
    po_no:str
    id:int
    del_no:str


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

    select = "@a:=@a+1 serial_number,b.po_no,b.po_id,b.po_date,b.po_type as type,b.po_issue_date,b.po_status,IF(b.po_status='P','In progress', IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='D','Delivered','Partial Delivery')))) po_status_val, IF(b.po_type='P','Project-Specific', IF(b.po_type='G', 'General','')) po_type,b.project_id,p.proj_name,b.vendor_id,b.created_by,b.created_at,b.created_by,b.created_at,b.modified_by,b.modified_at,v.vendor_name,b.sl_no,b.fresh_flag"
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

    select = "@a:=@a+1 serial_number,b.po_no,b.vend_ref,b.po_id,b.po_date,b.po_type as type,b.po_issue_date,b.po_status,IF(b.po_status='P','In progress', IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='D','Delivered','Partial Delivery')))) po_status_val, IF(b.po_type='P','Project-Specific', IF(b.po_type='G', 'General','')) po_type,b.project_id,p.proj_name,b.vendor_id,b.created_by,b.created_at,b.created_by,b.created_at,b.modified_by,b.modified_at,v.vendor_name,b.sl_no,b.fresh_flag,b.amend_flag,b.amend_note"
    schema = '''td_po_basic b
left join td_project p ON p.sl_no=b.project_id
join md_vendor v ON v.sl_no=b.vendor_id 
join (SELECT @a:= 0) AS a '''
    where = f"b.sl_no='{id.id}' and b.po_status IN ('P','U','A','L','D')" if id.id>0 else "b.po_status IN ('P','U','A','L','D') OR (amend_flag = 'Y' AND parent_po_no IS NOT NULL)"
    order = "ORDER BY b.created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpofordelivery')
async def getprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = " distinct @a:=@a+1 serial_number,b.po_no,b.vend_ref,b.po_id,b.po_date,b.po_type as type,b.po_issue_date,b.po_status,IF(b.po_status='P','In progress', IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='D','Delivered','Partial Delivery')))) po_status_val, IF(b.po_type='P','Project-Specific', IF(b.po_type='G', 'General','')) po_type,b.project_id,p.proj_name,b.vendor_id,b.created_by,b.created_at,b.created_by,b.created_at,b.modified_by,b.modified_at,v.vendor_name,b.sl_no,b.fresh_flag,b.amend_flag,b.amend_note,del.ware_house_flag, (select count(*) from td_item_delivery_invoice where po_no = b.po_no) as invoice_count"
    schema = '''td_po_basic b
left join td_project p ON p.sl_no=b.project_id
join md_vendor v ON v.sl_no=b.vendor_id left join td_po_delivery del on b.sl_no = del.po_sl_no 
join (SELECT @a:= 0) AS a '''
    where = f"b.sl_no='{id.id}' and b.po_status IN ('P','U','A','L','D')" if id.id>0 else "b.po_status IN ('P','U','A','L','D') OR (amend_flag = 'Y' AND parent_po_no IS NOT NULL)"
    order = "ORDER BY b.created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result


@poRouter.post('/getdeliveryapproval')
async def getprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = " distinct @a:=@a+1 serial_number,b.po_no,b.vend_ref,b.po_id,b.po_date,b.po_type as type,b.po_issue_date,b.po_status,IF(b.po_status='P','In progress', IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='D','Delivered','Partial Delivery')))) po_status_val, IF(b.po_type='P','Project-Specific', IF(b.po_type='G', 'General','')) po_type,b.project_id,p.proj_name,b.vendor_id,b.created_by,b.created_at,b.created_by,b.created_at,b.modified_by,b.modified_at,v.vendor_name,b.sl_no,b.fresh_flag,b.amend_flag,b.amend_note,del.ware_house_flag, (select count(*) from td_item_delivery_invoice where po_no = b.po_no) as invoice_count,inv.approve_flag,inv.invoice,inv.mrn_no"
    schema = '''td_po_basic b
left join td_project p ON p.sl_no=b.project_id
join md_vendor v ON v.sl_no=b.vendor_id left join td_po_delivery del on b.sl_no = del.po_sl_no left join td_item_delivery_invoice inv on b.po_no = inv.po_no
join (SELECT @a:= 0) AS a '''
    where = f"b.sl_no='{id.id}' and b.po_status IN ('P','U','A','L','D')" if id.id>0 else "b.po_status IN ('P','U','A','L','D') OR (amend_flag = 'Y' AND parent_po_no IS NOT NULL)"
    order = "ORDER BY b.created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getpopm')
async def getprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number,b.po_no,b.vend_ref,b.po_id,b.po_date,b.po_type as type,b.po_issue_date,b.po_status,IF(b.po_status='P','In progress', IF(b.po_status='A','Approved',IF(b.po_status='U','Approval Pending',IF(b.po_status='D','Delivered','Partial Delivery')))) po_status_val, IF(b.po_type='P','Project-Specific', IF(b.po_type='G', 'General','')) po_type,b.project_id,u.user_email,c.proj_manager,p.proj_name,b.vendor_id,b.created_by,b.created_at,b.created_by,b.created_at,b.modified_by,b.modified_at,v.vendor_name,b.sl_no,b.fresh_flag,b.amend_flag,b.amend_note"
    schema = '''td_po_basic b
left join td_project p ON p.sl_no=b.project_id
join md_vendor v ON v.sl_no=b.vendor_id left join td_project_assign c on c.sl_no=p.sl_no left join md_user u on u.sl_no = c.proj_manager
join (SELECT @a:= 0) AS a '''
    where = f"b.sl_no='{id.id}' and b.po_status IN ('P','U','A','L','D')" if id.id>0 else "b.po_status IN ('P','U','A','L','D') OR (amend_flag = 'Y' AND parent_po_no IS NOT NULL)"
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
@poRouter.post('/getpoitemfortc')
async def getprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = "i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.item_rt,i.discount_percent,i.discount,p.prod_name"
    schema = "td_po_items i,md_product p"
    where = f"i.po_sl_no='{id.id}' and i.item_id=p.sl_no" if id.id>0 else ""
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
    select = "p.prod_name,p.prod_make,c.catg_name,p.part_no,p.model_no,p.article_no,p.hsn_code,p.prod_desc,i.quantity,i.item_rt,i.discount,i.discount_percent,i.currency,i.cgst_id,i.sgst_id,i.igst_id,u.unit_name"
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
    req_no=f'REQ-{data.po_no}' if data.po_type=='P' else f''
    fields= f'po_date="{data.po_date}",po_no="{data.po_no}",po_status="{data.po_status}",po_issue_date="{data.po_issue_date}",po_type="{data.po_type}",project_id="{data.project_id}",po_id="{data.po_id}",vendor_id="{data.vendor_id}",vend_ref={data.vend_ref},fresh_flag="{data.fresh_flag}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_date,po_no,po_type,project_id,po_id,vendor_id,vend_ref,po_status,po_issue_date,fresh_flag,created_by,created_at'
    values = f'"{data.po_date}","{data.po_no}","{data.po_type}","{data.project_id}","{data.po_id}","{data.vendor_id}","{data.vend_ref}","{data.po_status}","{data.po_issue_date}","{data.fresh_flag}","{data.user}","{formatted_dt}"'
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
                fields1= f'item_id="{c.item_name}",quantity="{c.qty}",item_rt="{c.rate}",discount="{c.disc}",discount_percent="{c.disc_prtg}",unit_id="{c.unit}",cgst_id="{c.CGST}", sgst_id="{c.SGST}",igst_id="{c.IGST}",delivery_dt="{c.delivery_date}",delivery_to="{c.delivery_to}",currency="{c.currency}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'po_sl_no,item_id,quantity,item_rt,discount,discount_percent,unit_id,cgst_id,sgst_id,igst_id,delivery_dt,delivery_to,currency,created_by,created_at'
                values1 = f'"{lastID}","{c.item_name}","{c.qty}","{c.rate}","{c.disc}","{c.disc_prtg}","{c.unit}","{c.CGST}","{c.SGST}","{c.IGST}","{c.delivery_date}","{c.delivery_to}","{c.currency}","{data.user}","{formatted_dt}"'
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
   
          
    fields2= f'price_basis="{data.price_basis}",price_basis_desc="{data.price_basis_desc}",packing_fwd_val="{data.packing_fwd_val}",packing_fwd_extra="{data.packing_fwd_extra}",packing_fwd_extra_val="{data.packing_fwd_extra_val}",pf_currency="{data.pf_currency}",pf_cgst="{data.pf_cgst}",pf_sgst="{data.pf_sgst}",pf_igst="{data.pf_igst}",freight_ins="{data.freight_ins}",freight_ins_val="{data.freight_ins_val}",freight_extra="{data.freight_extra}",freight_extra_val="{data.freight_extra_val}",freight_currency="{data.freight_currency}",freight_cgst="{data.freight_cgst}",freight_sgst="{data.freight_sgst}",freight_igst="{data.freight_igst}",ins="{data.ins}",ins_val="{data.ins_val}",ins_extra="{data.ins_extra}",ins_extra_val="{data.ins_extra_val}",ins_currency="{data.ins_currency}",ins_cgst="{data.ins_cgst}",ins_sgst="{data.ins_sgst}",ins_igst="{data.ins_igst}",test_certificate="{data.test_certificate}",test_certificate_desc="{data.test_certificate_desc}",ld_date="{data.ld_date}",ld_date_desc="{data.ld_date_desc}",ld_val="{data.ld_val}",ld_val_desc="{data.ld_val_desc}",ld_val_per="{data.ld_val_per}",min_per="{data.min_per}",warranty_guarantee="{data.warranty_guaranty}",dispatch_dt="{data.dispatch_dt}",comm_dt="{data.comm_dt}",duration="{data.duration}",duration_value="{data.duration_value}",o_m_manual="{data.o_m_manual}",operation_installation_desc="{data.operation_installation_desc}",packing_type="{data.packing_type}",packing_val="{data.packing_val}",o_m_desc="{data.o_m_desc}",operation_installation="{data.operation_installation}",manufacture_clearance="{data.manufacture_clearance}",manufacture_clearance_desc="{data.manufacture_clearance_desc}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,price_basis,price_basis_desc,packing_fwd_val,packing_fwd_extra,packing_fwd_extra_val,pf_currency,pf_cgst,pf_sgst,pf_igst,freight_ins,freight_ins_val,freight_extra,freight_extra_val,freight_currency,freight_cgst,freight_sgst,freight_igst,ins,ins_val,ins_extra,ins_extra_val,ins_currency,ins_cgst,ins_sgst,ins_igst,test_certificate,test_certificate_desc,ld_date,ld_date_desc,ld_val,ld_val_desc,ld_val_per,min_per,warranty_guarantee,dispatch_dt,comm_dt,duration,duration_value,o_m_manual,operation_installation_desc,packing_type,packing_val,o_m_desc,operation_installation,manufacture_clearance,manufacture_clearance_desc,created_by,created_at'
    values2 = f'"{lastID}","{data.price_basis}","{data.price_basis_desc}","{data.packing_fwd_val}","{data.packing_fwd_extra}","{data.packing_fwd_extra_val}","{data.pf_currency}","{data.pf_cgst}","{data.pf_sgst}","{data.pf_igst}","{data.freight_ins}","{data.freight_ins_val}","{data.freight_extra}","{data.freight_extra_val}","{data.freight_currency}","{data.freight_cgst}","{data.freight_sgst}","{data.freight_igst}","{data.ins}","{data.ins_val}","{data.ins_extra}","{data.ins_extra_val}","{data.ins_currency}","{data.ins_cgst}","{data.ins_sgst}","{data.ins_igst}","{data.test_certificate}","{data.test_certificate_desc}","{data.ld_date}","{data.ld_date_desc}","{data.ld_val}","{data.ld_val_desc}","{data.ld_val_per}","{data.min_per}","{data.warranty_guaranty}","{data.dispatch_dt}","{data.comm_dt}","{data.duration}","{data.duration_value}","{data.o_m_manual}","{data.operation_installation_desc}","{data.packing_type}","{data.packing_val}","{data.o_m_desc}","{data.operation_installation}","{data.manufacture_clearance}","{data.manufacture_clearance_desc}","{data.user}","{formatted_dt}"'
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
        res_dt = {"suc": 1, "msg": f"Saved successfully!" if data.sl_no==0 else f"Updated successfully!","po_sl_no": lastID}
    else:
        res_dt = {"suc": 0, "msg": f"Error while saving!" if data.sl_no==0 else f"Error while updating","po_sl_no": lastID}
  
    return res_dt



async def addfreshpo(data:PoModel):
    res_dt = {}
    print('---------------------------------------------------------------------')
    print(data)
    item_save=0
    payment_save=0
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    req_no=f'REQ-{data.po_no}' if data.po_type=='P' else f''
    fields= f'po_date="{data.po_date}",po_status="{data.po_status}",po_issue_date="{data.po_issue_date}",po_type="{data.po_type}",project_id="{data.project_id}",po_id="{data.po_id}",vendor_id="{data.vendor_id}",vend_ref="{data.vend_ref}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_date,po_type,project_id,po_id,vendor_id,vend_ref,po_status,po_issue_date,created_by,created_at'
    values = f'"{data.po_date}","{data.po_type}","{data.project_id}","{data.po_id}","{data.vendor_id}","{data.vend_ref}","{data.po_status}","{data.po_issue_date}","{data.user}","{formatted_dt}"'
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
                fields1= f'item_id="{c.item_name}",quantity="{c.qty}",item_rt="{c.rate}",discount_percent="{c.disc_prtg}",discount="{c.disc}",unit_id="{c.unit}",cgst_id="{c.CGST}", sgst_id="{c.SGST}",igst_id="{c.IGST}",delivery_dt="{c.delivery_date}",delivery_to="{c.delivery_to}",currency="{c.currency}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'po_sl_no,item_id,quantity,item_rt,discount,discount_percent,unit_id,cgst_id,sgst_id,igst_id,delivery_dt,delivery_to,currency,created_by,created_at'
                values1 = f'"{lastID}","{c.item_name}","{c.qty}","{c.rate}","{c.disc}","{c.disc_prtg}","{c.unit}","{c.CGST}","{c.SGST}","{c.IGST}","{c.delivery_date}","{c.delivery_to}","{c.currency}","{data.user}","{formatted_dt}"'
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
   
          
    fields2= f'price_basis="{data.price_basis}",price_basis_desc="{data.price_basis_desc}",packing_fwd_val="{data.packing_fwd_val}",packing_fwd_extra="{data.packing_fwd_extra}",packing_fwd_extra_val="{data.packing_fwd_extra_val}",freight_ins="{data.freight_ins}",pf_currency="{data.pf_currency}",pf_cgst="{data.pf_cgst}",pf_sgst="{data.pf_sgst}",pf_igst="{data.pf_igst}",freight_ins_val="{data.freight_ins_val}",freight_extra="{data.freight_extra}",freight_extra_val="{data.freight_extra_val}",freight_currency="{data.freight_currency}",freight_cgst="{data.freight_cgst}",freight_sgst="{data.freight_sgst}",freight_igst="{data.freight_igst}",ins="{data.ins}",ins_val="{data.ins_val}",ins_extra="{data.ins_extra}",ins_extra_val="{data.ins_extra_val}",ins_currency="{data.ins_currency}",ins_cgst="{data.ins_cgst}",ins_sgst="{data.ins_sgst}",ins_igst="{data.ins_igst}",test_certificate="{data.test_certificate}",test_certificate_desc="{data.test_certificate_desc}",ld_date="{data.ld_date}",ld_date_desc="{data.ld_date_desc}",ld_val="{data.ld_val}",ld_val_desc="{data.ld_val_desc}",ld_val_per="{data.ld_val_per}",min_per="{data.min_per}",warranty_guarantee="{data.warranty_guaranty}",dispatch_dt="{data.dispatch_dt}",comm_dt="{data.comm_dt}",duration="{data.duration}",duration_value="{data.duration_value}",o_m_manual="{data.o_m_manual}",operation_installation_desc="{data.operation_installation_desc}",packing_type="{data.packing_type}",packing_val="{data.packing_val}",o_m_desc="{data.o_m_desc}",operation_installation="{data.operation_installation}",manufacture_clearance="{data.manufacture_clearance}",manufacture_clearance_desc="{data.manufacture_clearance_desc}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.sl_no > 0 else f'po_sl_no,price_basis,price_basis_desc,packing_fwd_val,packing_fwd_extra,packing_fwd_extra_val,pf_currency,pf_cgst,pf_sgst,pf_igst,freight_ins,freight_ins_val,freight_extra,freight_extra_val,freight_currency,freight_cgst,freight_sgst,freight_igst,ins,ins_val,ins_extra,ins_extra_val,ins_currency,ins_cgst,ins_sgst,ins_igst,test_certificate,test_certificate_desc,ld_date,ld_date_desc,ld_val,ld_val_desc,ld_val_per,min_per,warranty_guarantee,dispatch_dt,comm_dt,duration,duration_value,o_m_manual,operation_installation_desc,packing_type,packing_val,o_m_desc,operation_installation,manufacture_clearance,manufacture_clearance_desc,created_by,created_at'
    values2 = f'"{lastID}","{data.price_basis}","{data.price_basis_desc}","{data.packing_fwd_val}","{data.packing_fwd_extra}","{data.packing_fwd_extra_val}","{data.pf_currency}","{data.pf_cgst}","{data.pf_sgst}","{data.pf_igst}","{data.freight_ins}","{data.freight_ins_val}","{data.freight_extra}","{data.freight_extra_val}","{data.freight_currency}","{data.freight_cgst}","{data.freight_sgst}","{data.freight_igst}","{data.ins}","{data.ins_val}","{data.ins_extra}","{data.ins_extra_val}","{data.ins_currency}","{data.ins_cgst}","{data.ins_sgst}","{data.ins_igst}","{data.test_certificate}","{data.test_certificate_desc}","{data.ld_date}","{data.ld_date_desc}","{data.ld_val}","{data.ld_val_desc}","{data.ld_val_per}","{data.min_per}","{data.warranty_guaranty}","{data.dispatch_dt}","{data.comm_dt}","{data.duration}","{data.duration_value}","{data.o_m_manual}","{data.operation_installation_desc}","{data.packing_type}","{data.packing_val}","{data.o_m_desc}","{data.operation_installation}","{data.manufacture_clearance}","{data.manufacture_clearance_desc}","{data.user}","{formatted_dt}"'
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

    print('---------------------------------------------------------------------')
    if(result['suc']>0 and item_save>0 and result2['suc']>0 and payment_save>0 and result4['suc']>0 and result5['suc']>0):
        res_dt = {"suc": 1, "msg": f"Saved successfully!" if data.sl_no==0 else f"Updated successfully!", "po_sl_no": lastID}
    else:
        res_dt = {"suc": 0, "msg": f"Error while saving!" if data.sl_no==0 else f"Error while updating", "po_sl_no": lastID}
  
    return res_dt



@poRouter.post('/addpo')
async def addpo(data:PoModel):
   if data.fresh_flag=='Y':
     return await addfreshpo(data)
   else:
     return await addexistingpo(data)
   
@poRouter.post('/add_po_more_img')
async def addPoMoreImg(mdcc_doc:Optional[Union[UploadFile, None]] = None, insp_doc:Optional[Union[UploadFile, None]] = None, draw_doc:Optional[Union[UploadFile, None]] = None, user:str = Form(...),po_sl_no:str = Form(...)):
    res_dt = {}
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    mdcc_doc_fileName = ''
    insp_doc_fileName = ''
    draw_doc_fileName = ''
    if mdcc_doc:
        mdcc_doc_fileName = '' if not mdcc_doc else await uploadfileToLocal7(mdcc_doc)
    if insp_doc:
        insp_doc_fileName = '' if not insp_doc else await uploadfileToLocal7(insp_doc)
    if draw_doc:
        draw_doc_fileName = '' if not draw_doc else await uploadfileToLocal7(draw_doc)

    if (mdcc_doc_fileName != '' or insp_doc_fileName != '' or draw_doc_fileName != ''):
        fields= f'''{f"mdcc_doc = 'upload_more/{mdcc_doc_fileName}', " if mdcc_doc_fileName != '' else ''}{f"insp_doc = 'upload_more/{insp_doc_fileName}'," if insp_doc_fileName != '' else ''} {f"draw_doc = 'upload_more/{draw_doc_fileName}'," if draw_doc_fileName != '' else ''} modified_by = "{user}", modified_dt = "{formatted_dt}"'''
        values = None
        table_name = "td_po_more"
        whr =  f'po_sl_no="{po_sl_no}"'
        flag = 1
        # if(id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        res_dt = result
    else:
        res_dt = {"suc": 1, "msg": "No file selected"}
    
    return res_dt
    
async def uploadfileToLocal7(file):
    current_datetime = datetime.now()
    receipt = int(round(current_datetime.timestamp()))
    modified_filename = f"{receipt}_{file.filename}"
    res = ""
    try:
        file_location = os.path.join(UPLOAD_FOLDER7, modified_filename)
        print(file_location)
        
        with open(file_location, "wb") as f:
            f.write(await file.read())
        
        res = modified_filename
        print(res)
    except Exception as e:
        # res = e.args
        res = ""
    finally:
        return res
   
@poRouter.post('/check_po_no')
async def check_proj_id(po_no:GetPoNo):
    print(po_no.po_no)
    res_dt = {}

    select = "count(*) as count"
    schema = "td_po_basic"
    where = f"po_no='{po_no.po_no}'"
    order = ""
    flag = 1 if po_no.po_no else 0
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/addtc')
async def addtc(dt:GetTc):
    print(dt)
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'po_no,item,qty,tc_qty,rc_qty,created_by,created_at'
    values = f'"{dt.po_no}","{dt.item}","{dt.quantity}","{dt.tc_quantity}","{dt.rc_quantity}","{dt.user}","{formatted_dt}"'
    table_name = "td_test_cert"
    whr =  None
    flag = 1 if dt.id>0 else 0
    if(dt.id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Saved successfully!","lastID":result['lastId']}
        else:
            res_dt = {"suc": 0, "msg": "Error while saving!"}
    # else:
    #     print(flag)
    #     fields=f'catg_name="{dt.name}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
    #     whr=f'sl_no="{dt.id}"'
    #     result = await db_Insert(table_name, fields, values, whr, flag)
    #     if(result['suc']>0):
    #         res_dt = {"suc": 1, "msg": "Category updated successfully!"}
    #     else:
    #         res_dt = {"suc": 0, "msg": "Error while updating!"}
    return res_dt


@poRouter.post('/add_tc_files')
async def add_proj_files(item_id:str = Form(...),po_no:str = Form(...),test_cert_no:str = Form(...), user:str = Form(...),docs1:Optional[Union[UploadFile, None]] = None):
    fileName = ''
    res_dt = {}
    files = []
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    if not docs1:
        return {"suc": 1, "msg": "No file sent"}
    else:
        if docs1:
            files.append(docs1)
       

        logging.info(f"Number of files received: {len(files)}")
        logging.info(f"Type of files received: {type(files)}")

        if(len(files) > 0):
            for f in files:
                fileName = ''
                fileName = None if not f else await uploadfileToLocal(f)
                fields3= f'test_cert_no,doc1,po_no,item_id,created_by,created_at'
                values3 = f'"{test_cert_no}","upload_tc/{fileName}","{po_no}","{item_id}","{user}","{formatted_dt}"' 
                table_name3 = "test_cert_doc"
                whr3 =  ""
                flag3 = 0
                # if(id==0):
                result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
                res_dt = result3
        return res_dt

        # if(type(files) != list):
        #     fileName = None if not files else await uploadfileToLocal(files)
        #     fields3= f'proj_id,proj_doc,created_by,created_at'
        #     values3 = f'"{proj_id}","{fileName}","{user}","{formatted_dt}"' 
        #     table_name3 = "td_project_doc"
        #     whr3 =  ""
        #     flag3 = 0
        #     # if(id==0):
        #     result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
        #     res_dt = result3
        # else:
        #     # print(docs)
        #     for f in files:
        #         fileName = ''
        #         fileName = None if not f else await uploadfileToLocal(f)
        #         fields3= f'proj_id,proj_doc,created_by,created_at'
        #         values3 = f'"{proj_id}","{fileName}","{user}","{formatted_dt}"' 
        #         table_name3 = "td_project_doc"
        #         whr3 =  ""
        #         flag3 = 0
        #         # if(id==0):
        #         result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
        #         res_dt = result3
        # return res_dt

async def uploadfileToLocal(file):
    current_datetime = datetime.now()
    receipt = int(round(current_datetime.timestamp()))
    modified_filename = f"{receipt}_{file.filename}"
    res = ""
    try:
        file_location = os.path.join(UPLOAD_FOLDER, modified_filename)
        print(file_location)
        
        with open(file_location, "wb") as f:
            f.write(await file.read())
        
        res = modified_filename
        print(res)
    except Exception as e:
        # res = e.args
        res = ""
    finally:
        return res
    

@poRouter.post('/addmdcc')
async def addtc(dt:GetMdcc):
    print(dt)
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'po_no,test_dt,item,qty,comments,created_by,created_at'
    values = f'"{dt.po_no}","{dt.test_dt}","{dt.item}","{dt.quantity}","{dt.comments}","{dt.user}","{formatted_dt}"'
    table_name = "td_mdcc"
    whr =  None
    flag = 1 if dt.id>0 else 0
    if(dt.id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Saved successfully!","lastID":result['lastId']}
        else:
            res_dt = {"suc": 0, "msg": "Error while saving!"}
    # else:
    #     print(flag)
    #     fields=f'catg_name="{dt.name}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
    #     whr=f'sl_no="{dt.id}"'
    #     result = await db_Insert(table_name, fields, values, whr, flag)
    #     if(result['suc']>0):
    #         res_dt = {"suc": 1, "msg": "Category updated successfully!"}
    #     else:
    #         res_dt = {"suc": 0, "msg": "Error while updating!"}
    return res_dt


@poRouter.post('/add_mdcc_files')
async def add_proj_files(item_id:str = Form(...),po_no:str = Form(...),mdcc_no:str = Form(...), user:str = Form(...),docs1:Optional[Union[UploadFile, None]] = None, docs2:Optional[Union[UploadFile, None]] = None):
    fileName = ''
    res_dt = {}
    files = []
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    if not docs1 and not docs2:
        return {"suc": 1, "msg": "No file sent"}
    else:
        if docs1:
            files.append(docs1)
        if docs2:
            files.append(docs2)

        logging.info(f"Number of files received: {len(files)}")
        logging.info(f"Type of files received: {type(files)}")

        if(len(files) > 0):
            for f in files:
                fileName = ''
                fileName = None if not f else await uploadfileToLocal1(f)
                fields3= f'mdcc_no,doc1,po_no,item_id,created_by,created_at'
                values3 = f'"{mdcc_no}","upload_mdcc/{fileName}","{po_no}","{item_id}","{user}","{formatted_dt}"' 
                table_name3 = "td_mdcc_doc"
                whr3 =  ""
                flag3 = 0
                # if(id==0):
                result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
                res_dt = result3
        return res_dt

async def uploadfileToLocal1(file):
    current_datetime = datetime.now()
    receipt = int(round(current_datetime.timestamp()))
    modified_filename = f"{receipt}_{file.filename}"
    res = ""
    try:
        file_location = os.path.join(UPLOAD_FOLDER2, modified_filename)
        print(file_location)
        
        with open(file_location, "wb") as f:
            f.write(await file.read())
        
        res = modified_filename
        print(res)
    except Exception as e:
        # res = e.args
        res = ""
    finally:
        return res
    

@poRouter.post('/gettcbypo')
async def gettcbypo(po:srcMdccbyPO):
    print(po.po)
    res_dt = {}
    select = "m.sl_no,m.po_no,m.item,m.qty,m.tc_qty,m.created_by,m.created_at,m.modified_by,m.modified_at,p.prod_name"
    schema = "td_test_cert m, td_po_items i, md_product p"
    where = f"(m.po_no like '%{po.po}%' or p.prod_name like '%{po.po}%') and m.item=i.sl_no and i.item_id=p.sl_no and m.delete_flag='N'"
    order = ""
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result     

# @poRouter.post('/getmdccbypo')
# async def gettcbypo(po:srcMdccbyPO):
#     print(po.po)
#     res_dt = {}
#     select = "*"
#     schema = "td_mdcc"
#     where = f"po_no like '%{po.po}%' and delete_flag='N'"
#     order = ""
#     flag = 1 
#     result = await db_select(select, schema, where, order, flag)
#     print(result, 'RESULT')
#     return result   

@poRouter.post('/getmdccbypo')
async def gettcbypo(po:srcMdccbyPO):
    print(po.po)
    res_dt = {}
    select = "m.sl_no,m.po_no,m.test_dt,m.item,m.qty,m.status,m.comments,m.created_by,m.created_at,m.modified_by,m.modified_at,p.prod_name"
    schema = "td_mdcc m, td_po_items i, md_product p"
    where = f"m.po_no like '%{po.po}%' and m.item=i.sl_no and i.item_id=p.sl_no and m.delete_flag='N'"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result   

@poRouter.post('/gettc')  
async def gettcbypo(id:GetPo):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    select = "*"
    schema = "td_test_cert"
    where = f"sl_no='{id.id}'" if id.id>0 else f""
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/getmdcc')  
async def gettcbypo(id:GetPo):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    select = "*"
    schema = "td_mdcc"
    where = f"sl_no='{id.id}'" if id.id>0 else f""
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/gettcdoc')  
async def gettcbypo(id:getDoc):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    select = "*"
    schema = "test_cert_doc"
    where = f"po_no='{id.id}' and item_id='{id.item}' and delete_flag='N'" if id.id>0 else f""
    order = "ORDER BY created_at DESC"
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/getmdccdoc')  
async def gettcbypo(id:getDoc):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    select = "*"
    schema = "td_mdcc_doc"
    where = f"mdcc_no='{id.id}'and item_id='{id.item}'" if id.id>0 else f""
    order = "ORDER BY created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/gettcbyitem')  
async def gettcbypo(id:srcGetByItem):
    print('I am logging in!')
    res_dt = {}
    select = "item,qty,rc_qty,tc_qty"
    schema = "td_test_cert"
    where = f"po_no='{id.po}' and item='{id.item}' and delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/getmdccbyitem')  
async def gettcbypo(id:srcGetByItem):
    print('I am logging in!')
    res_dt = {}
    select = "item,qty,status"
    schema = "td_mdcc"
    where = f"po_no='{id.po}' and item='{id.item}'"
    order = "ORDER BY created_at DESC"
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@poRouter.post('/deletetc')
async def deletetc(id:deleteDoc):
   current_datetime = datetime.now()
   res_dt={}
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

   fields=f'delete_flag="Y",deleted_by="{id.user}",deleted_at="{formatted_dt}"'
   table_name = "td_test_cert"
   flag = 1 
   values=''
   whr=f'po_no="{id.po_no}" and item="{id.item}"'
   result = await db_Insert(table_name, fields, values, whr, flag)


   fields1=f'delete_flag="Y",deleted_by="{id.user}",deleted_at="{formatted_dt}"'
   table_name1 = "test_cert_doc"
   flag1 = 1 
   values1=''
   whr1=f'po_no="{id.po_no}" and item_id="{id.item}"'
   result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)
   if(result['suc']>0 and result1['suc']>0):
        res_dt = {"suc": 1, "msg": "Deleted successfully!"}
   else:
        res_dt = {"suc": 0, "msg": "Error while deleting!"}
       
   return res_dt


@poRouter.post('/deletemdcc')
async def deletetc(id:deleteDoc):
   current_datetime = datetime.now()
   res_dt={}
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

   fields=f'delete_flag="Y",deleted_by="{id.user}",deleted_at="{formatted_dt}"'
   table_name = "td_mdcc"
   flag = 1 
   values=''
   whr=f'sl_no="{id.id}"'
   result = await db_Insert(table_name, fields, values, whr, flag)


   fields1=f'delete_flag="Y",deleted_by="{id.user}",deleted_at="{formatted_dt}"'
   table_name1 = "td_mdcc_doc"
   flag1 = 1 
   values1=''
   whr1=f'mdcc_no="{id.id}"'
   result1 = await db_Insert(table_name1, fields1, values1, whr1, flag1)
   if(result['suc']>0 and result1['suc']>0):
        res_dt = {"suc": 1, "msg": "Deleted successfully!"}
   else:
        res_dt = {"suc": 0, "msg": "Error while deleting!"}
       
   return res_dt


@poRouter.post('/check_po_no_for_doc')
async def check_proj_id(po_no:GetPoNo):
    print(po_no.po_no)
    res_dt = {}

    select = "count(*) as count"
    schema = "td_po_basic"
    where = f"po_no='{po_no.po_no}' and po_status in ('A','D','L')"
    order = ""
    flag = 1 if po_no.po_no else 0
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/getitemdoctc')
async def check_proj_id(po_no:GetPoNo):
    print(po_no.po_no)
    res_dt = {}

    select = "po_no,item_id"
    schema = "test_cert_doc"
    where = f"po_no='{po_no.po_no}' and delete_flag='N'"
    order = ""
    flag = 1 if po_no.po_no else 0
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/getitemdocmdcc')
async def check_proj_id(po_no:GetPoNo):
    print(po_no.po_no)
    res_dt = {}

    select = "po_no,item_id"
    schema = "td_mdcc_doc"
    where = f"po_no='{po_no.po_no}' and delete_flag='N'"
    order = ""
    flag = 1 if po_no.po_no else 0
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result



# @poRouter.post('/adddelivery')
# async def adddelivery(data:getDelivery):
#     res_dt = {}
#     print(data)
#     current_datetime = datetime.now()

    
#     select1 = "count(*) as count"
#     schema1 = "td_item_delivery_invoice"
#     where1 = f"invoice='{data.invoice}'"
#     order1 = ""
#     flag1 = 0 
#     result1 = await db_select(select1, schema1, where1, order1, flag1)
#     print(result1,'res')
   
#     formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")


#     fields= f'po_no="{data.po_no}",ot_desc="{data.ot_desc}",invoice="{data.invoice}",invoice_dt="{data.invoice_dt}",lr_no="{data.lr_no}",waybill="{data.waybill}",ic="{data.ic}",og="{data.og}",dc="{data.dc}",lr="{data.lr}",wb="{data.wb}",pl="{data.pl}",om="{data.om}",om_manual="{data.om_manual}",ws="{data.ws}",tc="{data.tc}",wc="{data.wc}",ot="{data.ot}",confirm="{data.confirm}",modified_by="{data.user}",modified_at="{formatted_dt}"' if result1['msg']['count'] > 0 else f'mrn_no,po_no,ot_desc,invoice,invoice_dt,lr_no,waybill,ic,og,dc,lr,wb,pl,om,om_manual,ws,tc,wc,ot,confirm,created_by,created_at'
#     values = f'"MRN-{data.invoice}","{data.po_no}","{data.ot_desc}","{data.invoice}","{data.invoice_dt}","{data.lr_no}","{data.waybill}","{data.ic}","{data.og}","{data.dc}","{data.lr}","{data.wb}","{data.pl}","{data.om}","{data.om_manual}","{data.ws}","{data.tc}","{data.wc}","{data.ot}","{data.confirm}","{data.user}","{formatted_dt}"'
#     table_name = "td_item_delivery_invoice"
#     whr = f'invoice="{data.invoice}"' if result1['msg']['count'] > 0 else None
#     flag = 1 if result1['msg']['count']>0 else 0
#     result = await db_Insert(table_name, fields, values, whr, flag)
#     lastID=result["lastId"]
    
#     for i in data.items:
#         if i.rc_qty>0:
#                 fields= f'mrn_no,invoice,del_last_id,item_id,rc_qty,quantity,sl,remarks,po_no,created_by,created_at'
#                 values = f'"MRN-{data.invoice}","{data.invoice}","{lastID}","{i.item_id}","{i.rc_qty}","{i.quantity}","{i.sl}","{i.remarks}","{data.po_no}","{data.user}","{formatted_dt}"'
#                 table_name = "td_item_delivery_details"
#                 whr=f""
#                 flag1 =  0
#                 result2 = await db_Insert(table_name, fields, values, whr, flag1)
                
#                 if(result2['suc']>0):
#                     res_dt1 = {"suc": 1, "msg": f"Updated Successfully"}
#                 else:
#                     res_dt1= {"suc": 0, "msg": f"Error while updating item"}

#     if result['suc']>0 :
#                 res_dt = {"suc": 1, "msg": f"Updated Successfully"}
#     else:
#                  res_dt = {"suc": 0, "msg": f"Error while updating invoice"}
            
    
#     return res_dt



# @poRouter.post('/adddelivery')
# async def adddelivery(data:getDelivery):
#     res_dt = {}
#     print(data)
#     current_datetime = datetime.now()

    
#     select1 = "count(*) as count"
#     schema1 = "td_item_delivery_invoice"
#     where1 = f"invoice='{data.invoice}'"
#     order1 = ""
#     flag1 = 0 
#     result1 = await db_select(select1, schema1, where1, order1, flag1)
#     print(result1,'res')
   
#     formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")


#     fields= f'po_no="{data.po_no}",ot_desc="{data.ot_desc}",invoice="{data.invoice}",invoice_dt="{data.invoice_dt}",lr_no="{data.lr_no}",waybill="{data.waybill}",ic="{data.ic}",og="{data.og}",dc="{data.dc}",lr="{data.lr}",wb="{data.wb}",pl="{data.pl}",om="{data.om}",om_manual="{data.om_manual}",ws="{data.ws}",tc="{data.tc}",wc="{data.wc}",ot="{data.ot}",confirm="{data.confirm}",modified_by="{data.user}",modified_at="{formatted_dt}"' if result1['msg']['count'] > 0 else f'mrn_no,po_no,ot_desc,invoice,invoice_dt,lr_no,waybill,ic,og,dc,lr,wb,pl,om,om_manual,ws,tc,wc,ot,confirm,created_by,created_at'
#     values = f'"MRN-{data.invoice}","{data.po_no}","{data.ot_desc}","{data.invoice}","{data.invoice_dt}","{data.lr_no}","{data.waybill}","{data.ic}","{data.og}","{data.dc}","{data.lr}","{data.wb}","{data.pl}","{data.om}","{data.om_manual}","{data.ws}","{data.tc}","{data.wc}","{data.ot}","{data.confirm}","{data.user}","{formatted_dt}"'
#     table_name = "td_item_delivery_invoice"
#     whr = f'invoice="{data.invoice}"' if result1['msg']['count'] > 0 else None
#     flag = 1 if result1['msg']['count']>0 else 0
#     result = await db_Insert(table_name, fields, values, whr, flag)
#     lastID=result["lastId"]
    
#     for i in data.items:
#         if i.rc_qty>0:
#                 fields= f'mrn_no,invoice,del_last_id,prod_id,item_id,rc_qty,quantity,sl,remarks,po_no,created_by,created_at'
#                 values = f'"MRN-{data.invoice}","{data.invoice}","{lastID}","{i.prod_id}","{i.item_id}","{i.rc_qty}","{i.quantity}","{i.sl}","{i.remarks}","{data.po_no}","{data.user}","{formatted_dt}"'
#                 table_name = "td_item_delivery_details"
#                 whr=f""
#                 flag1 =  0
#                 result2 = await db_Insert(table_name, fields, values, whr, flag1)
                
#                 if(result2['suc']>0):

#                     flds= f'date,ref_no,proj_id,po_item_id,item_id,qty,in_out_flag,created_by,created_at'
#                     val = f'"{data.invoice_dt}","MRN-{data.invoice}",(SELECT project_id FROM td_po_basic WHERE po_no="{data.po_no}"),{i.item_id},(SELECT item_id FROM td_po_items WHERE sl_no="{i.item_id}"),{i.rc_qty},{data.in_out_flag},"{data.user}","{formatted_dt}"'
#                     table = "td_stock_new"
#                     whr=f""
#                     flag2 =  0
#                     result3 = await db_Insert(table, flds, val, whr, flag2)

#                     if(result3['suc']>0): 

#                         res_dt2 = {"suc": 1, "msg": f"Updated Successfully And Inserted to stock"}

#                     else:
#                         res_dt2= {"suc": 0, "msg": f"Error while inserting into td_stock_new"}

#                 else:
#                     res_dt1= {"suc": 0, "msg": f"Error while updating item"}

#     if result['suc']>0 :
#                 res_dt = {"suc": 1, "msg": f"Updated Successfully"}
#     else:
#                  res_dt = {"suc": 0, "msg": f"Error while updating invoice"}
            
    
#     return res_dt


@poRouter.post('/adddelivery')
async def adddelivery(data:getDelivery):
    res_dt = {}
    print(data)
    current_datetime = datetime.now()

    
    select1 = "count(*) as count"
    schema1 = "td_item_delivery_invoice"
    where1 = f"invoice='{data.invoice}'"
    order1 = ""
    flag1 = 0 
    result1 = await db_select(select1, schema1, where1, order1, flag1)
    print(result1,'res')
   
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")


    fields= f'po_no="{data.po_no}",ot_desc="{data.ot_desc}",invoice="{data.invoice}",invoice_dt="{data.invoice_dt}",lr_no="{data.lr_no}",waybill="{data.waybill}",ic="{data.ic}",og="{data.og}",dc="{data.dc}",lr="{data.lr}",wb="{data.wb}",pl="{data.pl}",om="{data.om}",om_manual="{data.om_manual}",ws="{data.ws}",tc="{data.tc}",wc="{data.wc}",ot="{data.ot}",confirm="{data.confirm}",modified_by="{data.user}",modified_at="{formatted_dt}"' if result1['msg']['count'] > 0 else f'mrn_no,po_no,ot_desc,invoice,invoice_dt,lr_no,waybill,ic,og,dc,lr,wb,pl,om,om_manual,ws,tc,wc,ot,confirm,created_by,created_at'
    values = f'"MRN-{data.invoice}","{data.po_no}","{data.ot_desc}","{data.invoice}","{data.invoice_dt}","{data.lr_no}","{data.waybill}","{data.ic}","{data.og}","{data.dc}","{data.lr}","{data.wb}","{data.pl}","{data.om}","{data.om_manual}","{data.ws}","{data.tc}","{data.wc}","{data.ot}","{data.confirm}","{data.user}","{formatted_dt}"'
    table_name = "td_item_delivery_invoice"
    whr = f'invoice="{data.invoice}"' if result1['msg']['count'] > 0 else None
    flag = 1 if result1['msg']['count']>0 else 0
    result = await db_Insert(table_name, fields, values, whr, flag)
    lastID=result["lastId"]
    
    for i in data.items:
        if i.rc_qty>0:
                fields= f'mrn_no,invoice,del_last_id,prod_id,item_id,rc_qty,quantity,sl,remarks,po_no,created_by,created_at'
                values = f'"MRN-{data.invoice}","{data.invoice}","{lastID}","{i.prod_id}","{i.item_id}","{i.rc_qty}","{i.quantity}","{i.sl}","{i.remarks}","{data.po_no}","{data.user}","{formatted_dt}"'
                table_name = "td_item_delivery_details"
                whr=f""
                flag1 =  0
                result2 = await db_Insert(table_name, fields, values, whr, flag1)
                
                # if(result2['suc']>0):

                #     flds= f'date,ref_no,proj_id,po_item_id,item_id,qty,in_out_flag,created_by,created_at'
                #     val = f'"{data.invoice_dt}","MRN-{data.invoice}",(SELECT project_id FROM td_po_basic WHERE po_no="{data.po_no}"),{i.item_id},(SELECT item_id FROM td_po_items WHERE sl_no="{i.item_id}"),{i.rc_qty},{data.in_out_flag},"{data.user}","{formatted_dt}"'
                #     table = "td_stock_new"
                #     whr=f""
                #     flag2 =  0
                #     result3 = await db_Insert(table, flds, val, whr, flag2)

                #     if(result3['suc']>0): 

                #         res_dt2 = {"suc": 1, "msg": f"Updated Successfully And Inserted to stock"}

                #     else:
                #         res_dt2= {"suc": 0, "msg": f"Error while inserting into td_stock_new"}

                # else:
                #     res_dt1= {"suc": 0, "msg": f"Error while updating item"}

    if result['suc']>0 :
                res_dt = {"suc": 1, "msg": f"Updated Successfully"}
    else:
                 res_dt = {"suc": 0, "msg": f"Error while updating invoice"}
            
    
    return res_dt

@poRouter.post('/add_delivery_files')
async def add_proj_files(po_no:str = Form(...),invoice:str = Form(...),docs1:Optional[Union[UploadFile, None]] = None, user:str = Form(...)):
    fileName = ''
    res_dt = {}
    files = []
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    if not docs1:
        return {"suc": 1, "msg": "No file sent"}
    else:
        if docs1:
            files.append(docs1)
     

        logging.info(f"Number of files received: {len(files)}")
        logging.info(f"Type of files received: {type(files)}")

        if(len(files) > 0):
            for f in files:
                fileName = ''
                fileName = None if not f else await uploadfileToLocal2(f)
                fields3= f'doc,po_no,invoice,created_by,created_at'
                values3 = f'"upload_delivery/{fileName}","{po_no}","{invoice}","{user}","{formatted_dt}"' 
                table_name3 = "td_item_delivery_doc"
                whr3 =  ""
                flag3 = 0
                # if(id==0):
                result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
                res_dt = result3
        return res_dt

async def uploadfileToLocal2(file):
    current_datetime = datetime.now()
    receipt = int(round(current_datetime.timestamp()))
    modified_filename = f"{receipt}_{file.filename}"
    res = ""
    try:
        file_location = os.path.join(UPLOAD_FOLDER3, modified_filename)
        print(file_location)
        
        with open(file_location, "wb") as f:
            f.write(await file.read())
        
        res = modified_filename
        print(res)
    except Exception as e:
        # res = e.args
        res = ""
    finally:
        return res

@poRouter.post('/getdelbypo')
async def gettcbypo(po:srcMdccbyPO):
    print(po.po)
    res_dt = {}
    select = "*"
    schema = "td_po_delivery_status"
    where = f"po_no like '%{po.po}%' and delete_flag='N'"
    # where = f"po_no like '%{po.po}%'"
    order = ""
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result   

@poRouter.post('/getdelbyid')
async def gettcbypo(id:GetPo):
    print(id.id)
    res_dt = {}
    select = "*"
    schema = "td_po_delivery_status"
    where = f"sl_no = '{id.id}'"
    order = ""
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result   


# @poRouter.post('/getpoitemforedit')
# async def getitemforedit(id:GetPo):

#     # print(id.id)
#     res_dt = {}

#     select = "i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name"
#     schema = "td_po_items i,md_product p"
#     where = f"i.item_id=p.sl_no and i.po_sl_no='{id.id}'" if id.id>0 else ""
#     order = ""
#     flag = 1 if id.id>0 else 0
#     result = await db_select(select, schema, where, order, flag)
#     # print(result, 'RESULT')
#     return result

# @poRouter.post('/getpoitemforedit')
# async def getitemforedit(id:GetPo):

#     # print(id.id)
#     res_dt = {}

#     select = f"i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name,(SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id) as stock"
#     schema = "td_po_items i,md_product p"
#     where = f"i.item_id=p.sl_no and i.po_sl_no='{id.id}'" if id.id>0 else ""
#     order = ""
#     flag = 1 if id.id>0 else 0
#     result = await db_select(select, schema, where, order, flag)
#     # print(result, 'RESULT')
#     return result


@poRouter.post('/getpoitemforedit')
async def getitemforedit(id:GetPo):

    # print(id.id)
    res_dt = {}

    select = f"i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name,(SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id=b.project_id) as project_stock, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id='0') as warehouse_stock"
    schema = "td_po_items i, td_po_basic b, md_product p"
    where = f"i.item_id=p.sl_no and i.po_sl_no=b.sl_no and i.po_sl_no='{id.id}'" if id.id>0 else ""
    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/deletecustomerdel')
async def deletecustomerdel(po_no:DeleteDelivery):
        current_datetime = datetime.now()
        res_dt={}
        formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

        fields=f'delete_flag="Y",deleted_by="{po_no.user}",deleted_at="{formatted_dt}"'
        table_name = "td_item_delivery_details"
        flag = 1 
        values=''
        whr=f'po_no="{po_no.po_no}" and item_id={po_no.item}'
        result = await db_Insert(table_name, fields, values, whr, flag)


        if(result['suc']>0):
                res_dt = {"suc": 1, "msg": "Deleted successfully!"}
        else:
                res_dt = {"suc": 0, "msg": "Error while deleting!"}
            
        return res_dt

@poRouter.post('/deleteitemdel')
async def deletecustomerdel(po_no:DeleteDelivery):
        current_datetime = datetime.now()
        res_dt={}
        formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

        fields=f'delete_flag="Y",deleted_by="{po_no.user}",deleted_at="{formatted_dt}"'
        table_name = "td_item_delivery_details"
        flag = 1 
        values=''
        whr=f'po_no="{po_no.po_no}" and sl_no={po_no.item}'
        result = await db_Insert(table_name, fields, values, whr, flag)


        if(result['suc']>0):
                res_dt = {"suc": 1, "msg": "Deleted successfully!"}
        else:
                res_dt = {"suc": 0, "msg": "Error while deleting!"}
            
        return res_dt

@poRouter.post('/getdeliverydoc')
async def check_proj_id(po_no:GetPoNo):
    print(po_no.po_no)
    res_dt = {}

    select = "po_no,sl_no,doc"
    schema = "td_item_delivery_doc"
    where = f"invoice='{po_no.po_no}' and delete_flag='N'"
    order = ""
    flag = 1 if po_no.po_no else 0
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@poRouter.post('/deletedeliverydoc')
async def deletetc(id:deleteDoc):
   current_datetime = datetime.now()
   res_dt={}
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

   fields=f'delete_flag="Y",deleted_by="{id.user}",deleted_at="{formatted_dt}"'
   table_name = "td_item_delivery_doc"
   flag = 1 
   values=''
   whr=f'po_no="{id.po_no}"'
   result = await db_Insert(table_name, fields, values, whr, flag)
   return result


# @poRouter.post('/getpoitemfordel')
# async def getprojectpoc(id:GetPo):
#     res_dt = {}

#     select = "i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name,d.rc_qty,d.sl,d.sl_no as item_sl,d.remarks,d.invoice,d.mrn_no,t.invoice_dt,d.created_at,d.created_by"
#     schema = "td_po_items i left join md_product p on i.item_id=p.sl_no left join td_item_delivery_details d on d.item_id=i.sl_no left join td_item_delivery_invoice t on t.invoice=d.invoice"
#     where = f"i.po_sl_no='{id.id}' and d.delete_flag='N'" if id.id>0 else ""
#     order = ""
#     flag = 1 if id.id>0 else 0
#     result = await db_select(select, schema, where, order, flag)
#     return result

@poRouter.post('/getpoitemfordel')
async def getprojectpoc(id:GetPo):
    # print(id.id)
    res_dt = {}

    select = "i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name,d.rc_qty,d.sl,d.sl_no as item_sl,d.remarks,d.invoice,d.mrn_no,t.invoice_dt,d.created_at,d.created_by,(SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id) as stock"
    schema = "td_po_items i left join md_product p on i.item_id=p.sl_no left join td_item_delivery_details d on d.item_id=i.sl_no left join td_item_delivery_invoice t on t.invoice=d.invoice"
    where = f"i.po_sl_no='{id.id}' and d.delete_flag='N'" if id.id>0 else ""
    order = ""
    flag = 1 if id.id>0 else 0
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/getstock')
async def getprojectpoc(id:GetStock):
    # print(id.id)
    res_dt = {}

    select = f"SUM(qty*in_out_flag) project_stock, (SELECT SUM(qty*in_out_flag) project_stock FROM td_stock_new where item_id={id.prod_id} and proj_id = 0) as warehouse_stock, sum(req_qty) req_qty"
    schema = "td_stock_new"
    where = f"item_id={id.prod_id} and proj_id ={id.proj_id}"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result
# @poRouter.post('/getpoitemfordel')
# async def getprojectpoc(id:GetPo):
#     # print(id.id)
#     res_dt = {}

#     select = "i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name,d.rc_qty,d.sl,d.sl_no as item_sl,d.remarks,d.invoice,d.mrn_no,t.invoice_dt,d.created_at,d.created_by,(SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id=b.project_id) as project_stock, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id='0') as warehouse_stock"
#     schema = "td_po_items i left join md_product p on i.item_id=p.sl_no left join td_item_delivery_details d on d.item_id=i.sl_no left join td_item_delivery_invoice t on t.invoice=d.invoice, td_po_basic b"
#     where = f"i.po_sl_no=b.sl_no and i.po_sl_no='{id.id}' and d.delete_flag='N'" if id.id>0 else ""
#     order = ""
#     flag = 1 if id.id>0 else 0
#     result = await db_select(select, schema, where, order, flag)
#     # print(result, 'RESULT')
#     return result


# @poRouter.post('/getpoitemfordel')
# async def getprojectpoc(id:GetPo):
#     # print(id.id)
#     res_dt = {}

#     select = "i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name,d.rc_qty,d.sl,d.sl_no as item_sl,d.remarks,d.invoice,d.mrn_no,t.invoice_dt,d.created_at,d.created_by,(SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id=b.project_id) as project_stock, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id='0') as warehouse_stock"
#     schema = "td_po_items i, md_product p, td_item_delivery_details d , td_item_delivery_invoice t, td_po_basic b, td_stock_new n"
#     where = f"i.item_id=p.sl_no and t.invoice=d.invoice and i.po_sl_no=b.sl_no and b.project_id=n.proj_id and i.item_id=n.item_id and n.item_id=d.prod_id and d.delete_flag='N' and i.po_sl_no='{id.id}'" if id.id>0 else ""
#     order = ""
#     flag = 1 if id.id>0 else 0
#     result = await db_select(select, schema, where, order, flag)
#     # print(result, 'RESULT')
#     return result


# @poRouter.post('/getpoitemfordel')
# async def getprojectpoc(id:GetPo):
#     # print(id.id)
#     res_dt = {}

#     select1="sl_no"
#     schema1 = "td_stock_new"
#     whr = f"po_item_id = (SELECT sl_no FROM td_po_items WHERE po_sl_no = {id.id})"
#     odr = ""
#     flg = 1
#     res_dt = await db_select(select1, schema1, whr, odr, flg)
#     print(res_dt["msg"])

#     select = "i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name, 0 rc_qty, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id=b.project_id) as project_stock, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id='0') as warehouse_stock" if res_dt["msg"]==[] else "i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name,d.rc_qty,d.sl,d.sl_no as item_sl,d.remarks,d.invoice,d.mrn_no,t.invoice_dt,d.created_at,d.created_by,(SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id=b.project_id) as project_stock, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=i.item_id and proj_id='0') as warehouse_stock"

#     schema = "td_po_items i, md_product p, td_item_delivery_details d , td_item_delivery_invoice t, td_po_basic b, td_stock_new n"
#     where = f"i.item_id=p.sl_no and t.invoice=d.invoice and i.po_sl_no=b.sl_no and b.project_id=n.proj_id and i.item_id=n.item_id and n.item_id=d.prod_id and d.delete_flag='N' and i.po_sl_no='{id.id}'" if id.id>0 else ""

#     order = ""
#     flag = 1 if id.id>0 else 0
#     result = await db_select(select, schema, where, order, flag)
#     return result

@poRouter.post('/check_po_no_for_del')
async def check_proj_id(po_no:GetPoNo):
    print(po_no.po_no)
    res_dt = {}

    select = "count(*) as count"
    schema = "td_po_basic"
    where = f"po_no='{po_no.po_no}' and po_status ='A'"
    order = ""
    flag = 1 if po_no.po_no else 0
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@poRouter.post('/add_log_files')
async def add_proj_files(po_sl_no:str = Form(...),docs1:Optional[Union[UploadFile, None]] = None, user:str = Form(...)):
    fileName = ''
    res_dt = {}
    files = []
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    if not docs1 :
        return {"suc": 1, "msg": "No file sent"}
    else:
        if docs1:
            files.append(docs1)
       

        logging.info(f"Number of files received: {len(files)}")
        logging.info(f"Type of files received: {type(files)}")

        if(len(files) > 0):
            for f in files:
                fileName = ''
                fileName = None if not f else await uploadfileToLocal4(f)
                fields3= f'doc,po_sl_no,created_by,created_at'
                values3 = f'"upload_log/{fileName}","{po_sl_no}","{user}","{formatted_dt}"' 
                table_name3 = "td_po_log_doc"
                whr3 =  ""
                flag3 = 0
                # if(id==0):
                result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
                res_dt = result3
        return res_dt

async def uploadfileToLocal4(file):
    current_datetime = datetime.now()
    receipt = int(round(current_datetime.timestamp()))
    modified_filename = f"{receipt}_{file.filename}"
    res = ""
    try:
        file_location = os.path.join(UPLOAD_FOLDER4, modified_filename)
        print(file_location)
        
        with open(file_location, "wb") as f:
            f.write(await file.read())
        
        res = modified_filename
        print(res)
    except Exception as e:
        # res = e.args
        res = ""
    finally:
        return res


@poRouter.post('/getlogdoc')  
async def gettcbypo(id:GetPo):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    select = "*"
    schema = "td_po_log_doc"
    where = f"po_sl_no='{id.id}'and delete_flag='N'" if id.id>0 else f""
    order = "ORDER BY created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@poRouter.post('/del_log_files')
async def getprojectpoc(id:delLog):
   current_datetime = datetime.now()
   res_dt={}
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

   fields=f'delete_flag="Y",deleted_by="{id.user}",deleted_at="{formatted_dt}"'
   table_name = "td_po_log_doc"
   flag = 1 
   values=''
   whr=f'sl_no="{id.id}" and po_sl_no={id.po_no}'
   result = await db_Insert(table_name, fields, values, whr, flag)
   if(result['suc']>0):
        res_dt = {"suc": 1, "msg": "Deleted successfully!"}
   else:
        res_dt = {"suc": 0, "msg": "Error while deleting!"}
       
   return res_dt


@poRouter.post('/add_vendor_receipt')
async def add_vendor_receipt(po_sl_no:str = Form(...), user:str = Form(...),docs1:Optional[Union[UploadFile, None]] = None):
    fileName = ''
    res_dt = {}
    files = []
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    if not docs1:
        return {"suc": 1, "msg": "No file sent"}
    else:
        if docs1:
            files.append(docs1)
       

        logging.info(f"Number of files received: {len(files)}")
        logging.info(f"Type of files received: {type(files)}")
        select = "count(*) as cnt"
        schema = "td_receipt_doc"
        where = f"po_sl_no='{po_sl_no}'"
        order = ""
        flag =  0
        result = await db_select(select, schema, where, order, flag)
        print(result['msg']['cnt'],'res')

        # print(result['msg']['cnt'])
        if(len(files) > 0):
            for f in files:
                fileName = ''
                fileName = None if not f else await uploadfileToLocal5(f)
                fields3= f'doc1,po_sl_no,created_by,created_at' if result['msg']['cnt']==0 else f'doc1="{f'upload_receipt/{fileName}'}",created_by="{user}",created_at="{formatted_dt}",deleted_flag="N"'
                values3 = f'"upload_receipt/{fileName}","{po_sl_no}","{user}","{formatted_dt}"' 
                table_name3 = "td_receipt_doc"
                whr3 =  "" if result['msg']['cnt']==0 else f"po_sl_no='{po_sl_no}'"
                flag3 = 0 if result['msg']['cnt']==0 else 1
                # if(id==0):
                result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
                res_dt = result3
        return res_dt

async def uploadfileToLocal5(file):
    current_datetime = datetime.now()
    receipt = int(round(current_datetime.timestamp()))
    modified_filename = f"{receipt}_{file.filename}"
    res = ""
    try:
        file_location = os.path.join(UPLOAD_FOLDER5, modified_filename)
        print(file_location)
        
        with open(file_location, "wb") as f:
            f.write(await file.read())
        
        res = modified_filename
        print(res)
    except Exception as e:
        # res = e.args
        res = ""
    finally:
        return res
    

@poRouter.post('/add_vendor_mdcc')
async def add_vendor_mdcc(po_sl_no:str = Form(...), user:str = Form(...),docs1:Optional[Union[UploadFile, None]] = None):
    fileName = ''
    res_dt = {}
    files = []
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    if not docs1:
        return {"suc": 1, "msg": "No file sent"}
    else:
        if docs1:
            files.append(docs1)
       

        logging.info(f"Number of files received: {len(files)}")
        logging.info(f"Type of files received: {type(files)}")

        if(len(files) > 0):
             select = "count(*) as cnt"
             schema = "td_receipt_doc"
             where = f"po_sl_no='{po_sl_no}'"
             order = ""
             flag =  0
             result = await db_select(select, schema, where, order, flag)
             print(result['msg']['cnt'],'res')
            #  if result['msg']['cnt']==0:
             for f in files:
                fileName = ''
                fileName = None if not f else await uploadfileToLocal6(f)
                fields3=  f'mdcc_doc,po_sl_no,mdcc_created_by,mdcc_created_at' if result['msg']['cnt']==0 else f'mdcc_doc="{f'upload_vendor_mdcc/{fileName}'}",mdcc_created_by="{user}",mdcc_created_at="{formatted_dt}",mdcc_delete_flag="N"'
                values3 = f'"upload_vendor_mdcc/{fileName}","{po_sl_no}","{user}","{formatted_dt}"' 
                table_name3 = "td_receipt_doc"
                whr3 =  "" if result['msg']['cnt']==0 else f"po_sl_no='{po_sl_no}'"

                flag3 =  0 if result['msg']['cnt']==0 else 1
                # if(id==0):
                result3 = await db_Insert(table_name3, fields3, values3, whr3, flag3)
                res_dt = result3
        return res_dt

async def uploadfileToLocal6(file):
    current_datetime = datetime.now()
    receipt = int(round(current_datetime.timestamp()))
    modified_filename = f"{receipt}_{file.filename}"
    res = ""
    try:
        file_location = os.path.join(UPLOAD_FOLDER6, modified_filename)
        print(file_location)
        
        with open(file_location, "wb") as f:
            f.write(await file.read())
        
        res = modified_filename
        print(res)
    except Exception as e:
        # res = e.args
        res = ""
    finally:
        return res
    

@poRouter.post('/getreceiptdoc')  
async def getreceiptdoc(id:GetPo):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    select = "*"
    schema = "td_receipt_doc"
    where = f"po_sl_no='{id.id}' and deleted_flag='N'" if id.id>0 else f""
    order = "ORDER BY created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/getvendormdcc')  
async def getreceiptdoc(id:GetPo):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    select = "*"
    schema = "td_receipt_doc"
    where = f"po_sl_no='{id.id}' and mdcc_delete_flag='N'" if id.id>0 else f""
    order = "ORDER BY created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@poRouter.post('/deletevendorreceipt')
async def deletetc(id:deleteReceipt):
   current_datetime = datetime.now()
   res_dt={}
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

   fields=f'deleted_flag="Y",deleted_by="{id.user}",deleted_at="{formatted_dt}"'
   table_name = "td_receipt_doc"
   flag = 1 
   values=''
   whr=f'sl_no="{id.id}"'
   result = await db_Insert(table_name, fields, values, whr, flag)
   if(result['suc']>0 ):
        res_dt = {"suc": 1, "msg": "Deleted successfully!"}
   else:
        res_dt = {"suc": 0, "msg": "Error while deleting!"}
       
   return res_dt


@poRouter.post('/deletevendormdcc')
async def deletetc(id:deleteReceipt):
   current_datetime = datetime.now()
   res_dt={}
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

   fields=f'mdcc_delete_flag="Y",mdcc_deleted_by="{id.user}",mdcc_deleted_at="{formatted_dt}"'
   table_name = "td_receipt_doc"
   flag = 1 
   values=''
   whr=f'sl_no="{id.id}"'
   result = await db_Insert(table_name, fields, values, whr, flag)
   if(result['suc']>0 ):
        res_dt = {"suc": 1, "msg": "Deleted successfully!"}
   else:
        res_dt = {"suc": 0, "msg": "Error while deleting!"}
       
   return res_dt


@poRouter.post('/get_price_basis_desc')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct price_basis_desc"
    schema = "td_po_terms_condition"
    where = f"price_basis_desc like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_freight_insurance_val')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct freight_ins_val"
    schema = "td_po_terms_condition"
    where = f"freight_ins_val like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_insurance_val')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct ins_val"
    schema = "td_po_terms_condition"
    where = f"ins_val like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_test_certificate_desc')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct test_certificate_desc"
    schema = "td_po_terms_condition"
    where = f"test_certificate_desc like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_om_manual_desc')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct o_m_desc"
    schema = "td_po_terms_condition"
    where = f"o_m_desc like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_oi_desc')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct operation_installation_desc"
    schema = "td_po_terms_condition"
    where = f"operation_installation_desc like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_manufacture_clearance_desc')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct manufacture_clearance_desc"
    schema = "td_po_terms_condition"
    where = f"manufacture_clearance_desc like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_others_ld')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct ld_date_desc"
    schema = "td_po_terms_condition"
    where = f"ld_date_desc like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_others_applied')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct ld_val_desc"
    schema = "td_po_terms_condition"
    where = f"ld_val_desc like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_term_dtls')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct terms_dtls"
    schema = "td_po_payment_dtls"
    where = f"terms_dtls like '%{wrd.wrd}%'"
    order = "ORDER BY modified_at,created_at DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@poRouter.post('/get_mdcc_scope')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct mdcc_scope"
    schema = "td_po_more"
    where = f"mdcc_scope like '%{wrd.wrd}%'"
    order = "ORDER BY modified_dt,created_dt DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_draw_scope')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct draw_scope"
    schema = "td_po_more"
    where = f"draw_scope like '%{wrd.wrd}%'"
    order = "ORDER BY modified_dt,created_dt DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@poRouter.post('/get_inspection_scope')  
async def getreceiptdoc(wrd:GetPhrase):
    print('I am logging in!')
    # print(id.id)
    res_dt = {}
    select = "distinct inspection_scope"
    schema = "td_po_more"
    where = f"inspection_scope like '%{wrd.wrd}%'"
    order = "ORDER BY modified_dt,created_dt DESC"
    flag =  1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@poRouter.post('/addamendnote')
async def approvepo(id:approvePO):
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'amend_note="{id.status}",modified_by="{id.user}",modified_at="{formatted_dt}"'
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


@poRouter.post('/getmindel')
async def getprojectpoc(data:GetPo):
    select = "i.sl_no,i.po_sl_no,i.item_id,d.rc_qty,i.currency,p.prod_name,m.opening_qty,m.issue_qty,m.po_no,m.purpose,m.notes,m.approve_status"
    schema = "td_po_items i left join md_product p on i.item_id=p.sl_no left join td_min m on m.item_id=i.sl_no left join td_item_delivery_details d on d.item_id=i.sl_no and d.delete_flag='N'"
    # where = f"i.po_sl_no='{data.id}' " if data.id>0 else ""
    where = f"i.po_sl_no='{data.id}'" if data.id>0 else "d.delete_flag='N'"
    order = ""
    # flag = 1 if id.id>0 else 0
    flag =1
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/addmin')
async def addmin(data:AddMin):
   print(data)
   current_datetime = datetime.now()
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
   select1 = "count(*) as count"
   schema1 = "td_min"
   where1 = f"req_no='{data.req_no}'"
   order1 = ""
   flag1 = 0 
   result1 = await db_select(select1, schema1, where1, order1, flag1)
   print(result1,'res')

   for v in data.min:
        # fields= f'opening_qty="{v.quantity}", issue_qty="{v.issue_qty}",req_no="{data.req_no}",purpose="{v.purpose}",notes="{v.notes}",modified_by="{data.user}",modified_at="{formatted_dt}"' if result1['msg']['count'] > 0 else f'item_id,opening_qty,issue_qty,req_no,purpose,notes,created_by,created_at'
        fields= f'item_id,opening_qty,min_dt,issue_qty,req_no,purpose,notes,created_by,created_at'
        values = f'"{v.item_id}","{v.quantity}","{data.min_dt}","{v.issue_qty}","{data.req_no}","{v.purpose}","{v.notes}","{data.user}","{formatted_dt}"'
        table_name = "td_min"
        # whr =  f'item_id="{v.sl_no}" and req_no="{data.req_no}"' if  result1['msg']['count'] > 0 else ''
        whr =  ''
        # flag = 1 if result1['msg']['count'] > 0 else 0
        flag = 0
        result = await db_Insert(table_name, fields, values, whr, flag)
    
        if result['suc']:
         res_dt = {"suc": 1, "msg": f"Update successfully!"}
        else:
         res_dt = {"suc": 0, "msg": f"Error while updating!"}
  
   return res_dt


@poRouter.post('/getMRN')
async def addmin(data:GetPo):
   print(data)
   current_datetime = datetime.now()
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
   res_dt = {}
   select = "distinct b.po_no,d.created_by,d.created_at,b.sl_no"
   schema = "td_item_delivery_details d,td_po_basic b"
   where = f"b.po_no=d.po_no and d.delete_flag='N'"
   order = "ORDER BY d.created_at DESC"
   flag =  1
   result = await db_select(select, schema, where, order, flag)
   print(result, 'RESULT')
   return result

@poRouter.post('/getMRNPo')
async def addmin(data:GetPo):
   print(data)
   current_datetime = datetime.now()
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
   res_dt = {}
   select = "b.po_no,d.created_by,d.created_at,b.sl_no,d.mrn_no"
   schema = "td_po_basic b left join td_item_delivery_invoice d on b.po_no=d.po_no"
   where = f"b.po_status='A'"
   order = "ORDER BY d.created_at DESC"
   flag =  1
   result = await db_select(select, schema, where, order, flag)
   print(result, 'RESULT')
   return result


@poRouter.post("/item_dtls")
async def item_dtls(data:ProjId):
    select = "c.prod_name, c.sl_no prod_id, sum(b.rc_qty) tot_rc_qty"
    table = "td_po_basic a, md_product c LEFT JOIN td_po_items d ON c.sl_no=d.item_id LEFT JOIN td_item_delivery_details b ON d.sl_no=b.item_id"
    where = f"a.po_no=b.po_no and a.project_id={data.Proj_id} group by prod_id"
    order = ""
    flag = 1 
    res_dt = await db_select(select,table,where,order,flag)
    return res_dt





@poRouter.post('/save_requisition')
async def save_requisition(data:SaveReq):
    res_dt = {}
    print(data)
    current_datetime = datetime.now()
    reqNo = int(round(current_datetime.timestamp()))
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")


    fields= f"intended_for='{data.intended_for}',approve_flag='P', project_id={data.project_id},  purpose='{data.purpose}', modified_by='{data.user}',client_id='{data.client_id}' modified_at='{formatted_dt}'" if data.sl_no > 0 else f"req_no,intended_for,req_date,project_id,client_id,purpose,created_by,created_at"
    values = f"'REQ-{reqNo}', '{data.intended_for}', '{data.req_date}', {data.project_id},'{data.client_id}', '{data.purpose}','{data.user}','{formatted_dt}'"
    table_name = "td_requisition"
    whr = f'sl_no={data.sl_no}' if data.sl_no > 0 else None
    flag = 1 if data.sl_no>0 else 0
    result = await db_Insert(table_name, fields, values, whr, flag)
    lastID=result["lastId"]
    
    for i in data.items:
                fields= f"req_qty={i.req_qty}" if data.sl_no>0 else f'req_no,last_req_id,item_id,rc_qty,req_qty,created_by,created_at'
                values = f'"REQ-{reqNo}","{lastID}","{i.item_id}","{i.rc_qty}","{i.req_qty}","{data.user}","{formatted_dt}"'
                table_name = "td_requisition_items"
                whr=f"item_id={i.item_id} and last_req_id={data.sl_no}"   if data.sl_no > 0 else ""
                # flag1 = 1 if v.sl_no>0 else 0
                flag1 = 1 if data.sl_no>0 else 0
                result2 = await db_Insert(table_name, fields, values, whr, flag1)
                
                if(result2['suc']>0):
                    # balance = i.rc_qty-i.req_qty
                    # flds= f'ref_no,date,proj_id,item_id,req_qty,qty,in_out_flag,created_by,created_at'
                    flds= f'ref_no,date,proj_id,item_id,req_qty,in_out_flag,created_by,created_at'
                    val = f'"REQ-{reqNo}","{formatted_dt}",{data.project_id},{i.item_id},{i.req_qty},{data.in_out_flag},"{data.user}","{formatted_dt}"'
                    table = "td_stock_new"
                    whr=f""
                    flag2 =  0
                    result3 = await db_Insert(table, flds, val, whr, flag2)

                    if(result3['suc']>0): 

                        res_dt2 = {"suc": 1, "msg": f"Saved Successfully And Inserted to stock"}

                    else:
                        res_dt2= {"suc": 0, "msg": f"Error while inserting into td_stock_new"}
                else:
                    res_dt1= {"suc": 0, "msg": f"Error while updating item"}

    if result['suc']>0 :
                res_dt = {"suc": 1, "msg": f"Saved Successfully"}
    else:
                 res_dt = {"suc": 0, "msg": f"Error while updating invoice"}
            
    
    return res_dt


@poRouter.post('/get_requisition')
async def get_requisition(data:GetPo):
    print('I am logging in!')
    print(data.id)
    res_dt = {}
    # SELECT @a:=@a+1 serial_number, busi_act_name FROM md_busi_act, (SELECT @a:= 0) AS a
    select = "@a:=@a+1 serial_number,reason, req_no,intended_for,req_date, req_type,approve_flag,purpose,project_id,client_id, created_by,created_at,modified_by,modified_at,sl_no"
    # select = "@a:=@a+1 serial_number, *"
    schema = "td_requisition,(SELECT @a:= 0) AS a"
    where = f"sl_no='{data.id}' and delete_flag='N'" if data.id>0 else f"delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 0 if data.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

# @poRouter.post('/req_item_dtls')
# async def req_item_dtls(data:ReqId):
#     select = "a.sl_no, a.last_req_id, a.req_no, a.item_id, b.prod_name, a.rc_qty, a.req_qty"
#     table = "td_requisition_items a left join md_product b on a.item_id=b.sl_no"
#     where = f"a.last_req_id = {data.last_req_id}"
#     order = ""
#     flag = 1 
#     res_dt = await db_select(select,table,where,order,flag)
#     print(res_dt["msg"])   
#     return res_dt


# @poRouter.post('/req_item_dtls')
# async def req_item_dtl(data:ReqId):
#     select = "a.sl_no, a.last_req_id, a.req_no, a.item_id, b.prod_name, a.rc_qty, a.req_qty, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=a.item_id) as stock"
#     table = "td_requisition_items a left join md_product b on a.item_id=b.sl_no"
#     where = f"a.last_req_id = {data.last_req_id}"
#     order = ""
#     flag = 1 
#     res_dt = await db_select(select,table,where,order,flag)
#     print(res_dt["msg"])   
#     return res_dt

@poRouter.post('/req_item_dtls')
async def req_item_dtl(data:ReqId):
    select = "a.sl_no, a.last_req_id, a.req_no, a.item_id, b.prod_name, a.rc_qty, a.req_qty, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=a.item_id and proj_id=c.project_id) as project_stock, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=a.item_id and proj_id='0') as warehouse_stock, c.project_id"
    table = "td_requisition_items a left join md_product b on a.item_id=b.sl_no, td_requisition c"
    where = f"a.last_req_id=c.sl_no and a.last_req_id = {data.last_req_id}" if data.last_req_id>0 else f"a.last_req_id=c.sl_no"
    order = ""
    flag = 1 
    res_dt = await db_select(select,table,where,order,flag)
    print(res_dt["msg"])   
    return res_dt

@poRouter.post('/get_mrn_list')
async def req_item_dtls(data:getMrnList):
    select = "*"
    table = "td_item_delivery_invoice"
    where = f"po_no = '{data.last_req_id}'"
    order = ""
    flag = 1 
    res_dt = await db_select(select,table,where,order,flag)
    print(res_dt["msg"])   
    return res_dt

@poRouter.post('/get_received_items')
async def req_item_dtls(data:MrnId):
    select = "i.sl_no,i.po_sl_no,i.item_id,i.quantity,i.currency,p.prod_name,d.rc_qty,d.sl,d.sl_no as item_sl,d.remarks,d.invoice,t.invoice_dt,d.mrn_no,d.created_at,d.created_by"
    schema = "td_po_items i left join md_product p on i.item_id=p.sl_no left join td_item_delivery_details d on d.item_id=i.sl_no left join td_item_delivery_invoice t on d.invoice=t.invoice "
    where = f"i.po_sl_no='{data.id}' and d.invoice='{data.invoice}' and d.delete_flag='N'" 
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    return result

# @poRouter.post('/get_item_dtls')
# async def get_item_dtls(data:ProjId):
#     select = "b.sl_no,b.project_id,b.po_no,c.po_sl_no,c.quantity,c.item_id,p.prod_name,c.sl_no as po_item_no,d.mrn_no,d.rc_qty"
#     schema = "td_po_basic b LEFT JOIN td_po_items c on c.po_sl_no = b.sl_no left join md_product p on c.item_id=p.sl_no left join td_item_delivery_details d on d.item_id=c.sl_no"
#     where = f"b.project_id={data.Proj_id}"

#     order = ""
#     flag = 1 
#     result = await db_select(select, schema, where, order, flag)

        
#     return result

@poRouter.post('/get_item_dtls')
async def get_item_dtls(data:ProjId):
    select = "b.sl_no,b.project_id,b.po_no,c.po_sl_no,c.quantity,c.item_id,p.prod_name,c.sl_no as po_item_no,d.mrn_no,d.rc_qty"
    schema = "td_po_basic b LEFT JOIN td_po_items c on c.po_sl_no = b.sl_no left join md_product p on c.item_id=p.sl_no left join td_item_delivery_details d on d.item_id=c.sl_no"
    where = f"b.project_id={data.Proj_id}"
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)

        
    return result


@poRouter.post("/item_req_dtls")
async def item_dtls(data:ProjId):
    select = "c.prod_name, c.sl_no prod_id, sum(b.rc_qty) tot_rc_qty"
    table = "td_po_basic a, md_product c LEFT JOIN td_po_items d ON c.sl_no=d.item_id LEFT JOIN td_requisition_items b ON d.sl_no=b.item_id"
    where = f"a.po_no=b.po_no and a.project_id={data.Proj_id} group by prod_id"
    order = ""
    flag = 1 
    res_dt = await db_select(select,table,where,order,flag)
    return res_dt


@poRouter.post("/get_req_min")
async def item_dtls(data:ProjId):
    select = "*"
    table = "td_requisition"
    where = f"sl_no={data.Proj_id}"
    order = ""
    flag = 1 
    res_dt = await db_select(select,table,where,order,flag)
    return res_dt

# @poRouter.post("/get_item_req_min")
# async def item_dtls(data:ProjId):
#     select = "*"
#     table = "td_requisition_items"
#     where = f"last_req_id={data.Proj_id}"
#     order = ""
#     flag = 1 
#     res_dt = await db_select(select,table,where,order,flag)
#     return res_dt

# @poRouter.post("/get_item_req_min")
# async def item_dtls(data:req_id):
#     select = "c.prod_name,b.sl_no,b.last_req_id,b.item_id,b.rc_qty,b.req_qty"
#     table = "md_product c LEFT JOIN td_requisition_items b ON c.sl_no=b.item_id"
#     where = f"b.last_req_id={data.Proj_id} "
#     order = ""
#     flag = 1 
#     res_dt = await db_select(select,table,where,order,flag)
#     return res_dt

# @poRouter.post("/get_item_req_min")
# async def item_dtls(data:req_id):
#     select = "c.prod_name,b.sl_no,b.last_req_id,b.item_id,b.rc_qty,b.req_qty, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=b.item_id) as stock"
#     table = "md_product c LEFT JOIN td_requisition_items b ON c.sl_no=b.item_id"
#     where = f"b.last_req_id={data.Proj_id} "
#     order = ""
#     flag = 1 
#     res_dt = await db_select(select,table,where,order,flag)
#     return res_dt

@poRouter.post("/get_item_req_min")
async def item_dtls(data:req_id):
    select = "c.prod_name,b.sl_no,b.last_req_id,b.item_id,b.rc_qty,b.req_qty, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=b.item_id and proj_id=a.project_id) as project_stock, (SELECT SUM(qty*in_out_flag) FROM `td_stock_new` WHERE item_id=b.item_id and proj_id='0') as warehouse_stock"
    table = "md_product c LEFT JOIN td_requisition_items b ON c.sl_no=b.item_id left join td_requisition a on b.last_req_id=a.sl_no"
    where = f"b.last_req_id={data.Proj_id} "
    order = ""
    flag = 1 
    res_dt = await db_select(select,table,where,order,flag)
    return res_dt

@poRouter.post('/approve_req')
async def approvepo(id:approveReq):
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'approve_flag="{id.status}",modified_by="{id.user}",modified_at="{formatted_dt}",reason="{id.reason}"'
    values = f''
    table_name = "td_requisition"
    whr = f'sl_no="{id.id}"' if id.id > 0 else None
    flag = 1 if id.id>0 else 0

    result = await db_Insert(table_name, fields, values, whr, flag)
    if result['suc']:
        
        if id.status == "R":

            for i in id.items:

                flds= f'date,proj_id,item_id,req_qty,qty,in_out_flag,created_by,created_at'
                val = f'"{formatted_dt}",{id.project_id},{i.item_id},{i.req_qty},{i.req_qty},{id.in_out_flag},"{id.user}","{formatted_dt}"'
                table = "td_stock_new"
                whr=f""
                flag2 =  0
                result3 = await db_Insert(table, flds, val, whr, flag2)

                if(result3['suc']>0): 

                    res_dt = {"suc": 1, "msg": f"Saved Successfully"}

                else:
                    res_dt = {"suc": 0, "msg": f"Error while inserting "}

        else:
            res_dt = {"suc": 1, "msg": f"Action Successful!"}

    else:
        res_dt = {"suc": 0, "msg": f"Error while saving!"}
  
    return res_dt


@poRouter.post("/testing")
async def item_dtls(data:ReqNo):
    select = f"a.sl_no, a.item_id, a.opening_qty, a.issue_qty, (select SUM(issue_qty) from td_min where req_no='{data.req_no}' and item_id=a.item_id group by item_id) as tot_issue_qty, a.req_no, a.purpose, a.notes, a.approve_status, a.created_by, a.created_at, a.modified_by, a.modified_at, a.deleted_by, a.deleted_at, a.delete_flag"
    table = "td_min a left join td_requisition_items b on a.item_id=b.item_id"
    where = f"a.req_no='{data.req_no}'"
    order = ""
    flag = 1 
    res_dt = await db_select(select,table,where,order,flag)
    return res_dt

@poRouter.post("/get_proj_id")
async def item_dtls(data:ProjId):
    select = "proj_id,proj_name"
    table = "td_project"
    where = f"sl_no={data.Proj_id}"
    order = ""
    flag = 1 
    res_dt = await db_select(select,table,where,order,flag)
    return res_dt


@poRouter.post('/checkmin')
async def addmin(data:ReqNo):
   print(data)
   current_datetime = datetime.now()
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
   select1 = "count(*) as count"
   schema1 = "td_min"
   where1 = f"req_no='{data.req_no}'"
   order1 = ""
   flag1 = 0 
   result1 = await db_select(select1, schema1, where1, order1, flag1)
   print(result1,'res')

   return result1['msg']['count']

@poRouter.post('/checkinvoice')
async def checkinvoice(inv_no:CheckInvoice):
   current_datetime = datetime.now()
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
   select1 = "count(*) as count"
   schema1 = "td_item_delivery_invoice"
   where1 = f"invoice='{inv_no.inv_no}'"
   order1 = ""
   flag1 = 0 
   result1 = await db_select(select1, schema1, where1, order1, flag1)
   print(result1,'res')

   return result1


@poRouter.post('/deletemrn')
async def deletetc(id:deleteMrn):
   current_datetime = datetime.now()
   res_dt={}
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

   fields=f''
   table_name = "td_item_delivery_invoice"
   flag = 1 
   values=''
   whr=f'mrn_no="MRN-{id.id}"'
   result = await db_Delete(table_name, whr)
 
   fields1=f''
   table_name1 = "td_item_delivery_details"
   flag1 = 1 
   values1=''
   whr1=f'mrn_no="MRN-{id.id}"'
   result1 = await db_Delete(table_name1, whr1)


   fields2=f''
   table_name2 = "td_item_delivery_doc"
   flag2 = 1 
   values2=''
   whr2=f'invoice="{id.id}"'
   result2 = await db_Delete(table_name2, whr2)


#    fields3=f''
#    table_name3 = "td_stock_new"
#    flag3 = 1 
#    values3=''
#    whr3=f'ref_no="MRN-{id.id}"'
#    result3 = await db_Delete(table_name3, whr3)


#    if(result['suc']>0 and result2['suc']>0 and result3['suc']>0 and result1['suc']>0):
   if(result['suc']>0 and result2['suc']>0 and result1['suc']>0):
        res_dt = {"suc": 1, "msg": "Deleted successfully!"}
   else:
        res_dt = {"suc": 0, "msg": "Error while deleting!"}
       
   return res_dt



@poRouter.post('/deleterequisition')
async def deletetc(id:deleteMrn):
   current_datetime = datetime.now()
   res_dt={}
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

   fields=f''
   table_name = "td_requisition"
   flag = 1 
   values=''
   whr=f'req_no="{id.id}"'
   result = await db_Delete(table_name, whr)
 
   fields1=f''
   table_name1 = "td_requisition_items"
   flag1 = 1 
   values1=''
   whr1=f'req_no="{id.id}"'
   result1 = await db_Delete(table_name1, whr1)



   fields3=f''
   table_name3 = "td_stock_new"
   flag3 = 1 
   values3=''
   whr3=f'ref_no="{id.id}"'
   result3 = await db_Delete(table_name3, whr3)


   if(result['suc']>0 and  result3['suc']>0 and result1['suc']>0):
        res_dt = {"suc": 1, "msg": "Deleted successfully!"}
   else:
        res_dt = {"suc": 0, "msg": "Error while deleting!"}
       
   return res_dt



# @poRouter.post('/advanced_search_po')
# async def getprojectpoc(id:PoSearch):
#     # print(id.id)
#     res_dt = {}

#     select = "b.po_no,b.sl_no,b.fresh_flag,b.po_status,b.amend_flag,b.project_id,b.vendor_id,v.vendor_name,d.proj_name,b.po_issue_date,i.item_id,p.prod_name,p.prod_make,p.part_no,b.created_by,b.created_at"
#     schema = '''td_po_basic b left join td_po_items i on b.sl_no = i.po_sl_no
# left join md_product p ON p.sl_no=i.item_id left join md_vendor v on b.vendor_id=v.sl_no left join td_project d on b.project_id = d.sl_no
# '''
#     where = f"({f"b.project_id='{id.project_id}' or" if id.project_id != 
#                 '' else ""} b.vendor_id='{id.vendor_id}' or p.part_no like '%{id.part_no}%' or i.item_id='{id.prod_id}' or (b.po_issue_date between {f'{id.from_dt}' if(id.from_dt != '') else 'NULL'} and {f'{id.to_dt}' if(id.to_dt != '') else 'NULL'})) AND (b.project_id IS NOT NULL AND b.vendor_id IS NOT NULL AND p.part_no IS NOT NULL and i.item_id is not null and b.po_issue_date is not null) "
    
#     order = "ORDER BY b.created_at DESC"
#     flag = 1
#     result = await db_select(select, schema, where, order, flag)
#     # print(result, 'RESULT')
#     return result

@poRouter.post('/advanced_search_po')
async def getprojectpoc(id:PoSearch):
   
    res_dt = {}

    select = "b.po_no,b.sl_no,b.fresh_flag,b.po_status,b.amend_flag,b.project_id,b.vendor_id,v.vendor_name,d.proj_name,b.po_issue_date,i.item_id,p.prod_name,p.prod_make,p.part_no,b.created_by,b.created_at"
    schema = '''td_po_basic b left join td_po_items i on b.sl_no = i.po_sl_no
left join md_product p ON p.sl_no=i.item_id left join md_vendor v on b.vendor_id=v.sl_no left join td_project d on b.project_id = d.sl_no
'''
    where = ""
    if(id.project_id != 0 and id.project_id != ""):
        where += f"b.project_id='{id.project_id}' {"AND " if(id.vendor_id != '' or id.part_no != '' or id.prod_id != '' or id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.vendor_id != 0 and id.vendor_id != ""):
        where += f"b.vendor_id='{id.vendor_id}' {"AND " if(id.part_no != '' or id.prod_id != '' or id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.part_no != ''):
        where += f"p.part_no like '%{id.part_no}%' {"AND " if(id.prod_id != '' or id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.prod_id != ''):
        where += f"i.item_id='{id.prod_id}' {"AND " if(id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.make!= ''):
         where += f"p.prod_make like '%{id.make}%' {"AND " if(id.to_dt != '' or id.from_dt !='') else ''}"
    if(id.to_dt != '' or id.from_dt != ''):
        where += f'''(b.po_issue_date BETWEEN "{f'{id.from_dt}' if(id.from_dt != '') else ''}" and "{f'{id.to_dt}' if(id.to_dt != '') else ''}") '''

    where = f"{f'({where}) AND ' if(where != '') else ''}" + f"(b.project_id IS NOT NULL AND b.vendor_id IS NOT NULL AND p.part_no IS NOT NULL and i.item_id is not null and b.po_issue_date is not null)"
    
    order = "ORDER BY b.created_at DESC"
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    return result



# @poRouter.post('/advanced_search_requisition')
# async def getprojectpoc(id:PoSearch):
#     # print(id.id)
#     res_dt = {}

#     select = "r.req_no,r.approve_flag,r.project_id,d.proj_name,r.req_date,d.proj_name,i.item_id,p.prod_name,p.prod_make,p.part_no,r.created_by,r.created_at"
#     schema = '''td_requisition_items i left join  md_product p ON p.sl_no=i.item_id  left join td_requisition r on r.req_no = i.req_no left join td_project d on r.project_id = d.sl_no
# '''
#     # where = f"r.project_id='{id.project_id}' or p.part_no like '%{id.part_no}%' i.item_id='{id.prod_id}' or r.req_date>={id.from_dt} and r.req_date<={id.to_dt}"

#     where = f"({f'r.project_id="{id.project_id}" or' if id.project_id != 
#                 '' else ''} p.part_no like '%{id.part_no}%' or i.item_id='{id.prod_id}' or (r.req_date between {f'{id.from_dt}' if(id.from_dt != '') else 'NULL'} and {f'{id.to_dt}' if(id.to_dt != '') else 'NULL'})) AND (r.project_id IS NOT NULL AND p.part_no IS NOT NULL and i.item_id is not null and r.req_date is not null)"
#     order = "ORDER BY r.created_at DESC"
    
#     flag = 1
#     result = await db_select(select, schema, where, order, flag)
#     # print(result, 'RESULT')
#     return result


@poRouter.post('/advanced_search_requisition')
async def getprojectpoc(id:PoSearch):
    res_dt = {}

    select = "r.req_no,r.sl_no,r.approve_flag,r.project_id,d.proj_name,r.req_date,d.proj_name,i.item_id,p.prod_name,p.prod_make,p.part_no,r.created_by,r.created_at"
    schema = '''td_requisition_items i left join  md_product p ON p.sl_no=i.item_id  left join td_requisition r on r.req_no = i.req_no left join td_project d on r.project_id = d.sl_no'''

    where = ""
    if(id.project_id != 0 and id.project_id!=""):
        where += f"r.project_id='{id.project_id}' {"AND " if(id.part_no != '' or id.prod_id != '' or id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.part_no != ''):
        where += f"p.part_no like '%{id.part_no}%' {"AND " if(id.prod_id != '' or id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.prod_id != ''):
        where += f"i.item_id='{id.prod_id}' {"AND " if(id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.make!=''):
        where += f"p.prod_make like '%{id.make}%' {"AND " if(id.to_dt != '' or id.from_dt != '') else ''}"
    if(id.to_dt != '' or id.from_dt != ''):
        where += f'''(r.req_date BETWEEN "{f'{id.from_dt}' if(id.from_dt != '') else ''}" and "{f'{id.to_dt}' if(id.to_dt != '') else ''}") '''

    where = f"{f'({where}) AND ' if(where != '') else ''}" + f"(r.project_id IS NOT NULL AND p.part_no IS NOT NULL and i.item_id is not null and r.req_date is not null)"

    order = "ORDER BY r.created_at DESC"
    
    flag = 1
    result = await db_select(select, schema, where, order, flag)
   
    return result


# @poRouter.post('/advanced_search_delivery')
# async def getprojectpoc(id:PoSearch):
#     # print(id.id)
#     res_dt = {}

#     select = "d.invoice,d.invoice_dt,d.po_no,pr.sl_no,pr.proj_name,b.vendor_id,v.vendor_name,i.sl_no item_delivery_no,i.prod_id,p.prod_name,p.prod_make,p.part_no"
#     schema = '''td_item_delivery_invoice d left join td_po_basic b on b.po_no = d.po_no left join td_project pr on pr.sl_no = b.project_id left join td_item_delivery_details i on i.invoice=d.invoice left join md_product p on i.prod_id = p.sl_no left join md_vendor v on v.sl_no=b.vendor_id
# '''
#     where = f"b.project_id='{id.project_id}' or b.vendor_id='{id.vendor_id}' or p.part_no like '%{id.part_no}%' or i.prod_id='{id.prod_id}' or d.invoice_dt between {id.from_dt} and {id.to_dt}"
#     order = "ORDER BY d.created_at DESC"
#     flag = 1
#     result = await db_select(select, schema, where, order, flag)
#     # print(result, 'RESULT')
#     return result



# @poRouter.post('/advanced_search_delivery')
# async def getprojectpoc(id:DelSearch):
#     # print(id.id)
#     res_dt = {}

#     select = "d.invoice,d.invoice_dt,d.po_no,pr.sl_no,pr.proj_name,b.vendor_id,v.vendor_name,i.sl_no item_delivery_no,i.prod_id,p.prod_name,p.prod_make,p.part_no"
#     schema = '''td_item_delivery_invoice d left join td_po_basic b on b.po_no = d.po_no left join td_project pr on pr.sl_no = b.project_id left join td_item_delivery_details i on i.invoice=d.invoice left join md_product p on i.prod_id = p.sl_no left join md_vendor v on v.sl_no=b.vendor_id
# '''
#     # where = f"b.project_id='{id.project_id}' or b.vendor_id='{id.vendor_id}' or d.invoice like '%{id.invoice}%' or p.part_no like '%{id.part_no}%' or i.prod_id='{id.prod_id}' or  d.invoice_dt>={id.from_dt} and d.invoice_dt<={id.to_dt}"

#     where = f"({f"b.project_id='{id.project_id}' or" if id.project_id != 
#                 '' else ""} b.vendor_id='{id.vendor_id}' or p.part_no like '%{id.part_no}%' or d.invoice like '%{id.invoice}%' or i.item_id='{id.prod_id}' or (b.po_issue_date between {f'{id.from_dt}' if(id.from_dt != '') else 'NULL'} and {f'{id.to_dt}' if(id.to_dt != '') else 'NULL'})) AND (b.project_id IS NOT NULL AND b.vendor_id IS NOT NULL AND p.part_no IS NOT NULL and i.item_id is not null and b.po_issue_date is not null) "
#     order = "ORDER BY d.created_at DESC"
#     order=''
#     flag = 1
#     result = await db_select(select, schema, where, order, flag)
#     # print(result, 'RESULT')
#     return result



@poRouter.post('/advanced_search_delivery')
async def getprojectpoc(id:DelSearch):
    # print(id.id)
    res_dt = {}

    select = "d.invoice,d.invoice_dt,d.po_no,pr.sl_no, b.sl_no as del_sl,pr.proj_name,b.vendor_id,v.vendor_name,i.sl_no item_delivery_no,i.prod_id,p.prod_name,p.prod_make,p.part_no"
    schema = '''td_item_delivery_invoice d left join td_po_basic b on b.po_no = d.po_no left join td_project pr on pr.sl_no = b.project_id left join td_item_delivery_details i on i.invoice=d.invoice left join md_product p on i.prod_id = p.sl_no left join md_vendor v on v.sl_no=b.vendor_id'''
    
    where = ""
    if(id.project_id != 0 and id.project_id!=""):
        where += f"b.project_id={id.project_id} {"AND " if((id.vendor_id != 0 and id.vendor_id!="") or id.invoice != '' or id.part_no != '' or id.prod_id != '' or id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.vendor_id != 0 and id.vendor_id!=""):
        where += f"b.vendor_id={id.vendor_id} {"AND " if(id.invoice != '' or id.part_no != '' or id.prod_id != '' or id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.part_no != ''):
        where += f"p.part_no like '%{id.part_no}%' {"AND " if(id.invoice != '' or id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.invoice != ''):
        where += f"d.invoice like '%{id.invoice}%' {"AND " if(id.prod_id != '' or id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.prod_id != ''):
        where += f"i.prod_id='{id.prod_id}' {"AND " if(id.to_dt != '' or id.from_dt != '' or id.make!='') else ''}"
    if(id.make != ''):
        where += f"p.prod_make like '%{id.make}%' {"AND " if(id.to_dt != '' or id.from_dt != '') else ''}"
    if(id.to_dt != '' or id.from_dt != ''):
        where += f'''(d.invoice_dt BETWEEN "{f'{id.from_dt}' if(id.from_dt != '') else ''}" and "{f'{id.to_dt}' if(id.to_dt != '') else ''}") '''

    where = f"{f'({where}) AND ' if(where != '') else ''}" + f"(b.project_id IS NOT NULL AND b.vendor_id IS NOT NULL AND p.part_no IS NOT NULL and d.invoice IS NOT NULL AND i.item_id is not null and d.invoice_dt is not null)" 
    order = "ORDER BY d.created_at DESC"
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    return result



# @poRouter.post('/approvemrn')
# async def approvepo(id:approveMRN):
#     current_datetime = datetime.now()
#     formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
#     fields= f'approve_flag="{id.status}",modified_by="{id.user}",rejection_note="{id.rej_note}",modified_at="{formatted_dt}"'
#     values = f''
#     table_name = "td_item_delivery_invoice"
#     whr = f'invoice="{id.inv_no}" and po_no="{id.po_no}"'
#     flag = 1 

#     result = await db_Insert(table_name, fields, values, whr, flag)
#     if result['suc']:
#         res_dt = {"suc": 1, "msg": f"Action Successful!"}
#     else:
#         res_dt = {"suc": 0, "msg": f"Error while saving!"}
  
#     return res_dt


@poRouter.post('/approvemrn')
async def approvepo(id:approveMRN):
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'approve_flag="{id.status}",modified_by="{id.user}",rejection_note="{id.rej_note}",modified_at="{formatted_dt}"'
    values = f''
    table_name = "td_item_delivery_invoice"
    whr = f'invoice="{id.inv_no}" and po_no="{id.po_no}"'
    flag = 1 
    stock_save = 0
    result = await db_Insert(table_name, fields, values, whr, flag)

    if id.status == 'A':
       for i in id.items:
            flds= f'date,ref_no,proj_id,item_id,qty,in_out_flag,created_by,created_at'
            val = f'"{id.invoice_dt}","MRN-{id.inv_no}",(SELECT project_id FROM td_po_basic WHERE po_no="{id.po_no}"),{i.item_id},{i.rc_qty},{id.in_out_flag},"{id.user}","{formatted_dt}"'
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
    else:
         
       stock_save =1
   
    if result['suc'] and stock_save:
        res_dt = {"suc": 1, "msg": f"Action Successful!","msg2":res_dt2}
    else:
        res_dt = {"suc": 0, "msg": f"Error while saving!" ,"msg2":res_dt2}
  
    return res_dt




      #     flds= f'date,ref_no,proj_id,po_item_id,item_id,qty,in_out_flag,created_by,created_at'
                #     val = f'"{data.invoice_dt}","MRN-{data.invoice}",(SELECT project_id FROM td_po_basic WHERE po_no="{data.po_no}"),{i.item_id},(SELECT item_id FROM td_po_items WHERE sl_no="{i.item_id}"),{i.rc_qty},{data.in_out_flag},"{data.user}","{formatted_dt}"'
                #     table = "td_stock_new"
                #     whr=f""
                #     flag2 =  0
                #     result3 = await db_Insert(table, flds, val, whr, flag2)

                #     if(result3['suc']>0): 

                #         res_dt2 = {"suc": 1, "msg": f"Updated Successfully And Inserted to stock"}

                #     else:
                #         res_dt2= {"suc": 0, "msg": f"Error while inserting into td_stock_new"}

                # else:
                #     res_dt1= {"suc": 0, "msg": f"Error while updating item"}



@poRouter.post('/getpoinfo')
async def getprojectpoc(id:GetPoInfo):
    # print(id.id)
    res_dt = {}

    select = "*"
    schema = "td_po_basic"
    where = f"po_no='{id.id}'" 
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/add_v_to_c')
async def addVtoC(data:DelVtoC):
   print(data)
   current_datetime = datetime.now()
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
   select1 = "count(*) as count"
   schema1 = "td_vendor_to_client"
   where1 = f"po_no='{data.po_no}'"
   order1 = ""
   flag1 = 0 
   result1 = await db_select(select1, schema1, where1, order1, flag1)
   print(result1,'res')

   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
   delNo = int(round(current_datetime.timestamp()))


   fields= f'del_date="{data.del_dt}",remarks="{data.remarks}",modified_by="{data.user}",modified_at="{formatted_dt}"' if result1['msg']['count'] > 0 else f'del_no,po_no,del_date,remarks,created_by,created_at'
   values = f'"DEL-{delNo}","{data.po_no}","{data.del_dt}","{data.remarks}","{data.user}","{formatted_dt}"'
   table_name = "td_vendor_to_client"
   whr = f'po_no="{data.po_no}"' if result1['msg']['count'] > 0 else None
   flag = 1 if result1['msg']['count']>0 else 0
   result = await db_Insert(table_name, fields, values, whr, flag)
   lastID=result["lastId"]
   stock_in = 1
   stock_out = -1

   for i in data.items:
            flds= f'date,ref_no,proj_id,item_id,qty,in_out_flag,created_by,created_at'
            val = f'"{data.del_dt}","DEL-{delNo}","{data.project_id}",{i.item_id},{i.rc_qty},{stock_in},"{data.user}","{formatted_dt}"'
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

            flds_out= f'date,ref_no,proj_id,item_id,qty,in_out_flag,created_by,created_at'
            val_out= f'"{data.del_dt}","DEL-{delNo}","{data.project_id}",{i.item_id},{i.rc_qty},{stock_out},"{data.user}","{formatted_dt}"'
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

 
   if result['suc'] :
        res_dt = {"suc": 1, "msg": f"Action Successful!","lastID":lastID}
   else:
        res_dt = {"suc": 0, "msg": f"Error while saving!" ,"lastID":lastID}
  
   return res_dt

@poRouter.post('/get_vtoc')
async def getVtoC(po_no:VtoC):
  
    # print(id.id)
    res_dt = {}

    select = "*"
    schema = "td_vendor_to_client"
    where = f"po_no='{po_no.po_no}'" 
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

@poRouter.post('/get_vtoc_doc')
async def getVtoC(po_no:VtoC):
  
    # print(id.id)
    res_dt = {}

    select = "*"
    schema = "td_vtoc_doc"
    where = f"sl_no='{po_no.po_no}'" 
    order = ""
    flag = 1 
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result

# @poRouter.post('/delete_VtoC')
# async def deleteVtoC()


@poRouter.post('/add_vtoc_img')
async def addPoMoreImg(v_to_c_img:Optional[Union[UploadFile, None]] = None, user:str = Form(...),lastID:int = Form(...)):
    res_dt = {}
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    v_to_c_img_fileName = ''
    if v_to_c_img:
        v_to_c_img_fileName = '' if not v_to_c_img else await uploadfileToLocal8(v_to_c_img)

    if (v_to_c_img_fileName != ''):
        fields= f'del_sl_no,vtoc_img,created_by,created_at'
        values = f'"{lastID}","upload_vtoc/{v_to_c_img_fileName}","{user}","{formatted_dt}"' 
        table_name = "td_vtoc_doc"
        whr =  f''
        flag = 0
        # if(id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        res_dt = result
    else:
        res_dt = {"suc": 1, "msg": "Successfully inserted!"}
    
    return res_dt
    
async def uploadfileToLocal8(file):
    current_datetime = datetime.now()
    receipt = int(round(current_datetime.timestamp()))
    modified_filename = f"{receipt}_{file.filename}"
    res = ""
    try:
        file_location = os.path.join(UPLOAD_FOLDER8, modified_filename)
        print(file_location)
        
        with open(file_location, "wb") as f:
            f.write(await file.read())
        
        res = modified_filename
        print(res)
    except Exception as e:
        # res = e.args
        res = ""
    finally:
        return res



@poRouter.post('/delete_vtoc')
async def deletetc(id:DeleteVtoC):
   current_datetime = datetime.now()
   res_dt={}
   formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

   fields=f''
   table_name = "td_vendor_to_client"
   flag = 1 
   values=''
   whr=f'po_no="{id.po_no}"'
   result = await db_Delete(table_name, whr)
 
   fields1=f''
   table_name1 = "td_vtoc_doc"
   flag1 = 1 
   values1=''
   whr1=f'del_sl_no="{id.id}"'
   result1 = await db_Delete(table_name1, whr1)



   fields3=f''
   table_name3 = "td_stock_new"
   flag3 = 1 
   values3=''
   whr3=f'ref_no="{id.del_no}"'
   result3 = await db_Delete(table_name3, whr3)


   if(result['suc']>0 and  result3['suc']>0 and result1['suc']>0):
        res_dt = {"suc": 1, "msg": "Deleted successfully!"}
   else:
        res_dt = {"suc": 0, "msg": "Error while deleting!"}
       
   return res_dt


@poRouter.post('/get_min_req')
async def getMinReq(id:GetMinReq):

    # print(id.id)
    res_dt = {}

    select = "r.sl_no,r.req_no,r.approve_flag,r.reason,r.intended_for,r.req_date,r.project_id,r.client_id,r.req_type,r.purpose,m.req_no as min_req_no"
    schema = "td_requisition r,td_min m"
    where = f"r.delete_flag='N' and r.req_no=m.req_no"
    order = ""
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    # print(result, 'RESULT')
    return result







