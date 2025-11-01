import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    bio: "Passionate learner and software developer with 5+ years of experience in web development. Always eager to learn new technologies and share knowledge with the community.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData?.bio?.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Mock save functionality
      console.log('Saving profile data:', formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
      bio: "Passionate learner and software developer with 5+ years of experience in web development. Always eager to learn new technologies and share knowledge with the community.",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA"
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
        {!isEditing ?
        <Button
          variant="outline"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          onClick={() => setIsEditing(true)}>

            Edit Profile
          </Button> :

        <div className="flex items-center space-x-2">
            <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}>

              Cancel
            </Button>
            <Button
            variant="default"
            size="sm"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}>

              Save Changes
            </Button>
          </div>
        }
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border">
              <Image
                src="https://images.unsplash.com/photo-1700561791890-a15d45b9c79d"
                alt="Professional headshot of woman with shoulder-length brown hair wearing white blazer"
                className="w-full h-full object-cover" />

            </div>
            {isEditing &&
            <Button
              variant="default"
              size="icon"
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full shadow-elevated">

                <Icon name="Camera" size={16} />
              </Button>
            }
          </div>
          <p className="text-sm text-muted-foreground mt-3 text-center">
            {isEditing ? 'Click camera to change photo' : 'Profile Photo'}
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              error={errors?.firstName}
              required />

            <Input
              label="Last Name"
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              error={errors?.lastName}
              required />

          </div>

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            error={errors?.email}
            description="This email is used for login and notifications"
            required />


          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="+1 (555) 123-4567" />


          <Input
            label="Location"
            name="location"
            value={formData?.location}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="City, State/Country" />


          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData?.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md text-sm transition-smooth resize-none ${
              isEditing ?
              'border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent' :
              'border-border bg-muted text-muted-foreground cursor-not-allowed'} ${
              errors?.bio ? 'border-error' : ''}`}
              placeholder="Tell us about yourself..." />

            <div className="flex items-center justify-between mt-1">
              {errors?.bio &&
              <p className="text-sm text-error">{errors?.bio}</p>
              }
              <p className="text-xs text-muted-foreground ml-auto">
                {formData?.bio?.length}/500 characters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default PersonalInfoSection;