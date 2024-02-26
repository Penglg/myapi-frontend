import {
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';

export type Props = {
  values: API.InterfaceInfoUpdateRequest;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { values, visible, columns, onCancel, onSubmit } = props;

  const formRef = useRef<ProFormInstance>();

  // 监听某个变量的变化，若变化则会触发里面的函数
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values])

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }} />
    </Modal>
  );


};

export default UpdateModal;
