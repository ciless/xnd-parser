/* eslint-disable indent */
import fs from 'fs';
import util from 'util';
import path from 'path';
import xml2js from 'xml2js';
import iconv from 'iconv-lite';

const readFile = util.promisify(fs.readFile);

const PARSE_JSON_SETTINGS = {
  trim: true,
  normalize: true,
  normalizeTags: true,
  explicitArray: false,
  mergeAttrs: true,
  explicitRoot: false,
};

async function read(file) {
  try {
    const data = await readFile(file);
    return data;
  } catch (error) {
    console.log(`[ERROR XML] Read file ${path}`);
  }
}

async function decrypt(data) {
  try {
    const decrypredData = await iconv
      .encode(iconv.decode(data, 'cp1251'), 'utf-8')
      .toString();
    return decrypredData;
  } catch (error) {
    console.log(`[ERROR XML] Decrypt error`);
  }
}

function jsonify(data) {
  return new Promise((res, rej) => {
    xml2js.parseString(data, PARSE_JSON_SETTINGS, (err, data) => {
      if (err) console.log(`[ERROR XML] Jsonify ${err}`);
      else res(data);
    });
  });
}

export default {
  async parse(file) {
    const data = await read(file);
    const decrypredData = await decrypt(data);
    const json = await jsonify(decrypredData);
    return json;
  },
};
