import { Job } from "../models/job.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//job create krte hai
const jobCreate = asyncHandler(async (req, res) => {

    const { company,
        position,
        status,
        jobType,
        location,
        salary,
        appliedDate,
        jobUrl,
        notes } = req.body;

    if (!company || !position || !jobType || !location || salary===undefined) {
        throw new ApiError(400, "Mandatory fields are required to be filled")
    }

    const job = await Job.create({
        company,
        position,
        status,
        jobType,
        location,
        salary,
        appliedDate,
        jobUrl,
        notes,
        user: req.user._id
    })

    return res.status(201)
        .json(new ApiResponse(
            201,
            job,
            "Job created Successfully "
        ))

});


//fetch all jobs
const getAllJobs = asyncHandler(async (req, res) => {

    //filter lgake search krte ki yhi wala job srch kro
    const { status, jobType, search, page, limit, sort } = req.query;

    const filter = {
        user: req.user._id
    }
    if (status) {
        const validStatus = ['Interview', 'Applied', 'Selected', 'Rejected', 'Offer'].includes(status);

        if (!validStatus) {
            throw new ApiError(400, "Give Valid status")
        }

        filter.status = status;
    }

    if (jobType) {
        const validJobType = ['Part-Time', 'Full-Time', 'Internship', 'Contract'].includes(jobType);

        if (!validJobType) {
            throw new ApiError(400, "Give Valid jobtype")
        }
        filter.jobType = jobType;
    }

    if (search) {
        filter.$or = [
            {
                company: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                position: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    //pagination krlo ji
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 10;
    //NaN "abc"
    if (Number.isNaN(pageNumber) || Number.isNaN(limitNumber)) {
        throw new ApiError(400, "Give Proper Number")
    }

    if (pageNumber <= 0 || limitNumber <= 0) {
        throw new ApiError(400, "Give Proper page or limit")
    }

    if (limitNumber > 50) {
        throw new ApiError(400, "Limit cannot exceed 50");
    }

    const skip = (pageNumber - 1) * limitNumber;

    //kitna jobs hai count krlo ji
    const totalJobs = await Job.countDocuments(filter);

    const totalPages = Math.ceil(totalJobs / limitNumber);

    const hasNextPage = pageNumber<totalPages;
    const hasPrevPage = pageNumber >1
    const jobs = await Job.find(filter)
        .sort(sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                jobs, 
                totalJobs,
                totalPages,
                currentPage:pageNumber,
                hasNextPage,
                hasPrevPage
            },
            "Jobs fetched successfully"
        )
    );

});

//id se job khoj skte ho
const getJobById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findOne({
        _id: id,
        user: req.user._id,
    });

    if (!job) {
        throw new ApiError(404, "job not found")
    }

    return res.status(200)
        .json(new ApiResponse(
            200,
            job,
            "job fetched by id successfully"
        ))
});

//update job
const updateJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {
        company,
        position,
        status,
        jobType,
        location,
        salary,
        appliedDate,
        jobUrl,
        notes
    } = req.body;

    const job = await Job.findOne({
        _id: id,
        user: req.user._id,
    })
    if (!job) {
        throw new ApiError(404, "job not found")
    }

    const updatedJob = await Job.findOneAndUpdate(
        {
            _id: id,
            user: req.user._id
        },
        {
            $set: {
                ...(company && { company }),
                ...(position && { position }),
                ...(status && { status }),
                ...(jobType && { jobType }),
                ...(location && { location }),
                ...(salary !== undefined && { salary }),
                ...(appliedDate && { appliedDate }),
                ...(jobUrl && { jobUrl }),
                ...(notes && { notes })
            }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedJob) {
        throw new ApiError(404, "Job not found");
    }

    return res.status(200)
        .json(new ApiResponse(
            200,
            updatedJob,
            "job updated successfully"
        ))

})

//delete job krlo ji
const deleteJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findOne({
        _id: id,
        user: req.user._id,
    })

    if (!job) {
        throw new ApiError(404, "job not found")
    }

    const deletedJob = await Job.findOneAndDelete({
        _id: id,
        user: req.user._id
    });

    return res.status(200)
        .json(new ApiResponse(
            200,
            deletedJob,
            "job deleted successfully"
        ))
})

//dashboard stats
const getJobStats = asyncHandler(async (req, res) => {
    //kitna applied status m h uska cnt
    const applied = await Job.countDocuments({
        user: req.user._id,
        status: "Applied"
    })
    //kitna interview status m h uska cnt
    const interview = await Job.countDocuments({
        user: req.user._id,
        status: "Interview"
    })
    //kitna selected status m h uska cnt
    const selected = await Job.countDocuments({
        user: req.user._id,
        status: "Selected"
    })
    //kitna offer status m h uska cnt
    const offer = await Job.countDocuments({
        user: req.user._id,
        status: "Offer"
    })
    //kitna rejected status m h uska cnt
    const rejected = await Job.countDocuments({
        user: req.user._id,
        status: "Rejected"
    })

    const stats = {
        applied,
        interview,
        selected,
        offer,
        rejected
    };

    return res.status(200)
        .json(new ApiResponse(
            200,
            stats,
            "job stats fetched successfully"
        ))


})

export {
    jobCreate,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getJobStats
};