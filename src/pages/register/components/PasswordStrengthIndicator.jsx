import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: pwd?.length >= 8,
      lowercase: /[a-z]/?.test(pwd),
      uppercase: /[A-Z]/?.test(pwd),
      numbers: /\d/?.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(pwd)
    };

    score = Object.values(checks)?.filter(Boolean)?.length;

    const strengthLevels = {
      0: { label: '', color: '', bgColor: '' },
      1: { label: 'Very Weak', color: 'text-red-600', bgColor: 'bg-red-500' },
      2: { label: 'Weak', color: 'text-red-500', bgColor: 'bg-red-400' },
      3: { label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-500' },
      4: { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-500' },
      5: { label: 'Strong', color: 'text-green-600', bgColor: 'bg-green-500' }
    };

    return { score, checks, ...strengthLevels?.[score] };
  };

  const strength = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bar */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              level <= strength?.score ? strength?.bgColor : 'bg-muted'
            }`}
          />
        ))}
      </div>
      {/* Strength label */}
      {strength?.label && (
        <p className={`text-xs font-medium ${strength?.color}`}>
          Password strength: {strength?.label}
        </p>
      )}
      {/* Requirements checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
        <div className={`flex items-center space-x-1 ${
          strength?.checks?.length ? 'text-green-600' : 'text-muted-foreground'
        }`}>
          <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[10px] ${
            strength?.checks?.length ? 'bg-green-100 text-green-600' : 'bg-muted'
          }`}>
            {strength?.checks?.length ? '✓' : '○'}
          </span>
          <span>8+ characters</span>
        </div>
        
        <div className={`flex items-center space-x-1 ${
          strength?.checks?.uppercase ? 'text-green-600' : 'text-muted-foreground'
        }`}>
          <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[10px] ${
            strength?.checks?.uppercase ? 'bg-green-100 text-green-600' : 'bg-muted'
          }`}>
            {strength?.checks?.uppercase ? '✓' : '○'}
          </span>
          <span>Uppercase letter</span>
        </div>
        
        <div className={`flex items-center space-x-1 ${
          strength?.checks?.lowercase ? 'text-green-600' : 'text-muted-foreground'
        }`}>
          <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[10px] ${
            strength?.checks?.lowercase ? 'bg-green-100 text-green-600' : 'bg-muted'
          }`}>
            {strength?.checks?.lowercase ? '✓' : '○'}
          </span>
          <span>Lowercase letter</span>
        </div>
        
        <div className={`flex items-center space-x-1 ${
          strength?.checks?.numbers ? 'text-green-600' : 'text-muted-foreground'
        }`}>
          <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[10px] ${
            strength?.checks?.numbers ? 'bg-green-100 text-green-600' : 'bg-muted'
          }`}>
            {strength?.checks?.numbers ? '✓' : '○'}
          </span>
          <span>Number</span>
        </div>
        
        <div className={`flex items-center space-x-1 ${
          strength?.checks?.special ? 'text-green-600' : 'text-muted-foreground'
        } sm:col-span-2`}>
          <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[10px] ${
            strength?.checks?.special ? 'bg-green-100 text-green-600' : 'bg-muted'
          }`}>
            {strength?.checks?.special ? '✓' : '○'}
          </span>
          <span>Special character (!@#$%^&*)</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;