import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const { signup } = useAuth();
  const nav = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !name) return Alert.alert('Oops!', 'Please tell us your name and email to get started.');
    setLoading(true);
    const res = await signup(email, password, name);
    setLoading(false);
    if (!res.success) Alert.alert('Error', res.error || 'Something went wrong. Let us check that.');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`flex-grow px-8 justify-center pb-12`}>
          
          <TouchableOpacity onPress={() => nav.goBack()} style={tw`mb-10 w-10 h-10 items-center justify-center bg-gray-50 rounded-[14px]`}>
             <Feather name="arrow-left" size={20} color="#1A1F36" />
          </TouchableOpacity>

          <View style={tw`items-center mb-12`}>
             <View style={tw`w-20 h-20 bg-[#1A1F36] rounded-[24px] items-center justify-center shadow-lg mb-6`}>
                <Ionicons name="sparkles" size={40} color="white" />
             </View>
             <Text style={tw`text-4xl font-black text-[#1A1F36] tracking-tighter mb-2`}>FIYO</Text>
             <Text style={tw`text-sm text-gray-400 font-bold text-center`}>Create your account and start tracking today</Text>
          </View>

          <View style={tw`space-y-6`}>
            <View style={tw`mb-5`}>
               <Text style={tw`text-[11px] font-black text-gray-500 uppercase mb-3 tracking-widest`}>Full Name</Text>
               <TextInput
                 value={name}
                 onChangeText={setName}
                 placeholder="Enter your name"
                 placeholderTextColor="#9CA3AF"
                 style={tw`bg-white rounded-2xl px-5 py-4 border border-gray-200 text-sm text-[#1A1F36] font-bold`}
               />
            </View>

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
               <Text style={tw`text-[11px] font-black text-gray-500 uppercase mb-3 tracking-widest`}>Password</Text>
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
              onPress={handleSignup}
              disabled={loading}
              style={tw`bg-[#1A1F36] py-5 rounded-2xl items-center mt-10 shadow-md`}
            >
              <Text style={tw`text-white font-black text-[14px] uppercase tracking-widest`}>{loading ? 'Joining...' : 'Create Account'}</Text>
            </TouchableOpacity>

            <View style={tw`flex-row justify-center mt-10`}>
              <Text style={tw`text-[11px] text-gray-400 font-bold`}>Already have an account? </Text>
              <TouchableOpacity onPress={() => nav.navigate('Login')}>
                <Text style={tw`text-[11px] font-black text-[#1A1F36] uppercase`}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`mt-16 items-center`}>
             <Text style={tw`text-[9px] text-gray-200 uppercase tracking-widest font-black text-center`}>FIYO USER PROTECTION SYSTEM READY.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
