const csv = require('csv-parser');
const fs = require('fs');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
        {id: 'First Name', title: 'First Name'},
        {id: 'Last Name', title: 'Last Name'},
        {id: 'Email', title: 'Email'},
        {id: 'Phone Number', title: 'Phone Number'},
    ]
});

const csv_data = new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream('customer-data-sample.csv')
        .pipe(csv())
        .on('data', (row) => data.push(row))
        .on('end', () => resolve(data));
});

const csv_write = (data) => new Promise((resolve, reject) => {
    csvWriter
      .writeRecords(data)
      .then(resolve)
      .catch(reject);
})

const main = async () => {
    const data = await csv_data;
    await csv_write(data);

    console.log('All done!');
}

main()
