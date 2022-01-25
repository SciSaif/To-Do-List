import React from "react";
import { FaTrash } from "react-icons/fa";

function TodoItem() {
  return (
    <div className="p-2">
      <div className="container flex flex-row align-middle">
        <div className="flex justify-center items-center">
          <input type="checkbox" className="checkbox" />
        </div>
        <div className="divider divider-vertical"></div>
        <div className="text-display">
          this is a to do if you can believe it Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eligendi libero, quia reprehenderit iste
          similique nihil at a delectus deleniti esse mollitia culpa saepe sequi
          deserunt repellendus earum. Libero, illum obcaecati?
        </div>
        <div className="divider divider-vertical"></div>
        <div className="flex justify-center items-center">
          <FaTrash
            size="25px"
            className="cursor-pointer hover:text-[#b3a7e7]"
          />
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default TodoItem;
