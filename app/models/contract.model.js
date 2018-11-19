import mongoose, { Schema } from 'mongoose';

const ContractSchema = new Schema({
  type: {
    type: String,
  },

  id: {
    type: Number,
  },
  main: {
    id: {
      type: Number,
    },
    sim: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  status: {
    state: {
      type: Number,
    },
    enabled: {
      type: Boolean,
    },
    signal: {
      type: String,
    },
    timer: {
      type: Number,
    },
  },
  contract: {
    type: {
      type: String,
    },
    owner: {
      type: String,
    },
    region: {
      type: String,
    },
    address: {
      type: String,
    },
    info: {
      type: String,
    },
  },
  geo: {
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
  },
  tech: {
    device: {
      type: String,
    },
    type: {
      type: String,
    },
    parser: {
      type: String,
    },
    modems: {
      sms: {
        type: Number,
      },
      voice: {
        type: String,
      },
      data: {
        type: String,
      },
    },
  },
});

export default mongoose.model('contract', ContractSchema);
