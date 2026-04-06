import { useEffect, useState } from "react";
import { Table } from 'antd';
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  dtoList: [],
  /*
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  currentPage: 0
  */
}

// 연속된 동일 값의 rowSpan 계산
const getRowSpan = (data, dataIndex, rowIndex) => {
  const current = data[rowIndex][dataIndex];
  if (rowIndex > 0 && data[rowIndex - 1][dataIndex] === current) {
    return 0; // 이전 행에서 이미 병합됨 → 숨김
  }
  let span = 1;
  for (let i = rowIndex + 1; i < data.length; i++) {
    if (data[i][dataIndex] === current) span++;
    else break;
  }
  return span;
};

const mergeCell = (dataIndex, data) => ({
  onCell: (_, rowIndex) => ({ rowSpan: getRowSpan(data, dataIndex, rowIndex) }),
});

const columns = (data) => [
  {
    title: 'No',
    dataIndex: 'tno',
    key: 'tno',
    width: 80,
    align: 'center',
    ...mergeCell('tno', data),
  },
  {
    title: (<div>분류<br/>코드</div>),
    dataIndex: 'category',
    key: 'category',
    ...mergeCell('category', data),
  },
  {
    title: (<div>유체의 명칭 <br/>또는 구분</div>),
    dataIndex: 'name',
    key: 'name',
    width: 150,
    align: 'center',
    ...mergeCell('name', data),
  },
  {
    title: '설계온도',
    dataIndex: 'temp',
    key: 'temp',
    width: 150,
    align: 'center',
    ...mergeCell('temp', data),
  },
  {
    title: '설계압력',
    dataIndex: 'pressure',
    key: 'pressure',
    width: 150,
    align: 'center',
    ...mergeCell('pressure', data),
  },
  {
    title: '배관재질',
    dataIndex: 'material',
    key: 'material',
    width: 150,
    align: 'center',
    ...mergeCell('material', data),
  },
  {
    title: '개스킷 재질 및 형태',
    dataIndex: 'shape',
    key: 'shape',
    width: 150,
    align: 'center',
    ...mergeCell('shape', data),
  },
  {
    title: '비파괴 검사율',
    dataIndex: 'unDestInstRate',
    key: 'unDestInstRate',
    width: 150,
    align: 'center',
    ...mergeCell('unDestInstRate', data),
  },
  {
    title: '후열처리 여부',
    dataIndex: 'hitYn',
    key: 'hitYn',
    width: 150,
    align: 'center',
    ...mergeCell('hitYn', data),
  },
  {
    title: '비고',
    dataIndex: 'remark',
    key: 'remark',
    width: 150,
    align: 'center',
    ...mergeCell('remark', data),
  },
];

const AntComponent = ({ selectedRow }) => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (selectedRow) {
      setLoading(true);
      setServerData({ dtoList: [selectedRow] });
      setLoading(false);
    }
  }, [selectedRow]);

  return (
    <div className="mt-10 mr-2 ml-2">
      {selectedRow && (
        <div className="mb-4 p-4 border border-blue-300 rounded bg-blue-50">
          <div className="font-bold mb-2">선택된 행 정보</div>
          <div>분류코드: {selectedRow.category}</div>
          <div>유체명: {selectedRow.name}</div>
          <div>설계온도: {selectedRow.temp}</div>
          <div>설계압력: {selectedRow.pressure}</div>
        </div>
      )}
      <Table
        rowKey={(_, index) => index}
        columns={columns(serverData.dtoList)}
        dataSource={serverData.dtoList}
        loading={loading}
      />
    </div>
  );
};

export default AntComponent;
