import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Settings, CreditCard, History, Edit, HelpCircle, LogOut, Trash2,ArrowLeft } from "lucide-react";
import axios from "axios";

const MONGO_URI = "mongodb+srv://<username>:<password>@pureinsight-shard-00-00.64sx4.mongodb.net/<database>?retryWrites=true&w=majority";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const totalSteps = 8;

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const fetchUserProfile = async () => {
    try {
      // Replace this with your backend API call to fetch user data
      const response = await axios.post("/api/getUserProfile", { mongoUri: MONGO_URI });
      const userProfile = response.data;

      if (userProfile) {
        setProfile(userProfile);
        calculateProgress(userProfile.verification_data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const calculateProgress = (verificationData) => {
    const skipped = [];
    let completed = 0;

    Object.entries(verificationData).forEach(([key, value]) => {
      if (value && value !== "") {
        completed++;
      } else {
        skipped.push(key);
      }
    });

    setCompletedSteps(completed);
    setSkippedSteps(skipped);
  };

  const getProgressPercentage = () => {
    return (completedSteps / totalSteps) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isMobile && (
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg shadow-sm px-6 py-4 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-100 mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}
      {/* Profile Header */}
      <div className="bg-white p-6 shadow-sm">
        <div className="max-w-lg mx-auto">
          <div className="relative">
            <div className="absolute top-2 right-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={
                    profile?.avatar_url ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <h1 className="mt-4 text-xl font-semibold text-gray-900">
                {profile?.email?.split("@")[0] || "User"}
              </h1>
              <p className="text-gray-500">{profile?.email}</p>

              {completedSteps === totalSteps ? (
                <div className="mt-2 py-2 px-4 bg-green-50 rounded-full text-sm text-green-600">
                  You have completed your profile
                </div>
              ) : (
                <div className="mt-2 py-2 px-4 bg-blue-50 rounded-full text-sm text-blue-600">
                  Complete the profile for more accuracy
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-lg mx-auto mt-6 px-4">
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Progress Bar */}
          {completedSteps !== totalSteps && (
            <div className="bg-white p-6 rounded-t-xl shadow-sm">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span className="font-bold">{completedSteps}/{totalSteps} completed</span>
                {skippedSteps.length > 0 && (
                  <span className="text-orange-500">{skippedSteps.length} steps skipped</span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              {skippedSteps.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  Skipped:{" "}
                  {skippedSteps.map((step) =>
                    step.charAt(0).toUpperCase() + step.slice(1)
                  ).join(", ")}
                </div>
              )}
            </div>
          )}

          <MenuLink icon={<CreditCard />} text="Your current plan" />
          <MenuLink icon={<CreditCard />} text="Payments" />
          <MenuLink icon={<History />} text="History" />
          <MenuLink icon={<Edit />} text="Edit profile" />
          <MenuLink icon={<HelpCircle />} text="Support" border={false} />
        </div>

        {/* Footer Actions */}
        <div className="mt-6 space-y-4">
          <button className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
            <LogOut className="w-5 h-5 inline-block mr-2" />
            Log out
          </button>
          <button className="w-full py-3 px-4 text-red-500 hover:text-red-600 transition-colors">
            <Trash2 className="w-5 h-5 inline-block mr-2" />
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuLink = ({ icon, text, border = true }) => (
  <div
    className={`flex items-center justify-between px-6 py-4 ${
      border ? "border-b border-gray-200" : ""
    }`}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span>{text}</span>
    </div>
    <svg
      className="w-5 h-5 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l7 7m0 -14H9m14 -7H9" />
    </svg>
  </div>
);

export default ProfilePage;
