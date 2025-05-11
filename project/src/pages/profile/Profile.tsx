import React, { useState } from 'react';
import { User, MapPin, Phone, Mail, Save, Edit2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import { showAlert } from '../../components/common/AlertMessage';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  if (!user) return null;

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      updateProfile({
        name,
        location,
        phone,
        skills
      });
      
      setIsEditing(false);
      showAlert({
        message: 'Profile updated successfully',
        type: 'success'
      });
    } catch (error) {
      showAlert({
        message: 'Failed to update profile',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 p-6 text-white">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 mr-4">
                <User size={36} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="capitalize">{user.role}</p>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            <div className="flex justify-end mb-4">
              {isEditing ? (
                <Button
                  variant="primary"
                  icon={<Save size={18} />}
                  onClick={handleSaveProfile}
                  isLoading={isSaving}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="outline"
                  icon={<Edit2 size={18} />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="text-gray-800">{user.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="flex items-center">
                      <Mail size={18} className="text-gray-500 mr-2" />
                      <p className="text-gray-800">{user.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Phone size={18} className="text-gray-500 mr-2" />
                        <p className="text-gray-800">{user.phone || 'Not provided'}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Enter your location"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <MapPin size={18} className="text-gray-500 mr-2" />
                        <p className="text-gray-800">{user.location || 'Not provided'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  {user.role === 'volunteer' ? 'Skills & Expertise' : 'Account Information'}
                </h2>
                
                {user.role === 'volunteer' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Skills
                      </label>
                      
                      {isEditing ? (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              placeholder="Add a skill (e.g., First Aid, Search and Rescue)"
                            />
                            <button
                              type="button"
                              onClick={handleAddSkill}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Add
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                              <div 
                                key={index} 
                                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                            
                            {skills.length === 0 && (
                              <p className="text-gray-500 text-sm">No skills added yet</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {skills.length > 0 ? (
                            skills.map((skill, index) => (
                              <span 
                                key={index} 
                                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500">No skills listed</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certification
                      </label>
                      <p className="text-gray-800">Volunteer certification pending</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Type
                      </label>
                      <p className="text-gray-800 capitalize">{user.role}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reports Submitted
                      </label>
                      <p className="text-gray-800">4 reports</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Member Since
                      </label>
                      <p className="text-gray-800">June 2022</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <h2 className="text-lg font-semibold mb-4">Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="email_notifications"
                    name="email_notifications"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="email_notifications" className="ml-2 block text-sm text-gray-700">
                    Email Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sms_notifications"
                    name="sms_notifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sms_notifications" className="ml-2 block text-sm text-gray-700">
                    SMS Notifications
                  </label>
                </div>
                
                {user.role === 'volunteer' && (
                  <div className="flex items-center">
                    <input
                      id="available_volunteer"
                      name="available_volunteer"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="available_volunteer" className="ml-2 block text-sm text-gray-700">
                      Available for emergencies
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;