import React from "react";
import useApi from "../../Hooks/useApi";
import { BarChart } from "@mui/x-charts/BarChart";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { List } from 'antd';
function HomeScreen() {
  const data = useApi("/products", 0);
  const dt = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <div className="md:grid md:grid-cols-3 md:gap-1 flex-col justify-between">
      {/* hello */}
      {/* <Slider imgFlag={1}/> */}
      {/* <a
        href="#"
        className="md:col-span-1 flex justify-center md:max-w-md h-auto w-full p-1 bg-[#e4eae1] rounded-lg  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
 
    <div className="sm:flex-col sm:justify-around sm:align-middle sm:space-y-5 flex flex-wrap justify-center">
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
    <a
        href="#"
        className="col-span-2 w-40 p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center" 
      >
      <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill:'#025129'

        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: '#ACBFA4'
        },
      })}
    />
      </a>
      <a
        href="#"
        className="col-span-2 w-40 p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center" 
      >
      <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill:'#025129'

        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: '#ACBFA4'
        },
      })}
    />
      </a>
    </Stack>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
    <a
        href="#"
        className="col-span-2 w-40 p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center" 
      >
      <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill:'#025129'

        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: '#ACBFA4'
        },
      })}
    />
      </a>
      <a
        href="#"
        className="col-span-2 w-40 p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center" 
      >
       <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill:'#025129'

        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: '#ACBFA4'
        },
      })}
    />
      </a>
    </Stack>
    </div>
   
      </a> */}
      <div className="col-span-3 mb-4">
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false} className='dark:bg-[#001529] dark:text-gray-400'>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
                className="dark:bg-[#001529] dark:text-gray-400"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} className='dark:bg-[#001529] dark:text-gray-400'>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6} >
            <Card bordered={false} className='dark:bg-[#001529] dark:text-gray-400'>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} className='dark:bg-[#001529] dark:text-gray-400'>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="col-span-2">
        <a
          href="#"
          className="w-full p-10 h-64 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center"
        >
          <BarChart
            xAxis={[{ scaleType: "band", data: ["A", "B", "C"] }]}
            series={[
              { data: [4, 3, 5], color: "#025129" },
              { data: [1, 6, 3], color: "#9ABD97" },
              { data: [2, 5, 6], color: "#ACBFA4" },
            ]}
            width={800}
            height={300}
          />
        </a>
      </div>
      <div className="col-span-1 py-2">
    <List className="bg-white dark:bg-[#001529] dark:text-gray-400 dark:border-[#001529]"
      // header={<div>Header</div>}
      // footer={<div>Footer</div>}
      bordered
      dataSource={dt}
      renderItem={(item) => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
   
      </div>
      
    </div>
  );
}

export default HomeScreen;
