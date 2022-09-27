import React from "react";
import { Table, Tag, Tooltip, Button, Divider, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  // EllipsisOutlined,
} from "@ant-design/icons";

function ChecklistsTableView({
  checklists,
  checklistEditHandler,
  // checklistDetailsHandler,
  checklistDeleteHandler,
  cancelDeleteHandler,
}) {
  const checklistsTableColumns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) => <Tag color="#2db7f5">{record.category}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag
          color={
            record.status && record.status === "completed"
              ? "success"
              : record.status === "in progress"
              ? "processing"
              : "error"
          }
        >
          {record.status ? record.status : "untracked"}
        </Tag>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text, record) => {
        return record.dueDate && new Date(record.dueDate).toLocaleDateString();
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
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
            {/* <Tooltip title="view details">
              <Button
                type="primary"
                icon={<EllipsisOutlined />}
                onClick={() => checklistDetailsHandler(record.id)}
              />
            </Tooltip>
            <Divider type="vertical" /> */}
            <Popconfirm
              title="Are you sure to delete this checklist?"
              okText="Delete"
              cancelText="Cancel"
              onConfirm={()=>checklistDeleteHandler(record.id)}
              cancelButtonProps={cancelDeleteHandler}
            >
              <Button
                type="danger"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return <Table dataSource={checklists} columns={checklistsTableColumns} />;
}

export default ChecklistsTableView;
