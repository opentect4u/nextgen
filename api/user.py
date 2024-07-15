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

userRouter = APIRouter()

@userRouter.get('/userApi')
def firstRoute():
    return 'hiiiiiii'

@userRouter.post('/login')
async def firstRoute(user:getUser):
    print(user)
    res_dt = {}
    select = "user_password"
    schema = "md_user"
    where = f"user_email='{user.id}'" 
    order = ""
    flag = 0
    result = await db_select(select, schema, where, order, flag)
    print(result['msg']['user_password'])
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

@userRouter.post('/get_login_flag')
async def firstRoute(user:getFlag):
    print(user)
    res_dt = {}
    select = "first_login_flag"
    schema = "md_user"
    where = f"user_email='{user.id}'" 
    order = ""
    flag = 1
    result = await db_select(select, schema, where, order, flag)
    print(result, 'RESULT')
    return result
    
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