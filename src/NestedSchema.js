import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Button, Input, Select, Space } from "antd";

const { Option } = Select;

const NestedSchema = React.memo(({ control, path, watch }) => {
  const fieldsPath = `${path}.children`;

  const { fields, append } = useFieldArray({
    control,
    name: fieldsPath,
  });

  return (
    <>
      {fields.map((field, index) => {
        const fieldPath = `${fieldsPath}.${index}`;
        const fieldType = watch(`${fieldPath}.type`);

        return (
          <div key={field.id} style={{ marginBottom: "16px" }}>
            <Space align="start" style={{ width: "100%" }}>
              <Controller
                name={`${fieldPath}.name`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} placeholder="Field Name" />
                )}
              />
              <Controller
                name={`${fieldPath}.type`}
                control={control}
                render={({ field }) => (
                  <Select {...field} s style={{ width: 120 }}>
                    <Option value="nested">Nested</Option>
                    <Option value="string">String</Option>
                    <Option value="number">Number</Option>
                    <Option value="boolean">Boolean</Option>
                    <Option value="float">Float</Option>
                    <Option value="objectId">ObjectID</Option>
                  </Select>
                )}
              />
            </Space>

            {fieldType === "nested" && (
              <div style={{ paddingLeft: "40px", marginTop: "10px" }}>
                <NestedSchema
                  control={control}
                  path={fieldPath}
                  watch={watch}
                />
              </div>
            )}
          </div>
        );
      })}
      <Button
        type="primary"
        ghost
        onClick={() => append({ name: "", type: "" })}
        style={{ width: "100%" }}
      >
        + Add Item
      </Button>
    </>
  );
});

export default NestedSchema;
