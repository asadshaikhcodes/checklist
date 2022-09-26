import React from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col } from "antd";
import moment from "moment";

function ChecklistForm({
  onTitleChange,
  onCategorySelectChange,
  onDescriptionChange,
  onDateChange,
  isEdit,
  onStatusChange,
  categoriesData,
  submitHandler,
  title,
  status,
  description,
  dueDate,
  categoryKey,
  clearForm,
}) {
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  return (
    <div>
      <Form
        form={form}
        name="checklists-form"
        layout="vertical"
        onReset={() => clearForm()}
        onFinish={(values) => {
          console.log("form values", values);
        }}
        onFinishFailed={(errorInfo) => {
          console.log("errorInfo", errorInfo);
        }}
        key="checklistForm"
      >
        <Form.Item
          label="Title"
          rules={[
            {
              required: true,
              message: "Checklist Title is required",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              onTitleChange(e.target.value);
              //   form.setFieldValue(e.target.value);
            }}
            value={title}
            key="checklistTitle"
          />
        </Form.Item>
        <Form.Item label="Description" requiredMark="optional">
          <Input.TextArea
            allowClear
            onChange={(e) => {
              onDescriptionChange(e.target.value);
              //   form.setFieldValue(e.target.value);
            }}
            value={description}
            key="checklistDescription"
          />
        </Form.Item>
        <Form.Item
          label="Category"
          requiredMark="optional"
          help="Categorize the checklists for better groupings and views"
          style={{ marginBottom: "30px" }}
        >
          <Select
            placeholder="Select a category"
            onChange={(value, option) => {
              onCategorySelectChange(option);
              //   form.setFieldValue(value);
            }}
            allowClear
            value={categoryKey}
            key="checklistCategory"
          >
            {categoriesData?.map((category) => {
              return (
                <Select.Option value={category.id}>
                  {category.title}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Select Due Date">
          {/* <label style={{ display: "block" }}>Select due date</label> */}
          <div>
            <DatePicker
              onChange={(date) => {
                onDateChange(date);
                // form.setFieldValue(date);
              }}
              format={dateFormat}
              value={moment(
                dueDate ? new Date(dueDate) : new Date(),
                dateFormat
              )}
              name="dueDate"
              placeholder="Due Date"
              style={{ marginBottom: "30px" }}
              key="checklistDueDate"
            />
          </div>
        </Form.Item>
        {isEdit && (
          <Form.Item label="Status">
            <Select
              placeholder="Set Status"
              onChange={(value) => {
                onStatusChange(value);
                // form.setFieldValue(value);
              }}
              allowClear
              value={status}
              key="checklistStatus"
            >
              <Select.Option value="completed">Completed</Select.Option>
              <Select.Option value="in progress">In Progress</Select.Option>
            </Select>
          </Form.Item>
        )}
        <Row justify="center" align="center" gutter={16}>
          <Col lg={12} sm={12}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => submitHandler()}
              size="large"
              style={{ width: "100%" }}
            >
              Save
            </Button>
          </Col>
          <Col lg={12} sm={12}>
            <Button
              htmlType="button"
              onClick={() => clearForm()}
              size="large"
              style={{ width: "100%" }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ChecklistForm;
