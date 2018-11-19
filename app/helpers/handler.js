/* eslint-disable indent */
import _ from 'lodash';

function getModemNumber(modem) {
  return parseInt(
    modem
      .split('')
      .reverse()
      .join('')
  );
}

function getDevice(parser) {
  let realDevice = 'Unknown';

  const devices = [
    { CCU: 'ccu' },
    { Surgard: 'surgard' },
    { Storoj: 'stor' },
    { 'Jablotron 63': 'ja63' },
    { 'Jablotron 80': 'ja80' },
    { 'Jablotron 82': 'ja82' },
    { 'Jablotron 100': 'ja100' },
  ];

  devices.forEach((item) => {
    for (const device in item) {
      if (parser.indexOf(item[device]) !== -1) {
        realDevice = item[device];
      }
    }
  });

  return realDevice;
}

async function getFields(json) {
  const body = _.pick(json, [
    'id',
    'phone',
    'name',
    'eventparser',
    'lat',
    'lon',
    'objectinfo',
    'options',
    'device',
    'tag',
    'disable',
  ]);

  const contractInfo = _.pick(body.objectinfo, [
    'categoria',
    'owner',
    'otv',
    'address',
    'comment',
  ]);

  const optionsInfo = _.pick(body.options, [
    'smsmodem',
    'voicemodem',
    'datamodem',
  ]);

  const modemsInfo = {
    sms: getModemNumber(optionsInfo.smsmodem.name),
    voice: getModemNumber(optionsInfo.voicemodem.name),
    data: getModemNumber(optionsInfo.datamodem.name),
  };

  return {
    id: Number(body.id),
    main: {
      id: Number(body.id),
      sim: body.phone,
      name: body.name,
    },
    status: {
      state: Number(body.tag[0].value),
      enabled: !!body.disable,
      signal: body.tag[2].lastsms,
      timer: Number(body.tag[4].value),
    },
    contract: {
      type: contractInfo.categoria,
      owner: contractInfo.owner,
      region: contractInfo.otv,
      address: contractInfo.address,
      info: contractInfo.comment,
    },
    geo: {
      lat: body.lat,
      lng: body.lon,
    },
    tech: {
      device: getDevice(body.eventparser),
      type: body.device.type,
      parser: body.eventparser,
      modems: modemsInfo,
    },
  };
}

export default {
  async treatment(json) {
    return await getFields(json);
  },
};
