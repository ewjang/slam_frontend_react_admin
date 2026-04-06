import ListComponent from "../../components/todo/ListComponent";
import AntComponent from "../../components/todo/AntComponent";


const ListPage = () => {

  return ( 
  <div className="p-4 w-full bg-white">
    <div className="text-3xl font-extrabold">
      Todo List Page Component 
    </div> 
    {/*
    <AntComponent/>
    */}
    <ListComponent/>

  </div>
   );
}
 
export default ListPage;
