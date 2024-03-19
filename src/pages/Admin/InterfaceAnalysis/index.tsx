import {
  PageContainer,
} from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { listTopInvokeInterfaceInfoUsingGET } from '@/services/myapi-backend/analysisController';

/**
 * 接口数据分析
 */
const InterfaceAnalysis: React.FC = () => {

  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  const [loading, setLoading] = useState(true);

  // 页面加载时会触发这个方法
  // 依赖项的数组中的元素发生改变时，就会重新触发这个方法
  // 这里依赖项的数组为空数组[]，因此这个方法只会被加载一次
  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGET().then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
    } catch (e: any) {

    }
  }, [])
  
  // 映射，{value, name}
  const chartData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name
    }
  })
  
  const option = {
    title: {
      text: 'Top10 - 被调用次数最多的接口',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '接口',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <PageContainer>
        <ReactECharts loadingOption={{
          showLoading: loading
        }} option={option} />
    </PageContainer>
  );
};

export default InterfaceAnalysis;