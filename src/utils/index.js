export const getTableDataWithKey = ({ keyName, data }) => {
  return data.map(item => ({
    ...item,
    key: item[keyName]
  }))
};