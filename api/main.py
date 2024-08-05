from fastapi import APIRouter
from . import user
from . import master
from . import project
from . import po
router = APIRouter(prefix="/api", tags=["API"])

router.include_router(user.userRouter)
router.include_router(master.masterRouter)
router.include_router(project.projectRouter)
router.include_router(po.poRouter)

