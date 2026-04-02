import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { login } = useAuth();
  const nav = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Oops!', 'Please enter your email and password to continue.');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.success) Alert.alert('Login Error', res.error || 'Something went wrong. Please check your details.');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`flex-grow px-8 justify-center pb-12`}>
          
          <View style={tw`items-center mb-10`}>
             <View style={tw`w-20 h-20 bg-[#1A1F36] rounded-[24px] items-center justify-center shadow-lg mb-6`}>
                <Ionicons name="wallet" size={40} color="white" />
             </View>
             <Text style={tw`text-4xl font-black text-[#1A1F36] tracking-tighter mb-2`}>FIYO</Text>
             <Text style={tw`text-sm text-gray-400 font-bold text-center`}>Login to your account to manage your money</Text>
          </View>

          <View style={tw`space-y-6`}>
            <View style={tw`mb-5`}>
               <Text style={tw`text-[11px] font-black text-gray-500 uppercase mb-3 tracking-widest`}>Email</Text>
               <TextInput
                 value={email}
                 onChangeText={setEmail}
                 placeholder="your@email.com"
                 placeholderTextColor="#9CA3AF"
                 autoCapitalize="none"
                 style={tw`bg-white rounded-2xl px-5 py-4 border border-gray-200 text-sm text-[#1A1F36] font-bold`}
               />
            </View>

            <View style={tw`mb-2`}>
               <View style={tw`flex-row justify-between mb-3`}>
                  <Text style={tw`text-[11px] font-black text-gray-500 uppercase tracking-widest`}>Password</Text>
                  <TouchableOpacity>
                     <Text style={tw`text-[11px] font-bold text-[#1A1F36] uppercase tracking-widest`}>Forgot?</Text>
                  </TouchableOpacity>
               </View>
               <TextInput
                 value={password}
                 onChangeText={setPassword}
                 placeholder="••••••••"
                 placeholderTextColor="#9CA3AF"
                 secureTextEntry
                 style={tw`bg-white rounded-2xl px-5 py-4 border border-gray-200 text-sm text-[#1A1F36] font-bold`}
               />
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={tw`bg-[#1A1F36] py-5 rounded-2xl items-center mt-10 shadow-md`}
            >
              <Text style={tw`text-white font-black text-[14px] uppercase tracking-widest`}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>

            <View style={tw`flex-row justify-center mt-8`}>
              <Text style={tw`text-[11px] text-gray-400 font-bold`}>New to FIYO? </Text>
              <TouchableOpacity onPress={() => nav.navigate('Signup')}>
                <Text style={tw`text-[11px] font-black text-[#1A1F36] uppercase`}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`mt-24 items-center`}>
             <Text style={tw`text-[9px] text-gray-200 uppercase tracking-widest font-black text-center`}>PROTECTED BY FIYO SECURITY DEPLOYMENT.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
