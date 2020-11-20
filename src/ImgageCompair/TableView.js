import React from "react";
function TableView(props) {
  const obj = props.passData;
  console.log(obj)
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        <tbody>
          {obj &&
            obj.map(item => {
              return (
                <tr key={item.item.id}>
                  <td>{item.item.id}</td>
                  <td>{item.item.title}</td>
                  <td>{item.item.url}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default React.memo(TableView);
