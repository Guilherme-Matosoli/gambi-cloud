import fs from 'fs';

export const verifyFileExists = async (filePath: string) => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  }
  catch (err) {
    return false;
  }
};
