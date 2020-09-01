const getPlayerNumberFromIndex = (index) => parseInt(index) + 1;

const splitListIntoSublistsWithMaxLength = (establishmentList, rowLength) =>
  Array.from(Array(Math.ceil(establishmentList.length / rowLength)), (_, i) =>
    establishmentList.slice(i * rowLength, i * rowLength + rowLength)
  );

export { getPlayerNumberFromIndex, splitListIntoSublistsWithMaxLength };
