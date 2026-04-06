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
    title:  (<div>분류<br/>코드</div>),
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

const AntComponent = ({ onRowSelect }) => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    /*
    getList({ page, size }).then(data => {
      debugger;
      setServerData(data);
      setLoading(false);
    });
    */
    
    setServerData({dtoList:[
      {tno: 1, category: 'A2B',name:'암모니아',temp: '60℃', pressure : '2.0 Mpa',material: 'A106 Gr. B(Sch.No 60)',shape: '#300, Raised Face(RF), Spiral wound gasket : 4.5mm',  unDestInstRate: '100', hitYn: 'YES' , Remark: 'RT,PT,UT,MT' },
      {tno: 1, category: 'B2A',name:'암모니아',temp: '-45℃', pressure : '1.8 Mpa',material: 'A312-TP 304(Sch.No 60)',shape: '#300, Raised Face(RF), Spiral wound gasket : 4.5mm',  unDestInstRate: '100', hitYn: 'NO' , Remark: 'RT,PT,UT,MT' },
    ]});
    setLoading(false);

  }, [page, size, refresh]);

  const handleTableChange = (pagination) => {
    //moveToList({ page: pagination.current, size: pagination.pageSize });
  };

  return (
    <div className="mt-10 mr-2 ml-2">
      <Table
        rowKey={(_, index) => index}
        columns={columns(serverData.dtoList)}
        dataSource={serverData.dtoList}
        loading={loading}
        /*
        pagination={{
          current: serverData.currentPage || page,
          pageSize: size,
          total: serverData.totalCount,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          showTotal: (total) => `총 ${total}건`,
        }}

        onChange={handleTableChange}
         */
        onRow={(record) => ({
          onClick: () => onRowSelect && onRowSelect(record),
          style: { cursor: 'pointer' },
        })}
      />
    </div>
  );
};

export default AntComponent;
