import express from 'express';
import { getAllCourse, getCourseId } from '../controllers/courseController.js';

const courseRouter = express.Router();

courseRouter.get('/all', getAllCourse);     // GET /api/course/all
courseRouter.get('/:id', getCourseId);      // GET /api/course/:id

export default courseRouter;
