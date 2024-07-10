from fastapi import APIRouter
from . import user
from . import master
router = APIRouter(prefix="/api", tags=["API"])

router.include_router(user.userRouter)
router.include_router(master.masterRouter)

