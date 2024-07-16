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
      Breadcrumb:{separatorColor:'#052d27', itemColor:'#052d27', lastItemColor:'#052d27',fontSize:15},
      Menu: {
        // itemSelectedBg:'#e4eae1',
        // itemSelectedColor:'#025129',
        // horizontalItemHoverColor:'#025129',
        // horizontalItemSelectedColor:'#025129',

        // itemSelectedBg:'#e4eae1',
        itemBg:'#052d27',
        subMenuItemBg:'#052d27',
        subMenuItemBorderRadius:50,
        popupBg:'#052d27',
        // itemColor:'#D1D5DB',
        itemColor:'#D1D5DB',
        // itemSelectedBg:'#347865',
        itemSelectedBg:'white',
        itemBorderRadius:50,
        itemMarginInline:20,
        itemHoverBg:'#347865',
        itemSelectedColor:'#347865',
        itemHoverColor:'#D1D5DB',
        horizontalItemHoverColor:'#22543d',
        horizontalItemSelectedColor:'#22543d',
        darkItemSelectedBg:'#22543d'
      },
     
      Switch:{
        // colorPrimary:'#025129',
        // colorPrimaryHover:'#025129'

         colorPrimary:'#347865',
        colorPrimaryHover:'#347865'
      },
      Descriptions:{
        titleColor:'#347865',
        colorTextLabel:'#347865',
        colorText:'347865',
        colorSplit:'347865',
        labelBg:'#347865'
        
      },
      Tabs:{
        inkBarColor:'#347865',
        itemColor:'#347865',
        itemSelectedColor:'#347865',
        itemHoverColor:'#347865',
        itemActiveColor:'#347865'
      },
      Dropdown:{
        colorBgElevated:'#347865',
        colorText:'white',
        controlItemBgHover:'#347865'

      }
    },
  }}>
    <Outlet/>
    </ConfigProvider>   
    </PrimeReactProvider>    
  );
}

export default App;
