import { Table, Tag, Tooltip, Button, Divider, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  // EllipsisOutlined,
} from "@ant-design/icons";
import { CHECKLIST_TABLE_VIEW_COLUMNS } from "../../utils/constants/ChecklistTableColumnConstant";
function ChecklistsTableView({
  checklists,
  checklistEditHandler,
  // checklistDetailsHandler,
  checklistDeleteHandler,
  cancelDeleteHandler,
}) {

  return <Table dataSource={checklists} columns={CHECKLIST_TABLE_VIEW_COLUMNS} />;
}

export default ChecklistsTableView;
