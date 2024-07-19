from fastapi import APIRouter
from . import user
from . import master
from . import project
router = APIRouter(prefix="/api", tags=["API"])

router.include_router(user.userRouter)
router.include_router(master.masterRouter)
router.include_router(project.projectRouter)

