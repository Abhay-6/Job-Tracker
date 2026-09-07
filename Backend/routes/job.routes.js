import { Router } from "express";
import { jobCreate,
        getAllJobs, 
        getJobById, 
        updateJob,
        deleteJob,
        getJobStats} from "../controllers/job.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/", verifyJWT, jobCreate);
router.get("/", verifyJWT, getAllJobs);
router.get("/stats", verifyJWT, getJobStats);
router.get("/:id", verifyJWT, getJobById);
router.patch("/:id", verifyJWT, updateJob);
router.delete("/:id",verifyJWT, deleteJob)


export default router;