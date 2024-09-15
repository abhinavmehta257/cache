import React, { useEffect, useState } from 'react'
import ServiceCard from './blocks/ServiceCard'
import Card from './skeletons/Card';

function Services() {
  const [services, setServices] = useState(null);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
        console.log(data);
        
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchServices();
  }, []);
  return (
    <div >
        <h1 className="text-primary-text dark:text-light-text text-[28px] font-bold font-['Inter'] leading-[35px]">Connect</h1>
        <div className='mt-[24px]'>
          {
            services ? 
            services.map((service,index)=><ServiceCard className='mt-[16px]' key={index} service={service}/>)
            : <Card />
          }
        </div>
        
    </div>
  )
}

export default Services
