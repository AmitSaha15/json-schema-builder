import React from "react";
import { Layout, Typography } from "antd";
import "antd/dist/reset.css";
import SchemaBuilder from "./SchemaBuilder";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout>
      <Header
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Title level={3} style={{ color: "#333", lineHeight: "64px" }}>
          JSON Schema Builder
        </Title>
      </Header>
      <Content style={{ padding: "24px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <SchemaBuilder />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
