import { useState } from "react";
import "./App.css";

import { Layout } from "antd";
import WelcomeBlock from "./components/WelcomeBlock/WelcomeBlock";

const { Content, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {!collapsed && <div style={{ padding: 16 }}>Date Of Birth:</div>}
        </Sider>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <WelcomeBlock />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
