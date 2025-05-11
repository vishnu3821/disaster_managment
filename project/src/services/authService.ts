import { User } from '../contexts/AuthContext';

// Mock user database
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    role: 'user',
    location: 'New York, NY',
    phone: '555-123-4567'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'volunteer@example.com',
    role: 'volunteer',
    location: 'Los Angeles, CA',
    phone: '555-987-6543',
    skills: ['First Aid', 'Search and Rescue', 'Fire Safety']
  }
];

// Mock login function
export const mockLogin = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const user = users.find(u => u.email === email);
      
      if (user) {
        // In a real app, we would verify the password
        // For demo purposes, any password is accepted
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800);
  });
};

// Mock register function
export const mockRegister = async (
  name: string, 
  email: string, 
  password: string, 
  role: 'user' | 'volunteer'
): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        reject(new Error('User with this email already exists'));
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: (users.length + 1).toString(),
        name,
        email,
        role,
        skills: role === 'volunteer' ? [] : undefined
      };
      
      // Add to "database"
      users.push(newUser);
      
      resolve(newUser);
    }, 800);
  });
};

// Mock logout function
export const mockLogout = () => {
  // In a real app, this would invalidate tokens, etc.
  return true;
};