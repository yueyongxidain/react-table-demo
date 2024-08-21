import { Table } from "./components/Table/Table";

function App() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      fixed: "left",
      width: 80
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: "sex",
      dataIndex: "sex",
      key: "sex",
      sorter: (a: any, b: any) => a.sex.localeCompare(b.sex),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const dataSource = [
    { name: "John", age: 42, sex: "男", address: "10 Downing Street" },
    { name: "Mike", age: 32, sex: "男", address: "Somewhere in the world" },
    { name: "Alice", age: 29, sex: "男", address: "Wonderland" },
    { name: "Bob", age: 35, sex: "男", address: "Bobland" },
    { name: "Charlie", age: 40, sex: "女", address: "Charlie's cave" },
    { name: "David", age: 27, sex: "男", address: "David's house" },
    { name: "Eve", age: 22, sex: "男", address: "Eve's mansion" },
    { name: "Frank", age: 26, sex: "女", address: "Frank's shack" },
    { name: "Grace", age: 33, sex: "男", address: "Grace's apartment" },
    { name: "Hannah", age: 38, sex: "男", address: "Hannah's bungalow" },
    { name: "John", age: 42, sex: "男", address: "10 Downing Street" },
    { name: "Mike", age: 32, sex: "男", address: "Somewhere in the world" },
    { name: "Alice", age: 29, sex: "男", address: "Wonderland" },
    { name: "Bob", age: 35, sex: "男", address: "Bobland" },
    { name: "Charlie", age: 40, sex: "女", address: "Charlie's cave" },
    { name: "David", age: 27, sex: "男", address: "David's house" },
    { name: "Eve", age: 22, sex: "男", address: "Eve's mansion" },
    { name: "Frank", age: 26, sex: "女", address: "Frank's shack" },
    { name: "Grace", age: 33, sex: "男", address: "Grace's apartment" },
    { name: "Hannah", age: 38, sex: "男", address: "Hannah's bungalow" },
  ];
  return (
    <>
      <div style={{ height: 400 }}>
        <Table columns={columns} dataSource={dataSource} stickyHeader={true} />
      </div>
    </>
  );
}

export default App;
