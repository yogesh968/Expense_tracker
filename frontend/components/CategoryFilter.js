import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import tw from 'twrnc';

const categories = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Others'];

export default function CategoryFilter({ value = 'All', onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-3`} contentContainerStyle={{ paddingRight: 16 }}>
      <View style={tw`flex-row`}>
        {categories.map((c) => {
          const active = c === value;
          return (
            <TouchableOpacity
              key={c}
              onPress={() => onChange && onChange(c)}
              style={tw`${active ? 'bg-blue-600' : 'bg-neutral-100'} px-4 py-2 mr-2 rounded-full`}
            >
              <Text style={tw`${active ? 'text-white' : 'text-neutral-700'}`}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
