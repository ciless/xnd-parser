import { Contract } from '../models';

export default {
  async createOrUpdate(type, data) {
    const newContract = data;
    newContract.type = type;

    const contract = await Contract.findOne({ id: data.id });
    if (contract) {
      await Contract.updateOne({ id: data.id }, newContract);
    } else {
      await Contract.create(newContract);
    }
  },
};
