import React, { useEffect, useState } from 'react'
import ServiceCard from './blocks/ServiceCard'

function Services() {
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchServices();
  }, []);
  return (
    <div >
        <h1 className="text-center text-[#0c141c] text-[24px] font-bold font-['Inter'] leading-[23px]">Connect</h1>
        <div className='mt-[56px]'>
          {
            services.map((service,index)=><ServiceCard className='mt-[16px]' key={index} serviceName={service.service_name} permissions={service.permissions.join(", ")} serviceIcon={service.service_icon} isConnected={service._is_sub}/>)
          }
        </div>
        
    </div>
  )
}

export default Services


// eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.qB0WnXHFym4LZT9ZRRdg7tnLyyltdzBaa4FMX2Q_9y9sCNneoW4J08kM0iZ2Zr0-mf6kB54lulKpLWyv6DC7NSpKIPTvegku.m19Px0yM889HiqUBdg24Dg.Areg6-Bjl2xCqFfxIYR-tIMBnqEQ_SpY-iAjAOgtctdbbp4boYzLsp-AbExc7sndHm0A9Vs54tCTKu6CJDoFe5aDnqFJwHd7Pa8IhJ0Eu_Q8ToWxU_76Bmx--Qd4LMe5ar0n13i8Kwf-vbmfXhM3LfDlYgah9eMQBuhbFWAiP30.fYSq25ZIycYuUNS4u5_YqQC5dPknyftiCm1Lo2ltugE

// eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.5F15Rb6eNlWvYUClUTJUYBecS85A0_VJzEsg51mhstnjMesrF8_NKEPr-2BaW1KaE2wYlYBwGair4hkOTFgwtkmmUhfPUcUS.4s1TtXCstWiXeXqGU5_3wA.NtoxIbSi8TPSyl3SsUNdqL0N6jRFbjSwUODzjNKWAMiVkoEt21BEm-tM_WbTSxa_2rqGJDq-ZfG_vkGAoM6QtPFCiItZTOhnmKXUNNbgn82n9ASmE0JNemsPwix0Fjom7BYKzCa9Y93gH2kTxzW03aFTGApDSXPFromy3ryYimY.0g70NLXXuC6XgI9zQCBLCudWjNzx7c8xFEmmDIA_1w4