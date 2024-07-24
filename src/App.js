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
        itemBg:'#014737',
        subMenuItemBg:'#014737',
        subMenuItemBorderRadius:50,
        popupBg:'#014737',
        // itemColor:'#D1D5DB',
        itemColor:'#D1D5DB',
        // itemSelectedBg:'#347865',
        itemSelectedBg:'white',
        itemBorderRadius:50,
        itemMarginInline:15,
        itemHoverBg:'white',
        itemSelectedColor:'#7FB685',
        itemHoverColor:'#014737',
      },
      Segmented:{
        itemActiveBg:'#046c4e',
        itemColor:'#046c4e',
        itemSelectedColor:'white',
        itemSelectedBg:'#046c4e'
      },
      Switch:{
        // colorPrimary:'#025129',
        // colorPrimaryHover:'#025129'

         colorPrimary:'#014737',
        colorPrimaryHover:'#014737'
      },
      Descriptions:{
        titleColor:'#014737',
        colorTextLabel:'#014737',
        colorText:'014737',
        colorSplit:'014737',
        labelBg:'#014737'
        
      },
      Tabs:{
        inkBarColor:'#014737',
        itemColor:'#014737',
        itemSelectedColor:'#014737',
        itemHoverColor:'#014737',
        itemActiveColor:'#014737'
      },
      Dropdown:{
        colorBgElevated:'white',
        colorText:'#014737',
        controlItemBgHover:'#D1D5DB'

      },
      Radio:{
        colorPrimary:"#22543d"
      }
    },
  }}>
    <Outlet/>
    </ConfigProvider>   
    </PrimeReactProvider>    
  );
}

export default App;
