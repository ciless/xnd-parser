import { Contract } from '../models';

export default {
  async createOrUpdate(type, data) {
    const newContract = data;
    newContract.type = type;

    const contract = await Contract.findOne({ id: data.id });
    if (contract) {
      Contract.updateOne({ id: data.id }, newContract);
    } else {
      Contract.create(newContract);
    }
  },
};
