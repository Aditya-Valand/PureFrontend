import React from 'react';
import Navbar from './Navbar';
import { useEffect } from 'react';
import feather from 'feather-icons';

const AboutUs = () => {
    useEffect(() => {
        feather.replace();
      }, []);
  const teamMembers = [
    {
      name: "Megha Apalia",
      role: "Front-end Developer",
      education: "4th year CE student at GECR"
    },
    {
      name: "Anirudh Singh", 
      role: "Back-end Developer",
      education: "4th year EC student at GECR"
    },
    {
      name: "Liza Lunagariya",
      role: "UI/UX",
      education: "4th year CE student at GECR"
    },
    {
      name: "Dhruvil Meniya",
      role: "Back-end Developer", 
      education: "4th year CE student at GECR"
    }
  ];

  return (
    <>
    <Navbar/>
    <div>
      <section className="about-section relative overflow-hidden py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-screen-lg">
          <h1 className="text-[#2F4F2F] text-4xl md:text-5xl font-bold mb-16 text-center">About us</h1>
          
          <div className="flex gap-12 items-center flex-col">
            <div className="flex justify-start">
              <div className="team-member w-full sm:w-1/2">
              <i data-feather="feather"></i>
                <div className="member-info">
                  As we know, packaged food and body-care items are part of our daily routine, definitely we want to use product with suitable ingredients for our self. It's quiet difficult to research manually as well as time-consuming.
                </div>
              </div>  
            </div>
                  
            <div className="flex justify-end">
              <div className="team-member w-full sm:w-1/2">
                <div className="member-info">
                  In this fast world, we need time saving approaches. So by scanning barcode of product, you can see pros and cons of every ingredients rather then searching manually.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section max-w-screen-lg mx-auto px-4 py-16 my-20">
        <h1 className="text-center text-4xl mb-16">
          <span className="text-[#2F462F] font-bold">An energetic and dedicated team </span>
          <span className="text-[#8BA88B]">driving a project that's making </span>
          <span className="text-[#2F462F] font-bold">a meaningful impact</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
              <div className="member-info">
                <h3 className="name">{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="education">{member.education}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
          </>
  );
};

export default AboutUs;