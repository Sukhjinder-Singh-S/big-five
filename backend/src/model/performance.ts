import { Schema, Document, model, Types } from "mongoose";

// Define the FacetInterface separately
export interface FacetInterface {
    facet: number;
    title: string;
    score: number;
    count: number;
    scoreText: string;
}

// Define the ResultInterFace interface
export interface ResultInterface {
    title: string;
    count: number;
    score: number;
    facets: FacetInterface[];
}

// Define the IPerformance interface
export interface IPerformance extends Document {
    userId: Types.ObjectId;
    result: ResultInterface[];
}

// Define the schema for FacetInterface
const facetSchema = new Schema<FacetInterface>({
    facet: { type: Number, required: true },
    title: { type: String, required: true },
    score: { type: Number, required: true },
    count: { type: Number, required: true },
    scoreText: { type: String, required: true }
});

// Define the schema for ResultInterface
const resultSchema = new Schema<ResultInterface>({
    title: { type: String, required: true },
    count: { type: Number, required: true },
    score: { type: Number, required: true },
    facets: { type: [facetSchema], required: true }
});

// Define the schema for IPerformance
const performanceSchema = new Schema<IPerformance>({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    result: { type: [resultSchema], required: true }
});

// Create and export the model
const Performance = model<IPerformance>("Performance", performanceSchema);

export default Performance;
