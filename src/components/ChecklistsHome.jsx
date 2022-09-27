import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  Row,
  Layout,
  Menu,
  PageHeader,
  Button,
  Modal,
  Spin,
  Result,
  message,
} from "antd";
import Checklists from "./Checklists";
import { PlusSquareTwoTone } from "@ant-design/icons";
import ChecklistForm from "./ChecklistForm";

const { Header, Content, Sider } = Layout;
const checklistPostUrl = "http://localhost:3000/checklists";
const submitData = async (url, data) => {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((postResponse) => {
      return postResponse;
    })
    .catch((postResponseError) => {
      console.log(postResponseError);
      return postResponseError;
    });
};

const updateChecklist = async (id, data) => {
  fetch(checklistPostUrl + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log("check list update response data", responseData);
      return responseData;
    })
    .catch((checklistEditResponseError) => {
      console.log("checklistEditResponseError", checklistEditResponseError);
    });
};

const menuItems = [
  { label: "Checklists", key: "checklists" },
  { label: "Categories", key: "category" },
];

function ChecklistsHome() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [checklistCategory, setChecklistCategory] = useState({
    id: "",
    title: "",
  });
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [checklistId, setChecklistId] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("categories response data", responseData);
        setCategories(responseData);
      });
  }, []);

  const handleCancel = useCallback(() => {
    setChecklistCategory({ ...checklistCategory, id: "", title: "" });
    setChecklistTitle("");
    setStatus("");
    setDueDate("");
    setDescription("");
    setChecklistId();
    if (isEdit) {
      setIsEdit(false);
    }
    setIsModalOpen(false);
  }, [checklistCategory, isEdit]);

  const getChecklist = useCallback((checklistId) => {
    fetch(checklistPostUrl + "/" + checklistId)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("get checklist response data", responseData);
        showModal();
        setIsEdit(true);
        setFormLoading(true);
        setChecklistCategory((prevState) => ({
          ...prevState,
          id: responseData.categoryId,
          title: responseData.category,
        }));
        setChecklistTitle(responseData.title);
        setStatus(responseData.status);
        setDueDate(responseData.dueDate);
        setDescription(responseData.description);
        setChecklistId(responseData.id);
        setFormLoading(false);
      });
  }, []);

  const deleteChecklist = useCallback((id) => {
    fetch(checklistPostUrl + "/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("delete response data", responseData);
        setDataSubmitted((prevState) => {
          return (prevState = true);
        });
        message.success("checklist deleted successfully!", 2, () => {
          setDataSubmitted((prevState) => {
            return (prevState = false);
          });
        });
      });
  }, []);

  const submitHandler = useCallback(() => {
    setFormLoading(true);
    const checklistFormData = {
      id: checklistId,
      title: checklistTitle,
      description: description,
      status: status,
      dueDate: dueDate._d ? new Date(dueDate._d).toISOString() : dueDate,
      categoryId: checklistCategory.id,
      category: checklistCategory.title,
    };
    console.log("form values", checklistFormData);
    //isEdit will update the data
    if (!isEdit) {
      submitData(checklistPostUrl, checklistFormData)
        .then((postResponse) => {
          console.log("postResponse", postResponse);
          setFormLoading(false);
          setDataSubmitted(true);
        })
        .catch((postResponseError) => {
          console.log(postResponseError);
        });
    } else {
      updateChecklist(checklistId, checklistFormData).then(() => {
        setFormLoading(false);
        setDataSubmitted(true);
        setFormLoading(false);
        setIsEdit(false);
        handleCancel();
        message.success("Checklist updated successfully!", 2, () => {
          setDataSubmitted(false);
        });
      });
    }
  }, [
    checklistTitle,
    description,
    checklistCategory,
    status,
    isEdit,
    handleCancel,
    checklistId,
    dueDate,
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onTitleChange = (title) => {
    console.log("title", title);
    setChecklistTitle(title);
  };
  const onDescriptionChange = (description) => {
    console.log("description", description);
    setDescription(description);
  };

  const onChecklistCategoryChange = (selectedOption) => {
    setChecklistCategory({
      ...checklistCategory,
      id: selectedOption.value,
      title: selectedOption.children,
    });
    console.log("category", selectedOption);
  };

  const onDateChange = (date) => {
    console.log("date", date);
    setDueDate(date);
  };
  const onStatusChange = (status) => {
    console.log("status", status);
    setStatus(status);
  };

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          mode="inline"
          items={menuItems}
          defaultSelectedKeys={["checklists"]}
          className="checklist-menu"
        />
      </Sider>
      <Layout>
        <Header>
          <Row justify="space-between">
            <Col sm={12} xs={12} lg={6}>
              <PageHeader title="Checklists" />
            </Col>
            <Col sm={12} xs={12} lg={6}>
              <Button type="primary" onClick={() => showModal()}>
                <PlusSquareTwoTone />
                New
              </Button>
            </Col>
          </Row>
        </Header>
        <Content className="checklist-content">
          <div>
            <Checklists
              isFetchChecklistData={dataSubmitted}
              editHandler={getChecklist}
              deleteHandler={deleteChecklist}
            />
          </div>
        </Content>
      </Layout>
      <Modal
        title={isEdit ? "Update Checklist" : "New Checklist"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        mask
        maskClosable={false}
        style={{ padding: "5px" }}
      >
        {dataSubmitted ? (
          <Result
            status="success"
            title="Successfully Created New Checklist!"
            extra={[
              <Button type="primary" onClick={() => setDataSubmitted(false)}>
                Add Another Checklist
              </Button>,
              <Button
                type="default"
                onClick={() => {
                  handleCancel();
                  setDataSubmitted(false);
                }}
              >
                Finished
              </Button>,
            ]}
          />
        ) : (
          <Spin spinning={formLoading}>
            <ChecklistForm
              categoriesData={categories}
              clearForm={handleCancel}
              isEdit={isEdit}
              onCategorySelectChange={onChecklistCategoryChange}
              submitHandler={submitHandler}
              onTitleChange={onTitleChange}
              onDateChange={onDateChange}
              onDescriptionChange={onDescriptionChange}
              onStatusChange={onStatusChange}
              categoryKey={checklistCategory.id}
              title={checklistTitle}
              description={description}
              dueDate={dueDate}
              status={status}
            />
          </Spin>
        )}
      </Modal>
    </Layout>
  );
}

export default ChecklistsHome;
