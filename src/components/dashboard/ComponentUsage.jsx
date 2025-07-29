import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';

const ComponentUsage = () => {
  const option = {
    title: {
      text: 'Component Usage Analytics',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Downloads', 'Usage']
    },
    xAxis: {
      type: 'category',
      data: ['Auth Module', 'Data Viz', 'Payment', 'Notifications', 'File Mgmt', 'Search']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Downloads',
        type: 'bar',
        data: [12400, 8700, 15200, 6300, 9100, 11600],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#0ea5e9' },
              { offset: 1, color: '#0284c7' }
            ]
          }
        }
      },
      {
        name: 'Usage',
        type: 'line',
        data: [8200, 6100, 10800, 4200, 6400, 8900],
        lineStyle: {
          color: '#8b5cf6'
        },
        itemStyle: {
          color: '#8b5cf6'
        }
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <ReactECharts 
        option={option} 
        style={{ height: '400px' }}
        opts={{ renderer: 'svg' }}
      />
    </motion.div>
  );
};

export default ComponentUsage;