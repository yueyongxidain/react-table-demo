import React, { useMemo, useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { Pagination } from './Pagination';
import './style.scss';

// 定义列的类型
export interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
  width?: number; // 为列添加可选的 width 属性
  fixed?: 'left' | 'right';
  sorter?: (a: any, b: any) => number;
}

interface TableProps {
  columns: IColumn[];
  dataSource: Array<any>;
  pagination?: { pageSize: number };
  stickyHeader?: boolean;
}

export const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  pagination,
  stickyHeader,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = pagination?.pageSize || 10;

  const sortedData = useMemo(() => {
    if (!sortConfig) return dataSource;
    return [...dataSource].sort((a, b) => {
      const column = columns.find((col) => col.key === sortConfig.key);
      return column?.sorter
        ? sortConfig.direction === 'asc'
          ? column.sorter(a, b)
          : column.sorter(b, a)
        : 0;
    });
  }, [dataSource, sortConfig, columns]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const { leftOffsets, rightOffsets } = useMemo(() => {
    const leftOffsets: number[] = [];
    const rightOffsets: number[] = [];

    let leftTotal = 0;
    let rightTotal = 0;

    columns.forEach((column) => {
      if (column.fixed === 'left') {
        leftOffsets.push(leftTotal);
        leftTotal += typeof column.width === 'number' ? column.width : 0;
      } else {
        leftOffsets.push(0);
      }
    });

    for (let i = columns.length - 1; i >= 0; i--) {
      const column = columns[i];
      if (column.fixed === 'right') {
        rightOffsets[i] = rightTotal;
        rightTotal += typeof column.width === 'number' ? column.width : 0;
      } else {
        rightOffsets[i] = 0;
      }
    }

    return { leftOffsets, rightOffsets };
  }, [columns]); // 只有 columns 发生变化时才重新计算

  const handleSort = (key: string) => {
    if (sortConfig?.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table>
          <TableHeader
            columns={columns}
            onSort={handleSort}
            sortConfig={sortConfig}
            stickyHeader={stickyHeader}
            leftoffsets={leftOffsets}
            rightoffsets={rightOffsets}
          />
          <TableBody
            columns={columns}
            data={paginatedData}
            leftoffsets={leftOffsets}
            rightoffsets={rightOffsets}
          />
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={dataSource.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
