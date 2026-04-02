import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '../utils/formatDate';
import tw from 'twrnc';

const categoryIcon = (cat) => {
  switch (cat) {
    case 'Food':
      return 'fast-food';
    case 'Travel':
      return 'car';
    case 'Shopping':
      return 'bag';
    case 'Bills':
      return 'cash';
    default:
      return 'grid';
  }
};

export default function ExpenseCard({ item, onEdit, onDelete }) {
  return (
    <View style={tw`bg-white rounded-2xl p-4 mb-3 shadow-sm border border-neutral-100`}>
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <View style={tw`bg-blue-100 rounded-full p-2 mr-3`}>
            <Ionicons name={categoryIcon(item.category)} size={20} color="#2563eb" />
          </View>
          <View>
            <Text style={tw`text-base font-semibold text-neutral-900`}>{item.title}</Text>
            <Text style={tw`text-xs text-neutral-500`}>{item.category} • {formatDate(item.date)}</Text>
          </View>
        </View>
        <Text style={tw`text-lg font-bold text-neutral-900`}>₹ {Number(item.amount).toFixed(2)}</Text>
      </View>
      {(onEdit || onDelete) && (
        <View style={tw`flex-row justify-end mt-3`}>
          {onEdit && (
            <TouchableOpacity onPress={() => onEdit(item)} style={tw`px-3 py-1 rounded-full bg-blue-50 mr-3`}>
              <Text style={tw`text-blue-700`}>Edit</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={() => onDelete(item)} style={tw`px-3 py-1 rounded-full bg-red-50`}>
              <Text style={tw`text-red-600`}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
