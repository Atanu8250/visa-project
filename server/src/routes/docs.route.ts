import express from 'express';
import { deleteDoc, getAllDocs, getSpecificDoc, postDoc, updateDoc } from '../controllers/doc.controller';

// Created different router for Docs
export const router = express.Router();

// Routing methods for '/' end-point
router.route('/')
     .get(getAllDocs)
     .post(postDoc)


// Routing methods for '/:docId' end-point
router.route('/:docId')
     .get(getSpecificDoc)
     .patch(updateDoc)
     .delete(deleteDoc)