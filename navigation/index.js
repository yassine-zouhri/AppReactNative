import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PointDetail from '../screens/PointDetail'

const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
      
    </AuthProvider>
  );
}

export default Providers;