from fastapi import APIRouter
from enum import Enum
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models.masterApiModel import db_select, db_Insert, db_Delete
from datetime import datetime
import datetime as dt
import random
from models.utils import get_hashed_password, verify_password
masterRouter = APIRouter()

class getMaster(BaseModel):
    id:int
    name:str
    user:str

class getData(BaseModel):
    id:int
class getPocId(BaseModel):
    client_id:int
class addVendor(BaseModel):
      v_id:int
      v_name: str
      v_email:str
      v_contact:str
      v_phone:str
      v_gst:str
      v_pan:str
      v_reg:str
      v_remarks:str
      v_address:str
      user:str

class addProduct(BaseModel):
      p_id:int
      p_cat:str
      p_name: str
      p_make:str
      p_part:str
      p_model:str
      p_article:str
      p_stock:str
      p_detailed:str
      p_hsn:str
      user:str
class addUser(BaseModel):
      u_id:int
      u_name: str
      u_dept:str
      u_desig:str
      u_loc:str
      u_type:str
      u_permission:str
      u_email:str
      u_phone:str
      user:str

class addPoc(BaseModel):
      c_id:int
      poc_name:str
      poc_designation:str
      poc_department:str
      poc_email:str
      poc_direct_no:str
      poc_ext_no:str
      poc_ph_1:str
      poc_ph_2:str

class addClient(BaseModel):
      c_id:int
      c_name: str
      c_phone:str
      c_email:str
      c_location:str
      c_address:str
      c_gst:str
      c_pan:str
      c_reg:str
      c_poc:list[addPoc] 
      user:str


pass_alphabets=[
    'A','B','C','D','E','F','G','H','I','J','K','L',
    'M','N','O','P','Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f','g','h','i','j',
    'k','l','m','n','o','p','q','r','s','t','u','v',
    'w','x','y','z','1','2','3','4','5','6','7','8',
    '9','0','/','*','+','~','@','#','%','^','&','//'
    ]


