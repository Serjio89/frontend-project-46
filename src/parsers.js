export default (data, extention) => {
  switch (extention) {
    case '.json':
      return JSON.parse(data);
    default:
      return extention;
  }
};
