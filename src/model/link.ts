import { model, Schema, Model, Document } from 'mongoose';

interface ILink extends Document {
  link: string;
  token: string;
  expiration_date: Date;
  updated_at: Date;
  created_at: Date;
}

const LinkSchema: Schema = new Schema({
  link: { type: String, required: true },
  token: { type: String, required: true },
  expiration_date: { type: Date, required: true }
}, { timestamps: true });

const Link: Model<ILink> = model('Link', LinkSchema);

export { Link, ILink };