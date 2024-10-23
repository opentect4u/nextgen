from fastapi import APIRouter
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
from models.utils import get_hashed_password, verify_password
class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"


class getUser(BaseModel):
    id:str
    password:str

class getFlag(BaseModel):
    id:str

class getPass(BaseModel):
    oldPass:str
    newPass:str
    user:str

class forgotPass(BaseModel):
    newPass:str
    user:int

userRouter = APIRouter()

@userRouter.get('/userApi')
def firstRoute():
    return 'hiiiiiii'



@userRouter.post('/login')
async def firstRoute(user:getUser):
    print(user)
    select = "user_password"
    schema = "md_user"
    where = f"user_email='{user.id}' and active_flag='Y'" 
    order = ""
    flag = 0
    result = await db_select(select, schema, where, order, flag)
    print(result['msg'])
    if result['suc']==1 :
        check=verify_password(user.password,result['msg']['user_password'])
        select = "a.first_login_flag,a.user_email,a.user_phone,a.user_name,a.user_type,b.desig_name,c.dept_name"
        schema = "md_user a,md_designation b, md_department c"
        where = f"user_email='{user.id}' and a.user_dept=c.sl_no and a.user_desig=b.sl_no" 
        order = ""
        flag = 1
        if check==True:
            result = await db_select(select, schema, where, order, flag)
            print(result, 'RESULT')
            return result
        else:
            return {'suc':0,'msg':'Invalid credentials'}
    else:
        return {'suc':0,'msg':'Invalid credentials'}


@userRouter.post('/reset_pass')
async def reset_pass(dt:getPass):
    print(dt)
    select = "user_password"
    schema = "md_user"
    where = f"user_email='{dt.user}'" 
    order = ""
    flag = 0
    result = await db_select(select, schema, where, order, flag)
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    print(result['msg'])
    if result['suc']==1 :
        check=verify_password(dt.oldPass,result['msg']['user_password'])
        if check==True:
            fields=f'user_password="{get_hashed_password(dt.newPass)}",first_login_flag="N",modified_by="{dt.user}",modified_at="{formatted_dt}"'
            table_name="md_user"
            whr=f'user_email="{dt.user}"'
            flag1=1
            values=''
            result1 = await db_Insert(table_name, fields, values, whr, flag1)
            if result1['suc']>0:
                res_dt = {"suc": 1, "msg": "Password updated successfully!"}
            else:
                res_dt = {"suc": 0, "msg": "Error while updating!"}
        else:
            res_dt={"suc": 0, "msg": "Old password does not exist!"}

    else:
        res_dt={"suc": 0, "msg": result['msg']}
    return res_dt


@userRouter.post('/forgot_pass')
async def reset_pass(dt:forgotPass):
    print(dt)
    select = "user_password"
    schema = "md_user"
    where = f"sl_no='{dt.user}'" 
    order = ""
    flag = 0
    result = await db_select(select, schema, where, order, flag)
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    print(result['msg'])
    if result['suc']==1 :
        fields=f'user_password="{get_hashed_password(dt.newPass)}",first_login_flag="Y",modified_by="{dt.user}",modified_at="{formatted_dt}"'
        table_name="md_user"
        whr=f'user_email="{dt.user}"'
        flag1=1
        values=''
        result1 = await db_Insert(table_name, fields, values, whr, flag1)
        if result1['suc']>0:
                res_dt = {"suc": 1, "msg": "Password updated successfully!"}
        else:
                res_dt = {"suc": 0, "msg": "Error while updating!"}
    else:
            res_dt={"suc": 0, "msg": "Old password does not exist!"}

    return res_dt

# @userRouter.get('/userData/{id}')
# def firstRoute(id:int):
#     return f'hiiiiiii {id}'

# @userRouter.get("/models/{model_name}")
# async def get_model(model_name: ModelName):
#     if model_name is ModelName.alexnet:
#         return {"model_name": model_name, "message": "Deep Learning FTW!"}

#     if model_name.value == "lenet":
#         return {"model_name": model_name, "message": "LeCNN all the images"}

#     return {"model_name": model_name, "message": "Have some residuals"}


# @userRouter.get("/files/{file_path:path}")
# async def read_file(file_path: str):
#     return {"file_path": file_path}

# @userRouter.get("/items/{item_id}")
# async def read_item(item_id: str, q: str | None = None, short: bool = False):
#     if q:
#         return {"item_id": item_id, "q": q}
#     return {"item_id": item_id}

# @userRouter.get("/optionalquery/")
# async def read_items(q: str | None = None):
#     results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
#     if q:
#         results.update({"q": q})
#     return results