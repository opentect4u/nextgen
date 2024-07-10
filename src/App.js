import './App.css';
import { Outlet } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ConfigProvider } from 'antd';
function App() {
  console.log('app')
  return (

    <PrimeReactProvider>
    <ConfigProvider theme={{
    components: {
      Steps:{
        colorPrimary:'#22543d',
      },
      Timeline:{
        dotBg:'#22543d',
        tailColor:'#22543d',
        colorPrimary:'#22543d',
        },
      // Select:{
      //   colorPrimary:'#22543d',
      //   colorPrimaryHover:'#22543d'
      // },
      Select: {
        colorPrimary: '#22543d',
        colorPrimaryHover: '#22543d',
        optionActiveBg: '#22543d',
        optionSelectedColor:'#000000',
        // optionActiveT: '#22543d',
        optionSelectedFontWeight: '700',
        // optionSelectedFontColor:'#ffffff',
        // controlOutline:'#22543d'

      },
      DatePicker:{
        activeBorderColor:'#22543d',
        hoverBorderColor:'#22543d',
        colorPrimary:'#22543d'
      },
      Breadcrumb:{separatorColor:'#22543d',lastItemColor:'#22543d'},
      Menu: {
        // itemSelectedBg:'#e4eae1',
        // itemSelectedColor:'#025129',
        // horizontalItemHoverColor:'#025129',
        // horizontalItemSelectedColor:'#025129',

        // itemSelectedBg:'#e4eae1',
        itemSelectedBg:'#e4eae1',
        itemSelectedColor:'#22543d',
        horizontalItemHoverColor:'#22543d',
        horizontalItemSelectedColor:'#22543d',
        darkItemSelectedBg:'#22543d'
      },
      Switch:{
        // colorPrimary:'#025129',
        // colorPrimaryHover:'#025129'

         colorPrimary:'#22543d',
        colorPrimaryHover:'#22543d'
      },
      Descriptions:{
        titleColor:'#22543d',
        labelBg:'#22543d'
      },
      Tabs:{
        inkBarColor:'#22543d',
        itemColor:'#22543d',
        itemSelectedColor:'#22543d',
        itemHoverColor:'#22543d',
      }
    },
  }}>
    <Outlet/>
    </ConfigProvider>   
    </PrimeReactProvider>    
  );
}

export default App;
