import React from "react";
import { Menu, Grid, Col, Table, Tag, Tooltip, Button, Divider } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

function ChecklistsTableView({
  checklists,
  checklistEditHandler,
  checklistDetailsHandler,
  checklistDeleteHandler,
}) {
  const checklistsTableColumns = [
    { title: "Title", dataIndex: "title" },
    {
      title: "Category",
      dataIndex: "category",
      render: (text, record) => (
        <Tag color="#2db7f5">{record.categoryTitle}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <Tag
          color={
            record.status === "completed"
              ? "success"
              : record.status === "in progress"
              ? "processing"
              : "error"
          }
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      render: (text, record) => new Date(record.dueDate).toLocaleDateString(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="edit checklist">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => checklistEditHandler(record.id)}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="view details">
              <Button
                type="primary"
                icon={<EllipsisOutlined />}
                onClick={() => checklistDetailsHandler(record.id)}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => checklistDeleteHandler(record.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Table dataSource={checklists} columns={checklistsTableColumns} />
  );
}

export default ChecklistsTableView;
