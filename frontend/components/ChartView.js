import React from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import tw from 'twrnc';

const screenWidth = Dimensions.get('window').width;

export function PieChartView({ data }) {
  return (
    <View style={tw`bg-white rounded-2xl p-4 shadow-sm border border-neutral-100`}>
      <PieChart
        data={data}
        width={screenWidth - 32}
        height={180}
        accessor={'amount'}
        backgroundColor={'transparent'}
        chartConfig={{
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          labelColor: () => '#64748b',
        }}
        hasLegend={true}
        paddingLeft={'0'}
        absolute
      />
    </View>
  );
}

export function BarChartView({ data, labels }) {
  return (
    <View style={tw`bg-white rounded-2xl p-4 shadow-sm border border-neutral-100`}>
      <BarChart
        data={{ labels, datasets: [{ data }] }}
        width={screenWidth - 32}
        height={200}
        yAxisLabel="₹ "
        fromZero
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
          labelColor: () => '#64748b',
          propsForLabels: { fontSize: 10 },
        }}
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}
