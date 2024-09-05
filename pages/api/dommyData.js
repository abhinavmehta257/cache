const Service = require("../../model/service");
const { default: connectDB } = require("./lib/connectDB");

export default async function handler(req, res){
    await connectDB();
  
    const services = [
      {
        service_name: 'YouTube',
        service_url: 'https://www.googleapis.com/youtube/v3',
      },
      {
        service_name: 'Twitter',
        service_url: 'https://api.twitter.com/2',
      },
      {
        service_name: 'Reddit',
        service_url: 'https://www.reddit.com/api/v1',
      },
      {
        service_name: 'GitHub',
        service_url: 'https://api.github.com',
      },
    ];
  
    try {
      // Insert data into the Service collection
      await Service.insertMany(services);
      console.log('Dummy services data inserted successfully');
    } catch (error) {
      console.error('Error inserting dummy data:', error);
    } finally {
      // Close the database connection
      await mongoose.connection.close();
    }
  }