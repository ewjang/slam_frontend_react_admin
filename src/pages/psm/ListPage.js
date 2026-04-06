import { useState } from "react";
import AntComponent from "../../components/todo/AntComponent";
import AntComponentBottom from "../../components/todo/Ant2Component";

const ListPage = () => {
  // 상위 컴포넌트에서 선택된 행 데이터 관리
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        배관 및 개스킷 명세
      </div>
      {/* AntComponent 행 클릭 시 selectedRow 업데이트 */}
      <AntComponent onRowSelect={setSelectedRow} />
      {/* selectedRow를 AntComponentBottom으로 전달 */}
      <AntComponentBottom selectedRow={selectedRow} />
    </div>
  );
}

export default ListPage;
