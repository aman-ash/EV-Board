import { Schema, model } from 'mongoose';

const boardSchema = new Schema(
  {
    userid: {
      type: String
    },
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
    },
    cards: [
      {
        cardId: {
          type: String
        },
        sectionName: {
          type: String
        },
        cardDescription: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Board', boardSchema);
