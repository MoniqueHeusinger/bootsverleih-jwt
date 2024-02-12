// Hier kommt Boot-Schema (=Domain-Layer)
import mongoose, { mongo } from "mongoose";

const reservierungSchema = new mongoose.Schema(
  {
    istReserviert: { type: Boolean, required: true, default: false },
    startdatum: { type: Date, required: false },
    enddatum: { type: Date, required: false },
    reservierungsnummer: { type: Number, required: false },
    // neu: für BasicAuth -->
    userId: { type: mongoose.Types.ObjectId, required: true },
  },
  { _id: false, timestamps: false }
);

const bootSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    baujahr: { type: Number, required: true },
    serienNr: { type: Number, required: true },
    material: { type: Array, required: false },
    bootsart: { type: String, required: true },
    bildUrl: { type: String, required: false },
    reservierung: { type: reservierungSchema, default: () => ({}) },
    // neu: für BasicAuth -->
    userId: { type: mongoose.Types.ObjectId, required: true },
  },
  { collection: "boote", timestamps: true, versionKey: false }
);

const Boot = mongoose.model("Boot", bootSchema);
export default Boot;
