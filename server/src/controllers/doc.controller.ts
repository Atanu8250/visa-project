import { DocModel } from '../models/doc.model';
import { Request, Response } from 'express';


// Get all the docs
export const getAllDocs = async (req: Request, res: Response) => {
     try {
          // Find the docs in the DB
          const docs = await DocModel.find();

          // Send the response with the founded docs
          res.status(200).send({ message: "Docs found successfully.", data: docs })
     } catch (error: any) {
          console.log('error:', error)
          res.status(500).send({ messag: error.message, error })
     }
};


// Get single doc by the doc-id
export const getSpecificDoc = async (req: Request, res: Response) => {
     const { docId } = req.params
     console.log('docId:', docId)
     try {
          // Find the doc in the DB linked with the given 'docId'
          const doc = DocModel.findById(docId)

          // Doc not found in the DB
          if (!doc) return res.status(404).send({ message: "Doc not found!" })

          // Send the response with the founded doc
          res.status(200).send({ message: "Doc found successfully!", doc: doc })

     } catch (error: any) {
          console.log('error:', error)
          res.status(500).send({ messag: error.message, error })
     }
};


// Create doc in the DB
export const postDoc = async (req: Request, res: Response) => {

     // De-structure all the fields from the req.body
     const { country, instituteName, campus, city, appFeesCAD, programCode, programName, programLevel, duration, intake, conditional, coOp, coOpDuration, fees, aveTATBucket, degreeCode, degreeName, stream, CGPABcket, percentageBucket, passingYear, studyGape, backlogs, MOIAccepted, exam, l, r, w, s, overall, specialRequirements, programLink } = req.body;

     // Verify all the fields are available or not in the 'req.body'
     if (!country || !instituteName || !campus || !city || !appFeesCAD || !programCode || !programName || !programLevel || !duration || !intake || !conditional || !coOp || !coOpDuration || !fees || !aveTATBucket || !degreeCode || !degreeName || !stream || !CGPABcket || !percentageBucket || !passingYear || !studyGape || !backlogs || !MOIAccepted || !exam || !l || !r || !w || !s || !overall || !specialRequirements || !programLink) {
          return res.status(400).send({ message: "Please provide proper data for the Doc!" })
     }


     try {
          // Create the Doc
          const newDoc = new DocModel({ ...req.body });
          // Save in the DB
          await newDoc.save();

          // Send the response with proper message
          res.status(201).send({ message: "Doc created Successfully!" });
     } catch (error: any) {
          console.log('error:', error)
          res.status(500).send({ messag: error.message, error })
     }
}


// Update doc with given 'doc-id' and update values
export const updateDoc = async (req: Request, res: Response) => {

     // Store the update obj in 'update' variable
     const update = req.body;

     // Get the docId from the 'params'
     const { docId } = req.params;

     try {
          // Update the doc with Schema validation in the DB and get back the updated doc
          const updatedDoc = await DocModel.findByIdAndUpdate(docId, update, { runValidators: true, returnDocument: 'after' });

          // Send the response with proper message and updated doc
          res.status(201).send({ message: "Doc updated successfully.", doc: updatedDoc });
     } catch (error: any) {
          console.log('error:', error)
          res.status(500).send({ messag: error.message, error })
     }
}


// Delete doc with given 'doc-id'
export const deleteDoc = async (req: Request, res: Response) => {
     // Get the Doc-id from the params
     const { docId } = req.params;

     try {
          // Find the doc with the given 'docId' and delete if it found.
          const deletedDoc = await DocModel.findByIdAndRemove(docId);

          // Send the response with proper message and deleted doc's id
          res.status(200).send({ message: "Doc deleted successfully.", docId: deletedDoc?._id })
     } catch (error: any) {
          console.log('error:', error)
          res.status(500).send({ messag: error.message, error })

     }
}

