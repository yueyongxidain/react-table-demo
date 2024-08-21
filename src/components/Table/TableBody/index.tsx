import React from "react";
import { IColumn } from "../Table";
import "./style.scss";

interface TableBodyProps {
  columns: IColumn[];
  data: Array<any>;
  leftoffsets: number[];
  rightoffsets: number[];
}

export const TableBody: React.FC<TableBodyProps> = ({
  columns,
  data,
  leftoffsets,
  rightoffsets,
}) => {
  return (
    <tbody className="table-body">
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column, colIndex) => (
            <td
              key={column.key}
              className={column.fixed ? "isSticky" : ""}
              style={{
                left:
                  column.fixed === "left" && colIndex < columns.length - 1
                    ? leftoffsets[colIndex]
                    : undefined,
                right:
                  column.fixed === "right" && colIndex < columns.length - 1
                    ? rightoffsets[colIndex]
                    : undefined,
              }}
            >
              {row[column.dataIndex]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
