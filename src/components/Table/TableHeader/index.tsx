import React from "react";
import "./style.scss";
import { IColumn } from "../Table";

interface TableHeaderProps {
  columns: IColumn[];
  onSort: (key: string) => void;
  sortConfig: { key: string; direction: "asc" | "desc" } | null;
  stickyHeader?: boolean;
  leftoffsets: number[];
  rightoffsets: number[];
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  onSort,
  sortConfig,
  stickyHeader,
  leftoffsets,
  rightoffsets,
}) => {
  return (
    <thead className="table-header">
      <tr className={stickyHeader ? "isStickyTop" : ""}>
        {columns.map((column, index) => (
          <th
            key={column.key}
            onClick={() => (column.sorter ? onSort(column.key) : undefined)}
            className={column.fixed ? "isSticky" : ""}
            style={{
              width: column.width || "auto",
              left: column.fixed === "left" ? leftoffsets[index] : undefined,
              right: column.fixed === "right" ? rightoffsets[index] : undefined,
            }}
          >
            {column.title}{" "}
            {column.sorter && sortConfig?.key === column.key
              ? sortConfig.direction === "asc"
                ? "↑"
                : "↓"
              : ""}
          </th>
        ))}
      </tr>
    </thead>
  );
};
