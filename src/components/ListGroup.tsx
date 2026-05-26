import { Fragment, useState } from "react";
import { MouseEvent } from "react";

function ListGroup() {
  let items = ["Satu", "Dua", "Tiga"];

  const [selectIndex, setSelectIndex] = useState(-1);

  // items = [];

  // if (items.length === 0)
  //   return (
  //     <>
  //       <h1>List</h1>
  //       <p>List Not Found</p>
  //     </>
  //   );

  const msg = items.length === 0 ? <p> List not found</p> : null;

  const handleClik = (event: MouseEvent) => console.log(event);

  return (
    <Fragment>
      <h1>List</h1>
      {msg}
      <ul className="list-group">
        {items.map((item, index) => (
          // <li
          //   className="list-group-item"
          //   onClick={() => console.log(item)}
          //   key={index}
          // >
          //   {item}
          // </li>
          // <li className="list-group-item" onClick={handleClik} key={index}>
          //   {item}
          // </li>
          <li
            className={
              selectIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={index}
            onClick={() => setSelectIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
