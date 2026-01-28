const fs = require('fs').promises;

async function readJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('파일 읽기 오류:', err);
    return [];
  }
}

async function writeJSON(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('파일 쓰기 오류:', err);
  }
}

module.exports = { readJSON, writeJSON };
