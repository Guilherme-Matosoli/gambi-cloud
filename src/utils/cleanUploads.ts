import fs from "fs";
import path from "path";

const cleanUploads = async () => {
  const folderPath = path.resolve('public/uploads');
  const folders = await fs.promises.readdir(folderPath);

  const allPromises = folders.map(folder => {
    fs.promises.rm(path.resolve(folderPath, folder), { recursive: true })
  });

  await Promise.all(allPromises);
};

export const runCleanFunction = () => {
  setInterval(() => {
    const hourInBrazil = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', hour12: false });
    if (hourInBrazil == "00" || hourInBrazil == "0") cleanUploads();
  }, 60000);
};
