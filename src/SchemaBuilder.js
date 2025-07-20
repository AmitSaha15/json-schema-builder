import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Form, Button, Input, Select, Space, Card, Row, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const FieldGroup = ({ control, path, watch }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: path,
  });

  return (
    <>
      {fields.map((item, index) => {
        const fieldPath = `${path}.${index}`;
        const fieldType = watch(`${fieldPath}.type`);

        return (
          <div key={item.id} style={{ marginBottom: "16px" }}>
            <Space align="start" style={{ width: "100%" }}>
              <Controller
                name={`${fieldPath}.name`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Field Name" />
                )}
              />
              <Controller
                name={`${fieldPath}.type`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Field Type"
                    style={{ width: 120 }}
                  >
                    <Option value="nested">Nested</Option>
                    <Option value="string">String</Option>
                    <Option value="number">Number</Option>
                    <Option value="boolean">Boolean</Option>
                    <Option value="float">Float</Option>
                    <Option value="objectId">ObjectID</Option>
                  </Select>
                )}
              />
              <Button
                icon={<CloseOutlined />}
                onClick={() => remove(index)}
                type="text"
                danger
              />
            </Space>

            {fieldType === "nested" && (
              <div style={{ paddingLeft: "40px", marginTop: "10px" }}>
                <FieldGroup
                  control={control}
                  path={`${fieldPath}.children`}
                  watch={watch}
                />
              </div>
            )}
          </div>
        );
      })}

      <Button
        type={path === "schema" ? "primary" : "primary"}
        ghost={path !== "schema"}
        onClick={() => append({ name: "", type: "" })}
        block
      >
        + Add Item
      </Button>
    </>
  );
};

const generateJson = (schemaData) => {
  const result = {};
  if (!schemaData) return result;
  schemaData.forEach((item) => {
    if (!item) return;
    if (item.type === "nested") {
      result[item.name] = generateJson(item.children);
    } else {
      result[item.name] = item.type;
    }
  });
  return result;
};

const SchemaBuilder = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      schema: [],
    },
  });

  const formData = watch();

  const onSubmit = (data) => {
    const finalJson = generateJson(data.schema);
    alert("Check the console for the generated JSON!");
    console.log(JSON.stringify(finalJson, null, 2));
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <Row gutter={32}>
        <Col span={12}>
          <Card title="Schema Definition">
            <FieldGroup path="schema" control={control} watch={watch} />
            <Form.Item style={{ marginTop: "24px" }}>
              <Button type="primary" htmlType="submit" danger>
                Submit
              </Button>
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="JSON Preview" style={{ height: "100%" }}>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
              {JSON.stringify(generateJson(formData.schema), null, 2)}
            </pre>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default SchemaBuilder;