@masterRouter.post('/addcategory')
async def addcategory(dt:getMaster):
    print(dt)
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'catg_name,created_by,created_at'
    values = f'"{dt.name}","{dt.user}","{formatted_dt}"'
    table_name = "md_category"
    whr =  None
    flag = 1 if dt.id>0 else 0
    if(dt.id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Category inserted successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while inserting!"}
    else:
        print(flag)
        fields=f'catg_name="{dt.name}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
        whr=f'sl_no="{dt.id}"'
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Category updated successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while updating!"}
    return res_dt

@masterRouter.post('/getcategory')
async def getcategory(id:getData):
    print('I am logging in!')
    print(id.id)
    res_dt = {}
    # SELECT @a:=@a+1 serial_number, busi_act_name FROM md_busi_act, (SELECT @a:= 0) AS a
    select = "@a:=@a+1 serial_number, catg_name, created_by,created_at,modified_by,modified_at,sl_no"
    # select = "@a:=@a+1 serial_number, *"
    schema = "md_category,(SELECT @a:= 0) AS a"
    where = f"sl_no='{id.id}'" if id.id>0 else f"delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@masterRouter.post('/addunit')
async def addunit(dt:getMaster):
    print(dt)
    res_dt = {}
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'unit_name,created_by,created_at'
    values = f'"{dt.name}","{dt.user}","{formatted_dt}"'
    table_name = "md_unit"
    whr =  None
    flag = 1 if dt.id>0 else 0

    if(dt.id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Unit inserted successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while inserting!"}
    else:
        print(flag)
        fields=f'unit_name="{dt.name}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
        whr=f'sl_no="{dt.id}"'
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Unit updated successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while updating!"}
    return res_dt

@masterRouter.post('/getunit')
async def getunit(id:getData):
    print('I am logging in!')
    print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number, unit_name, created_by,created_at,modified_by,modified_at,sl_no"
    schema = "md_unit"
    where = f"sl_no='{id.id}'and delete_flag='N'" if id.id>0 else "delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@masterRouter.post('/adddept')
async def adddepartment(dt:getMaster):
    print(dt)
    res_dt = {}

    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'dept_name,created_by,created_at'
    values = f'"{dt.name}","{dt.user}","{formatted_dt}"'
    table_name = "md_department"
    whr =  None
    flag = 1 if dt.id>0 else 0

    if(dt.id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        print(result)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Department inserted successfully!"}
        else:
            res_dt = {"suc": 0, "msg": result['msg']}
    else:
        print(flag)
        fields=f'dept_name="{dt.name}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
        whr=f'sl_no="{dt.id}"'
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Department updated successfully!"}
        else:
            res_dt = {"suc": 0, "msg": result['msg']}
    return res_dt

@masterRouter.post('/getdept')
async def getunit(id:getData):
    print('I am logging in!')
    print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number, dept_name, created_by,created_at,modified_by,modified_at,sl_no"
    schema = "md_department"
    where = f"sl_no='{id.id}'and delete_flag='N'" if id.id>0 else "delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result
@masterRouter.post('/adddesig')
async def adddesignation(dt:getMaster):
    print(dt)
    res_dt = {}

    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'desig_name,created_by,created_at'
    values = f'"{dt.name}","{dt.user}","{formatted_dt}"'
    table_name = "md_designation"
    whr =  None
    flag = 1 if dt.id>0 else 0

    if(dt.id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Designation inserted successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while inserting!"}
    else:
        print(flag)
        fields=f'desig_name="{dt.name}",modified_by="{dt.user}",modified_at="{formatted_dt}"'
        whr=f'sl_no="{dt.id}"'
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Designation updated successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while updating!"}
    return res_dt

@masterRouter.post('/getdesig')
async def getunit(id:getData):
    print('I am logging in!')
    print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number, desig_name, created_by,created_at,modified_by,modified_at,sl_no"
    schema = "md_designation"
    where = f"sl_no='{id.id}'and delete_flag='N'" if id.id>0 else "delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@masterRouter.post('/addvendor')
async def addvendor(data:addVendor):
    print(data)
    res_dt = {}

    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'vendor_name,vendor_email,vendor_contact,vendor_phone,vendor_gst,vendor_pan,vendor_reg,vendor_remarks, vendor_address,created_by,created_at'
    values = f'"{data.v_name}","{data.v_email}","{data.v_contact}","{data.v_phone}","{data.v_gst}","{data.v_pan}","{data.v_reg}","{data.v_remarks}","{data.v_address}","{data.user}","{formatted_dt}"'
    table_name = "md_vendor"
    whr =  None
    flag = 1 if data.v_id>0 else 0

    if(data.v_id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Vendor inserted successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while inserting!"}
    else:
        print(flag)
        fields=f'vendor_name="{data.v_name}",vendor_email="{data.v_email}",vendor_contact="{data.v_contact}",vendor_phone="{data.v_phone}",vendor_gst="{data.v_gst}",vendor_pan="{data.v_pan}",vendor_reg="{data.v_reg}",vendor_remarks="{data.v_remarks}",vendor_address="{data.v_address}",modified_by="{data.user}",modified_at="{formatted_dt}"'
        whr=f'sl_no="{data.v_id}"'
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Vendor updated successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while updating!"}
    return res_dt

@masterRouter.post('/getvendor')
async def getunit(id:getData):
    print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number, vendor_name,vendor_email,vendor_contact,vendor_phone,vendor_gst,vendor_pan,vendor_reg,vendor_remarks, vendor_address,created_by,created_at,modified_by,modified_at,sl_no"
    schema = "md_vendor"
    where = f"sl_no='{id.id}'and delete_flag='N'" if id.id>0 else "delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@masterRouter.post('/addproduct')
async def addvendor(data:addProduct):
    print(data)
    res_dt = {}

    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'prod_name,prod_cat,prod_make,part_no,model_no,article_no,hsn_code,stk_cnt, prod_desc,created_by,created_at'
    values = f'"{data.p_name}","{data.p_cat}","{data.p_make}","{data.p_part}","{data.p_model}","{data.p_article}","{data.p_hsn}","{data.p_stock}","{data.p_detailed}","{data.user}","{formatted_dt}"'
    table_name = "md_product"
    whr =  None
    flag = 1 if data.p_id>0 else 0

    if(data.p_id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Product inserted successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while inserting!"}
    else:
        print(flag)
        fields=f'prod_name="{data.p_name}",prod_cat="{data.p_cat}",prod_make="{data.p_make}",part_no="{data.p_part}",model_no="{data.p_model}",article_no="{data.p_article}",hsn_code="{data.p_hsn}",stk_cnt="{data.p_stock}",prod_desc="{data.p_detailed}",modified_by="{data.user}",modified_at="{formatted_dt}"'
        whr=f'sl_no="{data.p_id}"'
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Product updated successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while updating!"}
    return res_dt

@masterRouter.post('/getproduct')
async def getunit(id:getData):
    print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number, prod_name,prod_cat,prod_make,part_no,model_no,article_no,hsn_code,stk_cnt, prod_desc,created_by,created_at,modified_by,modified_at,sl_no"

    schema = "md_product"
    where = f"sl_no='{id.id}'and delete_flag='N'" if id.id>0 else "delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result


@masterRouter.post('/adduser')
async def addvendor(data:addUser):
    print(data)
    res_dt = {}

    current_datetime = datetime.now()
    password=random.choice(pass_alphabets)+random.choice(pass_alphabets)+random.choice(pass_alphabets)+random.choice(pass_alphabets)+random.choice(pass_alphabets)+random.choice(pass_alphabets)
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'user_name,user_location,user_dept,user_desig,user_phone,user_permission,user_email,user_password, user_type,first_login_flag,created_by,created_at'
    values = f'"{data.u_name}","{data.u_loc}","{data.u_dept}","{data.u_desig}","{data.u_phone}","{data.u_permission}","{data.u_email}","{get_hashed_password("1234")}","{data.u_type}","Y","{data.user}","{formatted_dt}"'
    table_name = "md_user"
    whr =  None
    flag = 1 if data.u_id>0 else 0

    if(data.u_id==0):
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "User inserted successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while inserting!"}
    else:
        print(flag)
        fields=f'user_name="{data.u_name}",user_location="{data.u_loc}",user_dept="{data.u_dept}",user_desig="{data.u_desig}",user_phone="{data.u_phone}",user_permission="{data.u_permission}",user_email="{data.u_email}",user_type="{data.u_type}",modified_by="{data.user}",modified_at="{formatted_dt}"'
        whr=f'sl_no="{data.u_id}"'
        result = await db_Insert(table_name, fields, values, whr, flag)
        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "User updated successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while updating!"}
    return res_dt


@masterRouter.post('/getuser')
async def getunit(id:getData):
    print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number, user_name,user_location,user_dept,user_desig,user_phone,user_permission,user_email,user_password, user_type,first_login_flag,created_by,created_at,modified_by,modified_at,sl_no"

    schema = "md_user"
    where = f"sl_no='{id.id}'and delete_flag='N'" if id.id>0 else "delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@masterRouter.post('/addclient')
async def addclient(data:addClient):
    res_dt = {}
    print(data)
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    fields= f'client_name="{data.c_name}",client_email="{data.c_email}",client_phone="{data.c_phone}",client_gst="{data.c_gst}",client_pan="{data.c_pan}",client_reg="{data.c_reg}",client_location="{data.c_location}",client_address="{data.c_address}",modified_by="{data.user}",modified_at="{formatted_dt}"' if data.c_id > 0 else f'client_name,client_email,client_phone,client_gst,client_pan,client_reg,client_location, client_address,created_by,created_at'
    values = f'"{data.c_name}","{data.c_email}","{data.c_phone}","{data.c_gst}","{data.c_pan}","{data.c_reg}","{data.c_location}","{data.c_address}","{data.user}","{formatted_dt}"'
    table_name = "md_client"
    whr = f'sl_no="{data.c_id}"' if data.c_id > 0 else None
    flag = 1 if data.c_id>0 else 0

    result = await db_Insert(table_name, fields, values, whr, flag)

    lastID=data.c_id if data.c_id>0 else result["lastId"]

    # del_table_name = 'md_client_poc'
    # del_whr = f"sl_no not in()"
    # del_qry = await db_Delete(del_table_name, del_whr)

    for c in data.c_poc:
        fields= f'poc_name="{c.poc_name}",poc_email="{c.poc_email}",poc_designation="{c.poc_designation}",poc_department="{c.poc_department}",poc_direct_no="{c.poc_direct_no}",poc_ext_no="{c.poc_ext_no}", poc_ph_1="{c.poc_ph_1}",poc_ph_2="{c.poc_ph_2}",modified_by="{data.user}",modified_at="{formatted_dt}"' if c.sl_no > 0 else f'client_id,poc_name,poc_email,poc_designation,poc_department,poc_direct_no,poc_ext_no,poc_ph_1,poc_ph_2,created_by,created_at'
        values = f'"{lastID}","{c.poc_name}","{c.poc_email}","{c.poc_designation}","{c.poc_department}","{c.poc_direct_no}","{c.poc_ext_no}","{c.poc_ph_1}","{c.poc_ph_2}","{data.user}","{formatted_dt}"'
        table_name = "md_client_poc"
        whr =  f'sl_no="{c.sl_no}"' if c.sl_no > 0 else None
        result = await db_Insert(table_name, fields, values, whr, flag)

        if(result['suc']>0):
            res_dt = {"suc": 1, "msg": "Client inserted successfully!"}
        else:
            res_dt = {"suc": 0, "msg": "Error while inserting!"}

    return res_dt

    # if(data.c_id==0):
    #     lastID=result["lastId"]
    #     if(result['suc']>0):
    #         for c in data.c_poc:
    #             fields= f'client_id,poc_name,poc_email,poc_designation,poc_department,poc_direct_no,poc_ext_no,poc_ph_1,poc_ph_2,created_by,created_at'
    #             values = f'"{lastID}","{c.poc_name}","{c.poc_email}","{c.poc_designation}","{c.poc_department}","{c.poc_direct_no}","{c.poc_ext_no}","{c.poc_ph_1}","{c.poc_ph_2}","{data.user}","{formatted_dt}"'
    #             table_name = "md_client_poc"
    #             whr =  None
    #             result = await db_Insert(table_name, fields, values, whr, flag)
    #             if(result['suc']>0):
    #                 res_dt = {"suc": 1, "msg": "Client inserted successfully!"}
    #             else:
    #                 res_dt = {"suc": 0, "msg": "Error while inserting!"}
    #     else:
    #         res_dt = {"suc": 0, "msg": "Error while inserting!"}
    # else:
    #     print(flag)
    #     fields=f'client_name="{data.c_name}",client_email="{data.c_email}",client_phone="{data.c_phone}",client_gst="{data.c_gst}",client_pan="{data.c_pan}",client_reg="{data.c_reg}",client_location="{data.c_location}",client_address="{data.c_address}",modified_by="{data.user}",modified_at="{formatted_dt}"'
    #     whr=f'sl_no="{data.c_id}"'
    #     result = await db_Insert(table_name, fields, values, whr, flag)
    #     if(result['suc']>0):
    #        for c in data.c_poc:
    #             fields= f'poc_name="{c.poc_name}",poc_email="{c.poc_email}",poc_designation="{c.poc_designation}",poc_department="{c.poc_department}",poc_direct_no="{c.poc_direct_no}",poc_ext_no="{c.poc_ext_no}", poc_ph_1="{c.poc_ph_1}",poc_ph_2="{c.poc_ph_2}",modified_by="{data.user}",modified_at="{formatted_dt}"'
    #             table_name = "md_client_poc"
    #             whr = f'client_id="{data.c_id}"'
    #             result = await db_Insert(table_name, fields, values, whr, flag)
    #             if(result['suc']>0):
    #                 res_dt = {"suc": 1, "msg": "Client updated successfully!"}
    #             else:
    #                 res_dt = {"suc": 0, "msg": "Error while updating!"}
    #     else:
    #         res_dt = {"suc": 0, "msg": "Error while updating!"}
    # return res_dt


@masterRouter.post('/getclient')
async def getunit(id:getData):
    print(id.id)
    res_dt = {}

    select = "@a:=@a+1 serial_number, client_name,client_email,client_phone,client_gst,client_pan,client_reg,client_location, client_address,created_by,created_at,created_by,created_at,modified_by,modified_at,sl_no"
    schema = "md_client"
    where = f"sl_no='{id.id}'and delete_flag='N'" if id.id>0 else "delete_flag='N'"
    order = "ORDER BY created_at DESC"
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@masterRouter.post('/getclientpoc')
async def getunit(id:getData):
    print(id.id)
    res_dt = {}

    select = "*"
    schema = "md_client_poc"
    where = f"client_id='{id.id}'" if id.id>0 else ""
    order = ""
    flag = 0 if id.id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result

@masterRouter.post('/getpoc')
async def getunit(id:getPocId):
    print(id.client_id)
    res_dt = {}

    select = "*"
    schema = "md_client_poc"
    where = f"client_id='{id.client_id}'" 
    order = ""
    flag = 0 if id.client_id>0 else 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result
