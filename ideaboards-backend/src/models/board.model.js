import { Schema, model } from 'mongoose';

const boardSchema = new Schema(
  {
    boardName: {
      type: String
    },
    Sections: {
      type: [String]
    },
    format: {
      type: String
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Board', boardSchema);
