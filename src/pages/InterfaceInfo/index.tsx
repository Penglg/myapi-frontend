import { getInterfaceInfoByIdUsingGET } from '@/services/myapi-backend/intefaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Card, Descriptions, message } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 * @returns 
 */
const Welcome: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const param = useParams();

  const loadData = async () => {
    if (!param.id) {
      message.error("接口信息不存在");
    } 
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(param.id)
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  }

  // 这个组件首次加载时会向后台发送请求
  useEffect( () => {
    loadData();
  }, [])

  /**    
   * createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
     */
  return (
    <PageContainer title = "查看接口文档">
      <Card>
        {data ? (
          <Descriptions title="data.name" column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '正常' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口信息不存在</>
        )}
      </Card>
      
    </PageContainer>
  );
};

export default Welcome;
