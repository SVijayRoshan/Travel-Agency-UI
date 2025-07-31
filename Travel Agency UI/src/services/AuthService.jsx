// AuthService.js - Authentication service module
import bcryptjs from 'bcryptjs';

export class AuthService {
  static instance = null;

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    this.user = null;
    const storedUser = this.getCurrentUser();
    if (storedUser) {
      this.user = storedUser;
    }
  }

  async signup(email, password, fullName) {
    try {
      console.log('Starting signup process...');
      if (!email || !password || !fullName) {
        throw new Error('All fields are required');
      }
      if (!this.isValidEmail(email)) {
        throw new Error('Invalid email format');
      }
      if (!this.isValidPassword(password)) {
        throw new Error('Password must be at least 8 characters long and contain letters and numbers');
      }
      
      // Get existing users from localStorage
      const usersStr = localStorage.getItem('users') || '[]';
      const users = JSON.parse(usersStr);
      console.log('Existing users in localStorage:', users);
      
      // Check if user already exists (case insensitive)
      const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      const hashedPassword = await bcryptjs.hash(password, 10);
      const userData = {
        id: Date.now(),
        email: email.toLowerCase(), // Store email in lowercase
        name: fullName,
        password: hashedPassword,
        phone: '',
        address: ''
      };
      
      // Add new user to the array and store back in localStorage
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
      console.log('User data stored in localStorage:', userData);
      
      // Set current user without password
      const userWithoutPassword = { ...userData, password: undefined };
      this.user = userWithoutPassword;
      console.log('Signup successful, returning user:', userWithoutPassword);
      return userWithoutPassword;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      console.log('Starting login process...');
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Get users from localStorage
      const usersStr = localStorage.getItem('users') || '[]';
      const users = JSON.parse(usersStr);
      console.log('Stored users in localStorage:', users);
      
      // Find the user with matching email (case insensitive)
      const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        throw new Error('User not found. Please sign up first.');
      }
      
      console.log('Found user:', user);
      
      // Compare the input password with the stored hashed password
      const isValidPassword = await bcryptjs.compare(password, user.password);
      console.log('Password validation result:', isValidPassword);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      
      // Set current user without password
      const userWithoutPassword = { ...user, password: undefined };
      this.user = userWithoutPassword;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      console.log('Login successful, returning user:', userWithoutPassword);
      return userWithoutPassword;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout() {
    try {
      console.log('Starting logout process...');
      // Clear only the current user session
      this.user = null;
      localStorage.removeItem('currentUser');
      console.log('Logout successful - current user cleared');
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout');
    }
  }

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('currentUser');
      if (!userStr) return null;
      const user = JSON.parse(userStr);
      return { ...user, password: undefined };
    } catch (error) {
      console.error('Get current user error:', error);
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  async updateProfile(email, updates) {
    try {
      console.log('Starting profile update...');
      console.log('Updates to apply:', updates);
      
      if (!this.user) {
        throw new Error('No user logged in');
      }
      
      // Get all users from localStorage
      const usersStr = localStorage.getItem('users') || '[]';
      const users = JSON.parse(usersStr);
      
      // Find the current user (case insensitive)
      const userIndex = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
      if (userIndex === -1) {
        throw new Error('User data not found');
      }
      
      // Update the user data
      const updatedUser = {
        ...users[userIndex],
        name: updates.name || users[userIndex].name,
        phone: updates.phone || users[userIndex].phone,
        address: updates.address || users[userIndex].address,
        email: users[userIndex].email, // Keep the original email
        password: users[userIndex].password // Keep the original password
      };
      
      // Update the user in the array
      users[userIndex] = updatedUser;
      
      // Store the updated users array back in localStorage
      localStorage.setItem('users', JSON.stringify(users));
      
      // Update the current user instance
      this.user = { ...updatedUser, password: undefined };
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      console.log('Profile update successful');
      
      return this.user;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password) {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  }

  async deleteAccount(email) {
    try {
      console.log('Starting account deletion...');
      
      // Get all users from localStorage
      const usersStr = localStorage.getItem('users') || '[]';
      const users = JSON.parse(usersStr);
      
      // Find the user index (case insensitive)
      const userIndex = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Remove the user from the array
      users.splice(userIndex, 1);
      
      // Update localStorage
      localStorage.setItem('users', JSON.stringify(users));
      
      // Clear current user if it's the deleted user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
        this.user = null;
        localStorage.removeItem('currentUser');
      }
      
      console.log('Account deleted successfully');
      return true;
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  }
}

export default AuthService.getInstance();
