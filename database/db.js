const fs = require('fs');

async function writeData(model, data) {
  model.addId(data);
  model.validate(data);
  const existingData = await readData(model);
  existingData.push(data);
  await fs.promises.writeFile(model.filePath, JSON.stringify(existingData, null, 2));
}

async function readData(model) {
  const fileContent = await fs.promises.readFile(model.filePath, 'utf-8');
  return JSON.parse(fileContent);
}

async function updateData(model, id, newData) {
  const existingData = await readData(model);
  const dataIndex = existingData.findIndex(item => item._id === id);
  if (dataIndex === -1) {
    throw new Error('Data not found');
  }
  existingData[dataIndex] = { ...existingData[dataIndex], ...newData };
  await fs.promises.writeFile(model.filePath, JSON.stringify(existingData, null, 2));
}

async function deleteData(model, id) {
  const existingData = await readData(model);
  const filteredData = existingData.filter(item => item._id !== id);
  await fs.promises.writeFile(model.filePath, JSON.stringify(filteredData, null, 2));
}

async function createFile(model) {
  if (!fs.existsSync(model.filePath)) {
    await fs.promises.writeFile(model.filePath, JSON.stringify([]));
  }
}

async function deleteFile(model) {
  if (fs.existsSync(model.filePath)) {
    await fs.promises.unlink(model.filePath);
  }
}

module.exports = {
  writeData,
  readData,
  updateData,
  deleteData,
  createFile,
  deleteFile
};
