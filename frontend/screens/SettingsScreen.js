import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import tw from 'twrnc';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout, style: 'destructive' }
    ]);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-6 pt-6 pb-6 border-b border-gray-100 flex-row items-center justify-between`}>
          <View>
             <Text style={tw`text-[11px] font-black uppercase text-gray-400 tracking-widest mb-0.5`}>FIYO</Text>
             <Text style={tw`text-2xl font-black text-gray-900 tracking-tighter`}>Profile</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={tw`w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100`}>
             <Feather name="log-out" size={18} color="#EF4444" />
          </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`px-6 pb-40`} showsVerticalScrollIndicator={false}>
         <View style={tw`mt-8`}>
            <Text style={tw`text-[11px] font-black uppercase text-gray-400 tracking-widest mb-4`}>User Identity</Text>
            <View style={tw`bg-gray-50/50 rounded-3xl p-6 mb-10 border border-gray-100 flex-row items-center`}>
               <View style={tw`w-14 h-14 rounded-2xl bg-[#1A1F36] items-center justify-center mr-4 shadow-sm`}>
                   <Text style={tw`text-white font-black text-xl`}>{user?.name?.[0] || 'U'}</Text>
               </View>
               <View style={tw`flex-1`}>
                 <Text style={tw`text-base font-black text-gray-900 mb-0.5`}>{user?.name || 'Guest User'}</Text>
                 <Text style={tw`text-xs font-bold text-gray-400 uppercase tracking-tight`}>{user?.email || 'email@fiyo.app'}</Text>
               </View>
               <View style={tw`bg-green-50 px-3 py-1.5 rounded-xl border border-green-100`}>
                   <Text style={tw`text-green-600 text-[9px] font-black uppercase tracking-widest`}>Active</Text>
               </View>
            </View>

            <Text style={tw`text-[11px] font-black uppercase text-gray-400 tracking-widest mb-6`}>Settings</Text>
            {[
                { title: 'Biometric Access', icon: 'finger-print-outline', enabled: true },
                { title: 'Push Notifications', icon: 'notifications-outline', enabled: false },
                { title: 'Cloud Data Sync', icon: 'cloud-done-outline', enabled: true },
            ].map((item, idx) => (
                <View key={idx} style={tw`flex-row items-center justify-between mb-8 pb-8 border-b border-gray-50`}>
                   <View style={tw`flex-row items-center`}>
                      <View style={tw`w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4`}>
                        <Ionicons name={item.icon} size={20} color="#1A1F36" />
                      </View>
                      <Text style={tw`text-sm font-bold text-gray-900 tracking-tight`}>{item.title}</Text>
                   </View>
                   <Switch 
                      value={item.enabled} 
                      trackColor={{ false: '#F1F5F9', true: '#1A1F36' }}
                      thumbColor="#FFFFFF"
                      style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                   />
                </View>
            ))}

            <TouchableOpacity style={tw`mt-4 bg-gray-50 py-5 rounded-2xl items-center border border-gray-100 shadow-xs`}>
               <Text style={tw`text-gray-900 text-[10px] font-black uppercase tracking-widest`}>Clear App Cache</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
}
